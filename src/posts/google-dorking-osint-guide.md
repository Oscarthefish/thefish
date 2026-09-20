---
title: "Google Dorking for OSINT: The Practical Investigator's Guide"
date: 2026-09-16
series: "osint"
categories:
  - "osint"
  - "google-dorking"
  - "trace-labs"
tags:
  - "osint"
  - "google-dorking"
  - "trace-labs"
  - "skills"
  - "field-guide"
seoTitle: "Google Dorking for OSINT: The Practical Investigator's Guide | Jason Hill"
description: "A practical Google dorking reference for OSINT investigators: current search operators, query-building techniques, people and username searches, document discovery, timelines and Trace Labs workflows."
coverImage: "google-dorking-cover.svg"
coverImageAlt: "Terminal-style illustration of a Google dork: site:linkedin.com/in \"Jane Doe\""
---

This is the reference I keep open in a tab during OSINT work, particularly Trace Labs investigations. It isn't a list of a thousand pre-built dorks to copy and paste. Those lists go stale, and worse, they teach you to look for a magic string instead of understanding what's actually happening when you search.

The operators themselves are a small, stable set. What changes investigation to investigation is how you combine them and what you do with what comes back. So that's what this guide is built around: the operators that currently work, the ones that don't (despite what a lot of older cheat sheets still claim), and the thinking that turns a Google search into an investigative pivot.

_Last verified against Google's current documentation and observed behaviour: September 2026. Search behaviour changes over time. If you spot something here that's stopped working the way it's described, [let me know](mailto:oscarthephish@gmail.com)._

<div class="contents-box">
<p class="contents-lead">visitor@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#philosophy">Don't memorise dorks: learn the pattern</a></li>
<li><a href="#core-operators">Core operators you actually need</a></li>
<li><a href="#caution-operators">Operators that need caution</a></li>
<li><a href="#deprecated-operators">Deprecated and unreliable operators</a></li>
<li><a href="#playbooks">Investigation playbooks</a></li>
<li><a href="#associations">Association searching</a></li>
<li><a href="#distinctive-text">Distinctive-text searching</a></li>
<li><a href="#historical-searching">Timeline and historical searching</a></li>
<li><a href="#search-engines">Search-engine hopping</a></li>
<li><a href="#ghdb">The Google Hacking Database</a></li>
<li><a href="#ethics">Ethics and scope</a></li>
<li><a href="#cheat-sheet">Cheat sheet</a></li>
<li><a href="#further-reading">Further reading</a></li>
</ul>
</div>
<div>
<h3>Jump to an operator or topic</h3>
<ul>
<li><a href="#exact-phrase">Exact phrase "…"</a></li>
<li><a href="#site">site:</a></li>
<li><a href="#exclude-site">-site:</a></li>
<li><a href="#filetype">filetype:</a></li>
<li><a href="#intitle">intitle:</a></li>
<li><a href="#inurl">inurl:</a></li>
<li><a href="#intext">intext:</a></li>
<li><a href="#exclusions">Exclusions (-)</a></li>
<li><a href="#or-operator">OR</a></li>
<li><a href="#parentheses">Parentheses</a></li>
<li><a href="#wildcard">Wildcard (*)</a></li>
<li><a href="#before">before:</a></li>
<li><a href="#after">after:</a></li>
<li><a href="#person">People</a></li>
<li><a href="#usernames">Usernames</a></li>
<li><a href="#email">Email</a></li>
<li><a href="#phone">Phone</a></li>
<li><a href="#address">Address</a></li>
<li><a href="#social-platforms">Social media</a></li>
<li><a href="#linkedin">LinkedIn</a></li>
<li><a href="#organisations">Organisations</a></li>
<li><a href="#documents">Documents</a></li>
<li><a href="#historical-searching">Historical searching</a></li>
</ul>
</div>
</div>
</div>

<h2 id="philosophy">Don't memorise dorks: learn the pattern</h2>

The framing I use for every query is the same five components:

<pre class="flow-diagram"><span class="step">TARGET</span> <span class="arrow">+</span> <span class="step">IDENTIFIER</span> <span class="arrow">+</span> <span class="step">CONTEXT</span> <span class="arrow">+</span> <span class="step">SOURCE</span> <span class="arrow">+</span> <span class="step">FILTER</span></pre>

- **Target**: the person, username, organisation or thing you're investigating.
- **Identifier**: a name, alias, email, phone number, handle.
- **Context**: something that narrows it, such as a city, employer, year or relationship.
- **Source**: a specific platform or domain, via `site:`.
- **Filter**: a format or exclusion, via `filetype:` or `-`.

You don't need all five in every query, and you build them up one at a time rather than trying to write the perfect query on the first attempt. A realistic sequence for a Trace Labs-style person search looks like this:

```text
"John Smith" "Auckland" site:linkedin.com/in
```

Nothing back? Drop the source, try a document filter instead:

```text
"John Smith" "Auckland" filetype:pdf
```

Found a PDF with an email address in it. That email is now its own target:

```text
"john.smith@example.com"
```

Getting swamped by the domain the email lives on:

```text
"john.smith@example.com" -site:example.com
```

Every result is a potential new identifier, and every new identifier is a new query. That's the whole method. Formally:

<pre class="flow-diagram"><span class="step">Search broad</span>
<span class="arrow">↓</span>
<span class="step">Find a distinctive clue</span>
<span class="arrow">↓</span>
<span class="step">Search that clue exactly</span>
<span class="arrow">↓</span>
<span class="step">Add context</span>
<span class="arrow">↓</span>
<span class="step">Remove false positives</span>
<span class="arrow">↓</span>
<span class="step">Search specific sources</span>
<span class="arrow">↓</span>
<span class="step">Search documents</span>
<span class="arrow">↓</span>
<span class="step">Search historically</span>
<span class="arrow">↓</span>
<span class="step">Search associations</span>
<span class="arrow">↓</span>
<span class="step">Try another search engine</span>
<span class="arrow">↓</span>
<span class="step">Record evidence</span>
<span class="arrow">↓</span>
<span class="step">Repeat</span></pre>

<div class="callout callout--tip">

<p class="callout-label">OSINT tip</p>

The goal isn't to write the cleverest possible Google query. It's to generate the next useful investigative pivot. If a query gives you one new name, alias or domain to search next, it did its job, even if it returned nothing else.

</div>

<h2 id="core-operators">Core operators you actually need</h2>

These are the operators I'd actually put money on working reliably today. I've checked each of these against Google's own [search operator documentation](https://support.google.com/websearch/answer/2466433) rather than assuming an old blog post is still accurate.

<h3 id="exact-phrase">Exact phrase: "…"</h3>

Wrapping text in quotes tells Google to match that exact sequence of words, rather than treating it as a bag of keywords it can rearrange, drop, or "helpfully" swap for synonyms. This is the single operator I use most often, and it's the foundation almost everything else builds on.

```text
"Jane Doe" "Wellington"
```

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Exact phrase match is strong, but not absolute. Google can still normalise punctuation, casing and some Unicode characters. Don't assume a zero-result exact phrase search proves a string doesn't exist anywhere on the indexed web. It only proves Google hasn't indexed it in that exact form.

</div>

<h3 id="site">site:</h3>

Restricts results to a domain, or a specific path on that domain. This is the operator that turns "search the entire internet" into "search this one place."

```text
site:linkedin.com/in "Jane Doe"
```

```text
site:facebook.com "Jane Doe" Wellington
```

You can go as specific as a subdomain, or as broad as a TLD:

```text
"Jane Doe" site:.gov.nz
```

<h3 id="exclusions">Exclusions: -</h3>

A minus sign directly before a word or operator (no space) excludes it. This is how you cut the noise out of a search rather than just adding more terms to try to drown it out.

```text
"Jane Doe" -actress -musician
```

<h4 id="exclude-site">Excluding a whole site: -site:</h4>

Combine the exclusion with `site:` to remove an entire domain from the results, most commonly the domain a piece of identifying information came from, so you can see where else it turns up.

```text
"jane.doe@example.com" -site:example.com
```

<h3 id="filetype">filetype:</h3>

Restricts results to a specific document format. This is one of the highest-value operators for OSINT because organisations leak an enormous amount of identifying detail through documents nobody thought to scrub: author metadata, internal names, phone extensions, org charts.

```text
"Jane Doe" filetype:pdf
```

```text
site:example.com filetype:xlsx
```

<div class="callout callout--tracelabs">

<p class="callout-label">Trace labs tip</p>

`filetype:pdf` against a school, sports club or employer's domain turns up newsletters, minutes and rosters that were never meant to be a people-search tool, but frequently are one. Full names next to team names, grades, or job titles are common.

</div>

<h3 id="or-parentheses">Combining terms: OR and parentheses</h3>

<h4 id="or-operator">OR</h4>

`OR` (capitalised: lowercase "or" is treated as a normal word) matches any of the terms rather than requiring all of them. Useful for name variants, nicknames, or spelling differences.

```text
"Jon Smith" OR "John Smith" OR "Jonathan Smith"
```

<h4 id="parentheses">Parentheses</h4>

Group `OR` terms so they don't leak into the rest of the query. Without grouping, Google's operator precedence can produce a much broader search than you intended.

```text
site:linkedin.com/in "Auckland" ("John Smith" OR "Jon Smith" OR "Jonny Smith")
```

<h3 id="wildcard">Wildcard: *</h3>

Inside a quoted phrase, `*` acts as a placeholder for one or more unknown words. It's genuinely useful for filling in a gap in a phrase you only partially know, such as a half-remembered quote, a bio fragment or a document title.

```text
"employee of the * at" "Ministry of"
```

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Wildcard matching in modern Google is noticeably looser than it used to be, and it's not officially documented as precisely "one word per asterisk" any more. Treat it as a soft hint rather than a strict placeholder, and always sanity-check the results. It can match a different number of words than you expect, or get ignored entirely outside a quoted phrase.

</div>

<h3 id="title-url-text">intitle:, inurl:, intext:</h3>

These three restrict where your term has to appear, rather than just anywhere on the page.

<h4 id="intitle">intitle:</h4>

Matches pages where the term appears in the page's `<title>`. Good for finding a page that's specifically *about* something, not one that just mentions it in passing.

```text
intitle:"resume" "Jane Doe"
```

<h4 id="inurl">inurl:</h4>

Matches the term appearing in the URL itself. Handy for finding profile pages, ID-based paths, or specific URL patterns a platform uses.

```text
inurl:profile "janedoe"
```

<h4 id="intext">intext:</h4>

Forces the term to appear in the visible body text of the page, as opposed to a title, URL, or alt text. In practice this overlaps heavily with just typing the word normally, since Google already searches body text by default. It's useful when you're stacking it with `intitle:` or `inurl:` restrictions on other terms in the same query, to be explicit about where each term must land.

```text
intitle:"staff directory" intext:"Jane Doe"
```

<h3 id="before-after">before: and after:</h3>

Restrict results to Google's indexed date for a page, rather than a full text match. Written as `before:YYYY-MM-DD` and `after:YYYY-MM-DD`.

<span id="before"></span>

```text
"John Smith" before:2018-01-01
```

<span id="after"></span>

```text
"John Smith" after:2018-01-01
```

Combine both to bracket a window:

```text
"John Smith" after:2018-01-01 before:2020-01-01
```

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

The date `before:`/`after:` filters on is when Google believes the page was published or last significantly changed, which is frequently *not* the same as when the content you're looking at was actually written. Pages get republished, templates get regenerated, and Google's date detection is heuristic, not authoritative. Treat a date match as a lead to verify against the page itself (bylines, comment timestamps, wayback captures), never as confirmed provenance on its own.

</div>

<h2 id="caution-operators">Operators that need caution</h2>

These still function in some form, but each has a real limitation that's easy to get burned by if you treat it like a core operator.

**`allintitle:`, `allinurl:`, `allintext:`** apply "all following words must match" to every term after them, for the rest of the query. That means they don't combine cleanly with other operators the way `intitle:`/`inurl:`/`intext:` do. Put anything else in the same query and behaviour gets unpredictable. Google's own guidance is to use these alone, not stacked with other operators. I mostly skip them in favour of repeating `intitle:` per term, which is clearer and behaves more predictably.

**`AROUND(X)`** is an undocumented proximity operator (`term1 AROUND(3) term2`) that's meant to match terms within a set number of words of each other. It's not in Google's official operator list, its behaviour is inconsistent, and it can silently fail to apply without warning. If you use it, verify every result manually rather than trusting the proximity constraint held.

<h2 id="deprecated-operators">Deprecated and unreliable operators</h2>

If you've found an older Google dorking cheat sheet, and most of what's floating around the internet is from 2015 to 2020, it almost certainly includes some of the following. None of these should be relied on today.

- **`cache:`**: Google officially discontinued the cached-page feature in 2024. The operator no longer returns a cached snapshot.
- **`related:`**: the "similar sites" operator was deprecated years ago and no longer returns meaningful results.
- **`link:`**: never fully reliable for general use, and today it doesn't provide the kind of backlink discovery people used to reach for it. Use a proper backlink tool if you need that.
- **`info:`** and **`id:`** are legacy operators for a one-page summary of a URL. Both are discontinued.
- **`phonebook:`**: Google's old phone/address lookup operator, retired a long time ago.
- **`~`** (synonym search): deprecated around 2013. Google's core algorithm handles synonym matching automatically now, without the operator.
- **`+`** (force exact match on a word): superseded by quoting. Use `"word"` instead.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

If an operator isn't on [Google's current documentation page](https://support.google.com/websearch/answer/2466433), assume it's either deprecated or was never officially supported, no matter how many cheat sheets still list it. Verify before you build a workflow around it.

</div>

<h2 id="playbooks">Investigation playbooks</h2>

These are the patterns I actually reach for, organised by what you're starting with. None of these assume the platform is fully indexed by Google. It isn't, for any of them, so treat every result as a lead, and go to the platform directly when a Google search comes up empty.

<h3 id="person">Person</h3>

Start broad, then layer on context one piece at a time until the noise drops out.

```text
"John Smith" Auckland
```

```text
"John Smith" "Auckland" "Acme Corp"
```

```text
"John Smith" "nickname" OR "Johnny"
```

```text
"John Smith" "born" OR "graduated"
```

Useful context layers to add, one at a time: full name variants, middle name, nickname, suburb or city, employer, occupation, and known associates (see [association searching](#associations) below).

<h3 id="usernames">Username</h3>

Usernames are frequently reused across platforms, which makes them one of the strongest pivots available.

```text
"johndoe1987"
```

```text
"johndoe1987" -site:instagram.com
```

```text
"johndoe1987" OR "johndoe_1987" OR "john.doe.1987"
```

```text
"johndoe1987" "John" OR "email"
```

<div class="callout callout--tip">

<p class="callout-label">OSINT tip</p>

Google indexes a fraction of any given platform's usernames, and it changes over time as pages get crawled or de-indexed. For thorough username enumeration across platforms, a dedicated tool like [WhatsMyName](https://whatsmyname.app/) will get you much further than Google alone. Use search to confirm and add context to what those tools surface, rather than as your primary discovery method.

</div>

<h3 id="email">Email</h3>

```text
"john.smith@example.com"
```

```text
"john.smith@example.com" -site:example.com
```

```text
"john.smith" "example.com"
```

```text
"john.smith@example.com" "John Smith"
```

Searching the local part (`john.smith`) alone, without the domain, can surface the same handle reused on a different email provider or as a username elsewhere, which is worth trying once the full address dries up.

<h3 id="phone">Phone</h3>

Search every formatting variant. Sites, forms and people all write numbers differently, and Google's phrase match is exact, so a single missing space is enough to miss a result.

```text
"021 123 4567"
```

```text
"0211234567"
```

```text
"+64 21 123 4567"
```

```text
"+64211234567"
```

```text
"021-123-4567"
```

<h3 id="address">Address</h3>

```text
"12 Queen Street, Auckland"
```

```text
"12 Queen St" Auckland
```

```text
"John Smith" "12 Queen Street"
```

```text
"Acme Corp" "12 Queen Street"
```

Try both the full and abbreviated forms (Street/St, Road/Rd, Avenue/Ave) as separate exact-phrase searches. Google won't normalise Street/St for you.

<h3 id="organisations">Organisation</h3>

```text
site:example.com
```

```text
"Acme Corp" filetype:pdf
```

```text
"Acme Corp" "annual report" OR "directors"
```

```text
"Acme Corp" "contact" "phone" OR "email"
```

```text
"Acme Corp" before:2015
```

The last one, an old date bracket against a company name, is useful for finding a company's earlier web presence: previous names, previous addresses, staff who've since moved on, or a version of the site from before a rebrand.

<h3 id="documents">Documents</h3>

Every common office and data format is worth checking individually. Don't assume `filetype:pdf` alone covers it, since different organisations default to different formats.

```text
"Jane Doe" filetype:pdf
```

```text
"Jane Doe" filetype:doc OR filetype:docx
```

```text
"Jane Doe" filetype:xls OR filetype:xlsx
```

```text
"Jane Doe" filetype:ppt OR filetype:pptx
```

```text
"Jane Doe" filetype:csv
```

```text
"Jane Doe" filetype:txt
```

<div class="callout callout--example">

<p class="callout-label">Example</p>

For a Trace Labs case involving a school-aged missing person, `site:[school-domain] filetype:pdf` against the school's own site turned up a newsletter PDF containing a full class list and a parent's mobile number in a permission-slip footer. Nobody intended that PDF to be a people-search tool. It just wasn't scrubbed before being uploaded, and Google indexed it like any other page.

</div>

<h3 id="social-platforms">Social platforms</h3>

Google indexes a genuinely small and inconsistent slice of most social platforms. Some content is public but blocked from crawling by the platform's own `robots.txt`, some is public but simply hasn't been crawled, and plenty is only visible once you're logged in and searching the platform directly. Treat every query below as "does Google happen to have this," not "does this exist."

```text
site:linkedin.com/in "Jane Doe"
```

```text
site:facebook.com "Jane Doe" Auckland
```

```text
site:instagram.com "Jane Doe"
```

```text
site:reddit.com "johndoe1987"
```

```text
site:github.com "John Smith"
```

```text
site:youtube.com "John Smith"
```

```text
site:tiktok.com "@johndoe1987"
```

```text
site:pinterest.com "Jane Doe"
```

<h4 id="linkedin">LinkedIn</h4>

LinkedIn is worth its own note because it's usually the highest-value source for professional context: employer, role, location, colleagues. It's also one of the more consistently (if partially) indexed platforms.

```text
site:linkedin.com/in "Jane Doe" Auckland
```

```text
site:linkedin.com/in "Jane Doe" "Acme Corp"
```

```text
site:linkedin.com/in "Jane Doe" -"student"
```

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

LinkedIn actively limits what it exposes to search-engine crawlers, and profile visibility settings change what's indexed at all. A missing search result means "not indexed," never "does not exist." Confirm through LinkedIn's own search once you have a name to check.

</div>

<h2 id="associations">Association searching: nodes and edges</h2>

A lot of OSINT progress doesn't come from searching for your target directly. It comes from searching for the things and people connected to them. Think of it less as "search for a person" and more as mapping a small network:

<pre class="flow-diagram"><span class="step">People</span>
<span class="arrow">↔</span>
<span class="step">Usernames</span>
<span class="arrow">↔</span>
<span class="step">Emails</span>
<span class="arrow">↔</span>
<span class="step">Phones</span>
<span class="arrow">↔</span>
<span class="step">Addresses</span>
<span class="arrow">↔</span>
<span class="step">Organisations</span>
<span class="arrow">↔</span>
<span class="step">Documents</span>
<span class="arrow">↔</span>
<span class="step">Other people</span></pre>

Every one of those is a jumping-off point to the next. In practice, the queries are simple, usually just two identifiers in the same exact-phrase search:

```text
"John Smith" "Jane Doe"
```

```text
"John Smith" "Acme Corp"
```

```text
"John Smith" "12 Queen Street"
```

```text
"johndoe1987" "john.smith@example.com"
```

Two names appearing together repeatedly across otherwise unrelated pages is a real signal: a family relationship, a workplace, a shared event, a sports team. It's rarely proof on its own, but it's exactly the kind of lead that turns into a confirmed connection once you check it against a second, independent source.

<h2 id="distinctive-text">Distinctive-text searching</h2>

People and organisations reuse text constantly: a bio paragraph copied from an old CV into a new one, a conference speaker blurb pasted into three different event pages, a phrase from a personal "about me" that's been sitting untouched on a site for a decade. Search for that exact wording, not just the name.

```text
"passionate about building products that make a difference"
```

```text
"has over 10 years of experience in" "Acme Corp"
```

A distinctive sentence like that can surface:

- previous employers or organisations, where the same bio was reused
- old conference or speaker-listing pages
- abandoned personal websites or blogs
- accounts the person has since stopped using
- archived or cached copies referenced elsewhere
- a fuller employment history than any single profile shows

<div class="callout callout--tip">

<p class="callout-label">OSINT tip</p>

The more specific and oddly-phrased the sentence, the better it works. A generic line like "hard-working team player" will match thousands of unrelated people. A specific, slightly unusual phrase someone actually wrote is close to a fingerprint.

</div>

<h2 id="historical-searching">Timeline and historical searching</h2>

`before:` and `after:` (covered [above](#before-after)) are the main tools for reconstructing someone's earlier footprint: old employer, old username, old writing style, before a rebrand or a name change.

```text
"John Smith" before:2015
```

```text
"johndoe1987" before:2018
```

```text
"Acme Corp" after:2010 before:2015
```

<div class="callout callout--tracelabs">

<p class="callout-label">Trace labs tip</p>

Apply the same date-bracketing approach to a company name, not just a person, when you're trying to establish where someone worked and when. A window search against an employer's name alongside your target's name can help place them in a specific role or period even when neither shows up in a direct search.

</div>

Remember: as noted under `before:`/`after:` above, the date Google shows you is when it believes the page was indexed or last changed, not a verified publication date. Cross-check anything time-sensitive against the page itself, the Wayback Machine, or another independent source before treating it as fact.

<h2 id="search-engines">Search-engine hopping</h2>

Google is one index of the web, not the web itself. Different engines crawl different things, weight results differently, and in a few cases are noticeably less aggressive about filtering or de-ranking certain kinds of content. When a Google search dries up, the same query on a different engine is often worth thirty seconds:

- **Bing**: a genuinely different index, with its own `site:`/`filetype:`/`intitle:` style operators. Worth trying anything that came up empty on Google.
- **Brave Search**: runs its own independent index rather than relying on another engine's results.
- **DuckDuckGo**: blends multiple sources, useful as a quick second opinion.
- **Yandex**: indexes Russian-language and Eastern European content far more thoroughly than Google does, and is worth trying specifically for content in that region.

I'm not going to turn this into a full guide to each engine's operators here. That's a big enough topic for its own post, but the habit of trying a second engine before giving up on a lead is worth building regardless.

<h2 id="ghdb">The Google Hacking Database</h2>

If you've spent any time around Google dorking, you'll have come across the [Google Hacking Database (GHDB)](https://www.exploit-db.com/google-hacking-database), maintained on Exploit-DB. It traces back to Johnny Long, who popularised the term "Google dork" in the mid-2000s by cataloguing search queries that exposed login pages, misconfigured devices, and files that were never meant to be public.

The GHDB is a genuinely useful reference for understanding what a **search footprint** looks like: the kind of file names, error strings, or URL patterns that show up when something's been misconfigured or overshared. That mindset carries over well to OSINT: knowing what a leaked spreadsheet's filename convention looks like, or what a misconfigured directory listing looks like in a URL, helps you recognise it when you stumble across it.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

The GHDB is built around vulnerability-oriented queries: finding exposed admin panels, credentials, or misconfigured systems. That's a different discipline (and a different authorisation model) to OSINT people-search work. This guide is about finding and verifying information about people and organisations within the scope of a legitimate investigation, not about finding or touching vulnerable systems. If a query in that spirit turns up something like an exposed panel or a credentials file, that's the point to stop, not the point to start testing it.

</div>

<h2 id="ethics">Ethics and scope</h2>

A few things worth keeping in view while you're doing this work, whether it's a Trace Labs CTF, a real missing-persons case, or professional research:

- Google dorking searches what's already indexed. That it's indexed doesn't mean it's appropriate to collect, store, or redistribute. Apply the same judgement you'd apply to any other OSINT source.
- Finding exposed credentials in a search result does not authorise you to use them.
- Finding an exposed system, panel, or file share does not authorise you to access it.
- Stay inside the rules and scope of whatever you're working on, whether that's a CTF's rules of engagement, a client's investigation scope, or your own organisation's policy.
- Don't attempt authentication, exploitation, or "just checking" access to a system simply because a search engine revealed it exists. That's a different activity requiring separate, explicit authorisation.

None of that is meant to be alarmist. Most OSINT work never comes close to any of these lines. It's just worth being deliberate about where the line actually is, especially in a fast-moving CTF environment where the instinct is to chase every lead as far as it goes.

<h2 id="cheat-sheet">Cheat sheet</h2>

The condensed version. Everything below is covered in more depth earlier in the guide. This is here for when you already know what you're doing and just need the syntax.

<div class="table-scroll">

| Operator | Purpose | Example |
| --- | --- | --- |
| `"…"` | Exact phrase match | `"Jane Doe"` |
| `site:` | Restrict to a domain or path | `site:linkedin.com/in "Jane Doe"` |
| `-` | Exclude a word | `"Jane Doe" -actress` |
| `-site:` | Exclude a domain | `"jane@example.com" -site:example.com` |
| `filetype:` | Restrict to a document format | `"Jane Doe" filetype:pdf` |
| `intitle:` | Term must be in the page title | `intitle:"resume" "Jane Doe"` |
| `inurl:` | Term must be in the URL | `inurl:profile "janedoe"` |
| `intext:` | Term must be in the body text | `intext:"Jane Doe"` |
| `OR` | Match any of the terms | `"John" OR "Jon" OR "Jonathan"` |
| `( )` | Group OR terms | `("John" OR "Jon") "Auckland"` |
| `*` | Wildcard inside a phrase (soft match) | `"employee of the * at"` |
| `before:` | Indexed before a date | `"John Smith" before:2018-01-01` |
| `after:` | Indexed after a date | `"John Smith" after:2018-01-01` |

</div>

<div class="table-scroll">

| Investigation | Starting query |
| --- | --- |
| Person | `"John Smith" "Auckland"` |
| Email | `"john.smith@example.com" -site:example.com` |
| Username | `"johndoe1987" -site:instagram.com` |
| Phone | `"+64 21 123 4567"` |
| Address | `"John Smith" "12 Queen Street"` |
| LinkedIn | `site:linkedin.com/in "John Smith" "Auckland"` |
| Reddit | `site:reddit.com "johndoe1987"` |
| GitHub | `site:github.com "John Smith"` |
| Documents | `"John Smith" filetype:pdf` |
| Organisation | `"Acme Corp" filetype:pdf "directors"` |
| Historical search | `"John Smith" before:2015` |
| Associations | `"John Smith" "Jane Doe"` |

</div>

<h2 id="further-reading">Further reading</h2>

- [Google Search operators (official documentation)](https://support.google.com/websearch/answer/2466433)
- [ShadowDragon: Google Dorks for OSINT](https://shadowdragon.io/resources/google-dorks/)
- [Google Hacking Database (Exploit-DB)](https://www.exploit-db.com/google-hacking-database)
- [Ahrefs: Google Advanced Search Operators](https://ahrefs.com/blog/google-advanced-search-operators/)
