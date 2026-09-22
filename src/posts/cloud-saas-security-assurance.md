---
title: "Which Part? Cloud and SaaS Security Assurance"
date: 2026-10-04
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "cloud-security"
  - "supplier-assurance"
  - "security-assurance"
  - "risk-management"
  - "field-guide"
seoTitle: "Cloud and SaaS Security Assurance | Jason Hill"
description: "A practical guide to cloud and SaaS security assurance: shared responsibility across customer, SaaS provider and cloud provider, why capability isn't configuration, and how to find the gap where nobody actually monitors the thing everyone assumed someone else was watching."
coverImage: "cloud-saas-assurance-cover.svg"
coverImageAlt: "Terminal-style illustration of three stacked layers, customer, SaaS provider and cloud provider, connected vertically to show responsibility distributed across layers."
---

A supplier says: "our platform runs in AWS, so infrastructure security is handled by AWS." True, as far as it goes. Then keep asking. Who manages application authentication? Who creates the IAM roles? Who configures the storage permissions? Who patches the application itself? Who monitors the logs? Who reviews privileged access? Who handles backups? Who responds if a tenant account gets compromised? AWS secures the underlying infrastructure. It does not configure the supplier's application securely on their behalf, and it never claimed to.

Extend the same logic one layer up. The SaaS provider may genuinely secure its own platform well. Your organisation can still be entirely responsible for tenant administrators, user provisioning, SSO configuration, role assignment, data sharing settings, integrations, API tokens, and the endpoints your own staff use to reach the service. "The cloud provider secures it" and "the customer is responsible for everything" are both wrong in the same way: they collapse a genuinely layered problem into a single sentence.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

For every important control, ask three separate questions: who designs it, who operates it, and who configures it? Sometimes all three are the same party. Very often they're not, and the gap between them is exactly where cloud assurance failures actually live.

</div>

This continues directly from [Third-Party Cyber Risk and Supplier Assurance](/posts/supplier-security-assurance/), [Supplier Security Questionnaires](/posts/supplier-security-questionnaires/), [How to Read a SOC 2 Report](/posts/how-to-read-a-soc-2-report/) and [How to Review a Penetration Test Report](/posts/how-to-review-a-penetration-test-report/), applying the same evidence discipline to services that don't sit inside a single organisation's own walls at all.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#shared-responsibility">Shared responsibility</a></li>
<li><a href="#saas-paas-iaas">SaaS vs PaaS vs IaaS</a></li>
<li><a href="#three-questions">Design, operate, configure</a></li>
<li><a href="#inherited-controls">Inherited controls</a></li>
<li><a href="#understand-the-service">Understand the service</a></li>
<li><a href="#tenant-responsibilities">Tenant responsibilities</a></li>
<li><a href="#identity">Identity</a></li>
<li><a href="#privileged-supplier-access">Privileged supplier access</a></li>
<li><a href="#logging-and-monitoring">Logging and the responsibility gap</a></li>
<li><a href="#detection-and-response">Detection and incident response</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#vulnerability-and-development">Vulnerabilities and secure development</a></li>
<li><a href="#encryption-and-keys">Encryption and keys</a></li>
<li><a href="#data-location">Data location and residency</a></li>
<li><a href="#fourth-parties-cloud">Fourth parties</a></li>
<li><a href="#availability-and-recovery">Availability and recovery</a></li>
<li><a href="#certifications">Certifications and independent assurance</a></li>
<li><a href="#customer-configuration-review">Reviewing your own tenant</a></li>
<li><a href="#shadow-saas">Shadow SaaS</a></li>
<li><a href="#contract-and-exit">Contract terms and exit</a></li>
<li><a href="#medconnect">The MedConnect scenario</a></li>
<li><a href="#review-workflow">A reusable review workflow</a></li>
<li><a href="#practical-exercises">Practical exercises</a></li>
<li><a href="#interview-questions">Interview questions</a></li>
<li><a href="#common-misunderstandings">Common misunderstandings</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="shared-responsibility">Shared responsibility</h2>

Cloud security responsibility is genuinely divided among parties, and exactly how it's divided depends on the service model, the specific provider, the actual architecture, the contract, and how the service happens to be configured. "The provider secures the cloud, the customer secures what's in the cloud" is a reasonable starting intuition and a genuinely incomplete description on its own; AWS's own official framing is close to this, "security **of** the cloud" as AWS's responsibility versus "security **in** the cloud" as the customer's, but the exact boundary still shifts meaningfully by service, and Microsoft's own model states plainly that across every deployment type, SaaS included, the customer always owns their data and identities regardless of anything else that shifts. Treat any single provider's diagram as illustrative of the general idea, not as a universal map that applies identically everywhere.

There's also often more than two parties in the picture at all:

```
CUSTOMER
   ↓
SAAS PROVIDER
   ↓
CLOUD PROVIDER
   ↓
OTHER SUBSERVICE PROVIDERS
(identity provider, backup provider, support MSP, CDN, email provider, security provider)
```

Real cloud assurance work is answering, for each layer: what service are we actually using, what data does it handle, which party controls each security-relevant layer, what stays with us, what belongs to the supplier, what does the supplier itself rely on the cloud provider for, which controls depend on configuration rather than being built in, what evidence shows those controls actually work, and what risk remains if any one party in the chain fails.

<h2 id="saas-paas-iaas">SaaS vs PaaS vs IaaS</h2>

**IaaS** leaves the customer controlling more: operating systems, applications, identities, network configuration, and workload security generally, while the provider handles the physical infrastructure and the underlying compute, storage and network platform. **PaaS** shifts platform and runtime responsibility onto the provider, while the customer still owns the application, identity, data, and configuration built on top of it. **SaaS** has the provider operating most of the application stack, with the customer typically still responsible for users, roles, tenant configuration, how data actually gets used, and any integrations layered on top.

<div class="table-scroll">

| Layer | On-prem | IaaS | PaaS | SaaS |
| --- | --- | --- | --- | --- |
| Physical | You | Provider | Provider | Provider |
| Hypervisor / platform | You | Provider | Provider | Provider |
| Operating system | You | You | Provider | Provider |
| Runtime | You | You | Provider | Provider |
| Application | You | You | You | Provider |
| Configuration | You | You | You | Shared |
| Identity | You | You | You | Shared |
| Data | You | You | You | Shared |
| User access | You | You | You | You |

</div>

A simplified conceptual model, not a control matrix to apply blindly to a specific provider or product; always verify against that provider's own current documentation. The point it illustrates: as more of the stack becomes managed, responsibility doesn't disappear, it shifts upward toward configuration, identity and data, which is exactly why identity and tenant configuration end up mattering so much for SaaS specifically, covered in depth further down.

<h2 id="three-questions">Design, operate, configure</h2>

For any control worth caring about, ask who designed it, who operates it day to day, and who actually configures it, because these are frequently three different parties. MFA is the clean example: the supplier designs and provides the feature; the customer configures and enables the actual policy; the identity provider enforces authentication at the point of login; and the customer still owns and manages the underlying user population the policy applies to. Assurance needs to cover the whole chain, not just whichever link happens to be easiest to ask about.

This is where **capability** and **configuration** need holding firmly apart. "Our platform supports MFA" does not mean MFA is enabled for your specific tenant. "Our platform supports audit logging" does not mean logging is actually turned on, that it captures the events that matter, that retention is sufficient, or that anyone is actually watching it. Capability, configuration and operation are three separate claims, and a supplier answering only the first one hasn't actually answered the question you were asking.

<h2 id="inherited-controls">Inherited controls</h2>

A SaaS provider commonly **inherits** controls from its own cloud provider, physical security, underlying data-centre resilience, hypervisor-level controls, and can reasonably rely on that provider's own independent assurance for them rather than re-proving them from scratch. Recognising inherited controls properly is what keeps assurance efficient: there's no need to ask a SaaS supplier to reassess AWS's physical data-centre security when AWS's own credible, independent assurance already covers exactly that.

But inherited control does not mean inherited security. A cloud provider can have genuinely excellent physical security, and the supplier built on top of it can still expose a storage bucket publicly, misconfigure IAM, leak an API key, leave an old admin account active, fail to patch its own application, or fail to monitor authentication activity at all. Strong lower-layer security from the cloud provider cannot compensate for a weak upper-layer implementation the supplier is fully responsible for, and assuming otherwise is one of the more common and more consequential mistakes in cloud assurance.

<h2 id="understand-the-service">Understand the service</h2>

Before reviewing any control, establish what the service actually is: SaaS, a hosted application, a managed platform, or raw cloud infrastructure; what business function it serves; what data it touches; who actually uses it; what it integrates with; and how critical it genuinely is. This is the same inherent-risk discipline covered in the [supplier assurance article](/posts/supplier-security-assurance/), applied specifically to cloud and SaaS.

Drawing the actual data flow tends to surface assurance questions faster than any list of questions could on its own:

```
EMPLOYEE → identity provider → SaaS application → cloud application layer → database → backup service

SUPPORT ENGINEER → supplier identity → PAM / VPN → production support access

SAAS APPLICATION → third-party email provider
```

For every stage: what data moves through it, where does it actually sit, who can reach it, how is that access authenticated, how is it protected, how is it logged, how long is it retained, and which third party, if any, is actually involved at that step? Data copies specifically deserve real attention: a customer often assumes their data lives only in the primary SaaS database, when material copies can also exist in backups, logs, analytics platforms, support tickets, test environments, data warehouses, email, or subprocessor systems nobody thought to ask about.

<h2 id="tenant-responsibilities">Tenant responsibilities</h2>

For most SaaS, the customer directly configures a meaningful set of security-relevant settings: SSO, MFA, user provisioning, administrator roles, session settings, external sharing, data retention, integrations, API keys, audit logging, security alerting, encryption options, and external collaboration, though not every SaaS product offers every one of these, and it's worth checking rather than assuming.

A provider can be genuinely secure while a specific customer's own tenant is genuinely insecure. Microsoft 365's underlying platform can carry strong controls, and a customer can still grant excessive Global Administrator roles, leave MFA disabled, permit risky legacy authentication protocols, misconfigure external sharing into oversharing, and ignore the security alerts the platform is actively generating. Provider assurance and tenant assurance are different layers, and a strong answer at one doesn't imply anything about the other.

This distinction matters directly in supplier assurance conversations. If a customer tenant has no MFA enabled, and the supplier's platform genuinely supports MFA, and the customer simply never turned it on, that gap belongs to the customer, not the supplier, and mischaracterising it as a supplier failing does nobody any favours.

<h2 id="identity">Identity</h2>

Cloud security depends on identity more heavily than almost anything else, which makes it worth the deepest attention in any cloud assurance review. Worth establishing: SSO and federation, MFA, whether local accounts still exist alongside SSO, dedicated administrator accounts, break-glass access, service accounts, API credentials and other machine identities, the joiner-mover-leaver process, privileged access specifically, and whether access reviews actually happen.

A SaaS platform integrated with SSO sounds settled, until you ask whether local accounts remain possible alongside it anyway, for emergency administration, supplier support, service integrations, or API users, any of which can quietly bypass the central identity controls everyone assumed were mandatory. Break-glass accounts aren't automatically a problem, they're often genuinely necessary, but they warrant their own questions: how are they protected, how are they monitored, when were they last tested, who's actually able to use them, where are the credentials stored, do they trigger alerts when used, and are they reviewed?

Service accounts, API keys, OAuth applications, tokens, secrets and certificates deserve the same scrutiny SOC analysts already apply to them in incident work: what privilege does each one actually carry, does it expire, is it rotated, where is it stored, who owns it, is it monitored, and is it actually removed when no longer needed? Where SaaS ecosystems allow third-party OAuth applications to gain access, worth asking who approves those grants, what scopes they carry, how they're reviewed afterward, and how they get revoked, without needing to turn this into an OAuth technical tutorial to make the point.

<h2 id="privileged-supplier-access">Privileged supplier access</h2>

Supplier administrators frequently have some form of access into customer environments or customer data, and this deserves its own dedicated line of questioning: who has it, why, is it standing or genuinely temporary, tied to individual identities, protected by MFA, subject to approval, granted just-in-time, logged, session-recorded, dependent on customer consent, extended to support subcontractors, and properly revoked through a real leaver process?

The single most important underlying question: can supplier support staff actually see customer data, and if so, under what conditions, never at all, only metadata, only with explicit customer approval, only for specific support roles, or effectively any administrator who wants to? Don't assume "data is encrypted at rest" answers this. Encryption at rest protects against certain storage-level risks; it does nothing to stop an authorised application process or an administrator from viewing decrypted data through the normal application interface, since that's exactly what the application and its administrators are meant to be able to do. Encryption is not a substitute for access control, and conflating the two is a genuinely common assurance mistake.

<h2 id="logging-and-monitoring">Logging and the responsibility gap</h2>

Logging responsibility splits across layers cleanly enough to be worth stating explicitly: the **cloud provider** may expose platform or control-plane logs; the **supplier** generates application and security logs; the **customer** is responsible for tenant-specific monitoring on top of both. Worth asking directly: who actually sees what, and who actually monitors what, as two genuinely separate questions.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

The supplier monitors infrastructure. The customer assumes the supplier also monitors customer-account compromise. The supplier assumes the customer handles that. Nobody actually monitors it. This exact assumed-responsibility gap is one of the single most common, and most consequential, findings in cloud and SaaS assurance, and it only ever gets caught by someone explicitly asking who's actually watching, rather than assuming.

</div>

Worth checking specifically whether the customer can actually access authentication logs, administrative event logs, API usage, data export activity, permission changes, and support access records, and whether any of it can genuinely integrate into your own SIEM rather than sitting locked inside the supplier's own console. Retention gaps are common and easy to miss: a supplier's 30-day default against an investigation need running to 180 days leaves a real gap, addressed through premium retention tiers, export, SIEM ingestion, an archiving arrangement, or, honestly, a documented accepted risk, without treating any specific retention period as a universal requirement.

<h2 id="detection-and-response">Detection and incident response</h2>

Ask who actually detects infrastructure compromise, an attack on the SaaS platform itself, a compromised tenant user account, an abusive supplier administrator, and a customer-side misconfiguration, then ask who actually responds to each. An illustrative responsibility matrix, built for a specific fictional service, not universal:

<div class="table-scroll">

| Incident type | Supplier | Customer |
| --- | --- | --- |
| Cloud infrastructure compromise | X | |
| SaaS application attack | X | |
| Compromised customer user account | | X |
| Abusive supplier privileged admin | X | |
| Customer misconfiguration | | X |
| Cross-tenant breach | X | X |
| Customer data breach | X | X |

</div>

Worth establishing in advance, not discovering mid-incident: what actually triggers supplier notification to you, how does it happen, which contacts receive it, does it work outside business hours, what evidence or information actually gets shared, and what timeline does the contract actually commit to, without assuming any specific notification window as a universal industry standard.

<h2 id="vulnerability-and-development">Vulnerabilities and secure development</h2>

Responsibility here tracks the service model directly: for IaaS, the customer typically patches the operating system and workloads; for SaaS, the supplier generally patches the application and platform, while the customer may still own integrations, endpoints, any custom code, and connectors built on top. Worth establishing exactly where that boundary actually sits for the specific service in front of you.

For a SaaS supplier who builds their own software, secure development practices are worth assessing where risk warrants it: code review, dependency management, change control, secrets handling, testing, penetration testing, and how security defects actually get handled, reusing independent assurance evidence wherever it's already available rather than duplicating the request.

On cloud configuration specifically: worth understanding how the supplier actually identifies insecure cloud configuration, public storage, excessive IAM permissions, exposed management interfaces, insecure secrets, missing logging, without needing to prescribe a specific tool like a CSPM platform, continuous scanning, or infrastructure-as-code; the outcome matters more than the mechanism. How does the supplier find these issues, and how are high-risk findings actually handled once found?

<h2 id="encryption-and-keys">Encryption and keys</h2>

Ask about encryption in transit, encryption at rest, key management, and backup encryption as genuinely separate questions rather than one blended "do you encrypt data" answer. On key management specifically: who actually controls the keys, how are they protected, how are they rotated, who can access them, and what happens to them on contract termination, without needing to turn this into a cryptography tutorial to establish the basics.

Some cloud services offer customer-managed encryption keys, which can change the access-control picture, the termination process, relevant regulatory considerations, and where operational responsibility actually sits. Worth knowing this cuts both ways: customer-managed keys shift real responsibility onto the customer too, and losing a customer-held key can itself create a genuine availability risk, not just a security improvement.

<h2 id="data-location">Data location and residency</h2>

Worth being precise rather than using "data location," "data residency" and "data sovereignty" interchangeably where a source actually distinguishes them; check the terminology a specific authoritative source uses before treating them as synonyms. Ask where primary data actually sits, where backups sit, where logs sit, where support access originates from, where subprocessors operate, and where disaster-recovery data lives, since these can genuinely differ from each other even within the same service.

"Hosted in Sydney" describes the primary hosting region. It says nothing on its own about global support access, a CDN provider, an email delivery service, an analytics platform, or a backup provider that might sit entirely outside that region. Understand the full data flow before treating a single region name as the complete answer.

For New Zealand readers specifically: personal information sent to an overseas recipient sits within the Privacy Act 2020's Information Privacy Principle 12, which broadly requires reasonable grounds to believe the receiving party will protect that information to a standard comparable to the Act itself, commonly satisfied through the receiving organisation being independently subject to the Act, appropriate contractual safeguards, or comparable overseas privacy law, with informed consent as a fallback where none of those apply. Where a NZ Government context is involved, [NZISM](/posts/nzism-for-security-practitioners/) carries its own relevant cloud material worth reading directly. None of this is legal advice, and where privacy obligations materially shape a cloud or SaaS decision, involving legal or privacy expertise directly is worth doing rather than treating this paragraph as sufficient on its own.

<h2 id="fourth-parties-cloud">Fourth parties</h2>

Cloud and SaaS relationships routinely involve chains longer than two parties: customer, SaaS provider, cloud provider, a support MSP, an email provider, a monitoring provider, potentially several layers deep. Not every dependency deserves equal scrutiny; focus on the ones capable of material data access, material processing, or a genuinely critical availability dependency, exactly the materiality principle covered in the [supplier assurance article](/posts/supplier-security-assurance/). Worth asking how material subprocessor changes actually get communicated, and whether the contract addresses new subprocessors being introduced at all, without attempting to draft the actual legal wording here, that's legal and procurement territory.

<h2 id="availability-and-recovery">Availability and recovery</h2>

A 99.9% availability SLA is a service commitment, not a security or resilience claim on its own; it says nothing about the underlying architecture, region redundancy, dependency chains, failover design, DDoS resilience, or actual recovery capability, and it certainly doesn't prove successful recovery from something like ransomware or data corruption is possible, a genuinely different question from uptime.

Backup responsibility needs real clarity rather than the blanket assumption that "SaaS providers don't back up your data," which is too broad to be useful either way. A SaaS provider may back up the platform itself while offering the customer no way to restore a single deleted record, recover an entire corrupted tenant, or reverse maliciously encrypted data, platform disaster recovery and granular customer-level restore are genuinely different capabilities, and a provider can offer one without the other. Worth understanding, in concrete operational terms, what "backup" actually means for this specific service: what's covered, what recovery point objective and recovery time objective actually apply, and, critically, whether restoration has ever actually been tested rather than merely assumed to work because the backup job reports success, the same backup-success-is-not-recovery-capability lesson from the [control testing](/posts/security-control-testing/) and [supplier assurance](/posts/supplier-security-assurance/) articles. Where the platform offers customer-side export instead of or alongside backup, worth checking whether that export genuinely supports recovery, migration, exit and continuity, or whether it's really only useful for reporting.

<h2 id="certifications">Certifications and independent assurance</h2>

A supplier may offer ISO 27001, SOC 2, cloud-provider certifications, or CSA-related material. Use all of it as genuine evidence, and check its scope, the certified entity, the specific service covered, relevant dates, any exceptions, and what customer responsibilities it explicitly assumes, rather than simply counting how many badges appear on the page.

A crucial nuance: AWS holding its own certifications does not automatically certify the supplier's application built on top of it, and Microsoft's own certifications and assurance don't automatically prove your specific tenant is configured correctly either. Trace the actual scope of any certificate before assuming it covers what you actually need it to cover.

This is exactly where [SOC 2](/posts/how-to-read-a-soc-2-report/) evidence earns its keep in cloud assurance specifically: examine the subservice organisations named, the CUECs assumed of you as the customer, the system's actual scope, any noted exceptions, and cloud-specific dependencies covered or excluded. [ISO 27001](/posts/iso-27001-for-soc-analysts/) evidence should get the same scope discipline: check the certified entity, the actual service, whether cloud operations are genuinely included, and where support locations sit, since a certificate scoped to head-office IT tells you very little about a cloud-hosted product built somewhere else entirely.

Where current and appropriate, Cloud Security Alliance material, the Cloud Controls Matrix and CAIQ, can support cloud-specific assurance work: CAIQ is generally free for non-commercial use and publication to CSA's STAR registry, with CCM v4.1 as the current control catalogue behind it and CCM-Lite/CAIQ-Lite offering a reduced set, the same terminology covered in more depth in the [supplier questionnaire article](/posts/supplier-security-questionnaires/). Useful as a starting reference, not automatically sufficient for every supplier or every risk on its own.

<h2 id="customer-configuration-review">Reviewing your own tenant</h2>

Supplier assurance asks whether the provider is controlling its own responsibilities properly. **Tenant assurance** asks a genuinely different question: have we ourselves configured this service securely? MFA enforcement, administrator role assignment, guest and external access, data sharing settings, logging configuration, integrations, retention settings, and API permissions all belong squarely in this second, internally-facing review, and both reviews are usually necessary; a strong supplier assessment doesn't substitute for checking your own side of the boundary. Vendor-published security guidance, and CIS Benchmarks where one genuinely exists for the specific platform, can help establish a sensible configuration baseline, though it's worth verifying a Benchmark actually exists for a given product before assuming one does; not every SaaS platform has one.

<h2 id="shadow-saas">Shadow SaaS</h2>

Employees routinely adopt SaaS tools without any formal assessment ever happening, creating real risk through data leakage, uncontrolled identities, unknown integrations, no defined exit process, and no logging whatsoever. A mature cloud assurance programme needs some form of discovery and governance process to actually find this activity, not just assess the suppliers that arrived through a formal procurement process.

A related, easy-to-miss variant: even without any new SaaS contract existing at all, a user can authorise a third-party application against Microsoft 365, Google Workspace, GitHub, or a similar platform through OAuth, granting that application genuine supplier-like access without procurement, security, or anyone else formally reviewing it. Worth treating this as its own category of shadow integration risk, kept entirely at a defensive, governance level rather than technical exploitation detail.

<h2 id="contract-and-exit">Contract terms and exit</h2>

Contract terms should reflect the same security intent covered throughout this article: incident notification, data handling, subprocessor disclosure, expected security controls, assurance and audit rights, deletion obligations, exit terms, and continuity expectations. This article isn't drafting legal clauses, that's legal and procurement territory, it's describing the security outcomes those clauses need to actually capture.

Exit deserves a genuinely strong section on its own, since it's routinely the most neglected part of the whole relationship. When it ends: disable users, revoke SSO trust, revoke API tokens, remove integrations, delete data, resolve what happens to existing backups, export whatever data is actually required, revoke supplier access entirely, remove any OAuth application grants, update DNS where relevant, and confirm subprocessors no longer retain data where that's actually required. Worth asking before signing up in the first place, not after: can we actually leave this service if we need to? Proprietary export formats, enormous data volumes, restrictive API rate limits, and required data transformation can all make an exit considerably harder in practice than it sounded on paper. For a genuinely critical service, it's worth asking whether the exit or recovery plan has ever actually been tested, without treating that as a universal requirement for every supplier regardless of risk.

<h2 id="medconnect">The MedConnect scenario</h2>

The same fictional supplier used across this whole series: a cloud patient portal, roughly 40,000 patients, sensitive health information, AWS Sydney, API integration, SSO, privileged overseas support, subcontractors, and existing ISO 27001, SOC 2 and annual penetration test evidence.

**Architecture.** Four genuinely distinct access paths worth separately understanding: patients reach the web application directly, which runs on AWS against a database; staff authenticate through the health organisation's own identity provider via SSO into MedConnect; an internal system reaches MedConnect through an API integration; and a support engineer reaches MedConnect's production environment through supplier identity, then a PAM or VPN layer. Each path carries its own separate assurance questions, and conflating them into one generic "is MedConnect secure" question misses most of what actually matters.

**Responsibility matrix**, illustrative and built specifically for this fictional architecture: patient accounts and staff SSO sit as shared responsibility between the customer and MedConnect; customer role assignment and customer endpoint security sit with the customer alone; application patching and production support access sit with MedConnect; host infrastructure and physical security sit with AWS; application logging sits with MedConnect; customer SIEM integration sits as a shared responsibility, since MedConnect provides the log capability and the customer has to actually configure the export.

**A logging gap.** MedConnect provides authentication logs. The customer has never actually configured export to their own SIEM. Whose gap is this? Reasonably, a shared one: MedConnect supplies the capability, the customer owns the integration and the monitoring that follows from it, though the exact split genuinely depends on what the contract and the service's actual design assumed in the first place, worth confirming rather than assuming either way.

**Support access.** Tier-2 support is outsourced overseas. Worth asking: under what identities do they operate, is MFA required, is access approval-based, can they reach customer data directly, is access standing or genuinely temporary, are sessions recorded, is it reviewed periodically, and what assurance exists over the subcontractor delivering that support in the first place, tying the fourth-party and cloud-assurance threads together directly.

**Using AWS assurance efficiently.** Don't ask MedConnect for AWS's own data-centre badge-reader logs; that's a request that adds burden without adding real confidence, since AWS's own independent assurance already covers physical security credibly. Instead, focus the assessment on how MedConnect itself configures AWS, IAM, storage permissions, network exposure, logging, which is squarely MedConnect's own responsibility and exactly where the real assurance gap, if one exists, is actually going to be found.

**An incident.** A patient account is compromised. Who investigates: the customer's own identity team, MedConnect, or both? What logs actually exist to support that investigation, and does either party currently hold all of them? This is precisely why incident responsibilities need agreeing in advance, in the contract and in the actual logging design, rather than being worked out for the first time in the middle of a live incident.

<h2 id="review-workflow">A reusable review workflow</h2>

Understand the business service. Determine inherent risk. Draw the architecture and data flow. Identify the service model, IaaS, PaaS or SaaS. Identify every material party involved. Map responsibility across them. Identify what the customer is actually responsible for configuring. Review whatever independent assurance already exists. Assess identity. Assess privileged supplier access. Assess logging and monitoring. Assess vulnerability management and secure development. Assess recovery capability. Assess fourth parties. Assess data location. Assess incident responsibilities on both sides. Identify the genuine gaps. Determine appropriate treatment. Assess the resulting residual risk. Monitor for material changes and reassess accordingly.

A lightweight, reusable responsibility-matrix template: control area, provider responsibility, supplier responsibility, customer responsibility, whether it's shared, the evidence behind each, any identified gap, and an owner, run across identity, logging, encryption, backups, incident response, vulnerability management, application security, cloud configuration, privileged access, and data deletion. Where SaaS security genuinely depends on customer-side action, maintain a simple **customer control register** alongside it: the control itself, the service it applies to, the required configuration, an internal owner, supporting evidence, and a review frequency, exactly the mechanism that keeps CUECs and customer-side responsibilities from quietly falling through the cracks over time.

Useful evidence sources, requested proportionately to actual risk rather than requested wholesale from every supplier regardless: SOC 2 reports, ISO certificates, architecture diagrams, a completed responsibility matrix, IAM configuration extracts, tenant settings, security logs, a penetration-test summary, backup and recovery evidence, the incident process itself, a subprocessor list, and cloud-configuration reports. Worth explicitly avoiding: a cloud provider's own physical data-centre controls where credible independent assurance already covers them, raw production secrets, full cloud-admin credentials, complete proprietary architecture detail where a summary genuinely suffices, and large cloud data exports requested without a clear, specific purpose behind the request. Efficient assurance asks for exactly what's needed and nothing beyond it.

<h2 id="practical-exercises">Practical exercises</h2>

**Exercise 1.** A SaaS platform supports SSO. The customer has configured Entra ID as the identity provider. MFA is not enabled. Who owns this gap?

**Exercise 2.** A supplier retains audit logs for 30 days. The customer's investigation needs genuinely require longer. What are the realistic options?

**Exercise 3.** A supplier states "AWS is ISO certified." Does this prove the supplier's own SaaS application is ISO certified? It doesn't, work through why the certificate's scope doesn't automatically inherit upward.

**Exercise 4.** Supplier support can only access production after a customer-approved ticket is raised, but support staff then use a shared account once access is granted. What's genuinely strong here, and what remains weak?

**Exercise 5.** A SaaS platform offers regional disaster recovery. A customer accidentally deletes records, and the provider doesn't offer granular restore. What risk actually remains?

**Exercise 6.** A supplier uses an offshore support MSP. What questions actually matter here?

**Exercise 7.** A supplier's SOC 2 report is genuinely excellent. The customer's own tenant has five permanent Global Administrators and no access review process at all. Does the supplier's report solve this? It doesn't, and it was never going to.

**Exercise 8.** A user account is compromised. The supplier monitors platform infrastructure. The customer is responsible for monitoring identity. Who actually detects this, and what logs need to flow where for either of them to?

<h2 id="interview-questions">Interview questions</h2>

"What does shared responsibility mean?" Security responsibility is genuinely divided among the parties involved, provider, supplier and customer, with the exact boundary depending on service model, architecture and configuration, not one fixed universal split. "How does it change between SaaS, PaaS and IaaS?" Responsibility shifts progressively upward toward configuration, identity and data as more of the underlying stack becomes managed by the provider. "How would you assess a SaaS supplier?" Understand the service and its data, map the architecture and access paths, determine inherent risk, identify who's responsible for what, reuse existing independent assurance, then assess identity, privileged access, logging, recovery and fourth parties specifically. "How do you decide whether a cloud-provider certification is relevant?" Check what it actually covers and confirm it doesn't get mistaken for certifying the supplier's own application built on top of it. "What customer responsibilities should you consider?" Tenant configuration, identity, role assignment, data sharing, integrations, and endpoint security, whatever the specific service leaves in the customer's own hands. "What's the difference between supplier security and tenant configuration?" Supplier security is whether the provider is meeting its own responsibilities; tenant configuration is whether the customer has correctly configured the parts left to them, both are genuinely necessary and neither substitutes for the other. "How would you assess privileged SaaS support access?" Identities used, MFA, approval process, whether access is standing or temporary, logging, session recording, and how subcontractor support access is handled. "What would you look for in cloud logging?" What's actually captured, who can access it, whether it can reach your own SIEM, and what retention actually applies. "How would you assess data residency?" Where primary data, backups, logs, and support access each actually sit, since these can genuinely differ from each other. "How would you assess a fourth-party cloud dependency?" Focus on material access, material data processing, or a genuinely critical availability dependency, not every minor vendor in the chain.

A model answer for "how would you assess a cloud SaaS supplier": understand the service, its data, and its business criticality; map the architecture and data flows; determine inherent risk; identify provider, supplier and customer responsibilities; review existing independent assurance; assess identity and privileged access; assess the customer-configurable controls specifically; assess logging and incident responsibilities on both sides; assess vulnerability management and development controls; assess recovery and continuity; review fourth parties and subprocessors; review data location; identify the actual gaps; agree proportionate treatment; assess residual risk; and monitor for material changes going forward.

<h2 id="common-misunderstandings">Common misunderstandings</h2>

"AWS secures everything." No, only its own layer. "SaaS means the customer has no security responsibilities." No, tenant configuration and identity remain squarely the customer's. "The provider's ISO certificate covers our configuration." No, certification scope doesn't extend upward to cover what the customer configures. "Encrypted at rest means provider staff can't access the data." No, encryption and access control are different problems. "The hosting region tells us where every copy of the data exists." Not necessarily, support, logging, CDN and backup providers can all sit elsewhere. "SOC 2 means the tenant is secure." No, it means specific supplier controls were independently tested; tenant configuration is a separate question entirely. "Cloud-provider controls need retesting by every customer individually." No, credible independent assurance can reasonably be relied on and reused. "Backups mean the customer can restore anything." Not necessarily, platform disaster recovery and granular customer-level restore are genuinely different capabilities. "SSO means there are no local accounts." Not necessarily, worth checking explicitly rather than assuming. "Logging exists, therefore somebody's monitoring it." No, capability, configuration and active monitoring are three separate claims. "Cloud is inherently less secure than on-premises." Too simplistic either way; the real question is always whether responsibilities on both sides are actually being met.

<h2 id="conclusion">The point</h2>

Go back to "we use AWS" or "the SaaS vendor handles security." The mature response to either sentence is the same two-word question: which part?

The most important skill in cloud and SaaS assurance is being able to draw a clean line around each responsibility and ask who owns it, who actually operates it, who configures it, and how you'd actually know any of that is true rather than assumed. Cloud doesn't remove security responsibility from anyone. It redistributes it across more parties than a single-sentence summary can ever hold. Good assurance work is simply making those boundaries visible before they become the gap nobody was watching.
