---
title: "Social Media OSINT: From One Profile to a Digital Footprint"
date: 2026-09-18
categories:
  - "osint"
  - "social-media"
  - "trace-labs"
  - "investigation"
tags:
  - "osint"
  - "social-media"
  - "trace-labs"
  - "investigation"
  - "field-guide"
seoTitle: "Social Media OSINT: From One Profile to a Digital Footprint | Jason Hill"
description: "A practical social media OSINT methodology for expanding one known profile into a wider digital footprint using usernames, aliases, photographs, conversations, relationships and careful corroboration."
coverImage: "social-media-osint-cover.svg"
coverImageAlt: "Abstract illustration of a central identity node connected to a network of smaller profile, location, conversation and organisation nodes, representing a digital footprint expanding outward from one known social media profile."
---

Most of what I know about investigating a missing person online, I learned by doing it under a clock. Trace Labs OSINT Search Party CTFs give you a handful of confirmed details about a real missing person and a few hours to find as much verifiable information as you can. The time pressure teaches you quickly which habits actually produce leads and which ones just feel productive. Social media work, more than any tool I've used, was where most of my results came from.

This article is the methodology that came out of that work: how I take one profile I'm reasonably confident belongs to the person I'm looking for, and turn it into a much wider picture of who they are, who they know, and where else they might be found online. It isn't a list of platforms to check or tools to install. It's the thinking I go through, roughly in order, though in practice it loops back on itself constantly.

The idea running through all of it is that finding a profile is not the same as proving who owns it. A profile that looks right, matching name, matching city, a face that seems familiar, is a lead, not a conclusion. Most of the mistakes I've seen in this kind of work, including some of my own early on, come from treating a plausible match as a confirmed one too early, and building everything after that on a foundation that was never actually tested.

<h2 id="where-this-comes-from">Where this comes from</h2>

A typical Trace Labs case starts with very little: a name, an approximate location, sometimes a photo, sometimes a known username or a link to one social media profile. Everything else has to be built from there. That's a genuinely different starting point from open-ended research, where you're free to follow whatever looks interesting. Here, everything eventually has to trace back to the person you were actually asked to find.

I should say clearly that this isn't only useful for Trace Labs. The same approach applies to any legitimate people-focused OSINT work: research for a story, background checks within the bounds of what's actually permitted, or trying to help reconnect a family with someone who's gone quiet online. What follows is the general method, with Trace Labs as the environment that forced me to make it rigorous rather than casual. If you're taking part in Trace Labs specifically, treat any rules or scoring detail mentioned here as illustrative rather than authoritative. Check the current rules directly, since competitions change their structure between events.

Every example in this piece is fictional. I'm not going to describe real Trace Labs cases or real missing persons, for reasons that should be obvious. Sarah Jane Williams, who appears throughout the rest of this article, doesn't exist.

The shape of the work looks roughly like this:

<pre class="flow-diagram"><span class="step">KNOWN PROFILE</span>
<span class="arrow">↓</span>
<span class="step">ESTABLISH IDENTITY</span>
<span class="arrow">↓</span>
<span class="step">EXTRACT IDENTIFIERS</span>
<span class="arrow">↓</span>
<span class="step">SEARCH WIDELY</span>
<span class="arrow">↓</span>
<span class="step">DISCOVER CANDIDATE PROFILE</span>
<span class="arrow">↓</span>
<span class="step">CORROBORATE</span>
<span class="arrow">↓</span>
<span class="step">EXTRACT NEW CLUES</span>
<span class="arrow">↓</span>
<span class="step">MAP RELATIONSHIPS</span>
<span class="arrow">↓</span>
<span class="step">BUILD TARGET PROFILE</span>
<span class="arrow">↓</span>
<span class="step">PIVOT INTO OTHER OSINT SOURCES</span>
<span class="arrow">↓</span>
<span class="step">REPEAT</span></pre>

It isn't a strict sequence I follow once, top to bottom. It's closer to a loop I go around repeatedly, each pass with slightly more information than the last. The rest of this article works through that loop roughly in the order I actually use it, starting with what I've been given before I've done anything at all.

<h2 id="starting-with-what-i-know">Starting with what I know</h2>

Before I search for anything, I write down exactly what I've been told and nothing more. For the fictional case, that looks like this:

Name: Sarah Jane Williams. Location: Wellington. Approximate age: 40. Known username: sarahje82. Known photograph: yes.

I treat that starting information differently from anything I go on to find myself. Supplied information usually came from a family member or whoever raised the case, and it's generally reliable, but it can still be wrong or out of date: a nickname the family uses that the person themselves dropped years ago, a location that's a few years stale, a username that's since been abandoned. Information I discover is a step further removed again. It might be right, it might be about someone else entirely, and until I've corroborated it I try not to let it quietly become fact in my own head just because I found it myself.

I keep a simple table for this and add to it as the investigation goes on.

<div class="table-scroll">

| Identifier | Value | Confidence | Source |
| --- | --- | --- | --- |
| Full name | Sarah Jane Williams | Confirmed | Supplied |
| Location | Wellington | Confirmed | Supplied |
| Approximate age | 40 | Confirmed | Supplied |
| Known username | sarahje82 | Confirmed | Supplied |
| Known photograph | On file | Confirmed | Supplied |

</div>

The fields I track expand as I go: full name, middle name, former surname, nickname, alias, approximate date of birth, current and previous locations, usernames, email, phone, address, employer and previous employer, school, relatives, associates, clubs, hobbies, vehicles, and any website or domain connected to the person. Most of these stay empty for a long time, and that's fine. The table isn't a form to complete. It's a place to keep track of what I actually know, separate from what I'm still working on.

<h2 id="verifying-the-starting-profile">Verifying the starting profile</h2>

The first real decision point is whether the profile I've found, or been given a link to, actually belongs to the person I'm looking for. That sounds obvious, but it's worth stating plainly, because it's the assumption everything else rests on. Get it wrong here and the rest of the investigation is built on the wrong person.

A name and a city are rarely enough on their own. Sarah Williams in Wellington might be one person or several hundred. What I'm looking for is several independent things lining up at once: the full name, ideally including a middle name if I have one, the location, an approximate age consistent with what I know, a photograph that looks like the person I'm expecting, an employer, school or known associate that matches, interests that fit what I've been told, and a chronology that makes sense, meaning nothing about when this person supposedly lived where contradicts anything else I know.

None of these on their own is conclusive. A shared name proves almost nothing. A photograph that looks similar is supporting evidence, not identification, and I want to be clear about that, because it's easy for facial similarity to feel more certain than it actually is. It isn't biometric verification. It's one data point among several, and I try to treat it that way even when it feels convincing. What moves a profile from plausible to probably right is several of these lining up together with nothing contradicting them. One matching detail is a coincidence waiting to happen. Four or five matching details, with nothing that doesn't fit, is a genuinely different situation.

<h2 id="mining-the-profile">Mining the profile before leaving it</h2>

Once I'm reasonably confident I've got the right starting profile, the instinct is to go looking elsewhere straight away: other platforms, other accounts, more coverage. I've learned to resist that for a while and read the profile itself properly first, because it's usually the richest single source I'll have easy access to, and it's easy to skim past details that matter.

I go through it properly: the biography, if there is one, the posts, going back further than the first page or two, comments the person has left on other people's content, who's interacting with them regularly, tagged photos, any links out to other sites or accounts, and photographs themselves, which get their own section later because they carry so much on their own. I'm not looking for one big reveal. I'm building a list of small things: names that come up, nicknames, places mentioned, employers, schools, clubs, interests, distinctive phrases, dates.

A lot of this seems trivial in isolation. A comment mentioning a running club doesn't feel like much until, three platforms later, that club's own site turns out to have tagged photos with a full name attached to it. The value of mining the profile properly isn't that any single detail cracks the case open. It's that it generates the raw material for everything that follows: names to search, places to check, platforms worth trying next.

<h2 id="reading-the-conversations">Reading the conversations</h2>

Of everything in the profile, conversations and comments taught me the most, more consistently than the person's own biography or posts. People write differently to their friends than they write about themselves, and that difference is where a lot of the useful information actually sits.

A comment thread might contain something like "can't believe everyone still calls me Mouse." On its own, that's a nickname or alias I didn't have before, and now it's a search term. Somewhere else, "remember when we lived in Hamilton?" is a possible previous location, not confirmed, but worth checking. A comment such as "say hi to Mum for me" hints at a family relationship, though the exact nature depends on context. It could be the person's own mother, or something more casual, and I try not to assume which without more to go on. "Are you still working at XYZ?" is a possible employment lead. "Twenty years since Example College!" gives me both an educational institution and a rough timeframe I can use to estimate an age or narrow a search.

None of these are facts on their own. They're what I think of as pivotable information: a small piece of something that gives me a new thread to pull, not yet something I'd write into a profile as established. The nickname might turn out to be wrong, or shared by several people in the same friend group. The point isn't that every comment is gold. It's that reading conversations properly, rather than just scanning the profile itself, is where a disproportionate amount of what I eventually corroborate actually starts.

<h2 id="identity-dictionary">Building an identity dictionary</h2>

Once I've pulled together a name, a possible nickname and a username, I build out the variations before I start searching properly. For Sarah Jane Williams, that list might end up looking something like this: Sarah Jane Williams, Sarah Williams, Sarah J Williams, Sarah Jones (a former surname, if a marriage or name change is suspected), Sarah Jane Jones, SarahJ, Saz, Sazza, Mouse, sarahje82, mouse82, sarahjane82.

Some of these are confirmed, the supplied name and username. Some come directly from something I've read, Mouse, from the comment above. Some are guesses at plausible variations I haven't actually seen anywhere yet, Sarah J Williams, SarahJ. I keep track of which is which, because a guessed variation that turns up nothing tells me very little, while a confirmed alias that turns up nothing is more interesting and worth a second look at why.

The point of the list isn't to have a complete inventory of every name this person might go by. It's to generate combinations worth searching: the name with the location, the nickname with the surname, the username with a variation of itself. If you're not familiar with how to build effective search queries around combinations like this, that's covered properly in my [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/), and the underlying idea of stacking identifiers together is central to how I approach the rest of this process.

<h2 id="casting-the-net-wider">Casting the net wider</h2>

With a working set of names and usernames, I start searching more broadly. I usually begin with the platforms most people have some presence on: Facebook, Instagram, LinkedIn, TikTok, YouTube. That's less a fixed checklist and more a sensible default, since most people are more likely to be found there than anywhere more specialised.

From there, where I go next depends entirely on what I've already learned about the person, not on a list of platforms I always work through. Someone whose profile is full of camera gear and landscape shots is worth checking on Flickr, in photography forums, or on portfolio sites, not because photographers are always on Flickr, but because that's where the specific interest I've already found tends to have a presence. Someone whose comments mention pull requests or side projects is worth checking on GitHub or in developer communities. An interest in running points toward local club sites, race result pages and event photography. Gaming interests point toward specific platforms, Twitch, or community forums built around particular games. Music might lead to band pages, venue listings, or the kind of small local music community sites that rarely show up in a general search but are indexed well enough to find once you know roughly what you're looking for.

The reasoning matters more than the destination. I'm not working through a list of forty platforms hoping something sticks. I'm using what the person has already told me about themselves, through their interests and behaviour, to decide where the next reasonable place to look actually is.

<h2 id="discovering-candidate-accounts">Discovering candidate accounts</h2>

The actual searching, once I've got a set of identifiers and a rough sense of where to look, comes down to combining terms and narrowing by platform. A handful of searches from the fictional case might look like this.

```text
"mouse82"
```

```text
"mouse82" Wellington
```

```text
"Mouse" "Sarah Williams" Wellington
```

```text
"sarahje82" OR "mouse82"
```

```text
site:reddit.com "mouse82"
```

```text
site:github.com "mouse82"
```

I won't repeat the mechanics of how these operators work here, since I've already written a full guide to that. The [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/) covers `site:`, exclusions, exact phrase matching and the rest of it in detail, and [Google Dorking for Trace Labs](/posts/google-dorking-trace-labs-osint-pivots/) has a much longer list of these combinations organised by identifier type, if you want the fuller reference. What matters here is what happens once one of these searches actually returns something that looks like a match, which is the harder and more important part of the process.

<h2 id="corroborating-a-candidate">Corroborating a candidate profile</h2>

Finding a profile that might be the same person is the easy part. Working out whether it actually is takes more discipline, and it's where I've seen the most mistakes made, including my own.

Say the known account is an Instagram profile, @sarahje82, and the search above has turned up a Pinterest account, @mouse82. Before I treat that Pinterest account as belonging to the same person, I go through what I actually know about each one and compare them directly. A fictional version of that comparison might look like this.

<div class="table-scroll">

| Attribute | Known profile | Candidate | Assessment |
| --- | --- | --- | --- |
| First name | Sarah | Sarah | Match |
| Location | Wellington | Wellington | Match |
| Nickname | Mouse | mouse82 | Supporting |
| Photo | Known photo on file | Visually consistent | Supporting |
| Partner | David | David W | Supporting |
| Interest | Strong interest in photography | Boards full of photography | Supporting |
| Employer | Example Ltd | Not shown | No evidence either way |

</div>

These pieces of evidence aren't equal, and I try not to treat them as though they were. Also likes photography is weak on its own; plenty of people like photography. A distinctive username, a matching partner's name, a consistent location, and photographs that look like the same person, taken together, is a considerably stronger position, particularly when nothing about the chronology or other details contradicts it. I don't try to turn this into a score or a percentage. There isn't a defensible way to assign a confidence percentage to a nickname match, and pretending there is just hides the actual reasoning behind a number that looks more rigorous than it is.

This is really the beginning of a much bigger topic, one I think deserves its own dedicated piece rather than a section here: how you actually know you've found the right person, when source information is reliable, what independent corroboration looks like versus circular sourcing, and how to reason properly about conflicting evidence. That's going to be a future field guide of its own, OSINT Corroboration: How Do I Know I've Found the Right Person. For now, what follows is enough to make the social media side of this reliable.

<h2 id="confidence-levels">Confidence levels</h2>

I use four simple labels to keep track of how sure I am about any given attribution or fact, and I write the label down next to the thing it applies to rather than keeping it in my head.

<div class="table-scroll">

| Level | What it means |
| --- | --- |
| Confirmed | Multiple sufficiently strong pieces of evidence, ideally independent of each other, establish the relationship or fact. |
| Probable | Several clues support the attribution strongly, but I'd still want more before treating it as settled. |
| Possible | An interesting candidate or lead that needs more work before it's worth relying on. |
| Rejected | Evidence suggests this is probably a different person, or the fact doesn't hold up. |

</div>

These aren't scientific probabilities and I don't pretend they are. They're working labels, and their entire purpose is to stop me drifting, without noticing, from this might be Sarah to this is Sarah simply because I've spent an hour looking at the account and it feels familiar by now. Writing the label down and forcing myself to justify moving something from possible to probable is a small piece of discipline that catches a surprising number of mistakes before they compound.

<h2 id="verifying-facts">Verifying facts, not just accounts</h2>

Corroboration doesn't stop at deciding whether an account belongs to the target. It applies to individual facts too, and this is one of the places people skip the discipline they'd otherwise apply, because a single fact feels smaller and less consequential than an entire profile attribution.

If a Facebook comment seems to suggest the target once lived in Hamilton, I don't write previous address: Hamilton into the profile. I write possible previous location: Hamilton, source: Facebook conversation, confidence: possible, and then I go looking for something independent that supports or contradicts it. The same goes for a possible sibling mentioned once, a possible employer inferred from a comment, or a nickname that's only appeared in one place so far. Each of those can move up to probable or confirmed as more evidence turns up, or drop to rejected if something contradicts them.

Part of what I'm checking for here is whether I actually have independent support, or whether I've just found the same piece of information repeated. Three websites saying the same thing about someone isn't automatically three sources. If Website A copied a biography from LinkedIn, Website B copied the same biography from LinkedIn, and Website C republished Website A's page, that's one piece of information appearing in three places, not three separate confirmations. The same thing happens across social platforms, where someone's own biography gets echoed on every account they hold. That doesn't make it wrong, but it isn't corroboration either, and I try to be honest with myself about the difference. Source independence, and how to reason about it properly when sources are genuinely harder to untangle than this, is another thing the future corroboration article will cover in more depth.

Chronology is the other check I apply constantly, and it catches more than people expect. If the target supposedly lived in Wellington in 2018, but a candidate profile shows continuous activity suggesting they were overseas for that entire period, that's a real contradiction worth investigating properly rather than explaining away because everything else lines up. I look for consistency across ages, schools, employment history, relationships, locations, usernames and the timing of events, and when something doesn't fit, I treat that as useful information in its own right rather than an inconvenience to ignore because the rest of the picture looks promising.

<h2 id="photographs">Photographs as corroboration and pivots</h2>

Photographs did two different jobs in this kind of work for me. The obvious one is supporting or undermining an identity attribution: does this person look like the person I'm expecting. The less obvious one, and often the more productive one, is that photographs are packed with information that has nothing to do with faces at all.

A single photo can show other people worth identifying, a location that can be pinned down from a landmark or a street sign, a business visible in the background, a vehicle, an event, a school uniform, a workplace, a sports club's colours, or evidence of travel. I've seen a pivot chain start from something as small as a club shirt in the background of an otherwise unremarkable photo. The shirt identifies a club, the club has a website, the website has an archive of old team photos, one of those photos is captioned with full names, and one of those names is an associate that wasn't on the board before. None of that starts if a photograph is only checked for whether the face matches.

The facial comparison point is worth repeating once, because it matters enough to say twice: visual resemblance is supporting evidence, not proof. People share faces with strangers more often than feels intuitive, photo quality varies enormously, and confidence in a resemblance tends to increase the longer you stare at two photos side by side, which is exactly the kind of bias worth being suspicious of in yourself.

<h2 id="mapping-relationships">Mapping relationships</h2>

Once I've been through a handful of accounts, a rough map of who's connected to whom starts to emerge on its own: a partner, parents, siblings, children, friends, colleagues, employers, clubs the person belongs to, and other associates who turn up repeatedly.

I try to keep a distinction in my head, and ideally on paper, between three different strengths of relationship. An observed association is just two accounts interacting frequently, commenting on each other's posts, tagged in the same photos, nothing more claimed than that. A claimed relationship is someone actually saying it, my sister, my partner, in a comment or a bio. A corroborated relationship is one where I've got independent information supporting it beyond the claim itself: a second account confirming the same relationship, a shared address, a shared event both people were tagged at. These aren't equally strong, and treating an observed association as though it were a corroborated relationship is the kind of small error that compounds badly over a long investigation.

<h2 id="building-the-profile">Building the MP profile</h2>

All of this is in service of building something structured, not collecting trivia for its own sake. The goal is a profile detailed enough that it opens up other kinds of research, not a scrapbook of interesting facts about a stranger.

I organise it loosely into a handful of categories, which between them cover most of what tends to accumulate over the course of an investigation.

<div class="table-scroll">

| Section | What it captures |
| --- | --- |
| Identity | Full name, former names, nicknames, aliases, approximate date of birth |
| Digital identities | Usernames, email addresses, social accounts and profile URLs |
| Geography | Current and previous locations, associated addresses, regular locations |
| Relationships | Partner, parents, siblings, children, friends, colleagues, associates |
| Organisations | Employers, previous employers, schools, clubs, businesses, community groups |
| Interests | Hobbies, sports, music, vehicles, gaming, travel |
| Evidence | Source, date observed, confidence, notes |

</div>

None of this needs to feel like filling out an intelligence database. It's a working structure that stops information getting lost or contradicting itself as an investigation grows, which happens surprisingly quickly once you're tracking more than a handful of facts in your head at once.

<h2 id="beyond-social-media">Moving beyond social media</h2>

Social media is usually a stage in the investigation rather than the destination. What it produces, when it's gone well, is a set of identifiers specific enough to make other kinds of research possible.

Starting from Sarah Williams, Wellington, and not much else, a properly worked social media investigation might leave me with the full name Sarah Jane Williams, a former surname of Jones, the nickname Mouse, an approximate date of birth, a partner's name, a mother's name, a previous location, a current area, a previous employer, several usernames, several attributed accounts, a school, a sports club, a vehicle, and possibly some phone or address information depending on what's turned up along the way.

That collection of identifiers is what makes other, entirely different sources searchable. Depending on jurisdiction, what's actually available and appropriate varies considerably, but this might include company records, public registries, court records where they're genuinely public, births, deaths and marriages indexes where they're searchable, phone or address directories, news archives, obituaries, professional registers, archived versions of old websites, and other public documents. I'm not going to pretend that list is universal or that everything on it is accessible everywhere. Public record availability differs enormously between countries and even between regions within the same country, and part of doing this properly is knowing what's actually legitimate to access in your specific context rather than assuming it. The methodological point that matters here, regardless of jurisdiction, is that social media OSINT generates the identifiers that make the rest of this kind of research possible. Without a full name, a former surname and a rough date of birth, most of those other sources simply aren't searchable at all.

<h2 id="negative-evidence">Negative evidence and confirmation bias</h2>

Two related habits are worth building in deliberately, because neither comes naturally.

The first is being precise about what absence actually means. If I can't find any Instagram posts from an account after March 2024, the honest statement is that no later public posts were observed on this account after March 2024, not that Sarah stopped using Instagram in March 2024. The account might have gone private. It might have been deleted and I'm looking at a cached remnant. Posts might exist that simply aren't showing up in whatever way I'm looking. The same applies to a platform search that comes back empty. No Facebook account attributable to Sarah was identified during this search is accurate. Sarah doesn't have Facebook is a claim I haven't actually earned. The gap between I didn't find it and it doesn't exist matters more in this kind of work than almost anywhere else, because the whole method depends on absence of evidence being treated honestly rather than quietly converted into evidence of absence.

The second is watching for the point where I've decided I've found the right person and start unconsciously reading every subsequent clue as support for that conclusion. It's an easy trap, because once you've invested time in an attribution, everything ambiguous tends to get resolved in its favour. The check I try to apply deliberately is to ask what would actually prove this is a different person, rather than only asking what would confirm it. Does the age genuinely fit, or am I rounding generously. Does the chronology hold up under scrutiny. Are the associates consistent with who I'd expect, or is there someone who doesn't fit anywhere. Is there employment information that actually contradicts what I have. Does someone else entirely use the same username, which happens more often than you'd think. Could the photograph plausibly be a different person who simply looks similar. None of this needs to become a formal exercise every time, but actively looking for the version of events where I'm wrong is the single habit that has caught the most mistakes in my own work.

<h2 id="workflow-end-to-end">The workflow, end to end</h2>

Pulled together, the process described above runs roughly like this.

1. Verify: establish that the starting profile is genuinely the right person before building on it.
2. Extract: pull out names, usernames, photos, locations, relationships, interests and organisations.
3. Expand: build variations of names and usernames, and combine them into search terms.
4. Discover: use those combinations to find candidate accounts elsewhere.
5. Corroborate: compare identity, photographs, location, relationships and chronology before accepting a candidate.
6. Mine: read posts, comments, conversations, biographies, tags, links and photographs properly.
7. Map: connect people, places, organisations and identifiers as they accumulate.
8. Profile: build a structured record with sources and confidence attached to each entry.
9. Pivot: take verified identifiers into other, non-social-media OSINT sources.
10. Repeat: feed anything new back into the process and go again.

It loops. New information from step nine often sends me straight back to step four with a completely different search term than the one I started with.

<h2 id="field-checklist">Field checklist</h2>

A compact version of the above, for when there's no time to think through the whole process from scratch.

<ul class="checklist">
<li><label><input type="checkbox"> Have I verified the starting profile?</label></li>
<li><label><input type="checkbox"> Have I recorded the known identifiers?</label></li>
<li><label><input type="checkbox"> Have I read the profile rather than just scanned it?</label></li>
<li><label><input type="checkbox"> Have I read public conversations and comments?</label></li>
<li><label><input type="checkbox"> Have I recorded nicknames and aliases?</label></li>
<li><label><input type="checkbox"> Have I searched username variations?</label></li>
<li><label><input type="checkbox"> Have I searched names and aliases together?</label></li>
<li><label><input type="checkbox"> Have I checked the mainstream platforms?</label></li>
<li><label><input type="checkbox"> Have the target's interests suggested other platforms?</label></li>
<li><label><input type="checkbox"> Have I examined photographs for clues beyond the face?</label></li>
<li><label><input type="checkbox"> Have I mapped the important associates?</label></li>
<li><label><input type="checkbox"> Have I corroborated candidate accounts before relying on them?</label></li>
<li><label><input type="checkbox"> Have I separated possible information from confirmed information?</label></li>
<li><label><input type="checkbox"> Have I checked the chronology?</label></li>
<li><label><input type="checkbox"> Have I looked for contradictory evidence, not just supporting evidence?</label></li>
<li><label><input type="checkbox"> Have I recorded the source for important findings?</label></li>
<li><label><input type="checkbox"> Have I considered whether my sources are actually independent?</label></li>
<li><label><input type="checkbox"> Have I searched historically as well as currently?</label></li>
<li><label><input type="checkbox"> Have I taken verified identifiers into other OSINT sources?</label></li>
<li class="emphasis"><label><input type="checkbox"> Am I assuming something I haven't actually proved?</label></li>
</ul>

<h2 id="whats-next">What's next</h2>

This article covers enough corroboration to make a social media investigation reliable, but corroboration as a topic goes considerably deeper than what fits here. A future field guide, OSINT Corroboration: How Do I Know I've Found the Right Person, will deal properly with identity attribution, source reliability and independence, circular sourcing, evidence strength, conflicting evidence, chronology, common name and username collisions, image attribution, relationship verification, confirmation bias and how to document reasoning as an investigation develops.

For the operator mechanics that sit underneath a lot of the searching described here, my [Google Dorking for OSINT guide](/posts/google-dorking-osint-guide/) and [Google Dorking for Trace Labs](/posts/google-dorking-trace-labs-osint-pivots/) cover that ground properly. This piece is really about what happens between the searches: deciding what's worth searching for next, and deciding whether what you've found is actually who you think it is.
