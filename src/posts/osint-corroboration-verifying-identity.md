---
title: "OSINT Corroboration: How Do I Know I've Found the Right Person?"
date: 2026-09-19
series: "osint"
categories:
  - "osint"
  - "investigation"
  - "verification"
  - "trace-labs"
tags:
  - "osint"
  - "investigation"
  - "verification"
  - "trace-labs"
  - "field-guide"
seoTitle: "OSINT Corroboration: How Do I Know I've Found the Right Person? | Jason Hill"
description: "A practical OSINT guide to corroborating identities and information, checking source independence, resolving conflicting evidence and deciding when you've actually found the right person."
coverImage: "osint-corroboration-cover.svg"
coverImageAlt: "Abstract illustration of several evidence nodes, a profile, location, username and document, converging on a central identity node, with two candidate nodes failing to connect, representing OSINT corroboration and identity verification."
---

I'm looking for a missing person called Sarah Williams. Wellington, approximately forty, a photograph on file. I find an Instagram account, @sarahw82. The profile belongs to a woman called Sarah. She appears roughly the right age. She appears to live in Wellington. She looks similar to the photograph.

Have I found her? Maybe.

Then I keep looking. Her partner's first name matches what I already know. She attended the same school. A photograph on her account contains someone already independently identified as Sarah's sister. An old, mostly abandoned account uses a nickname that turned up separately, in a conversation nothing to do with this profile. The chronology holds together across everything I can check. Now I have something considerably stronger than a name and a city.

That's the fictional case running through this article, and it points at the actual problem underneath almost everything I've written in this series so far. OSINT is very good at producing candidates. It's much less good, on its own, at telling you which of those candidates deserve to be believed. That judgment is the investigator's job, and it's the part that doesn't show up in a list of search operators or platforms to check. This is the fourth OSINT field guide I've written, and it's the one about the question that sits underneath all the others: how do I actually know what I've found is true?

<h2 id="discovery-vs-verification">Discovery is not verification</h2>

It helps to separate two questions that get run together constantly. Discovery asks what this could be. Verification asks what evidence supports it actually being true. A search result for @sarahw82 is a discovery. It tells me this account might belong to Sarah Williams. It tells me nothing about whether it does.

Search engines, OSINT tools and social platforms are extremely good at the discovery half. Type in a name and a location and you'll get candidates back in seconds. What none of that tooling does for you is the harder part: deciding which of those candidates should survive scrutiny and which should be set aside. That's not a tooling problem. It's a thinking problem, and it's the one this article is actually about.

<h2 id="not-source-counting">Corroboration is not source counting</h2>

Say I find Sarah's employer listed as Example Ltd on four different websites. That looks like four sources agreeing. It's worth checking why they agree before treating it that way.

Suppose Website A copied its biography directly from LinkedIn. Website B scraped Website A. Website C runs a people-search database built from the same LinkedIn data. Website D republishes whatever Website B publishes. I don't have four independent confirmations of anything. I have one claim, made once, that has propagated through four places that all ultimately point back to the same origin. Drawn out, it looks like LinkedIn, then A, then B, then C and D branching off the copies. One underlying claim, several restatements.

Repeated information is not the same as corroborated information, and the difference matters more than it might seem. Contrast that chain with something genuinely independent: LinkedIn's employment history, a staff PDF from the same period published by the company itself, a conference biography that names the same employer, and a photograph from a company event showing the person actually there. Those four things were produced by different people, at different times, for different reasons, and none of them depends on the others being right. That's a meaningfully different situation from four websites echoing the same LinkedIn line, even though both situations might look identical at a glance, four search results, employer confirmed.

None of this means every website is secretly the same source in disguise. Plenty of information genuinely is independent. The habit worth building is checking, not assuming.

<h2 id="tracing-a-claim">Tracing a claim back to its source</h2>

When a website says Sarah Williams works at Example Ltd, the useful next question is where that claim actually came from, rather than whether to believe it outright. Did Website C generate that sentence itself, or did it pull it from somewhere else? Can I find wherever it was first stated? Was the ultimate origin Sarah herself, the employer, a government or public register, a news organisation, a biography she wrote and that got copied around, a data broker, or something with no identifiable origin at all?

That's a chain worth following deliberately: a claim, then wherever it came from, then whatever that source's own source was, continuing back until either an original, independently produced piece of information turns up, or the trail runs out. It doesn't need a name or a formal framework. The habit is simply not stopping at the first restatement of a claim and treating that as the evidence, when the actual evidence, if it exists, is further back.

This connects to a distinction worth having in mind without treating it as a strict rule. Some sources sit close to the person or event in question: someone's own public profile, an employer's staff page, a government register, an original court document, an original set of event results, an interview conducted directly with the person. Others sit further away: news coverage summarising those things, general directories, aggregators, people-search services, blog posts, reposts, scraped profiles. It's tempting to treat the first group as reliable and the second as suspect, but that's not quite right either. A person can lie on their own profile. An official record can contain a data-entry error. A well-run secondary source, one that does its own checking before publishing, can be more reliable than a primary source with an incentive to mislead. The useful questions aren't primary or secondary. They're who produced this, how would they know, when was it produced, and can it be checked independently of them.

<h2 id="attribute-strength">How strong is an attribute</h2>

Not every matching detail carries the same weight, and it's worth being deliberate about which ones do. Take a candidate profile for Sarah Williams: Wellington, approximately forty, an interest in photography, a nickname of Mouse, a partner named David James Williams, a former surname of Jones, schooling at Example College, and a photograph that looks visually consistent with what's already known.

Some of that is weak on its own. A first name shared with thousands of people. An interest in photography, which plenty of people have. An age bracket that fits a large fraction of any city's population. None of these move the needle much by themselves. Other details are considerably more distinctive: an unusual username, a specific nickname that turns up independently rather than only on this one account, a matching partner's name, a matching former surname, a school and graduation period that lines up, known relatives who check out, and photographs that stay consistent across different points in time. What makes an attribute strong is how distinctive it is, and whether it was established independently of the account being checked, rather than simply whether it happens to match.

I'm not going to attach numbers to any of this. There's no honest way to say a matching nickname is worth 30 points and a matching city is worth 5. Assigning numbers to that kind of judgment doesn't make it more rigorous, it just hides the reasoning behind a total that looks more precise than it actually is.

<h2 id="two-identifier-principle">The two-identifier principle</h2>

I've written about this before in the [Trace Labs pivots guide](/posts/google-dorking-trace-labs-osint-pivots/#two-identifier-rule) and it applies directly here. One identifier tends to produce candidates. Sarah Williams on its own could be a lot of people. Sarah Williams plus Wellington narrows that considerably. Sarah Williams plus mouse82 narrows it further still, because a specific, unusual username is a much rarer coincidence than a shared city. Add a known sister and a chronology that holds together, and the position gets stronger again with each addition.

It's a principle rather than an absolute rule, and it's worth saying plainly that two weak attributes don't combine into one strong one just by being stacked together. Two people sharing a common first name and living in a country's largest city isn't meaningfully stronger evidence than either fact alone. What accumulates strength is independent, reasonably distinctive details pointing the same way, not simply having more of them.

<h2 id="attribution-matrix">An attribution matrix</h2>

For anything beyond a straightforward case, I write the comparison out rather than trying to hold it in my head. A fictional version, continuing the Sarah Williams example, might look like this.

<div class="table-scroll">

| Attribute | Known MP | Candidate | Assessment | Source |
| --- | --- | --- | --- | --- |
| Name | Sarah Jane Williams | Sarah Williams | Supporting | Profile |
| Location | Wellington | Wellington | Supporting | Profile and posts |
| Age | Approx 40 | Appears approx 40 | Weak | Photographs |
| Nickname | Mouse | Uses "Mouse" | Strong | Independent conversation |
| Partner | David Williams | David Williams | Strong | Multiple sources |
| Sister | Jane Jones | Jane appears in a tagged photo | Supporting | Photo and profile |
| School | Example College | Example College | Supporting | Old profile |
| Employer | Example Ltd | Example Ltd | Strong | Employer document |
| Photograph | Known image | Visually consistent | Supporting | Images |
| Chronology | Wellington, 2018 | Wellington, 2018 | Consistent | Historical posts |

</div>

Writing it out this way is meant to make the shape of the evidence visible, not to produce a total: where things line up, where the support is only weak, and, just as importantly, whether anything is missing or contradictory. A matrix with ten supporting rows and one contradictory row deserves a different response than a matrix with ten supporting rows and nothing contradicting them at all, and that's much easier to see written down than held in memory after an hour of searching.

<h2 id="confidence-levels">Confidence levels</h2>

I use the same four labels across all of these field guides, because consistency matters more than finding a better set of words.

<div class="table-scroll">

| Level | What it means |
| --- | --- |
| Possible | An interesting candidate that needs more work before it's worth relying on. |
| Probable | Multiple reasonably strong pieces of evidence support the attribution, but real uncertainty remains. |
| Confirmed | Sufficient strong, ideally independent, evidence establishes the attribution for the purposes of this investigation. |
| Rejected | Evidence indicates the candidate is not the target. |

</div>

These are working labels, not probabilities, and they're deliberately informal. They also depend on context in a way a fixed threshold can't capture. A low-stakes research note can tolerate a fair amount of uncertainty. Naming someone in a report that might affect their life, or submitting a finding as part of a Trace Labs case, deserves a considerably higher bar before something gets called confirmed. The label reflects how much confidence the situation actually requires, not just the evidence on its own.

<h2 id="claim-level-confidence">Confidence belongs to claims, not just identities</h2>

It's easy to settle on an overall confidence level for an identity and then let that same confidence quietly spread to everything associated with it. I try to resist that, because the pieces that make up a profile don't all rest on the same evidence.

For the fictional case: the identity itself, Sarah Williams as @mouse82, might sit at probable. Her location, Wellington, might be confirmed on its own, independently supported. Her employer, Example Ltd, might also be probable, but for different reasons and with different evidence than the identity claim. A possible sister might sit at possible. A former address in Hamilton might sit at possible too. A phone number might be entirely unverified. Writing it out this way, rather than as one blanket assessment, stops a strong identity attribution from lending false confidence to a weak, unrelated detail that just happens to be attached to the same profile.

<h2 id="fact-inference-assumption">Fact, inference and assumption</h2>

Three different things get flattened into "what I found" if I'm not careful, and it's worth pulling them apart. An observation is something the source actually states or shows: the profile publicly says Wellington. An inference is a reasonable conclusion drawn from more than one observation: other evidence suggests she was living in Wellington during 2022. An assumption is a step beyond what the evidence actually supports: she still lives in Wellington today.

A second example makes the gap clearer. Observation: Sarah frequently comments on Jane's posts. Inference: they appear to know each other personally. Assumption: Jane is Sarah's sister. None of those three statements is wrong to think, but they carry very different weight, and treating the assumption as though it had the same footing as the observation is exactly the kind of quiet error that compounds over a long investigation. It only becomes a corroborated claim once independent sources actually establish that Jane is Sarah's sister, at which point it's earned a stronger label than either the observation or the inference started with.

<h2 id="verifying-identifiers">Verifying usernames, photographs and relationships</h2>

The same scrutiny that applies to an overall identity attribution applies just as much to the individual pieces that make it up, and each type of identifier has its own particular failure modes worth knowing.

A matching username can be genuinely useful, especially when it's distinctive, but usernames get shared, reused, abandoned, occasionally reassigned to someone new entirely, and sometimes coincidentally similar without any connection at all. Finding mouse1984 on Reddit when the known username is mouse1984 is a lead, not a conclusion. I look for supporting context: does the location fit, does the writing style and subject matter fit, do the interests line up, is there a photograph to compare, are there other linked accounts, does the biography say anything consistent, do known associates show up, is there a historical reference tying the two together. None of that requires anything invasive. It's the same kind of contextual reading described in the [Social Media OSINT guide](/posts/social-media-osint-digital-footprint/), applied specifically to the question of whether one username is the same person as another.

Photographs raise a related but distinct problem. They can strongly support an attribution, and they can also mislead badly if visual similarity gets treated as more certain than it is. I look for contextual consistency rather than resemblance alone: the same person appearing across different time periods, the same associates showing up, consistent locations, clothing or uniforms that match, the same events, a distinctive and publicly visible tattoo if one exists, a recurring vehicle, a pet, a background detail, a timeline that holds together. Visual resemblance is one input among several, not biometric proof, and reverse image searching, where it's useful, stays well within ordinary public OSINT rather than anything more invasive.

Relationships need a similar kind of care, and social media is where I've found this matters most. I try to keep three levels apart: an observed association, where two accounts simply interact frequently with nothing more claimed than that; a claimed relationship, where someone states it directly, calling another person their sister or their partner; and a corroborated relationship, where independent evidence beyond the claim itself supports it. Frequent comments between two accounts don't establish a family relationship. A shared surname doesn't either. A shared address doesn't necessarily mean family rather than flatmates. Even a single "sis" in a comment might be literal or might be the kind of thing close friends say to each other. Context decides which, and it's worth reading enough of the surrounding conversation to have a real basis for a judgment rather than taking one comment at face value.

<h2 id="verifying-location-employment-contact">Verifying location, employment, phone numbers and addresses</h2>

A profile that says Wellington could mean a current residence, a previous one, a hometown someone still identifies with years after leaving, a work location, an aspirational location tag, or simply information nobody's updated in years. A photograph taken in Auckland doesn't establish that someone lives in Auckland. It's worth keeping observed at a location, associated with a location, previously lived at a location and currently lives at a location as genuinely separate claims, because collapsing them into one is where a lot of quietly wrong conclusions come from.

Employment carries the same problem in a different shape. Sources range from LinkedIn and a company's own website through to staff directories, conference biographies, professional registers, news coverage, public filings, and old PDFs that happened to survive online. The temporal question matters as much as the source itself: someone can legitimately have worked at several organisations over time, and an old staff page is often just outdated rather than wrong. I record worked at Example Ltd in 2019 rather than works at Example Ltd, unless there's actually current evidence to support the present tense.

Phone numbers and addresses deserve particular caution, because both change hands more than people expect. A phone number can be reassigned, shared within a family, a business line rather than a personal one, or simply old. An address can be current, previous, a family home, a business address, a mailing address that isn't where anyone lives, temporary, or just wrong. Finding Sarah connected to an address in a 2018 directory entry is evidence about 2018. It says nothing on its own about where she lives now, and treating it as current without checking is one of the more common ways this kind of research goes stale without anyone noticing.

<h2 id="time-is-evidence">Time is part of the evidence</h2>

Every claim worth recording should be able to answer four things: what is being claimed, who is the source, when was it produced, and where did I find it. Sarah lives in Hamilton is a weak claim as written. A 2016 public club newsletter lists Sarah Williams at a Hamilton address is a considerably better one, because it's honest about what it actually establishes: something true about 2016, which may or may not still be true a decade later. A lot of OSINT mistakes happen exactly at this seam, where a fact that was accurate at some point in the past quietly loses its date and gets treated as though it describes the present.

Building even a rough timeline makes this kind of problem far easier to catch. For the fictional case: Example College in 2012, Hamilton in 2015, Example Ltd from 2017, a move to Wellington in 2019, the mouse82 profile becoming active in 2021, David appearing as a partner from 2023, and Wellington references continuing through 2025. Laid out like that, a candidate account whose activity places them continuously in Canada between 2015 and 2022 is an obvious problem rather than something that slips past unnoticed among a dozen other details. That kind of contradiction deserves actual investigation, not an explanation that makes it go away because everything else about the candidate looks promising.

<h2 id="conflicting-evidence">When evidence conflicts</h2>

Investigation is not the process of collecting only what supports a hypothesis. When something conflicts with what I currently believe, I write it down rather than setting it aside, and then I actually look into it rather than reaching for whichever explanation happens to preserve the theory I already had. A contradiction might turn out to be outdated information, a same-name collision, a changed username, a move, a different employer, an incorrect source, a genuinely different person, deliberately false information someone put online, or a plain data-entry error somewhere upstream. Any of those are legitimate explanations. The problem isn't picking one, it's picking one automatically, before actually checking, simply because it's the explanation that lets the original theory survive.

<h2 id="prove-yourself-wrong">Trying to prove yourself wrong</h2>

Once I believe @mouse82 is Sarah, the useful next question isn't what else supports that. It's what would demonstrate it isn't her. Could this account belong to a different Sarah entirely. Is there a location that doesn't fit. Does the age conflict once checked properly rather than eyeballed. Are there photographs that don't look like the same person on closer inspection. Does the candidate seem to have a different family entirely. Does the employment chronology actually line up, or does it just seem to. Is there another source somewhere establishing that this username belongs to somebody else altogether. Actively searching for a way to be wrong catches more mistakes than finding a tenth weak clue that agrees with the ninth.

This matters because confirmation bias works quietly and by default, not through any obvious lapse in judgement. Once a theory forms, new information tends to get read as support for it whether or not that's actually justified. A target who likes dogs and a candidate with dog photographs feels like it fits, but a very large number of people like dogs, and if the candidate's university, age and location all sit slightly wrong, that one contradiction matters more than several weak matches stacked on top of each other. The habit worth building is not letting a pile of weak agreement drown out one real disagreement.

<h2 id="circular-corroboration">Circular corroboration</h2>

This deserves its own attention because it's easy to miss even when you're being careful. LinkedIn states that Sarah works at Example Ltd. A people-search site scrapes LinkedIn. Another directory scrapes the people-search site. A search engine's AI-generated summary reads across those directories and states the employer as fact. By this point it looks like four separate confirmations.

<pre class="flow-diagram"><span class="step">LinkedIn</span>
<span class="arrow">↓</span>
<span class="step">People-search directory</span>
<span class="arrow">↓</span>
<span class="step">Aggregator</span>
<span class="arrow">↓</span>
<span class="step">Search or AI summary</span></pre>

That's one source chain, not four sources. Everything in it traces back to a single original claim. Compare that with LinkedIn's employment history alongside an employer's own staff PDF, a professional register, and an independently published conference programme naming the same employer. Those four things were produced by different people for different reasons, and none of them depends on LinkedIn being right. That's the meaningful difference, and it's worth checking for deliberately rather than assuming that more places saying the same thing automatically means more evidence.

<h2 id="ai-search-results">AI-generated search results</h2>

Worth a specific mention, since this is increasingly how a lot of searching happens. AI-generated summaries and answer engines are genuinely useful for surfacing leads quickly, and I use them for exactly that. They shouldn't be treated as a source in their own right. If a summary states that Sarah Williams worked at Example Ltd from 2017 to 2020, the useful step is finding the underlying material that claim was built from, not citing the summary itself as proof because it reads confidently. A confident tone isn't evidence of anything. This isn't a case against using these tools, they're a fast way to generate candidates, it's just a reminder that a generated summary sits exactly where an uncorroborated secondary source sits: useful for pointing somewhere, not a substitute for checking what's actually there.

<h2 id="absence-of-evidence">Absence of evidence, and when absence itself matters</h2>

No Facebook account found does not mean Sarah does not use Facebook. No posts after 2022 does not mean she stopped using social media in 2022. No Wellington address found does not mean she never lived in Wellington. The honest versions of these statements are no attributable account identified, no later public posts observed, no corroborating source found during this search, and the difference in wording matters, because the entire method depends on treating absence of evidence honestly rather than quietly converting it into evidence of absence.

There's a real exception worth knowing, though, and it cuts the other way. If a candidate claims ten years at an organisation but never appears in that organisation's historical staff pages, professional registers, publications, conference material, colleague references or archived website snapshots, that absence starts to mean something, precisely because it's the kind of trace you'd reasonably expect to exist and doesn't. That's grounds for closer scrutiny, not proof the claim is false, and the distinction between an absence that means nothing and an absence that's actually surprising comes down to whether you had good reason to expect to find something in the first place.

<h2 id="judging-sources">Judging source reliability</h2>

A short set of questions covers most of what matters, without needing a scoring system to back it up. Who created this information, and why. How would they actually know it. When was it created, and is it still current. Is it original, or could it be copied from somewhere else. Could the subject have supplied it themselves, and would that change how much to trust it. Does another genuinely independent source support it. Does it conflict with something stronger. Running through those before relying on a source catches most of the obvious problems.

It's useful to think about the resulting evidence in similarly plain terms: weak, meaning a common or poorly sourced attribute; supporting, meaning relevant and consistent with the hypothesis but not decisive on its own; strong, meaning distinctive information from a credible source that materially connects the identity or claim; and contradictory, meaning inconsistent with the current hypothesis and worth investigating rather than dismissing. None of that needs converting into points. The moment it becomes a score, the actual reasoning behind the score tends to disappear.

<h2 id="evidence-ledger">Keeping an evidence ledger</h2>

For anything beyond a quick check, I keep a working table of claims rather than a set of conclusions, because separating the claim from the evidence behind it is one of the most useful habits in this entire process. Sarah lives at 123 Example Street is a bad note. Claim: Sarah lived at 123 Example Street. Evidence: a 2019 public document associates Sarah Williams with the address. Confidence: probable, for 2019. Current: unknown. That's a better one, because it's honest about exactly what's been established and what hasn't.

A working ledger for the fictional case might look like this.

<div class="table-scroll">

| Claim | Evidence | Source | Date | Strength | Confidence | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Sarah = @mouse82 | Same nickname | Public profile | 2024 | Supporting | Possible | Needs more |
| Sarah = @mouse82 | Known sister appears | Public photo | 2023 | Strong | Probable | Sister independently confirmed |
| Employer: Example Ltd | Staff PDF | Company document | 2019 | Strong | Confirmed for 2019 | Not necessarily current |
| Lives in Wellington | Profile bio | Social account | 2025 | Supporting | Probable | Seek independent source |

</div>

For every important finding, I try to be able to answer where it came from, when I actually observed it, what the source said or showed in its own words, whether it was original or copied from somewhere else, and what I inferred from it as opposed to what it stated outright. That's provenance, and it isn't process for its own sake: six weeks into an investigation, or when handing findings to someone else, none of this is recoverable from memory unless it was written down as it happened.

This also means preserving context, not just values. Recording 021 123 4567 on its own loses where it appeared, whose number it was claimed to be, when the page was published, and whether it looked personal or business. The same problem applies to an address recorded without a date. A bare fact stripped of its context can quietly become misleading months later, when nobody, including the person who wrote it down, remembers where it came from or when it was true.

<h2 id="worked-example-wrong-sarah">Worked example: the wrong Sarah</h2>

Putting this together end to end, a fictional walkthrough. The missing person is Sarah Jane Williams, approximately forty, a known Wellington connection, a photograph on file, and a possible nickname of Mouse. A candidate account turns up: Sarah Williams, Wellington, roughly the right age, an interest in photography, a profile photo that looks visually similar. Initial assessment: possible.

Investigation continues, and it looks increasingly convincing. The candidate uses the nickname Mouse. Her partner is called David. She posts about photography regularly. Wellington comes up repeatedly in her posts. Each of these supports the theory, and it would be easy to move this to probable, or further.

Then contradictory evidence turns up. The candidate attended a different school entirely. Her own historical posts place her age several years younger than the target's known age. A photograph tagged as her sister shows someone who doesn't match the independently confirmed sibling. A historical post establishes that she was living overseas for a period during which the target is independently documented as living in New Zealand. Assessment: rejected.

The lesson isn't subtle, but it's worth stating directly because it's easy to forget mid-investigation. A pile of weak supporting details can be outweighed by a much smaller amount of strong contradictory evidence, and the number of things that match matters far less than whether anything that doesn't match has been taken seriously.

<h2 id="worked-example-possible-to-confirmed">Worked example: from possible to confirmed</h2>

A second fictional case, showing confidence build in the other direction. It starts with a username that looks similar to one already known. Stage one, username similarity alone: possible. Stage two, the location matches: still possible, since a shared city adds relatively little. Stage three, the account uses a nickname that was independently discovered elsewhere, not read off this profile: probable. Stage four, a known sibling appears in historical photographs and in genuine interaction with the account, not just a name mentioned once: a stronger probable. Stage five, a historical employer document links the full name to the same email and username pattern found elsewhere: confirmed, for the purposes of this investigation.

What matters here is the shape of the progression, not a claim that these five stages are a fixed formula. There's no universal threshold that automatically makes something confirmed. What moves an attribution from one label to the next is always the same thing: another piece of reasonably distinctive, reasonably independent evidence, checked properly rather than assumed.

<h2 id="when-to-stop">Knowing when to stop</h2>

OSINT can continue indefinitely if nothing forces a decision. It's worth asking, at some point, what the investigation is actually trying to establish, what level of confidence that purpose genuinely requires, and whether another hour of searching would materially change the assessment or just add more of the same kind of weak supporting detail that's already been collected. There's a real difference between still needing more evidence and simply being unwilling to call something confirmed because searching feels safer than deciding. The goal is sufficient reliable evidence for the purpose at hand, not the maximum amount of evidence that could theoretically be gathered.

<h2 id="corroboration-checklist">Corroboration checklist</h2>

Before treating a finding as established, this is roughly what I run through.

<ul class="checklist">
<li><label><input type="checkbox"> What exactly am I claiming?</label></li>
<li><label><input type="checkbox"> Have I separated observation, inference and assumption?</label></li>
<li><label><input type="checkbox"> What sources actually support this?</label></li>
<li><label><input type="checkbox"> Are those sources genuinely independent of each other?</label></li>
<li><label><input type="checkbox"> Can I trace copied information back to its origin?</label></li>
<li><label><input type="checkbox"> How distinctive are the matching attributes?</label></li>
<li><label><input type="checkbox"> Is the chronology consistent?</label></li>
<li><label><input type="checkbox"> Is this information current, or only historical?</label></li>
<li><label><input type="checkbox"> Is there conflicting evidence, and have I actually looked into it?</label></li>
<li><label><input type="checkbox"> Have I actively searched for evidence against my own conclusion?</label></li>
<li><label><input type="checkbox"> Could this be a different person with the same name?</label></li>
<li><label><input type="checkbox"> Could the username belong to somebody else?</label></li>
<li><label><input type="checkbox"> Could the phone number or address be old or reassigned?</label></li>
<li><label><input type="checkbox"> Am I relying too heavily on visual similarity alone?</label></li>
<li><label><input type="checkbox"> Have I preserved the source and date for important findings?</label></li>
<li><label><input type="checkbox"> Have I assigned confidence to the claim, not just the identity?</label></li>
<li><label><input type="checkbox"> Am I turning "not found" into "doesn't exist"?</label></li>
<li><label><input type="checkbox"> Could I explain, clearly, why I believe this to another investigator?</label></li>
<li class="emphasis"><label><input type="checkbox"> What evidence would change my mind?</label></li>
</ul>

<h2 id="quick-reference">Quick reference</h2>

For when there's no time to work through the reasoning from scratch.

1. Define the claim precisely.
2. Record the source.
3. Check the date.
4. Trace the claim back to its original source, if one exists.
5. Look for independent corroboration, not just repetition.
6. Compare distinctive attributes, not just common ones.
7. Check the chronology.
8. Look for contradictions, deliberately.
9. Try to disprove the hypothesis before accepting it.
10. Assign confidence to the claim itself.
11. Preserve the reasoning, not just the conclusion.

<h2 id="where-this-fits">Where this fits</h2>

None of this is unique to social media investigation or to Trace Labs specifically. It's the same basic discipline that sits behind established open-source verification work, the kind of thing organisations like Bellingcat practise and the Berkeley Protocol on Digital Open Source Investigations codifies for human rights work: trace provenance, corroborate independently, preserve the reasoning, stay honest about what the evidence actually shows. This article is that discipline scaled down to something usable during a four-hour Trace Labs case, or any other piece of legitimate people-focused OSINT.

It also sits in a fairly specific place relative to the rest of this series. The [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/) is about how to search. [Google Dorking for Trace Labs](/posts/google-dorking-trace-labs-osint-pivots/) is about what to search next, once something's been found. [Social Media OSINT](/posts/social-media-osint-digital-footprint/) is about expanding one profile into a wider digital footprint. This one is about the question none of the others answer on their own: whether what's been found is actually reliable enough to build on.

If there's one habit worth taking from all of this, it's a single change in the question asked at the end of a search. Not just what evidence supports my conclusion, but what evidence would change my mind.
