---
title: "Read the Scope Before the Findings: How to Review a Penetration Test Report"
date: 2026-10-02
series: "soc"
categories:
  - "soc"
  - "governance"
  - "security-frameworks"
tags:
  - "soc"
  - "penetration-testing"
  - "supplier-assurance"
  - "security-assurance"
  - "risk-management"
  - "field-guide"
seoTitle: "How to Review a Penetration Test Report | Jason Hill"
description: "A practical guide to reviewing penetration test reports for security assurance: why scope matters more than severity counts, how to interpret CVSS in business context, and why retesting is where most of the real assurance actually lives."
coverImage: "pentest-report-cover.svg"
coverImageAlt: "Terminal-style illustration of a report node funnelling through scope, methodology, findings and remediation nodes toward a final residual assurance node."
---

<div class="callout callout--watch">

<p class="callout-label">Scope of this article</p>

This is about reading and assessing a penetration test report, not performing one. Nothing below explains exploitation, payloads, bypass techniques, or how to run a test. If that's what you're after, this isn't the right article.

</div>

A supplier says: "we perform annual penetration testing." They send the report. The executive summary reads: 0 Critical, 0 High, 4 Medium, 7 Low. Tempting to stop right there and mark the supplier approved.

Then you keep reading. Scope covered: the marketing website. Excluded: the production API, the administrative portal, the authentication service, the mobile application, and the cloud environment entirely. Testing happened eleven months ago. The service you're actually buying relies almost entirely on the API and the admin portal, neither of which this report says anything about at all.

"0 Critical findings" just changed meaning completely, and it changed before you read a single technical finding. That's the whole lesson of this article: read the scope before the severity numbers, every time, because the severity numbers only mean something once you know what they were actually counted against.

<div class="callout callout--tip">

<p class="callout-label">Remember this</p>

A penetration test gives assurance about a defined scope, at a defined point in time, using a defined methodology, with specific access and assumptions, performed by specific testers, against the environment that existed during the test. Change any one of those and the report's assurance value changes with it.

</div>

This continues the [security assurance](/posts/security-assurance-for-soc-analysts/), [supplier assurance](/posts/supplier-security-assurance/) and [SOC 2](/posts/how-to-read-a-soc-2-report/) articles, applying the same evidence discipline to one more common assurance artefact.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#what-is-pentest">What is a penetration test?</a></li>
<li><a href="#pentest-vs-others">Pen test vs scan, red team, assessment</a></li>
<li><a href="#who-and-when">Who tested it, and when</a></li>
<li><a href="#objective">The objective</a></li>
<li><a href="#scope">Read the scope</a></li>
<li><a href="#test-conditions">Test conditions</a></li>
<li><a href="#methodology">Methodology</a></li>
<li><a href="#limitations">Limitations</a></li>
<li><a href="#severity">Executive summary and severity</a></li>
<li><a href="#reading-findings">Reading a finding properly</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#chains-and-patterns">Chains and patterns</a></li>
<li><a href="#remediation-and-retesting">Remediation and retesting</a></li>
<li><a href="#no-findings">What "no findings" really means</a></li>
<li><a href="#what-it-doesnt-prove">What it doesn't prove</a></li>
<li><a href="#complementary-evidence">Alongside other assurance</a></li>
<li><a href="#quality-and-warnings">Quality indicators and warning signs</a></li>
<li><a href="#medconnect">The MedConnect scenario</a></li>
<li><a href="#review-workflow">A reusable review workflow</a></li>
<li><a href="#talking-to-people">Talking to the tester and supplier</a></li>
<li><a href="#practical-exercises">Practical exercises</a></li>
<li><a href="#interview-questions">Interview questions</a></li>
<li><a href="#common-misunderstandings">Common misunderstandings</a></li>
<li><a href="#conclusion">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="what-is-pentest">What is a penetration test?</h2>

At a practical level, a penetration test is an authorised security assessment intended to identify and validate exploitable weaknesses within a defined scope. That's a working description, not a single universal definition, engagements genuinely vary in focus: web applications, APIs, external infrastructure, internal networks, cloud environments, mobile applications, wireless, identity, or red-team-style objectives, each needing a somewhat different approach.

<h2 id="pentest-vs-others">Pen test vs scan, red team, assessment</h2>

A **vulnerability scan** is typically automated or semi-automated, broad in coverage, and identifies potential vulnerabilities, often producing findings that haven't actually been validated. A **penetration test** is typically human-led, scoped more narrowly, and attempts to validate weaknesses and explore genuine attack paths, not just flag what a scanner thinks might be wrong. Neither is simply "better"; a mature vulnerability-management programme generally needs ongoing scanning as its backbone, with periodic, deeper penetration testing layered on top, not one instead of the other.

A **red-team exercise** is a different thing again: it typically pursues defined objectives, exercising detection and response capability and broader attack paths, rather than exhaustively cataloguing vulnerabilities within a fixed technical scope the way a penetration test does. Terminology genuinely varies between providers here, so treat this as a rough distinction rather than a strict line.

Not every security review is a penetration test at all. Architecture assessments, configuration reviews, code reviews, threat modelling, and cloud security assessments are all legitimate, valuable evidence, and none of them are a substitute for penetration testing, or vice versa. Know which one you're actually holding before drawing conclusions from it.

<h2 id="who-and-when">Who tested it, and when</h2>

Worth checking who actually performed the test: the testing organisation, its independence from the supplier, the relevant expertise involved, and any conflicts of interest. A recognisable brand isn't automatically a guarantee of quality, and a small specialist firm isn't automatically weaker; relevant expertise for the specific thing being tested matters more than either. A deep API security assessment draws on meaningfully different experience than external infrastructure testing, and it's worth knowing whether the testers actually had that specific background.

Internal and external testers each bring something genuine. Independent external testing offers objectivity; an internal team often brings deeper system knowledge. Neither is inherently superior; the real assurance question is whether the testing was competent, sufficiently independent for its intended purpose, and proportionate to the risk involved.

A penetration test is a point-in-time assessment, and the date matters as much as anything else in the report. If testing happened in January and, since then, authentication's been rewritten, the environment migrated to a new cloud provider, a new API shipped, or a new admin interface went live, the January report tells you very little about any of that. Track every relevant date separately: when testing actually occurred, when the report was issued (often weeks later), and when any retest happened, since these can all differ meaningfully.

<h2 id="objective">The objective</h2>

Worth understanding why the test was actually commissioned: annual assurance, pre-production validation, a specific customer requirement, a major release, a cloud migration, a regulatory obligation, or supplier due diligence generally. The objective shapes the methodology that follows it, and a test built around one objective may simply not answer the question you're bringing to it.

<h2 id="scope">Read the scope</h2>

This is the single most important section of any report, and the one most commonly skimmed past on the way to the severity table. Scope might be expressed as domains, IP addresses, specific applications, APIs, environments, cloud accounts, mobile apps, particular authentication paths, privileged roles, or network segments. The only question that actually matters first: does the scope include the system or service I actually care about?

A worked example. A supplier provides "CustomerPortal," a SaaS product. The report's scope is `www.supplier.com`. The actual product runs on `app.supplier.com`, `api.supplier.com` and `admin.supplier.com`. Only the marketing site was ever tested. The report gives you close to nothing about the application you're actually relying on.

Equally important: read the exclusions. Common ones include denial-of-service testing, social engineering, production data, specific third parties, the cloud management plane, destructive testing, particular APIs, mobile applications, or the internal network. An exclusion isn't automatically a problem, it simply limits what the report can tell you, for entirely ordinary reasons: safety, avoiding production impact, third-party restrictions written into the testing agreement, regulatory limits, time constraints, or a specific customer request. The question worth asking of every exclusion: does the excluded area carry material risk I still genuinely need assurance over?

<h2 id="test-conditions">Test conditions</h2>

Was testing run against production, staging, a test environment, or a clone? A non-production environment isn't automatically useless, but it's worth understanding how representative it actually is: differences in data, authentication configuration, network controls, WAF presence, general configuration, integrations, and logging can all mean staging behaves meaningfully differently from what's actually live.

**Authenticated versus unauthenticated testing** matters directly. Unauthenticated testing starts with no application credentials at all; authenticated testing gives the tester one or more real user roles. Authenticated testing can expose authorisation issues, role-separation weaknesses, and internal functionality an unauthenticated tester would never even see. For most applications, both perspectives genuinely matter, and if the application has distinct roles, customer, manager, administrator, support, API account, worth checking exactly which of those the test actually covered. A test run only as a standard user tells you little about whether administrative functions were assessed at all.

You'll also see **black box**, **grey box** and **white box** used, cautiously, since usage varies between providers. Black box broadly means little prior internal knowledge was given to the tester; grey box means some knowledge or access was provided; white box means significant system information, potentially including source code or configuration, was made available. None is inherently superior, the right choice depends on the objective, and it's worth checking directly whether source code review was actually included, since a penetration test frequently doesn't cover it unless explicitly scoped in.

<h2 id="methodology">Methodology</h2>

Look for what methodology, if any, the report references, which phases were actually performed, how much was manual testing versus automated tooling, how findings were validated, and how the report itself was structured. You might see references to the OWASP Web Security Testing Guide, the Penetration Testing Execution Standard (PTES, a framework dating to 2009 and still widely referenced, though it hasn't seen substantial revision in some years), NIST SP 800-115 (published in 2008 and still commonly cited despite its age), or CREST-aligned methodology. A report naming none of these isn't automatically poor, but the methodology should be genuinely understandable from what's written, not left to guesswork.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

A tool list is not a methodology. "Used Burp Suite, Nmap and Nessus" tells you what software ran. It tells you nothing about what was actually tested, how deeply, which scenarios were explored, which roles were exercised, or which attack paths were pursued. Don't mistake a tools section for evidence of thoroughness.

</div>

<h2 id="limitations">Limitations</h2>

Look specifically for statements describing what constrained the test: a time-boxed engagement, rate limiting, production-safety restrictions, unavailable test accounts, inaccessible components, an unstable environment, WAF interference, or API limitations. These directly shape how much assurance the report can actually provide. All engagements have constraints, two tester-days looks very different from a three-week assessment of a genuinely complex application, and longer isn't automatically better, but the depth achieved needs to be credible against the size of what was actually in scope.

<h2 id="severity">Executive summary and severity</h2>

An executive summary is genuinely useful for overall themes, major risks, scope, and headline recommendations, and genuinely insufficient as the whole review. It's written to simplify; the technical findings section is where the detail that actually matters lives.

Severity counts alone can mislead badly. "0 Critical, 1 High, 8 Medium, 12 Low" needs immediate follow-up questions: what was actually tested, what did "High" mean in this report's own scale, how was severity actually determined, were any findings assessed as chained together, and what business context, if any, informed the rating? Don't assume High automatically equals high business risk without checking.

Check whether severity uses CVSS, an internal scale, qualitative tester judgement, or some blend of these. **CVSS**, the Common Vulnerability Scoring System maintained by FIRST.org, provides a standardised way to communicate a vulnerability's technical characteristics and severity; version 4.0 is current, published November 2023, though version 3.1 remains widely used across scanners and advisories during an ongoing transition. Whichever version is in play, the same limitation applies: **CVSS measures technical severity, not business risk.**

A worked contrast makes this concrete. Finding A: CVSS 9.0, reachable only from an isolated test network nobody else can reach. Finding B: CVSS 6.5, an authentication bypass on an internet-facing customer portal touching sensitive data. Business priority genuinely doesn't have to match the raw score, and a report that only lists CVSS numbers without exposure context is handing you half the picture. This is the same technical-severity-versus-business-risk distinction covered in the [control testing article](/posts/security-control-testing/), applied here to a different evidence type.

<h2 id="reading-findings">Reading a finding properly</h2>

A useful finding should generally make clear what the issue actually is, where it occurs, why it matters, what evidence supports it, its assessed severity, and a recommendation, though exact formats genuinely vary between providers and there's no single correct template to demand.

A finding's title can be quietly misleading on its own. "Missing Security Header" could be a minor hardening observation, or it could be one link in a larger, genuinely exploitable chain. Read the detail before judging from the headline.

On evidence: does the report actually demonstrate the vulnerability was validated, existence, exploitability and impact, rather than simply asserted? Reasonable defensive-level evidence includes request/response detail, configuration extracts, screenshots, the specific affected endpoint, and a comparison between roles showing an authorisation gap. This article won't reproduce exploit payloads or proof-of-concept detail, and neither should the assurance conversation you have about a finding; the reviewer's job is confirming the finding was genuinely validated, not reproducing how.

Impact deserves its own read, separate from the tester's technical description. A finding described as "access control weakness" with a technical impact of "user could access another user's record" needs translating into business terms: for a healthcare platform, that's potential exposure of sensitive patient information, a materially different statement than the technical one alone, and exactly where assurance thinking earns its keep over a purely technical read of the same line.

<h2 id="chains-and-patterns">Chains and patterns</h2>

Individual low or medium findings, read in isolation, can understate real risk. Information disclosure, plus a weak access control, plus excessive privilege somewhere else in the chain, can together produce a genuinely significant compromise path that no single finding's severity rating would suggest on its own, without needing any exploitation detail to understand the shape of the problem. Worth asking directly: did the testers demonstrate one weakness actually enabling another? Would remediating just one finding break the chain, or does the underlying path survive regardless? A demonstrated attack chain can, and often should, change how findings get prioritised relative to their individual severity labels.

Recurring findings across successive reports carry their own signal. The same weakness appearing again, even on a different endpoint each time, can point toward ineffective remediation, an unaddressed root cause, a weakness in the development process itself, a risk that's been quietly accepted without anyone formally deciding to accept it, or a genuine control failure. A repeated Medium finding can matter more than an isolated High that got fixed immediately, because it's telling you something about the process, not just the instance.

It also helps to group findings by theme rather than reading each in complete isolation: authentication, authorisation, input handling, configuration, cryptography, session management, information disclosure, dependency management, infrastructure exposure. Ten low-severity findings clustered around configuration and access boundaries can indicate a systemic engineering weakness even where no single one of them looks individually serious.

<h2 id="remediation-and-retesting">Remediation and retesting</h2>

A strong report supports genuinely practical remediation, though quality here isn't measured by how many words the recommendation runs to. The real question is whether the proposed fix addresses the root cause. Broken authorisation "fixed" by hiding a button in the UI is a weak remediation; enforcing authorisation on the server side is the real one. If several endpoints were found missing authentication, that could be one isolated coding mistake, or a systemic, repeated pattern across the codebase, worth asking whether the supplier actually looked beyond the specific endpoints the report happened to name.

Retesting deserves to be one of the most important sections in this whole article, because it's routinely the weakest link in practice. "All findings fixed" from the supplier is a claim, not evidence, and a retest provides genuinely stronger assurance than a management statement alone. For each finding worth caring about, look for the original issue, its remediation status, the retest date, the outcome, and anything still outstanding. A targeted, proportionate retest of the specific findings that mattered is usually sufficient; demanding an entire fresh engagement is rarely necessary or proportionate.

Different closure statuses mean genuinely different things, and it's worth not treating them interchangeably: **fixed** means the underlying issue was actually remediated; **mitigated** means risk was reduced while the original issue may still technically exist; **accepted** means the risk remains and has been formally, knowingly retained by someone with the authority to do that; and anything marked **not applicable** or **false positive** deserves its own justification before being taken at face value, not just a label. None of these are universal, standardised report terms, exact wording varies, but the underlying distinctions are worth holding onto regardless of what a given report happens to call them.

<h2 id="no-findings">What "no findings" really means</h2>

A report with no findings at all can mean genuinely strong security. It can equally mean a narrow scope, shallow testing, a limited attack surface by design, restrictive test conditions, or, less commonly, a genuinely mature and well-defended system. None of these explanations should be assumed by default; the honest response to "no findings" is the same question that opens this whole article: what was actually tested?

"No Critical findings" specifically deserves its own caution. Critical is only one severity band among several, and a cluster of Medium findings, especially a chained or repeated pattern of them, can represent meaningful risk that a headline "0 Critical" comfortably obscures.

<h2 id="what-it-doesnt-prove">What it doesn't prove</h2>

A penetration test generally does not prove that every vulnerability was found, that the overall architecture is secure, that the codebase is secure more broadly, that cloud configuration is correct, that user access is well managed, that logging actually works, that a SOC would detect a real attack, that incident response would work in practice, that backups are recoverable, that the supplier's wider security programme is mature, or that controls operated effectively across an entire year rather than the narrow window the test actually covered.

The environment keeps changing after the test ends: new code releases, configuration changes, new dependencies, newly disclosed CVEs, new cloud resources spun up. An annual penetration test is not continuous security, and treating it as though it were is exactly the gap this whole article is trying to close.

```
SYSTEM SECURITY
       │
   ┌───┼───┐
   ▼   ▼   ▼
BEFORE TEST AFTER
changes  |  changes
      (one window)
```

The test sees one window. Everything before and after it is outside what the report can actually speak to.

<h2 id="complementary-evidence">Alongside other assurance</h2>

A penetration test complements, rather than replaces, the rest of a security programme: continuous vulnerability scanning for breadth, secure development practices to prevent weaknesses in the first place, threat modelling for design-level concerns, and code review for implementation-level ones. Defence is genuinely layered, and a pen test is one layer among several, not a substitute for the rest.

**Pen test vs SOC 2.** A [SOC 2 report](/posts/how-to-read-a-soc-2-report/) provides control assurance against defined Trust Services Criteria over a period; a penetration test provides a specific technical assessment of a defined scope at a point in time. Genuinely different questions, and a supplier offering both is giving you two different, complementary kinds of evidence, not the same evidence twice.

**Pen test vs ISO 27001.** [ISO 27001 certification](/posts/iso-27001-for-soc-analysts/) speaks to a structured security-management system; a pen test speaks to specific, technical, validated findings. Neither replaces the other.

**Pen test vs NZISM.** Where relevant, penetration testing can form part of the broader assurance expected for systems subject to NZ Government requirements; the [NZISM article](/posts/nzism-for-security-practitioners/) covers that governance context directly, worth reading rather than restated here.

<h2 id="quality-and-warnings">Quality indicators and warning signs</h2>

Without turning this into a formal certification of test quality, some genuinely useful positive signs: a clearly defined scope, clearly stated limitations, a recognisable and understandable methodology, realistic test conditions, meaningful technical evidence behind findings, business context applied to risk, clear and actionable remediation guidance, transparently listed exclusions, real retest evidence, and depth that's proportionate to what was actually in scope.

Things worth a direct follow-up question rather than automatic disqualification: a vague, poorly defined scope, a report several years old, findings that read purely as raw automated scanner output, no stated methodology at all, no supporting evidence for findings, no exclusions listed anywhere, a test environment that clearly wasn't representative, no authenticated testing for an application that's genuinely authenticated throughout, major findings marked closed with no retest behind them, identical report language recurring year after year with no apparent change, or significant product changes having happened since the test ran. None of these single-handedly invalidates a report. Each one is a reason to ask more before relying on it.

<h2 id="medconnect">The MedConnect scenario</h2>

The same fictional supplier used across the [ISO 27001](/posts/iso-27001-for-soc-analysts/), [NZISM](/posts/nzism-for-security-practitioners/), [supplier assurance](/posts/supplier-security-assurance/) and [SOC 2](/posts/how-to-read-a-soc-2-report/) articles, this time providing an annual penetration test report for its cloud patient portal.

**Scope.** The report covers the patient-facing web portal. Excluded: the mobile application, the API, the admin console, and AWS configuration. Given the API integration and privileged administrative access this relationship actually involves, this report alone almost certainly isn't sufficient assurance on its own, not because it's a bad report, but because the areas carrying the most material risk simply sit outside what it covers.

**A finding.** A Medium-severity finding: authorisation checks behave inconsistently in one patient-profile function. Worth working through properly rather than accepting the "Medium" label at face value: how sensitive is the data actually exposed, does this represent genuine user-to-user access risk, was exploitability actually validated or only theorised, what remediation followed, did MedConnect look for the same pattern elsewhere in the codebase, and was it retested afterward? Given the data involved, this specific finding may warrant more attention than a bare "Medium" label suggests on its own.

**Retest.** MedConnect provides a retest letter stating the finding is closed. Worth asking: was it the same testing team, what date, exactly which issue was retested, what was the outcome, and were related endpoints checked more broadly, or only the one originally reported? The same tester isn't a hard requirement, adequate validation is the actual bar.

<h2 id="review-workflow">A reusable review workflow</h2>

Confirm the supplier and system. Check the test date. Check the tester. Understand the objective. Read the scope. Read the exclusions. Confirm the test environment. Understand what credentials and roles were used. Review the methodology. Identify the stated limitations. Review the severity methodology. Read the findings themselves, not just the summary. Validate impact against your actual business context. Look for chained or systemic patterns. Compare against any previous reports. Check remediation. Check retesting. Identify which risk areas the engagement simply didn't cover. Determine what additional assurance is still needed. Update your residual-risk assessment accordingly.

Document your own review with a lightweight, reusable structure: test provider, test date, report date, retest date, system or service, environment, scope, exclusions, methodology, authentication and roles used, key findings, the highest relevant risk, any attack chains identified, findings still open, retest status, material changes since the test, the assurance actually obtained, remaining gaps, and follow-up required. Not a universal standard, the same practical model this series has used throughout.

<h2 id="talking-to-people">Talking to the tester and the supplier</h2>

Where a direct conversation with the tester is possible, it can reveal nuance a severity table never will: what concerned them most, what they genuinely couldn't test, where they spent most of their time, whether anything felt systemic rather than isolated, what attack paths came close to working, what they'd test next with more time, and whether environmental limitations shaped the results.

With the supplier, avoid opening adversarially, "you failed your pen test" rarely produces a useful conversation. "Help me understand how these findings were remediated," "what's changed since the test," "was this retested," "does this pattern show up anywhere else," and "was the API assessed separately" tend to get considerably further, and land you in the kind of collaborative assurance conversation the [supplier assurance article](/posts/supplier-security-assurance/) covers in more depth.

Focus stays on material risk, not every low-severity line. Twenty minor hardening observations usually matter less than one unresolved authorisation issue touching sensitive data, and chasing every Low finding equally is a poor use of assurance attention. That said, don't ignore the pattern hiding inside a pile of individually low-severity items; ten small findings clustered around the same theme is often the more important signal than any one of them read alone.

<h2 id="practical-exercises">Practical exercises</h2>

**Exercise 1.** A supplier says "annual pen test completed," scoped only to the corporate website. The service you're actually purchasing is a customer-facing SaaS platform. What assurance does this report actually give you?

**Exercise 2.** The pen test was completed fifteen months ago. Authentication has since migrated to a new identity provider entirely. Should the old report be treated as sufficient? What context changes the answer?

**Exercise 3.** Finding A: CVSS 9.0, reachable only from an isolated internal non-production network. Finding B: CVSS 6.5, an internet-facing customer portal issue affecting sensitive data. Which deserves priority, and why does the raw score alone not settle it?

**Exercise 4.** The supplier states "all High findings fixed," with no retest evidence provided. What should you actually do? Consider requesting targeted validation proportionate to the risk involved, rather than either accepting the claim outright or demanding a full new engagement.

**Exercise 5.** An API was deliberately excluded from scope because a different provider owns it, and that API handles customer data. What assurance is still genuinely required, and from whom?

**Exercise 6.** A two-day test of a large, complex application returns no findings at all. What should you ask before treating that as good news?

**Exercise 7.** The same access-control weakness shows up in reports from 2024, 2025 and 2026, each time on a different endpoint. What does this pattern suggest about the underlying development or control process, beyond the individual findings themselves?

<h2 id="interview-questions">Interview questions</h2>

"What do you look at first in a penetration test report?" Scope and relevance, before the severity counts, since the counts only mean something once you know what they were actually tested against. "What's the difference between vulnerability scanning and penetration testing?" Scanning is broad and largely automated; penetration testing is scoped, human-led, and attempts to validate genuine exploitability. "Why doesn't a clean pen test prove a system is secure?" It's a point-in-time assessment of a defined scope; it says nothing about what falls outside either boundary, and nothing about what changes afterward. "What would you do if a supplier provides an old pen test?" Check what's materially changed since, and request updated or targeted assurance proportionate to that change. "What if a critical API was excluded from scope?" Treat that area as still unassessed and seek separate assurance for it specifically. "How do you interpret CVSS?" As technical severity, not business risk, always read alongside exposure, exploitability and actual business context. "Why is retesting important?" Because a remediation claim is itself just a claim, and it needs the same evidence standard as the original finding. "Would you reject a supplier because they have High findings?" Not automatically, what matters is whether they were genuinely remediated and retested. "What does a repeated finding tell you?" Possibly that remediation isn't addressing the root cause, or that a systemic process weakness sits underneath the individual instances. "What other assurance would you want alongside a pen test?" Whatever the pen test's own scope doesn't reach, commonly SOC 2 or ISO 27001 evidence, vulnerability-management data, and architecture or code-level assurance for anything genuinely material outside the tested boundary.

A model answer worth having ready for "a supplier sends you a pen test report, how do you review it": confirm it actually covers the service being purchased; check the test date and anything material that's changed since; review scope and exclusions; understand the methodology, test conditions and roles used; read the findings and their supporting evidence; interpret severity against your own business context; look for chained or systemic issues; check remediation; check retesting; identify what the engagement simply didn't cover; combine all of this with whatever other assurance evidence exists; and land on a resulting residual-risk assessment, not a flat "approved" or "rejected."

<h2 id="common-misunderstandings">Common misunderstandings</h2>

"Annual pen test means continuously secure." No, it's one window in time. "No Criticals means low risk." No, other severities and chained findings still matter. "CVSS equals business risk." No, exposure and context change the real picture. "A pen test is a vulnerability scan." No, genuinely different depth and validation. "More findings means a worse tester or supplier." Not necessarily, it can mean more thorough testing. "No findings means an excellent test." Not necessarily, it can mean a narrow scope or shallow depth. "A staging test is always useless." No, understand its representativeness rather than dismissing it outright. "Every finding needs immediate remediation." Risk and context should drive prioritisation, not a blanket rule. "Management says fixed, so close the finding." Not without proportionate validation. "Retest means running the entire penetration test again." Not always, targeted validation of the specific finding is often sufficient. "A pen test replaces secure development." No, it's one layer among several. "A pen test replaces SOC 2 or ISO 27001." No, they answer different assurance questions entirely.

<h2 id="conclusion">The point</h2>

"Annual penetration test completed" is a genuinely good sentence to hear, and it's the start of the review, not the end of it. What was actually tested? When? How? What wasn't covered at all? What did testers actually find? What got fixed, and was that fix actually validated? What risk is left once all of that's been answered honestly?

A penetration test is real, valuable evidence. Its assurance value comes entirely from understanding its boundaries, not from the headline number sitting at the top of the executive summary. The most important number in a penetration test report is often not 0 Critical. Most of the time, it's the scope.
