---
title: "Same Problem, Four Lenses: CIS vs NIST vs ISO 27001 vs NZISM"
date: 2026-09-26
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "cis-controls"
  - "nist-csf"
  - "iso-27001"
  - "nzism"
  - "security-frameworks"
  - "field-guide"
seoTitle: "CIS vs NIST vs ISO 27001 vs NZISM: Which Should You Learn? | Jason Hill"
description: "A practical comparison of CIS Controls, NIST CSF 2.0, ISO 27001 and NZISM: what each is really for, where they overlap, and a concrete recommendation for which to learn first depending on your role."
coverImage: "framework-comparison-cover.svg"
coverImageAlt: "Terminal-style illustration of a central problem node connected by thin lines to four surrounding nodes labelled CIS, NIST, ISO and NZISM."
---

A security analyst is scrolling job adverts. One role asks for "familiarity with NIST." Another wants "CIS Controls experience." A third lists "ISO 27001" as a requirement. A government-adjacent role mentions NZISM specifically. And a fifth advert just says "knowledge of security frameworks," which somehow manages to be the least helpful of the five.

From a security-operations background, this can look like four entirely separate disciplines to learn from scratch. It isn't. Identity, assets, logging, vulnerabilities, incident response, data protection, risk, access, suppliers, recovery, that underlying material barely changes between frameworks. What changes is the *perspective* each one takes on it. This article is about those perspectives, and about giving a genuinely concrete answer to "which one should I actually learn."

<div class="callout callout--tip">

<p class="callout-label">Where this fits</p>

**CIS:** what practical safeguards should we consider? **NIST CSF:** what cybersecurity outcomes are we trying to achieve? **ISO 27001:** how does the organisation systematically manage information security risk? **NZISM:** what detailed requirements and assurance expectations apply in the NZ Government context? Teaching simplifications, not official definitions, used throughout this article as a shared mental model.

</div>

This is the fifth and final article in the framework-learning series, and it's meant to work as the hub: the [CIS](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/), [ISO 27001](/posts/iso-27001-for-soc-analysts/) and [NZISM](/posts/nzism-for-security-practitioners/) articles each go deep on one framework; this one pulls back and compares all four side by side.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-a-framework">What is a security framework?</a></li>
<li><a href="#why-so-many">Why so many frameworks?</a></li>
<li><a href="#quick-comparison">Quick comparison</a></li>
<li><a href="#four-refreshers">The four frameworks, briefly</a></li>
<li><a href="#same-incident">One incident, four lenses</a></li>
<li><a href="#same-control">One control, four lenses</a></li>
<li><a href="#where-they-overlap">Where they overlap</a></li>
<li><a href="#not-competing">Not competing products</a></li>
<li><a href="#learning-by-role">Learning order by role</a></li>
<li><a href="#certifications">Do you need certifications?</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#learning-depth">How deeply should you learn each one?</a></li>
<li><a href="#roadmap">A 30-day learning roadmap</a></li>
<li><a href="#presence-vs-effectiveness">Presence vs effectiveness</a></li>
<li><a href="#frameworks-dont-replace-skill">Frameworks don't replace skill</a></li>
<li><a href="#recommended-order">My recommended order</a></li>
<li><a href="#common-misunderstandings">Common misunderstandings</a></li>
<li><a href="#framework-selection-orgs">Which should an organisation use?</a></li>
<li><a href="#practical-exercise">Practical exercise</a></li>
<li><a href="#self-assessment">Self-assessment</a></li>
<li><a href="#further-learning">Further learning</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-a-framework">What is a security framework?</h2>

At the simplest level, a security framework gives an organisation a structured way to think about some combination of risk, controls, outcomes, governance, assurance, implementation and responsibility. Not every framework solves the same part of that problem, and that's the distinction that actually matters here. A framework can be control-oriented, outcome-oriented, management-system-oriented, or government-and-regulatory-oriented. Two frameworks both mentioning access control doesn't mean they're doing the same job; it means access control is a genuinely universal security concern, which it is.

<h2 id="why-so-many">Why so many frameworks?</h2>

This isn't accidental duplication, it's different lenses on the same underlying problem. Take one scenario: a company keeps seeing account compromises. CIS asks what practical safeguards should exist. NIST asks which cybersecurity outcomes are actually weak. ISO 27001 asks how this risk is being managed through the ISMS. NZISM, in a government context, asks which detailed requirements apply and how compliance and residual risk are being formally handled. Same underlying problem, four genuinely different, genuinely useful questions.

<h2 id="quick-comparison">Quick comparison</h2>

<div class="table-scroll">

| Framework | Main perspective | Relative learning curve* | Best for |
| --- | --- | --- | --- |
| CIS Controls v8.1 | Practical safeguards | Easy | Technical practitioners, implementation |
| NIST CSF 2.0 | Cybersecurity outcomes and risk | Easy to moderate | Broad cybersecurity vocabulary |
| ISO/IEC 27001:2022 | Management system and assurance | Moderate | Governance, risk, assurance |
| NZISM v3.9 | NZ Government requirements and assurance | Moderate to hard | NZ Government, supplier assurance |

</div>

\* For an operational security practitioner starting from a SOC background, not an objective, universal ranking.

**Easiest to learn, roughly, in that order: CIS, then NIST, then ISO 27001, then NZISM.** CIS is the most concrete of the four; most of its 18 Controls map directly onto things a SOC analyst already handles, assets, software, identity, logging, vulnerabilities, malware, network monitoring, incident response. NIST's six Functions, Govern, Identify, Protect, Detect, Respond, Recover, are conceptually simple at that top level, even though the outcome-oriented thinking underneath takes a bit more getting used to. ISO 27001 introduces genuinely unfamiliar concepts for most technical practitioners: an ISMS, scope, risk treatment, the Statement of Applicability, internal audit, management review, continual improvement. NZISM isn't conceptually harder than any of these so much as it's larger and more detailed, government-specific, classification-aware, and it wraps a substantial governance and assurance process around its individual controls.

"Easiest to learn" doesn't mean "least valuable," worth stating plainly before going any further.

<h2 id="four-refreshers">The four frameworks, briefly</h2>

Deliberately short refreshers here, each linking to the full guide rather than repeating it.

<h3 id="refresher-cis">CIS Controls</h3>

Eighteen prioritised, practical security practices, from asset and software inventory through to penetration testing, with Implementation Groups (IG1, IG2, IG3) helping organisations prioritise based on risk and resources. Approachable for anyone who thinks well from concrete examples: junior SOC analysts, sysadmins moving into security, engineers building a baseline programme. It teaches practical hygiene, prioritisation, and how different defensive areas connect. On its own, it doesn't teach full risk governance, formal certification, or NZ Government-specific obligations. Full guide: [Beyond the Alert](/posts/cis-controls-v8-1-for-soc-analysts/).

<h3 id="refresher-nist">NIST CSF</h3>

Six Functions, Govern, Identify, Protect, Detect, Respond, Recover, focused on cybersecurity outcomes and risk rather than prescribing one specific implementation. Useful for SOC analysts wanting broader context, senior analysts, incident responders, and anyone who needs a shared vocabulary that works across technical and business audiences. It teaches thinking beyond individual controls and alerts, and how to talk about security across an organisation's whole lifecycle. It doesn't hand you a detailed technical checklist, prescribe products, or certify anything. Full guide: [Six Functions, Not Six Steps](/posts/nist-csf-2-0-for-soc-analysts/).

<h3 id="refresher-iso">ISO 27001</h3>

A management-system standard built around the ISMS: scope, context, risk assessment, risk treatment, Annex A controls, the Statement of Applicability, internal audit, management review, continual improvement, and external certification. Especially relevant for people moving into supplier assurance, GRC, security management, consulting, or audit-adjacent roles. It teaches structured risk management, evidence, control assurance and governance accountability. It does not mean every system is secure, every Annex A control is mandatory, or that certification equals zero risk. Full guide: [Check the Scope First](/posts/iso-27001-for-soc-analysts/).

<h3 id="refresher-nzism">NZISM</h3>

New Zealand Government's information security manual: baseline and recommended controls, MUST/SHOULD compliance language, classification and applicability, compensating controls, certification and accreditation, residual risk, and formal security documentation. Relevant to anyone working for or with NZ Government: government SOC and engineering roles, suppliers, assurance practitioners, security architects in government environments. It teaches detailed control interpretation, system ownership, applicability reasoning and formal security decision-making. It's harder to learn not because its concepts are uniquely difficult, but because the manual is genuinely large and detailed; the skill worth building is navigating it, not memorising it. Full guide: [Search It, Don't Memorise It](/posts/nzism-for-security-practitioners/).

<h2 id="same-incident">One incident, four lenses</h2>

The scenario: an employee's Microsoft 365 account is compromised. Phishing email, credentials and session stolen, attacker authenticates successfully, an inbox rule gets created, SharePoint files are accessed, a suspicious authentication event triggers detection, the SOC investigates, revokes sessions, resets the account, and checks the user's device. Same facts throughout. The questions each framework adds are genuinely different.

**CIS** asks which practical safeguards were relevant: was MFA actually deployed and enforced? Was access broader than it needed to be? Were email protections appropriate? Were logs sufficient to reconstruct what happened? Could the attacker reach more than they should have been able to?

**NIST** works across Functions: who owns identity risk here (Govern)? What could this identity actually access (Identify)? What safeguards existed (Protect)? How was the compromise actually found (Detect)? How was it contained (Respond)? How was trusted operation restored afterwards (Recover)?

**ISO 27001** asks: what risk had already been identified around this? What control requirements applied? Were those controls actually implemented, and what evidence demonstrates that? Was this scenario covered in the existing risk assessment? Did the incident reveal a nonconformity or a genuine improvement opportunity? Does risk treatment need revisiting as a result?

**NZISM**, in a relevant government environment, asks: which requirements actually apply here? What classification or context matters? Were the applicable baseline controls satisfied? What evidence demonstrates that? Does any gap require formal risk treatment or an exception? Does this affect the system's accreditation or its security documentation?

Same incident. Four genuinely different sets of questions. That's the whole article, distilled into one scenario.

<h2 id="same-control">One control, four lenses</h2>

Take multi-factor authentication specifically. Under CIS, it's a practical safeguard, part of access-control implementation. Under NIST, it's one way of helping achieve an identity and access outcome. Under ISO 27001, it's a control selected because the organisation's own risk assessment justified it, and it needs to be evidenced through the ISMS. Under NZISM, it may be a specific, applicable security requirement depending on the system and its classification, potentially with its own compliance level attached.

Four frameworks, one control, four different reasons it exists and four different ways its presence gets justified and evidenced. That's a genuinely useful pattern to internalise, because it generalises: whatever control you're looking at, asking "what's this framework's reason for requiring it" tends to be more useful than assuming the control means the same thing in every context.

A related distinction worth having explicit: **control-oriented** thinking asks "what security measure should exist" (MFA). **Outcome-oriented** thinking asks "what result are we trying to achieve" (only authorised users obtain appropriate access). **Management-system thinking** asks "how does the organisation identify, manage, measure and improve this risk over time" (access risk assessed, controls selected, implemented, monitored, audited, improved). **Government-requirement thinking** asks "what requirement applies in this context, and how is it demonstrated or formally managed." None of the four frameworks belongs exclusively to one of these categories, but each leans noticeably toward one, and knowing which helps predict what kind of question it's actually going to ask you.

<h2 id="where-they-overlap">Where they overlap</h2>

Strip away the framework-specific vocabulary and the same themes turn up everywhere: asset management, identity and access, logging and monitoring, vulnerability management, incident response, data protection, supplier risk, recovery, governance, security awareness, secure configuration, network security.

This is genuinely good news for anyone learning more than one framework. Someone who already understands why privileged access matters doesn't need to relearn that security principle four separate times. They need to learn how each framework happens to express it, which is a much smaller task than it initially looks like from four separate table-of-contents pages.

<h2 id="not-competing">Not competing products</h2>

"Which framework is best" is often the wrong question entirely. Plenty of organisations genuinely use all four at once: NIST to structure security outcomes and communicate risk, CIS to prioritise practical implementation, ISO 27001 for its ISMS and external certification, NZISM because government obligations actually apply to them.

```
                 ORGANISATIONAL RISK
                         │
          ┌──────────────┼──────────────┐
          ▼               ▼               ▼
        NIST             ISO            NZISM
      outcomes           ISMS        requirements
          │               │               │
          └───────┬───────┴───────┬───────┘
                  ▼               ▼
                        CIS
               practical safeguards
```

One way to think about complementary use, not an official hierarchy or a claim that any framework sits "above" another.

<h2 id="learning-by-role">Learning order by role</h2>

<div class="table-scroll">

| Role | Highest-value frameworks to learn |
| --- | --- |
| Junior SOC analyst | CIS, NIST |
| Senior SOC analyst | CIS, NIST, ISO basics |
| Incident responder | NIST, CIS |
| Security engineer | CIS, NIST |
| Security architect | NIST, ISO, NZISM where relevant |
| GRC analyst | ISO, NIST |
| Supplier assurance | ISO, NIST, NZISM where relevant |
| NZ Government security analyst | NZISM, NIST |
| Security manager | NIST, ISO, CIS |
| SME security advisor | CIS, NIST, ISO awareness |

</div>

These are suggested learning priorities, not job requirements or a claim about what any specific employer expects.

For a **junior SOC analyst**, CIS and NIST alone go a long way. You don't need to memorise every framework; understanding the 18 Controls broadly and the six NIST Functions gives genuinely strong interview vocabulary on its own. Instead of "I look at alerts," you get to say something like "my work sits mostly in Detect and Respond, but I understand that strong Identify and Protect controls are what actually reduce how many incidents we end up investigating in the first place," which demonstrates real breadth without overclaiming GRC expertise you don't have yet.

A **senior SOC analyst** benefits from adding basic ISO literacy on top of CIS and NIST, because senior work increasingly means identifying systemic weaknesses, explaining risk to people outside the SOC, influencing remediation, and participating properly in post-incident improvement. ISO's claim-to-evidence-to-finding-to-risk-to-treatment chain, covered in depth in the ISO article, is directly useful here even without pursuing anything like a formal assurance role.

Someone moving into **GRC** benefits most from ISO 27001 and NIST CSF first, then layering CIS back in to keep that thinking grounded in real technical controls rather than abstract governance, and NZISM where it's actually relevant. Someone moving into **supplier assurance** should prioritise ISO first, since scope, risk and control evidence are exactly its territory, then NIST for the outcome vocabulary, then CIS for grounding, then NZISM if government clients or obligations are in the picture. A quick example: a supplier says "we're ISO 27001 certified." A weak response is "great." A better one asks what the certification scope actually covers, whether the specific service being procured is inside it, what access the supplier actually has, what data's involved, which controls genuinely matter to that specific risk, what evidence exists, and what residual risk remains, exactly the reasoning the ISO article walks through with the MedConnect example.

**Security engineers** benefit from CIS first and NIST second, mainly because it changes "security wants more logging" into something engineers can actually reason about: what outcome does this support, what risk does it address, what evidence might eventually be needed, what compliance requirement might apply. **Incident responders** benefit from NIST and CIS together, since containment and recovery are only part of the job; framework literacy helps identify control failures, root causes, systemic gaps and risk ownership issues that a purely technical response wouldn't surface on its own. **Security managers** benefit from a working understanding of all four, with particular depth in NIST and ISO, since the role spends most of its time translating between technical controls, risk, business priorities and governance, with CIS keeping implementation grounded and NZISM mattering wherever government relationships exist.

<h3 id="nz-career-path">The New Zealand-specific path</h3>

For a private-sector SOC role, CIS and NIST are likely the highest-value starting point. For security assurance or GRC work generally, ISO and NIST. For a government SOC or security-engineering role, NZISM alongside CIS and NIST. For government assurance or architecture work specifically, NZISM, ISO and NIST together. For supplier assurance work that touches government clients, ISO, NIST and NZISM. Again, likely highest-value learning priorities, not rigid hiring requirements; actual roles vary.

<h3 id="job-adverts">What job adverts actually mean</h3>

Worth being a little skeptical of vague framework language in job ads, because it's genuinely ambiguous more often than it looks. "Knowledge of NIST" could mean CSF specifically, or SP 800-53, or SP 800-61, or something else entirely from NIST's considerably larger publication catalogue, the exact distinction covered in the NIST article's opening section; don't assume every "NIST" mention automatically means CSF. "ISO 27001 experience" could mean anything from having worked inside an ISO-certified environment, to implementing specific controls, to ISMS administration, to internal or external audit support, to risk assessment, to running an actual certification project, genuinely different jobs wearing the same three words. "NZISM experience" could mean operating systems under its requirements, implementing controls, formal assurance work, system accreditation, architecture, incident response inside a government environment, or supplier assessment. When a job description uses this kind of shorthand, it's worth asking directly what the role actually involves day to day rather than assuming from the label alone.

<h2 id="certifications">Do you need certifications?</h2>

Learning a framework and earning a certification in it are different things, worth keeping separate. CIS and NIST CSF knowledge can both be genuinely self-taught from freely available material, this series included. ISO 27001 has formal training and certification pathways, but understanding the concepts, ISMS, scope, risk treatment, the SoA, doesn't require paying for any of them first. NZISM's material is entirely public, published directly by GCSB and NCSC, and most of what a practitioner needs can be learned straight from the live manual. The practical message: understand the framework before deciding whether a paid qualification is actually worth it for your specific career goals, not the other way around.

<h2 id="learning-depth">How deeply should you learn each one?</h2>

Three rough levels, worth being explicit about which one you're actually aiming for.

**Level 1, interview literacy.** You can explain a framework's purpose, its basic structure, its key concepts, and how your own role connects to it.

**Level 2, practical working knowledge.** You can navigate the framework, map a real problem to the areas it's relevant to, understand what evidence would demonstrate a control, discuss gaps sensibly, and communicate risk to someone else.

**Level 3, specialist.** You can conduct formal assessments, help design a programme around the framework, lead implementation work, support audits or accreditation directly, build cross-framework mappings, and advise other people on it.

Most SOC analysts only need Level 1 or 2 to start with, across most or all of these four. Level 3 is a genuine specialism, worth growing into deliberately over time rather than something to chase across all four frameworks at once.

<h2 id="roadmap">A 30-day learning roadmap</h2>

A realistic month, roughly 45 to 60 minutes a day, aiming for working familiarity rather than mastery.

**Week 1, CIS.** Understand all 18 Controls broadly and how IG1, IG2 and IG3 relate to each other. Map three incidents, phishing, ransomware, account compromise, to the Controls each one touches.

**Week 2, NIST CSF.** Learn the six Functions properly, and enough about Categories, Profiles and Tiers to talk about them sensibly. Map the same three incidents across Functions this time, and notice how differently the exercise feels.

**Week 3, ISO 27001.** Learn the ISMS, scope, risk assessment and treatment, Annex A, the SoA, evidence, internal audit and continual improvement. Practise the claim-to-evidence-to-finding-to-risk chain deliberately on a real or invented claim.

**Week 4, NZISM.** Learn scope and audience, MUST versus SHOULD, applicability, certification and accreditation, and how residual risk and evidence work in this specific context. Spend real time in the live NZISM search rather than reading about it secondhand.

An optional add-on worth trying: take one scenario, a compromised admin account works well, and spend one day analysing it through each framework in turn, CIS on day one, NIST on day two, ISO on day three, NZISM on day four. The security problem never changes across those four days. Only the questions you're asking about it do, which is really the whole point of this entire article in miniature.

<h3 id="crosswalk">A word on framework mappings</h3>

It's tempting to build a small crosswalk table, "logging in CIS maps to this NIST Category, which maps to this ISO control area, which maps to this NZISM section." That kind of mapping can be a genuinely useful study aid, provided every reference in it is checked against current, authoritative sources rather than assumed or copied from an unverified spreadsheet. Even then, treat any such mapping as showing *related intent*, not identical wording or identical evidence requirements.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

A mapping spreadsheet saying framework A's control corresponds to framework B's control does not mean implementing one automatically satisfies the other. Scope differs, wording differs, implementation expectations differ, required evidence differs, applicability differs, and governance requirements differ. This is particularly worth remembering for ISO and NZISM specifically: an ISO 27001 certificate does not automatically prove NZISM compliance, and NZISM compliance is not the same claim as ISO certification, exactly the point made from the ISO side in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/) and from the NZISM side in the [NZISM article](/posts/nzism-for-security-practitioners/).

</div>

For a full treatment of how to actually build and maintain that kind of mapping properly, without it turning into exactly the kind of unverified spreadsheet this warning describes, see [Related Is Not Identical: Framework and Control Mapping](/posts/framework-and-control-mapping/).

<h2 id="presence-vs-effectiveness">Presence vs effectiveness</h2>

Take "we have MFA" and run it through all four lenses one more time, because this is where the series really ties together. CIS asks whether appropriate access control is genuinely implemented. NIST asks whether the access-control outcome is actually being achieved. ISO asks whether the control was properly selected, implemented and evidenced through the ISMS. NZISM asks whether implementation actually satisfies the applicable requirement.

Then the harder question sits underneath all four: does MFA actually operate as intended, everywhere it's supposed to? Common gaps: legacy protocols that bypass it entirely, service accounts excluded from it, break-glass accounts sitting outside normal enforcement, privileged exceptions nobody's revisited in years, conditional access rules with quiet holes in them, session theft that renders the initial authentication moot, or unsupported systems that simply can't do MFA at all. No framework answers that harder question for you. All four give you a structured way to go and find out.

<h2 id="frameworks-dont-replace-skill">Frameworks don't replace skill</h2>

Knowing NIST or ISO doesn't make someone a good SOC analyst. Frameworks provide structure, not the underlying technical judgement, log analysis, endpoint investigation, networking fundamentals, identity knowledge, threat intelligence and critical thinking that actually solve a real investigation, the entire subject matter of most of the rest of this site. Equally, strong technical skill on its own doesn't automatically prepare someone to discuss organisational risk, assess a supplier properly, evaluate evidence critically, or participate meaningfully in an audit or accreditation process. The strongest practitioners genuinely combine both, and neither one substitutes for the other.

The related trap worth naming directly: don't try to become a framework collector. "I need to learn every framework there is" is a worse goal than "learn one deeply enough to actually understand how frameworks work in general." Once that clicks, the next one is considerably easier, because the underlying security fundamentals, asset management, identity, logging, vulnerabilities, incident response, data, recovery, keep reappearing everywhere. The vocabulary changes. The underlying security principle usually doesn't.

<h2 id="recommended-order">My recommended order</h2>

For an operational practitioner without prior framework study: **CIS first**, because it connects fastest to security work you already understand. **NIST second**, because it shows you where those same controls actually fit inside a broader security programme. **ISO 27001 third**, because it introduces governance, risk, evidence and assurance thinking that CIS and NIST don't really touch. **NZISM fourth**, where it's actually relevant to your role, because it layers detailed NZ Government requirements on top of everything already learned.

That's one reasonable pathway, not the only one. An **assurance-focused path** might run ISO, then NIST, then CIS, then NZISM if relevant. A **NZ Government-focused path** might run NZISM first, then NIST, then ISO, going deeper on CIS as needed underneath all three. An **entry-level SOC path** can genuinely stop at CIS then NIST for quite a while before needing anything else. None of these are official; they're reasonable orderings given different starting goals.

<h3 id="interview-minimums">What I'd learn for an interview</h3>

**CIS:** what it is, the 18 Controls at a high level, IG1/IG2/IG3, and five or six Controls that connect most directly to SOC work specifically. **NIST:** the six Functions, why they aren't sequential incident-response stages, basic awareness of Profiles and Tiers, and how your own day-to-day work maps onto them. **ISO:** what an ISMS is, what scope means and why it matters, the shape of risk assessment and treatment, what Annex A is for, what the Statement of Applicability actually does, what evidence looks like, and what certification does and doesn't prove. **NZISM:** its purpose and audience, MUST versus SHOULD, baseline versus recommended controls, why applicability and classification matter, certification versus accreditation, what residual risk means here, and how to actually search the manual.

<h3 id="mini-interview-questions">Mini interview questions</h3>

<details>
<summary>Twelve questions to test yourself against</summary>

**1. What's the main difference between CIS Controls and NIST CSF?** CIS is a prioritised set of practical safeguards; NIST CSF is an outcome-and-risk framework describing what an organisation should be achieving and managing, without prescribing exactly how.

**2. What are the six NIST CSF 2.0 Functions?** Govern, Identify, Protect, Detect, Respond, Recover.

**3. Is ISO 27001 primarily a technical-control checklist?** No, it's a risk-based management-system standard; Annex A provides a reference control set selected against risk, not a list to implement in full.

**4. What does ISMS mean?** Information Security Management System, the organised system of policy, process, risk management, controls and evidence through which an organisation manages information security.

**5. What is a Statement of Applicability?** The document recording which Annex A controls an organisation has determined are applicable, their implementation status, and the justification for inclusions and exclusions.

**6. Does ISO certification mean every service a supplier provides is certified?** No, only what falls inside the certificate's stated scope; always check the scope statement directly.

**7. What's the difference between a MUST and a SHOULD in NZISM?** MUST is a baseline requirement where deviation needs formal justification and Accreditation Authority approval; SHOULD is recommended practice where non-use still requires the resulting risk to be genuinely considered.

**8. Does an ISO certificate prove NZISM compliance?** No, they're related but separate assurance mechanisms; one doesn't automatically demonstrate the other.

**9. Why might an organisation use CIS and NIST together?** CIS gives concrete, prioritised implementation guidance; NIST gives the outcome and risk structure to organise and communicate that work at a broader level.

**10. Which framework would you start with as a SOC analyst, and why?** CIS, most commonly, because it connects most directly and quickly to security work already familiar from operational experience.

**11. What's the difference between a control being present and operating effectively?** Presence means the control or the technology behind it exists; operating effectively means evidence shows it's consistently working as intended, in practice, over time, not just configured at one point in time.

**12. Why shouldn't an analyst accept major residual business risk themselves?** Because that decision requires organisational authority and accountability the analyst role doesn't hold; it belongs with an authorised risk or business owner instead.

</details>

<h2 id="common-misunderstandings">Common misunderstandings</h2>

"CIS is only for small organisations." No, Implementation Groups scale it, but the Controls themselves apply broadly. "NIST tells you exactly how to configure security." No, it describes outcomes, not implementation detail. "ISO means the organisation is secure." No, it means an assessed management system exists within a defined scope. "NZISM only matters to security auditors." No, it shapes how systems are actually built and operated in government contexts, not just how they're assessed. "You must choose one framework." No, most mature organisations use several together. "Knowing control numbers means you know the framework." No, navigating and applying the framework matters far more than memorised identifiers. "Having a framework means controls are effective." No, presence and effectiveness are genuinely different claims, covered above. "Compliance equals security." No, a compliant system can still be poorly defended, and a genuinely well-defended one can still have compliance gaps.

<h2 id="framework-selection-orgs">Which should an organisation use?</h2>

Avoid overgeneralising here, but a few honest starting points. A small NZ SME probably gets more practical value starting with CIS, particularly IG1, than trying to adopt anything larger. An organisation pursuing formal external certification for customer or partner assurance reasons needs ISO 27001 specifically, since it's the one of the four that's actually certifiable in that sense. A NZ Government agency will find NZISM requirements genuinely non-optional. A supplier to government may find NZISM obligations flowing through into contracts depending on what's actually being procured. Plenty of organisations combine several of these rather than picking exactly one.

A small worked example: a 25-person business running Microsoft 365 and cloud accounting through a managed IT provider, no dedicated security team. Would you recommend they implement the entire NZISM? Almost certainly not, it's built for a different scale and context entirely. Would CIS IG1 be a more practical starting point? Very likely yes. Would NIST still help structure their security thinking even at this size? Yes, even informally. Could ISO become relevant later if a customer starts demanding formal certification assurance? Genuinely possible. The point isn't dismissing NZISM or ISO for a business like this, it's fit for purpose.

Contrast that with a 2,000-employee organisation handling sensitive data across cloud and on-premises systems, running a 24/7 SOC with multiple suppliers. Here, combining frameworks stops being optional in any practical sense: NIST to structure the outcomes and risk programme, ISO for the ISMS and external assurance, CIS for grounded implementation priorities, and NZISM if government obligations genuinely apply. Not an official prescription, just what combination naturally tends to make sense at that kind of scale.

<h2 id="practical-exercise">Practical exercise</h2>

A critical internet-facing server: owner unknown, missing patches, EDR installed and reporting, logs retained for seven days, local admin account shared by the support team, backups running nightly, no restore test in eighteen months.

Work through it under each lens. **CIS**: which Controls does each finding touch, vulnerability management, account management, access control, audit log management, data recovery? **NIST**: which Functions does each finding sit in, and does the pattern as a whole suggest a Protect gap, a Detect gap, or both together? **ISO**: what would the claim-to-evidence chain actually look like for each finding, and what would the resulting Statement of Applicability entry need to say? **NZISM**, if relevant to your context: which applicable requirements would you go and search for first, and what would the exception process look like for whichever gaps can't be closed immediately?

No fabricated precise control mappings here deliberately; work through the reasoning using the live official references for each framework where you want to check a specific claim.

<h2 id="self-assessment">Self-assessment</h2>

After this series, can you explain: for **CIS**, the 18 Controls, what a Safeguard is, and what Implementation Groups do? For **NIST**, the six Functions, and roughly what Profiles and Tiers are for? For **ISO**, what an ISMS is, what scope means, the shape of risk assessment and treatment, what the SoA is, and what evidence actually looks like? For **NZISM**, its scope and audience, MUST versus SHOULD, applicability, certification versus accreditation, and what residual risk means in that context?

If yes to all of that, you have genuine framework literacy. You don't yet need to memorise hundreds of individual controls, and for most roles, you may never need to.

<h2 id="further-learning">Further learning</h2>

The full series, in the order this article recommends working through them: [CIS Controls for SOC Analysts](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF 2.0 for SOC Analysts](/posts/nist-csf-2-0-for-soc-analysts/), [ISO 27001 for SOC Analysts](/posts/iso-27001-for-soc-analysts/), and [NZISM for Security Practitioners](/posts/nzism-for-security-practitioners/). Revising for an interview specifically rather than reading in depth? [CIS, NIST, ISO 27001 and NZISM: The Interview Guide](/posts/security-frameworks-interview-guide/) condenses all four into one revision-night article.

[A Claim Is Not Evidence: Security Assurance for SOC Analysts](/posts/security-assurance-for-soc-analysts/) picks up exactly this thread, taking the evidence-based reasoning covered across this series and applying it directly to control assurance, supplier assurance and risk findings.

<h2 id="conclusion">The point</h2>

Back to the question this article opened with: which framework should you actually learn? If you work in security operations and haven't studied frameworks before, start with CIS. Learn NIST next. Add ISO once you want to understand assurance and risk properly. Add NZISM if New Zealand Government security is genuinely relevant to your role.

But the real lesson underneath all of that isn't memorising four frameworks. It's learning to recognise the same security problem from genuinely different angles, technical safeguard, cybersecurity outcome, risk-management system, formal government requirement, and once that distinction is properly internalised, every framework after the first one gets noticeably easier to pick up. That's a far more durable skill than knowing any single framework by heart, and it's the one this whole series has actually been trying to teach.
