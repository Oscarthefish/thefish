---
title: "Trace Labs OSINT Search Party CTF 2026 (DEF CON 34)"
date: 2026-08-21
categories:
  - "ctf"
  - "osint"
  - "trace-labs"
tags:
  - "ctf"
  - "osint"
  - "trace-labs"
coverImage: "tracelabs-2026-participant.jpg"
coverImageAlt: "Trace Labs Global OSINT CTF Participant badge, DEF CON 34"
coverBadge: true
---

I recently took part in my first [Trace Labs](https://www.tracelabs.org/) OSINT Search Party CTF, run alongside DEF CON 34. I did it solo and remote rather than on site, which I'll admit I'm a little gutted about, and registered under the team name `han_solo`, happily placing 11th out of 110 teams.

For anyone who hasn't come across it, Trace Labs brings together the OSINT community to use open-source intelligence techniques in support of real-world missing persons investigations, while also giving people a way to develop and test their investigative skills. The format was a four hour window to find and submit as much useful, verifiable information as possible across a set of real missing persons cases. Because the cases are real people, not puzzle scenarios, this post is intentionally light on specifics. No case details, no images, nothing that could identify anyone involved. What I want to cover instead is what I actually learned about how I work, and what worked, when the target is a real person and the clock is running.

### Most of the score came from social media, not tools

Almost everything I scored came from reading social media carefully rather than running tools against it. Specifically, comments. Public posts are curated. Comments from friends and family are not, and that's where the useful information tends to leak out: nicknames, relationships, inside jokes that turn out to be real details, tagged locations, and other people worth looking at next.

The actual technique was fairly repetitive: read every comment, note anything that looked like a name, alias, relationship or place, then go and check whether that thread led anywhere. Most of the time it didn't. Often enough it did.

### Aliases were the best pivot point I had

The single most useful thing I found across multiple cases was an alias, almost always surfaced by a third party in a comment rather than by the missing person themselves. Once I had a name someone else knew them by, I could go looking for accounts registered under that alias instead of their legal name, which is often where the more interesting, less locked-down profiles were sitting. A few genuinely productive threads only opened up after I stopped searching for the "obvious" name and started searching for what their friends actually called them.

### Google dorking to get past the noise

Search results for missing persons cases get swamped fast: news coverage, missing persons group reposts, and a lot of secondhand chatter that isn't actually a lead. Building specific Google dorks was the difference between wading through that noise and actually finding something new. Narrowing by site, excluding obvious news domains, and searching for very specific phrases rather than a name on its own did most of the work here.

### Small details in photos matter more than they seem like they should

One useful pivot came from a screenshot embedded in an otherwise unrelated post, where a conversation shown in the image included a phone number typed out in plain text. Easy to miss on a quick scroll, genuinely useful once I slowed down and actually read what was on screen rather than just looking at the photo as a whole. Slowing down to read images properly, not just glance at them, paid off more than once.

### Confidence is harder than it looks

In one case I was fairly confident, maybe 90% by eye, that two accounts belonged to the same person based on photo comparison, but I couldn't get to a level I was comfortable submitting at. Image quality was the main issue. I tried AI-assisted face comparison tools to close that gap on some of the more obscure, harder to verify accounts, and honestly they didn't move the needle much for me. They didn't give me anything close to the confidence I needed to make the link with certainty, so in those cases I left it alone rather than submit something I wasn't sure of.

### Working solo means constant triage

With a four hour window, every case had to be prioritised against the others, and with no one else to split the workload with, I had to follow my gut on when to keep digging and when to move on. I couldn't justify spending an hour on a case with nothing to show for it while other cases sat untouched. Interestingly, the most recent case was the hardest one for me to build any momentum on, while a couple of the older cases turned up strong leads relatively quickly. I'd have guessed it would go the other way.

Part of that triage was also knowing when to stop. A few times I hit a genuine dead end on a case, and rather than burn more time pushing on it, I closed everything down, started a clean browser session, and moved to a different case entirely. Coming back later with a clear head worked better than grinding.

### Tabs are the real enemy

If I'm honest about my biggest weakness on the day, it's tab management. Every rabbit hole opens more tabs, and by the time I was several pivots deep on a case my browser was carrying a genuinely unreasonable number of open tabs, to the point I was worried about the whole thing crashing. Restarting clean between cases helped, but this is the part of my process I most want to fix before the next one.

### Tools: mostly just a browser

I went in without installing much beforehand, and honestly didn't miss it. For username enumeration I used [Epieos](https://epieos.com/) and [WhatsMyName](https://whatsmyname.app/). For reverse image searches I used a basic "reverse image search" browser extension in Chrome. That's essentially the full list. I skipped the fancy tooling and leaned heavily on manual investigation instead: searching, cross-referencing, following small clues and building connections by hand. I've seen a lot of people ask what to install before an event like this, and my honest answer is that a browser and a willingness to read carefully got me most of the way.

If I'd had more time, the thing I'd have gone digging into next is more specialised people-search tooling, particularly for the US-based cases, things that can surface court records, property records, licensing information and similar. That kind of data tends to be rich with exactly the sort of corroborating detail that's hard to get from social media alone.

### Overall

For a first event, this was a genuinely well run one. A big thank you to Trace Labs and everyone involved in putting it together. I'd recommend it to anyone with an OSINT interest who hasn't tried one yet, and I'm already looking forward to doing it again, ideally in person next time.
