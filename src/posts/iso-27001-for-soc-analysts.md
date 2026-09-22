---
title: "Check the Scope First: ISO 27001 for SOC Analysts"
date: 2026-09-24
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "iso-27001"
  - "security-frameworks"
  - "governance"
  - "supplier-assurance"
  - "field-guide"
seoTitle: "ISO 27001 for SOC Analysts | Jason Hill"
description: "A practical guide to ISO/IEC 27001 for SOC analysts moving toward assurance: what an ISMS actually is, why certification scope matters more than the certificate itself, and how to turn a supplier's claims into evidence-based findings."
coverImage: "iso27001-cover.svg"
coverImageAlt: "Terminal-style illustration of six nodes, Context, Risk, Controls, Evidence, Review and Improve, arranged in a ring with connecting arrows forming a continuous loop."
---

A supplier tells you: "We're ISO 27001 certified." It sounds reassuring, and it's meant to. But what does it actually mean?

Does it mean every system they run is secure? Every employee follows policy? Every control is fully implemented? Every vulnerability gets fixed on schedule? Every supplier of theirs has been assessed? Every incident will be detected? Does it even mean the specific product you're about to buy is inside the certification at all?

No, not automatically, to any of those. But that doesn't make the certification meaningless either. The useful question isn't "are they certified, yes or no." It's: what does ISO 27001 actually demonstrate, and how much assurance should I take from this particular certificate, for this particular thing I'm relying on it for?

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

An ISO 27001 certificate is evidence about a management system, assessed within a defined scope. It's not a blanket guarantee about every technical outcome, everywhere the organisation operates.

</div>

This is genuinely useful territory for a SOC analyst to understand well, particularly one moving toward assurance, supplier risk, architecture or governance, because it teaches you to think beyond the individual alert and toward the system of ownership, evidence and review that's supposed to sit around it.

<div class="callout callout--tip">

<p class="callout-label">Where this fits</p>

**CIS:** what practical safeguards should we consider? **NIST CSF:** what cybersecurity outcomes are we trying to achieve? **ISO 27001:** how does the organisation systematically manage, and demonstrate, information security risk? These are simplified learning prompts, not full descriptions of any framework, but they're a useful way to hold the three apart.

</div>

This is the third article in a short series. The [CIS Controls v8.1 guide](/posts/cis-controls-v8-1-for-soc-analysts/) covered practical, prioritised safeguards. [Six Functions, Not Six Steps](/posts/nist-csf-2-0-for-soc-analysts/) covered cybersecurity outcomes and risk communication. This one is about the management system that's supposed to sit around all of it, and the evidence trail that proves it's actually working.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-iso27001">What is ISO/IEC 27001?</a></li>
<li><a href="#what-is-isms">What is an ISMS?</a></li>
<li><a href="#risk-based">ISO 27001 is risk-based</a></li>
<li><a href="#certification-scope">Scope: check this first</a></li>
<li><a href="#reading-a-certificate">Reading an ISO 27001 certificate</a></li>
<li><a href="#what-certification-tells-you">What certification actually tells you</a></li>
<li><a href="#structure-of-iso27001">The structure of ISO 27001</a></li>
<li><a href="#annex-a">Annex A</a></li>
<li><a href="#iso27001-vs-27002">ISO 27001 vs ISO 27002</a></li>
<li><a href="#statement-of-applicability">The Statement of Applicability</a></li>
<li><a href="#assurance-method">From claim to treatment</a></li>
<li><a href="#worked-examples">Worked assurance examples</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#evidence-hierarchy">Evidence hierarchy, carefully</a></li>
<li><a href="#certification-audit">The certification audit</a></li>
<li><a href="#continual-improvement">Continual improvement</a></li>
<li><a href="#cis-nist-iso-comparison">CIS vs NIST CSF vs ISO 27001</a></li>
<li><a href="#what-soc-already-knows">What a SOC analyst already knows</a></li>
<li><a href="#what-changes">What changes in assurance</a></li>
<li><a href="#how-to-learn">Learning ISO 27001 without memorising it</a></li>
<li><a href="#exercises">Practical exercises</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#useful-resources">Useful resources</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-iso27001">What is ISO/IEC 27001?</h2>

ISO is the International Organization for Standardization, IEC is the International Electrotechnical Commission, and this particular standard is jointly published by both, hence ISO/IEC 27001. Beyond that, the naming detail matters less than what the standard actually does: it specifies requirements for an **Information Security Management System**, an ISMS.

That's a genuinely different thing from "a list of security controls," and it's worth internalising early, because it changes what the rest of this article means. Instead of only asking "do you have MFA," a management-system view asks why MFA is required in the first place, which systems it actually applies to, who owns that requirement, what risk it's addressing, how exceptions get handled, how the organisation knows it's actually working, what happens when it fails, how often it gets reviewed, and how it improves over time. That's a considerably richer question than a yes/no checkbox, and it's a genuinely better way into ISO 27001 than starting with clause numbers.

The current edition is **ISO/IEC 27001:2022**, which replaced the 2013 edition. A three-year transition period followed, and as of late 2025 all 2013-edition certifications have expired or been withdrawn, so any current certificate you encounter should be against the 2022 edition. A minor amendment, **ISO/IEC 27001:2022/Amd 1:2024**, was published in February 2024, adding a requirement to consider whether climate change is relevant to the organisation's context and noting that interested parties may have climate-related requirements. It doesn't mandate that climate change matters to every organisation, only that the question gets deliberately considered and documented. It's worth knowing this amendment exists so you're not confused by a reference to it, but it isn't a major shift in what the standard is about.

<h2 id="what-is-isms">What is an ISMS?</h2>

An Information Security Management System is the organised system through which an organisation manages information security risk: policies, roles, responsibilities, processes, risk assessments, controls, evidence, objectives, monitoring, internal audit, management oversight, and continual improvement, working together rather than existing as separate, disconnected artefacts.

Worth being explicit about one thing: an ISMS is not a piece of software. There are plenty of products marketed as "ISMS platforms" or GRC tools, and they can genuinely help manage the paperwork and workflow. But the management system itself is the combination of governance, process, people, documentation, risk management and controls, not the tool that happens to track it. An organisation can run a perfectly good ISMS on well-organised documents and disciplined process, and a poor one on an expensive platform nobody actually uses properly.

<h2 id="risk-based">ISO 27001 is risk-based</h2>

ISO 27001 doesn't say "implement every possible security control." It says, in effect: understand the organisation, understand its information security risks, assess those risks, decide how each should be treated, select controls that are actually justified by that decision, and then review whether they work.

Two terms worth having precise: **inherent risk** is the risk that exists before accounting for relevant controls. **Residual risk** is what's left once controls and treatment have been applied. These are standard risk-management concepts used across the industry rather than terms ISO mandates identically in every organisation's vocabulary, but the underlying idea, risk before controls versus risk after controls, is genuinely central to how ISO 27001 thinks.

Take a concrete example: an administrator account could be compromised and used to reach sensitive systems. Possible controls include MFA, restricting privileged access, keeping admin accounts separate from everyday accounts, conditional access, logging, alerting, a dedicated privileged access management tool, and periodic access review. Apply a sensible combination of those, and residual risk doesn't disappear, it just gets smaller. Someone has to decide whether what's left is acceptable, and that decision belongs with an authorised risk or business owner, not with whoever happened to run the assessment. An analyst flagging a risk is not the same role as an organisation accepting it.

<h3 id="risk-treatment">Risk treatment</h3>

The industry commonly talks about four risk-treatment responses, avoid, reduce, transfer, accept, and ISO's own risk-management vocabulary (via ISO 27005, the companion risk-management guidance standard) uses closely related terms: risk avoidance, risk modification, risk sharing, and risk retention. They map onto each other cleanly enough that it's worth knowing both sets of words rather than treating them as competing systems.

**Avoid:** don't do the risky thing at all. Don't deploy the service in a way that creates the exposure in the first place.

**Reduce / modify:** add controls that lower likelihood or impact, MFA, segmentation, monitoring, and so on.

**Transfer / share:** shift some of the impact elsewhere, insurance, or contractual allocation with a supplier or partner. Worth being precise here: this doesn't make the underlying cyber risk disappear, it changes who bears part of the consequence, which is a genuinely different thing.

**Accept / retain:** an authorised risk owner knowingly accepts what's left. This is deliberately not something an analyst casually decides while closing a finding; it's a decision that needs to sit with someone who actually has the authority to own it.

<h2 id="certification-scope">Scope: check this first</h2>

If there's one habit this article should leave you with, it's this: certification scope is probably the single most important thing to check on any ISO 27001 certificate, and it's the thing most commonly skipped.

Certification can cover an entire organisation, or a specific business unit, or particular locations, or a defined service, or a specific information-processing environment. "We are ISO 27001 certified" doesn't, on its own, tell you which of those applies.

A worked example. **MedConnect** provides a cloud patient portal, hosting sensitive health information. Their environment includes an AWS deployment in Sydney, a development team based in New Zealand, tier-2 support outsourced overseas, and privileged remote access into production. They hand you an ISO 27001 certificate.

Don't stop at "ISO certified." Ask: what does the certification scope statement actually say? Does it include the patient-portal service specifically, or just the corporate head office? Does it cover the AWS environment, or only on-premises infrastructure? Does it include the development team, or the outsourced support function? Which locations are actually in scope? How are subcontractors and outsourced functions handled within that scope? And is the certificate even still current? That's exactly the kind of reasoning this article is trying to build.

<h2 id="reading-a-certificate">Reading an ISO 27001 certificate</h2>

A practical checklist worth having ready. Certificates vary in exact format between certification bodies, so treat this as what to look for rather than a fixed template every certificate will match field for field: the certified organisation or legal entity, a certificate number, the standard and edition (confirm it says 2022, not 2013), the scope statement in full, the certification body that issued it, the issue date, the expiry or validity date, the locations or sites covered, any accreditation details shown, and whether the certificate can actually be independently verified with the issuing certification body.

Two roles worth telling apart, since they get confused constantly:

```
Organisation
     │
     ▼
Certification body audits the organisation and issues the certificate
     │
     ▼
Accreditation body assesses whether that certification body is competent to do so
```

A **certification body** is the independent third party that actually audits an organisation and issues the ISO 27001 certificate. An **accreditation body**, a national body, UKAS in the UK, JAS-ANZ across Australia and New Zealand, ANAB in the US, and others, assesses whether a given certification body is competent to perform that role in the first place. The International Accreditation Forum coordinates mutual recognition between national accreditation bodies, so a certificate from an appropriately accredited certification body should carry recognised weight internationally. A certificate from an unaccredited body isn't automatically worthless, but it's worth understanding that distinction rather than assuming all certificates carry identical weight.

<h2 id="what-certification-tells-you">What certification actually tells you</h2>

Certification is evidence that an independent process has assessed the organisation's ISMS against ISO/IEC 27001's requirements, within a defined scope. That's genuinely useful: it means an external assessor has looked at risk-management process, management involvement, formalised controls and processes, internal audit activity, and continual improvement, and found them adequate at the time of assessment.

It does not mean no vulnerabilities exist anywhere in the organisation. It doesn't mean no breach will ever occur. It doesn't mean every conceivable control is implemented everywhere. It doesn't mean everything you're relying on is actually inside the certified scope. It doesn't mean every technical control is flawless, that a specific product is inherently secure, or that every supplier risk downstream has been eliminated.

None of that makes certification weak or pointless, worth being genuinely balanced here rather than swinging to cynicism. It means the certificate answers a specific, narrower question than people often assume it does, and certification does not remove the need for supplier due diligence, context-specific assessment, contract review, understanding data flows and access paths, checking incident and regulatory requirements, and ongoing monitoring over time. How much of that extra work is warranted should scale with risk: a low-risk newsletter SaaS tool doesn't need the same assurance depth as a critical clinical system with privileged integration into your environment, even if both happen to hold the same certificate.

<h2 id="structure-of-iso27001">The structure of ISO 27001</h2>

The standard's requirements sit in clauses 4 through 10 (clauses 1 through 3 are introductory, scope of the document itself, normative references, and terms, and don't need much attention here). A plain-English way to hold the shape of it, explanatory paraphrases rather than ISO's own wording:

<div class="table-scroll">

| Clause | Think of it as |
| --- | --- |
| 4. Context | What organisation and system are we actually protecting, and what matters? |
| 5. Leadership | Who owns and actively supports information security? |
| 6. Planning | What are the risks, and what are we going to do about them? |
| 7. Support | Do we have the resources, competence, awareness and documentation to make this real? |
| 8. Operation | Are we actually doing what we planned, day to day? |
| 9. Performance evaluation | How do we know whether the ISMS is actually working? |
| 10. Improvement | How do we correct problems and get better over time? |

</div>

<h3 id="clause-4">Clause 4: Context</h3>

Covers organisational context, interested parties and their relevant requirements, and the scope of the ISMS itself. Practically: what services actually matter? What information needs protecting? What legal or regulatory obligations apply? Which customers or stakeholders have their own security requirements? Which parts of the organisation actually sit inside the ISMS? This is exactly the clause that produces the scope statement discussed above, and it's why scope needs so much attention when reading a supplier's certificate.

<h3 id="clause-5">Clause 5: Leadership</h3>

Covers policy, roles, responsibilities and accountability, and genuine management commitment rather than a delegated afterthought. Worth stating plainly from a SOC perspective: a SOC can identify serious risk. It cannot, by itself, set organisational risk appetite, allocate budget, decide business priorities, formally accept risk on the organisation's behalf, or set strategic direction. That's precisely why leadership involvement is a formal requirement rather than a nice-to-have.

<h3 id="clause-6">Clause 6: Planning</h3>

This is where risk assessment, risk treatment and information-security objectives live, connecting directly to the risk-based thinking covered above: risk identified, control or treatment selected, residual risk assessed, and objectives set against that picture. The Statement of Applicability, covered in its own section below, gets built from the decisions made here.

<h3 id="clause-7">Clause 7: Support</h3>

Covers resources, competence, awareness, communication, and documented information. In SOC-adjacent terms: competence asks whether analysts are actually trained to do their roles properly. Awareness asks whether staff generally understand things like phishing recognition and reporting expectations. Documented information asks whether processes, like incident handling, are actually maintained rather than written once and forgotten.

<h3 id="clause-8">Clause 8: Operation</h3>

This is where the plans from Clause 6 actually have to run: operational planning and control, and the risk assessment and treatment process being genuinely carried out, not just designed. The practical message is blunt: designing an ISMS on paper is necessary but nowhere near sufficient. The organisation has to actually operate it.

<h3 id="clause-9">Clause 9: Performance evaluation</h3>

Covers monitoring, measurement, analysis and evaluation, internal audit, and management review.

An internal audit is not "run a vulnerability scanner." It's an assessment of whether the ISMS itself conforms to requirements and is being effectively implemented and maintained, and it's typically performed by people independent of the area being audited. Management review is senior management periodically checking whether the management system remains suitable, adequate and effective, based on relevant inputs like audit results, risk status, and incident trends. Security metrics that might feed into this could include things like incident trends, patch and remediation status, logging coverage, access review completion, control failures, and progress against risk treatment, though ISO itself doesn't mandate that exact metric set; it mandates that meaningful evaluation actually happens.

<h3 id="clause-10">Clause 10: Improvement</h3>

Covers nonconformity, corrective action, and continual improvement, and it's one of the clauses that connects most naturally to existing SOC instincts. Say a post-incident review finds three critical servers were missing from EDR coverage. The weak response is "install EDR on those three servers." The stronger, corrective-action response asks why they were missing in the first place: did provisioning fail to trigger agent deployment? Was the asset inventory incomplete, so nobody knew they existed? Was ownership genuinely unclear? Did a deployment exclusion get applied and never revisited? Did monitoring itself fail to flag the coverage gap? Fixing the immediate symptom matters, but corrective action, done properly, addresses the root cause so the same gap doesn't quietly reopen somewhere else next quarter.

<h2 id="annex-a">Annex A</h2>

Annex A in ISO/IEC 27001:2022 contains **93 controls**, organised into four themes: Organizational (37 controls), People (8 controls), Physical (14 controls), and Technological (34 controls). If you've encountered older material referencing 114 controls across 14 domains, that's the 2013-edition structure, now superseded; there's no need to dwell on the history beyond knowing why the numbers differ if you see both quoted somewhere.

The important thing to hold onto: an organisation is not required to implement all 93. Annex A functions as a reference set of controls to consider during risk treatment. Which ones actually apply, how they're implemented, and why any are excluded gets documented in the Statement of Applicability, covered next. Annex A is a checklist to select from and justify, not a checklist to complete in full.

<h3 id="annex-a-themes">The four Annex A themes</h3>

**Organizational controls** cover things like information security policies, defined roles, asset management, supplier relationships, incident management, and continuity-related security considerations.

**People controls** cover screening, terms of employment, awareness and training, disciplinary processes, remote working, and reporting security events.

**Physical controls** cover physical security perimeters, entry controls, secure areas, equipment security, clear desk and clear screen practices, and physical monitoring.

**Technological controls** cover endpoint devices, privileged access, authentication, malware protection, technical vulnerability management, secure configuration, logging and monitoring, network security, cryptography, and secure development practices, considerable common ground with both the [CIS Controls](/posts/cis-controls-v8-1-for-soc-analysts/) and NIST CSF's Protect and Detect Functions.

<h2 id="iso27001-vs-27002">ISO 27001 vs ISO 27002</h2>

Worth being genuinely precise here, because this confuses a lot of people early on. A simplified teaching distinction: **ISO/IEC 27001** answers "what requirements must the ISMS meet," and it's the certifiable standard, the one an organisation is actually audited and certified against. **ISO/IEC 27002** provides detailed guidance on information security controls, and it is not itself a certifiable standard, you can't be audited against 27002 directly.

The relationship: Annex A's controls in ISO 27001 align with the controls described in more depth in ISO/IEC 27002:2022, which expands on how each one might actually be implemented. It's not accurate to say "27002 is Annex A," they're related documents serving different purposes, requirements versus implementation guidance, and an organisation typically uses both together, 27001 for structure and certification, 27002 for the practical detail of how to actually build each control.

<h2 id="statement-of-applicability">The Statement of Applicability</h2>

The **Statement of Applicability**, almost always shortened to SoA, is one of the most genuinely important documents in the whole ISMS, and it's one of the first things an auditor looks at.

In plain terms, the SoA documents which security controls the organisation has determined are necessary and applicable to its ISMS, their current implementation status, and a justification for including or excluding each one relative to Annex A's reference set. It's the direct link between the risk assessment carried out under Clause 6 and the controls actually chosen to address that risk.

An illustrative example, not an extract from any real SoA, just showing how the reasoning connects:

<div class="table-scroll">

| Field | Example content |
| --- | --- |
| Control area | Privileged access |
| Applicable? | Yes |
| Why | Administrators can reach sensitive production systems |
| Implementation | MFA, separate administrative accounts, periodic access review, PAM for selected systems |
| Evidence | IAM configuration, access review records, PAM logs, authentication logs |

</div>

A real SoA typically documents the applicability decision and implementation status rather than the full evidence trail itself, the evidence column above is added purely to show how assurance reasoning continues past the SoA entry, not a claim about the SoA's own required contents. What makes the SoA genuinely valuable in assurance work is that it directly answers: what has this organisation determined is actually necessary, and why?

<h2 id="assurance-method">From claim to treatment</h2>

This is the practical core of moving from operational security into assurance thinking, and it's worth working through as one connected method rather than several separate ideas.

<h3 id="control-not-product">A control is not the same thing as a product</h3>

"We have CrowdStrike" is not the same claim as "we have effective endpoint security." "We use Microsoft Sentinel" is not the same claim as "our logging and monitoring control is effective." "We use MFA" is not the same claim as "authentication risk is adequately controlled." "We have backups" is not the same claim as "we can recover."

```
Technology
    │  supports
    ▼
Control
    │  addresses
    ▼
Risk / requirement
```

A product supports a control. It doesn't automatically constitute one. The gap between owning a tool and having an effective control is exactly where a lot of assurance work actually lives.

<h3 id="claim-vs-evidence">Claim vs evidence</h3>

A claim states what's supposed to happen. Evidence demonstrates whether it actually does.

Claim: "we review privileged access every quarter." Possible evidence: the access review procedure itself, completed review records, timestamps, who performed each review, any exceptions identified, remediation records, and a sample of current IAM state to cross-check against.

Claim: "critical vulnerabilities are remediated within 14 days." Possible evidence: the relevant policy or standard, vulnerability scanner results, ticketing records, remediation timestamps, approved exceptions, and trend reporting over time.

Claim: "logs are monitored by the SOC." Possible evidence: a log-source inventory, ingestion configuration, actual SIEM events, detection rule content, alert history, incident records, and retention settings.

Evidence quality genuinely varies. A single screenshot demonstrates configuration at one moment in time. A sequence of records over months demonstrates a process that's actually operating consistently, which is a considerably stronger claim.

<h3 id="design-implementation-effectiveness">Design, implementation, and operating effectiveness</h3>

Three genuinely distinct questions, borrowed from general assurance practice rather than formal ISO-defined stages, but extremely useful for structuring an assessment. **Design:** would this control, implemented as intended, reasonably address the risk it's aimed at? **Implementation:** has the control actually been put in place? **Operating effectiveness:** is it consistently working in practice, over time, not just at the moment someone checked?

Take MFA. Design: policy requires MFA for all privileged interactive access. Implementation: MFA is configured on administrator accounts. Operating effectiveness: evidence shows privileged accounts consistently authenticate with MFA in practice, and any exceptions are genuinely controlled rather than silently accumulating.

Or logging. Design: critical systems should send security events to the SIEM. Implementation: logging connectors have actually been built for those systems. Operating effectiveness: logs are reliably arriving, and alerts are genuinely being generated and investigated when something interesting happens, not just theoretically capable of it.

<h3 id="raw-evidence-conclusion">Raw evidence to a validated conclusion</h3>

This is a discipline SOC analysts already practise constantly, even without the assurance vocabulary attached to it. An EDR alert suggests suspicious PowerShell. Raw evidence includes the process tree, the PowerShell command line itself, proxy logs, DNS logs, identity logs, and the user context involved. The analyst validates: was the command genuinely malicious, was a payload actually downloaded, which user account was involved, did a second endpoint get contacted, and is there any evidence of further spread after containment.

```
Requirement
    ↓
Evidence
    ↓
Assessment
    ↓
Finding
    ↓
Risk
    ↓
Treatment
```

That's precisely the same chain assurance work runs, just starting from a stated requirement instead of a fired alert. Moving into assurance doesn't mean learning a new discipline from nothing, it means applying evidence-based reasoning you already have to a different starting question.

<h2 id="worked-examples">Worked assurance examples</h2>

<h3 id="contractor-example">Former contractor accounts</h3>

Observation: five former contractors still have active accounts. The weak reaction is jumping straight to "access control failed." The better first move is validating the facts: were these accounts actually supposed to be disabled on contract end? When exactly did each contract finish? Are the accounts still genuinely usable? What can they actually reach? Is there a documented, approved exception for any of them? Has any authentication actually occurred on them since the contract ended?

Only once that's established does it turn into a proper finding. Requirement: access should be removed when it's no longer required. Evidence: HR or contractor records cross-referenced against current IAM state and authentication logs. Finding: the termination and offboarding process isn't consistently removing access on schedule. Risk: former personnel could retain unauthorised access to systems or data. Treatment: improve the joiner-mover-leaver process and its integration with HR data, automate disablement where realistically possible, review the currently existing accounts, and monitor for future exceptions rather than assuming the fix is permanent.

<h3 id="medconnect-scenario">Supplier assurance scenario: MedConnect</h3>

A larger, more realistic worked example. MedConnect supplies a cloud patient portal serving roughly 40,000 patients, integrated with internal systems via API, handling sensitive health information, hosted in AWS Sydney, holding an ISO 27001 certificate, with tier-2 support outsourced overseas, privileged remote access into production, and subcontractors involved somewhere in the delivery chain.

Certification isn't the end of the assessment, it's the starting point. Start with the certificate itself: which standard and edition, is it still valid, which certification body issued it, what's the exact scope statement, which services and sites does it cover, and critically, does the service you're actually procuring, the patient portal specifically, sit inside that scope or outside it?

From there, depth should scale with risk. On identity and privileged access: how is privileged support access actually controlled? Is MFA enforced for it? Is access approved and logged? Are access reviews genuinely performed? Evidence worth asking for includes the relevant policy, PAM or IAM configuration, access-review records, and authentication logs. On incident response: how will they actually notify you if something happens? What escalation process exists, and has it ever been tested rather than just written down? Evidence: the IR plan itself, any exercise results, sanitised post-incident material where appropriate, and the relevant contractual notification terms. On subcontractors: who else can access or process this data, and how is that risk actually managed on their end? On backup and recovery: what are the stated recovery objectives, and are restores genuinely tested? On logging: what security telemetry actually exists, how long is it retained, and could a customer-relevant incident actually be reconstructed from it if needed?

Worth being explicit: this shouldn't be applied identically to every supplier. A low-risk newsletter tool doesn't warrant this depth of questioning. A service holding sensitive health data with privileged integration into your environment does. Assurance effort should be proportionate to what's actually at stake, not a fixed checklist run against everyone regardless of risk.

<h3 id="fourth-parties">Fourth parties</h3>

MedConnect is a third party to you, the supplier you have a direct relationship with. MedConnect's own overseas support provider, the one you have no direct contract with, is commonly called a **fourth party**. They may never sign anything with you directly, but they can still access data, touch systems, hold credentials, or affect service availability, which means the dependency genuinely matters even without a direct relationship. This term isn't universally standardised across every industry, but it's widely enough used in supplier risk work to be worth knowing.

<h2 id="evidence-hierarchy">Evidence hierarchy, carefully</h2>

It's tempting to rank evidence types from weak to strong: verbal assurance at the bottom, then policy or documentation, then configuration evidence, then records showing actual operation over time, then independent testing or assurance near the top. That's a reasonable rough intuition, but it shouldn't be treated as a rigid universal ranking, because evidence strength genuinely depends on what question you're actually asking.

A policy is exactly the right evidence for "what's the documented requirement here?" A configuration snapshot is exactly the right evidence for "is this specific setting currently enabled?" Operational records answer "has this actually been happening over time?" An independent audit report answers a broader question about external assurance. Matching the evidence to the specific question matters more than assuming one evidence type is universally stronger than another.

<h3 id="policies-not-proof">Policies are not proof of operation</h3>

Worth stating plainly, because it's a genuinely foundational assurance lesson. A policy stating "leavers must be disabled within 24 hours" proves the organisation has a documented requirement. It does not, on its own, prove that every leaver actually gets disabled within 24 hours. To assess whether the control operates, you need something closer to the ground: a sample of actual terminations, IAM timestamps for when those accounts were actually disabled, records of any exceptions, and evidence of ongoing monitoring for this specific thing. A policy document is a claim about intent. Operational evidence is what tells you whether intent turned into reality.

<h2 id="certification-audit">The certification audit</h2>

Worth understanding roughly what certification involves, without going deeper than is actually useful.

**Stage 1** is largely a readiness review: the certification body examines ISMS documentation, scope, and context, and assesses whether the organisation looks ready for the more substantial Stage 2 assessment. **Stage 2** is a considerably deeper assessment of whether the ISMS is actually implemented and operating effectively, not just designed on paper. A successful Stage 1 and Stage 2 typically results in certification valid for three years, with **surveillance audits** conducted periodically during that cycle, commonly sampling a subset of the ISMS rather than re-examining everything, and a more comprehensive **recertification audit**, broadly similar in depth to the original Stage 2, at the end of the cycle.

Worth keeping this distinct from **internal audit**, which the organisation runs on itself under Clause 9, using people independent of the area being reviewed but employed by, or contracted directly to, the organisation itself. Internal audit and external certification audit serve related but different purposes, and a mature ISMS relies on both.

<h3 id="nonconformities">Nonconformities</h3>

A nonconformity simply means a requirement hasn't been fulfilled. Certification bodies commonly grade findings as **major** or **minor**. A major nonconformity, a significant, systemic gap that puts confidence in the whole ISMS in doubt, means certification can't be issued or maintained while it remains open. A minor nonconformity, an isolated lapse against an otherwise functioning requirement, typically allows certification to proceed provided the organisation submits an acceptable corrective action plan. Exact grading practice can vary somewhat between certification bodies, but that major-versus-minor distinction is broadly consistent across the industry.

<h2 id="continual-improvement">Continual improvement</h2>

Return to the management-system idea one more time, because it's really the whole point. Say a SOC keeps seeing repeated compromised accounts. The basic reaction is resetting credentials every time it happens. The improvement reaction asks why it keeps happening at all: is it phishing controls, MFA coverage, session protections, user awareness, privileged access design, a detection gap, legacy authentication that's never been fully retired, or incident lessons from last time that simply never got implemented?

This is where the whole series connects. CIS asks which practical safeguards might reduce the issue. NIST CSF asks which cybersecurity outcome is actually weak here. ISO 27001 asks how the organisation manages the risk, selects and evidences its controls, and continually improves the whole system around that weakness, not just this one instance of it.

<h2 id="cis-nist-iso-comparison">CIS vs NIST CSF vs ISO 27001</h2>

<div class="table-scroll">

| Framework | Think of it as | Particularly useful for |
| --- | --- | --- |
| CIS Controls | Practical, prioritised safeguards | Implementation and prioritisation |
| NIST CSF | Cybersecurity outcomes and risk communication | Structuring and communicating risk |
| ISO 27001 | A management system for information security | Governance, assurance and certification |

</div>

These are learning simplifications, not full descriptions of any of the three, and none of them are mutually exclusive; plenty of organisations run all three together, using each for what it's genuinely best at. [Search It, Don't Memorise It: NZISM for Security Practitioners](/posts/nzism-for-security-practitioners/) picks up a fourth, New Zealand Government-specific perspective on the same underlying problem.

<h2 id="what-soc-already-knows">What a SOC analyst already knows</h2>

Worth being genuinely encouraging here, without overstating it. Log analysis transfers directly into evaluating whether monitoring evidence actually demonstrates operation. Incident investigation transfers into validating facts before committing to a finding. Vulnerability triage transfers into assessing likelihood, context and underlying control weakness rather than just severity scores. Containment discussions transfer into working with stakeholders on risk treatment decisions. Post-incident review transfers directly into root cause thinking and corrective action. SIEM and EDR coverage assessment transfers into judging whether a monitoring control is genuinely implemented and effective, not just present. Building evidence timelines transfers into constructing a traceable assurance conclusion.

A SOC analyst moving into assurance is not starting from zero. The underlying discipline, evidence-based reasoning, is already there. What's genuinely new is the vocabulary and the wider risk context it gets applied within.

<h2 id="what-changes">What changes when moving into assurance</h2>

Equally worth being clear about what's actually new. SOC work tends to ask: is this malicious? What happened? What's affected? How do we contain it? Assurance work asks a different set of questions on top of that discipline: what requirement actually applies here? What risk is it addressing? How is the control designed? What evidence demonstrates it? Is it genuinely operating? What gap remains? What residual risk does that gap represent? Who owns that risk? And what treatment would actually be proportionate to it?

That shift, more than any specific new tool or technique, is what prepares someone for supplier assurance or broader GRC-adjacent work.

<h2 id="how-to-learn">Learning ISO 27001 without memorising it</h2>

A staged approach, in rough order.

**Stage 1.** Understand what an ISMS actually is before anything else. Don't start with control numbers.

**Stage 2.** Learn the management-system flow: context, risk, treatment, controls, evidence, review, improvement, and back around again.

**Stage 3.** Learn clauses 4 through 10 at a conceptual level, the way this article has laid them out. No need to memorise subclause identifiers yet.

**Stage 4.** Understand how Annex A, the Statement of Applicability, and ISO 27002 relate to each other.

**Stage 5.** Learn the four Annex A themes. Don't try to memorise all 93 controls immediately; that comes later, if it's ever genuinely needed.

**Stage 6.** Practise the claim-to-treatment chain deliberately: claim, evidence, assessment, finding, risk, treatment.

**Stage 7.** Review a fictional certificate the way this article's exercise below does: who's certified, which edition, what scope, which locations, when does it expire, which certification body, and does the scope actually cover what you care about.

**Stage 8.** Practise supplier scenarios like the MedConnect example above.

**Stage 9.** Only later, once the shape feels genuinely familiar, learn detailed Annex A control numbering where it's actually useful to you.

The core message: understand the system first. The identifiers can come later, and mostly only when you need to look something up.

<h2 id="exercises">Practical exercises</h2>

**Exercise 1, certificate review.** CloudCo NZ Limited holds a certificate for ISO/IEC 27001:2022, with a scope statement reading: "The provision and operation of CloudCo's corporate IT infrastructure from its Auckland headquarters." You're evaluating CloudCo's Healthcare Platform, hosted in Australia, for a potential purchase. Does this certificate give you assurance that the Healthcare Platform is within scope? It doesn't, not necessarily: the stated scope covers corporate IT infrastructure from an Auckland headquarters, which reads as a different thing entirely from an Australian-hosted platform service. That gap is exactly what needs clarifying with the supplier before relying on the certificate for this specific purchase.

**Exercise 2, control evidence.** A supplier claims "we have MFA." Before treating that as sufficient, work out what you'd actually want to ask: which accounts specifically, which systems, which MFA methods are in use, whether any exceptions exist, whether legacy protocols bypass it, whether it covers administrators and remote access as well as standard users, whether it's enforced for SaaS applications too, and what evidence would demonstrate it's actually enforced rather than just available. The exercise is turning a vague claim into something you could genuinely assess.

**Exercise 3, backup control.** A supplier says "we perform daily backups." What else would you want to know? Likely candidates: what's actually in scope for the backup, how long is it retained, is it protected and isolated from the production environment it backs up, what are the stated recovery time and recovery point objectives, are restores actually tested rather than just backups completing, who monitors success and failure, who has the ability to delete backups, and is there any evidence from an actual recovery. The central lesson: backup existence is not the same claim as recoverability.

**Exercise 4, former accounts.** Using the contractor scenario worked through above as a template, try building your own version from scratch: state the requirement, decide what evidence you'd gather, write the finding, describe the risk, and propose a proportionate treatment. Compare your version against the worked example earlier in this article.

<h2 id="self-test">Mini self-test</h2>

Try answering these before checking the worked answers.

1. What does ISMS stand for?
2. Is ISO 27001 simply a security-control catalogue?
3. What is certification scope?
4. Why does scope matter when assessing a supplier?
5. What is the Statement of Applicability?
6. How many Annex A controls are in ISO/IEC 27001:2022?
7. What are the four Annex A themes?
8. What's the difference between ISO 27001 and ISO 27002?
9. Does certification mean every Annex A control is implemented?
10. Does certification guarantee an organisation won't be breached?
11. What's the difference between policy evidence and operating evidence?
12. Who should normally accept significant residual business risk?

<details>
<summary>Worked answers</summary>

**1.** Information Security Management System.

**2.** No. It's a requirements standard for a management system, risk-based rather than a fixed control catalogue; Annex A provides a reference set of controls to select from and justify, not a list to implement in full.

**3.** The defined boundary of what was actually assessed for certification, which organisation, which locations, which services, which parts of the environment.

**4.** Because a certificate says nothing about anything outside its stated scope. A supplier can be genuinely certified and still have the specific service you're buying sit entirely outside what was assessed.

**5.** The document listing which Annex A controls the organisation has determined are applicable, their implementation status, and the justification for inclusions and exclusions, directly linked to the risk assessment.

**6.** 93.

**7.** Organizational, People, Physical, and Technological.

**8.** ISO 27001 sets the certifiable requirements for the ISMS itself; ISO 27002 provides detailed, non-certifiable guidance on how to actually implement the controls Annex A references.

**9.** No. Only the controls the organisation determined are applicable, per its own risk assessment and Statement of Applicability, need to be implemented, and exclusions must be justified.

**10.** No. It's evidence about a management system within a defined scope, not a guarantee about every technical outcome or a promise that no breach will ever occur.

**11.** Policy evidence proves a documented requirement exists. Operating evidence, records, timestamps, samples over time, proves whether that requirement is actually being met in practice.

**12.** An authorised risk or business owner with the actual authority to accept it, not the analyst who identified or assessed the risk.

</details>

<h2 id="useful-resources">Useful resources</h2>

- [ISO/IEC 27001](https://www.iso.org/standard/27001), ISO's official standard page
- [ISO/IEC 27002](https://www.iso.org/standard/75652.html), ISO's official page for the companion guidance standard
- [ISO/IEC 27001:2022/Amd 1:2024](https://www.iso.org/standard/88435.html), the climate-action amendment
- [ISO, management system standards](https://www.iso.org/management-system-standards.html), for background on how management-system standards like this one are structured generally
- [International Accreditation Forum](https://iaf.nu/), for background on accreditation and the multilateral recognition arrangement underpinning certificate validity across borders

ISO standards themselves are copyrighted; this article paraphrases and explains rather than reproducing clause text, Annex A control wording, or any of ISO's own tables, and the resources above are where to go for the authoritative source material itself.

This is the third article in a short framework-learning series; [Same Problem, Four Lenses](/posts/comparing-cybersecurity-frameworks/) compares ISO 27001 against CIS, NIST CSF and NZISM side by side once you've read a few of them.

<h2 id="conclusion">The point</h2>

When somebody says "we're ISO 27001 certified," the right response is neither "great, no further questions" nor "that means nothing." It's a third option: what's actually certified, what's the scope, which risks matter to what you're relying on it for, which controls are genuinely relevant, what evidence exists behind the claim, and what residual risk remains once you've asked all of that.

ISO 27001 is valuable precisely because it provides a structured system for asking, and managing, exactly those questions on an ongoing basis rather than as a one-off exercise. For an operational security analyst, the biggest shift this article has been building toward isn't learning a new set of facts, it's a shift in the question itself: from "what happened" toward "what should have prevented it, how do we actually know that control works, and how is the organisation managing the risk around it over time." That question doesn't require the standard memorised. It just requires knowing where to look, and what to ask, when someone hands you a certificate and expects it to answer everything on its own.
