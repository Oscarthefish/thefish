---
title: "A Claim Is Not Evidence: Security Assurance for SOC Analysts"
date: 2026-09-27
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "security-assurance"
  - "supplier-assurance"
  - "risk-management"
  - "governance"
  - "field-guide"
seoTitle: "Security Assurance for SOC Analysts | Jason Hill"
description: "How to take the evidence-based reasoning SOC analysts already use during investigations and apply it to control assurance, supplier assurance and risk findings: claim, evidence, validation, finding, risk, treatment, residual risk."
coverImage: "security-assurance-cover.svg"
coverImageAlt: "Terminal-style illustration of a claim node and several evidence-source nodes converging into a validation node, then branching into a finding node and a risk and treatment node."
---

An endpoint alert fires for suspicious PowerShell. The analyst gets a process tree, a command line, a user, an endpoint, a network connection. They don't immediately write "malware" and move on. They check the parent process, the exact command, what the user was doing at the time, whether anything was actually downloaded, where it went, what else happened on that host around the same time, whether other hosts show the same pattern, and what identity activity sits alongside it. Eventually, with all of that, they can say something like: this was malicious PowerShell launched from a phishing attachment, and it downloaded a payload. That's a validated conclusion, built from evidence, not a guess dressed up as one.

Now change the question. Not "was this PowerShell malicious," but "are administrative accounts actually protected by MFA." The process is a lot more similar than it first looks: claim, evidence, validation, conclusion. That's the bridge this article is about, and it's the sixth and final piece in the framework-learning series, moving from understanding frameworks into actually doing the work they describe.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

The core model for this whole article: requirement, evidence, validation, assessment, finding, risk, treatment, residual risk, decision. Everything below is one worked expansion of that chain.

</div>

<pre class="flow-diagram"><span class="step">Requirement</span>
<span class="arrow">↓</span>
<span class="step">Control</span>
<span class="arrow">↓</span>
<span class="step">Claim</span>
<span class="arrow">↓</span>
<span class="step">Evidence</span>
<span class="arrow">↓</span>
<span class="step">Validation</span>
<span class="arrow">↓</span>
<span class="step">Assessment</span>
<span class="arrow">↓</span>
<span class="step">Finding</span>
<span class="arrow">↓</span>
<span class="step">Risk</span>
<span class="arrow">↓</span>
<span class="step">Treatment</span>
<span class="arrow">↓</span>
<span class="step">Residual risk</span>
<span class="arrow">↓</span>
<span class="step">Decision</span></pre>

This piece builds directly on [CIS](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/), [ISO 27001](/posts/iso-27001-for-soc-analysts/), [NZISM](/posts/nzism-for-security-practitioners/) and the [framework comparison](/posts/comparing-cybersecurity-frameworks/) that came before it. Those articles explained what each framework asks for. This one is about how you actually find out whether any of it is true.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-assurance">What is security assurance?</a></li>
<li><a href="#assurance-vs-audit">Assurance vs audit</a></li>
<li><a href="#requirement-and-control">Requirement and control</a></li>
<li><a href="#the-claim">The claim</a></li>
<li><a href="#evidence">Evidence</a></li>
<li><a href="#validation">Validation</a></li>
<li><a href="#design-implementation-operation">Design, implementation, operation</a></li>
<li><a href="#assessment">Assessment</a></li>
<li><a href="#finding">The finding</a></li>
<li><a href="#risk">Risk</a></li>
<li><a href="#treatment">Treatment</a></li>
<li><a href="#residual-risk">Residual risk and who accepts it</a></li>
<li><a href="#remediation-tracking">Remediation tracking</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#worked-privileged-access">Worked example: privileged access</a></li>
<li><a href="#more-worked-examples">Three more worked examples</a></li>
<li><a href="#supplier-assurance">Supplier assurance</a></li>
<li><a href="#handling-disagreement">Handling disagreement</a></li>
<li><a href="#documentation">Assurance documentation</a></li>
<li><a href="#soc-skills-transfer">How SOC experience transfers</a></li>
<li><a href="#interview-scenarios">Interview scenarios</a></li>
<li><a href="#practical-exercises">Practical exercises</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#seven-day-plan">A seven-day practice plan</a></li>
<li><a href="#common-mistakes">Common mistakes</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-assurance">What is security assurance?</h2>

At a practical level, security assurance is about establishing confidence that security requirements and controls are appropriate and actually operating as intended. That covers a lot of ground in practice: control reviews, system assessments, supplier assessments, architecture reviews, compliance assessments, risk reviews, certification and accreditation activity, audit support, and evidence validation generally.

It is not "does a policy exist," and it's not "does someone say they do it." The question underneath all of it is simpler and harder at the same time: what actually gives us confidence that this is true?

<h2 id="assurance-vs-audit">Assurance vs audit</h2>

These terms overlap depending on organisation and context, and there's no single universal definition worth pretending exists. A useful working distinction: **assurance** is the broader activity aimed at building confidence that requirements, controls and risk management are appropriate and effective. **Audit** is typically a more formal, structured examination against defined criteria, often with independence requirements and a documented methodology behind it.

The practical point for a SOC analyst: you can genuinely do security assurance work, control reviews, supplier assessments, evidence-based findings, without acting as a formal auditor. That's most of what this article is actually about.

<h2 id="requirement-and-control">Requirement and control</h2>

Everything starts with: what should be true? A requirement might come from policy, a standard, legislation, a contract, a framework, NZISM, an ISO requirement, an internal architecture standard, or a prior risk treatment decision. "Privileged users must use MFA." "Critical security logs must be centrally collected." "Access must be removed when employment ends." "Critical systems must have a tested recovery capability."

You can't properly assess anything without first knowing the requirement it's being measured against. "I don't like this configuration" isn't a finding on its own; the first question is always what requirement it's actually being assessed against. And requirements need to be testable to be useful. "Strong security should be used" can't really be assessed. "Administrative access to production systems requires MFA" can, and it gets even more assessable once it defines which systems, which identities, which access types, what exceptions exist, and how often it gets reviewed.

A **control** is something intended to modify or manage risk, or help achieve a security objective, and it isn't always a product. Technical controls (MFA, EDR, firewalls, encryption, logging), process controls (access review, change approval, vulnerability remediation, incident escalation), governance controls (policy, risk approval, ownership, supplier review), people controls (awareness, training, segregation of duties) and physical controls (secure areas, badges, CCTV) are all genuinely controls. Worth holding the objective and the implementation apart, too: the objective might be "prevent unauthorised privileged access," and MFA, separate admin accounts, PAM, conditional access, access reviews, network restriction and logging are all possible ways of getting there. One risk rarely maps to exactly one product.

<h2 id="the-claim">The claim</h2>

Most assessments start with a claim, not evidence. "We have MFA." "We review access quarterly." "We patch critical vulnerabilities in 14 days." "Our backups are tested." "All endpoints have EDR." "We monitor our environment 24/7." These are claims. They are not automatically facts, and assurance work exists precisely to ask what evidence actually supports each one.

Claims can be true, partly true, or genuinely misleading without anyone lying. "We use MFA" might accurately describe Microsoft 365 users while quietly leaving out VPN access, local administrator accounts, service accounts, a legacy application, or a break-glass account nobody thinks about day to day. The person saying it usually believes it's correct as far as they know. The job isn't catching someone out, it's establishing the scope of the claim, what it actually means, and what evidence would demonstrate it.

<h2 id="evidence">Evidence</h2>

Evidence comes in several genuinely different flavours, and each answers a different kind of question. **Documentary** evidence, policy, procedure, standards, architecture documents, risk assessments, access-review reports. **Technical** evidence, configuration, logs, command output, API output, system inventory, scanner data. **Operational** evidence, tickets, completed access reviews, incident records, vulnerability remediation history, backup restoration results. **Independent** evidence, a penetration test, a certification, an audit report. **Testimonial** evidence, discussions with control owners, walkthroughs, live demonstrations.

<h3 id="policy-is-evidence-of-what">Policy is evidence, but evidence of what?</h3>

A policy stating "leaver accounts must be disabled within 24 hours" is genuine evidence of one thing: the documented expectation exists. It is not evidence that leaver accounts are consistently disabled within 24 hours. Establishing that needs something closer to the ground: HR termination records, IAM disable timestamps, identity logs, a sample of actual leavers, and any documented exceptions. The question worth asking of every artefact you're handed: what exactly does this prove, and what does it not?

<h3 id="screenshots">Screenshots are not magic</h3>

A screenshot can genuinely prove a setting appeared configured at one particular moment. It can't, on its own, prove coverage across the whole population, historical operation over time, the absence of exceptions, persistence, where the setting actually comes from, or whether the screenshot is even current. That doesn't make screenshots worthless, they're perfectly valid evidence for the specific, narrower question they can actually answer. The mistake is treating them as answering a bigger question than they do.

<h3 id="evidence-quality">Evidence quality</h3>

Rather than a rigid hierarchy, a set of attributes worth checking for: is it **relevant** to the actual question? Is it **reliable**, how much confidence does the source itself deserve? Is it **current** enough for what's being assessed? Is it **complete**, does it cover the actual population and scope? Is it **traceable**, can you tell where it came from? Is it **consistent** with everything else you've gathered? None of these are formal audit standards, just useful questions to run any piece of evidence through before leaning on it.

<h3 id="sample-vs-population">Sample vs population</h3>

Five administrator accounts can reasonably all be checked directly. Twenty-five thousand user accounts generally can't be, which is where automated evidence, reports, sampling and exception analysis take over. Three correct accounts out of a sample doesn't prove twenty-five thousand are correct. Equally, you don't always need to manually inspect every item to reach a reasonable conclusion. The right approach scales with the actual size, risk, evidence source and objective of the assessment.

<h3 id="corroboration">Corroboration</h3>

A single artefact is often ambiguous on its own. Multiple independent sources pointing the same direction build real confidence, exactly the discipline behind incident investigation, where EDR plus DNS plus identity plus proxy telemetry together tell a much more trustworthy story than any one of them alone. Claim: "former employees are immediately disabled." HR termination timestamp at 14:00, IAM disable at 14:12, no authentication attempts afterward, an offboarding ticket marked complete, together, that's a genuinely strong picture. Corroboration is entirely familiar territory to anyone who's already built an incident timeline.

<h2 id="validation">Validation</h2>

Don't just collect files, interrogate them. Does this evidence relate to the correct system? The correct time period? The correct population, the correct account, the correct environment? Is it production or test? Current or obsolete? Does anything else you've gathered actually contradict it? This is where technical practitioners tend to be genuinely strong, since it's the same scrutiny already applied to log data during an investigation.

A **walkthrough** is worth its own mention: having a control owner demonstrate a process end to end, request, approval, privilege elevation, authentication, session, logging, expiry, is genuinely valuable. It's still not, on its own, proof that the process operates consistently across every case, only that it can operate the way it was just shown to you.

<h2 id="design-implementation-operation">Design, implementation, operation</h2>

Three related but distinct concepts, common in assurance work generally, though the exact terminology varies between organisations and methodologies.

**Design**: if the control operated exactly as intended, would it reasonably address the risk? Risk: former employees retain access. Design: HR termination automatically triggers account disablement. Sounds sensible on paper.

**Implementation**: has it actually been deployed? Maybe the automation genuinely exists for employees, but contractors are still handled manually, which means the control is only partially implemented despite a reasonable design.

**Operating effectiveness**: does it actually work consistently in practice? Reviewing twenty leavers might show eighteen disabled appropriately and two contractor accounts still active weeks later. The conclusion "control exists, design is reasonable, implementation is incomplete, operation is inconsistent" is considerably more useful than "access management failed."

A logging example makes the same point differently. Requirement: critical systems send security logs centrally. Design: architecture specifies forwarding to the SIEM. Implementation: connectors are configured. Operation: are events actually arriving, at the right volume, with correct timestamps, across the full expected coverage, parsed correctly, feeding detections, without unexplained outages, retained for long enough? You might discover the connector exists and is genuinely configured, but stopped sending three weeks ago. Present is not the same claim as operating.

Backups tell the same story again. Design: daily backups. Implementation: the backup platform is configured. Operation: the job reports show success. Effectiveness: a restore test actually fails. Backup success is not the same claim as recovery capability, and none of the earlier three stages being fine tells you anything about the fourth.

[Present Is Not Effective: How to Test Security Controls](/posts/security-control-testing/) goes considerably deeper into the actual mechanics of this, population, sampling, exception testing, and ten fully worked control tests from MFA through to backups.

<h2 id="assessment">Assessment</h2>

Compare the requirement against the evidence and reach a conclusion: met, substantially met, partially met, not met, not applicable, or genuinely unable to determine. Don't invent a scoring system for this; organisations use different rating scales, and whichever one applies, the conclusion needs to trace back to the evidence, not to a feeling.

Resist binary thinking specifically. "MFA protects privileged access" with evidence showing 95% coverage, two emergency accounts excluded, and one legacy management interface bypassing SSO entirely, calling that simply "compliant" hides material detail. Calling it simply "non-compliant" loses useful context too. Describe the actual condition.

<h2 id="finding">The finding</h2>

A strong finding states the expected condition, the observed condition, the evidence behind it, the gap, and the consequence, without emotional language. Weak: "terrible admin security." Better: "three privileged support accounts authenticate directly to the legacy management interface using password-only authentication, bypassing the organisation's centrally enforced MFA controls."

Worth holding **observation** and **finding** apart, too. Observation: seven former contractor accounts are still enabled. Finding: the contractor offboarding process does not consistently disable accounts following contract termination. The observation is a fact. The finding is what that fact actually means about the process.

Don't jump to root cause too quickly, either. "Former accounts exist" could trace back to an HR process gap, missing contractor records, an IAM integration that simply excludes contractors, a manual process that failed once, an owner who never requested closure, or a legitimately approved extension. Investigate before declaring the whole joiner-mover-leaver process broken; a careful root-cause technique like asking "why" repeatedly is useful, but stop asking once the evidence no longer supports the next assumption, rather than mechanically pushing to a fixed number of whys.

Not everything needs framing as failure, either. Sometimes a requirement is genuinely met, and an improvement would still materially reduce risk, worth recording as an observation or improvement opportunity rather than forcing it into "finding" language purely for consistency. Organisations classify this differently; there's no single correct taxonomy.

<h2 id="risk">Risk</h2>

A finding is not automatically a risk statement. Finding: "five former contractors retain active accounts." Risk: those accounts may be used by former personnel or an attacker to obtain unauthorised access to organisational systems and information. A well-formed risk statement generally connects a cause or condition, to a security event, to a business or information impact, though it's fine to phrase this naturally rather than forcing a rigid formula every time.

Technical severity and business risk are genuinely different things. A critical CVSS score doesn't automatically mean critical business risk; internet exposure, exploitability, authentication requirements, segmentation, asset criticality, the data involved, existing compensating controls and actual threat activity all shape the real picture. A medium-severity finding on critical, exposed infrastructure can matter more than a critical finding buried three network hops deep behind strong segmentation. Likelihood and impact are worth thinking through at a conceptual level, exposure, attacker capability, exploit availability, access required and existing controls for likelihood; confidentiality, integrity, availability, privacy, financial, safety, regulatory, operational and reputational for impact, but use whatever methodology your organisation already has rather than inventing a new one. And don't invent a risk score. If the organisation uses a 5x5 matrix, FAIR, or a qualitative high/medium/low scale, use that. "7.8 out of 10" said with confidence but built on nothing is worse than a plain, honestly-qualified description.

<h2 id="treatment">Treatment</h2>

Common treatment options, again worth checking terminology against whatever framework you're actually working within: reduce or modify, avoid, share or transfer, accept or retain. Risk: legacy admin interface lacks MFA. Reduce: replace the interface, add a privileged access gateway, restrict the network, use individual accounts, add session monitoring. Avoid: retire the service entirely. Share: contractual or insurance mechanisms can allocate some of the consequence, but the underlying technical exposure doesn't actually go anywhere. Accept: an appropriately authorised owner formally accepts what's left.

Recommendations should be specific, proportionate and genuinely tied to the risk they're addressing. "Improve security" and "implement industry best practice" aren't recommendations, they're placeholders. "Migrate privileged access to the centrally managed identity path requiring MFA and individual administrator accounts" is one. If that migration genuinely takes six months, interim measures, IP allowlisting, VPN-only access, named accounts, credential rotation, active monitoring, alerting, and a defined expiry date for the interim state, are worth stating explicitly rather than leaving the gap open and unmanaged in the meantime.

Worth being careful not to design the entire technical solution for the control owner. A finding that privileged activity can't be attributed to an individual because the team shares one administrator account translates into a required outcome, privileged activity must be individually attributable and appropriately authenticated, and several possible solutions, named accounts, PAM, controlled elevation, session brokering, that the engineering team is generally better placed to choose between than the assessor is.

<h2 id="residual-risk">Residual risk and who accepts it</h2>

Even after treatment, risk usually remains. MFA reduces account-compromise risk considerably; it doesn't eliminate session theft, social engineering, malicious insiders, MFA fatigue depending on exactly how it's implemented, or endpoint compromise upstream of the authentication step entirely. Residual risk is whatever's left once the relevant controls and treatment are actually applied.

The assessor identifies and communicates that residual risk. They don't get to casually declare it "accepted." That decision belongs with whoever's actually authorised to own the consequence, a system owner, business owner, risk owner, or accreditation authority, depending on how the organisation's governance is structured; exact titles vary and shouldn't be assumed universal. The core lesson, repeated throughout this whole series for good reason: risk acceptance sits with someone authorised to own the consequence, never with whoever happened to assess it.

<h2 id="remediation-tracking">Remediation tracking</h2>

Finding closure needs more than "the owner says it's fixed." Track the action, its owner, a target date, current status, any dependencies, the evidence expected, and whether a retest has actually happened. When someone reports "all old accounts removed," ask for the updated account inventory, termination records, IAM data, and a sample you can independently check, then close it.

Retesting is assurance's equivalent of confirming containment actually held. Finding: logs missing from the SIEM. Owner enables the connector. Retest: are logs genuinely arriving now, across all required systems, with correct events and timestamps, reliably, with proper retention? Don't close a finding just because a configuration now exists.

And keep these statuses genuinely distinct: **remediated**, **accepted**, **transferred or shared**, **avoided**, and **exception granted** are not interchangeable. Risk acceptance means the risk remains and an authorised party has knowingly accepted it. It does not mean the underlying issue disappeared.

<h2 id="worked-privileged-access">Worked example: privileged access</h2>

An organisation has 14 production administrators, Entra ID, MFA, a VPN, and a legacy network-management platform. Four engineers share one "netadmin" account, its password stored in a team password vault. The VPN requires MFA. The network platform itself only accepts username and password. Logs record activity under "netadmin," never the individual operator. The platform is reachable only from a management subnet.

**Requirement:** privileged access should provide appropriate authentication, individual accountability and controlled access. **Claim:** "all privileged access is protected by MFA and fully logged." **Evidence:** identity configuration, VPN settings, the network platform's own authentication settings, the privileged account list, activity logs, password-vault records, and a network diagram. **Validation:** MFA genuinely protects VPN access. But once connected, the shared netadmin credentials take over: MFA identifies who reached the VPN, the platform itself only ever records the shared account. **Finding:** the shared privileged account prevents reliable attribution of administrative actions on the network platform, and the platform's own authentication doesn't independently enforce MFA, though this needs assessing carefully rather than automatically treated as equivalent to "no MFA," since MFA genuinely does exist upstream at the VPN layer. **Risk:** if the shared credentials are misused or compromised, administrative actions may not be attributable to an individual, revoking the credential affects every engineer who uses it, and unauthorised privileged activity becomes considerably harder to investigate after the fact. **Compensating controls already in place:** VPN MFA, the restricted management subnet, vault access logging, and general monitoring, all of which genuinely reduce the risk without actually resolving the attribution problem underneath it. **Treatment:** named administrator accounts, a PAM or session-brokering solution, or another mechanism that achieves individual attribution specifically. **Residual risk:** assessed once whichever treatment is actually chosen and implemented.

The lesson this example is really teaching: nuance, not a reflexive "no MFA equals critical." MFA genuinely exists in this picture. The actual gap is attribution, and naming it precisely is what makes the finding useful.

<h2 id="more-worked-examples">Three more worked examples</h2>

<h3 id="worked-logging">Logging, assumed responsibility</h3>

A critical SaaS application's supplier says "security logs are monitored." Evidence gathered: application logs retained for 30 days, authentication logs exported nightly, but the customer's SOC never receives real-time events; the supplier's own SOC monitors infrastructure but not tenant-level activity; and the customer's own team had genuinely believed the supplier was responsible for that monitoring all along. Working through requirement, claim, evidence, scope, responsibility, finding and risk in turn surfaces the real issue: it isn't a technical gap so much as an **assumed responsibility** gap. The supplier believed the customer monitored tenant activity. The customer believed the supplier did. The result is that nobody actually did, which is frequently the single biggest assurance issue in a supplier relationship, and one that no amount of technical evidence review finds until someone explicitly asks who owns what.

<h3 id="worked-vulnerability">Vulnerability management, targets vs operation</h3>

A supplier claims "critical vulnerabilities are patched within 14 days." Policy confirms the 14-day target. Scanner data shows 17 critical findings; ticket records show 12 remediated inside SLA, 3 late, and 2 carrying approved exceptions. Worth asking about scanner coverage, whether scans are authenticated, which findings are internet-facing versus internal, whether exceptions were genuinely authorised, and what compensating controls covered the late ones in the meantime. A fair conclusion here is that the control exists but operation isn't consistently achieving the stated target, considerably more precise and more useful than either "vulnerability management is absent" or a flat "compliant."

<h3 id="worked-jml">Joiner, mover, leaver</h3>

A contractor's engagement ends on 1 June. Their account is discovered still active on 28 June. There's no HR system integration for contractors at all; a business owner has to manually request disablement, and this time nobody did. Working through observation, requirement, evidence, finding, root cause, risk and treatment leads somewhere specific: a central contractor register, a mandatory account expiry date set at provisioning time, automated expiry rather than relying on a manual request, periodic reconciliation between the contractor register and the identity platform, clear ownership, and monitoring for exceptions to that process going forward. This is one of the cleanest possible illustrations of the whole assurance chain, worth returning to as a template for how the reasoning should actually flow.

<h2 id="supplier-assurance">Supplier assurance</h2>

Supplier claims tend to cluster around a familiar set: ISO 27001 certified, MFA enabled, annual penetration tests, encryption everywhere, 24/7 monitoring, daily backups, background checks, vulnerability scanning. Assurance asks what each one actually means in practice. "We conduct annual penetration tests" invites: what scope, what date, what methodology, independent or internal, application or infrastructure or both, authenticated or unauthenticated, what findings came out of it, what got remediated, was there a retest, and what was explicitly excluded? None of this means demanding a full penetration test report from every supplier regardless of context; evidence requests should be proportionate to actual risk.

<h3 id="proportionate-assurance">Proportionate assurance</h3>

A free marketing newsletter platform and a critical healthcare SaaS processing sensitive patient information don't warrant the same depth of assessment. Weigh data sensitivity, privileged access, connectivity into your own environment, criticality, how easily the supplier could be substituted, service availability requirements, regulatory exposure, volume, geography, subcontractors, and how concentrated your dependency on them actually is. Higher inherent risk earns deeper evidence. Lower inherent risk can genuinely justify a lighter touch, and that's a legitimate assurance decision, not a shortcut.

That inherent-risk question is worth asking before reviewing any controls at all: what actually happens if this supplier is compromised, or simply unavailable? What data, how sensitive, what access, how critical is the service, what internal connectivity exists, is privileged access involved, who are their subcontractors, how concentrated is the dependency? That answer determines assurance depth. Nobody needs a 300-question spreadsheet sent to every vendor regardless of what they actually do.

A rough, illustrative way to think about confidence building: a policy stating backups occur tells you the requirement exists. Backup job reports tell you backups appear to actually run. A successfully completed restoration exercise tells you considerably more, that recovery genuinely works. Not a formal scoring system, just a reminder that confidence tends to build as evidence moves from stated intent toward demonstrated operation.

<h3 id="evidence-unavailable">When evidence isn't available</h3>

Sometimes evidence genuinely can't be produced: it's sensitive, the supplier can't disclose it, no control actually exists yet, the process is too immature to have produced records, or the evidence sits somewhere the current request didn't reach. Don't automatically conclude the control fails. Consider redacted evidence, a live demonstration, an independent audit or certification covering the relevant scope, a summary report, or a guided walkthrough instead. Missing evidence does reduce confidence, and that limitation is worth documenting honestly rather than either papering over it or treating it as an automatic failure.

Equally, be genuinely careful what you ask a supplier to hand over. Raw credentials, sensitive personal data, detailed attack technique information, production secrets, full customer datasets, unnecessary system exports, none of this should be requested as "evidence" when something narrower would answer the actual question. The right question is always what's the minimum evidence actually needed here. Supplier assurance shouldn't create a new security risk of its own on the way to assessing an existing one.

<h3 id="when-to-stop">When to stop asking</h3>

Assurance work can genuinely become endless if you let it. Stop once you have enough credible evidence to form a proportionate conclusion, not once you've collected every artefact that could theoretically exist. Risk should drive depth, and this matters especially for supplier assessments, where the temptation to keep asking "just one more thing" is constant and rarely proportionate to what's actually being procured.

<h3 id="better-questions">Asking better questions</h3>

"Send me screenshots of everything." "Give me all your policies." "Give me your full pen-test report." "Complete this 500-question spreadsheet." "Do you comply with ISO 27001? Yes or no?" All of these tend to produce volume, not assurance. Better questions are targeted: not "do you use MFA" but "which administrative access paths require MFA, and what exceptions exist?" Not "do you patch vulnerabilities" but "what remediation targets apply to critical vulnerabilities, and can you show how those targets actually held over the last six months?" Not "do you back up data" but "which critical systems and data are backed up, how are those backups protected, and when was recovery last successfully tested?"

Closed questions confirm; open questions reveal. "Do you use MFA?" gets you "yes." "Walk me through how privileged authentication actually works, end to end" tends to surface the SSO path, the VPN, local admin accounts, service accounts, break-glass access and support paths that the closed question would never have uncovered. Use open questions first, and use "show me" as a habit worth building deliberately: "tell me how access reviews work," then "show me the last completed one." "Tell me how leavers get disabled," then "show me a recent sample." None of this needs to sound adversarial; tone genuinely matters here.

<div class="callout callout--tip">

<p class="callout-label">Analyst tip</p>

Assurance works better when the control owner understands you're trying to understand risk, not score points against them. People get defensive fast when they sense an assessment is designed to catch them out, and defensiveness is exactly what makes evidence harder to get. "Help me understand how this works," "can you walk me through this," "what happens when there's an exception," and "how would this work for a contractor specifically" tend to surface far more useful information than anything that reads as interrogation.

</div>

Applying all of this specifically to third parties, inherent risk, tiering, fourth-party exposure, contracts, ongoing monitoring, is its own substantial subject, covered in [Inherent Risk Comes First: Supplier Security Assurance for Analysts](/posts/supplier-security-assurance/).

<h2 id="handling-disagreement">Handling disagreement</h2>

A control owner disagrees with a finding. "I'm security, therefore I'm right" isn't a real answer. Go back to the requirement, the evidence, the scope, and the risk. Is anything actually missing from the evidence? Was the process genuinely misunderstood? Is the requirement even applicable here? Are there compensating controls that weren't accounted for? Could the finding's wording simply be more precise? You may well end up changing your conclusion, and that's good assurance practice, not a loss.

<h2 id="documentation">Assurance documentation</h2>

A simple, reusable record structure: requirement, control owner, control description, evidence reviewed, assessment, finding, risk, treatment, owner, due date, residual risk, status. Not an industry-standard template, just a genuinely useful model.

Traceability matters throughout. Every conclusion should be answerable with "where did this actually come from." Finding: three terminated contractor accounts remained active. Evidence: an IAM export dated X, a contractor termination list dated Y, and authentication data confirming activity. Requirement: the internal access-control standard, referenced specifically. Anyone else should be able to follow that chain and reach the same conclusion independently.

And keep secrets out of the report itself. Reports circulate more widely than people expect. Passwords, tokens, full exploit detail, personal data, sensitive configuration, confidential logs, none of it belongs embedded in a written finding; reference the evidence securely instead of copying it wholesale into a document that will get forwarded, saved and reopened long after the context that made it safe to include has disappeared.

<h3 id="finding-template">A simple finding template</h3>

Title, condition (what was observed), requirement (what should be true), evidence (what supports the conclusion), risk (why it matters), recommendation or treatment (the desired outcome), owner, and target date where applicable. Exact formats differ by organisation; this is a starting point, not a standard.

**Example finding.** Title: former contractor accounts remain active after contract end. Condition: five sampled contractor accounts remained enabled between 12 and 41 days after their recorded contract end dates. Requirement: the organisation's access-control standard requires access to be removed when it's no longer required. Evidence: the contractor register, an IAM export, recorded termination dates, and authentication logs. Risk: former personnel, or an attacker in possession of those credentials, could retain unauthorised access to organisational systems. Recommendation: establish a reliable contractor offboarding mechanism, including clear ownership, mandatory expiry dates, and regular reconciliation between the contractor register and the identity platform.

That template is written for the record. Getting the same finding in front of a risk owner or executive in a way they can actually act on is a different skill, covered in [Executive Security Risk Reporting](/posts/executive-security-risk-reporting/).

<h2 id="soc-skills-transfer">How SOC experience transfers</h2>

<div class="table-scroll">

| SOC skill | Assurance equivalent |
| --- | --- |
| Timeline construction | Tracing evidence and process operation over time |
| Correlating telemetry | Corroborating multiple evidence sources |
| Scoping an incident | Scoping a system or control assessment |
| Testing a hypothesis | Testing a control claim |
| False-positive analysis | Avoiding unsupported findings |
| Assessing incident severity | Assessing risk in context |
| Containment | Risk treatment and compensating controls |
| Post-incident review | Corrective action and continual improvement |

</div>

That's a genuinely strong foundation, not a coincidence. What's new, on top of it, is thinking in terms of business impact, risk ownership, governance, control objectives, requirement interpretation, supplier communication, judging evidence sufficiency, writing a finding formally, tracking remediation properly, and understanding where risk acceptance authority actually sits. None of this means starting from zero. It means learning a vocabulary and a wider context around skills you already have, exactly the same message this entire series keeps coming back to.

The instinct transfers more directly than it sounds like it should. The same reflex that makes an analyst ask "which timestamp is this, event time or ingestion time" during an investigation is exactly what makes someone ask "is this screenshot current, and does it cover every environment, or just the one shown" during a control review. Nobody teaches that scepticism separately for assurance work. It's the same habit, aimed at a different question.

<h2 id="interview-scenarios">Interview scenarios</h2>

**"A supplier says all privileged accounts use MFA. How would you validate that?"** A strong answer clarifies scope first, what counts as privileged, which environments, which access paths, then looks at control design, then requests evidence, the account inventory, identity configuration, PAM or remote-access settings, the exception list, authentication logs, then samples or tests where appropriate, identifies gaps, assesses the resulting risk, considers compensating controls already present, agrees a proportionate treatment, and tracks it through to a retest.

**"A supplier has an ISO 27001 certificate. Is that enough?"** No automatic yes or no. Check the certificate's validity, its scope, whether the actual service being procured sits inside that scope, the certified entity, relevant locations, and then decide what additional evidence is proportionate given the inherent risk, exactly the reasoning covered in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/).

**"What do you do if a control owner refuses your remediation?"** Understand their concern properly first. Validate whatever business or technical constraint they're describing. Go back to the requirement and the risk. Consider an alternative treatment or a genuine compensating control. Document the resulting residual risk clearly. If it's still unresolved, escalate to whoever's actually authorised to own that risk, rather than treating security as having unilateral authority it doesn't actually hold.

<h2 id="practical-exercises">Practical exercises</h2>

**Exercise 1, MFA.** Claim: "all privileged users have MFA." Evidence provided: a screenshot showing an MFA policy enabled. Is that enough? Work through coverage, the full account population, exclusions, legacy access paths, service accounts, actual enforcement (not just policy existence), and authentication logs before answering.

**Exercise 2, vulnerability SLA.** Claim: "critical vulnerabilities are fixed within 14 days." Evidence: the 14-day policy, plus a small dataset, finding A resolved in 9 days, B in 12, C in 36, D in 8, E carrying an exception, F in 51. What's the fair assessment, and what would you ask about C and F specifically?

**Exercise 3, logging.** Claim: "all critical systems send logs to the SIEM." Evidence: a CMDB showing 120 critical systems, and a SIEM source inventory showing 103. What questions come next, rather than an instant conclusion? Consider naming inconsistencies between the two systems, whether the CMDB itself is accurate, whether the 17 missing systems have actually been decommissioned, and the health of whatever logging does exist.

**Exercise 4, backups.** Claim: "backups run daily." Evidence: a 99.7% job success rate. Does that prove recovery capability? It doesn't. Ask about restore testing specifically, coverage of genuinely critical systems, backup encryption, deletion controls, resistance to ransomware scenarios, and stated recovery objectives.

**Exercise 5, access review.** Claim: "access is reviewed quarterly." Evidence: Q1 complete, Q2 complete, Q3 no record found, Q4 complete. What's the appropriate finding? Something like "the control operates but was not performed consistently during the sampled period" is more accurate than either "compliant" or "the process has failed."

<h2 id="self-test">Mini self-test</h2>

1. What's the difference between a claim and evidence?
2. What question should you ask before calling something a finding?
3. What is control design?
4. What is implementation?
5. What is operating effectiveness?
6. Does a policy prove a process actually operates?
7. Why might a screenshot be insufficient evidence on its own?
8. What's the difference between an observation and a finding?
9. What's the difference between a finding and a risk?
10. Who should accept residual business risk?
11. What is a compensating control?
12. Does "risk accepted" mean the finding was remediated?
13. Why does evidence scope need to be considered?
14. Why can supplier assurance be proportionate rather than exhaustive?
15. What SOC skills transfer most strongly to assurance work?

<details>
<summary>Worked answers</summary>

**1.** A claim is an assertion; evidence is what actually supports or contradicts it.

**2.** What requirement is this being assessed against, and is there actually evidence behind the conclusion?

**3.** Whether the control, if it operated exactly as intended, would reasonably address the risk.

**4.** Whether the control has actually been deployed, not just designed.

**5.** Whether the control actually and consistently works in practice, over time.

**6.** No, a policy proves the requirement is documented, not that the behaviour it describes actually happens.

**7.** It proves a single point in time for whatever it shows, not full population coverage, historical consistency, or the absence of exceptions.

**8.** An observation is a fact; a finding is the conclusion drawn about what that fact means for the underlying process or control.

**9.** A finding describes what was observed against a requirement; a risk describes what could actually happen as a result of that gap.

**10.** An authorised risk or business owner, not the person who assessed or identified it.

**11.** An alternative control addressing the same underlying risk when the original requirement can't be directly met.

**12.** No, it means the risk remains and someone authorised has knowingly accepted it, not that the issue was fixed.

**13.** Because evidence that's correct for one system, time period or population doesn't automatically apply to another.

**14.** Because assurance depth should scale with inherent risk; treating every supplier identically wastes effort and rarely improves the actual conclusion.

**15.** Evidence-based reasoning, corroboration across sources, hypothesis testing, and scoping, all core SOC skills applied to a different starting question.

</details>

<h2 id="seven-day-plan">A seven-day practice plan</h2>

**Day 1:** requirement vs control. Take five security policies or requirements you already know and identify what would actually prove each one is being met. **Day 2:** claim vs evidence, using MFA, backups and patching as your three practice claims. **Day 3:** design vs implementation vs operation, applied to one control you already understand well. **Day 4:** write three findings from real or invented observations. **Day 5:** write risk statements and treatments for those same three findings. **Day 6:** run through one supplier scenario end to end. **Day 7:** a full assessment, requirement through evidence through finding through risk through treatment, on a single control from start to finish.

<h2 id="common-mistakes">Common mistakes</h2>

"We have a policy, so the control works." No. "We have the technology, so the control works." No, for the same reason. "The supplier said yes, so mark it compliant." No, that's a claim, not evidence. "I found one gap, therefore the whole control fails." Not necessarily, describe what was actually found. "Every finding is high risk." No, context determines that. "Risk score equals technical severity." No, business context changes the picture considerably. "More evidence is always better." No, evidence should be proportionate to the actual question. "No evidence automatically means no control." Not necessarily, though it does limit how much confidence you can honestly claim. "Accepted risk means fixed." No, it means the risk remains and someone authorised owns it. "The security analyst should decide what business risk is acceptable." No, that authority sits elsewhere. "Assurance means trying to catch people out." No, it means trying to understand what's actually true.

<h2 id="conclusion">The point</h2>

Everything in this article is really one habit, repeated across a lot of different scenarios: don't accept a claim, however confidently it's stated, without asking what evidence actually supports it, and don't stop at the first piece of evidence you're handed without asking exactly what it proves and what it doesn't. That's already how you work an investigation. Security assurance is the same discipline, aimed at a different question: not "what happened," but "is this actually true, and how confident can we honestly be."

The framework series before this article gave you the vocabulary, safeguards, outcomes, management systems, formal requirements. This one is the method for actually testing whether any of it holds up. Requirement, evidence, validation, finding, risk, treatment, residual risk, decision, that chain works whether you're looking at your own organisation's MFA rollout or a supplier's penetration test claim, and it's genuinely the same discipline you already use every time you refuse to close an alert on nothing more than "the user says they didn't click anything."
