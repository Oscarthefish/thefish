// Raw curation data for reading paths (see eleventy.config.js's "learningPaths"
// collection for how this gets resolved against the real post collection).
//
// This file is intentionally just curation: which posts, in what order, at
// what priority. It does not duplicate title/description/URL, those are
// resolved from each post's own front matter at build time, so editing a
// post's title or description never requires touching this file.
//
// Priority is per-path, not global: the same post can be "essential" in one
// path and "optional" or absent entirely in another. Valid values: essential,
// recommended, optional, reference.
//
// To add a new path: add a new top-level key here, following the same
// shape, then re-run the build. The "learningPaths" collection resolves
// slugs, computes step numbers and reading time, and throws a build error if
// a slug doesn't match a real post, so a typo here fails loudly rather than
// shipping a broken link.
export default {
  "security-operations": {
    title: "Security Operations",
    description:
      "A practical route through thefish.nz for SOC and Security Operations analysts. Start with investigation methodology, build through common incident types and threat hunting, then add the CIS and NIST framework knowledge commonly requested in Security Operations roles.",
    routeSummary: "SOC investigation → incident response → hunting → CIS/NIST → interview prep",
    audience: ["SOC Analyst", "Security Operations Analyst", "Senior SOC Analyst"],
    sections: [
      {
        title: "Start Here",
        description: "Build the investigation mindset first.",
        articles: [
          { slug: "alert-to-conclusion-investigating-without-tunnel-vision", priority: "essential" },
          { slug: "how-to-scope-a-security-incident", priority: "essential" },
        ],
      },
      {
        title: "Core Investigation Skills",
        description: "The everyday territory: identity, phishing, telemetry, PowerShell, ransomware.",
        articles: [
          { slug: "windows-event-logs-for-soc-analysts", priority: "essential" },
          { slug: "identity-attacks-for-soc-analysts", priority: "essential" },
          { slug: "from-header-to-host-phishing-investigation", priority: "essential" },
          { slug: "spf-dkim-dmarc-email-authentication", priority: "recommended" },
          { slug: "ip-isnt-the-attacker-nat-vpn-proxy", priority: "essential" },
          { slug: "powershell-is-not-the-alert", priority: "essential" },
          { slug: "ransomware-before-the-ransomware", priority: "essential" },
        ],
      },
      {
        title: "Move Beyond Reactive Investigation",
        description: "From closing alerts to actively looking for what hasn't fired an alert yet.",
        articles: [{ slug: "threat-hunting-for-soc-analysts", priority: "essential" }],
      },
      {
        title: "Framework Literacy",
        description:
          "The framework knowledge most useful when a Security Operations role asks for CIS or NIST experience.",
        articles: [
          { slug: "cis-controls-v8-1-for-soc-analysts", priority: "essential" },
          { slug: "nist-csf-2-0-for-soc-analysts", priority: "essential" },
        ],
      },
      {
        title: "Interview Preparation",
        description: "Put the investigation mindset and framework literacy into words.",
        articles: [
          { slug: "how-to-think-like-a-soc-analyst-in-an-interview", priority: "essential" },
          { slug: "security-frameworks-interview-guide", priority: "essential" },
        ],
      },
      {
        title: "Further Depth",
        description: "Optional reading for analysts moving toward assurance and cross-framework work.",
        articles: [
          { slug: "security-assurance-for-soc-analysts", priority: "optional" },
          { slug: "security-control-testing", priority: "optional" },
          { slug: "comparing-cybersecurity-frameworks", priority: "reference" },
        ],
      },
    ],
  },
};
