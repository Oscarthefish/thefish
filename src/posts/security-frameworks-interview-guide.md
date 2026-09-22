---
title: "CIS, NIST, ISO 27001 and NZISM: The Interview Guide for Security Practitioners"
date: 2026-10-10
series: "soc"
categories:
  - "soc"
  - "career"
  - "security-frameworks"
tags:
  - "soc"
  - "security-frameworks"
  - "interview"
  - "career"
  - "governance"
  - "field-guide"
seoTitle: "CIS, NIST, ISO 27001 and NZISM Interview Questions | Jason Hill"
description: "A concise revision guide for talking confidently about CIS Controls, NIST CSF 2.0, ISO 27001 and NZISM in a security interview: 60-second answers, honest ways to answer without formal GRC experience, and 20 questions with model answers."
coverImage: "framework-interview-cover.svg"
coverImageAlt: "Terminal-style illustration of four overlapping, cascading revision cards labelled CIS, NIST, ISO and NZISM, each with a small checkmark, suggesting quick recall rather than deep memorisation."
---

An interviewer says "tell me about your experience with security frameworks," and the honest version of a lot of technical practitioners' answer is: solid on the operational side, shaky on naming the framework that operational work actually sits under. That gap is fixable in an afternoon, and this article is that afternoon.

This is not a fifth deep-dive. The [CIS](/posts/cis-controls-v8-1-for-soc-analysts/), [NIST CSF](/posts/nist-csf-2-0-for-soc-analysts/), [ISO 27001](/posts/iso-27001-for-soc-analysts/) and [NZISM](/posts/nzism-for-security-practitioners/) articles, and the [comparison](/posts/comparing-cybersecurity-frameworks/) that ties them together, already cover all four properly. This is the condensed, revision-night version: what to actually say when one of these comes up, how to say it honestly if you haven't formally implemented it, and how to avoid the handful of misconceptions interviewers like to probe for.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#mental-shortcuts">Four mental shortcuts</a></li>
<li><a href="#interview-model">The interview model</a></li>
<li><a href="#cis">CIS Controls</a></li>
<li><a href="#nist">NIST CSF 2.0</a></li>
<li><a href="#iso">ISO 27001</a></li>
<li><a href="#nzism">NZISM</a></li>
<li><a href="#big-comparison">The big comparison</a></li>
<li><a href="#which-one">Which one would you use?</a></li>
<li><a href="#soc-mapping">How SOC work maps to frameworks</a></li>
<li><a href="#confidence-without-bluffing">Confidence without bluffing</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#trick-questions">Trick and misconception questions</a></li>
<li><a href="#twenty-questions">20 interview questions</a></li>
<li><a href="#scenarios">8 scenario questions</a></li>
<li><a href="#dont-memorise-numbers">Don't memorise control numbers</a></li>
<li><a href="#cram-plans">Cram plans</a></li>
<li><a href="#thirty-second">30-second answers</a></li>
<li><a href="#revision-grid">The revision grid</a></li>
<li><a href="#self-test">Self-test</a></li>
<li><a href="#cheat-sheet">Final cheat sheet</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="mental-shortcuts">Four mental shortcuts</h2>

Learning shortcuts, not formal definitions, useful purely for fast recall.

<div class="table-scroll">

| Framework | Think of it as | Core question |
| --- | --- | --- |
| CIS Controls | Practical safeguards | What security practices should we implement? |
| NIST CSF 2.0 | Cybersecurity outcomes | How do we organise and manage cyber risk? |
| ISO 27001 | Information Security Management System | How does the organisation systematically manage information-security risk? |
| NZISM | NZ Government security requirements | What security controls and assurance expectations apply in NZ Government environments? |

</div>

<h2 id="interview-model">The interview model</h2>

For any of the four, five questions carry almost the whole conversation: **what is it, what problem does it solve, how is it structured, how would I use it in practice, and how is it different from the others.** Answer those five in order and you're speaking naturally, not reciting a memorised definition.

<h2 id="cis">CIS Controls</h2>

A prioritised set of practical, implementation-focused security safeguards. Current version: **CIS Controls v8.1**, 18 Controls, broken into Safeguards, grouped by Implementation Group (IG1, IG2, IG3) so organisations can prioritise by capability and risk. More prescriptive than NIST CSF; a genuinely useful baseline for smaller organisations. Not the same thing as CIS Benchmarks, which are platform-specific hardening guides.

**60-second answer.** "CIS Controls are a practical, prioritised set of security safeguards. I think of them as useful for translating security risk into concrete actions, asset management, vulnerability management, access control, logging, incident response. The Controls are supported by Safeguards and Implementation Groups, which help organisations prioritise according to capability and risk. Compared with NIST CSF, CIS is generally more prescriptive and implementation-focused."

**What to remember.** 18 Controls. Safeguards underneath them. IG1/IG2/IG3. Practical and prioritised. A good baseline, especially for smaller organisations. Maps well onto technical, day-to-day controls. Not the same as CIS Benchmarks. Can be mapped onto broader frameworks like NIST. Doesn't replace formal risk assessment.

<div class="table-scroll">

| Question | Model answer |
| --- | --- |
| What are the CIS Controls? | A prioritised, practical set of 18 security safeguards aimed at the most common ways organisations get compromised. |
| What are Implementation Groups? | IG1, IG2, IG3, cumulative prioritisation by risk and resources. |
| CIS Controls vs CIS Benchmarks? | Controls answer what a security programme should be doing; Benchmarks answer how to configure a specific technology. |
| How is CIS different from NIST? | CIS is concrete and safeguard-focused; NIST is outcome-focused and less prescriptive. |

</div>

<h2 id="nist">NIST CSF 2.0</h2>

An outcome-based framework for managing cybersecurity risk. Six Functions: **Govern, Identify, Protect, Detect, Respond, Recover**, Govern added in CSF 2.0. Not sequential incident-response phases, continuous outcomes maintained all the time. Functions break into Categories and Subcategories. Not prescriptive about specific technical controls.

**Profiles.** Current Profile: where the organisation is today. Target Profile: where it wants to be. The gap between them drives prioritised action.

**Tiers.** Describe how an organisation governs and manages cybersecurity risk, not a simple maturity percentage: **Tier 1, Partial; Tier 2, Risk Informed; Tier 3, Repeatable; Tier 4, Adaptive.** A lower Tier can be an entirely appropriate, deliberate choice for a lower-risk area.

**60-second answer.** "NIST CSF 2.0 is an outcome-based framework for managing cybersecurity risk. It organises cybersecurity into six Functions: Govern, Identify, Protect, Detect, Respond and Recover. Those break down into Categories and Subcategories. I see it as useful for understanding current capability, defining a target state, and communicating cyber risk across technical and business teams. Compared with CIS, it's less prescriptive about exactly which technical safeguards to deploy."

**What to remember.** CSF 2.0. Six Functions. Categories/Subcategories. Profiles (Current, Target). Tiers (Partial, Risk Informed, Repeatable, Adaptive). Outcome-oriented, not a control checklist. Functions aren't sequential incident stages. Flexible across sectors. Maps to other standards via Informative References. Govern was added as a Function in 2.0.

<div class="table-scroll">

| Question | Model answer |
| --- | --- |
| Name the six Functions. | Govern, Identify, Protect, Detect, Respond, Recover. |
| Function vs Category? | A Function is a broad outcome; a Category groups related, more specific outcomes underneath it. |
| What is a Profile? | Which CSF outcomes matter to the organisation, and where it sits now versus its target. |
| What are Tiers? | Four levels describing how rigorously cybersecurity risk is governed, not a security score. |
| How would you use NIST in an organisation? | Build a Current Profile, define a Target Profile, and use the gap to prioritise work. |

</div>

<h2 id="iso">ISO 27001</h2>

The certifiable standard for an **Information Security Management System (ISMS)**: scope, risk assessment and treatment, controls, evidence, internal audit, management review, continual improvement. Current edition: **ISO/IEC 27001:2022** (plus Amendment 1:2024). Risk-based, not a fixed control checklist.

**27001 vs 27002.** 27001 sets the certifiable ISMS requirements, audited directly. 27002 gives non-certifiable implementation guidance.

**SoA.** Records which Annex A controls are applicable, their status, and the justification for inclusion or exclusion, linked to the risk assessment. Not every control is mandatory.

**Annex A.** 93 controls, four themes: Organizational (37), People (8), Physical (14), Technological (34). A reference set to select from and justify, not complete in full.

**Certification.** An independent assessment found the ISMS conforms, within a defined scope. Doesn't prove zero vulnerabilities, no breaches, or every Annex A control implemented. Scope is the single most important thing to check.

**60-second answer.** "ISO 27001 is the international standard for an Information Security Management System. Rather than a technical control list, it requires an organisation to define its security scope, assess information-security risk, select and implement appropriate controls, monitor them, and continually improve the ISMS. Annex A provides a reference set of controls, and the Statement of Applicability records how those relate to the organisation's risk treatment. Certification gives assurance over the defined ISMS scope, but doesn't mean every system is secure or every Annex A control is implemented."

**What to remember.** ISMS. Risk-based. Scope. Risk assessment and treatment. SoA. Annex A, 93 controls, four themes. Internal audit, management review, continual improvement. Certification scope matters more than the certificate itself.

<div class="table-scroll">

| Question | Model answer |
| --- | --- |
| What is an ISMS? | The organised system managing information-security risk: policy, process, risk management, controls, evidence. |
| What is the SoA? | The document recording which Annex A controls apply, their status, and why others were excluded. |
| Are all Annex A controls mandatory? | No, only those the organisation's own risk assessment determined applicable. |
| A supplier says they're ISO 27001 certified. What would you check? | Legal entity, edition, exact scope statement, whether the actual service is included, sites, certification body, and expiry, then decide if further assurance is warranted by risk. |

</div>

<h2 id="nzism">NZISM</h2>

New Zealand's government information-security manual, maintained by GCSB/NCSC, primarily for NZ Government agencies, also relevant to suppliers and contractors delivering into government environments. More detailed and prescriptive than NIST CSF. NZISM is **not** "NZ ISO 27001": ISO is a certifiable management-system standard; NZISM is a requirements manual with its own certification and accreditation process. An ISO 27001 certificate does not automatically demonstrate NZISM compliance.

**MUST/SHOULD.** MUST or MUST NOT marks a baseline control, essential unless demonstrably not relevant, deviation needs formal justification through the Accreditation Authority. SHOULD or SHOULD NOT is recommended, more flexible, but the resulting risk still needs considering. SHOULD does not mean optional; MUST does not mean exceptions are impossible.

**60-second answer.** "NZISM is New Zealand's government information-security manual. I think of it as more detailed and prescriptive than something like NIST CSF, because it defines specific security requirements and guidance for government environments. In practice I'd use it by identifying which requirements apply to the system, validating implementation and evidence, documenting any gaps, and following the organisation's formal risk or non-compliance process where a requirement can't be met. I wouldn't try to memorise control numbers, I'd know how to navigate the current manual."

**What to remember.** NZ Government context. Current, live, searchable online manual. Detailed, risk-based requirements. MUST/SHOULD semantics. Evidence-based assessment. Formal exception process for unmet requirements. System ownership and governance matter throughout. More prescriptive than NIST. ISO certification does not equal NZISM compliance.

<div class="table-scroll">

| Question | Model answer |
| --- | --- |
| What is NZISM? | NZ Government's detailed information-security manual and assurance process. |
| MUST vs SHOULD? | MUST needs formal justification to deviate; SHOULD is recommended, but the resulting risk still needs consideration. |
| How would you approach a control you didn't know? | Search the live manual, read the objective and rationale, check applicability, then the control text. |
| A mandatory control can't be met. What happens? | Document why, assess the risk, identify compensating controls, seek formal dispensation, not silent non-compliance. |

</div>

<h2 id="big-comparison">The big comparison</h2>

<div class="table-scroll">

| Framework | Main purpose | Style | Strength | Less focused on |
| --- | --- | --- | --- | --- |
| CIS | Practical safeguards | Prescriptive, concrete | Technical baseline, prioritisation | Formal risk governance, certification |
| NIST CSF | Risk outcomes | Flexible, outcome-based | Programme structure, communication | Specific technical implementation |
| ISO 27001 | Management system | Risk and governance-driven | Certifiable ISMS, evidence and audit | Prescriptive technical detail |
| NZISM | Government security requirements | Detailed, prescriptive | NZ Government system assurance | Broad applicability outside government context |

</div>

<h2 id="which-one">Which one would you use?</h2>

<div class="table-scroll">

| Scenario | Likely fit |
| --- | --- |
| 50-person private company wants a practical baseline | CIS, possibly alongside NIST or ISO depending on objectives |
| Large organisation wants an enterprise-wide risk structure | NIST CSF |
| Organisation wants an externally certifiable ISMS | ISO 27001 |
| NZ Government system | NZISM |
| Multiple frameworks in one job advert | Not competitors, likely used together: NIST for outcomes, CIS for prioritisation, ISO for the ISMS, NZISM for applicable government requirements |

</div>

Frameworks aren't mutually exclusive. "Which one wins" is usually the wrong question; "what's each one doing here" is the useful one.

<h2 id="soc-mapping">How SOC work maps to frameworks</h2>

<div class="table-scroll">

| SOC activity | Framework connection |
| --- | --- |
| EDR | Protect/Detect (endpoint control) |
| SIEM | Detect (logging, correlation) |
| MFA | Protect (identity) |
| Vulnerability scanning | Identify/Protect (vulnerability management) |
| Incident response | Respond/Recover |
| Threat hunting | Detect, continuous improvement |
| Post-incident review | Improvement, feeds back across Functions |
| Access investigation | Identify/Protect (identity and access assurance) |

</div>

The framework gives structure around work you already recognise technically. Translate SOC language into framework language: "why didn't this alert fire" becomes "was the detection control appropriately designed and operating." "Why did the attacker have admin access" becomes "was privileged access appropriately controlled." "Why couldn't we investigate" becomes "was required logging available and retained." "Why did this happen again" becomes "was corrective action effective."

<h2 id="confidence-without-bluffing">Confidence without bluffing</h2>

More credible than pretending expertise: "I haven't led that formally, but..." "My experience is primarily operational, however..." "I understand the framework at a working level..." "I'd validate the current requirement rather than rely on memory..."

**"What framework experience do you have?"** "My background is primarily security operations rather than formal GRC or audit ownership, so I wouldn't claim I've implemented an ISO 27001 ISMS or led an NZISM accreditation. What I do have is hands-on experience operating and validating the controls those frameworks are concerned with, identity, logging, vulnerability management, incident response. I've deliberately been building the framework knowledge to connect that evidence to risk and governance."

**"Have you worked with ISO 27001 / NZISM?"** Same honest shape: what you haven't done (led certification, owned accreditation), what you have done (operated the underlying controls), what you understand conceptually (scope, risk treatment, evidence, the exception process). **"What's your experience with NIST / CIS?"** Usually the most comfortable pair for an operational background: NIST's Functions map onto work you already do; CIS's Safeguards are concrete and close to daily operations.

**If asked a control number you don't know:** "I don't know that from memory, and I wouldn't want to guess. I'd check the current version and confirm the requirement, then establish the control objective, scope, evidence, and how we'd validate effectiveness." Good interview behaviour, not a weak answer.

**If the interviewer uses older terminology** (five NIST Functions, an older edition), don't correct aggressively: "In CSF 2.0, Govern was added as the sixth Function; the earlier version used the five you mentioned."

<h2 id="trick-questions">Trick and misconception questions</h2>

What an interviewer may actually be testing: "Are all 93 ISO Annex A controls mandatory?" No. "Does ISO certification mean a supplier is secure?" No. "Are the NIST Functions sequential incident phases?" No, continuous outcomes. "Is a CIS Benchmark the same as CIS Controls?" No. "Does an ISO certificate prove NZISM compliance?" No. "Does SHOULD in NZISM simply mean optional?" No. "Does NIST tell you exactly which firewall setting to use?" Generally no. "Does CIS remove the need for risk assessment?" No.

<h2 id="twenty-questions">20 interview questions</h2>

Most are answered in full above; this is the quick-fire consolidated list for final revision, one line each.

<div class="table-scroll">

| # | Question | Answer in brief |
| --- | --- | --- |
| 1 | What are the CIS Controls? | Prioritised, practical safeguards, 18 Controls |
| 2 | What are Implementation Groups? | IG1/IG2/IG3, cumulative prioritisation by risk and resources |
| 3 | CIS Controls vs CIS Benchmarks? | Programme practices vs platform-specific hardening |
| 4 | What is NIST CSF? | Outcome-based framework for managing cyber risk |
| 5 | Name the six Functions | Govern, Identify, Protect, Detect, Respond, Recover |
| 6 | What are Profiles? | Current vs Target cybersecurity posture, and the gap |
| 7 | What are Tiers? | Partial, Risk Informed, Repeatable, Adaptive; governance rigour |
| 8 | What is ISO 27001? | Certifiable standard for an Information Security Management System |
| 9 | What is an ISMS? | The organised system managing information-security risk |
| 10 | What is the SoA? | Records applicable Annex A controls, status and justification |
| 11 | Are all Annex A controls mandatory? | No, only those the risk assessment determines applicable |
| 12 | ISO 27001 vs ISO 27002? | Certifiable requirements vs non-certifiable implementation guidance |
| 13 | What does ISO certification prove? | ISMS conformity within a defined scope, nothing more |
| 14 | What is NZISM? | NZ Government's detailed information-security manual |
| 15 | MUST vs SHOULD? | Baseline, formal deviation needed vs recommended, risk still considered |
| 16 | ISO vs NZISM? | Certifiable management system vs detailed government requirements manual |
| 17 | Which framework for a small business? | Usually CIS as a practical baseline |
| 18 | How do these frameworks work together? | Complementary lenses on the same risk, not competitors |
| 19 | How does your SOC experience map to frameworks? | Detection, response, identity and vulnerability work maps onto all four |
| 20 | How would you assess a control using one of these? | Requirement, applicability, evidence, effectiveness, finding, risk, treatment |

</div>

<h2 id="scenarios">8 scenario questions</h2>

<div class="table-scroll">

| Scenario | What to ask or say |
| --- | --- |
| "We have MFA." | Scope, privileged accounts, exceptions, evidence, effectiveness |
| A supplier says "we're ISO certified." | Scope statement, edition, whether the actual service is included, evidence beyond the certificate |
| Organisation wants improved maturity but no starting point | CIS for prioritised safeguards, NIST for structuring the wider risk conversation |
| NZ Government system can't meet a required control | Document why, assess risk, identify compensating controls, seek formal dispensation |
| Company wants external certification | ISO 27001, it's the certifiable one of the four |
| SOC detects ransomware, how do Functions help structure lessons? | Govern (ownership), Identify (exposure), Protect (gaps), Detect (visibility), Respond (containment speed), Recover (restoration) |
| Small company wants a practical baseline | CIS, IG1 specifically |
| Multiple frameworks appear in one job description | Don't assume which "NIST" or version is meant; ask what the role actually involves day to day |

</div>

<h2 id="dont-memorise-numbers">Don't memorise control numbers</h2>

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

For interview literacy, memorise purpose, structure, key concepts, differences, and how to find the current requirement. Don't memorise hundreds of control numbers, every Safeguard, every ISO clause word for word, or every NZISM identifier, unless a role explicitly requires that specialist depth.

</div>

<h2 id="cram-plans">Cram plans</h2>

**One hour.** 0-10 min: the big comparison table. 10-20: CIS + NIST. 20-35: ISO. 35-45: NZISM. 45-55: the 20 interview questions. 55-60: the four 30-second answers below.

**Fifteen minutes.** Memorise the four mental shortcuts. NIST's six Functions. ISO: ISMS, risk, SoA, Annex A. CIS: 18, Safeguards, IGs. NZISM: NZ Government, MUST/SHOULD, applicability. Then rehearse one comparison answer out loud.

<h2 id="thirty-second">30-second answers</h2>

**CIS:** "Practical, prioritised security safeguards, 18 Controls, Implementation Groups for prioritisation." **NIST:** "Outcome-based framework, six Functions, Govern through Recover, for structuring and communicating cyber risk." **ISO 27001:** "The certifiable standard for an Information Security Management System, risk-based, not a fixed control list." **NZISM:** "NZ Government's detailed information-security manual, MUST/SHOULD compliance language, more prescriptive than NIST."

<h2 id="revision-grid">The revision grid</h2>

<div class="table-scroll">

| | What is it? | Structure | Main strength | Key distinction |
| --- | --- | --- | --- | --- |
| CIS | Practical safeguards | 18 Controls, Safeguards, IG1-3 | Concrete implementation baseline | Not the same as CIS Benchmarks |
| NIST CSF | Outcome-based risk framework | 6 Functions, Categories, Subcategories | Structuring and communicating risk | Functions aren't sequential stages |
| ISO 27001 | Certifiable management system | ISMS, Annex A, SoA | Governance, evidence, certification | Not every Annex A control is mandatory |
| NZISM | NZ Government requirements manual | MUST/SHOULD, applicability, accreditation | Detailed government assurance | Not equivalent to ISO certification |

</div>

<h2 id="self-test">Self-test</h2>

<details>
<summary>20 questions to check yourself against</summary>

**1.** What is CIS best known for? Practical, prioritised safeguards.
**2.** What are IGs? Implementation Groups, IG1-IG3, cumulative.
**3.** CIS vs Benchmark? Programme practices vs platform hardening.
**4.** Six NIST Functions? Govern, Identify, Protect, Detect, Respond, Recover.
**5.** What is a Profile? Current vs Target cybersecurity state.
**6.** Are Functions sequential? No, continuous and interconnected.
**7.** What is ISMS? Information Security Management System.
**8.** What is SoA? Statement of Applicability, applicable Annex A controls and justification.
**9.** Are all 93 controls mandatory? No.
**10.** 27001 vs 27002? Certifiable requirements vs implementation guidance.
**11.** What does a certificate prove? ISMS conformity within a defined scope.
**12.** What is NZISM? NZ Government's information-security manual.
**13.** MUST vs SHOULD? Baseline needing formal deviation vs recommended, risk still considered.
**14.** Does ISO prove NZISM compliance? No.
**15.** Most implementation-focused framework? CIS.
**16.** Most outcome-focused? NIST CSF.
**17.** Which is a certifiable ISMS standard? ISO 27001.
**18.** Which is NZ Government-specific? NZISM.
**19.** Can organisations use multiple frameworks? Yes, routinely.
**20.** How does SOC experience transfer? Detection, response, identity and vulnerability work maps directly onto outcomes and controls in all four.

</details>

<h2 id="cheat-sheet">Final cheat sheet</h2>

CIS → safeguards. NIST → outcomes. ISO → management system. NZISM → government requirements.

CIS asks: what should we implement? NIST asks: what outcomes should we achieve? ISO asks: how do we manage security systematically? NZISM asks: what detailed requirements apply here?

Underneath all four, the same assurance chain this whole series has been building: **requirement → control → evidence → effectiveness → finding → risk → treatment.** Learn that chain once, covered in full in [Security Assurance for SOC Analysts](/posts/security-assurance-for-soc-analysts/) and [Security Control Testing](/posts/security-control-testing/), and every framework conversation in an interview gets noticeably easier.

<h2 id="conclusion">The point</h2>

Nobody's expecting you to recite Annex A from memory or list all 153 CIS Safeguards. What actually lands well in an interview is knowing what each framework is for, how they differ, how to talk honestly about what you have and haven't done, and how to say "I'd check the current version" instead of guessing. That's a genuinely learnable skill in an afternoon, and it's the whole point of this guide.
