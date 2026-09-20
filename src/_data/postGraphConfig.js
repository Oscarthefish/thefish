// Escape hatch for the /posts/ relationship explorer (src/assets/js/post-explorer.js).
//
// New tags on new posts need zero configuration here — they become graph
// candidates automatically. Only touch this file when a tag is organisational
// (a series/format label rather than a subject) and is crowding out the
// interesting parts of the graph.
//
// hiddenFromGraph tags are still perfectly normal tags everywhere else: they
// still get a /tags/<tag>/ page, still show up in the post-list tag pills,
// and are still typeable/filterable in the explorer's console. This list only
// controls whether the tag is allowed to appear as a NODE in the graph.
export default {
  // Never rendered as a graph node. Good candidates: series/format labels
  // that appear on a wide, unrelated spread of posts and add noise rather
  // than a meaningful relationship (e.g. "this is part of a field guide"
  // says nothing about what the field guide is about).
  hiddenFromGraph: ["field-guide", "skills"],

  // Rendered as graph nodes, but scored down for the initial "no selection"
  // node pick and drawn slightly less prominently. Use this for tags that
  // are real topics but too generic/organisational to anchor exploration.
  deEmphasisedTags: ["tools", "kase-scenarios"],

  // Tags to bias toward when computing the initial (no-selection) node set,
  // if present in the archive and not hidden. Leave empty to let the
  // scoring function (post count + graph degree + relationship strength)
  // pick entirely on its own.
  preferredInitialTags: [],

  // How many tag nodes to show when nothing is selected.
  maxInitialNodes: 10,

  // How many of a tag's strongest relationships to reveal per expansion
  // (i.e. per click/select). Desktop value; the client halves this on
  // narrow viewports.
  maxNeighboursPerExpansion: 8,

  // How many post nodes to render at once when "posts in graph" is toggled
  // on. Keeps the graph from becoming unusable once the archive grows.
  maxPostNodes: 30,

  // Below this Jaccard similarity, a relationship is treated as too weak to
  // rank/display even though the raw co-occurrence count is kept for
  // debugging and edge width.
  minRelationshipStrength: 0.03,
};
