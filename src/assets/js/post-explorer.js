/*
 * Post Relationship Explorer — /posts/
 *
 * Progressive enhancement over the plain tag-cloud + post-list already
 * rendered by posts.njk. If anything here throws before init completes,
 * the explorer container simply stays [hidden] and the static archive
 * underneath (real links, real /tags/ pages) works exactly as before.
 *
 * Data comes from a <script type="application/json"> block Eleventy fills
 * at build time from the same post collection that generates the rest of
 * the site (see eleventy.config.js -> addCollection("postGraph", ...)).
 *
 * Graph layout uses d3-force (vendored locally, see eleventy.config.js).
 * Everything else — rendering, drag, autocomplete, commands, URL state —
 * is plain DOM/SVG with no framework.
 */
(function () {
  "use strict";

  var root = document.getElementById("post-explorer");
  var dataEl = document.getElementById("post-graph-data");
  if (!root || !dataEl || !window.d3) return;

  var GRAPH_DATA;
  try {
    GRAPH_DATA = JSON.parse(dataEl.textContent);
  } catch (err) {
    return; // malformed/empty data — leave the static archive as-is
  }
  if (!GRAPH_DATA || !Array.isArray(GRAPH_DATA.tags) || !Array.isArray(GRAPH_DATA.posts)) return;

  var config = Object.assign(
    {
      hiddenFromGraph: [],
      deEmphasisedTags: [],
      preferredInitialTags: [],
      maxInitialNodes: 10,
      maxNeighboursPerExpansion: 8,
      maxPostNodes: 30,
      minRelationshipStrength: 0.03,
    },
    GRAPH_DATA.config || {},
  );

  var isMobile = window.matchMedia("(max-width: 640px)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var COMMANDS = ["help", "add", "remove", "clear", "reset", "mode", "posts", "focus", "random"];

  /* ---------------------------------------------------------------------
   * Static lookups derived once from the embedded data
   * ------------------------------------------------------------------- */

  var tagIndex = new Map(); // id -> { id, label, postCount, hidden, deEmphasised, degree }
  GRAPH_DATA.tags.forEach(function (t) {
    tagIndex.set(t.id, {
      id: t.id,
      label: t.label || t.id,
      postCount: t.postCount || 0,
      hidden: !!t.hidden || config.hiddenFromGraph.indexOf(t.id) !== -1,
      deEmphasised: !!t.deEmphasised || config.deEmphasisedTags.indexOf(t.id) !== -1,
      degree: 0,
    });
  });

  var adjacency = new Map(); // id -> [{ id, strength, shared }] sorted desc by strength, hidden targets excluded
  tagIndex.forEach(function (_, id) {
    adjacency.set(id, []);
  });
  GRAPH_DATA.edges.forEach(function (e) {
    if (!tagIndex.has(e.source) || !tagIndex.has(e.target)) return;
    var a = tagIndex.get(e.source);
    var b = tagIndex.get(e.target);
    if (!a.hidden && !b.hidden) {
      adjacency.get(e.source).push({ id: e.target, strength: e.strength, shared: e.shared });
      adjacency.get(e.target).push({ id: e.source, strength: e.strength, shared: e.shared });
    }
  });
  adjacency.forEach(function (list, id) {
    list.sort(function (a, b) {
      return b.strength - a.strength || b.shared - a.shared;
    });
    tagIndex.get(id).degree = list.length;
  });

  var maxPostCount = Math.max.apply(
    null,
    [1].concat(Array.from(tagIndex.values()).map(function (t) { return t.postCount; })),
  );

  var postsById = new Map();
  GRAPH_DATA.posts.forEach(function (p) {
    postsById.set(p.id, p);
  });

  function isRenderable(tagId) {
    var t = tagIndex.get(tagId);
    return !!t && !t.hidden;
  }

  function neighboursOf(tagId) {
    return adjacency.get(tagId) || [];
  }

  /* ---------------------------------------------------------------------
   * Initial node selection: pick ~8-12 tags that look like an intentional
   * starting map rather than "whatever sorts first". Scored by post count
   * (log-scaled so one huge tag can't dwarf everything else) and degree,
   * de-emphasised tags scored down, then picked greedily with a diversity
   * check so a tightly-correlated cluster of tiny tags (e.g. everything
   * that only ever appears on one shared post) can't fill every slot.
   * ------------------------------------------------------------------- */

  var initialTagIdsCache = null;

  function computeInitialTagIds() {
    if (initialTagIdsCache) return initialTagIdsCache;

    var candidates = Array.from(tagIndex.values()).filter(function (t) {
      return !t.hidden;
    });

    function score(t) {
      var base = Math.sqrt(t.postCount) + 0.2 * Math.sqrt(t.degree);
      return t.deEmphasised ? base * 0.45 : base;
    }

    candidates.sort(function (a, b) {
      return score(b) - score(a) || b.degree - a.degree || a.id.localeCompare(b.id);
    });

    var preferred = config.preferredInitialTags.filter(function (id) {
      return isRenderable(id);
    });

    var selected = [];
    var selectedSet = new Set();

    preferred.forEach(function (id) {
      if (selected.length < config.maxInitialNodes && !selectedSet.has(id)) {
        selected.push(id);
        selectedSet.add(id);
      }
    });

    function tooSimilarToSelected(id) {
      var list = neighboursOf(id);
      for (var i = 0; i < list.length; i++) {
        if (selectedSet.has(list[i].id) && list[i].strength >= 0.55) return true;
      }
      return false;
    }

    // First pass: diversity-aware. Second pass (if slots remain): fill
    // from whoever's left even if similar, rather than showing fewer
    // nodes than configured.
    [true, false].forEach(function (enforceDiversity) {
      candidates.forEach(function (t) {
        if (selected.length >= config.maxInitialNodes) return;
        if (selectedSet.has(t.id)) return;
        if (enforceDiversity && tooSimilarToSelected(t.id)) return;
        selected.push(t.id);
        selectedSet.add(t.id);
      });
    });

    initialTagIdsCache = selected;
    return selected;
  }

  function pickRandomSubjectTag() {
    var pool = Array.from(tagIndex.values()).filter(function (t) {
      return !t.hidden && (t.postCount >= 2 || computeInitialTagIds().indexOf(t.id) !== -1);
    });
    if (!pool.length) pool = Array.from(tagIndex.values()).filter(function (t) { return !t.hidden; });
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)].id;
  }

  /* ---------------------------------------------------------------------
   * State
   * ------------------------------------------------------------------- */

  var state = {
    selectedTags: [], // ordered array of tag ids
    filterMode: "and", // "and" | "or"
    showPostNodes: false,
    focusedTag: null,
    focusedPost: null,
  };

  var neighbourReveal = new Map(); // tagId -> how many neighbours to reveal (overrides config default)

  /* ---------------------------------------------------------------------
   * DOM references
   * ------------------------------------------------------------------- */

  var els = {
    graphWrap: root.querySelector(".post-explorer-graph-wrap"),
    svg: document.getElementById("explorer-graph"),
    edgeLayer: document.getElementById("explorer-edges"),
    nodeLayer: document.getElementById("explorer-nodes"),
    input: document.getElementById("explorer-input"),
    listbox: document.getElementById("explorer-listbox"),
    chips: document.getElementById("explorer-chips"),
    modeBtns: Array.prototype.slice.call(root.querySelectorAll(".post-explorer-mode-btn")),
    postsToggle: document.getElementById("explorer-posts-toggle"),
    resetBtn: document.getElementById("explorer-reset"),
    status: document.getElementById("explorer-status"),
    helpToggle: document.getElementById("explorer-help-toggle"),
    help: document.getElementById("explorer-help"),
    resultsCount: document.getElementById("post-results-count"),
    resultsList: document.getElementById("post-results-list"),
    tagCloud: document.getElementById("post-tag-cloud"),
    tagCloudAll: document.getElementById("post-tag-cloud-all"),
  };

  var VIEW_W = 600;
  var VIEW_H = 440;
  var NODE_MIN_R = isMobile ? 11 : 14;
  var NODE_MAX_R = isMobile ? 24 : 34;
  var POST_NODE_R = isMobile ? 6 : 7;

  function radiusFor(postCount) {
    var t = Math.sqrt(Math.max(postCount, 1)) / Math.sqrt(maxPostCount);
    return NODE_MIN_R + (NODE_MAX_R - NODE_MIN_R) * Math.min(1, t);
  }

  /* ---------------------------------------------------------------------
   * Derived state
   * ------------------------------------------------------------------- */

  function visibleTagIds() {
    if (!state.selectedTags.length) {
      return computeInitialTagIds();
    }
    var ids = new Set(state.selectedTags.filter(isRenderable));
    state.selectedTags.forEach(function (tagId) {
      var reveal = neighbourReveal.get(tagId) || Math.max(3, isMobile ? Math.ceil(config.maxNeighboursPerExpansion / 2) : config.maxNeighboursPerExpansion);
      neighboursOf(tagId)
        .slice(0, reveal)
        .forEach(function (n) {
          ids.add(n.id);
        });
    });
    return Array.from(ids);
  }

  function matchingPosts() {
    if (!state.selectedTags.length) return GRAPH_DATA.posts.slice();
    var selected = state.selectedTags;
    return GRAPH_DATA.posts.filter(function (p) {
      if (state.filterMode === "and") {
        return selected.every(function (t) { return p.tags.indexOf(t) !== -1; });
      }
      return selected.some(function (t) { return p.tags.indexOf(t) !== -1; });
    });
  }

  function overflowInfo() {
    // Which currently-selected tags have more neighbours than are being
    // shown right now, and how many are hidden.
    return state.selectedTags
      .filter(isRenderable)
      .map(function (tagId) {
        var total = neighboursOf(tagId).length;
        var reveal = neighbourReveal.get(tagId) || Math.max(3, isMobile ? Math.ceil(config.maxNeighboursPerExpansion / 2) : config.maxNeighboursPerExpansion);
        return { tagId: tagId, hiddenCount: Math.max(0, total - reveal) };
      })
      .filter(function (o) { return o.hiddenCount > 0; });
  }

  /* ---------------------------------------------------------------------
   * Force simulation + SVG rendering
   * ------------------------------------------------------------------- */

  var simNodes = []; // persisted d3 node objects, keyed by id, reused across renders
  var simNodesById = new Map();
  var simulation = d3
    .forceSimulation([])
    .alphaDecay(reduceMotion ? 0.35 : 0.045)
    .velocityDecay(0.45)
    .force("charge", d3.forceManyBody().strength(-230))
    .force("center", d3.forceCenter(VIEW_W / 2, VIEW_H / 2).strength(0.02))
    .force(
      "link",
      d3
        .forceLink([])
        .id(function (d) { return d.uid; })
        .distance(function (d) { return 115 - 55 * Math.min(1, d.strength || 0); })
        .strength(function (d) { return 0.12 + 0.55 * Math.min(1, d.strength || 0); }),
    )
    .force("collide", d3.forceCollide().radius(function (d) { return d.r + (d.type === "post" ? 8 : 20); }))
    .stop();

  simulation.on("tick", function () {
    clampNodes();
    positionElements();
  });

  function clampNodes() {
    simNodes.forEach(function (n) {
      n.x = Math.max(n.r + 4, Math.min(VIEW_W - n.r - 4, n.x));
      n.y = Math.max(n.r + 4, Math.min(VIEW_H - n.r - 4, n.y));
    });
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        el.setAttribute(k, attrs[k]);
      });
    }
    return el;
  }

  var edgeElsById = new Map(); // "uidA|uidB" -> <line>
  var nodeElsById = new Map(); // uid -> { g, circle, text }

  function render() {
    var visibleTags = visibleTagIds();
    var visibleTagSet = new Set(visibleTags);

    var postsForGraph = [];
    var truncatedPostCount = 0;
    if (state.showPostNodes) {
      var matches = matchingPosts().filter(function (p) {
        return p.tags.some(function (t) { return visibleTagSet.has(t); });
      });
      truncatedPostCount = Math.max(0, matches.length - config.maxPostNodes);
      postsForGraph = matches.slice(0, config.maxPostNodes);
    }

    var wantedUids = new Set();
    visibleTags.forEach(function (id) { wantedUids.add("tag:" + id); });
    postsForGraph.forEach(function (p) { wantedUids.add("post:" + p.id); });

    // Remove nodes no longer wanted.
    simNodes = simNodes.filter(function (n) {
      if (wantedUids.has(n.uid)) return true;
      simNodesById.delete(n.uid);
      return false;
    });

    // Add newly-wanted nodes near an already-visible neighbour so the map
    // grows outward instead of re-scattering.
    function seedPosition(neighbourUids) {
      for (var i = 0; i < neighbourUids.length; i++) {
        var n = simNodesById.get(neighbourUids[i]);
        if (n) {
          var angle = Math.random() * Math.PI * 2;
          return { x: n.x + Math.cos(angle) * 40, y: n.y + Math.sin(angle) * 40 };
        }
      }
      return { x: VIEW_W / 2 + (Math.random() - 0.5) * 60, y: VIEW_H / 2 + (Math.random() - 0.5) * 60 };
    }

    visibleTags.forEach(function (id) {
      var uid = "tag:" + id;
      if (simNodesById.has(uid)) return;
      var t = tagIndex.get(id);
      var neighbourUids = neighboursOf(id).map(function (n) { return "tag:" + n.id; });
      var pos = seedPosition(neighbourUids);
      var node = {
        uid: uid,
        type: "tag",
        id: id,
        label: t.label,
        postCount: t.postCount,
        deEmphasised: t.deEmphasised,
        r: radiusFor(t.postCount),
        x: pos.x,
        y: pos.y,
        isNew: true,
      };
      simNodes.push(node);
      simNodesById.set(uid, node);
    });

    postsForGraph.forEach(function (p) {
      var uid = "post:" + p.id;
      if (simNodesById.has(uid)) return;
      var tagUids = p.tags.filter(function (t) { return visibleTagSet.has(t); }).map(function (t) { return "tag:" + t; });
      var pos = seedPosition(tagUids);
      var node = {
        uid: uid,
        type: "post",
        id: p.id,
        title: p.title,
        url: p.url,
        date: p.date,
        r: POST_NODE_R,
        x: pos.x,
        y: pos.y,
        isNew: true,
      };
      simNodes.push(node);
      simNodesById.set(uid, node);
    });

    // Build links: tag-tag (from real edges) + post-tag (synthetic).
    var links = [];
    GRAPH_DATA.edges.forEach(function (e) {
      if (visibleTagSet.has(e.source) && visibleTagSet.has(e.target)) {
        links.push({
          source: "tag:" + e.source,
          target: "tag:" + e.target,
          strength: e.strength,
          shared: e.shared,
          kind: "tag",
        });
      }
    });
    postsForGraph.forEach(function (p) {
      p.tags.forEach(function (t) {
        if (visibleTagSet.has(t)) {
          links.push({ source: "post:" + p.id, target: "tag:" + t, strength: 0.4, shared: 1, kind: "post" });
        }
      });
    });

    simulation.nodes(simNodes);
    simulation.force("link").links(links.map(function (l) {
      return { source: l.source, target: l.target, strength: l.strength, shared: l.shared, kind: l.kind };
    }));

    syncSvgElements(links, truncatedPostCount);

    if (reduceMotion) {
      simulation.alpha(1).tick(20);
      clampNodes();
      positionElements();
      simulation.alpha(0).stop();
    } else {
      simulation.alpha(Math.max(simulation.alpha(), 0.5)).restart();
    }

    renderOverflow();
    renderTruncationNotice(truncatedPostCount);
  }

  function syncSvgElements(links, truncatedPostCount) {
    // Nodes
    var seenNodeUids = new Set();
    simNodes.forEach(function (n) {
      seenNodeUids.add(n.uid);
      var entry = nodeElsById.get(n.uid);
      if (!entry) {
        var g = svgEl("g", { tabindex: "0", role: "button" });
        // A generous, invisible hit-target: tag nodes are filled so their
        // whole disc is already clickable, but post nodes are drawn hollow
        // (fill: none), and SVG only hit-tests painted area by default —
        // without this, only the thin dashed ring would be clickable, and
        // small nodes would fall well short of a usable touch target.
        var hit = svgEl("circle", { class: "pge-node-hit", r: Math.max(n.r, 22), "pointer-events": "all" });
        var circle = svgEl("circle", { r: n.r, "pointer-events": "none" });
        var text = svgEl("text", { "text-anchor": "middle", "font-size": n.type === "post" ? "8" : isMobile ? "9" : "10", "pointer-events": "none" });
        g.appendChild(hit);
        g.appendChild(circle);
        g.appendChild(text);
        entry = { g: g, hit: hit, circle: circle, text: text };

        if (n.type === "post") {
          var a = svgEl("a");
          a.setAttribute("href", n.url);
          a.appendChild(g);
          nodeElsById.set(n.uid, entry);
          entry.anchor = a;
          els.nodeLayer.appendChild(a);
        } else {
          nodeElsById.set(n.uid, entry);
          els.nodeLayer.appendChild(g);
        }
        wireNodeEvents(g, n);

        if (!reduceMotion && n.isNew) {
          g.style.opacity = "0";
          requestAnimationFrame(function () {
            g.style.transition = "opacity 0.3s";
            g.style.opacity = "1";
          });
        }
      }
      entry.circle.setAttribute("r", n.r);
      entry.hit.setAttribute("r", Math.max(n.r, 22));
      var label = n.type === "post" ? truncate(n.title, isMobile ? 10 : 14) : n.label;
      entry.text.textContent = label;
      entry.text.setAttribute("dy", n.r + (n.type === "post" ? 11 : 13));
      var cls = "pge-node pge-node--" + n.type;
      if (n.deEmphasised) cls += " pge-node--deemph";
      entry.g.setAttribute("class", cls);
      entry.g.setAttribute(
        "aria-label",
        n.type === "post"
          ? n.title + (n.date ? ", " + formatDate(n.date) : "")
          : n.label + " — " + n.postCount + (n.postCount === 1 ? " post" : " posts") + ", " + tagIndex.get(n.id).degree + " connections",
      );
      if (n.type === "tag") entry.g.setAttribute("aria-pressed", state.selectedTags.indexOf(n.id) !== -1 ? "true" : "false");
      n.isNew = false;
    });

    nodeElsById.forEach(function (entry, uid) {
      if (!seenNodeUids.has(uid)) {
        (entry.anchor || entry.g).remove();
        nodeElsById.delete(uid);
      }
    });

    // Edges
    var seenEdgeKeys = new Set();
    links.forEach(function (l) {
      var key = l.source + "|" + l.target;
      seenEdgeKeys.add(key);
      var line = edgeElsById.get(key);
      if (!line) {
        line = svgEl("line", { class: "pge-edge" });
        edgeElsById.set(key, line);
        els.edgeLayer.appendChild(line);
      }
      line.setAttribute("stroke-width", l.kind === "post" ? 1 : Math.min(5, 1 + l.shared * 0.9));
      line.setAttribute("data-source", l.source);
      line.setAttribute("data-target", l.target);
    });
    edgeElsById.forEach(function (line, key) {
      if (!seenEdgeKeys.has(key)) {
        line.remove();
        edgeElsById.delete(key);
      }
    });

    updateEmphasis();
  }

  function positionElements() {
    nodeElsById.forEach(function (entry, uid) {
      var n = simNodesById.get(uid);
      if (!n) return;
      (entry.anchor ? entry.g : entry.g).setAttribute("transform", "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")");
    });
    edgeElsById.forEach(function (line, key) {
      var parts = key.split("|");
      var a = simNodesById.get(parts[0]);
      var b = simNodesById.get(parts[1]);
      if (!a || !b) return;
      line.setAttribute("x1", a.x.toFixed(1));
      line.setAttribute("y1", a.y.toFixed(1));
      line.setAttribute("x2", b.x.toFixed(1));
      line.setAttribute("y2", b.y.toFixed(1));
    });
  }

  function updateEmphasis() {
    var focusUid = state.focusedTag ? "tag:" + state.focusedTag : state.focusedPost ? "post:" + state.focusedPost : null;
    var connected = new Set();
    if (focusUid) {
      edgeElsById.forEach(function (line, key) {
        var parts = key.split("|");
        if (parts[0] === focusUid) connected.add(parts[1]);
        if (parts[1] === focusUid) connected.add(parts[0]);
      });
    }

    nodeElsById.forEach(function (entry, uid) {
      var classes = ["pge-node", "pge-node--" + (uid.indexOf("post:") === 0 ? "post" : "tag")];
      var tagId = uid.indexOf("tag:") === 0 ? uid.slice(4) : null;
      var t = tagId ? tagIndex.get(tagId) : null;
      if (t && t.deEmphasised) classes.push("pge-node--deemph");
      var isSelected = tagId && state.selectedTags.indexOf(tagId) !== -1;
      if (isSelected) classes.push("pge-node--selected");
      if (uid === focusUid) classes.push("pge-node--hover");
      else if (focusUid && connected.has(uid)) classes.push("pge-node--connected");
      else if (focusUid) classes.push("pge-node--dim");
      entry.g.setAttribute("class", classes.join(" "));
      if (tagId) entry.g.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    edgeElsById.forEach(function (line, key) {
      var parts = key.split("|");
      var cls = "pge-edge";
      if (focusUid) {
        if (parts[0] === focusUid || parts[1] === focusUid) cls += " pge-edge--active";
        else cls += " pge-edge--dim";
      }
      line.setAttribute("class", cls);
    });
  }

  function wireNodeEvents(g, nodeRef) {
    function currentNode() {
      return simNodesById.get(g === nodeRef.g ? nodeRef.uid : nodeRef.uid);
    }

    g.addEventListener("mouseenter", function () {
      var n = simNodesById.get(nodeRef.uid);
      if (!n) return;
      if (n.type === "tag") state.focusedTag = n.id;
      else state.focusedPost = n.id;
      updateEmphasis();
      showStatus(hoverStatusText(n), { silent: true });
    });
    g.addEventListener("mouseleave", function () {
      state.focusedTag = null;
      state.focusedPost = null;
      updateEmphasis();
    });
    g.addEventListener("focus", function () {
      var n = simNodesById.get(nodeRef.uid);
      if (!n) return;
      if (n.type === "tag") state.focusedTag = n.id;
      else state.focusedPost = n.id;
      updateEmphasis();
    });
    g.addEventListener("blur", function () {
      state.focusedTag = null;
      state.focusedPost = null;
      updateEmphasis();
    });

    function activate() {
      var n = simNodesById.get(nodeRef.uid);
      if (!n || n.type !== "tag") return;
      if (state.selectedTags.indexOf(n.id) === -1) {
        addTag(n.id);
      } else {
        state.focusedTag = n.id;
        updateEmphasis();
        announce(n.label + " is already selected. Its connections are highlighted.");
      }
    }

    g.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    // Drag (pointer events cover mouse + touch + pen). Only claims the
    // gesture once movement exceeds a small threshold, so a tap still
    // behaves like a click and page scroll elsewhere is untouched.
    var dragState = null;
    g.addEventListener("pointerdown", function (e) {
      var n = simNodesById.get(nodeRef.uid);
      if (!n || e.button && e.button !== 0) return;
      var pt = toSvgPoint(e.clientX, e.clientY);
      dragState = { startX: pt.x, startY: pt.y, moved: false, pointerId: e.pointerId, node: n };
    });
    g.addEventListener("pointermove", function (e) {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      var pt = toSvgPoint(e.clientX, e.clientY);
      var dx = pt.x - dragState.startX;
      var dy = pt.y - dragState.startY;
      if (!dragState.moved && Math.hypot(dx, dy) < 4) return;
      if (!dragState.moved) {
        dragState.moved = true;
        try { g.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
        simulation.alphaTarget(reduceMotion ? 0 : 0.12).restart();
      }
      e.preventDefault();
      dragState.node.fx = pt.x;
      dragState.node.fy = pt.y;
      dragState.node.x = pt.x;
      dragState.node.y = pt.y;
      clampNodes();
      positionElements();
    });
    function endDrag(e) {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      var wasClick = !dragState.moved;
      if (dragState.moved) {
        simulation.alphaTarget(0);
      }
      dragState = null;
      if (wasClick) activate();
    }
    g.addEventListener("pointerup", endDrag);
    g.addEventListener("pointercancel", endDrag);
  }

  function toSvgPoint(clientX, clientY) {
    var rect = els.svg.getBoundingClientRect();
    var x = ((clientX - rect.left) / rect.width) * VIEW_W;
    var y = ((clientY - rect.top) / rect.height) * VIEW_H;
    return { x: x, y: y };
  }

  function hoverStatusText(n) {
    if (n.type === "post") return n.title + (n.date ? ", " + formatDate(n.date) : "");
    var t = tagIndex.get(n.id);
    var strongest = neighboursOf(n.id)[0];
    var bits = [t.label + " — " + t.postCount + (t.postCount === 1 ? " post" : " posts"), t.degree + (t.degree === 1 ? " connection" : " connections")];
    if (strongest) bits.push("strongest link: " + strongest.id);
    return bits.join(" · ");
  }

  function renderOverflow() {
    var wrap = els.graphWrap;
    var existing = wrap.querySelector(".post-explorer-overflow");
    var info = overflowInfo();
    if (!info.length) {
      if (existing) existing.remove();
      return;
    }
    if (!existing) {
      existing = document.createElement("div");
      existing.className = "post-explorer-overflow";
      existing.style.position = "absolute";
      existing.style.right = "0.6rem";
      existing.style.bottom = "0.5rem";
      existing.style.display = "flex";
      existing.style.gap = "0.4rem";
      existing.style.flexWrap = "wrap";
      existing.style.justifyContent = "flex-end";
      wrap.appendChild(existing);
    }
    existing.innerHTML = "";
    info.forEach(function (o) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "post-explorer-toggle";
      btn.style.fontSize = "0.68rem";
      btn.style.padding = "0.2rem 0.55rem";
      btn.textContent = "+" + o.hiddenCount + " more (" + o.tagId + ")";
      btn.addEventListener("click", function () {
        neighbourReveal.set(o.tagId, neighboursOf(o.tagId).length);
        render();
        announce("Showing all connections for " + o.tagId + ".");
      });
      existing.appendChild(btn);
    });
  }

  function renderTruncationNotice(truncatedPostCount) {
    var existing = els.graphWrap.querySelector(".post-explorer-truncated");
    if (truncatedPostCount > 0) {
      if (!existing) {
        existing = document.createElement("p");
        existing.className = "post-explorer-truncated post-explorer-legend";
        existing.style.right = "0.85rem";
        existing.style.left = "auto";
        els.graphWrap.appendChild(existing);
      }
      existing.textContent = "showing " + config.maxPostNodes + " of " + (config.maxPostNodes + truncatedPostCount) + " matching posts";
    } else if (existing) {
      existing.remove();
    }
  }

  /* ---------------------------------------------------------------------
   * Results list + tag cloud (existing server-rendered markup, just
   * toggled/announced from here — no DOM reconstruction).
   * ------------------------------------------------------------------- */

  function updateResults() {
    var selected = state.selectedTags;
    var items = Array.prototype.slice.call(els.resultsList.querySelectorAll(".post-list-item"));
    var visibleCount = 0;
    items.forEach(function (li) {
      var tags = (li.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var matches =
        !selected.length ||
        (state.filterMode === "and"
          ? selected.every(function (t) { return tags.indexOf(t) !== -1; })
          : selected.some(function (t) { return tags.indexOf(t) !== -1; }));
      li.hidden = !matches;
      if (matches) visibleCount++;
    });

    els.resultsCount.textContent = selected.length
      ? visibleCount + " matching post" + (visibleCount === 1 ? "" : "s")
      : visibleCount + " post" + (visibleCount === 1 ? "" : "s");

    if (selected.length && visibleCount === 0) {
      els.resultsCount.textContent =
        state.filterMode === "and" ? "No posts match that intersection." : "No posts match any of those tags.";
    }

    if (els.tagCloudAll) els.tagCloudAll.classList.toggle("active", selected.length === 0);
    Array.prototype.slice.call(els.tagCloud.querySelectorAll("a.tag[data-tag]")).forEach(function (a) {
      a.classList.toggle("active", selected.indexOf(a.getAttribute("data-tag")) !== -1);
    });
  }

  /* ---------------------------------------------------------------------
   * Chips
   * ------------------------------------------------------------------- */

  function renderChips() {
    els.chips.innerHTML = "";
    state.selectedTags.forEach(function (tagId) {
      var chip = document.createElement("span");
      chip.className = "post-explorer-chip";
      var label = document.createElement("span");
      label.textContent = tagId;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Remove " + tagId + " from selection");
      btn.textContent = "×";
      btn.addEventListener("click", function () {
        removeTag(tagId);
      });
      chip.appendChild(label);
      chip.appendChild(btn);
      els.chips.appendChild(chip);
    });
  }

  /* ---------------------------------------------------------------------
   * Status / announcements
   * ------------------------------------------------------------------- */

  var statusTimer = null;
  function showStatus(text, opts) {
    opts = opts || {};
    els.status.textContent = text;
    if (!opts.persist) {
      clearTimeout(statusTimer);
      statusTimer = setTimeout(function () {
        if (els.status.textContent === text) els.status.textContent = "";
      }, 4000);
    }
  }
  function announce(text) {
    showStatus(text);
  }

  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat("en-NZ", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
    } catch (err) {
      return "";
    }
  }
  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
  }

  /* ---------------------------------------------------------------------
   * Core actions
   * ------------------------------------------------------------------- */

  function addTag(tagId, opts) {
    opts = opts || {};
    tagId = normaliseTag(tagId);
    if (!tagIndex.has(tagId)) {
      announce('Unknown tag "' + tagId + '".');
      return false;
    }
    if (state.selectedTags.indexOf(tagId) === -1) {
      state.selectedTags.push(tagId);
      announce("Added " + tagId + ".");
    } else {
      announce(tagId + " is already selected.");
    }
    state.focusedTag = tagId;
    afterStateChange({ pushHistory: !opts.silent });
    return true;
  }

  function removeTag(tagId) {
    tagId = normaliseTag(tagId);
    var idx = state.selectedTags.indexOf(tagId);
    if (idx === -1) {
      announce(tagId + " isn't selected.");
      return;
    }
    state.selectedTags.splice(idx, 1);
    neighbourReveal.delete(tagId);
    if (state.focusedTag === tagId) state.focusedTag = null;
    announce("Removed " + tagId + ".");
    afterStateChange({ pushHistory: true });
  }

  function clearTags() {
    state.selectedTags = [];
    neighbourReveal.clear();
    state.focusedTag = null;
    announce("Cleared selection.");
    afterStateChange({ pushHistory: true });
  }

  function resetExplorer() {
    state.selectedTags = [];
    state.filterMode = "and";
    state.showPostNodes = false;
    state.focusedTag = null;
    neighbourReveal.clear();
    announce("Reset.");
    afterStateChange({ pushHistory: true });
  }

  function setMode(mode) {
    if (mode !== "and" && mode !== "or") return;
    state.filterMode = mode;
    announce("Match mode: " + mode.toUpperCase() + ".");
    afterStateChange({ pushHistory: true });
  }

  function setPostNodes(on) {
    state.showPostNodes = !!on;
    announce("Posts in graph: " + (on ? "on" : "off") + ".");
    afterStateChange({ pushHistory: true });
  }

  function normaliseTag(tagId) {
    return (tagId || "").toString().trim().toLowerCase();
  }

  function afterStateChange(opts) {
    opts = opts || {};
    renderChips();
    updateResults();
    render();
    updateControlsUI();
    if (opts.pushHistory) syncUrl(true);
  }

  function updateControlsUI() {
    els.modeBtns.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-mode") === state.filterMode ? "true" : "false");
    });
    els.postsToggle.setAttribute("aria-pressed", state.showPostNodes ? "true" : "false");
    els.postsToggle.querySelector("span").textContent = state.showPostNodes ? "ON" : "OFF";
  }

  /* ---------------------------------------------------------------------
   * Console: autocomplete + commands
   * ------------------------------------------------------------------- */

  var commandHistory = [];
  var historyIndex = -1;
  var activeOptionIndex = -1;
  var currentOptions = []; // [{ type: "tag"|"command", value, label, meta }]

  function tagSuggestions(query) {
    var q = query.toLowerCase();
    var starts = [];
    var contains = [];
    tagIndex.forEach(function (t) {
      if (t.id === q) return;
      if (t.id.indexOf(q) === 0) starts.push(t);
      else if (t.id.indexOf(q) !== -1) contains.push(t);
    });
    function byCount(a, b) { return b.postCount - a.postCount; }
    starts.sort(byCount);
    contains.sort(byCount);
    return starts.concat(contains).slice(0, 8);
  }

  function buildOptions(rawValue) {
    var value = rawValue.trim();
    if (!value) return [];

    var firstWord = value.split(/\s+/)[0].toLowerCase();
    var options = [];

    if (COMMANDS.indexOf(firstWord) === 0 || COMMANDS.indexOf(value.toLowerCase()) !== -1) {
      // fallthrough — bare command handled below
    }

    var isBareCommand = ["help", "clear", "reset", "random"].indexOf(value.toLowerCase()) !== -1;
    var isArgCommand = ["add", "remove", "mode", "posts", "focus"].indexOf(firstWord) !== -1 && /\s/.test(value);

    if (isBareCommand) {
      options.push({ type: "command", value: value.toLowerCase(), label: value.toLowerCase(), meta: "command" });
    } else if (isArgCommand) {
      options.push({ type: "command", value: value, label: value, meta: "command" });
    } else {
      // Suggest matching bare commands first (e.g. typing "he" -> "help").
      COMMANDS.forEach(function (c) {
        if (["help", "clear", "reset", "random"].indexOf(c) !== -1 && c.indexOf(value.toLowerCase()) === 0 && c !== value.toLowerCase()) {
          options.push({ type: "command", value: c, label: c, meta: "command" });
        }
      });
      tagSuggestions(value).forEach(function (t) {
        options.push({ type: "tag", value: t.id, label: t.id, meta: t.postCount + (t.postCount === 1 ? " post" : " posts") });
      });
    }

    return options.slice(0, 9);
  }

  function renderListbox() {
    els.listbox.innerHTML = "";
    if (!currentOptions.length) {
      els.listbox.hidden = true;
      els.input.setAttribute("aria-expanded", "false");
      return;
    }
    currentOptions.forEach(function (opt, i) {
      var li = document.createElement("li");
      li.className = "post-explorer-listbox-option" + (opt.type === "command" ? " is-command" : "");
      li.id = "explorer-option-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === activeOptionIndex ? "true" : "false");
      var label = document.createElement("span");
      label.textContent = opt.label;
      var count = document.createElement("span");
      count.className = "count";
      count.textContent = opt.meta;
      li.appendChild(label);
      li.appendChild(count);
      li.addEventListener("mousedown", function (e) {
        e.preventDefault(); // keep focus in the input
        chooseOption(opt);
      });
      els.listbox.appendChild(li);
    });
    els.listbox.hidden = false;
    els.input.setAttribute("aria-expanded", "true");
    els.input.setAttribute("aria-activedescendant", activeOptionIndex >= 0 ? "explorer-option-" + activeOptionIndex : "");
  }

  function closeListbox() {
    currentOptions = [];
    activeOptionIndex = -1;
    renderListbox();
  }

  function chooseOption(opt) {
    if (opt.type === "command") {
      runCommandString(opt.value);
    } else {
      addTag(opt.value);
    }
    els.input.value = "";
    closeListbox();
    els.input.focus();
  }

  function runCommandString(input) {
    var parts = input.trim().split(/\s+/);
    var cmd = (parts[0] || "").toLowerCase();
    var arg = parts.slice(1).join(" ").toLowerCase();

    commandHistory.push(input.trim());
    historyIndex = commandHistory.length;

    switch (cmd) {
      case "help":
        toggleHelp(true);
        break;
      case "add":
        if (!arg) announce("Usage: add <tag>");
        else addTag(arg);
        break;
      case "remove":
        if (!arg) announce("Usage: remove <tag>");
        else removeTag(arg);
        break;
      case "clear":
        clearTags();
        break;
      case "reset":
        resetExplorer();
        break;
      case "mode":
        if (arg === "and" || arg === "or") setMode(arg);
        else announce("Usage: mode and|or");
        break;
      case "posts":
        if (arg === "on") setPostNodes(true);
        else if (arg === "off") setPostNodes(false);
        else announce("Usage: posts on|off");
        break;
      case "focus":
        if (!arg) announce("Usage: focus <tag>");
        else {
          var norm = normaliseTag(arg);
          if (tagIndex.has(norm)) {
            addTag(norm);
            state.focusedTag = norm;
            render();
          } else {
            announce('Unknown tag "' + arg + '".');
          }
        }
        break;
      case "random":
        var pick = pickRandomSubjectTag();
        if (pick) {
          state.selectedTags = [];
          neighbourReveal.clear();
          addTag(pick);
        }
        break;
      default:
        // Not a recognised command — treat the whole input as a tag name.
        if (tagIndex.has(normaliseTag(input))) addTag(input);
        else announce('Unknown command or tag: "' + input + '". Type help for commands.');
    }
  }

  function onInputChanged() {
    var value = els.input.value;
    activeOptionIndex = -1;
    currentOptions = buildOptions(value);
    renderListbox();
  }

  function moveActiveOption(delta) {
    if (!currentOptions.length) return;
    activeOptionIndex = (activeOptionIndex + delta + currentOptions.length) % currentOptions.length;
    renderListbox();
  }

  function navigateHistory(delta) {
    if (!commandHistory.length) return;
    historyIndex = Math.max(0, Math.min(commandHistory.length, historyIndex + delta));
    els.input.value = historyIndex < commandHistory.length ? commandHistory[historyIndex] : "";
    closeListbox();
  }

  els.input.addEventListener("input", onInputChanged);

  els.input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentOptions.length) moveActiveOption(1);
      else navigateHistory(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentOptions.length) moveActiveOption(-1);
      else navigateHistory(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeOptionIndex >= 0 && currentOptions[activeOptionIndex]) {
        chooseOption(currentOptions[activeOptionIndex]);
      } else if (currentOptions.length === 1) {
        chooseOption(currentOptions[0]);
      } else if (els.input.value.trim()) {
        runCommandString(els.input.value);
        els.input.value = "";
        closeListbox();
      }
    } else if (e.key === "Tab" && currentOptions.length && !e.shiftKey) {
      var opt = currentOptions[activeOptionIndex >= 0 ? activeOptionIndex : 0];
      if (opt && opt.value.toLowerCase() !== els.input.value.trim().toLowerCase()) {
        e.preventDefault();
        els.input.value = opt.value;
        onInputChanged();
      }
    } else if (e.key === "Escape") {
      if (currentOptions.length) {
        e.preventDefault();
        closeListbox();
      } else if (state.focusedTag || state.focusedPost) {
        state.focusedTag = null;
        state.focusedPost = null;
        updateEmphasis();
      }
    }
  });

  els.input.addEventListener("blur", function () {
    // Delay so a mousedown-selection on a listbox option still registers.
    setTimeout(closeListbox, 120);
  });

  /* ---------------------------------------------------------------------
   * Static controls
   * ------------------------------------------------------------------- */

  els.modeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setMode(btn.getAttribute("data-mode"));
    });
  });
  els.postsToggle.addEventListener("click", function () {
    setPostNodes(!state.showPostNodes);
  });
  els.resetBtn.addEventListener("click", resetExplorer);

  function toggleHelp(force) {
    var next = typeof force === "boolean" ? force : els.help.hidden;
    els.help.hidden = !next;
    els.helpToggle.setAttribute("aria-expanded", next ? "true" : "false");
  }
  els.helpToggle.addEventListener("click", function () { toggleHelp(); });

  /* ---------------------------------------------------------------------
   * Progressive enhancement: hijack the plain tag links so they drive the
   * explorer instead of navigating away, while leaving real hrefs intact
   * for no-JS visitors, crawlers and modifier-key clicks.
   * ------------------------------------------------------------------- */

  function wireTagLink(a) {
    a.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      addTag(a.getAttribute("data-tag"));
      els.input.focus();
    });
    a.addEventListener("mouseenter", function () {
      state.focusedTag = a.getAttribute("data-tag");
      updateEmphasis();
    });
    a.addEventListener("mouseleave", function () {
      state.focusedTag = null;
      updateEmphasis();
    });
  }
  Array.prototype.slice
    .call(document.querySelectorAll("#post-tag-cloud a.tag[data-tag], #post-results-list a.tag[data-tag]"))
    .forEach(wireTagLink);

  if (els.tagCloudAll) {
    els.tagCloudAll.addEventListener("click", function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      resetExplorer();
    });
  }

  /* ---------------------------------------------------------------------
   * URL state
   * ------------------------------------------------------------------- */

  function readStateFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var tagsParam = params.get("tags");
    var mode = params.get("mode");
    var postsParam = params.get("posts");

    var dropped = [];
    var tags = [];
    if (tagsParam) {
      tagsParam
        .split(",")
        .map(normaliseTag)
        .filter(Boolean)
        .forEach(function (t) {
          if (tagIndex.has(t)) {
            if (tags.indexOf(t) === -1) tags.push(t);
          } else {
            dropped.push(t);
          }
        });
    }

    state.selectedTags = tags;
    state.filterMode = mode === "or" ? "or" : "and";
    state.showPostNodes = postsParam === "1";

    if (dropped.length) {
      announce("Ignored unknown tag" + (dropped.length > 1 ? "s" : "") + " in link: " + dropped.join(", ") + ".");
    }
  }

  function syncUrl(push) {
    var params = new URLSearchParams();
    if (state.selectedTags.length) params.set("tags", state.selectedTags.join(","));
    if (state.filterMode !== "and") params.set("mode", state.filterMode);
    if (state.showPostNodes) params.set("posts", "1");
    var qs = params.toString();
    var url = window.location.pathname + (qs ? "?" + qs : "");
    if (push) window.history.pushState({ pge: true }, "", url);
    else window.history.replaceState({ pge: true }, "", url);
  }

  window.addEventListener("popstate", function () {
    readStateFromUrl();
    neighbourReveal.clear();
    renderChips();
    updateResults();
    updateControlsUI();
    render();
  });

  /* ---------------------------------------------------------------------
   * Keyboard shortcut: "/" focuses the console (unless already typing
   * somewhere, or a modifier is held that might mean something else).
   * ------------------------------------------------------------------- */

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || (document.activeElement && document.activeElement.isContentEditable)) return;
    if (!isInViewport(root)) return;
    e.preventDefault();
    els.input.focus();
  });

  function isInViewport(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  /* ---------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------- */

  readStateFromUrl();
  renderChips();
  updateResults();
  updateControlsUI();
  render();
  syncUrl(false);

  root.hidden = false;
})();
