---
title: "Not the Assessment Itself: How to Design a Supplier Security Questionnaire"
date: 2026-10-03
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "supplier-assurance"
  - "security-assurance"
  - "risk-management"
  - "governance"
  - "field-guide"
seoTitle: "How to Design a Supplier Security Questionnaire | Jason Hill"
description: "A practical guide to designing supplier security questionnaires that actually produce assurance: risk-based depth, outcome-based questions, evidence reuse, and why question count is not the same thing as assurance quality."
coverImage: "supplier-questionnaire-cover.svg"
coverImageAlt: "Terminal-style illustration of a question node branching into a short skip path and a longer path leading to several deeper follow-up question nodes."
---

Procurement sends a supplier a spreadsheet: 327 questions. The supplier spends several days completing it. Security receives it back. Most of the answers read: Yes. Yes. Yes. N/A. Yes. Compliant. See policy. Yes. ISO certified.

327 answers, and remarkably little assurance behind any of them.

Now the alternative: a 35-question, risk-based assessment that establishes the actual architecture, identifies where privileged access genuinely exists, understands the real data flows, names the dependencies that matter, focuses on the controls actually relevant to this specific supplier, reuses independent assurance already available, requests targeted evidence rather than a document dump, and triggers a follow-up conversation only where one's genuinely needed. The smaller assessment routinely produces meaningfully more assurance than the 327-question spreadsheet ever did. Question count and assurance quality are not the same thing, and treating them as though they were is how supplier assurance programmes end up drowning in paperwork nobody actually reads.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

The questionnaire supports the assessment. The questionnaire is not the assessment. Service context, inherent risk, relevant control objectives, targeted questions, supplier response, evidence, follow-up, assessment, finding or risk, that's the actual chain. Stopping at "answer received" skips most of it.

</div>

This continues directly from [Third-Party Cyber Risk and Supplier Assurance](/posts/supplier-security-assurance/), [Security Assurance for SOC Analysts](/posts/security-assurance-for-soc-analysts/), [How to Read a SOC 2 Report](/posts/how-to-read-a-soc-2-report/), and [How to Review a Penetration Test Report](/posts/how-to-review-a-penetration-test-report/), all forms of evidence a well-designed questionnaire should be built to reuse rather than duplicate.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-a-questionnaire">What a questionnaire is for</a></li>
<li><a href="#questionnaire-vs-assessment">Questionnaire vs assessment</a></li>
<li><a href="#why-generic-questionnaires-fail">Why generic questionnaires fail</a></li>
<li><a href="#start-with-inherent-risk">Start with inherent risk</a></li>
<li><a href="#tiered-model">A tiered questionnaire model</a></li>
<li><a href="#branching">Branching and conditional questions</a></li>
<li><a href="#question-design">Eight question design principles</a></li>
<li><a href="#question-types">Question types</a></li>
<li><a href="#evidence-requests">Evidence requests</a></li>
<li><a href="#reusing-assurance">Reusing existing assurance</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#core-structure">A core questionnaire structure</a></li>
<li><a href="#weak-answers">Weak answers and how to handle them</a></li>
<li><a href="#scoring">Scoring, without hiding risk</a></li>
<li><a href="#question-library">Question library over fixed form</a></li>
<li><a href="#standardised-questionnaires">Standardised questionnaires</a></li>
<li><a href="#follow-up">Follow-up and contradictions</a></li>
<li><a href="#medconnect">The MedConnect scenario</a></li>
<li><a href="#starter-model">A 30-question starter model</a></li>
<li><a href="#review-workflow">A reusable review workflow</a></li>
<li><a href="#maintenance">Maintaining the questionnaire</a></li>
<li><a href="#practical-exercises">Practical exercises</a></li>
<li><a href="#interview-questions">Interview questions</a></li>
<li><a href="#anti-patterns">Anti-patterns</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-a-questionnaire">What a questionnaire is for</h2>

A supplier security questionnaire is a structured way to collect information from a supplier about its controls, processes, architecture and risk-relevant practices. Used well, it standardises initial information gathering, surfaces control gaps, points toward where follow-up is actually needed, supports targeted evidence requests, documents what was said, and lets you compare risk across suppliers with some consistency.

It does not, on its own, prove controls exist, prove they operate, prove the supplier is secure, or prove any resulting risk is acceptable. Those are conclusions an assessment reaches. The questionnaire only ever supplies raw material toward them.

<h2 id="questionnaire-vs-assessment">Questionnaire vs assessment</h2>

A **questionnaire** collects information. An **assessment** interprets that information, and whatever evidence backs it, against actual requirements and actual risk.

```
QUESTION → ANSWER → EVIDENCE → VALIDATION → CONCLUSION → RISK
```

Most of the value sits past "answer." Stopping there, treating a completed spreadsheet as the finished product, is the single most common failure mode in supplier assurance, and it's the failure this whole article is built to correct.

<h2 id="why-generic-questionnaires-fail">Why generic questionnaires fail</h2>

The same questions sent to every supplier regardless of actual risk. Too many questions genuinely irrelevant to the service in front of you. Yes/no answers accepted with no context behind them. Supplier self-attestation quietly treated as if it were independent evidence. Requests for documents nobody on the receiving end ever actually reads. Questions duplicating assurance a SOC 2 report or ISO certificate already covers. Every finding treated with equal weight regardless of actual severity. No defined follow-up process when an answer genuinely warrants one. No connection back to inherent risk in the first place. No clear decision reached at the end of the exercise. Questions copied from an old framework years ago and never revisited since. And, quietly, suppliers learning to optimise their answers for what gets a form approved rather than describing what actually happens day to day.

Long questionnaires exist for understandable reasons: broad coverage, standardisation, an audit trail, regulatory or customer pressure, an inherited process nobody's owned enough to change, and a general fear of missing something important. But breadth trades directly against depth. An analyst spending two minutes on each of 300 answers learns considerably less than the same analyst spending thirty minutes on one genuinely material privileged-access path. Assurance attention should follow risk, not fill every cell in a spreadsheet equally.

<h2 id="start-with-inherent-risk">Start with inherent risk</h2>

Before selecting a single question, understand the supplier, the same inherent-risk discipline covered in the [supplier assurance article](/posts/supplier-security-assurance/): what data is involved, what access does the supplier actually hold, how critical is the service, how connected is it into your own environment, is any privileged or administrative access genuinely in play, which subcontractors matter, and what happens if the service simply isn't available. That picture determines how deep the assessment actually needs to go, before any question gets written.

<h2 id="tiered-model">A tiered questionnaire model</h2>

An illustrative model, not a universal standard, use your own organisation's actual methodology instead. **Tier 1, low risk**: basic data and access questions, a security contact, incident-notification expectations, a handful of minimal control checks, roughly ten to twenty questions. **Tier 2, moderate**: add identity, vulnerability management, logging, backups, secure development where genuinely relevant, and supplier dependencies, roughly thirty to sixty questions. **Tier 3, high or critical**: real depth on privileged access, architecture, IAM, detailed incident response, recovery, vulnerability management, the SDLC, cloud configuration, fourth parties, and supporting evidence throughout.

These counts are illustrative, not a target to hit. The actual principle: depth follows risk, not the other way around.

<h2 id="branching">Branching and conditional questions</h2>

Instead of asking every single supplier "do you use Kubernetes," ask "does the service use containerised infrastructure relevant to delivering our service," and branch deeper only on yes. Instead of running the full privileged-access section past every supplier, ask first whether the supplier has privileged access to your environment at all, no skips the section entirely, yes triggers it in full.

```
DOES SUPPLIER HAVE PRIVILEGED ACCESS?
            │
      ┌─────┴─────┐
      NO          YES
      │            │
    skip      MFA, PAM, approval,
              logging, review, leavers
```

This is the single most effective tool for cutting supplier fatigue without cutting actual assurance. It concentrates depth exactly where the risk actually sits.

<h2 id="question-design">Eight question design principles</h2>

**1. Ask about the outcome, not the aspiration.** "Do you comply with security best practices" is meaningless. "Describe how administrative access to production systems is authenticated and controlled" reveals identity, MFA, PAM, remote access, shared accounts, and approval, in one question, because it asks what actually happens rather than inviting a comforting adjective.

**2. Define the scope.** "Do you use MFA" is weak. "Is MFA required for all interactive privileged access to production systems supporting our service, and what exceptions exist" is considerably stronger, because it forces the supplier to state the boundary of their own claim.

**3. Ask about exceptions directly.** One of the single best assurance questions in the whole toolkit: what exceptions exist? Which accounts bypass MFA? Which systems don't support EDR? Which vulnerabilities exceed the remediation target? Which systems don't send logs centrally? Which critical systems aren't covered by backups? Exceptions routinely reveal more about real risk than the headline control ever does.

**4. Ask how.** "Do you perform access reviews" invites a flat yes. "Describe how privileged access is reviewed, including frequency, who performs it, how inappropriate access gets removed, and how exceptions are handled" produces an answer that can actually be assessed against a real standard.

**5. Ask when.** "Do you patch critical vulnerabilities" versus "what remediation targets apply to critical vulnerabilities, and how are overdue ones handled." "Do you revoke leavers" versus "how quickly is access removed after employment or contract termination." Time turns an abstract process claim into something checkable.

**6. Ask who.** "Who approves privileged production access," "who monitors security alerts," "who receives customer-impacting incident notifications," "who owns supplier-risk remediation." Ownership tends to reveal genuine maturity, or the lack of it, without needing exact job titles to do so.

**7. Ask for the last time it actually happened.** Genuinely one of the most powerful techniques available. Not "do you test backups" but "when was the last successful recovery test for this service, and what scope did it cover." Not "do you conduct access reviews" but "when was the last privileged-access review actually completed." Not "do you exercise incident response" but "when was the last relevant exercise, and what were the major improvement actions that came out of it." This turns an abstract process into an observable, dateable event.

**8. Ask what happens when it fails.** "What happens if a critical log source stops sending events?" "What happens when a vulnerability misses its remediation target?" "What happens if an employee fails an access review?" "What happens if a backup job fails?" Every control fails sometimes. A mature supplier can actually describe what happens next; an immature one often can't answer the question at all.

<h2 id="question-types">Question types</h2>

**Yes/no** questions earn a real place, specifically for triage and branching: "does the service store personal information," "does the supplier require privileged access to our environment," "is customer data hosted outside New Zealand," "are subcontractors used to deliver the service." These trigger deeper sections; they don't stand alone as evidence of anything complex. "Do you encrypt data" is a weak yes/no on its own, since "yes" tells you almost nothing without knowing at rest or in transit, where, which algorithms, who owns the keys, and whether backups are covered too, and you don't necessarily need to ask all of those explicitly, just enough that risk genuinely warrants.

**Multiple-choice** questions can standardise usefully where the underlying options are genuinely finite: how is privileged access granted, permanent named privilege, just-in-time, ticket-based elevation, shared account, or other, paired with a free-text field to explain. Structured data plus a short explanation tends to beat either format used alone.

**Free-text** questions matter where architecture or process genuinely needs describing, but keep them bounded. "Explain your entire cybersecurity programme" invites a marketing paragraph, not an assessable answer.

<h2 id="evidence-requests">Evidence requests</h2>

Don't attach "upload evidence" to every single question by default. Request it where the risk is genuinely material, where the answer actually needs independent validation, where no existing assurance source already covers it, or where the control itself is critical enough to warrant it. Privileged MFA claims warrant configuration evidence or a report. An access-review claim warrants the most recent completed review. A vulnerability SLA claim warrants metrics or a sample. A backup claim warrants restore-test evidence specifically, not a policy. An incident-response claim warrants exercise evidence.

The governing principle throughout: what's the minimum evidence actually needed to establish sufficient confidence here? Avoid collecting raw credentials, secrets, actual customer data, unnecessarily sensitive architecture detail, or a full penetration-test report where a credible summary genuinely suffices. Supplier assurance shouldn't create a new security exposure on the way to assessing an existing one, exactly the same principle covered in the [supplier assurance](/posts/supplier-security-assurance/) and [SOC 2](/posts/how-to-read-a-soc-2-report/) articles.

<h2 id="reusing-assurance">Reusing existing assurance</h2>

Before asking "show us your access-review evidence," check whether a recent SOC 2 Type 2 report has already tested exactly that. Before firing off broad policy questions, check the ISO 27001 certificate's scope and what it actually covers. Before asking "do you penetration test," read the report they've already supplied rather than re-asking a question the document already answers.

```
CAN EXISTING EVIDENCE ANSWER THIS?
YES → use it directly
PARTIALLY → targeted follow-up only
NO → request additional evidence
```

**ISO 27001**: a certificate doesn't mean every control gets marked yes automatically; use it to understand the ISMS's actual scope, the certified entity, the sites covered, and the management system behind it, then ask service-specific questions only where the certificate genuinely doesn't reach. **SOC 2**: if a current Type 2 report covers the relevant service, the relevant period, the relevant control, with appropriate testing and no material exception, you likely don't need to ask the same question again, though it's still worth checking CUECs, subservice organisations, any exceptions, and whether anything material has changed since the report was issued. **Penetration tests**: "yes, annual pen test" is never the end of the conversation, follow up on when, what scope, whether it covered the relevant service, what major findings turned up, whether they were remediated, and whether that was retested, exactly the chain covered in the [pen-test review article](/posts/how-to-review-a-penetration-test-report/).

<h2 id="core-structure">A core questionnaire structure</h2>

A recommended high-level structure, not every section relevant to every supplier: service and supplier context; data and privacy; identity and access; privileged access specifically; infrastructure and cloud; vulnerability management; secure development where relevant; logging and monitoring; incident response; business continuity and recovery; subcontractors and fourth parties; independent assurance already available; data retention and deletion; and exit or offboarding, a section that's routinely forgotten entirely.

A brief flavour of the stronger questions each section should be built around: service context should establish what the service actually is, which legal entity provides it, where it's hosted, and what customer data it touches. Data questions should cover categories of data processed, where it's stored, whether it's copied into support or test environments, and how deletion is handled, without necessarily needing encryption-algorithm-level detail unless risk genuinely warrants it. Identity should ask how workforce users authenticate, what's required for privileged access specifically, which account types sit outside MFA, and how leavers get disabled. Privileged access should cover named versus shared accounts, MFA, just-in-time elevation, approval, logging, session recording, expiry, and whether subcontractors go through the same path. Vulnerability management should ask how vulnerabilities affecting the service are identified, prioritised and remediated, not simply whether scans run. Secure development, only where the supplier actually builds software relevant to the service, should cover code review, dependency management, secrets handling, and how security defects get found and fixed, focused on outcomes rather than naming specific commercial tools. Logging should ask what's monitored and who actually responds, plus specifically what telemetry, if any, is available to you as the customer. Incident response should ask how an incident affecting your service specifically would be detected, escalated and communicated, not simply whether a plan document exists. Recovery should ask how the service comes back after destructive loss or a major outage, covering backups, recovery objectives, and actual restore testing. Fourth parties should ask which material subcontractors can access customer data, administer the service, or materially affect availability, and how the supplier itself assesses them, focused on material dependencies rather than every minor vendor. Independent assurance should simply ask what current evidence exists, ISO, SOC 2, a pen test, or anything else relevant, before requesting anything further. Exit should ask what happens to data at contract end, how access and credentials get revoked, and what happens to backups, questions that are trivial to include and routinely never asked until it's too late to matter.

<h2 id="weak-answers">Weak answers and how to handle them</h2>

**"N/A"** on anything material deserves justification, not silence: "N/A, supplier does not have administrative access to customer environments" can be validated; a bare "N/A" can't be. **"Yes, see policy"** proves a documented requirement exists; it proves nothing about whether it's actually operating, exactly the policy-versus-operation distinction from the [security assurance article](/posts/security-assurance-for-soc-analysts/). **"We are ISO certified"** is genuinely relevant evidence, and it is not an answer to "how are production administrator accounts authenticated," a specific technical question deserves a specific technical answer, not a certification name dropped in its place.

Where a supplier legitimately can't share something, "confidential" isn't automatically a dead end. Redacted documents, a screen share, a formal attestation, an existing SOC 2 report, a summary in place of the full detail, or a live walkthrough can all substitute, provided the substitute genuinely gives enough confidence for the actual risk involved.

<h2 id="scoring">Scoring, without hiding risk</h2>

Simple scoring, yes equals one, no equals zero, N/A equals one, averaged into "87% compliant," can bury exactly the finding that matters most: one catastrophic privileged-access gap disappears completely inside a high aggregate percentage. If scoring is used at all, keep critical requirements visibly separate from the average rather than dissolved inside it, and if weighting is involved, document the methodology honestly, since weighting is a judgement call dressed up as arithmetic.

An illustrative, non-numeric alternative: classify each material response as **satisfactory**, **partial**, **unsatisfactory**, **not applicable**, or **more evidence required**, and keep that classification separate from any aggregate score entirely. Some responses genuinely warrant a mandatory gate regardless of anything else on the form, no MFA at all on privileged access, no incident-notification capability whatsoever, unsupported software still in production, no recovery testing ever performed, though exactly which responses gate depends entirely on your own organisation's policy. Resist marking most of the questionnaire "critical," since if everything is critical, nothing is actually prioritised.

Hold **gap** and **unknown** apart deliberately: a gap means the evidence shows a requirement genuinely isn't being met; unknown means there simply wasn't enough evidence to determine either way. Don't quietly convert "we couldn't determine this" into "therefore no control exists," they're different claims, though a genuine lack of assurance is still worth weighing in the resulting risk picture rather than ignored.

<h2 id="question-library">Question library over fixed form</h2>

Rather than one fixed questionnaire sent to everyone, a **question library** scales considerably better: a bank of questions, each carrying metadata, control area, risk tier, service type, data type, access type, expected evidence, the follow-up it should trigger, mapped framework requirements, an owner, and a version. Generate each specific assessment from that library based on the actual supplier's context, rather than maintaining one increasingly bloated master document that tries to cover every case at once.

Questionnaire tooling can automate branching, evidence reuse, scoring, reminders, expiry tracking, and report generation, and all of that is genuinely useful, provided it never replaces analyst judgement on the findings that actually matter.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

AI tools can genuinely help extract responses from long documents, map answers to requirements, flag contradictions, draft follow-up questions, and summarise evidence. They still need a human validating the output: hallucinated conclusions, missed scope, mishandled confidential material, and simple overtrust in an unchecked summary are all real risks worth taking seriously if this kind of tooling is used.

</div>

<h2 id="standardised-questionnaires">Standardised questionnaires</h2>

Two widely used standardised frameworks are worth knowing about, without reproducing their content here. **SIG**, maintained by Shared Assessments, is a licensed product, accessed through membership or a paid subscription, not something to assume is freely available; it's updated annually and organised around a broad set of risk domains, with Lite and Core (and increasingly finer-grained) versions letting the depth scale to a vendor's actual risk tier, echoing exactly the tiering principle this article has been arguing for throughout. **CAIQ**, from the Cloud Security Alliance, sits alongside its Cloud Controls Matrix and is, by contrast, free for non-commercial use, download, completion and publication to CSA's STAR registry, with commercial customisation requiring its own separate licence; CCM-Lite and CAIQ-Lite offer a reduced question set for lighter-touch cloud-specific assurance.

Standardisation can genuinely reduce duplicated effort across customers asking a given supplier broadly the same things. Neither replaces tailoring the actual assessment to your own specific risk; a standardised questionnaire is a strong starting library, not a finished, risk-calibrated assessment on its own.

Questions inevitably map to more than one underlying framework at once, [CIS](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/), [ISO 27001](/posts/iso-27001-for-soc-analysts/), [NZISM](/posts/nzism-for-security-practitioners/), or internal policy. One well-designed question can support several mapped requirements simultaneously; there's no need to make a supplier answer the same underlying control four separate times because four different frameworks happen to reference it.

<h2 id="follow-up">Follow-up and contradictions</h2>

The strongest questionnaire often ends in a short call, not a closed ticket. Use the written responses to identify exactly where a walkthrough is actually warranted, privileged access, incident response, architecture, subcontractors, and follow the specific thread rather than reading the form back aloud.

Supplier answer: "privileged access uses MFA." Follow it: which identity provider? Any local accounts sitting outside it? Any shared accounts? Any emergency access path? Does subcontractor access go through the same route? How is elevation approved? How long does it last? How is the activity actually logged? This is precisely the same discipline as an incident investigation, one answer produces the next question, and the useful information rarely sits in the first response alone.

Watch for genuine contradictions across sources: the questionnaire says "all admin access uses MFA," the SOC 2 report lists an exception involving a non-MFA admin path, and the architecture diagram shows a legacy admin portal sitting outside SSO entirely. Don't assume deception, ask for clarification directly; the contradiction itself is what earns the follow-up, not an accusation.

Not every "no" is a finding, either. "Do you rotate passwords every 90 days" answered "no" might simply mean the supplier's moved to passwordless authentication backed by MFA, arguably a stronger outcome than the older expectation the question was originally written to test for. Assess against the actual control objective, not a specific, possibly outdated, implementation the question happened to assume.

<h2 id="medconnect">The MedConnect scenario</h2>

The same fictional supplier used across the ISO 27001, NZISM, supplier assurance, SOC 2 and pen-test articles: a cloud patient portal, roughly 40,000 patients, sensitive health information, AWS Sydney, privileged overseas support, subcontractors, and existing ISO 27001, SOC 2 and annual penetration test evidence already in hand.

**Initial triage.** Sensitive health data, yes. Privileged support access, yes. Critical service, yes. Subcontractors involved, yes. That combination alone is enough to trigger the deepest tier of assessment, before a single detailed question gets asked.

**A bad question, and a better one.** "Do you securely manage privileged access" gets a flat "yes" and nothing else. "Describe the complete access path used by support staff to obtain privileged production access, including authentication, approval, duration, logging, and any subcontractor involvement" gets you an actual, assessable description of what really happens.

**Evidence reuse in practice.** MedConnect's SOC 2 report already tests quarterly privileged-access reviews directly. No need to separately request screenshots covering the same ground, unless the report's scope turns out incomplete, an exception is noted against it, the period has gone stale, or your own specific risk genuinely warrants deeper validation beyond what's already been independently tested.

**Fourth party.** "Do subcontractors support the service" answers yes. The conditional follow-up: which material subcontractors specifically, what access do they hold, what data can they reach, how does MedConnect itself assess them, what incident obligations apply to them, and how are changes to that relationship actually disclosed to you.

**A finding, handled properly.** MedConnect's tier-2 support accounts are reviewed annually. Your organisation's own risk requirement expects something stronger for privileged production access. The wrong response is "annual review equals insecure." The right response asks whether just-in-time access or automatic expiry sits underneath that annual cadence, whether access changes get picked up separately when they happen, how the leaver process actually works for that team, and what ongoing monitoring exists in between reviews. Annual review might genuinely be only one layer of a stronger overall control, or it might genuinely be the whole story. The question, not the assumption, is what tells you which.

<h2 id="starter-model">A 30-question starter model</h2>

An illustrative outline of question *themes*, not finished legal or production wording, grouped and roughly weighted: service and data (5 themes), identity and privilege (6), vulnerability management and development (5), logging and incident response (5), recovery (3), fourth parties (3), and assurance and exit (3). Roughly thirty themes total. Not an official template, a demonstration that a genuinely high-value assessment can be concise when it's built around risk rather than exhaustive coverage.

A handful of bad-versus-better pairs worth internalising as the pattern to apply everywhere else:

<div class="table-scroll">

| Weak | Better |
| --- | --- |
| Do you have MFA? | Describe MFA enforcement for privileged and remote access, including any exceptions. |
| Do you patch regularly? | What remediation targets apply to critical vulnerabilities, and how are overdue findings handled? |
| Do you back up data? | When was recovery last successfully tested for this service, and what scope did it cover? |
| Do you have incident response? | How would a security incident affecting our service be identified, escalated and communicated to us? |
| Do you conduct access reviews? | When was the last privileged-access review completed, and what changed as a result? |
| Are all systems patched? | What's the current status of critical, internet-facing vulnerabilities against your own remediation targets? |
| Do you use antivirus? | How are endpoints monitored for malicious activity? |
| Are you secure? | *(not a real question; describe a specific control objective instead)* |

</div>

<h2 id="review-workflow">A reusable review workflow</h2>

Determine inherent risk. Select the relevant question set for that risk level. Review whatever existing assurance is already available. Send the questionnaire. Review the responses. Identify contradictions and genuine gaps. Request targeted evidence where it's actually needed. Run a follow-up conversation if the risk warrants it. Form findings from what's actually been established. Assess the resulting residual risk. Agree remediation where required. Record the decision. Retain the supporting evidence. Reassess on a cadence proportionate to the risk.

When reviewing any individual answer, run it through a short checklist: does it actually cover the service in question (**scope**)? Is it concrete rather than vague (**specificity**)? What actually supports it (**evidence**)? What's explicitly excluded (**exceptions**)? Is it current (**currency**)? Does it match everything else you know (**consistency**)? Who actually performs the control (**ownership**)? Does it genuinely happen in practice (**operation**)? And why does this actually matter to your own risk (**risk**)?

Genuine warning signs worth a direct follow-up, none of them an automatic disqualifier on their own: a vague "yes" with nothing behind it, an excessive number of "N/A" responses, "ISO certified" offered in place of a specific technical answer, shared privileged accounts, no recovery testing ever performed, no defined incident-notification path, critical suppliers of the supplier's own that have never been assessed, no defined vulnerability remediation targets, stale or outdated evidence, and any contradiction between the questionnaire and other supplied evidence. Genuinely good responses tend to define their own scope precisely, explain process rather than asserting outcome, acknowledge exceptions honestly, reference real evidence, name clear ownership, and describe failure modes candidly rather than pretending none exist. A supplier who says "we have three legacy exceptions, here's how they're controlled and when they expire" is often more credible than one who claims no exceptions exist at all; maturity frequently looks like knowing your own weaknesses, not having none.

<h2 id="maintenance">Maintaining the questionnaire</h2>

Review the question set periodically against new threats, control changes, lessons from real incidents, findings from prior assessments, questions that have quietly gone outdated, framework changes, and direct supplier feedback, without needing to prescribe a rigid annual cycle unless your own organisation has genuinely chosen one. Ask suppliers themselves which questions were unclear or felt redundant; questionnaire improvement is legitimately part of the wider assurance programme's own improvement, the same continual-improvement discipline covered in the [security assurance article](/posts/security-assurance-for-soc-analysts/).

Measure the questionnaire itself, not just the suppliers answering it, echoing the [metrics article](/posts/security-metrics-kpis-kris/): how many questions consistently generate an N/A or an irrelevant answer, how long assessments actually take to complete, how many genuinely high-risk findings the process surfaces, how often the same evidence gets requested twice, how often suppliers need clarification before they can answer at all. A question that's never once produced a useful follow-up is a strong candidate for removal. A question that's repeatedly misunderstood needs rewriting, not repeating. Avoid optimising purely for "days to completion," since a faster questionnaire that produces worse assurance isn't actually an improvement.

<h2 id="practical-exercises">Practical exercises</h2>

**Exercise 1.** Rewrite "do you use MFA?" into a genuinely useful question. Compare your version against the "define scope, then ask about exceptions" pattern above.

**Exercise 2.** A supplier answers "N/A" to a question about privileged-access review, despite genuinely having production support engineers. What follow-up does this warrant?

**Exercise 3.** A supplier answers "ISO 27001 certified" to thirty separate security questions. What should the analyst actually do? Use the certificate as evidence where it genuinely applies, and request specific, targeted answers wherever it doesn't establish anything about the actual service.

**Exercise 4.** A newsletter platform holds only public marketing data, no SSO, and no internal access into your environment at all. Does it need a 150-question questionnaire? Almost certainly not, work through why proportionality applies here specifically.

**Exercise 5.** A managed infrastructure provider holds privileged access to firewalls, servers and cloud accounts. Which sections of the questionnaire deserve the deepest treatment, and why?

**Exercise 6.** The questionnaire states "all privileged access requires MFA." The penetration test report shows a legacy admin interface using password-only authentication. What's the right next step? Clarify scope and evidence directly; don't leap straight to assuming the supplier misrepresented anything.

**Exercise 7.** A supplier states "backups tested annually," with a backup policy document as the only supporting evidence. Is that sufficient? It isn't, work out what operational evidence of an actual, successful recovery test would actually look like.

<h2 id="interview-questions">Interview questions</h2>

"How would you design a supplier questionnaire?" Start with inherent risk, define the relevant control objectives, use tiered question sets, apply conditional branching, write outcome-based questions, ask about scope and exceptions specifically, reuse existing independent assurance wherever it genuinely applies, request evidence proportionately, follow high-risk threads with real follow-up, convert genuine gaps into documented risk, and maintain the whole thing over time rather than treating it as fixed once written. "Why not just use one standard 300-question questionnaire for everyone?" Because it creates unnecessary supplier burden, buries the analyst in noise, includes questions irrelevant to most suppliers, applies identical depth regardless of wildly different actual risk, and actively encourages checkbox-style responses over honest ones. "Are yes/no questions inherently bad?" No, they're genuinely useful for triage and branching; they're weak specifically when used alone to represent something more complex than they can actually capture.

<h2 id="anti-patterns">Anti-patterns</h2>

"Do you comply with all applicable laws?" Far too broad to be assessable. "Are you secure?" Meaningless on its own. "Do you follow industry best practice?" Undefined, and different for every reader. "Are all systems patched?" Unrealistic as a binary claim, and ambiguous about which systems. "Do you have antivirus?" A potentially outdated framing of a genuinely live question about endpoint protection. "Upload all security policies." Excessive, and produces a document pile nobody's going to read. "Provide all vulnerability reports." Frequently disproportionate to the actual risk, and often confidential material the supplier has a legitimate reason not to hand over wholesale.

<h2 id="conclusion">The point</h2>

Go back to the 327-question spreadsheet. The actual objective was never "get every box filled in." It was "understand the risk well enough to make a defensible decision," and those are genuinely different goals that happen to look similar on a completed form.

A good supplier questionnaire should make the resulting assessment shorter, clearer and more focused, not longer and noisier. If completing it produces more paperwork than actual understanding, the questionnaire has already failed, however many questions it managed to ask.
