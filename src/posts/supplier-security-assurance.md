---
title: "Inherent Risk Comes First: Supplier Security Assurance for Analysts"
date: 2026-09-28
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "supplier-assurance"
  - "third-party-risk"
  - "security-assurance"
  - "risk-management"
  - "field-guide"
seoTitle: "Supplier Security Assurance for SOC Analysts | Jason Hill"
description: "A practical guide to third-party cyber risk and supplier security assurance: why inherent risk comes before the questionnaire, how to tier suppliers, assess evidence, write findings, and keep assurance going after onboarding."
coverImage: "supplier-assurance-cover.svg"
coverImageAlt: "Terminal-style illustration of a chain of nodes representing a supplier support engineer's access path: identity, MFA, VPN, jump host, privilege, and production."
---

Procurement asks security: "can we use this supplier?" The supplier's already sent over an ISO 27001 certificate, a penetration-test summary, a completed questionnaire, and a security whitepaper. Is that enough?

The honest answer is: it's impossible to say yet, because nobody's asked the one question that actually matters first. Does this supplier host public marketing content, or store sensitive customer information? Does it get no access to internal systems at all, or does it hold privileged remote access into production? Could it disappear for a week with barely a shrug, or would that take down a critical business service? Until those are answered, a stack of documents, however impressive, doesn't actually tell you anything.

That's the whole article in one idea: **inherent risk comes first.** Everything else, the questionnaire, the certificate review, the evidence requests, is calibrated by the answer to that question, not the other way around.

<div class="callout callout--tip">

<p class="callout-label">Where this fits</p>

Previous articles in this series covered [CIS](/posts/cis-controls-v8-1-for-soc-analysts/) (practical safeguards), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/) (cybersecurity outcomes), [ISO 27001](/posts/iso-27001-for-soc-analysts/) (a management system), [NZISM](/posts/nzism-for-security-practitioners/) (NZ Government requirements), and [security assurance](/posts/security-assurance-for-soc-analysts/) (turning claims into evidence-based findings). This article applies all of that reasoning to an organisation you don't control: a supplier. It's written to stand on its own, so you don't need to have read the others first, though it builds most directly on the assurance article.

</div>

<pre class="flow-diagram"><span class="step">Business need</span>
<span class="arrow">↓</span>
<span class="step">Service context</span>
<span class="arrow">↓</span>
<span class="step">Inherent risk</span>
<span class="arrow">↓</span>
<span class="step">Assurance</span>
<span class="arrow">↓</span>
<span class="step">Findings</span>
<span class="arrow">↓</span>
<span class="step">Treatment</span>
<span class="arrow">↓</span>
<span class="step">Residual risk</span>
<span class="arrow">↓</span>
<span class="step">Decision</span>
<span class="arrow">↓</span>
<span class="step">Onboard</span>
<span class="arrow">↓</span>
<span class="step">Monitor</span>
<span class="arrow">↓</span>
<span class="step">Reassess</span>
<span class="arrow">↓</span>
<span class="step">Exit</span></pre>

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-third-party-risk">Third-party cyber risk</a></li>
<li><a href="#what-is-supplier-assurance">Supplier security assurance</a></li>
<li><a href="#start-with-the-service">Start with the service</a></li>
<li><a href="#inherent-risk">Inherent risk</a></li>
<li><a href="#tiering-and-proportion">Tiering and proportion</a></li>
<li><a href="#define-requirements">Defining requirements</a></li>
<li><a href="#existing-assurance-first">Existing assurance first</a></li>
<li><a href="#evidence-based-assessment">Evidence-based assessment</a></li>
<li><a href="#identity-and-privileged-access">Identity and privileged access</a></li>
<li><a href="#logging-monitoring-incident">Logging, monitoring, incidents</a></li>
<li><a href="#technical-domains">More technical domains</a></li>
<li><a href="#fourth-party-and-concentration">Fourth parties and concentration</a></li>
<li><a href="#medconnect">The MedConnect scenario</a></li>
<li><a href="#findings-and-treatment">Findings and treatment</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#contracts">Contractual controls</a></li>
<li><a href="#onboarding">Onboarding</a></li>
<li><a href="#ongoing-monitoring">Ongoing monitoring</a></li>
<li><a href="#exit-and-offboarding">Exit and offboarding</a></li>
<li><a href="#questionnaires">Supplier questionnaires</a></li>
<li><a href="#running-the-assessment">Running the assessment</a></li>
<li><a href="#security-vs-business-decision">Security vs business decision</a></li>
<li><a href="#soc-to-supplier-assurance">From SOC to supplier assurance</a></li>
<li><a href="#interview-questions">Interview questions</a></li>
<li><a href="#practical-exercises">Practical exercises</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#common-mistakes">Common mistakes</a></li>
<li><a href="#nz-context">NZ context</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-third-party-risk">Third-party cyber risk</h2>

A third party can create cyber risk for you because it processes, stores or transmits your information, accesses or connects to your systems, administers infrastructure on your behalf, or provides software, cloud, identity or security services you depend on. Your organisation can end up genuinely affected by that supplier's breach, outage, insider threat, poor access management, unpatched vulnerability, ransomware incident, subcontractor, compromised software, or even its business failure.

Worth stating plainly, because it's easy to lose sight of: outsourcing a service does not outsource the risk that comes with it. The consequence still lands on you.

<h2 id="what-is-supplier-assurance">Supplier security assurance</h2>

Supplier security assurance is the process of getting sufficient confidence that the cyber risk a supplier introduces is understood, appropriately controlled, accepted by the right people, and monitored over time. It is not questionnaire completion, certificate collection, or a procurement sign-off box being ticked. Those can all be inputs to assurance. None of them is assurance on its own.

<h2 id="start-with-the-service">Start with the service, not the supplier</h2>

A huge, well-known company might provide a genuinely low-risk newsletter platform. A five-person company might run a critical clinical application with privileged access into your environment. Company size doesn't determine cyber risk; the service does. What are you actually buying? What does it touch? What happens if it fails?

<h3 id="data-flow">Follow the actual data flow</h3>

It helps to sketch the real path rather than assume one. A user authenticating through your SSO into a supplier's SaaS platform, which runs on AWS in Sydney, backed by a database with its own backup provider, is one shape. A supplier support engineer authenticating through the supplier's own identity provider into a privileged support portal that reaches straight into your production SaaS environment is a genuinely different shape, and often a riskier one, even when it belongs to the same supplier. Ask concretely: how does access actually happen, step by step?

<h2 id="inherent-risk">Inherent risk</h2>

**Inherent risk** is the level of risk a supplier or service presents before considering how effective its controls actually are. Different methodologies define it slightly differently; the underlying idea, risk before controls, is what matters here.

Work through it across several dimensions. **Data sensitivity**: what could actually be exposed? **Privilege**: what can supplier personnel actually do in your environment? **Criticality**: how dependent is the business on this service continuing to run? **Connectivity**: could a supplier compromise create a path into your own environment? **Volume**: how much information is actually involved? **Regulatory and privacy**: what obligations attach to this data or service? **Substitutability**: could you replace this supplier quickly if you needed to? **Concentration**: do many of your important services rely on the same underlying provider? **Geography**: where does data actually sit, and where is support delivered from? **Fourth parties**: who does the supplier itself depend on?

<h3 id="inherent-vs-residual">Inherent vs residual</h3>

Keep these genuinely distinct. Supplier has privileged access to production: inherent risk is high. Controls are then applied, named accounts, MFA, just-in-time access, an approval step, session recording, logging, active monitoring. Residual risk is what's left once those controls are actually operating, reduced, but essentially never eliminated. This is the same inherent-versus-residual distinction covered from the organisation's own perspective in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/), just applied outward at a supplier instead.

<h2 id="tiering-and-proportion">Tiering and proportion</h2>

Organisations commonly group suppliers by risk rather than treating every one identically. An illustrative model, not a universal one: **Tier 1, high or critical**, sensitive data, privileged access, a critical service, or deep integration, warranting deep assurance. **Tier 2, moderate**, limited internal data, an important but not critical service, restricted integration, warranting moderate assurance. **Tier 3, low**, public data only, no internal integration, no privileged access, low business dependency, warranting light assurance. Use your own organisation's actual methodology; this is only illustrating the shape of one.

This is where **proportionate assurance** becomes the whole point. A restaurant-booking SaaS tool and a patient-record system shouldn't receive the same treatment. High inherent risk earns deeper evidence; low inherent risk genuinely justifies a lighter touch. Sometimes good supplier assurance is five sharp, targeted questions. Sometimes it's a substantial technical review. Questionnaire length has never been a measure of assessment quality, and treating it as one is how assurance programmes end up producing volume instead of confidence.

<h2 id="define-requirements">Defining requirements</h2>

Once the risk picture is roughly understood, ask: what needs to be true for us to use this service safely? Likely areas include identity and access, privileged access specifically, encryption, logging, incident notification, vulnerability management, patching, penetration testing, backups, recovery, business continuity, secure development, personnel security, cloud controls, subcontractor management, data deletion, and exit arrangements. Requirements should trace back to something real, internal policy, contract, privacy law, a regulatory obligation, ISO, NZISM, sector guidance, an architecture standard, or a specific risk assessment, rather than being asked simply because they appear on a generic template questionnaire somewhere.

<h2 id="existing-assurance-first">Existing assurance first</h2>

Before drafting a hundred questions, ask what assurance already exists. An ISO 27001 certificate, a SOC 2 report, a penetration-test summary, an independent assurance report, published security architecture, vulnerability-management evidence, existing policies, cloud-provider assurance documentation, or prior customer security reviews can all reduce duplicated work, provided they're actually relevant to what you're assessing.

<h3 id="certifications-are-evidence">Certifications are evidence, not the answer</h3>

"We're ISO 27001 certified" needs the same scrutiny covered in the [ISO 27001 article](/posts/iso-27001-for-soc-analysts/): the legal entity, the standard's edition, validity, the certification body, and critically, the scope. Does that scope actually include the service you're buying? For a genuinely low-risk supplier, the certificate alone might provide substantial reassurance. For a high-risk supplier holding privileged access, additional control evidence is often still appropriate on top of it.

<h3 id="soc2">SOC 2, briefly</h3>

Where a supplier offers a SOC 2 report, it can provide useful independent evidence about controls and, for a Type II report specifically, their operation over a stated period, typically somewhere between three and twelve months, assessed against the AICPA's Trust Services Criteria (Security is mandatory; Availability, Processing Integrity, Confidentiality and Privacy are added where relevant). A Type I report only covers design at a single point in time, a meaningfully weaker claim than Type II. Report scope, the period covered, any noted exceptions, and which criteria were actually included all matter; a report covering a different product line or a different time period than the one you care about isn't the evidence it might look like at first glance. [A Clean Opinion Is Not Zero Risk: How to Read a SOC 2 Report](/posts/how-to-read-a-soc-2-report/) goes considerably deeper into actually reading one properly.

<h3 id="pen-tests">Penetration tests</h3>

Don't stop at "do you perform annual penetration tests." Ask what was actually tested, application, infrastructure, APIs, cloud configuration; when; who performed it and how independent they were; what scope was covered and excluded; whether material findings were identified; whether they were remediated; and whether a retest confirmed that. A full report isn't always necessary, a credible summary or attestation can be proportionate depending on the risk involved. [Read the Scope Before the Findings: How to Review a Penetration Test Report](/posts/how-to-review-a-penetration-test-report/) covers actually reading one properly.

<h2 id="evidence-based-assessment">Evidence-based assessment</h2>

From here, the same chain from the [security assurance article](/posts/security-assurance-for-soc-analysts/) carries straight through: requirement, claim, evidence, validation, assessment, finding. Requirement: supplier privileged access must use individual identities and MFA. Claim: "all support administrators use MFA." Evidence: the account list, identity-provider settings, the support architecture, authentication logs, and any exception register. Then genuinely assess it, rather than accepting the claim at face value once evidence has been requested.

<h2 id="identity-and-privileged-access">Identity and privileged access</h2>

This deserves real depth in any supplier assessment. How do supplier staff actually authenticate: MFA, individual accounts, shared accounts, SSO, service accounts? Is privileged access handled differently from standard access? What does the joiner-mover-leaver process look like on the supplier's side? Are access reviews performed? What about emergency or break-glass access, remote support sessions, session recording, and does anything require your own organisation's approval?

A supplier saying "support access requires VPN MFA" can sound complete, until you learn that once connected, engineers actually use shared root credentials on the target system. That still creates accountability gaps, shared-credential risk, and a revocation problem, exactly the pattern in the flagship example below. Don't mark it "MFA compliant" and move on; MFA at one layer doesn't answer what happens at the next one.

<h3 id="privileged-remote-access-path">Trace the whole access path</h3>

```
Engineer → identity → MFA → VPN → jump host → privilege → production
```

At every single stage, ask: who is this? How were they authenticated? What privilege do they actually hold at this point? Was it approved? Is it logged? How long does it last? Can the session be traced afterward? Can access be revoked immediately if needed? That sequence of questions is a considerably more useful assessment than "does the supplier have PAM, yes or no."

<h2 id="logging-monitoring-incident">Logging, monitoring, incidents</h2>

Ask what's actually logged, who monitors it, how quickly, how long it's retained, and whether an incident could genuinely be reconstructed from it. Look specifically for a responsibility gap: the supplier monitors infrastructure, the customer assumes the supplier also monitors user-account misuse, the supplier assumes the customer handles that, and the result is that nobody actually does, precisely the assumed-responsibility failure mode covered in the assurance article's logging example, and one of the most common findings in supplier reviews generally.

For incident response, go past "do you have a plan." Ask who detects, who investigates, who actually notifies you, what triggers that notification, how quickly, who the contacts are, what information gets shared, what happens outside business hours, and whether exercises are actually performed rather than just documented. Keep supplier-internal escalation, customer notification, and any regulatory or privacy notification conceptually separate, since they can carry different triggers and timeframes; contractual notification terms matter here, and precise legal timeframes are a matter for legal and privacy specialists, not something to assert universally in a security review.

<h2 id="technical-domains">More technical domains</h2>

**Vulnerability management.** "Critical vulnerabilities are patched within 14 days" needs unpacking: what counts as critical, CVSS score, exploitability, internet exposure? Internal systems, cloud, containers, dependencies too, or just the obvious layer? How are exceptions handled, and what's scanner coverage actually like? Evidence: the policy, scanner coverage data, remediation metrics, a sample of tickets, and any exception records.

**Secure development**, for a supplier providing software or SaaS specifically: SDLC practices, code review, dependency management, secrets handling, testing, vulnerability handling, CI/CD security, change control, and software supply-chain awareness generally. Not every practice needs demanding from every vendor; match depth to what they actually provide and how much of it touches you.

**Data protection.** What data does the supplier actually hold, where, and who can reach it? How is it encrypted in transit and at rest, backed up, copied into test environments, exported, deleted, retained? A proper data-flow exercise often reveals copies, in support tooling, analytics platforms, or subcontractor systems, that a questionnaire alone would never surface. On location specifically, resist the simplistic "offshore equals insecure" instinct; the real question is what legal, privacy or contractual obligation actually attaches to that location, not the location itself.

**Backups and recovery.** "Backups are daily" invites: what's actually backed up, what's the retention, how are backups protected and isolated from the systems they back up, has a restore actually been tested, what are the stated RPO and RTO, who can delete a backup, and how resistant is the setup to a ransomware scenario specifically? Backup success is not recovery capability, a lesson worth repeating every time it comes up, because it keeps being the gap that gets missed.

**Business continuity.** A supplier can be genuinely cyber-secure and still represent serious operational concentration risk. What happens during a major outage? Is there an alternate region or site, or a single point of failure? Are there manual workarounds? What are the actual recovery targets, and have they been exercised?

<h2 id="fourth-party-and-concentration">Fourth parties and concentration</h2>

Your contract is with Supplier A. Supplier A relies on Supplier B, your **fourth party**, a cloud provider, outsourced support, a payment processor, an identity provider, a backup provider, a managed SOC, or a software component supplier. No direct contract with them doesn't mean no risk from them. Worth asking which subcontractors actually support the service, who handles your data, who holds privileged access, which dependencies are genuinely critical, how the supplier itself assesses those subcontractors, whether material changes get disclosed to you, and what happens if one of them fails. This doesn't mean demanding an exhaustive list of every minor dependency; focus on the ones capable of materially affecting confidentiality, integrity, availability or privileged access.

**Concentration risk** is worth understanding even though it's easy to overstate. Twenty suppliers might look individually acceptable, and still turn out that fifteen of them rely on the same cloud provider, or the same identity platform, or the same managed service underneath. Individually fine. Collectively, a single point of failure you didn't design for on purpose.

<h2 id="medconnect">The MedConnect scenario</h2>

The same fictional supplier used in the [ISO 27001](/posts/iso-27001-for-soc-analysts/) and [NZISM](/posts/nzism-for-security-practitioners/) articles, worked through the full supplier-assurance lifecycle this time. **MedConnect** runs a cloud patient portal, roughly 40,000 patients, sensitive health information, an API integration into internal health systems, hosted on AWS in Sydney, ISO 27001 certified, tier-2 support outsourced overseas, privileged remote access into production, and subcontractors involved in parts of the service.

<h3 id="medconnect-inherent">Inherent risk</h3>

Sensitive health information (data), an API integration plus privileged support access (access), a patient-facing critical service (availability), significant privacy exposure, meaningful fourth-party exposure through overseas support and subcontractors, and a dependency on AWS underneath all of it. Taken together, that reads as high inherent risk, worth stating plainly without needing to force it into a formal numeric score unless your own organisation's methodology actually defines one.

<h3 id="medconnect-existing">Existing assurance</h3>

MedConnect provides an ISO 27001 certificate, an annual penetration-test summary, a security policy, and an architecture diagram. Check the certificate the way the ISO article teaches: correct legal entity, current edition, still valid, and critically, does the stated scope actually cover the patient portal itself, and does it extend to the overseas support activity, or does it stop at the parent company's head office?

<h3 id="medconnect-access">Privileged access</h3>

MedConnect explains that support engineers connect through a VPN requiring MFA, use named support accounts rather than a shared one, request time-limited elevated production access through an approval workflow, have that access expire after four hours, and have their sessions logged. That's a genuinely reasonable design. It's still worth validating: the actual account inventory, the MFA configuration itself, how the approval workflow really works, the logs it produces, any exceptions to the process, and specifically whether subcontractor staff go through the identical path or something looser. None of this requires asking for raw production data as "evidence"; the account inventory, configuration exports and log samples answer the question without that.

<h3 id="medconnect-fourth-party">Fourth party: SupportCo</h3>

The overseas tier-2 support function is actually operated by a separate company, SupportCo. Worth asking specifically: what can SupportCo staff access, and what data? Under whose identities do they operate, MedConnect's own, or something separate again? How is their access reviewed? How does MedConnect itself assess SupportCo's security? What incident-notification obligation flows from SupportCo back to MedConnect, and then on to you? Are SupportCo's personnel actually inside MedConnect's ISO certification scope, or outside it? What happens to their access when a SupportCo staff member leaves? This is where fourth-party exposure stops being theoretical and becomes a specific, answerable set of questions.

<h3 id="medconnect-finding">A realistic finding</h3>

Say MedConnect reviews its support accounts annually. Given the privileged production access involved and realistic staff turnover in an outsourced support function, that cadence looks thin relative to the risk, though the exact "correct" frequency isn't something to assert as a universal rule. **Requirement:** privileged access should be reviewed at a frequency proportionate to its risk. **Observation:** support-account access reviews occur annually. **Evidence:** the review procedure and the two most recent completed reviews. **Finding:** given privileged production access and support-staff turnover, annual review may not be frequent enough to reliably catch role changes or departures in a timely way. **Risk:** a departed or role-changed support engineer could retain unnecessary privileged access for up to a year before it's caught. **Treatment:** increase review frequency, automate account expiry, add an event-driven review triggered by role changes or departures specifically, require customer approval for continued privilege, and strengthen ongoing monitoring in the meantime. **Residual risk:** assessed once whichever of those is actually implemented, and documented rather than assumed away.

<h2 id="findings-and-treatment">Findings and treatment</h2>

Write findings the way the assurance article teaches: not "supplier has poor access management," but "four privileged support accounts belonging to personnel who no longer provide support remain enabled in the production support environment," then explain why it matters.

Not every gap means rejecting the supplier. Options genuinely include remediating before onboarding, remediating after onboarding by an agreed deadline, applying compensating controls, changing the architecture, limiting access, adding a contractual condition, formally accepting the residual risk, or choosing a different supplier entirely. Treatment should match the risk, not default to the most dramatic option available.

Compensating controls have real limits worth stating honestly. If a supplier can't support your SSO immediately, named accounts, strong MFA, IP restriction, an approval step for privileged access, session logging, short-lived access windows and active alerting can genuinely reduce the interim risk. They don't automatically make the underlying gap acceptable on their own; the resulting residual risk still needs assessing on its own terms, not assumed away because a list of mitigations exists.

Reasons to escalate or block onboarding might include unacceptable residual risk, an inability to adequately protect highly sensitive data, uncontrolled privileged access with no realistic path to fixing it, no viable incident-notification mechanism, unresolved critical vulnerabilities, an inability to meet a mandatory legal or contractual requirement, material assurance evidence that simply isn't available, or unacceptable subcontractor exposure. But security's role is to explain the risk clearly, not to unilaterally decide the business outcome; the appropriate business or risk authority makes that call within the organisation's own governance.

Worth being careful with the phrase "security approved," too, since it implies a certainty assurance work rarely earns. Better: "based on the evidence reviewed, the identified security risks are assessed as [description]," and "these residual risks require acceptance by [the appropriate owner]." Precise, honest, and considerably more defensible later than a flat approval stamp.

<h2 id="contracts">Contractual controls</h2>

Contracts can meaningfully support assurance: security obligations, incident-notification requirements, breach cooperation, access requirements, subcontractor notification or approval rights, evidence and audit rights, vulnerability remediation expectations, data location, data deletion, termination and exit terms, continuity obligations, and notification of material security changes. This article isn't drafting legal clauses, that's legal and procurement specialists' territory; it's describing the security intent those clauses need to capture.

Worth being clear-eyed about the limits, too. A clause saying "MFA shall be used" is genuinely useful. It doesn't enforce MFA by itself; evidence still has to confirm it's actually happening. "Supplier must notify incidents within X hours" needs real processes and real contacts behind it, not just the sentence sitting in a document somewhere.

<h2 id="onboarding">Onboarding</h2>

Approval isn't the finish line. Before go-live, confirm the agreed treatments are actually complete, access is configured the way it was designed, logging is genuinely available, incident contacts are established on both sides, responsibilities are understood by the people who'll actually need to act on them, real data flows match what was documented during assessment, any outstanding risk has been formally accepted rather than quietly forgotten, and any required contractual or security schedule is actually signed. Otherwise the assessment document and the live implementation drift apart almost immediately.

**Shared responsibility** deserves particular attention for SaaS and cloud services. The supplier might secure the platform infrastructure while the customer remains responsible for user access, roles, tenant configuration, any customer-built integrations, and endpoint security on their own side. A supplier assessment should explicitly identify who does what, because a genuinely secure supplier can't compensate for an insecurely configured tenant on your end. A rough responsibility matrix, platform patching with the supplier, user provisioning with the customer, authentication shared between the two depending on the model, incident coordination shared, is a useful format, though the actual split varies by service and needs working out for the specific one in front of you. [Which Part? Cloud and SaaS Security Assurance](/posts/cloud-saas-security-assurance/) covers this specific problem in full depth.

<h2 id="ongoing-monitoring">Ongoing monitoring</h2>

Supplier risk doesn't freeze at the point of onboarding. A security incident, an acquisition, a new subcontractor, a new hosting region, an architecture change, a major product change, an expired certification, a new critical vulnerability, service expansion, growing data volume, or newly granted privileged access can all shift the picture meaningfully. Assessment-once-then-forget is how supplier risk quietly accumulates unnoticed.

Reassessment cadence should follow risk rather than a blanket rule; a high-risk supplier may genuinely warrant more frequent review, a low-risk one considerably less, or purely event-driven review. Track certificate expiry, scope changes, and certification-body changes for anything you're actually relying on, rather than discovering three years later that it lapsed unnoticed.

Treat a supplier's own incident as a real reassessment trigger, not just a "was our data involved" ticking exercise. Ask what control actually failed, whether your service could plausibly have been affected even if it wasn't this time, whether the architecture has changed since, what remediation followed, what the lessons learned actually were, whether this looks like a repeated weakness, and whether the residual risk picture genuinely needs updating as a result. An incident is real evidence about how well a supplier's controls actually work, considerably more informative than another round of self-attestation.

External security ratings and attack-surface monitoring tools are worth knowing about, and worth using with real limits in mind. They can surface exposed services, TLS issues, leaked credentials, DNS misconfiguration, and externally visible vulnerabilities. They can't see the internal access path, the account structure, or anything happening behind the perimeter, so an external score is a useful input, never a complete picture of supplier security posture on its own.

<h2 id="exit-and-offboarding">Exit and offboarding</h2>

Often forgotten entirely. When a supplier relationship ends: remove supplier accounts, revoke credentials and tokens, terminate VPN and other access, remove API keys, return or delete data, confirm that deletion actually happened where it matters, retain whatever records you're required to keep, migrate the service properly, remove integrations, update architecture documentation, transfer knowledge, and make sure continuity isn't quietly broken in the handover. A supplier relationship that's contractually over can still be a live risk if access or data quietly persists.

On data deletion specifically: ask what happens to production data, backups, logs, support copies, test environments, analytics extracts, and any subcontractor copies. Don't assume instant, total deletion is realistic; understand the actual process and its limits, including anything legal retention requirements genuinely prevent.

Worth a brief mention: suppliers sometimes introduce new subcontractors after onboarding without anyone noticing, these **shadow fourth parties**. Material changes are worth addressing through the contract or an ongoing process where it's proportionate; trying to govern every trivial dependency isn't, and isn't the point. Focus attention on subcontractors actually capable of materially affecting confidentiality, integrity, availability or privileged access.

<h2 id="questionnaires">Supplier questionnaires</h2>

Questionnaires exist for real reasons: standardisation, broad coverage, triage, and recordkeeping. Their weaknesses are just as real: ambiguous yes/no answers, self-attestation nobody's validated, stale responses that were accurate a year ago, questions irrelevant to the actual service, checkbox behaviour from both sides, and a huge evidence burden that produces volume rather than confidence. A questionnaire can support an assessment. It shouldn't be mistaken for the assessment itself.

<h3 id="better-questions">Ask for outcomes, not yes or no</h3>

Instead of "do you have an incident response plan," ask the supplier to describe how customer-impacting security incidents are actually identified, escalated and communicated, including any testing performed in the last twelve months. Instead of "are backups encrypted," ask how backups containing customer data are actually protected from unauthorised access and deletion. That said, closed questions still earn their place for triage and gating, "does this service store our restricted data" genuinely determines whether a deeper assessment is even warranted, and doesn't need to be open-ended to do that job.

An illustrative evidence-request matrix, examples only, not a mandatory list for every supplier: identity claims are supported by configuration exports, account inventories and logs; vulnerability-management claims by policy, scanner metrics and remediation records; incident-response claims by the plan itself, exercise records and the process description; backup claims by job records and an actual restore test; certification claims by the certificate and its scope; and subcontractor-management claims by the supplier's own subcontractor assessment process. [Not the Assessment Itself: How to Design a Supplier Security Questionnaire](/posts/supplier-security-questionnaires/) goes considerably deeper into actually building this well.

<h3 id="cant-share">"We can't share that"</h3>

Don't treat this as an automatic failure. Real alternatives exist: redacted evidence, a screen share instead of a document handover, reference to independent assurance already performed, a management attestation, the relevant certification report, a summary of findings rather than the full detail, or a live walkthrough. The real question is whether the alternative provides enough confidence for the actual risk involved. If it doesn't, record that limitation honestly, it may genuinely affect the residual-risk conclusion, rather than pretending the gap in evidence didn't happen. An NDA can open more doors, but it doesn't dissolve every legitimate constraint a supplier has around other customers' data, security-sensitive detail, or their own proprietary systems; ask for the minimum evidence that actually answers the question.

<h2 id="running-the-assessment">Running the assessment</h2>

A conversation reveals architecture faster than a form ever will. Start with something like "can you walk me through the service and how our data actually flows through it," then "how do support personnel access production," and follow the evidence from there, rather than opening with "question one of two hundred and eighty-seven."

Follow the thread the way an investigation does. Supplier: "only authorised support staff access production." You: how are they authorised? "Through our ticket system." Who approves the tickets? How long does access actually last once granted? How is it technically enforced, not just described? How is the activity logged? What happens when someone leaves the support team? Each answer earns the next question; this is assurance investigation, not a form to complete.

And know where to spend the time. If a supplier has sensitive data, privileged remote access, and material subcontractors, that's where the real risk concentrates, so that's where the depth should go. Don't spend thirty minutes debating a screen-lock timeout setting while a shared production admin account sits unexamined in the same review. Risk should be what decides where your attention actually goes.

<h2 id="security-vs-business-decision">Security vs business decision</h2>

A supplier has one genuine security gap. Fixing it is expensive. Switching suppliers means a six-month delay to a business initiative. Security's job here is to lay out the gap, the resulting risk, the available compensating controls, the realistic treatment options, and the residual risk each one leaves behind. The actual decision belongs to the business or risk owner with the authority to own that consequence, not to security alone. That handoff, done cleanly, is what mature supplier assurance actually looks like.

Risk acceptance should be documented properly when it happens: the risk itself, the rationale, the named owner, a duration or review point, any compensating controls relied on, and the conditions attached. "We accepted that years ago" shouldn't be allowed to quietly become permanent, invisible technical debt nobody ever revisits. Where a risk is accepted temporarily while remediation is genuinely underway, for example a legacy supplier that can't support SSO until a specific quarter, giving that acceptance an explicit expiry or review date, rather than leaving it open indefinitely, is good practice worth adopting even where it isn't formally mandated.

<h2 id="soc-to-supplier-assurance">From SOC to supplier assurance</h2>

<div class="table-scroll">

| SOC question | Supplier assurance equivalent |
| --- | --- |
| What happened on this endpoint? | How does privileged support actually work? |
| Show me the logs. | Show me evidence the control actually operates. |
| What else could be affected? | What systems or data can this supplier reach? |
| What's the blast radius? | What's the inherent risk? |
| Containment. | Risk treatment. |
| Post-incident review. | Remediation and reassessment. |

</div>

Tying the whole series together in one line: CIS helps identify practical safeguards worth checking for. NIST frames the cybersecurity outcomes a supplier relationship should actually achieve. ISO 27001 can provide independent assurance and management-system context behind a supplier's own claims. NZISM shapes detailed requirements where NZ Government environments are involved. Security assurance is the reasoning method underneath all of it. Supplier assurance is that same method, aimed outward at organisations you don't control.

<h2 id="interview-questions">Interview questions</h2>

**"How would you assess a new high-risk supplier?"** Understand the service, data, access and dependencies first. Determine inherent risk. Identify the requirements that genuinely apply. Review whatever independent assurance already exists. Request targeted evidence rather than everything available. Validate the controls that actually matter. Document findings precisely. Assess residual risk. Agree remediation or compensating controls. Escalate for authorised acceptance where the risk warrants it. Contract and onboard. Then monitor and reassess over time, not just once.

**"What would you do if a supplier refused to remediate?"** Understand their reason first. Revisit the actual risk. Consider an alternative control or architecture change. Consider limiting access instead of demanding the original fix. Negotiate a proportionate treatment. Document the resulting residual risk honestly. Escalate to the authorised risk owner. Consider another supplier only if the risk genuinely remains unacceptable after all of that.

**"Would ISO 27001 certification be enough?"** Depends on the inherent risk, the certificate's actual scope, its relevance to the service being procured, and whatever additional evidence that risk level genuinely warrants. Never a simple yes or no on its own.

<h2 id="practical-exercises">Practical exercises</h2>

**Exercise 1, tier the suppliers.** Supplier A: a marketing survey platform, no internal integration, only email addresses involved. Supplier B: payroll SaaS, holding employee identity, bank and tax information, connected via SSO. Supplier C: a managed network provider with privileged remote access to firewalls and core network infrastructure. Which deserves the deepest assurance, and why? Don't reduce this to data sensitivity alone, Supplier C may represent the largest access and availability risk of the three despite touching the least "sensitive" data on paper.

**Exercise 2, the ISO certificate.** A supplier's certificate scope reads "operation of corporate information technology systems at the Auckland head office." The service actually being purchased is a cloud-hosted medical platform run from Australia. Does the certificate automatically cover it? It doesn't, work out why in your own words before reading back through the certificate-scope section above.

**Exercise 3, privileged access.** A supplier answers "yes, MFA is enabled." Further evidence shows the VPN requires MFA, but the production administrator account itself is shared. What's genuinely working here? What's still weak? What evidence would you ask for next, and what treatment would you propose?

**Exercise 4, incident response.** A supplier has a documented incident response plan, but the contract contains no customer-notification requirement at all. What risk does that create, and what needs clarifying? Don't attempt to propose legal wording, that's not the point of the exercise.

**Exercise 5, backups.** A supplier performs daily backups but has never run a full service recovery test. What does the existing evidence actually establish? What genuinely remains unknown?

**Exercise 6, fourth party.** A supplier hosts on AWS and separately uses an offshore MSP with administrative access into their environment. Which one deserves deeper assessment? Likely both, but for different reasons, work through what those reasons actually are before moving on.

<h2 id="self-test">Mini self-test</h2>

1. What's the difference between inherent and residual risk?
2. Why should supplier assessment begin with understanding the service?
3. Why shouldn't every supplier get the same questionnaire?
4. What does an ISO certificate prove, and not prove?
5. Why does certification scope matter?
6. What is a fourth party?
7. Why does privileged supplier access matter so much?
8. Does VPN MFA eliminate the risk of a shared admin account downstream?
9. What does backup success actually prove?
10. Why should incident notification terms be considered specifically?
11. What is proportionate assurance?
12. Who should accept significant residual supplier risk?
13. Does "security approved" mean a supplier is safe?
14. Why does supplier assurance continue after onboarding?
15. What should happen when a supplier relationship ends?

<details>
<summary>Worked answers</summary>

**1.** Inherent risk exists before controls are considered; residual risk is what's left once relevant controls and treatment have actually been applied.

**2.** Because the same supplier can deliver services of wildly different risk, and the service, not the supplier's size or reputation, determines what assessment depth is actually needed.

**3.** Because assurance depth should scale with inherent risk; identical treatment for every supplier wastes effort on low-risk ones and under-serves high-risk ones.

**4.** It proves an independent process assessed the ISMS against the standard within a defined scope. It doesn't prove every system is secure, or that the specific service you're buying is even covered.

**5.** Because a certificate only speaks for what it actually covers; a service outside the stated scope gets no assurance from it at all.

**6.** A supplier's own supplier or subcontractor, one you have no direct contract with but who can still touch your data, systems or service availability.

**7.** Because it's frequently where the largest, least visible risk actually concentrates, and because attribution and revocation both depend on how it's structured.

**8.** No, MFA at the VPN layer only identifies who reached the network; a shared account beyond that point still breaks individual attribution.

**9.** That the backup job completed. Nothing about whether recovery actually works until a restore has been tested.

**10.** Because a supplier having an internal incident process doesn't guarantee you'll actually be told anything, in what timeframe, or with what detail, unless that's separately established.

**11.** Assurance depth that scales with inherent risk rather than applying the same evidence burden to every supplier regardless of what they actually do.

**12.** An authorised business or risk owner, not the analyst who performed the assessment.

**13.** No, it should mean the identified risks were assessed and communicated, with any residual risk requiring acceptance by an authorised owner, not a blanket guarantee.

**14.** Because supplier risk changes over time, incidents, acquisitions, new subcontractors, architecture changes, and a one-off assessment goes stale.

**15.** Access and credentials revoked, data returned or deleted, integrations removed, and continuity confirmed, so the supplier stops being a live risk once the relationship itself has ended.

</details>

<h2 id="common-mistakes">Common mistakes</h2>

"The questionnaire was completed, so we're done." No, a completed form isn't validated evidence. "They have ISO 27001, so they're safe." No, check the scope and the risk first. "No ISO certificate means the supplier is insecure." No, plenty of genuinely well-run suppliers simply haven't pursued certification. "Every supplier needs the same evidence." No, risk should determine depth. "We outsourced it, so the supplier owns the risk." No, the consequence generally still lands on you. "The supplier uses AWS, so AWS handles security." Too simplistic, shared responsibility still applies. "MFA means privileged access is secure." Not necessarily, trace the whole path. "They have backups, so recovery is covered." No, for the reason covered above. "They passed last year, so no need to reassess." Not necessarily, risk changes. "No evidence means the control definitely doesn't exist." Not necessarily, but it does limit how much confidence you can honestly claim. "We found a gap, therefore reject the supplier." Not automatically, treatment has options short of rejection. "Security decides whether the business can accept the risk." No, that authority sits with an appropriately authorised business or risk owner.

<h2 id="nz-context">NZ context</h2>

Worth a brief, appropriately careful note for New Zealand readers specifically. Supplier arrangements involving personal information sit within the Privacy Act's information privacy principles, and health information specifically carries its own rules under the Health Information Privacy Code, both of which may create additional obligations around a supplier relationship beyond pure cybersecurity considerations. Where a NZ Government agency or a supplier to one is involved, [NZISM](/posts/nzism-for-security-practitioners/) requirements may flow through into what's contractually expected. None of this is legal advice, and where privacy or legal obligations materially shape a supplier decision, involving appropriate legal or privacy expertise directly is worth doing rather than treating a security assessment as a substitute for it.

<h2 id="conclusion">The point</h2>

A stack of supplier documents, an ISO certificate, a penetration-test summary, a completed questionnaire, isn't assurance by itself. It's raw material. The actual assurance work is asking what inherent risk this supplier genuinely presents, requesting evidence proportionate to that risk rather than everything available, validating what that evidence actually shows rather than what it's claimed to show, writing findings precisely enough that someone else could follow the reasoning, and making sure the resulting residual risk lands with someone who actually has the authority to own it.

That's the same discipline as an incident investigation, aimed at a different, quieter kind of question: not "what happened," but "is this actually true, for this supplier, right now." The supplier doesn't need to disappear the moment a gap turns up, and the certificate doesn't need to settle the question on its own either. What settles it is the evidence, read carefully, by someone willing to ask what it actually proves.
