---
title: "Present Is Not Effective: How to Test Security Controls"
date: 2026-09-29
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "security-assurance"
  - "control-testing"
  - "risk-management"
  - "governance"
  - "field-guide"
seoTitle: "How to Test Security Controls | Jason Hill"
description: "A practical guide to security control testing: the difference between design, implementation and operating effectiveness, how to define a population, sample it properly, and test ten common controls with real evidence, from MFA to backups."
coverImage: "control-testing-cover.svg"
coverImageAlt: "Terminal-style illustration of a control node branching into three nodes labelled design, implementation and operation, each connecting to an evidence node and then a conclusion node."
---

"We have MFA" sounds reassuring right up until someone asks the follow-up questions. MFA for whom, exactly? Which systems, which access paths? Does that cover administrator accounts specifically, or just standard users? What about service accounts, emergency break-glass accounts, a legacy protocol nobody's retired yet, VPN access, every SaaS app in use, local administrator logins? Are there exceptions, and is any of this actually enforced, or just switched on somewhere in a policy panel?

That gap, between a control being present and a control actually being effective, is what this article is about. It's a direct continuation of [Security Assurance for SOC Analysts](/posts/security-assurance-for-soc-analysts/), which introduced the requirement-to-evidence chain in general. This one is about the specific mechanics of testing: how to define what "covered" actually means, how to sample sensibly, how to find the exceptions that matter, and how to run ten of the most common control tests you'll actually encounter.

<pre class="flow-diagram"><span class="step">Requirement</span>
<span class="arrow">↓</span>
<span class="step">Control objective</span>
<span class="arrow">↓</span>
<span class="step">Design</span>
<span class="arrow">↓</span>
<span class="step">Implementation</span>
<span class="arrow">↓</span>
<span class="step">Operating effectiveness</span>
<span class="arrow">↓</span>
<span class="step">Evidence</span>
<span class="arrow">↓</span>
<span class="step">Conclusion</span></pre>

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

Design asks: if this control operated exactly as intended, would it reasonably address the risk? Implementation asks: has it actually been put in place, across the whole required scope? Operating effectiveness asks: does it actually, consistently work over time? A control can pass one of these and fail another; testing means checking all three separately, not assuming one implies the rest.

</div>

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#control-objective">Start with the objective</a></li>
<li><a href="#design-effectiveness">Design effectiveness</a></li>
<li><a href="#implementation">Implementation</a></li>
<li><a href="#operating-effectiveness">Operating effectiveness</a></li>
<li><a href="#point-in-time-vs-period">Point in time vs period of time</a></li>
<li><a href="#population-and-sampling">Population and sampling</a></li>
<li><a href="#exception-testing">Exception testing</a></li>
<li><a href="#ten-worked-tests">Ten worked control tests</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#control-dependencies">Control dependencies</a></li>
<li><a href="#control-types-and-modes">Types and modes of control</a></li>
<li><a href="#evidence-triangulation">Evidence triangulation</a></li>
<li><a href="#negative-testing">Negative testing</a></li>
<li><a href="#failure-vs-limitation">Failure vs limitation</a></li>
<li><a href="#compensating-controls-testing">Testing compensating controls</a></li>
<li><a href="#documenting-testing">Documenting a test</a></li>
<li><a href="#retesting">Retesting</a></li>
<li><a href="#practical-lab">Practical lab</a></li>
<li><a href="#interview-questions">Interview questions</a></li>
<li><a href="#self-test">Mini self-test</a></li>
<li><a href="#common-mistakes">Common mistakes</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="control-objective">Start with the objective</h2>

Testing shouldn't start with a product. It should start with what the control is actually meant to achieve. Objective: reduce the risk of unauthorised privileged access. Possible controls that could serve that objective: MFA, separate administrator identities, a PAM solution, conditional access, network restrictions, periodic access review, and logging. Starting from the objective keeps you from testing "does MFA exist" in isolation and missing that the real question was always broader than any one control.

<h2 id="design-effectiveness">Design effectiveness</h2>

Would this control, operating exactly as described, reasonably address the risk? Risk: former employees retain access. Control: a manager manually remembers to email IT when someone leaves. That could be implemented flawlessly, exactly as designed, and the design itself is still weak; manual memory-dependent processes fail predictably at scale. Compare it with: HR's termination event automatically triggers account disablement, with exception monitoring layered on top. Same underlying risk, a design that's actually sound. Worth holding this distinction deliberately: poor design and poor execution are different problems, and conflating them leads to fixing the wrong thing.

<h2 id="implementation">Implementation</h2>

Has the control actually been put in place across the scope it's supposed to cover? An MFA policy might genuinely apply to Microsoft 365, and simply not extend to VPN, a legacy admin portal, local administrator accounts, or break-glass accounts. That's a control that's only partially implemented, whatever the policy document claims. The habit worth building: define the **population**, everything that should be covered, systems, users, accounts, processes, before checking **actual coverage** against it. You can't assess a gap you haven't first defined the edges of.

<h2 id="operating-effectiveness">Operating effectiveness</h2>

A control can be well designed and genuinely implemented and still not operate consistently. A quarterly privileged-access review might have a reasonable design and a real process and tooling behind it, and still show Q1 completed, Q2 completed, Q3 missed entirely, Q4 completed. The honest conclusion is "the control operates, but not consistently," not a binary pass or fail. Resist collapsing that nuance for the sake of a tidy answer; the inconsistency itself is usually the more useful finding.

<h2 id="point-in-time-vs-period">Point in time vs period of time</h2>

"Is MFA enabled today" is a point-in-time question. "Was MFA consistently enforced throughout the last six months" is a period-of-time question, and it's usually the more useful one for anything that's meant to operate continuously: access reviews, patching, incident response, backup testing, vulnerability remediation, onboarding and offboarding. Not every organisation uses this exact terminology formally, but the underlying distinction, snapshot versus sustained operation, is worth applying regardless of the words used for it.

<h2 id="population-and-sampling">Population and sampling</h2>

The **population** is everything potentially subject to the control: 14 admin accounts, 8,000 employees, 220 production servers, 63 terminated users, 110 open critical vulnerabilities. A small population can often be tested in full. A large one usually needs sampling or automated evidence instead, and sample selection should be deliberate rather than convenient: weighted toward risk, spanning different teams and systems, covering more than one time period, and specifically including anything unusual rather than only the easy, obvious cases. There's no universal correct sample size; the right approach depends on what's actually being tested and how much confidence the risk genuinely warrants.

<h2 id="exception-testing">Exception testing</h2>

The main control often looks fine. The real risk tends to hide in the exceptions: break-glass accounts, a legacy application nobody's migrated off yet, service accounts, a temporary firewall rule that was never removed, an approved vulnerability exception, an unsupported server still in production, a subcontractor account granted outside the normal process. "What bypasses the normal control" is worth becoming an automatic question on every single test you run, not an occasional afterthought.

<h2 id="ten-worked-tests">Ten worked control tests</h2>

<h3 id="test-mfa">1. MFA</h3>

Claim: "all privileged access requires MFA." Define the privileged population first, then identify every access path into it, review the identity provider's configuration and conditional access rules, check PAM and VPN settings, identify exclusions, inspect break-glass accounts specifically, review authentication logs, sample individual users, and validate any legacy or direct access path that might sidestep the centrally enforced route entirely. Evidence: the privileged account inventory, IdP configuration, access policies, authentication logs, the exception list, and an architecture diagram. A precise finding looks like "three privileged accounts accessing the legacy management interface authenticate with password-only credentials outside centrally enforced MFA," not "MFA failed."

<h3 id="test-logging">2. Logging and monitoring</h3>

Claim: "all critical systems send security logs to the SIEM." The CMDB says 150 critical systems; the SIEM's own source inventory shows 132. Are the missing 18 genuinely decommissioned, or just missing? Is there a naming mismatch hiding some of them? For the 132 that do appear, are the right log types actually arriving, with current events and correct timestamps, parsing properly, retained for long enough, with the connector itself in good health and actually generating alerts? A configured connector proves configuration, not operation; recent, genuine events are the evidence that actually answers the question.

<h3 id="test-vuln">3. Vulnerability management</h3>

Requirement: critical vulnerabilities remediated within a defined target. Test scanning coverage, whether scans are authenticated, whether the scanner's asset inventory actually matches reality, the severity methodology in use, how old open findings are, remediation ticket records, approved exceptions, and confirmation of re-scanning after a fix. A sample dataset of twelve critical findings, eight remediated within target, two overdue, two carrying approved exceptions, supports a genuinely nuanced conclusion: the control exists and mostly operates, with two specific gaps worth naming precisely rather than either "vulnerability management works" or "vulnerability management is broken."

<h3 id="test-jml">4. Joiner, mover, leaver</h3>

Requirement: access removed promptly once no longer required. Evidence: HR termination records, the contractor register, IAM data, actual disable timestamps, and authentication logs afterward. Test a genuine sample, and specifically look for exactly the pattern that keeps showing up in practice: employee offboarding is automated and reliable, while contractors are handled manually and inconsistently. The same underlying control can be genuinely effective for one population and weak for another; testing only the easy population misses that entirely.

<h3 id="test-access-review">5. Privileged access review</h3>

Control: quarterly review of privileged users. Test the actual review schedule against what happened, whether the full population was genuinely covered each time, whether the reviewer held real authority to make removal decisions, whether there's evidence of an actual decision being made rather than a rubber stamp, whether removals genuinely followed, and how promptly. A spreadsheet marked "reviewed" is not, on its own, proof that meaningful review occurred; look for actual changes, documented exceptions and removals as evidence the review did something rather than existed.

<h3 id="test-edr">6. EDR coverage</h3>

Claim: "all production endpoints have EDR." Asset inventory says 2,400 systems; the EDR platform shows 2,281 active agents. What accounts for the missing 119, an unsupported OS, powered-off systems, genuinely decommissioned assets, a deliberate server exclusion, or simply a stale agent that stopped reporting? For the systems that do show an agent, is protection actually enabled rather than installed-but-inert, and is tamper protection genuinely on? This connects directly to everyday SOC work: an EDR gap discovered mid-investigation is exactly this same test, just run under worse timing.

<h3 id="test-backup">7. Backup and recovery</h3>

Claim: "critical systems are backed up." Test it in layers. Design: is the backup architecture actually sound for the systems involved? Implementation: are the jobs genuinely configured? Operation: are jobs actually completing? Effectiveness: does a restore actually succeed? Also worth checking: scope, retention, immutability or isolation from the production environment, failure monitoring, whether RPO and RTO targets are realistic and tested, who holds credentials capable of deleting a backup, and specific resistance to a ransomware scenario. The one sentence worth repeating every time this comes up: a successful backup job is not a successful recovery.

<h3 id="test-ir">8. Incident response</h3>

Claim: "we have an incident response process." A document review proves the plan exists; it says nothing about operation. Better evidence: recent real incidents, any exercises actually run, whether escalation happened within whatever timeframe the plan states, timestamps confirming that, stakeholder communication records, and whether lessons learned actually turned into corrective action afterward. If the plan requires severity escalation within a defined window, the test is straightforward: pull recent incidents and check whether that actually happened, not whether the sentence exists in the document.

<h3 id="test-firewall">9. Firewall rule review</h3>

Control: firewall rules periodically reviewed. Test against the complete device population, not just the ones easiest to reach; pull the current rule base and look for stale rules, overly broad rules, rules nobody's used in months, missing ownership or business justification, and temporary rules that were supposed to expire and never did. This isn't a firewall configuration tutorial, the point is the same testing discipline applied to a specific technical artefact: define the population, get the evidence, and look specifically for what's been quietly left behind.

<h3 id="test-awareness">10. Security awareness</h3>

People and process controls need testing differently from technical ones. Evidence might include training assignment records, completion rates, the actual target population, new-starter coverage specifically, overdue training, whether privileged users received anything beyond the generic course, and phishing simulation results where they're used. Resist reducing this entirely to "95% completed training," which measures activity, not the actual objective; ask what outcome the training is supposed to achieve, and whether there's any evidence at all that it's achieving it.

<h2 id="control-dependencies">Control dependencies</h2>

A logging control depends on endpoint configuration, network connectivity, SIEM ingestion, correct parsing, storage, alerting, and someone actually owning the monitoring. MFA depends on the identity platform itself, how thoroughly each application actually integrates with it, whether the underlying protocol even supports it, and how exceptions get handled. A failure anywhere in that chain can quietly reduce a control's real effectiveness without the control itself ever looking broken on the surface. Test the system a control sits inside, not just the isolated setting that happens to have a name.

<h2 id="control-types-and-modes">Types and modes of control</h2>

Worth knowing the rough categories, without forcing every control into exactly one. **Preventive** controls try to stop an event happening at all, MFA is a good example. **Detective** controls identify it once it's already happened, an identity alert firing is detective. **Corrective** controls restore normal state or limit the consequence, revoking a compromised session is corrective. Many real controls straddle more than one category, and that's fine; the categorisation is a thinking tool, not a strict filing system.

Manual and automated controls trade off differently, too. Manual controls are flexible but tend to be inconsistent under volume or pressure. Automated controls scale well and can fail silently in ways nobody notices for a long time, an automated leaver-disablement process that simply excludes contractors from its HR data feed looks perfectly automated and still isn't actually covering the population it's supposed to. Automation is not automatically effective; it just moves where the failure hides.

<h2 id="evidence-triangulation">Evidence triangulation</h2>

Rather than trusting one screenshot, combine sources the way an incident investigation already does: a policy screenshot alongside actual authentication logs, alongside the privileged account inventory, alongside the exception register. Each individually is weaker evidence than all four read together, and confidence should genuinely track how many independent sources actually agree.

<h2 id="negative-testing">Negative testing</h2>

Don't only confirm expected success, ask whether the control can actually be bypassed: does an old protocol skip MFA entirely, does an excluded organisational unit avoid EDR, does a direct URL bypass SSO, does a local admin account exist quietly alongside a PAM rollout, is there a network path that avoids the proxy the control assumed everything went through? Keep all of this authorised and strictly non-destructive, this article isn't providing exploitation instructions, it's teaching the habit of checking the edges a control assumes exist but might not.

<h2 id="failure-vs-limitation">Failure vs limitation</h2>

A control can operate exactly as intended and still not eliminate every version of the risk it addresses. MFA works correctly, and an attacker steals an already-active session token instead of the credential. That's not automatically "MFA failed," it's a limitation of what MFA was ever designed to prevent in the first place. Holding this distinction properly is what makes post-incident analysis mature rather than reflexively blaming the nearest control, and it feeds directly back into design: session protections are a different control addressing a different part of the same risk.

<h2 id="compensating-controls-testing">Testing compensating controls</h2>

A legacy system genuinely can't support MFA. Compensating measures might include a bastion host, MFA enforced at the VPN layer instead, network restriction, individually attributable accounts, session logging, and active alerting. Testing here means checking two separate things: do these compensating controls actually operate as described, and do they genuinely address the same underlying risk the original requirement was aimed at? Presence of a plausible-sounding list is not the same claim as adequacy; each item still needs its own evidence.

<h2 id="documenting-testing">Documenting a test</h2>

A lightweight, reusable structure: control objective, requirement, population, test procedure, evidence, exceptions found, result, finding, risk, recommendation, and whether a retest is required. Not a universal standard, just a genuinely useful model, the same one covered in more depth in the assurance article.

Write the test procedure itself precisely. Weak: "check MFA." Better: "obtain the population of privileged accounts and validate that MFA enforcement applies to all interactive administrative access paths; identify and assess any exclusions." A good test procedure is specific, repeatable by someone else, properly scoped, and oriented toward the evidence it expects to find, rather than a vague instruction that leaves the actual work to whoever happens to run it.

Pass and fail are sometimes too simple a conclusion to reach for. Depending on your organisation's own methodology, effective, partially effective, ineffective, not applicable, and unable to determine can all be legitimate, more honest conclusions than a forced binary. Don't invent a formal rating scale for this article's purposes; whatever labels your organisation actually uses, the underlying facts matter more than which label gets attached to them.

<h2 id="retesting">Retesting</h2>

A finding being marked "fixed" isn't the same as it being closed. If an owner reports EDR has been deployed to the previously missing servers, retest properly: check the inventory again, confirm the agent is actually present, confirm it's healthy, confirm recent telemetry is genuinely arriving, and confirm the right policy is actually applied to it. Closure needs evidence, exactly the same standard the original finding was held to.

<h2 id="practical-lab">Practical lab</h2>

A fictional organisation: 350 employees, 80 servers, Microsoft 365, Entra ID, Microsoft Defender, a SIEM, a VPN, and an AWS environment. Six claims, design a test for each before reading the notes underneath.

1. **All administrators have MFA.** Define the privileged population across every platform in scope, not just Entra ID; check VPN and AWS console access specifically, since both are common gaps left outside a Microsoft-centric MFA rollout.
2. **All servers have EDR.** Compare the server inventory against Defender's own active list; look hardest at the delta, and check whether it's genuinely explained rather than assumed.
3. **Critical vulnerabilities are fixed in 14 days.** Check scanning coverage across both the on-premises servers and the AWS estate separately, they're commonly scanned by different tooling with different blind spots.
4. **Leavers are disabled within 24 hours.** Sample recent HR terminations and check the actual IAM disable timestamp against them; specifically check whether any contractors or AWS IAM users fall outside the HR feed driving the main process.
5. **Critical logs are sent to the SIEM.** Check coverage across Microsoft 365, the on-premises servers, and AWS separately, cloud and on-premises logging are frequently configured, and gapped, independently of each other.
6. **Backups are tested.** Ask specifically whether a genuine restore has ever been performed for a production system, not merely whether backup jobs report success.

The pattern worth noticing across all six: the claim is stated as one sentence, and the real population underneath it is almost always split across more platforms than the claim implies. That split is usually where the actual gap lives.

<h2 id="interview-questions">Interview questions</h2>

"How would you test MFA?" Define the privileged population and every access path into it, review the identity platform and conditional access configuration, check for exclusions and legacy paths specifically, and validate with authentication logs rather than stopping at the policy screen. "What's the difference between control design and operating effectiveness?" Design asks whether the control would work if it operated as intended; operating effectiveness asks whether it actually does, consistently, over time. "How do you test a control covering 20,000 users?" Define the population precisely, then use automated evidence or a deliberately risk-weighted sample rather than attempting full manual coverage. "What do you do when evidence contradicts the control owner's statement?" Go back to the evidence itself, confirm its scope and currency, and raise the discrepancy directly and collaboratively rather than assuming bad faith. "How do you test a compensating control?" Confirm it genuinely operates as described, and separately confirm it actually addresses the same risk the original control was meant to. "Would a screenshot be sufficient?" Depends entirely on the question being asked, a screenshot answers "is this setting enabled right now," and nothing about historical consistency or full population coverage.

<h2 id="self-test">Mini self-test</h2>

1. What's the difference between control design and implementation?
2. What's the difference between implementation and operating effectiveness?
3. What is a control population, and why does it need defining before testing starts?
4. Why does sampling need to be risk-weighted rather than convenient?
5. Why is exception testing often more revealing than testing the main control?
6. Why isn't a configured logging connector sufficient evidence on its own?
7. What's the difference between a control failure and a control limitation?
8. Why doesn't automation guarantee reliability?
9. Why is one screenshot usually weaker evidence than triangulated evidence?
10. Why does a compensating control need testing on two separate questions, not one?
11. What does "unable to determine" mean as a test conclusion, and why is it a legitimate one?
12. Why does a finding marked "fixed" still need a retest?

<details>
<summary>Worked answers</summary>

**1.** Design asks whether the control, if it worked exactly as intended, would reasonably address the risk. Implementation asks whether it's actually been deployed across the required scope.

**2.** Implementation asks whether the control exists where it should. Operating effectiveness asks whether it actually, consistently works over time, not just at the moment it was checked.

**3.** The population is everything that should be covered by the control; without defining it first, there's no way to know what "full coverage" would even mean, or how big the gap actually is.

**4.** Because a convenient sample tends to reflect the easiest, most compliant part of the population, while risk concentrates in the parts most likely to be skipped, exceptions, legacy systems, less-monitored teams.

**5.** Because the main control is usually built and maintained carefully, while exceptions are where bypass paths, forgotten legacy access and unmanaged edge cases tend to accumulate unnoticed.

**6.** Because a connector existing proves configuration, not that data is actually flowing; only current, genuine events prove the control is operating.

**7.** A failure means the control didn't work as intended. A limitation means it worked exactly as intended and simply wasn't designed to address that particular scenario in the first place.

**8.** Because automation just moves where a failure hides, often into a silent data-feed gap or an excluded population nobody's checking.

**9.** Because a single artefact only answers a narrow question at one point in time; multiple independent sources agreeing gives genuinely stronger confidence in a broader claim.

**10.** Because it needs to actually operate as described, and separately, it needs to genuinely address the same underlying risk the original control was meant to cover; presence of a plausible list answers neither on its own.

**11.** It means the available evidence genuinely wasn't sufficient to reach a confident conclusion either way, a more honest outcome than forcing a pass or fail label onto incomplete information.

**12.** Because a remediation claim is itself a claim, and claims need evidence the same way the original finding did; "fixed" without a retest is just a new unverified statement.

</details>

<h2 id="common-mistakes">Common mistakes</h2>

"Configuration means operation." No, a setting existing and a setting working over time are different claims. "Automation means reliable." No, automation just moves where the failure hides. "Policy means implemented." No, a policy states intent, not fact. "Testing one user proves all users." No, one data point rarely proves a population. "No exceptions found in the sample means none exist." No, it means none were found in that sample, a meaningfully weaker claim. "Control failure means the risk definitely materialised." No, a weak control and an actual incident are different things. "Control effectiveness means the risk is zero." No, residual risk remains behind essentially every control, however well it operates.

<h2 id="conclusion">The point</h2>

Every one of the ten tests above runs the same shape underneath: define what the control was actually meant to achieve, check whether the design would reasonably get there, check whether it's actually in place across the real population, and check whether it genuinely holds up over time, not just on the day someone happened to look. "We have MFA," "we have EDR," "we have backups," none of these sentences answer that chain on their own. Testing is simply the discipline of not stopping until they do.

The same coverage-versus-effectiveness distinction underpins how these results get reported at scale, too; [Count Is Not Risk: Security Metrics, KPIs and KRIs That Actually Matter](/posts/security-metrics-kpis-kris/) picks that thread up directly.

This connects the whole series back together: [CIS](/posts/cis-controls-v8-1-for-soc-analysts/) and [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/) tell you roughly what controls and outcomes should exist. [ISO 27001](/posts/iso-27001-for-soc-analysts/) and [NZISM](/posts/nzism-for-security-practitioners/) tell you what a formal requirement actually looks like. [Security assurance](/posts/security-assurance-for-soc-analysts/) and [supplier assurance](/posts/supplier-security-assurance/) give you the reasoning method for turning a claim into a finding. This article is the toolkit for the specific moment where you're actually sitting in front of a claim and have to decide, with real evidence, whether it's true.
