---
title: "Google Dorking for Trace Labs: 50 OSINT Investigation Pivots"
date: 2026-09-17
series: "osint"
categories:
  - "osint"
  - "trace-labs"
  - "google-dorking"
  - "investigation"
  - "research"
tags:
  - "osint"
  - "trace-labs"
  - "google-dorking"
  - "investigation"
  - "research"
  - "field-guide"
seoTitle: "Google Dorking for Trace Labs: 50 OSINT Investigation Pivots | Jason Hill"
description: "Found a name, username, email, phone or address? This practical Trace Labs OSINT field guide provides 50 Google search pivots for turning small clues into the next investigative lead."
coverImage: "google-dorking-pivots-cover.svg"
coverImageAlt: "Terminal-style illustration of pivoting from one identifier to another"
---

My [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/) covers what the operators actually do: `site:`, `filetype:`, exclusions, date filters, all of it. This page assumes you already know that, and exists for the moment those operators are supposed to solve. You've found *something*, a name, a username, an email, a phone number typed out in a screenshot, and you need to know what to do with it right now, mid-investigation, before the lead goes cold.

Every confirmed piece of information is a potential pivot. An investigation isn't a straight line from person to Google to answer. It's a small network of people, usernames, emails, phone numbers, addresses, employers, schools, relatives, clubs and documents, and most of the work is finding and verifying the relationships between them. The question worth asking on every single result is: **what else could this tell me?**

_Last verified against current Google search behaviour: September 2026._

<div class="contents-box" id="found-something">
<p class="contents-lead">$ ./pivot.sh --input "IDENTIFIER"</p>
<h3>Found something? Do this.</h3>
<ol>
<li><strong>Search it exactly.</strong> Quote it, don't paraphrase it.
<pre><code class="language-text">"IDENTIFIER"</code></pre>
</li>
<li><strong>Add context.</strong> A location, employer or year cuts out most of the noise.
<pre><code class="language-text">"IDENTIFIER" LOCATION</code></pre>
</li>
<li><strong>Exclude where you found it.</strong> See where else it turns up.
<pre><code class="language-text">"IDENTIFIER" -site:SOURCE.com</code></pre>
</li>
<li><strong>Combine it with another identifier.</strong> Two independent clues together are far stronger than either alone.
<pre><code class="language-text">"IDENTIFIER A" "IDENTIFIER B"</code></pre>
</li>
<li><strong>Search historically.</strong> Check what existed before today.
<pre><code class="language-text">"IDENTIFIER" before:2020-01-01</code></pre>
</li>
<li><strong>Pivot to associated people or organisations.</strong> Nobody exists in isolation online, so look at who and what surrounds this identifier.</li>
<li><strong>Record it, corroborate it, then repeat.</strong> Add it to your <a href="#identifier-board">identifier board</a> with a confidence level before you move on.</li>
</ol>
</div>

<div class="contents-box">
<p class="contents-lead">visitor@thefish.nz:~$ cat pivots.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#start-here">Start here</a></li>
<li><a href="#ethics-scope">Scope and ethics</a></li>
<li><a href="#person">Person</a></li>
<li><a href="#email">Email</a></li>
<li><a href="#username">Username</a></li>
<li><a href="#phone">Phone</a></li>
<li><a href="#address">Address</a></li>
<li><a href="#employment">Employment &amp; organisations</a></li>
<li><a href="#documents">Documents</a></li>
<li><a href="#text-historical">Text &amp; historical footprints</a></li>
<li><a href="#associates-events">Associates &amp; events</a></li>
<li><a href="#advanced-pivoting">Advanced pivoting</a></li>
<li><a href="#stuck">When you're stuck</a></li>
<li><a href="#trace-labs-context">A note on Trace Labs</a></li>
<li><a href="#further-reading">Further reading</a></li>
</ul>
</div>
<div>
<h3>Quick tools</h3>
<ul>
<li><a href="#found-something">Found something? Do this</a></li>
<li><a href="#identifier-board">Identifier board</a></li>
<li><a href="#three-query-rule">The three-query rule</a></li>
<li><a href="#two-identifier-rule">The two-identifier rule</a></li>
<li><a href="#confidence-levels">Confidence levels</a></li>
<li><a href="#pivot-matrix">Pivot matrix</a></li>
<li><a href="#investigation-loop">The investigation loop</a></li>
<li><a href="#stuck-checklist">60-second stuck checklist</a></li>
</ul>
</div>
</div>
</div>

<h2 id="start-here">Start here</h2>

<h3 id="pivot-mindset">The pivot mindset</h3>

Don't think of an investigation as person → Google → answer. Think of it as a small network: people, usernames, emails, phone numbers, addresses, employers, schools, relatives, associates, clubs, hobbies, events, documents and old accounts, all connected to each other. Most of what you're actually doing, moment to moment, is finding an edge between two nodes you already have, then using that edge to reach the next node.

Practically, that means every result deserves the same question before you move on to the next search: **what else could this tell me?** A LinkedIn profile isn't just confirmation of an employer. It's a job title, a list of colleagues, a location, sometimes a university. A single Facebook comment isn't background noise. It's a name, a relationship, a shared event, occasionally a second account.

For the operator mechanics behind any query pattern below (what `site:`, `filetype:`, exclusions, `OR` or date filters actually do), see the [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/). This page assumes that part is covered and is built entirely around the next decision: what to do with what you've just found.

<h3 id="identifier-board">Identifier board</h3>

Keep a running record of everything you've found, what you believe it means, and how confident you are in it. A spreadsheet, a notes doc, a whiteboard: the format doesn't matter. What matters is writing it down before you pivot again, because four hours into a Trace Labs case you will not remember which of three candidate usernames was the one with the matching profile photo.

A worked example, using a fictional case:

<div class="table-scroll">

| Field | Value | Confidence | Source / evidence |
| --- | --- | --- | --- |
| Full name | John Smith | CONFIRMED | Named in a public missing-persons appeal |
| Nickname | Johnny | PROBABLE | Used by family in Facebook comments |
| Current location | Auckland | CONFIRMED | Stated in the appeal |
| Previous location | Hamilton | POSSIBLE | Mentioned in an old forum post, unverified |
| Username | johnsmith82 | POSSIBLE | Same profile photo as confirmed Facebook account, not yet corroborated |
| Email | j.smith82@example.com | POSSIBLE | Found in a forum export, unverified |
| Employer | Example Ltd | PROBABLE | LinkedIn profile matching name and location |
| Relative | Jane Smith (mother) | CONFIRMED | Tagged in family photos, named in the public appeal |
| Vehicle | White Toyota Hilux | POSSIBLE | Mentioned once by an associate, unverified |

</div>

Fields worth tracking: full name, middle name, nicknames, DOB or approximate age, current location, previous locations, username(s), email(s), phone(s), current address, previous address, employer, previous employer, school or university, relative(s), associate(s), club or team, hobby, vehicle, website or domain, and any other distinctive clue.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

A username or photo match alone is never identity confirmation. People reuse profile photos, usernames get recycled by different people over the years, and stock photos exist. Treat a single-source match as POSSIBLE until something independent moves it up, such as a second platform, a named relative, or a detail only the real person would have.

</div>

<h3 id="three-query-rule">The three-query rule</h3>

This isn't an OSINT law. It's a habit to stop you overlooking the obvious the moment you're under time pressure. Whenever you find a new identifier, of any kind, run it through three queries before moving on.

**1: Exact**

```text
"johnsmith82"
```

**2: Context**

```text
"johnsmith82" Auckland
```

**3: Exclude the source**

```text
"johnsmith82" -site:instagram.com
```

That third step matters more than it looks. If you found the username on Instagram, excluding `instagram.com` clears away the platform you already know about and shows you everywhere else it appears, which is usually where the actual pivot is hiding.

<h3 id="two-identifier-rule">The two-identifier rule</h3>

One identifier generates candidates. Two independent identifiers, searched together, help you tell which candidate is actually your target. That's a meaningfully different kind of search from anything in the three-query rule above.

```text
"John Smith" Auckland
```

```text
"John Smith" "Example Ltd"
```

```text
"John Smith" "johnsmith82"
```

```text
"John Smith" "0211234567"
```

```text
"johnsmith82" "john@example.com"
```

Correlation isn't proof by itself. Two things appearing on the same page can be coincidence, especially with a common name. Treat a two-identifier match as a strong lead, then look for a second, independent source before moving it to CONFIRMED.

<h3 id="confidence-levels">Confidence levels</h3>

<div class="table-scroll">

| Level | What it means |
| --- | --- |
| **CONFIRMED** | Multiple independent pieces of evidence establish the relationship. |
| **PROBABLE** | Several clues strongly support it, but it isn't conclusive yet. |
| **POSSIBLE** | An interesting lead that needs more corroboration before you rely on it. |
| **REJECTED** | Evidence shows the candidate probably isn't the target. Worth recording so you don't re-investigate it later. |

</div>

This doesn't need to be formal. The point is to stop tunnel vision: it's very easy, four hours into a case, to start treating a POSSIBLE from hour one as though it was always CONFIRMED. Write the level down next to the evidence, and downgrade things the moment new evidence contradicts them.

<h2 id="ethics-scope">Scope and ethics</h2>

This guide is about finding, connecting and corroborating information that's already public, not about getting access to information that isn't. A few boundaries worth keeping explicit, especially in a time-pressured Trace Labs environment where the instinct is to chase every lead as far as it'll go:

- This covers publicly available information. Don't attempt to access private accounts, bypass authentication, guess or use passwords, or otherwise get into something that isn't public.
- Don't contact targets, relatives or associates directly, deceptively or otherwise, as part of a pivot. That's outside the scope of open-source research and outside Trace Labs' rules.
- Finding a piece of information doesn't authorise using it beyond the investigation's actual purpose. Corroborate and record it; don't redistribute more than the case requires.
- Stay inside whatever rules and scope apply, whether that's a CTF's rules of engagement or your organisation's policy for a real case.

If you're taking part in Trace Labs specifically, check their current [official rules and code of conduct](https://www.tracelabs.org/) before an event rather than relying on this or any other blog post. Competition structure and permitted techniques get updated between events.

<h2 id="person">Person</h2>

Starting point: a name. These are the fourteen directions I check before I consider a name search exhausted.

<h3 id="pivot-1">Pivot 1: Name variations</h3>

Run the full name, then the obvious variants: shortened first name, full legal first name, common nickname pairs (Jon/John/Jonathan, Liz/Elizabeth), and the name including a middle name or initial.

```text
"Jon Smith" OR "John Smith" OR "Jonathan Smith"
```

<h3 id="pivot-2">Pivot 2: Name + location</h3>

The single highest-value piece of context for a common name.

```text
"John Smith" Auckland
```

<h3 id="pivot-3">Pivot 3: Name + employer</h3>

```text
"John Smith" "Example Ltd"
```

Confirms employment and often surfaces a staff page, press mention or LinkedIn profile you hadn't found yet.

<h3 id="pivot-4">Pivot 4: Name + school or university</h3>

```text
"John Smith" "Auckland Grammar" OR "University of Auckland"
```

Alumni pages, old yearbooks and reunion event listings are frequently indexed and rarely locked down.

<h3 id="pivot-5">Pivot 5: Name + relative</h3>

```text
"John Smith" "Jane Smith"
```

<div class="callout callout--pivot">

<p class="callout-label">Pivot</p>

A relative's public footprint is very often larger and less guarded than the target's. See [sideways pivoting](#pivot-49) below. Sometimes the fastest route to your target is through someone else entirely.

</div>

<h3 id="pivot-6">Pivot 6: Name + associate</h3>

```text
"John Smith" "Mike Jones"
```

Two names appearing together repeatedly across otherwise unrelated pages, such as a comment thread, a tagged photo or a team roster, is a real signal worth following up.

<h3 id="pivot-7">Pivot 7: Name + hobby or interest</h3>

```text
"John Smith" "mountain biking" OR "rugby"
```

Hobbies lead to clubs, and clubs lead to member lists and event photos. See [Associates & events](#associates-events).

<h3 id="pivot-8">Pivot 8: Name + club or team</h3>

```text
"John Smith" "Ponsonby Rugby Club"
```

<h3 id="pivot-9">Pivot 9: Name + vehicle</h3>

```text
"John Smith" "Toyota Hilux"
```

Vehicle mentions turn up in marketplace listings, car and motorbike club forums (prolifically documented communities), and local Facebook groups.

<h3 id="pivot-10">Pivot 10: Name + life event</h3>

```text
"John Smith" "wedding" OR "obituary" OR "funeral"
```

<div class="callout callout--tracelabs">

<p class="callout-label">Trace labs tip</p>

Death, wedding and birth notices are some of the most reliably information-dense pages on the web for family relationships. They exist specifically to list names, relationships and locations. Local newspaper sites are usually well indexed.

</div>

<h3 id="pivot-11">Pivot 11: Name + document</h3>

```text
"John Smith" filetype:pdf
```

See [Documents](#documents) below for what to actually extract once you've found one.

<h3 id="pivot-12">Pivot 12: Name + platform</h3>

```text
site:linkedin.com/in "John Smith" Auckland
```

Run this once per platform that matters for the case. See the [social platforms playbook](/posts/google-dorking-osint-guide/#social-platforms) in the operator guide for the full list.

<h3 id="pivot-13">Pivot 13: Name, searched historically</h3>

```text
"John Smith" before:2015
```

Surfaces an earlier version of someone's online presence: a previous employer, an old username, a different city. See [Search backwards](#search-backwards).

<h3 id="pivot-14">Pivot 14: Exhausted the name? Pivot to an identifier</h3>

Once name variations, location and context stop producing anything new, stop searching the name and start searching whatever identifiers it's already produced: a username, an email, a phone number, an address. Those are usually far more specific than a name, and specificity is what breaks a stalled search.

<h2 id="email">Email</h2>

An email address is one of the strongest identifiers available, because unlike a name it's usually unique to one person.

<h3 id="pivot-15">Pivot 15: Exact email</h3>

```text
"john.smith@example.com"
```

<h3 id="pivot-16">Pivot 16: Local-part only</h3>

```text
"john.smith82"
```

Drop the domain and search the part before the `@` on its own. People frequently reuse the same local part as a username on other services, under a different domain entirely.

<h3 id="pivot-17">Pivot 17: Domain</h3>

```text
"@example.com"
```

<div class="callout callout--pivot">

<p class="callout-label">Pivot</p>

Searching the bare domain can reveal who else uses it, which is often the fastest way to confirm an employer or organisation you only had a guess about.

</div>

<h3 id="pivot-18">Pivot 18: Exclude the source</h3>

```text
"john.smith@example.com" -site:example.com
```

Removes the domain's own site from the results so you can see everywhere else the address has been used or mentioned: forum sign-ups, document indexes, old registrations.

<h2 id="username">Username</h2>

Usernames are the identifier most likely to be reused, unedited, across completely unrelated platforms, which makes them one of the best pivots available.

<h3 id="pivot-19">Pivot 19: Exact username</h3>

```text
"johnsmith82"
```

<h3 id="pivot-20">Pivot 20: Username variations</h3>

```text
"johnsmith82" OR "johnsmith_82" OR "john.smith.82"
```

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

A shared username doesn't guarantee a shared person. Common patterns, such as a name plus a birth year, get reused independently by different people. Corroborate with a second identifier before treating two accounts as the same person.

</div>

<h3 id="pivot-21">Pivot 21: Platform sweep</h3>

```text
site:reddit.com "johnsmith82"
```

Repeat with each platform that's plausible for the case. See the [social platforms](/posts/google-dorking-osint-guide/#social-platforms) list in the operator guide.

<h3 id="pivot-22">Pivot 22: Exclude the platform you found it on</h3>

```text
"johnsmith82" -site:instagram.com
```

<h3 id="pivot-23">Pivot 23: Username + real name or email</h3>

```text
"johnsmith82" "John Smith"
```

```text
"johnsmith82" "john@example.com"
```

<h3 id="pivot-24">Pivot 24: Username + location</h3>

```text
"johnsmith82" Auckland
```

<h3 id="pivot-25">Pivot 25: Hand it to a dedicated tool</h3>

Google indexes a small and inconsistent slice of any platform's usernames. For genuine cross-platform username enumeration, a purpose-built tool will outperform Google every time.

<div class="callout callout--tracelabs">

<p class="callout-label">Trace labs tip</p>

[WhatsMyName](https://whatsmyname.app/) checks a username against several hundred sites in one pass. Use it to generate candidates fast, then bring the results back here and run the [three-query rule](#three-query-rule) on whichever ones look real.

</div>

<h2 id="phone">Phone</h2>

<h3 id="pivot-26">Pivot 26: Every formatting variant</h3>

Phrase matching is exact, so a missing space is enough to miss a result. Search every plausible format.

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

<h3 id="pivot-27">Pivot 27: Phone + name</h3>

```text
"021 123 4567" "John Smith"
```

<h3 id="pivot-28">Pivot 28: Phone + organisation</h3>

```text
"021 123 4567" "Example Ltd"
```

Business directories, contact pages and old cached staff lists often pair a direct-dial number with both a name and an employer on the same page.

<h3 id="pivot-29">Pivot 29: Area code context</h3>

An area code narrows a landline number to a region even before you've found anything else, useful for corroborating or ruling out a candidate's claimed location.

<h3 id="pivot-30">Pivot 30: Marketplace and classifieds reuse</h3>

```text
"021 123 4567" site:trademe.co.nz
```

<div class="callout callout--tracelabs">

<p class="callout-label">Trace labs tip</p>

People list a personal mobile number on marketplace and classifieds sites far more casually than anywhere else, and those listings often carry a full name alongside it. Worth checking even when the case has nothing to do with buying or selling anything.

</div>

<h2 id="address">Address</h2>

<h3 id="pivot-31">Pivot 31: Exact and abbreviated forms</h3>

```text
"12 Queen Street, Auckland"
```

```text
"12 Queen St" Auckland
```

Search both forms as separate exact phrases. Google won't normalise Street/St for you.

<h3 id="pivot-32">Pivot 32: Address + surname</h3>

```text
"12 Queen Street" "Smith"
```

Surfaces other people associated with the same address, useful for finding relatives or flatmates.

<h3 id="pivot-33">Pivot 33: Address + organisation</h3>

```text
"12 Queen Street" "Example Ltd"
```

Confirms a registered business address, or catches an organisation operating out of what looks like a residential one.

<h3 id="pivot-34">Pivot 34: Property and real-estate listings</h3>

Property-value and real-estate sites frequently carry historical sale and rental listings tied to an address, sometimes with agent contact details or a previous occupant's name in older cached pages.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Property listing data is often stale. Ownership and occupancy change and the listing doesn't. Treat an address match as historical unless you can confirm it's current. Government property and company registries are also frequently sitting behind a search form rather than a crawlable page, so don't assume Google has indexed them at all. Check the register directly instead.

</div>

<h2 id="employment">Employment &amp; organisations</h2>

<h3 id="pivot-35">Pivot 35: Staff and directory pages</h3>

```text
site:example.com "our team" OR "staff"
```

<h3 id="pivot-36">Pivot 36: Organisational documents</h3>

```text
"Example Ltd" filetype:pdf "directors" OR "annual report"
```

Company filings, board minutes and annual reports frequently name directors, addresses and contact details that never appear on the company's own website. For confirmed NZ company registration and director information, the [Companies Office register](https://www.companiesoffice.govt.nz/) is the authoritative source. It sits behind a search form rather than being crawled by Google, so check it directly rather than dorking for it.

<h3 id="pivot-37">Pivot 37: Previous employers via reused biography text</h3>

```text
"has spent the last decade helping" "Example Ltd"
```

See [Text & historical footprints](#text-historical). A bio paragraph copied from an old CV into a new profile is one of the more reliable ways to trace someone's employment history.

<h2 id="documents">Documents</h2>

<h3 id="pivot-38">Pivot 38: Broaden the format</h3>

Don't stop at PDF. Different organisations default to different formats.

```text
"John Smith" filetype:pdf
```

```text
"John Smith" filetype:doc OR filetype:docx OR filetype:xlsx
```

<h3 id="pivot-39">Pivot 39: Extract everything, not just the name</h3>

<div class="callout callout--pivot">

<p class="callout-label">Pivot</p>

A document isn't the end of a search. It's a source of several new identifiers. Once you've found one, go back through it and pull out: full and middle names, job titles, email addresses, phone numbers, organisation names, associates named alongside your target, dates, locations, usernames, event names, the document's own title, and any distinctive phrase worth searching on its own. Feed every one of those back into a new search. **Search → extract → corroborate → pivot** is the whole loop, and documents are usually where it produces the most in a single step.

</div>

<h3 id="pivot-40">Pivot 40: Check the document's own metadata</h3>

Right-click → Properties (or the file-info panel in a PDF viewer) sometimes shows an author name in the file's metadata that never appears in the visible text, occasionally the real name behind an otherwise anonymous upload.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Document metadata is frequently wrong or generic: a shared department account, a template's default author, or whoever set up the laptop. Treat it as a lead to check, not a confirmed identity.

</div>

<h2 id="text-historical">Text &amp; historical footprints</h2>

<h3 id="pivot-41">Pivot 41: Distinctive sentence search</h3>

```text
"passionate about restoring classic Japanese motorcycles"
```

People and organisations reuse text constantly: a bio pasted into three different profiles, a conference blurb, an old forum introduction. The more specific and oddly-phrased the sentence, the more it behaves like a fingerprint rather than a generic search term.

<h3 id="pivot-42">Pivot 42: Trace a bio backward through employers</h3>

```text
"has over 10 years of experience in" "Example Ltd"
```

The same paragraph, reused on a newer profile with a different employer's name swapped in, is one of the more reliable ways to build an employment timeline.

<h3 id="pivot-43">Pivot 43: Date-bracketed historical search</h3>

```text
"John Smith" after:2010 before:2015
```

The full technique, and an important caveat about what Google's date actually reflects, is covered in [Timeline and historical searching](/posts/google-dorking-osint-guide/#historical-searching) in the operator guide. Short version: it's an index date, not a confirmed publish date. Treat it as a lead, not a fact.

<h3 id="pivot-44">Pivot 44: Old username to current identity</h3>

```text
"johnsmith82" 2012
```

<div class="callout callout--corroborate">

<p class="callout-label">Corroborate</p>

An old, abandoned account is often less guarded than a current one: old bios, old employer mentions, old real names in "about me" sections. Once you find one, use it as a bridge: search the old username against the identifiers you've already confirmed for the current identity, and look for the same relatives, location or employer showing up on both sides.

</div>

<h2 id="associates-events">Associates &amp; events</h2>

<h3 id="pivot-45">Pivot 45: Relatives</h3>

```text
"Smith" "12 Queen Street"
```

Shared surname plus shared address is one of the fastest ways to surface a parent, sibling or partner.

<h3 id="pivot-46">Pivot 46: Associates</h3>

```text
"John Smith" "Mike Jones"
```

Comments from friends and family tend to leak far more than a target's own posts: nicknames, relationships, inside jokes that turn out to be real details, tagged locations. Reading comments carefully is consistently one of the highest-value techniques in a time-boxed investigation.

<h3 id="pivot-47">Pivot 47: Events</h3>

```text
"John Smith" "wedding" OR "reunion" OR "conference"
```

Weddings, reunions, sports fixtures and conferences are documented by people other than your target: organisers, photographers, other attendees. So the record of them often survives even when the target's own accounts are locked down or deleted.

<h3 id="pivot-48">Pivot 48: Clubs and communities</h3>

```text
"John Smith" "Ponsonby Rugby Club" newsletter
```

Club newsletters, AGM minutes and membership lists are exactly the kind of low-attention-to-security document that ends up as a PDF on a club website with full names, sometimes addresses and phone numbers, never intended as a people-search tool.

<h2 id="advanced-pivoting">Advanced pivoting</h2>

<h3 id="pivot-49">Pivot 49: Sideways pivoting</h3>

Repeatedly searching your target isn't always productive. Sometimes someone else's larger, less guarded public footprint is what actually gets you there.

<pre class="flow-diagram"><span class="step">TARGET</span>
<span class="arrow">↓</span>
<span class="step">RELATIVE</span>
<span class="arrow">↓</span>
<span class="step">ADDRESS</span>
<span class="arrow">↓</span>
<span class="step">EMPLOYER</span>
<span class="arrow">↓</span>
<span class="step">ASSOCIATE</span>
<span class="arrow">↓</span>
<span class="step">USERNAME</span>
<span class="arrow">↓</span>
<span class="step">TARGET</span></pre>

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Association is a lead, not a fact about the target. Finding your target's name next to someone else's doesn't establish anything about the target directly. It only tells you where to look next. Keep it on the identifier board as PROBABLE or POSSIBLE until you have independent evidence about the target specifically.

</div>

<h3 id="pivot-50">Pivot 50: Association searching</h3>

This is the strongest single technique in this guide, and it comes from a shift in the question you're asking. Instead of "what can I find about John?", ask: **can I establish a relationship between these two independently discovered identifiers?**

```text
"John Smith" "johnsmith82"
```

```text
"John Smith" "john@example.com"
```

```text
"John Smith" "021 123 4567"
```

```text
"John Smith" "12 Queen Street"
```

```text
"John Smith" "Example Ltd"
```

```text
"John Smith" "Jane Smith"
```

```text
"johnsmith82" "john@example.com"
```

```text
"johnsmith82" Auckland
```

```text
"john@example.com" "021 123 4567"
```

```text
"12 Queen Street" "Smith"
```

<div class="callout callout--corroborate">

<p class="callout-label">Corroborate</p>

Two identifiers appearing together repeatedly, across otherwise unrelated pages, is a genuinely strong signal, but it's still correlation, not automatic proof. Look for a third, independent source before moving anything from PROBABLE to CONFIRMED. For the underlying concept, people, usernames, emails, phones, addresses and organisations as a network of nodes and edges, see [Association searching](/posts/google-dorking-osint-guide/#associations) in the operator guide.

</div>

<h2 id="stuck">When you're stuck</h2>

<h3 id="pivot-matrix">Pivot matrix</h3>

Find whatever you've got in the left column, and work down the right column until something produces a new identifier.

<div class="table-scroll">

| I have | Pivot to |
| --- | --- |
| Name | location, employer, usernames, relatives, school, hobbies, documents |
| Username | platforms, real name, email, location, other usernames |
| Email | username, domain, name, documents, other appearances |
| Phone | name, address, organisation |
| Address | people, surname, phone, organisations |
| Employer | staff, documents, previous employees, contact information |
| School | alumni, newsletters, sports, events |
| Relative | target, addresses, locations, associates |
| Hobby | clubs, events, usernames, communities |
| Club | members, newsletters, events, photographs |
| Document | people, emails, usernames, organisations, dates |
| Social profile | username, biography text, associates, locations |
| Old identity | newer identity |
| Location | people, organisations, events, associates |

</div>

<h3 id="sideways">Search sideways</h3>

Covered above as [Pivot 49](#pivot-49). When repeated searches of the target produce nothing new, pivot through someone else's public footprint instead.

<h3 id="search-backwards">Search backwards (historically)</h3>

<pre class="flow-diagram"><span class="step">CURRENT IDENTITY</span>
<span class="arrow">↓</span>
<span class="step">OLD EMPLOYER</span>
<span class="arrow">↓</span>
<span class="step">OLD BIOGRAPHY</span>
<span class="arrow">↓</span>
<span class="step">OLD USERNAME</span>
<span class="arrow">↓</span>
<span class="step">OLD ACCOUNT</span>
<span class="arrow">↓</span>
<span class="step">ASSOCIATES / LOCATION</span>
<span class="arrow">↓</span>
<span class="step">CURRENT IDENTITY</span></pre>

Older footprints are frequently less guarded than current ones: privacy settings tightened later, an account abandoned rather than deleted, a bio nobody thought to update. See [Pivot 43](#pivot-43) and [Pivot 44](#pivot-44) above, and the full technique in [Timeline and historical searching](/posts/google-dorking-osint-guide/#historical-searching).

<h3 id="other-engines">Search outside Google</h3>

A dead end in Google isn't necessarily a dead end on the internet. It's a dead end in one company's index. Bing, Brave Search, DuckDuckGo and, particularly for Russian-language or Eastern European content, Yandex all maintain independent indexes and can turn up material Google hasn't crawled or has since dropped. Take your confirmed identifiers with you and run the same exact-phrase searches again. This isn't a tutorial on those engines' own operators (see [Search-engine hopping](/posts/google-dorking-osint-guide/#search-engines) in the operator guide for that). The point here is simply: don't stop at one index.

<h3 id="investigation-loop">The investigation loop</h3>

<pre class="flow-diagram"><span class="step">START</span>
<span class="arrow">↓</span>
<span class="step">What do I know?</span>
<span class="arrow">↓</span>
<span class="step">Choose the strongest identifier</span>
<span class="arrow">↓</span>
<span class="step">Search it exactly</span>
<span class="arrow">↓</span>
<span class="step">Add context</span>
<span class="arrow">↓</span>
<span class="step">Exclude the known source</span>
<span class="arrow">↓</span>
<span class="step">New identifier?</span></pre>

If yes:

<pre class="flow-diagram"><span class="step">Record it</span>
<span class="arrow">↓</span>
<span class="step">Corroborate it</span>
<span class="arrow">↓</span>
<span class="step">Add it to the identifier board</span>
<span class="arrow">↓</span>
<span class="step">Pivot again</span></pre>

If no:

<pre class="flow-diagram"><span class="step">Combine known identifiers</span>
<span class="arrow">↓</span>
<span class="step">Search historically</span>
<span class="arrow">↓</span>
<span class="step">Search associates</span>
<span class="arrow">↓</span>
<span class="step">Search documents</span>
<span class="arrow">↓</span>
<span class="step">Search other engines</span>
<span class="arrow">↓</span>
<span class="step">Reassess assumptions</span></pre>

<h3 id="stuck-checklist">60-second stuck checklist</h3>

Before you decide a lead is genuinely dead, run down this list. It takes less time than it looks.

<ul class="checklist">
<li><label><input type="checkbox"> Searched the exact identifier?</label></li>
<li><label><input type="checkbox"> Quoted it?</label></li>
<li><label><input type="checkbox"> Tried name variations?</label></li>
<li><label><input type="checkbox"> Tried nicknames?</label></li>
<li><label><input type="checkbox"> Searched middle names?</label></li>
<li><label><input type="checkbox"> Searched username variations?</label></li>
<li><label><input type="checkbox"> Searched the email exactly?</label></li>
<li><label><input type="checkbox"> Extracted the email local-part?</label></li>
<li><label><input type="checkbox"> Searched every realistic phone format?</label></li>
<li><label><input type="checkbox"> Searched the address?</label></li>
<li><label><input type="checkbox"> Searched relatives?</label></li>
<li><label><input type="checkbox"> Searched associates?</label></li>
<li><label><input type="checkbox"> Searched the current employer?</label></li>
<li><label><input type="checkbox"> Searched previous employers?</label></li>
<li><label><input type="checkbox"> Searched schools?</label></li>
<li><label><input type="checkbox"> Searched clubs or hobbies?</label></li>
<li><label><input type="checkbox"> Searched events?</label></li>
<li><label><input type="checkbox"> Searched PDFs?</label></li>
<li><label><input type="checkbox"> Searched DOCX/XLSX and other formats?</label></li>
<li><label><input type="checkbox"> Searched distinctive text?</label></li>
<li><label><input type="checkbox"> Searched historically?</label></li>
<li><label><input type="checkbox"> Excluded the source where I found the clue?</label></li>
<li><label><input type="checkbox"> Combined two identifiers?</label></li>
<li><label><input type="checkbox"> Searched someone associated with the target?</label></li>
<li><label><input type="checkbox"> Tried another search engine?</label></li>
<li><label><input type="checkbox"> Reviewed my identifier board?</label></li>
<li class="emphasis"><label><input type="checkbox"> Am I assuming something I haven't actually proved?</label></li>
</ul>

<h2 id="trace-labs-context">A note on Trace Labs</h2>

This guide is written to be useful for Trace Labs OSINT Search Party CTFs, but it's deliberately not tied to any specific competition rule, scoring category or permitted-technique list, because those details are set and updated by Trace Labs itself between events. If you're relying on anything about what's in or out of scope, current scoring, or submission requirements, check [Trace Labs' own current rules and code of conduct](https://www.tracelabs.org/) directly rather than this or any other third-party post. That's the only place guaranteed to be current.

What doesn't change between events is the underlying skill this guide is built around: recognising a pivot, corroborating it, and knowing when to stop and record rather than push further. I wrote a bit more about how that actually played out for me in practice in my [first Trace Labs write-up](/posts/tracelabs-osint-search-party-2026/).

<h2 id="further-reading">Further reading</h2>

- [Google Dorking for OSINT: The Practical Investigator's Guide](/posts/google-dorking-osint-guide/): the operator reference this page assumes you know
- [Trace Labs](https://www.tracelabs.org/): official rules, code of conduct and event schedule
- [WhatsMyName](https://whatsmyname.app/): cross-platform username enumeration
- [My Trace Labs Search Party CTF 2026 write-up](/posts/tracelabs-osint-search-party-2026/)
