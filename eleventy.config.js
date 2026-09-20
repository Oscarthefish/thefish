import postGraphConfig from "./src/_data/postGraphConfig.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  // Vendor a locally-served, dependency-order UMD build of d3-force for the
  // /posts/ relationship graph — no CDN, no bundler, stays in sync with
  // whatever version npm has installed since it's copied straight out of
  // node_modules at build time rather than committed as a duplicate copy.
  eleventyConfig.addPassthroughCopy({
    "node_modules/d3-dispatch/dist/d3-dispatch.min.js": "assets/js/vendor/d3-dispatch.min.js",
    "node_modules/d3-timer/dist/d3-timer.min.js": "assets/js/vendor/d3-timer.min.js",
    "node_modules/d3-quadtree/dist/d3-quadtree.min.js": "assets/js/vendor/d3-quadtree.min.js",
    "node_modules/d3-force/dist/d3-force.min.js": "assets/js/vendor/d3-force.min.js",
  });

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return new Intl.DateTimeFormat("en-NZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  });

  // The single source of truth for "what counts as a public tag": every
  // tag on every post, minus Eleventy's own internal "posts" collection
  // marker (added by src/posts/posts.json, not something an author wrote).
  // Every other public-tag consumer below (postGraph, publicTags filter)
  // reuses this exact rule rather than redefining it.
  const isPublicTag = (tag) => tag !== "posts";

  eleventyConfig.addFilter("publicTags", (tags) => (tags || []).filter(isPublicTag));

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getFilteredByTag("posts").forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (isPublicTag(tag)) tagSet.add(tag);
      });
    });
    return [...tagSet].sort();
  });

  // Build-time data for the /posts/ relationship explorer. Derived entirely
  // from the same post collection/front matter that generates the rest of
  // the site — no second database, no manually maintained relationships.
  eleventyConfig.addCollection("postGraph", (collectionApi) => {
    const posts = [];
    const tagPostIds = new Map(); // tag -> Set<postId>

    collectionApi.getFilteredByTag("posts").forEach((item) => {
      const tags = [...new Set((item.data.tags || []).filter(isPublicTag))];
      if (!tags.length) return;

      posts.push({
        id: item.url,
        title: item.data.title || item.url,
        url: item.url,
        date: item.date ? item.date.toISOString() : null,
        tags,
      });

      tags.forEach((tag) => {
        if (!tagPostIds.has(tag)) tagPostIds.set(tag, new Set());
        tagPostIds.get(tag).add(item.url);
      });
    });

    const tags = [...tagPostIds.keys()]
      .sort()
      .map((id) => ({
        id,
        label: id,
        postCount: tagPostIds.get(id).size,
        hidden: postGraphConfig.hiddenFromGraph.includes(id),
        deEmphasised: postGraphConfig.deEmphasisedTags.includes(id),
      }));

    // Jaccard similarity between every pair of tags that co-occur on at
    // least one post: shared / (countA + countB - shared). Keeps a very
    // common tag from dominating just because it's common — a relationship
    // has to be earned by the two tags actually going together, not merely
    // by both being frequent.
    const sharedCounts = new Map(); // "a|b" (a < b) -> shared post count
    posts.forEach((post) => {
      const sorted = [...post.tags].sort();
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const key = `${sorted[i]}|${sorted[j]}`;
          sharedCounts.set(key, (sharedCounts.get(key) || 0) + 1);
        }
      }
    });

    const edges = [...sharedCounts.entries()].map(([key, shared]) => {
      const [source, target] = key.split("|");
      const countA = tagPostIds.get(source).size;
      const countB = tagPostIds.get(target).size;
      const union = countA + countB - shared;
      const strength = union > 0 ? Math.round((shared / union) * 1000) / 1000 : 0;
      return { source, target, shared, strength };
    });

    edges.sort((a, b) => b.strength - a.strength);

    return { posts, tags, edges, config: postGraphConfig };
  });

  eleventyConfig.addCollection("fieldGuides", (collectionApi) =>
    collectionApi.getFilteredByTag("field-guide"),
  );

  // Safe to drop straight into a <script type="application/json"> block:
  // escapes characters that could otherwise prematurely close the tag.
  eleventyConfig.addFilter("toSafeJSON", (data) =>
    JSON.stringify(data ?? null)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026"),
  );

  eleventyConfig.addFilter("filterBySeries", (guides, series) => {
    if (!series) return guides;
    return (guides || []).filter((guide) => guide.data.series === series);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
