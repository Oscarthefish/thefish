---
title: "Search It, Don't Memorise It: NZISM for Security Practitioners"
date: 2026-09-25
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "nzism"
  - "security-frameworks"
  - "governance"
  - "supplier-assurance"
  - "field-guide"
seoTitle: "NZISM for Security Practitioners | Jason Hill"
description: "A practical guide to the New Zealand Information Security Manual for security practitioners: what MUST and SHOULD actually mean, how baseline controls and dispensations work, and how to navigate the manual instead of trying to memorise it."
coverImage: "nzism-cover.svg"
coverImageAlt: "Terminal-style illustration of a requirement node leading to an applicability check, a control and evidence node, then branching into a compliant path and a gap-risk-treatment-decision path."
---

You're investigating a security issue. A production server is missing an important security configuration. Someone on the call asks: "is that actually an NZISM requirement?"

You search the manual and find a control. It says:

```
Compliance: MUST
```

And now several more questions show up at once. What does MUST actually mean here? Does this control even apply to this particular system? Does the information's classification change anything? What happens if the technology genuinely can't support the requirement? Can something else compensate for the gap? And who, exactly, gets to decide whether the risk that's left over is acceptable?

That's the point where the NZISM starts making a lot more sense, once you stop treating it as a document to memorise and start treating it as a risk and assurance manual you learn to navigate.

<div class="callout callout--tip">

<p class="callout-label">Where this fits</p>

**CIS:** what practical safeguards should we consider? **NIST CSF:** what cybersecurity outcomes are we trying to achieve? **ISO 27001:** how does the organisation systematically manage information security risk? **NZISM:** what information security requirements and controls apply in the NZ Government context, and how do we demonstrate and manage them? Simplified learning prompts, not full descriptions, but a useful way to hold all four apart.

</div>

This is the fourth article in a short series. [CIS](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/) and [ISO 27001](/posts/iso-27001-for-soc-analysts/) each covered a different lens on the same underlying problem. NZISM adds a New Zealand Government-specific one, considerably more detailed and prescriptive in places, but built on exactly the same underlying discipline: requirement, applicability, evidence, gap, risk, decision.

This article covers **NZISM Version 3.9**, last updated November 2025, the current version at time of writing. If you're reading this later and the live manual shows a newer version, treat anything version-specific below with appropriate caution and check [nzism.gcsb.govt.nz](https://nzism.gcsb.govt.nz/) directly.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-nzism">What is the NZISM?</a></li>
<li><a href="#who-is-it-for">Who is the NZISM for?</a></li>
<li><a href="#how-structured">How the NZISM is structured</a></li>
<li><a href="#reading-a-section">How a section works</a></li>
<li><a href="#must-should">MUST, MUST NOT, SHOULD, SHOULD NOT</a></li>
<li><a href="#classification">Classification and applicability</a></li>
<li><a href="#risk-management">Risk management</a></li>
<li><a href="#compensating-controls">Compensating controls</a></li>
<li><a href="#exceptions-and-risk-ownership">Exceptions and who owns risk</a></li>
<li><a href="#certification-accreditation">Certification and accreditation</a></li>
<li><a href="#system-owner">System owner</a></li>
<li><a href="#security-documentation">Security documentation</a></li>
<li><a href="#nzism-through-soc-eyes">Through a SOC analyst's eyes</a></li>
<li><a href="#detailed-scenarios">Two detailed scenarios</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#supplier-assurance">Supplier assurance</a></li>
<li><a href="#nzism-by-topic">Cloud, incidents, vulnerabilities</a></li>
<li><a href="#navigating-the-manual">Navigating the manual</a></li>
<li><a href="#claim-evidence">Claim to evidence</a></li>
<li><a href="#comparison">NZISM vs CIS, NIST and ISO</a></li>
<li><a href="#private-sector">NZISM and the private sector</a></li>
<li><a href="#soc-to-assurance">From SOC to assurance</a></li>
<li><a href="#full-worked-example">A full worked example</a></li>
<li><a href="#exercises">Practical exercises</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#how-to-learn">Learning NZISM without memorising it</a></li>
<li><a href="#common-mistakes">Common beginner mistakes</a></li>
<li><a href="#useful-resources">Useful resources</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-nzism">What is the NZISM?</h2>

The New Zealand Information Security Manual is the New Zealand Government's manual covering information governance, information assurance and information systems security. It's developed and maintained by the Director-General of the GCSB, acting in the role of Government Chief Information Security Officer, through the National Cyber Security Centre.

It contains baseline controls, additional recommended-practice controls, rationale explaining why each control exists, contextual material, references, and the governance and assurance processes that sit around all of it. It updates more frequently than a lot of comparable standards; individual chapters get revised as technology and threats change rather than waiting for a single infrequent major rewrite, which is part of why checking the live site rather than a saved PDF matters.

<h2 id="who-is-it-for">Who is the NZISM for?</h2>

The NZISM is intended primarily for New Zealand Government departments, agencies and organisations. Crown entities, local government and private-sector organisations are also encouraged to use it, and its stated audience explicitly includes information security executives and practitioners as well as vendors, contractors and consultants who provide technology services to government agencies.

Worth being precise here, because it's easy to overstate: "encouraged to use it" is not the same claim as "every New Zealand company must comply with it." Most private-sector organisations encounter the NZISM indirectly rather than because it applies to them by default: providing services to government, responding to government procurement requirements, hosting government information, delivering managed or cloud services into government environments, or being asked to demonstrate specific NZISM controls as part of a supplier relationship. If you're a private-sector practitioner reading this because a customer or contract mentioned it, that's very likely the reason.

<h3 id="nzism-and-psr">NZISM and the Protective Security Requirements</h3>

The Protective Security Requirements, PSR, provide New Zealand Government's broader protective security framework, covering governance, personnel security, information security and physical security together. The NZISM sits within that wider environment as the detailed information-security and information-systems-security layer: where PSR sets broader protective security expectations, NZISM gets specific about information systems, technical controls, and the assurance processes around them. This article is about NZISM specifically, not a full treatment of PSR.

<h3 id="not-just-hardening">Not just a technical hardening guide</h3>

A first-time reader coming from a technical background might expect something like a CIS Benchmark, configuration settings and not much else. NZISM is considerably broader than that. It covers governance and accountability, risk management, security documentation, system certification and accreditation, security incidents, physical environments, personnel-related considerations, communications, the full system lifecycle, and technical controls across networking, cloud, cryptography and more.

```
GOVERNANCE + ASSURANCE + RISK + TECHNICAL SECURITY
```

That combination is a large part of why the manual feels so big on first contact. It isn't only a technical document, it's a technical document sitting inside a governance and assurance framework, and both halves matter.

<h2 id="how-structured">How the NZISM is structured</h2>

The manual is organised into numbered chapters, each broken into sections, and each section into individual controls with their own identifiers. A practical way to think about the manual, not an official NZISM category system, just a learning grouping, is roughly four clusters:

**Governance and assurance:** understanding and using the manual, applicability and compliance, roles and responsibilities, certification and accreditation, and security documentation. This is chapters 1 through 5.

**Security operations and risk:** things like security incident detection and management, sitting around chapter 7.

**System and technology security:** the largest cluster by volume, covering areas like authentication and access controls (chapter 16, renamed from "Access Controls and Passwords" in the v3.9 update), cryptography (chapter 17), gateway security (chapter 19), and public cloud security (chapter 23), among many others.

**Physical, personnel and media:** personnel security (around chapter 9) and related physical and media-handling material sits alongside the technical chapters.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

That grouping is mine, built for learning purposes, not an official NZISM structure. Chapter numbers and titles do change between versions, exactly as chapter 16 was renamed in v3.9. Always confirm the current chapter and section numbers against the live manual rather than trusting a cached mental model, including this article's.

</div>

The full current document is browsable and searchable at [nzism.gcsb.govt.nz/ism-document](https://nzism.gcsb.govt.nz/ism-document), which is where you should be working from day to day rather than a downloaded PDF.

<h2 id="reading-a-section">How an individual NZISM section works</h2>

Most NZISM sections follow a broadly consistent shape once you know what to look for. An **objective** states the outcome being sought. **Context** explains where and when the material applies. **Rationale** explains why the requirement exists, genuinely worth reading, since it's often what tells you whether a control is relevant to your specific situation even before you check its formal applicability. The **control** itself states what's required or recommended, tagged with a **compliance** level, MUST, MUST NOT, SHOULD or SHOULD NOT, and often a **classification** or applicability indicator showing which kinds of systems or information it's relevant to. Each individual control also carries its own identifier, making it possible to reference a specific requirement precisely rather than an entire section.

Read the objective and rationale before jumping straight to the control text. A control read in isolation, without its rationale, is much easier to misapply than one read in context.

<h2 id="must-should">MUST, MUST NOT, SHOULD, SHOULD NOT</h2>

This is arguably the single most useful section in this whole article to actually internalise.

A control marked **MUST** or **MUST NOT** indicates that using, or not using, that control is essential to effectively manage the identified risk, unless the control is demonstrably not relevant to the system in question. These are **baseline controls**, sometimes described as systems hygiene controls, consolidated into a single set specifically for simplicity, effectiveness and efficiency across government.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

MUST does not mean "never deviate, full stop." If an agency chooses not to implement a MUST or MUST NOT control, it's required to follow the formal non-compliance process: the rationale for not using an essential control has to be clearly demonstrated to the Accreditation Authority as part of the certification process, before any exception is granted. Deviation is possible, but it's a formal, evidenced, approved decision, not something quietly skipped.

</div>

A control marked **SHOULD** or **SHOULD NOT** is recommended, good-practice guidance rather than baseline. The individual security risk of non-compliance is generally lower than for a MUST-level control, which gives agencies more flexibility in assessing whether to apply it. But that flexibility isn't the same thing as "ignore it if inconvenient": the risk created by not using a recommended control still needs to be considered and, where meaningful, recorded, rather than dismissed by default.

A compact way to hold this:

```
MUST
→ baseline expectation
→ deviation requires formal justification through the Accreditation Authority

SHOULD
→ recommended practice
→ non-use still requires the resulting risk to be considered
```

That's a learning simplification. Always check the exact current wording for the specific control you're actually working with rather than relying on this summary alone.

<h3 id="baseline-controls">Baseline controls, in more depth</h3>

Baseline controls exist because, without them, every agency would potentially spend significant effort independently re-deciding whether foundational security practices were necessary at all. Consolidating essential controls into one baseline set gives every agency a common minimum starting point. Context still matters on top of that baseline, applicability, classification and system architecture can all change which baseline controls are actually relevant to a given system.

<h3 id="recommended-practice">Good and recommended practice</h3>

Security can't be reduced to "minimum controls implemented, therefore secure," because threats, information sensitivity, business criticality and system architecture genuinely differ between systems. SHOULD-level controls exist to let agencies layer additional safeguards on top of the baseline where their specific risk picture actually warrants it, the same underlying logic behind CIS's Implementation Groups or ISO's risk-driven control selection covered earlier in this series.

<h2 id="classification">Classification and applicability</h2>

NZISM requirements can vary according to the classification and sensitivity of the information and system involved, and according to the specific context a control applies to. This article isn't the place to teach the full New Zealand Government Security Classification System, that deserves its own treatment, and classification terminology and markings should always be confirmed against current government sources rather than assumed from memory.

What matters for using the manual well: every control you find carries a classification or applicability field alongside its compliance level, and both need reading together with the surrounding context before deciding a control applies. Finding a control that matches your topic doesn't automatically mean it applies identically to every system you're looking at; the classification and context fields are there specifically to filter that.

<h2 id="risk-management">Risk management</h2>

This connects directly back to the risk-based thinking covered in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/): identification, analysis, evaluation, treatment, residual risk, decision. NZISM's own risk approach sits within New Zealand Government's broader risk-management practice, and a control can't really be assessed properly in isolation from the system, the information it handles, the relevant threats and vulnerabilities, the business consequence of failure, existing controls already in place, and what risk is left over once all of that is accounted for.

A concrete example. A remote administration interface can't support the preferred authentication requirement, the vendor's implementation simply doesn't offer it. A weak response: "NZISM says MUST, so the project is impossible." An equally weak response in the other direction: "the product can't do it, so we'll just ignore the requirement." A properly worked response looks more like this: identify the exact requirement and confirm it genuinely applies to this system and its classification; document precisely why direct compliance isn't achievable; assess the actual risk that gap creates; identify realistic alternative or compensating controls; assess the resulting residual risk once those are in place; follow the required exception process; and obtain approval from the appropriate authority before treating the gap as resolved. That sequence, not either extreme, is what assurance thinking under NZISM actually looks like.

<h2 id="compensating-controls">Compensating controls</h2>

Where a requirement addresses a particular risk and the technology genuinely can't meet it directly, a compensating control is an alternative measure that addresses the same underlying risk sufficiently. Depending on the specific gap, this might involve combinations of tighter network restriction, a privileged access gateway sitting in front of the system, MFA enforced elsewhere in the access path even if not on the system itself, enhanced monitoring, session recording, an approval workflow, network segmentation, or additional alerting.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

A compensating control is not "something security-ish we already happen to have lying around." Its adequacy depends entirely on whether it actually addresses the specific risk the original requirement was aimed at, assessed on its own merits, not assumed because it sounds reasonably relevant.

</div>

<h2 id="exceptions-and-risk-ownership">Exceptions and who owns the risk</h2>

<h3 id="exceptions">Non-compliance, exceptions and dispensations</h3>

An **exception**, in NZISM terms, is the formal acknowledgement that a requirement can't be met, together with a dispensation from that specific compliance requirement, granted by the Accreditation Authority. It's valid for the term of the Accreditation Certificate, or for a shorter period if the Accreditation Authority decides that's more appropriate. Worth knowing that NZISM distinguishes an exception from a **waiver** as a separate formal mechanism within the same governance chapter, the exact distinction between the two is worth checking directly in the current Chapter 4 material rather than assuming from the name alone.

A gap against a requirement should prompt a specific set of questions rather than either silent non-compliance or reflexive panic: why can't we comply? What risk does this actually create? Could other systems or agencies be affected? What alternative mitigation genuinely exists, and how effective is it? What residual risk remains once that mitigation is applied? Who has the authority to approve that remaining risk? And when should this decision be revisited?

<h3 id="who-accepts-risk">Who accepts residual risk?</h3>

This is a genuinely important assurance lesson, and it echoes exactly the same point made in the ISO 27001 article: the person assessing a control identifies and communicates the risk. They don't get to quietly decide "I think that's fine" on the organisation's behalf. System owners seeking a dispensation for non-compliance with a baseline control must have that dispensation granted by their **Accreditation Authority**, generally the Agency Head for that agency, across all its systems and related services, though the precise current responsibilities are worth confirming against the live Chapter 4 material for any specific situation. Some areas, high-assurance cryptography and highly classified information among them, carry their own specialist processes and additional authorities beyond the general model described here; this article doesn't attempt to teach those in depth.

The core lesson worth carrying forward regardless of specifics: whoever assesses the control should never be the one silently accepting business risk on the organisation's behalf.

<h2 id="certification-accreditation">Certification and accreditation</h2>

Worth being genuinely careful here, because these two words mean something specific and different in the NZISM context, and they're easy to confuse with ISO 27001 certification, which is an entirely separate thing.

**Certification**, in NZISM terms, is the assessment and assertion that a system and its related services meet the applicable requirements and controls, and that the associated security risk has been properly evaluated. **Accreditation** is the formal decision and authority that allows the system to actually operate, made by considering the certification evidence together with the resulting residual risk.

```
System
    ↓
Security requirements
    ↓
Assessment / evidence
    ↓
Certification
    ↓
Residual risk considered
    ↓
Accreditation
    ↓
Authority to operate
```

That's a simplified learning model of the relationship, not an official NZISM diagram, but it captures the important structural point: certification is the technical and risk assessment, accreditation is the governance decision that sits on top of it and actually authorises the system to run. Keeping those two steps genuinely separate, rather than treating certification as if it were itself the authority to operate, is exactly why the separation of duties here matters.

<h2 id="system-owner">System owner</h2>

A recurring problem in security work generally, not unique to NZISM: nobody's quite sure who actually owns a given system. Technical teams operate the technology. A SOC monitors it. Security advises on it. But someone specific needs to be accountable for its operational requirements, its risk position, its documentation, its security decisions, its lifecycle, and ultimately its accreditation.

This connects directly to ordinary SOC work. An alert reports `SERVER-122` compromised. Once technical containment is underway, the very next question worth asking is: who actually owns SERVER-122? Without a clear answer, it becomes genuinely difficult to understand the system's criticality, authorise any downtime needed for remediation, determine the real business impact, or make the risk decisions that follow. System ownership isn't a paperwork formality, it's the thing that makes every subsequent decision about a system actually answerable by someone with the standing to answer it.

<h2 id="security-documentation">Security documentation</h2>

A handful of NZISM documentation concepts worth knowing at a plain-English level, without reproducing any templates.

A **Security Risk Management Plan**, SRMP, answers: what are the risks, and how are they being managed? A **System Security Plan**, SSP, answers: how is this specific system actually secured? **Standard Operating Procedures**, SOPs, answer: how do people securely operate the system day to day? That's a simplification of what's a genuinely broader set of documentation requirements, but it's a useful frame to hold in mind.

Documentation matters here for the same reason it matters in the ISO 27001 article's SoA discussion: not because the paperwork itself creates security, but because a genuinely complex system needs explicit decisions, ownership, controls, responsibilities, risk acceptance and procedures written down somewhere, rather than living only in the heads of whoever happened to build it.

<h2 id="nzism-through-soc-eyes">NZISM through a SOC analyst's eyes</h2>

A lot of everyday SOC work already brushes up against NZISM themes without necessarily being labelled that way.

<div class="table-scroll">

| SOC question | NZISM thinking underneath it |
| --- | --- |
| What is this host? | System ownership, documentation, classification, applicable controls |
| Do we have evidence of what happened? | Logging, retention and auditability requirements |
| How did this account get access? | Authentication, access control, privileged access, account lifecycle |
| Is this CVE exploitable? | Vulnerability analysis, patching, change and risk management |
| How do we contain this? | Incident management, escalation, evidence, reporting, improvement |
| Where is the workload, and what telemetry do we have? | Cloud responsibility, data, access and assurance |

</div>

<h2 id="detailed-scenarios">Two detailed scenarios</h2>

<h3 id="scenario-logging">Missing logging on a government application</h3>

**System:** `CitizenServices-APP01`, a critical government application. **Discovery:** authentication logs exist locally, but retention is only seven days; logs aren't being forwarded to the central SIEM; privileged administrative events are only partially captured; and the application owner genuinely believed logging was already fully enabled.

**Observation:** logging and monitoring coverage is incomplete. **Requirement:** the relevant NZISM logging and audit material sits within Chapter 16's event logging and auditing section (16.6 in the current structure); the exact current control identifier for this specific system's context should be looked up directly rather than assumed. **Applicability:** confirm which specific logging requirements apply given this system's classification and context. **Evidence:** current logging configuration, the SIEM's source inventory, a sample of actual events reaching it, retention settings, and the system's security documentation. **Assessment:** does what's actually implemented satisfy the applicable requirement, or not? **Finding:** local retention is well short of what's needed to reconstruct an incident with any confidence, central visibility doesn't exist, and privileged activity specifically isn't being captured. **Risk:** a compromise on this system may not be detected in a useful timeframe, or reconstructed adequately after the fact, precisely the SOC scoping problem covered in [One Alert Is Not the Incident](/posts/how-to-scope-a-security-incident/). **Treatment:** enable the required audit events, centralise logging to the SIEM, set retention appropriately, validate that ingestion is actually working rather than just configured, confirm detection coverage exists for what's now visible, update the system's security documentation, and put ongoing monitoring in place for the logging pipeline's own health. **Residual risk:** whatever remains once that treatment is applied, documented and accepted by the appropriate authority rather than assumed to be zero.

<h3 id="scenario-privileged-access">Shared privileged access from a supplier</h3>

A supplier's support engineers remotely administer a government-hosted application using a shared privileged account, with its password stored in a team vault. Remote access is restricted to a VPN. There's no individual attribution for actions taken under that shared account, session logging is only partial, and the supplier describes the arrangement as "industry standard."

The right response isn't accepting that framing at face value, it's working through the same questions this article has been building toward. Which requirements actually apply here, given this system's classification and context? Is individual accountability a genuine requirement for privileged access of this kind, and what does the applicable Chapter 16 material say about it specifically? What authentication controls does it call for? What logging requirements apply to privileged sessions? Are there specific remote-access or supplier-related requirements that also bear on this arrangement? What evidence would actually demonstrate whatever's claimed to be in place? And what risk genuinely remains once all of that's been checked, not assumed?

This article deliberately doesn't supply the specific control identifiers for this scenario. That's the point: the useful skill is knowing how to go and find the current, applicable requirement yourself, not recalling a memorised answer that might already be out of date by the time you need it.

<h2 id="supplier-assurance">Supplier assurance</h2>

Continuing the same fictional supplier used in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/): **MedConnect** runs a cloud patient portal, roughly 40,000 patients, sensitive health information, hosted in AWS Sydney, with tier-2 support outsourced overseas, privileged remote access into production, and subcontractors involved somewhere in the delivery chain.

Don't jump to "NZISM definitely applies to this supplier" without establishing context first. The right sequence of questions: is the procuring organisation itself subject to NZISM? Exactly which information and system is actually involved? Which specific requirements flow through into the supplier's contract, as opposed to sitting only with the procuring agency? Which applicable controls genuinely relate to this service? What responsibilities stay with the agency regardless of what's outsourced? What responsibilities sit with the supplier? What evidence would actually demonstrate each of those? And which risks simply can't be outsourced, no matter what the contract says?

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

Outsourcing a service is not the same thing as outsourcing accountability for the risk that service creates. The agency can delegate delivery. It generally can't delegate away responsibility for the outcome.

</div>

<h2 id="nzism-by-topic">Cloud, incidents, and vulnerabilities</h2>

<h3 id="cloud-services">Cloud services</h3>

The current NZISM includes specific public cloud security material, sitting around Chapter 23. Cloud doesn't remove the need to understand the information involved, the risk, where responsibility actually sits, access paths, physical and logical location, service dependencies, the technical controls in play, and how assurance over all of that is actually obtained. A useful, deliberately informal way to hold the shape of it:

```
Cloud provider responsibility + agency responsibility + shared responsibility = actual security posture
```

Not an official NZISM formula, just a reminder that "it's in the cloud" answers almost none of the actual assurance questions on its own.

<h3 id="incident-response-nzism">Incident response</h3>

Chapter 7 covers security incident detection and management, and was itself part of the v3.9 update, with clearer reporting expectations introduced for GCISO-mandated agencies. A SOC's usual sequence, detect, validate, scope, contain, recover, still applies underneath all of this. NZISM adds a further layer of questions on top: what formal incident obligations actually apply here? Who needs to be notified, and by when? Is classified or otherwise sensitive information involved? Are specific reporting or escalation requirements triggered by this particular incident? Is evidence being preserved appropriately for whatever comes next? Does the system's security documentation need updating as a result? Does the underlying risk assessment need revisiting? Not every minor alert triggers government-level escalation, proportionality still applies, but knowing where that threshold actually sits for your own agency and system is worth understanding well before an incident forces the question.

<h3 id="vulnerability-management-nzism">Vulnerability management</h3>

Take a critical CVE on an internet-facing application. The technical view is familiar to any SOC: CVSS 9.8, internet-facing, exploit publicly available, patch it now. The NZISM assurance view sits alongside that and asks a related but distinct set of questions: which specific requirement actually applies here? What's this system's classification? How business-critical is it? What's its actual exposure? What treatment or patching timeline does the applicable requirement call for? Are there compensating measures available in the meantime? Is any delay to remediation genuinely approved, or just happening? Is the resulting residual risk documented anywhere? And once remediation does happen, what evidence actually demonstrates it occurred? That's the real difference between technical severity and an actual risk decision, and it's a difference worth holding onto well beyond NZISM specifically.

<h2 id="navigating-the-manual">Navigating the manual</h2>

<h3 id="how-to-search">How to search the NZISM</h3>

The live site at [nzism.gcsb.govt.nz](https://nzism.gcsb.govt.nz/) supports searching and filtering, and using it well is arguably more valuable than trying to memorise any summary of the manual, this article included. A practical approach for an unfamiliar topic: search a plain-English term, logging, privileged access, vulnerability, cloud, incident, remote access, multi-factor authentication, supplier; open the section that comes back; read the objective and context first, before the control text itself; identify the specific control and its compliance level; check its classification and applicability against your own system; read the rationale, since it's often what actually tells you whether the control is relevant to your situation; check any related or cross-referenced sections; and only then decide whether, and how, it applies. Use the PDF export where it's genuinely convenient for offline reading, but treat the live searchable document as the authoritative, current source, since individual chapters update independently of any full-document PDF release.

<h3 id="dont-start-with-numbers">Don't start with control numbers</h3>

Beginners often try to memorise identifiers like `16.x.x.C.01` early on. That's low-value at the start, and honestly not much more valuable later either, beyond a handful of controls you end up genuinely using every week. A far more useful order: understand what the NZISM actually is, understand MUST versus SHOULD, understand baseline versus recommended controls, understand classification and applicability, understand the governance and risk model sitting around all of it, learn to search the manual confidently, apply that to real scenarios, and only then let specific control numbers become familiar naturally, as reference points you return to, not facts you tried to memorise up front.

<h2 id="claim-evidence">Claim to evidence</h2>

Carrying the same assurance chain forward from the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/): claim: "all administrative access uses MFA." Possible evidence: identity-provider configuration, conditional access rules, a privileged account inventory, remote-access configuration, an actual test authentication, any documented exceptions, and authentication logs showing the claim holding up over time, not just at one snapshot.

```
NZISM requirement → claim → evidence → validation → compliant or gap → risk
```

"We have MFA" isn't itself sufficient evidence of anything. Which accounts, which systems, which methods, and whether it's actually enforced consistently are the real questions underneath that claim.

<h3 id="policy-not-operation">Policy is not proof of operation</h3>

Agency policy states privileged access gets reviewed every three months. Evidence that this is actually happening looks different from the policy itself: an account inventory, completed review records, dates, the reviewers involved, any resulting changes or removals, and any documented exceptions. Policy tells you what's supposed to happen. Operational records are what tell you whether it actually did.

<h2 id="comparison">NZISM vs CIS, NIST and ISO</h2>

<div class="table-scroll">

| Resource | Main perspective | Typical value |
| --- | --- | --- |
| CIS Controls | Practical safeguards | Prioritisation and implementation |
| NIST CSF | Cybersecurity outcomes | Risk structure and communication |
| ISO 27001 | Management system | Governance, assurance, certification |
| NZISM | NZ Government information security requirements | Government assurance and control requirements |

</div>

These are educational simplifications, and the four overlap substantially rather than competing. An organisation doesn't have to pick exactly one.

<h3 id="nzism-vs-iso">NZISM vs ISO 27001</h3>

ISO 27001 is an international, risk-based management-system standard that can be externally certified. NZISM is a New Zealand Government manual containing detailed governance, assurance and control requirements and guidance, with its own separate certification and accreditation concepts, as covered above. They can, and often do, coexist. An ISO 27001 certificate doesn't automatically demonstrate compliance with every applicable NZISM requirement, and NZISM compliance isn't the same thing as ISO 27001 certification either. If a supplier holds ISO 27001 certification and an agency needs specific NZISM controls satisfied, the correct move is treating that certificate as relevant, useful assurance evidence, while still determining separately whether the actually applicable NZISM requirements are genuinely met.

<h3 id="nzism-vs-cis">NZISM vs CIS Controls</h3>

CIS is likely easier for a beginner to get a handle on quickly, since it's a comparatively compact, prioritised set of practices. NZISM is larger, government-specific, classification-aware, considerably heavier on governance and assurance process, and more prescriptive in a lot of technical areas. That said, most of the underlying technical subject matter, access, vulnerabilities, logging, networks, software, incident response, data, cryptography, will already feel familiar to anyone who's worked through the CIS material earlier in this series.

<h3 id="nzism-vs-nist">NZISM vs NIST CSF</h3>

NIST CSF stays high-level and outcome-oriented by design. NZISM contains considerably more detailed, specific requirements underneath equivalent territory. Where CSF might describe an outcome around identity and access management in general terms, NZISM is likely to contain much more granular requirements about specific implementation considerations for authentication and access controls. There's no claim here of an official one-to-one mapping between the two; none has been asserted in this article, and none should be assumed without checking.

<h2 id="private-sector">NZISM and the private sector</h2>

Even where a private company isn't formally required to use the NZISM, it can still be a genuinely useful reference: a source of well-considered control ideas, a way to understand what NZ Government expectations actually look like in practice, useful preparation before pursuing government contract work, or a benchmark for systems that carry higher assurance needs than average. What's worth resisting is treating that as licence to bolt every NZISM requirement onto a small private business regardless of fit. Security controls should stay proportionate to actual context and risk, exactly the same principle this whole series keeps returning to, whichever framework happens to be under discussion.

<h2 id="soc-to-assurance">From SOC to assurance</h2>

The progression looks familiar by this point in the series. SOC: what happened? Senior SOC: how far did it spread? Security engineering: what should we change? NZISM assurance adds its own layer on top: what requirement actually applies here? Does it apply to this specific system? What evidence demonstrates it? Is there a gap? What risk does that gap create? What mitigation genuinely exists? What residual risk remains once it's applied? And who actually has the authority to accept that? That's the direct line from operational SOC knowledge to assurance work, and it's the same line this entire series has been drawing from CIS through to here.

<h2 id="full-worked-example">A full worked example</h2>

A government agency runs a SaaS case-management system: 600 staff users, 28 administrators, sensitive citizen information, Azure-hosted. The SaaS supplier's own support staff hold administrative access. Agency users authenticate via SSO through Entra ID with MFA enforced. Supplier support accounts sit on a separate identity provider entirely. Audit logs are retained for 30 days, with major logs exported nightly, but there's no real-time SIEM integration. An annual penetration test is performed, and the supplier holds ISO 27001 certification.

The natural first question, "is this system NZISM compliant," is the wrong question to lead with, because it invites a single yes-or-no answer to something that isn't actually a single-value claim. A properly worked assessment runs through it in stages instead: understand the system and the information it actually holds; determine the relevant classification and context; identify which NZISM requirements are genuinely applicable; work out how responsibility is actually shared between agency and supplier; gather the real evidence, not just the supplier's summary of it; assess each relevant control individually against that evidence; identify the specific gaps that assessment surfaces; assess the risk each gap represents; determine appropriate treatment or compensating controls for each; and document the resulting residual risk, taking it to whoever holds the authority to accept it, rather than assuming the exercise is finished once the gaps are listed.

One ISO 27001 certificate, one annual penetration test, and MFA on the front door, taken together, still don't answer the whole assurance question on their own. Each is genuinely useful evidence. None of them, individually or combined, substitutes for actually working through the applicable NZISM requirements against this specific system.

<h2 id="exercises">Practical exercises</h2>

**Exercise 1, find the control.** Scenario: an administrator account is shared by three engineers. Use the NZISM's own search to find the currently applicable access-control requirements, the relevant authentication requirements, and whatever logging or accountability requirements bear on shared account use. Compare what you find against the reasoning in the privileged-access scenario above.

**Exercise 2, MUST vs SHOULD.** Pick one current MUST-level control and one current SHOULD-level control from an area you're already comfortable with, logging or access control are good starting points. Ask: how does the treatment of non-compliance actually differ between the two, in the manual's own terms, not just in general theory?

**Exercise 3, compensating control.** A legacy system can't support MFA directly. What would you actually do? Not "ignore the requirement," and not "immediately switch the system off" either. Work through it properly: confirm the applicable requirement, assess the real risk, investigate genuine technical alternatives, consider restricting network access, introducing a controlled administrative gateway, requiring individual authentication somewhere else in the access path, adding monitoring or session recording, restricting privilege further, documenting the exception, evaluating the resulting residual risk, and following the required approval process. None of those options automatically make the system compliant on their own; they're candidates to evaluate against the actual risk, not a checklist to tick.

**Exercise 4, evidence.** Claim: "all servers are patched monthly." What evidence would actually validate that? Consider vulnerability scanner output, the endpoint management platform's own records, patch deployment logs, the current system inventory, any documented exceptions, change records, and direct sampling of individual hosts. Then ask: what happens to that claim if scanner coverage only reaches 80% of the estate? Coverage gaps in the evidence itself are just as important as gaps in the control.

<h2 id="self-test">Mini self-test</h2>

Try answering these before checking the worked answers.

1. What does NZISM stand for?
2. Who primarily uses the NZISM?
3. Does every New Zealand private company have to comply with it?
4. What is a baseline control?
5. What does MUST generally indicate?
6. Does SHOULD mean "ignore it if inconvenient"?
7. What is a compensating control?
8. What is residual risk?
9. What's the difference between certification and accreditation in the NZISM context?
10. Who should formally accept significant residual organisational risk?
11. What is an SRMP?
12. Why is memorising control IDs less important than learning to navigate the manual?

<details>
<summary>Worked answers</summary>

**1.** New Zealand Information Security Manual.

**2.** Primarily New Zealand Government departments, agencies and organisations, with Crown entities, local government and private-sector organisations also encouraged to use it.

**3.** No. It's not a general private-sector compliance obligation; private organisations most often encounter it through government contracts, procurement or hosting arrangements.

**4.** An essential, minimum-acceptable control, consolidated into a common baseline set every agency is expected to apply where relevant.

**5.** That the control, or its absence, is essential to managing the identified risk, unless it's demonstrably not relevant to the system, with formal justification and Accreditation Authority approval required for any deviation.

**6.** No. It means recommended practice with somewhat more flexibility than a MUST, but the risk created by not using it still needs to be genuinely considered, not dismissed by default.

**7.** An alternative measure that addresses the same underlying risk a requirement was aimed at, when the original control can't be directly implemented, assessed on whether it genuinely covers that risk, not assumed from convenience.

**8.** The risk that remains once controls, treatment and any compensating measures have been applied.

**9.** Certification is the assessment that a system meets applicable requirements and that its risk has been evaluated. Accreditation is the formal decision, made on top of that certification evidence and the resulting residual risk, that actually authorises the system to operate.

**10.** An authorised governance or accreditation role, generally the Accreditation Authority, not the analyst or assessor who identified the risk.

**11.** A Security Risk Management Plan, describing what an organisation's risks are and how they're being managed.

**12.** Because chapter and control numbering changes between versions, and the genuinely durable skill is knowing how to find and correctly interpret the current, applicable requirement, not recalling a number that may already be out of date.

</details>

<h2 id="how-to-learn">Learning NZISM without memorising it</h2>

A staged plan, roughly in order. **Stage 1:** learn what the NZISM is, who its audience is, and how it relates to the PSR. **Stage 2:** learn MUST, MUST NOT, SHOULD, SHOULD NOT, and the baseline-versus-recommended distinction underneath them. **Stage 3:** learn risk, exceptions, compensating controls, residual risk and the Accreditation Authority's role. **Stage 4:** understand system ownership, the relevant security roles, and the certification-versus-accreditation distinction. **Stage 5:** understand the core documentation concepts, SRMP, SSP, SOP, at least at a plain-English level. **Stage 6:** learn to search the live online manual confidently. **Stage 7:** pick operational areas you already know well, logging, identity, vulnerability management, incident response, cloud, and go read those specific sections properly. **Stage 8:** practise the full mapping, technical problem to applicable requirement to evidence to gap to risk to treatment, deliberately, on real or lab scenarios. **Stage 9:** only after all of that, explore genuinely specialised material, high classifications, high-assurance cryptography, specialist physical or communications requirements, as and when you actually need it.

Don't read the NZISM front to back trying to remember it. Learn how to use it instead.

<h3 id="one-hour-exercise">A one-hour NZISM study exercise</h3>

A concrete way to spend an hour on this: ten minutes reading the "About the NZISM" and "Understanding and using the NZISM" material; ten minutes deliberately studying MUST versus SHOULD until it's genuinely comfortable; ten minutes reading the governance and system-owner material; ten minutes reading the certification and accreditation overview; ten minutes searching one topic you already know well from operational experience, logging, vulnerabilities or access control are all good choices; and a final ten minutes taking one specific control you found in that search and working it all the way through: requirement, applicability, evidence, risk, treatment. That single hour gets you further than a much longer session spent trying to read the manual cover to cover.

<h2 id="common-mistakes">Common beginner mistakes</h2>

"I need to memorise it." No, you need to know how to navigate it. "I found one control, so that's the whole requirement." Probably not, related controls and surrounding context often matter too. "SHOULD means optional." Too simplistic, the resulting risk still needs considering. "MUST means exceptions are impossible." Also too simplistic, formal exceptions exist precisely for cases like this. "We use ISO 27001, therefore we're NZISM compliant." No, they're related but genuinely separate things. "Our vendor handles the system, therefore the vendor owns the risk." No, accountability for risk generally can't be outsourced along with delivery. "We have a policy, therefore we're compliant." Not necessarily, policy states intent, not operation. "We have the technology, therefore the control works." Not necessarily, for exactly the same reason. "The control doesn't fit our technology, so we can ignore it." No, that's precisely what the exception process exists for. "The SOC should accept the residual risk." No, that decision belongs with an authorised risk owner, not with whoever happened to assess it.

<h2 id="useful-resources">Useful resources</h2>

- [nzism.gcsb.govt.nz](https://nzism.gcsb.govt.nz/), the current, live, searchable manual, and the resource worth actually bookmarking
- [About the NZISM](https://nzism.gcsb.govt.nz/about-the-nzism), background on its purpose, maintenance and audience
- [NZISM version history and updates](https://www.ncsc.govt.nz/news/category/nzism-updates), NCSC's own release notes for each version, useful for understanding what's changed recently
- [Protective Security Requirements](https://www.protectivesecurity.govt.nz/), the broader NZ Government protective security framework NZISM sits within
- [National Cyber Security Centre](https://www.ncsc.govt.nz/), the part of GCSB that maintains the NZISM day to day

This is the fourth article in a short framework-learning series; [Same Problem, Four Lenses](/posts/comparing-cybersecurity-frameworks/) compares NZISM against CIS, NIST CSF and ISO 27001 side by side once you've read a few of them.

<h2 id="conclusion">The point</h2>

When a control comes back marked MUST, the right reaction isn't panic, and it isn't quietly ignoring it either. It's the same sequence this whole article has been building toward: does this actually apply here? What does implementing it properly look like? What evidence would demonstrate that? If there's a genuine gap, what risk does it create, and what's a proportionate way to treat it? And who actually has the standing to accept whatever's left over?

The NZISM is large because the problem it's addressing is large, and it earns that size through detail rather than through being deliberately difficult to approach. For an operational security practitioner, most of the technical territory inside it will already feel familiar. What NZISM adds on top is the governance and assurance layer, requirement, applicability, evidence, exception, residual risk, and an authorised decision at the end of it, and that layer is exactly what turns "we investigated the alert" into "we understand, and can demonstrate, why our systems are actually secured the way they are."
