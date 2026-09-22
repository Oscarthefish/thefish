---
title: "Six Functions, Not Six Steps: NIST CSF 2.0 for SOC Analysts"
date: 2026-09-23
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "nist-csf"
  - "security-frameworks"
  - "governance"
  - "risk-management"
  - "field-guide"
seoTitle: "NIST CSF 2.0 for SOC Analysts | Jason Hill"
description: "A practical guide to NIST Cybersecurity Framework 2.0 for SOC analysts: what Govern, Identify, Protect, Detect, Respond and Recover actually mean, why they aren't incident-response stages, and how to use them to see where an alert really fits."
coverImage: "nist-csf-cover.svg"
coverImageAlt: "Terminal-style illustration of a central Govern node connected by thin lines to five surrounding nodes representing Identify, Protect, Detect, Respond and Recover, arranged in a loose circle."
---

An alert fires for suspicious PowerShell activity. The analyst investigates, and the picture that emerges is a familiar one: a phishing email got through, credentials were stolen from it, an attacker authenticated successfully, malware executed, another endpoint got touched, and some data may have been accessed along the way. The SOC contains it. The ticket closes.

That investigation answered the operational question well. But step back from the single ticket and a different set of questions opens up. Who actually owned the risk on that system? Did the organisation know what data and dependencies were exposed? Were the right protections in place before any of this started? Did the SOC have enough visibility to actually catch it in reasonable time? Was the response genuinely effective, or just eventually successful? Could everything affected actually be restored with confidence? And what, specifically, should change as a result?

Those questions stretch well past a single investigation, and they map cleanly onto six words: Govern, Identify, Protect, Detect, Respond, Recover. That's the NIST Cybersecurity Framework 2.0, usually just called CSF 2.0, and this article is a practitioner's way into it.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

A SOC alert usually begins in Detect. The reason it was possible often lives in Protect or Identify. How well the organisation handles it depends on Respond. Its ability to actually get back to normal depends on Recover. And the decisions about ownership, risk and priority behind all of it sit in Govern.

</div>

This is the second article in a short series. The [CIS Controls v8.1 guide](/posts/cis-controls-v8-1-for-soc-analysts/) covered a practical, prioritised set of safeguards, essentially "what should our security practices be." CSF asks a related but genuinely different question: "what cybersecurity outcomes are we trying to achieve, how well are we achieving them, and what should improve." Both are useful. They're not the same tool.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-nist">So what exactly is "NIST"?</a></li>
<li><a href="#what-is-csf">What is NIST CSF 2.0?</a></li>
<li><a href="#govern-addition">The biggest change in 2.0: Govern</a></li>
<li><a href="#six-functions">The six Functions</a></li>
<li><a href="#one-incident-six-functions">One incident, six Functions</a></li>
<li><a href="#functions-not-stages">Functions are not incident stages</a></li>
<li><a href="#core-structure">Functions, Categories, Subcategories</a></li>
<li><a href="#profiles">What are CSF Profiles?</a></li>
<li><a href="#tiers">What are CSF Tiers?</a></li>
<li><a href="#profiles-vs-tiers">Profiles vs Tiers</a></li>
<li><a href="#implementation-examples">Implementation Examples</a></li>
<li><a href="#informative-references">Informative References</a></li>
<li><a href="#cis-vs-nist">CIS Controls vs NIST CSF</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#soc-through-csf">CSF through a SOC analyst's eyes</a></li>
<li><a href="#alert-to-risk">From alert triage to risk thinking</a></li>
<li><a href="#ransomware-example">A ransomware example</a></li>
<li><a href="#supplier-example">A supplier assurance example</a></li>
<li><a href="#not-a-checkbox">Don't turn CSF into a checkbox</a></li>
<li><a href="#not-a-runbook">CSF is not a SOC runbook</a></li>
<li><a href="#how-to-learn">How to learn CSF without memorising it</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#where-to-go-next">Where to go next</a></li>
<li><a href="#useful-resources">Useful NIST resources</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-nist">So what exactly is "NIST"?</h2>

Worth clearing up before anything else, because it trips up a lot of people early. NIST is the National Institute of Standards and Technology, a US federal agency, and it publishes a genuinely large body of cybersecurity guidance. "We use NIST" is, on its own, close to meaningless, because NIST isn't one framework, it's a whole family of publications with different purposes.

```
NIST
  |
  |-- Cybersecurity Framework
  |     `-- CSF 2.0  (this article)
  |
  `-- Special Publications
        |-- SP 800-53   (security and privacy controls)
        |-- SP 800-61   (incident response guidance)
        |-- SP 800-171  (protecting sensitive info in non-federal systems)
        `-- many others
```

That's not a complete map of everything NIST publishes, it's just enough to show why the shorthand is ambiguous. This article is specifically about the Cybersecurity Framework, CSF 2.0. It isn't an SP 800-53 controls article and it isn't an incident-response-procedure article in the SP 800-61 sense, those are different documents doing different jobs, and worth knowing about, but out of scope here.

<h2 id="what-is-csf">What is NIST CSF 2.0?</h2>

In plain terms: CSF 2.0 is a voluntary framework for understanding, assessing, prioritising and communicating cybersecurity risk. It's designed to work across organisations of very different sizes, sectors and levels of maturity, it's technology-neutral, and it's built around outcomes rather than specific technical implementations.

It is not a product. It's not a certification you obtain, there's no CSF-certified badge to earn. It's not a prescriptive checklist that tells you exactly which control to configure. Some sectors or contracts may require alignment with particular frameworks, and it's worth checking your own regulatory context rather than assuming, but CSF itself isn't inherently a mandatory compliance regime; it's more accurately described as a shared structure organisations opt into because it's useful.

What it actually helps you do is describe three things clearly: where you are now, where you want to be, and what the gap between those two points looks like. That's really the whole engine of the framework, restated in different forms throughout the rest of this article.

<h2 id="govern-addition">The biggest change in 2.0: Govern</h2>

CSF 1.1, the previous major version, was commonly represented as five Functions: Identify, Protect, Detect, Respond, Recover. CSF 2.0, released as a final version in February 2024, added a sixth: **Govern**.

That addition matters more than it might sound. Cybersecurity was never purely a technical problem, but the five-Function version made it easy to frame it that way. Govern makes explicit that an organisation needs active decisions around risk appetite, policy, roles and responsibilities, oversight, and cybersecurity supply chain risk, and that those decisions shape everything the other five Functions are actually able to achieve.

NIST's own representation puts Govern at the centre rather than as step one in a line. That's a deliberate choice, not a stylistic one: Govern doesn't happen once at the start and then get left alone, it continuously informs and constrains how Identify, Protect, Detect, Respond and Recover actually operate.

<h2 id="six-functions">The six Functions, at a glance</h2>

<div class="table-scroll">

| Function | Plain-English question |
| --- | --- |
| Govern | How do we direct and oversee cybersecurity risk? |
| Identify | What do we have, and what risks actually matter? |
| Protect | What reduces the likelihood or impact of a bad event? |
| Detect | How would we actually know something happened? |
| Respond | What do we do once we know? |
| Recover | How do we restore operations, and improve afterwards? |

</div>

Those are working paraphrases for this article, not NIST's formal definitions. Now the detail.

<h3 id="function-govern">Govern</h3>

Govern covers organisational context, risk management strategy, roles and responsibilities and authority, policy, oversight, and cybersecurity supply chain risk management, six Categories in total. It's the Function most likely to feel abstract to a SOC analyst, so it's worth grounding immediately.

Suppose a SOC discovers a critical vulnerability on an internet-facing system. The SOC's question is straightforward: is this exploitable, right now, from outside? Govern's questions sit underneath that one: who actually owns this system's risk? Who has the authority to approve remediation downtime, especially if the system supports something revenue-critical? What level of residual risk is the organisation actually willing to accept if it can't be patched immediately? Is there a defined escalation path if the answer to "will you fix this" is no? Does a third-party supplier own part of this service, and if so, whose problem is the vulnerability?

"Security said fix it" is not, on its own, a governance model. Someone with actual authority has to own that decision, and Govern is the Function that's supposed to make sure that ownership exists and is exercised rather than assumed.

A short supplier example helps here too. Say a SaaS provider stores sensitive organisational data. Govern-shaped questions: who approved this supplier in the first place, and against what criteria? What security expectations were actually written into the contract, versus assumed? How is the supplier's risk reassessed over time rather than just at onboarding? What happens, procedurally, if that supplier has an incident? Are the fourth parties this supplier depends on even understood? None of these map one-to-one onto a single CSF outcome, they're illustrating the kind of thinking Govern is asking for.

<h3 id="function-identify">Identify</h3>

Identify is about understanding the organisation's environment well enough to manage cybersecurity risk sensibly: assets, systems, data, dependencies, and the risks and vulnerabilities associated with them. It has three Categories: Asset Management, Risk Assessment, and Improvement, the last of which CSF 2.0 deliberately moved here rather than leaving it scattered across Respond and Recover, making the point that improvement isn't only a post-incident activity.

An EDR alert names `SERVER-142`. Useful Identify-shaped questions before anything else: what actually is this system? Who owns it? What's it for? Is it production or something lower-stakes? What data does it hold? Is it internet-facing? What else depends on it, and what breaks if it goes offline? Without that context, telemetry is just telemetry, a hostname and a process name with no sense of stakes attached. Analysts get meaningfully more effective once alerts arrive enriched with exactly this kind of asset and business context, and a large part of why some alerts are hard to triage quickly is that this context simply doesn't exist yet.

<h3 id="function-protect">Protect</h3>

Protect covers the safeguards that reduce the likelihood or limit the impact of a cybersecurity event, reorganised in CSF 2.0 into five Categories: Identity Management, Authentication and Access Control; Awareness and Training; Data Security; Platform Security; and Technology Infrastructure Resilience.

An attacker logs in using entirely legitimate, stolen credentials. Detect is what tells you something suspicious happened, a login from somewhere unusual, a new device, an unfamiliar pattern. Protect is a different, earlier question: was MFA actually appropriate and enforced here, not just deployed somewhere in the estate? Was the access this account held proportionate to its role? Was administrative privilege permanent when it didn't need to be? Did identity lifecycle processes actually work, or did a stale account sit around waiting to be used? Was sensitive data properly restricted regardless of what the account could authenticate as? Investigating the attack and understanding the protections that should have limited it are genuinely different exercises, and a lot of value sits in doing both rather than stopping at the first.

<h3 id="function-detect">Detect</h3>

Detect is probably the most immediately familiar Function to a SOC reader, covering Continuous Monitoring and Adverse Event Analysis, two Categories in CSF 2.0 (down from three in the previous version). This connects directly to SIEM, EDR/XDR, identity telemetry, network and DNS visibility, email security, cloud logging, alerting logic and behavioural detection generally.

But "having a SIEM" doesn't mean Detect is actually working. Worth asking: is the right telemetry actually being collected, not just some of it? Is coverage genuinely complete across the estate, or does it thin out in specific corners? Are the resulting detections useful, or mostly noise? Are timestamps reliable enough to trust an ordering? Do alerts actually get investigated, or do they queue and expire? Can activity be correlated across sources at all?

A suspicious sign-in on its own is one data point. The same sign-in correlated against identity logs, EDR process execution, a proxy download, a DNS callback and an originating phishing email in the mail logs is a considerably more powerful, and more trustworthy, picture than any single source alone, which is really the whole argument behind [Threat Hunting for SOC Analysts](/posts/threat-hunting-for-soc-analysts/).

<h3 id="function-respond">Respond</h3>

Respond covers what happens once something's been detected: Incident Management, Incident Analysis, Incident Response Reporting and Communication, and Incident Mitigation, four Categories.

Take a credential compromise. The actions that follow tend to include validating that compromise actually occurred, determining scope, revoking active sessions, resetting credentials, isolating an affected endpoint if warranted, blocking indicators where that's genuinely justified, checking for persistence, assessing what data might have been accessed, communicating with the affected stakeholders, preserving evidence properly, and tracking containment and remediation through to completion. Clicking "close alert" is not the same activity as any of that, and conflating the two is one of the more common ways Respond quietly becomes weaker than it looks on paper.

<h3 id="function-recover">Recover</h3>

Recover is the Function that gets the least SOC attention day to day, but it's arguably the one that determines how bad a genuinely serious incident actually turns out to be. It covers Incident Recovery Plan Execution and Incident Recovery Communication, two Categories.

Take ransomware as the clean example. Containment can succeed completely, the spread stops, the attacker's access is cut off, and the organisation still has to answer a separate set of questions: can affected systems actually be restored? Are the backups genuinely usable, not just present? Can restored systems be trusted, or could they reintroduce the same compromise? In what order should services come back online, and who makes that call? How is recovery communicated to the business while it's happening? What changes afterwards so this is less likely, or at least less damaging, next time?

Backups that exist but have never been successfully restored shouldn't create confidence on their own. A backup job completing is not the same claim as a system being recoverable, and the gap between those two claims is exactly where Recover tends to quietly fail.

<h2 id="one-incident-six-functions">One incident, six Functions</h2>

Here's where this stops being six separate ideas and starts being one connected way of seeing an incident. Take a realistic scenario: an employee receives a convincing phishing email, the attacker steals their credentials and session token, accesses Microsoft 365, creates a mailbox rule, and touches some SharePoint files. A suspicious sign-in triggers detection. The SOC investigates, revokes the session, checks the endpoint, and notifies the business owner.

Mapped across all six Functions:

**Govern.** Who owns identity risk for this tenant? What authentication policy actually applies here? Who has the authority to grant an exception to it, and did anyone? What risk decisions led to the controls that were, or weren't, in place before this happened?

**Identify.** What can this specific user account actually reach? What information was genuinely exposed? Is the account privileged in any way? What downstream services depend on this identity existing and behaving normally?

**Protect.** Was MFA enforced, and enforced correctly, for this account? Did conditional access apply? Was access already scoped to least privilege? Had this user had any phishing-specific awareness training? Were session protections, like token binding or reasonable session lifetimes, actually in place?

**Detect.** Did the sign-in anomaly actually trigger promptly? Was the inbox rule creation itself detected, or only found afterward during investigation? Did identity, endpoint and cloud-application telemetry all genuinely feed into the same picture?

**Respond.** How fast was this properly investigated and scoped? Was containment, revoking the session, resetting credentials, removing the malicious mailbox rule, timely? Was the business owner told what actually happened, in language they could use?

**Recover.** Was anything the attacker changed, the mailbox rule, any file permissions, actually reverted? Was the account's state validated as genuinely clean before returning it to normal use? Did anything from this incident get fed back into a lesson learned rather than just closed?

One incident, six genuinely distinct sets of questions. It's rarely accurate to describe an incident like this as "a Detect problem." It's usually a story that touches most, sometimes all, of the outcomes the framework describes.

<h2 id="functions-not-stages">Functions are not incident stages</h2>

This is worth its own section because it's a very easy, very common misreading.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Govern, Identify, Protect, Detect, Respond, Recover is not a six-step incident lifecycle you walk through in order once and finish. The Functions describe continuous, ongoing cybersecurity outcomes an organisation maintains all the time, not a sequence with a start and an end.

</div>

An organisation isn't "in the Protect phase" before an incident and "in the Respond phase" during one. It's continuously governing, continuously identifying its assets and risks, continuously protecting, continuously detecting, and continuously ready to respond and recover, with genuine feedback running between all of them. A lesson learned during Recover might change a Protect control. A gap noticed during Respond might update the Identify picture of what actually depends on what. Reading the Functions as a strict pipeline is the single most common beginner misunderstanding of this framework, and it's worth deliberately unlearning early.

<h2 id="core-structure">Functions, Categories and Subcategories</h2>

The CSF Core has three layers:

<pre class="flow-diagram"><span class="step">Function</span>
<span class="arrow">↓</span>
<span class="step">Category</span>
<span class="arrow">↓</span>
<span class="step">Subcategory</span></pre>

A **Function** is a broad cybersecurity outcome, one of the six above. A **Category** groups related outcomes within a Function; Govern, for instance, breaks into Organizational Context, Risk Management Strategy, Roles Responsibilities and Authorities, Policy, Oversight, and Cybersecurity Supply Chain Risk Management, six Categories carrying 31 Subcategories between them. A **Subcategory** is a specific, more granular outcome underneath a Category.

Taking Organizational Context as a worked example: it's the Category (identified as `GV.OC`) concerned with understanding the circumstances, mission, stakeholder expectations, dependencies, legal and regulatory context, that shape how an organisation makes cybersecurity risk decisions in the first place. Underneath it sit specific Subcategories describing more precise outcomes, things like understanding the organisation's role in the wider supply chain, or understanding which legal and regulatory requirements actually apply to it.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

CSF 2.0 in total has 22 Categories and 106 Subcategories across the six Functions. Those identifiers exist to support mapping, gap analysis, assessment and cross-referencing against other frameworks. A beginner does not need any of them memorised to use the framework well.

</div>

<h2 id="profiles">What are CSF Profiles?</h2>

An Organizational Profile describes an organisation's current and, separately, its target cybersecurity posture, expressed in terms of the CSF outcomes that actually matter to it.

**Current Profile.** Where are we now? A realistic snapshot of which outcomes are actually being achieved today, not which ones are aspired to.

**Target Profile.** Where do we want to be? Defined by business priorities, risk tolerance and any regulatory context that applies.

**Gap.** The distance between those two, which is what actually drives prioritised action.

An illustrative example, clearly not an official NIST case study, just a way of making this concrete:

**Outcome:** important security events are monitored.

**Current:** endpoints have good coverage; Microsoft 365 has good coverage; AWS logging is partial; network appliance logging is inconsistent; visibility into SaaS supplier activity is minimal.

**Target:** centralised telemetry from every critical platform, a defined retention standard, reporting requirements built into critical supplier contracts, and clear ownership of monitoring itself.

**Gap:** AWS logging is incomplete, supplier visibility is largely absent, and retention varies unpredictably by source.

**Action:** enable and configure the missing telemetry, set an explicit retention requirement, prioritise the platforms that matter most first, and add monitoring expectations into supplier assurance going forward.

That worked example is one Subcategory-shaped outcome walked through end to end. A real Organizational Profile does this across every outcome that's actually relevant to the organisation, which is considerably more work, but the shape of the exercise doesn't change.

<h3 id="community-profiles">Community Profiles</h3>

A Community Profile is a baseline set of CSF outcomes published to serve a shared interest across multiple organisations, typically built for a specific sector, subsector, technology or threat type. An organisation can adopt a relevant Community Profile as the starting point for its own Target Profile rather than building one from nothing, which is often a genuinely useful shortcut.

<h2 id="tiers">What are CSF Tiers?</h2>

Tiers are one of the more commonly misunderstood parts of the framework, so it's worth being precise. There are four:

**Tier 1, Partial.** Cybersecurity risk practices tend to be ad hoc and applied reactively, with limited coordination across the organisation.

**Tier 2, Risk Informed.** Risk management practices exist and are approved, but they aren't necessarily applied consistently across the whole organisation.

**Tier 3, Repeatable.** Formalised, organisation-wide policies exist and risk management processes are applied consistently.

**Tier 4, Adaptive.** The organisation adapts its cybersecurity practices continuously, informed by lessons learned, threat intelligence and a changing risk picture.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Tiers describe how an organisation governs and manages cybersecurity risk, not a simple "how many controls are checked off" maturity score, and definitely not a straightforward "Tier 1 bad, Tier 4 good" ranking. An organisation shouldn't default to assuming it needs Tier 4 everywhere; risk, business context and resourcing all matter, and a lower Tier can be a genuinely appropriate, deliberate choice for a lower-risk area.

</div>

<h2 id="profiles-vs-tiers">Profiles vs Tiers</h2>

Beginners mix these up constantly, so a short side-by-side is worth having.

<div class="table-scroll">

| Concept | Think of it as |
| --- | --- |
| Core | The full set of cybersecurity outcomes (Functions, Categories, Subcategories) |
| Profile | Which outcomes matter to us, and where we currently are versus where we want to be |
| Tier | How rigorously and consistently we actually govern and manage cybersecurity risk |

</div>

A Profile is about *which outcomes* and *how far along*. A Tier is about *how well-governed the process itself is*. An organisation could technically be targeting a fairly modest set of outcomes but managing them at a rigorous, repeatable Tier 3, or conversely be aiming for an ambitious set of outcomes while still operating at a fairly ad hoc Tier 1. The two dimensions are genuinely independent.

<h2 id="implementation-examples">Implementation Examples</h2>

CSF 2.0 is deliberately outcome-focused rather than prescriptive, which raises an obvious question: outcome-focused according to whom, exactly? Implementation Examples are NIST's answer. They're concise, notional illustrations of ways an organisation might go about achieving a specific Core outcome, published and maintained online through NIST's Cybersecurity and Privacy Reference Tool so they can be updated more frequently than the Core document itself.

They are examples, not requirements. They aren't exhaustive, and following one particular example isn't what "compliance" with CSF means, since CSF isn't a compliance regime in that sense to begin with. Their job is purely to make an abstract outcome statement more concrete for someone trying to figure out where to start.

<h2 id="informative-references">Informative References</h2>

This is a genuinely useful concept, particularly for anyone comparing frameworks, which is exactly what this two-part series is doing.

CSF states a desired outcome. An Informative Reference maps that outcome to more detailed guidance elsewhere, other standards, control catalogues and frameworks that describe, in more specific technical terms, how that outcome might actually be achieved. NIST maintains and publishes these mappings, and they commonly connect CSF outcomes to resources including CIS Controls, NIST SP 800-53, and various ISO-related standards, among others, accessible through NIST's Cybersecurity and Privacy Reference Tool and the Online Informative References programme. Exactly which mappings are currently published and how complete they are is worth checking directly, since this is one of the areas NIST updates on an ongoing basis rather than only at major version releases.

The point worth internalising: frameworks don't have to compete with each other. CSF describes the outcome; something like CIS Controls can describe a genuinely practical, prioritised way of getting there. Used together, they answer different halves of the same question.

<h2 id="cis-vs-nist">CIS Controls vs NIST CSF</h2>

Worth stating plainly, and deliberately avoided as a framework-superiority argument: neither one is "better." They answer related but different questions, and a simplified way to hold them apart, an educational simplification rather than either framework's own self-description:

**CIS Controls:** what practical security safeguards should we actually prioritise?

**NIST CSF:** what cybersecurity outcomes do we need to achieve, and how well are we managing the risk around them?

Take a concrete problem: "we keep seeing compromised accounts." CIS thinking pulls attention toward specific, practical safeguards, Control 5 and Control 6's account and access management practices, Control 8's logging, Control 9's email protections, Control 14's awareness training, exactly the territory covered in the [CIS Controls guide](/posts/cis-controls-v8-1-for-soc-analysts/). NIST CSF thinking frames the same problem more broadly: who owns identity risk (Govern)? Which identities, systems and data actually matter here (Identify)? What safeguards genuinely exist (Protect)? Can suspicious activity actually be identified (Detect)? Can a compromised account actually be contained quickly (Respond)? Can trusted, normal operation be properly restored afterwards (Recover)?

Neither framing replaces the other. Plenty of mature organisations run both together, using CIS for concrete prioritisation and CSF for the broader risk conversation and cross-team communication, connected through exactly the kind of Informative Reference mapping described above.

<h2 id="soc-through-csf">CSF through a SOC analyst's eyes</h2>

A quick translation table for everyday SOC activity, since the framework is easiest to internalise by mapping it onto work you already do.

<div class="table-scroll">

| SOC activity | CSF perspective |
| --- | --- |
| Investigating an EDR alert | Primarily Detect and Respond, but the investigation often exposes Protect or Identify gaps along the way |
| Threat hunting | Supports Detect directly, and frequently surfaces visibility or control gaps worth feeding elsewhere |
| Vulnerability triage | Needs Identify's asset and risk context to be meaningful, and directly informs Protect decisions |
| Phishing investigation | Can span Protect, Detect and Respond together, with Govern determining policy and ownership |
| Post-incident review | Feeds improvement back across several Functions at once, not just Respond |
| Discovering a logging gap | A Detect capability gap, not merely a SIEM engineering inconvenience |
| A supplier suffers a breach | Can touch Govern, Identify, Detect, Respond and potentially Recover, all at once |

</div>

<h2 id="alert-to-risk">From alert triage to risk thinking</h2>

There's a natural progression in how the same incident gets framed at different levels of experience, and it's worth walking through explicitly, not as an official maturity scale, just a teaching device.

Level one: did the alert fire correctly? Level two: what actually happened? Level three: what was the scope and impact? Level four: why was this possible in the first place? Level five: what organisational cybersecurity outcome is actually weak here? Level six: what risk does that weakness create, who owns fixing it, and how will we know it's actually improved?

An example worth walking all the way through. Observation: several critical SaaS applications don't send authentication logs to the SIEM. SOC impact: malicious access to those applications might not be detected, or reconstructed after the fact, in any useful timeframe. Framework perspective: a desired monitoring outcome isn't actually being achieved for this part of the estate. Evidence: the SIEM's own source inventory, the SaaS platforms' logging configuration, current retention settings, test events fired to confirm ingestion actually works, and any prior incident records touching these platforms. Risk: account compromise or unauthorised activity in these applications could occur without timely detection. Treatment: enable the missing telemetry, define a retention requirement, establish clear ownership of that monitoring, and validate that ingestion and detection genuinely work end to end, not just that a connector exists.

That's the whole shift stated as one worked example: operational knowledge a SOC analyst already has, restated as assurance reasoning someone in risk or governance would immediately recognise.

I've seen this exact gap surface sideways rather than through any deliberate audit: an incident touching one SaaS platform got scoped, and scoping it properly meant asking the SaaS vendor's own support team for sign-in history, because nothing about that platform was reaching the SIEM at all. The incident itself turned out fine. The more useful outcome was the follow-up question it forced: which other platforms are we in exactly this position with, and does anyone actually own finding out?

<h2 id="ransomware-example">A ransomware example</h2>

A more compact second pass through all six Functions, using a familiar chain:

<pre class="flow-diagram"><span class="step">Phishing / exploited service</span>
<span class="arrow">↓</span>
<span class="step">Credential theft</span>
<span class="arrow">↓</span>
<span class="step">Privilege escalation</span>
<span class="arrow">↓</span>
<span class="step">Lateral movement</span>
<span class="arrow">↓</span>
<span class="step">Encryption</span></pre>

**Govern.** Who actually owns ransomware risk and the recovery requirements around it? **Identify.** Which critical assets, data and dependencies were genuinely exposed along this chain? **Protect.** What segmentation, identity controls and hardening should have narrowed the available attack paths? **Detect.** Did monitoring actually see the progression, or only the final encryption event? **Respond.** How quickly could affected systems and accounts realistically be contained? **Recover.** Can critical services actually be restored safely, and in what order?

"EDR failed" can dramatically oversimplify an incident like this, the same argument made from a different angle in [Ransomware Before the Ransomware](/posts/ransomware-before-the-ransomware/). Encryption is usually the last stage of a chain that several Functions each had a chance to interrupt earlier.

<h2 id="supplier-example">A supplier assurance example</h2>

A smaller example worth including because it demonstrates the framework applying well beyond the SOC's own telemetry.

An organisation uses a cloud-hosted customer portal supplied by a third party. That supplier hosts sensitive data, integrates directly with internal systems, has privileged support staff with access into the environment, relies on its own subcontractors, and delivers something genuinely business-critical.

**Govern:** supplier risk management processes, defined roles, contractual security expectations, and the risk decisions that led to using this supplier in the first place. **Identify:** exactly what data, services, dependencies and access paths this relationship actually involves. **Protect:** identity controls, encryption, configuration standards, and how privileged access into the environment is managed. **Detect:** logging, monitoring, breach notification obligations, and visibility into suspicious activity touching this integration. **Respond:** coordination and escalation responsibilities between the two organisations if something goes wrong. **Recover:** business continuity planning, restoration expectations, and any exit or alternative arrangements if the relationship itself becomes untenable.

This isn't NIST's prescribed supplier assessment methodology, there isn't one single official version of that. It's an illustration of the same six-Function thinking applied outside the organisation's own perimeter.

<h2 id="not-a-checkbox">Don't turn CSF into a checkbox exercise</h2>

A handful of statements that sound reassuring and usually aren't examined closely enough: "we have a SIEM, so Detect is covered." "We use MFA, so Protect is done." "We have an incident response policy, so Respond is handled." "We have backups, so Recover is fine." "We filled out a NIST spreadsheet, so we're secure."

None of these are automatically false, but none of them are automatically true either, and outcome-focused thinking means actually asking the harder follow-up: does this genuinely achieve the outcome, in practice, right now? A useful, informal distinction worth holding, not official CSF terminology, just a practical assurance habit: something can be **documented**, separately **implemented**, separately still actually **operating**, and only sometimes, on top of all three, genuinely **effective**. A policy document proves the first. It doesn't prove any of the other three.

<h2 id="not-a-runbook">CSF is not a SOC runbook</h2>

Worth stating directly, because it explains why CSF coexists comfortably with everything else a SOC actually relies on day to day: CSF doesn't tell you which specific SIEM query to run, exactly when to isolate a given device, what EDR detection rule to write, or which firewall rule needs changing. It defines the outcomes those decisions are ultimately in service of. The specific standards, technical controls, procedures, playbooks and tools, several of which this site already covers directly, are what actually deliver the outcome on the ground. That layering is exactly why multiple frameworks and resources sensibly coexist rather than compete: they're operating at different altitudes.

<h2 id="how-to-learn">How to learn NIST CSF without memorising it</h2>

Seven stages, roughly in order.

**Stage 1.** Learn the six Functions by name: Govern, Identify, Protect, Detect, Respond, Recover. That alone gets you further than it sounds like it should.

**Stage 2.** Learn the plain-English question each one answers: who decides and directs (Govern), what matters and what could go wrong (Identify), what reduces the risk (Protect), how would we know (Detect), what do we do (Respond), how do we restore (Recover). These are learning prompts for this article, not NIST's formal wording.

**Stage 3.** Learn the Categories, roughly what each Function is actually made of, without memorising Subcategory identifiers yet.

**Stage 4.** Take incidents you already understand, phishing, ransomware, a compromised admin account, an unpatched internet-facing server, a third-party breach, and map each one across all six Functions the way this article has done twice already.

**Stage 5.** Build a simple Current-versus-Target Profile for a small fictional organisation, one or two outcomes is plenty to start.

**Stage 6.** Compare one specific CSF outcome against the relevant CIS Safeguards that would help achieve it.

**Stage 7.** Only once the shape feels comfortable, start exploring Informative References, Implementation Examples, Tiers in more depth, and the wider NIST publications this article deliberately stayed out of.

The core message worth holding onto: learn the shape of the framework well before you try to learn its identifiers.

<h3 id="exercises">Exercises</h3>

**Exercise 1, map an incident.** A user executes a malicious attachment. The attacker steals a browser session. A cloud account gets accessed. EDR detects suspicious PowerShell. The SOC isolates the endpoint. Which Functions are genuinely relevant here? Resist the urge to answer only "Detect and Respond," push into where Protect and Identify gaps likely sit too.

**Exercise 2, find what's missing.** An organisation has EDR on 95% of endpoints, a SIEM, MFA deployed, but no reliable asset inventory, inconsistent cloud logging, no tested recovery exercise, and no clear risk owner for its critical SaaS systems. Which Functions does each of those gaps actually touch?

**Exercise 3, build a tiny Profile.** A fictional 75-person company runs Microsoft 365 and Azure, has five on-premises servers, a mostly remote workforce, an outsourced IT provider, and no dedicated SOC. Pick two or three CSF outcomes that genuinely matter to a company like this, and describe a Current state, a Target state, the gap, and one concrete action for each.

<h2 id="self-test">Mini self-test</h2>

Try answering these before checking the worked answers.

1. What are the six CSF 2.0 Functions?
2. Which Function was newly added in CSF 2.0?
3. Is CSF a prescriptive technical control catalogue?
4. What's the relationship between a Function, a Category and a Subcategory?
5. What's a Current Profile?
6. What's a Target Profile?
7. What are the four CSF Tiers?
8. Does Tier 4 simply mean "100% secure"?
9. What's an Informative Reference?
10. Why can one incident touch every CSF Function at once?

<details>
<summary>Worked answers</summary>

**1.** Govern, Identify, Protect, Detect, Respond, Recover.

**2.** Govern, added in CSF 2.0; earlier versions had five Functions.

**3.** No. It's outcome-focused rather than prescriptive; Implementation Examples and Informative References support it without turning it into a fixed checklist.

**4.** A Function is a broad outcome, a Category groups related outcomes within it, and a Subcategory is a specific, more granular outcome underneath a Category.

**5.** A realistic snapshot of the cybersecurity outcomes an organisation is currently achieving.

**6.** The outcomes an organisation wants to achieve, shaped by business priorities, risk tolerance and regulatory context.

**7.** Partial, Risk Informed, Repeatable, Adaptive.

**8.** No. Tiers describe how rigorously and consistently cybersecurity risk is governed and managed, not a percentage-secure score, and a lower Tier can be an entirely appropriate choice for lower-risk areas.

**9.** A mapping from a CSF outcome to more detailed external guidance, such as CIS Controls or NIST SP 800-53, that helps show how that outcome might actually be achieved.

**10.** Because a real incident usually involves decisions and gaps across ownership, asset context, safeguards, visibility, response quality and recovery capability all at once, not just the single Function where it happened to become visible.

</details>

<h2 id="where-to-go-next">Where to go next</h2>

This series now has two complementary perspectives on the table. CIS asks what practical safeguards to prioritise. NIST CSF asks what cybersecurity outcomes to achieve and how to manage the risk around them. [Check the Scope First: ISO 27001 for SOC Analysts](/posts/iso-27001-for-soc-analysts/) introduces a different lens again, how an organisation builds a formal management system around information security and risk, including certification and audit, in a way neither CIS nor CSF are built around.

<h2 id="useful-resources">Useful NIST resources</h2>

- [The NIST Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/cyberframework), the official framework hub
- [CSF 2.0 Reference Tool](https://csrc.nist.gov/Projects/cybersecurity-framework), for browsing Functions, Categories, Subcategories, Implementation Examples and Informative References together
- [CSF 2.0 Quick-Start Guides](https://www.nist.gov/cyberframework/quick-start-guides), including role- and topic-specific guides
- [CSF 2.0 Profiles](https://www.nist.gov/cyberframework/profiles), including the Organizational Profile template
- [CSF 2.0 Informative References](https://www.nist.gov/cyberframework/informative-references)

This is the second article in a short framework-learning series; [Same Problem, Four Lenses](/posts/comparing-cybersecurity-frameworks/) compares NIST CSF against CIS, ISO 27001 and NZISM side by side once you've read a few of them.

<h2 id="conclusion">The point</h2>

Early on in a SOC seat, cybersecurity can look like a stream of individual events, a phishing email here, a suspicious login there, a vulnerability alert, a malware detection, one after another. NIST CSF is useful precisely because it makes the larger system around those events visible.

The question stops being only "did we detect the attack" and starts including who actually owns this risk, what genuinely matters here, what protections should have existed, whether failure would even be visible, whether the organisation can actually respond, whether it can actually recover, and what should change because of what was just learned. The analyst still investigates the alert exactly as before. What changes is being able to see where that one investigation actually sits inside the organisation's wider cybersecurity picture, and having a shared language for saying so to people who aren't going to read a SIEM alert the same way you do.
