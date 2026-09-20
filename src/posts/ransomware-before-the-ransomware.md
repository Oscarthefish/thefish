---
title: "Ransomware Before the Ransomware: What the SOC Should See Before Encryption Starts"
date: 2026-09-20
series: "soc"
categories:
  - "soc"
  - "ransomware"
  - "dfir"
tags:
  - "soc"
  - "ransomware"
  - "incident-response"
  - "investigation"
  - "detection-engineering"
  - "threat-actors"
  - "qilin"
  - "dfir"
  - "field-guide"
seoTitle: "Ransomware Before the Ransomware: What the SOC Should See Before Encryption Starts | Jason Hill"
description: "Ransomware encryption is usually a late-stage event, not the start of an intrusion. A practical look at initial access brokers, valid credentials, living-off-the-land activity and the warning signs a SOC sees before deployment."
coverImage: "ransomware-before-ransomware-cover.svg"
coverImageAlt: "Terminal-style illustration of an intrusion progressing from a quiet identity and remote-session node through discovery, privileged systems and lateral connections, into a dense cluster of encrypted endpoints."
---

By the time files start encrypting, the intrusion is usually old news. The attacker has typically already obtained access, often using credentials that worked the first time. They've likely established a way back in if their first foothold gets found. They've probably enumerated the environment, worked out who has privilege, moved laterally to reach it, staged data somewhere convenient, and pushed a chunk of it out the door. Some of them will have quietly interfered with the backups too, and disabled or blinded whatever security tooling sat in their way. Encryption is usually one of the last things that happens, not the first.

Which means the useful question isn't really "how did the ransomware get in." It's: what might the SOC have seen before the ransomware appeared, and why might those earlier signals have looked legitimate, low-risk, or simply unrelated to each other at the time?

This article isn't about ransomware file hashes, encryption extensions, or ransom note filenames. Those exist and they're useful, but by the point you're looking at them, a large part of the opportunity to have stopped this earlier has probably already gone. The interesting part, and the part worth actually training yourself to think about, is everything that happened before that.

Illustratively, a human-operated ransomware intrusion tends to move through something like this:

<pre class="flow-diagram"><span class="step">Initial access</span>
<span class="arrow">↓</span>
<span class="step">Persistence</span>
<span class="arrow">↓</span>
<span class="step">Discovery</span>
<span class="arrow">↓</span>
<span class="step">Credential access</span>
<span class="arrow">↓</span>
<span class="step">Privilege</span>
<span class="arrow">↓</span>
<span class="step">Lateral movement</span>
<span class="arrow">↓</span>
<span class="step">Data staging</span>
<span class="arrow">↓</span>
<span class="step">Exfiltration</span>
<span class="arrow">↓</span>
<span class="step">Defence impairment</span>
<span class="arrow">↓</span>
<span class="step">Ransomware deployment</span>
<span class="arrow">↓</span>
<span class="step">Encryption / extortion</span></pre>

Treat that as a rough shape, not a checklist. Real intrusions skip stages, run several concurrently, use completely different tooling from one affiliate to the next, and take anywhere from hours to weeks depending on how the operators involved like to work.

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#ecosystem">The ransomware ecosystem</a></li>
<li><a href="#vpn-case">A documented case: the 18-day gap</a></li>
<li><a href="#credentials-not-activity">Legitimate credentials, not legitimate activity</a></li>
<li><a href="#excessive-privilege">When "normal" includes excessive privilege</a></li>
<li><a href="#remote-access">Remote access and home networks</a></li>
<li><a href="#living-off-the-land">Living off the land</a></li>
<li><a href="#detonation-myth">The "ransomware detonation" myth</a></li>
<li><a href="#stage-by-stage">A stage-by-stage SOC view</a></li>
<li><a href="#boring-alerts">Boring alerts that suddenly matter</a></li>
<li><a href="#camouflage">Legitimate activity as camouflage</a></li>
<li><a href="#environment-is-the-problem">When the environment is the problem</a></li>
<li><a href="#four-gaps">Four different kinds of gap</a></li>
<li><a href="#qilin-case-study">Qilin case study</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#affiliates-evolve">Qilin affiliates evolve</a></li>
<li><a href="#synnovis">Synnovis: the cost of a downstream incident</a></li>
<li><a href="#working-backwards">Working backwards from encryption</a></li>
<li><a href="#worked-timeline">A generic worked timeline</a></li>
<li><a href="#threat-intelligence">Threat intelligence, used appropriately</a></li>
<li><a href="#detection-engineering">Detection engineering opportunities</a></li>
<li><a href="#architecture">Architecture matters</a></li>
<li><a href="#common-mistakes">Common mistakes</a></li>
<li><a href="#interview-refresher">SOC interview refresher</a></li>
<li><a href="#quick-reference">Quick reference</a></li>
<li><a href="#takeaway">Where this leaves the SOC</a></li>
<li><a href="#references">References</a></li>
</ul>
</div>
</div>
</div>

<h2 id="ecosystem">The ransomware ecosystem, briefly</h2>

It's worth understanding the business model before getting into the technical detail, because it changes how you should think about attribution.

Most major ransomware families today operate as Ransomware-as-a-Service. There's a distinction worth keeping straight: an operator, who develops and maintains the ransomware payload, the negotiation and leak-site infrastructure, and the affiliate portal; and affiliates, who are the ones actually conducting intrusions, using the operator's tooling and infrastructure, in exchange for a cut of whatever ransom gets paid. The operator rarely touches the victim's network directly.

This matters because it makes attribution genuinely messy. Two incidents attributed to the same ransomware family can look almost nothing alike underneath. Different affiliates use different initial access methods, different tooling, different dwell times, different lateral movement techniques, different exfiltration approaches. "This was a Qilin incident" or "this was a LockBit incident" tells you which payload eventually ran and which group takes credit for the extortion. It tells you comparatively little about how the attacker actually got there, which is exactly why building detection around a specific ransomware family's known indicators is a weaker strategy than it sounds.

<h3 id="initial-access-brokers">Initial Access Brokers</h3>

A specific role worth knowing: the Initial Access Broker, or IAB. An IAB specialises in obtaining access to organisations, through whatever means, and selling that access on to other criminal actors, who may then use it for ransomware, data theft, or something else entirely. That access might come from compromised VPN or remote-access credentials, stolen credentials more generally, exposed remote services, vulnerable perimeter systems, or credentials harvested by unrelated malware.

<pre class="flow-diagram"><span class="step">Initial Access Broker</span>
<span class="arrow">↓</span>
<span class="step">working access</span>
<span class="arrow">↓</span>
<span class="step">Ransomware affiliate</span>
<span class="arrow">↓</span>
<span class="step">environment reconnaissance</span>
<span class="arrow">↓</span>
<span class="step">privilege / lateral movement</span>
<span class="arrow">↓</span>
<span class="step">data theft</span>
<span class="arrow">↓</span>
<span class="step">ransomware</span></pre>

The defensive implication is worth sitting with: there can be a real, sometimes lengthy, gap between the moment a network is first compromised and the moment a ransomware operation actually begins inside it. The actor who obtained the initial foothold and the actor who eventually deploys the ransomware may not be the same person, or even the same group. That gap is exactly where a lot of missed opportunity lives.

<h2 id="qilin-intro">Qilin as a recurring example</h2>

The rest of this article leans on Qilin, correctly spelled with a capital Q and no apostrophe, as a recurring real-world reference point. Qilin operates as a RaaS ecosystem; it traces back to a Golang-based operation called Agenda that first appeared around July 2022, which rebranded under the Qilin name around September 2022 alongside a new Rust-based payload. Group-IB's Threat Intelligence team infiltrated Qilin's affiliate operation, posing as a prospective affiliate, and published research on it in May 2023, documenting an affiliate panel with sections for targets, victim blog entries, team member management, payment tracking and FAQs, and a payout structure of 80% of ransoms of $3 million or less and 85% above that threshold going to the affiliate rather than the operator. Qilin, like most modern ransomware operations, has used double extortion: encrypting systems and stealing data, then threatening to publish the data regardless of whether the victim pays for decryption.

<div class="callout callout--tip">

<p class="callout-label">A note on sourcing</p>

What follows uses two genuinely separate, publicly documented Qilin-affiliated incidents, investigated at different times by different Sophos teams. They are not the same intrusion, and this article does not combine details from one into the other. Where something isn't publicly established for a specific case, that's said explicitly rather than filled in.

</div>

<h2 id="vpn-case">A documented case: compromised VPN credentials and an 18-day gap</h2>

<div class="callout callout--watch">

<p class="callout-label">Documented</p>

The following is drawn from Sophos X-Ops' own published investigation of a specific Qilin-linked intrusion in 2024. Details and quoted uncertainty are preserved as published.

</div>

Sophos X-Ops investigated a Qilin ransomware breach in which the attacker's initial access came through compromised credentials used against a VPN portal that lacked multi-factor authentication. Eighteen days passed between that initial access and the point where the attacker's activity escalated into lateral movement toward a domain controller. Sophos was careful about what that gap does and doesn't establish, writing that the dwell time "may or may not indicate that an Initial Access Broker (IAB) made the actual incursion." That's a genuinely open question in the published research, not a confirmed fact, and it's worth resisting the temptation to round it up to "an IAB sold the access," because the source material doesn't say that.

Once the attacker reached the domain controller, they modified the default domain policy to introduce a logon-triggered Group Policy Object containing two components: a PowerShell script and a batch file that invoked it at user logon. The PowerShell script, nineteen lines long, harvested credentials stored in the Chrome browser on machines that processed the logon script, writing the results to files in SYSVOL named after the infected hostnames. Sophos noted the attacker left this GPO active for over three days, apparently confident enough that it wouldn't be noticed, which gave it time to catch a large share of users as they logged on. After exfiltrating what it had harvested, the attacker deleted the resulting files and cleared event logs on both the domain controller and the affected endpoints.

<h3 id="eighteen-day-gap">Using the 18-day gap as a teaching point</h3>

This is one of the more useful things in the whole case, precisely because of how unremarkable it would have looked at the time.

```text
Day 0
Compromised VPN credentials
        ↓
Successful authentication
        ↓
        ...
        18 days
        ...
        ↓
Attacker activity increases
        ↓
Lateral movement
        ↓
Domain controller
        ↓
GPO / PowerShell activity
        ↓
credential access
        ↓
ransomware operation
```

What would Day 0 have actually looked like to a SOC watching it happen, without the benefit of everything that came after? Almost certainly something like: a user successfully authenticated to the VPN. Nothing exploded. No ransomware binary existed yet, possibly for over two and a half weeks. No encryption occurred. The credentials presented were, as far as the authentication system was concerned, entirely valid. That's the lesson worth sitting with, because it's exactly the kind of event that gets glanced at and closed, and there was genuinely very little in that single event to justify treating it otherwise at the time.

<h2 id="credentials-not-activity">Legitimate credentials are not legitimate activity</h2>

This deserves to be one of the central ideas carried through the rest of the article. A successful login tells you one specific thing: the authentication material supplied was accepted. It does not tell you that the legitimate account owner was the one who supplied it.

Worth investigating around any authentication event: source IP and ASN, rough geography, device, whether this matches the account's normal pattern, time of day, whether other sessions are concurrently active, any recent failures leading up to it, whether MFA was satisfied and how, and, most importantly, what happened after the login succeeded. It's just as worth being honest about the limits of each of those. Users genuinely travel. They genuinely work late. They use VPNs, change devices, and connect from home for entirely mundane reasons. Anomaly alone, in isolation, is not proof of anything. It's a reason to look, not a conclusion.

<h2 id="excessive-privilege">When "normal" already includes excessive privilege</h2>

Consider a fairly ordinary hypothetical environment where a meaningful number of staff have local administrator rights on their own machines, several have broader domain privileges than their actual job requires, quite a few can reach a wide range of servers, and remote administration tooling is available to more people than strictly need it. None of that is unusual. A lot of real environments look exactly like this, often for reasons of convenience rather than deliberate design.

Now imagine an attacker obtains the credentials of just one of those people.

```text
VALID ACCOUNT
     +
EXCESSIVE PRIVILEGE
     +
REMOTE ACCESS
     =
ATTACKER ACTIVITY THAT MAY LOOK AUTHORISED
```

The resulting problem for a SOC is genuinely hard: the subsequent activity may fall entirely within what that account is technically permitted to do. It's worth being precise about the distinction between authorised capability and authorised behaviour. An account being allowed to perform an action doesn't mean every instance of that action, by that account, is legitimate. The capability is a fact about the account. The legitimacy of any specific use of it is a separate question the SOC still has to answer.

<h2 id="remote-access">Remote access, home networks, and the question that actually matters</h2>

RDP, VPN access, RMM tooling and other remote administration mechanisms aren't inherently a problem, and it's worth resisting the framing that they are. Plenty of organisations legitimately need staff, contractors or third-party support to reach internal systems from outside the office, sometimes from home, sometimes from an unmanaged device, sometimes through a third party's own network entirely.

The useful questions aren't "is RDP present" or "is remote access allowed." They're why this particular access exists, who actually needs it, from where, whether MFA is required on it, whether it's restricted to expected sources, which account authenticated, and, again, what happened immediately afterward. Legitimate remote administration is exactly the kind of cover that makes malicious remote access hard to spot, because the mechanism itself is identical either way. A privileged user authenticating remotely from home is very often completely normal. The question that actually separates the two situations is what they did once they were in.

<h2 id="living-off-the-land">Living off the land, and why the tool is never the detection</h2>

This deserves real space here too, and it connects directly to the reasoning already covered in the [PowerShell and LOLBins article](/posts/powershell-is-not-the-alert/): attackers don't necessarily need to bring anything new into the environment. PowerShell, `cmd.exe`, WMI, RDP, scheduled tasks, service control, SMB, and legitimate RMM software are all already present, already trusted, and already doing exactly what they were built to do, right up until someone uses that same legitimate capability toward a different end.

```text
Administrator uses PowerShell        Attacker uses PowerShell
Administrator uses RDP               Attacker uses RDP
IT deploys RMM software              Attacker deploys RMM software
```

The process names are identical either side of that line. What differs is intent and everything around it. Weak logic treats `powershell.exe` itself as the signal, which is close to useless given how constantly it runs legitimately. What actually holds up is looking at who ran it, what its parent process was, the command itself, which host it ran on, where it connected to, when it happened relative to everything else, how prevalent this exact pattern is across the estate, and the sequence it sits inside.

<h2 id="detonation-myth">The "ransomware detonation" myth</h2>

A lot of mental models for ransomware still look roughly like this:

```text
Phishing
   ↓
ransomware.exe
   ↓
encryption
```

Human-operated ransomware, the kind behind most of the significant incidents in recent years, tends to look considerably more like this instead:

```text
Access
   ↓
quiet period
   ↓
reconnaissance
   ↓
credentials
   ↓
privilege
   ↓
lateral movement
   ↓
data theft
   ↓
defence impairment
   ↓
mass deployment
   ↓
encryption
```

Not every incident follows this exact shape, and some genuinely do compress down toward the simpler version. But treating the simplified model as the default is exactly what makes the quiet, early, apparently mundane stages easy to miss, because nothing about them looks like the version of "ransomware attack" most people are picturing.

<h2 id="stage-by-stage">A stage-by-stage SOC view</h2>

For each stage that follows, the same five questions apply: what is the attacker trying to achieve, what might the SOC actually see, why might that look legitimate at the time, what would raise genuine concern, and what's the sensible next pivot.

<h3 id="stage-1-initial-access">Stage 1: Initial access</h3>

Common high-level paths include valid credentials being used directly, phishing, exploitation of a vulnerable perimeter service, remote access mechanisms, and access via a third party or MSP. Telemetry might come from VPN authentication logs, identity provider logs, email security telemetry, firewall or WAF logs, EDR, and vulnerability or exposure data.

It might look entirely legitimate because, on the surface, it usually is: a successful authentication with valid-looking credentials, nothing overtly broken. What raises genuine concern is a source that's never been seen for this account, a first-seen device or unfamiliar ASN, an unusual time relative to that user's normal pattern, a privileged account involved at all, an absence of MFA on the path used, or an authentication that overlaps impossibly or improbably with another active session. None of those, individually, is proof. They're reasons to pull the thread.

<h3 id="stage-2-persistence">Stage 2: Persistence</h3>

Possible indicators include new accounts, newly installed RMM software, new scheduled tasks or services, startup changes, new OAuth application grants, or persistence riding on an already-approved remote management tool.

The SOC might reasonably ignore this because IT genuinely installs software constantly, administrators create scheduled tasks as a matter of routine, services come and go, and remote tools may already be approved for legitimate use across the estate. Worth asking who created it, from where, and why; how prevalent this specific artefact is; whether a change ticket exists; what the parent process was; and, critically, whether the timing sits close to anything else that's already looked slightly off.

<h3 id="stage-3-discovery">Stage 3: Discovery</h3>

Attackers need to understand the environment they've landed in before they can move usefully through it. Possible behaviour includes host and domain enumeration, account and group discovery, share discovery, network scanning, and probing for backup systems or security products.

This is genuinely hard to catch cleanly, because administrators, monitoring tools and inventory software all do exactly the same things as a matter of course. Discovery becomes considerably more interesting when it originates from an unusual workstation, an identity that doesn't normally perform this kind of activity, a recently compromised account, or a remote session that was only just established.

<h3 id="stage-4-credential-access">Stage 4: Credential access</h3>

Defensive telemetry might include suspicious interaction with credential-sensitive processes, credential-dumping detections, browser-stored credential access, unusual access to stored secrets, or unusual identity and service-account activity. This is exactly the category the Sophos Chrome-harvesting case above sits in: a single successful credential grab, run at scale across a logon script, can multiply one compromised foothold into a large number of additional working credentials, which is precisely why it's worth treating credential access as a distinct stage worth its own attention rather than folding it into "lateral movement" generally.

<h3 id="stage-5-privilege">Stage 5: Privilege</h3>

Worth watching: changes to privileged group membership, an admin account being used from a system it doesn't normally touch, new privilege assignments, service-account misuse, or simply unusual use of a privileged identity that already existed. It's worth making the point plainly: attackers very often don't need to "hack" their way to admin. They frequently just need the credentials of someone who already has more privilege than their role strictly requires, which circles straight back to the excessive-privilege problem covered earlier.

<h3 id="stage-6-lateral-movement">Stage 6: Lateral movement</h3>

Evidence here tends to come from RDP, SMB, WinRM, WMI, remote services, RMM tooling, or privileged authentication occurring across multiple systems, all of which are ordinary administrative mechanisms on their own. Sequence is what actually gives this meaning:

```text
Unusual VPN login
     ↓
same identity performs AD discovery
     ↓
RDP to server
     ↓
privileged authentication
     ↓
SMB fan-out
```

Any single line here has a plausible explanation sitting on its own. Strung together, in this order, in a tight window, they deserve serious attention.

<h3 id="stage-7-exfiltration">Stage 7: Data staging and exfiltration</h3>

Modern ransomware operations very often involve extortion through stolen data alongside encryption, sometimes instead of it. Possible signals include archive creation, unusual compression activity, unusually large file collections being assembled, abnormal outbound data volume, transfers to a newly used external or cloud file-sharing destination, or unusual network behaviour originating from a server rather than a workstation. It's worth remembering that backup jobs compress data as a matter of course, users legitimately upload large files, and cloud sync tools generate real traffic constantly. Context is what separates the two, not the raw behaviour.

<h3 id="stage-8-defence-impairment">Stage 8: Defence impairment</h3>

Warning signs worth treating seriously include a security service being stopped, an EDR sensor going quiet, event logs being cleared, firewall configuration changing, logging being modified, new AV exclusions appearing, or backup tooling being interfered with. This stage should meaningfully raise concern more than most of the others. It's still worth checking for legitimate explanations: planned maintenance, a software upgrade, a genuinely broken sensor, or a policy rollout that happens to coincide. Correlation with everything else going on is what actually changes the assessment.

<h3 id="stage-9-backup-interference">Stage 9: Backup interference</h3>

Ransomware operators frequently want recovery to be as hard as possible, which makes backup infrastructure a specific target rather than an afterthought. Watch for backup services being stopped, backup repositories being accessed unexpectedly, snapshots being removed, administrative access appearing on backup infrastructure from an unusual source, or unusual deletion activity generally. Backup infrastructure is worth treating as highly privileged infrastructure in its own right, with its own monitoring and its own tighter access boundary, precisely because of how attractive a target it is at exactly this stage.

<h3 id="stage-10-deployment">Stage 10: Deployment</h3>

By this point the intrusion is usually obvious, sometimes for the first time. Signals include an identical binary appearing across many hosts near-simultaneously, mass remote execution, a new service or task appearing estate-wide, rapid file modification, unfamiliar file extensions, ransom notes, storage activity spikes, and a sudden wave of security alerts across many hosts at once.

The question worth asking at this point isn't really "how did this happen." It's: what was the earliest event in this entire chain that we could reasonably have acted on. That question matters considerably more than simply documenting the encryption event itself.

<h2 id="boring-alerts">Boring alerts that suddenly matter</h2>

Here's a sequence worth sitting with, because it's closer to how these incidents actually read in hindsight than any single dramatic moment.

```text
Unusual VPN login              → ticket closed
New RMM tool                   → ticket closed
Large number of AD queries     → ticket closed
Multiple RDP sessions          → ticket closed
Backup service stopped         → assigned elsewhere
EDR agent stops reporting      → sensor problem assumed
Ransomware detected on 70 hosts → everyone sees it now
```

The lesson here isn't that the analysts involved were incompetent. It's that each event was interpreted independently, on its own, by whoever happened to pick up that ticket, without ever being placed next to the others.

```text
VPN anomaly
      +
new remote tooling
      +
AD discovery
      +
RDP / SMB fan-out
      +
backup interference
      +
EDR impairment
      =
a very different picture
```

Individually, every one of those closures might have been entirely reasonable given what that analyst could see at that moment. Together, they tell a story none of them had in front of them.

<h3 id="alert-fatigue">Alert fatigue is a real constraint, not an excuse</h3>

SOC analysts can genuinely be looking at thousands of alerts across a shift, and a meaningful share of them are noisy, repetitive, poorly contextualised, or technically accurate while being operationally meaningless. Attackers benefit from exactly this, whether or not it's deliberate on their part. The answer isn't "analysts need to look harder," which is both unfair and rarely effective. It's better detection engineering, genuine correlation across sources, entity and identity context surfaced at the point of triage, risk-based alerting that weighs asset criticality, historical baselining, automation and enrichment doing the boring lookups before a human ever sees the alert, and escalation criteria that actually reflect what matters.

<h3 id="tunnel-vision">Tunnel vision closes tickets too early</h3>

This connects directly to the reasoning in [Alert to Conclusion](/posts/alert-to-conclusion-investigating-without-tunnel-vision/). An analyst receives "suspicious RDP," checks whether that RDP session was actually permitted, finds that yes, it was, and closes the ticket. That's a real investigation of a narrow question, and it's also nowhere near enough. A stronger version asks why this account, why this source, what happened immediately before the session, what the user actually did after logging in, whether this is common for them, whether the account is privileged, what other systems it subsequently reached, and whether it connects to anything else currently sitting in the queue.

<h2 id="camouflage">Legitimate activity as attacker camouflage</h2>

This is arguably the most important idea in the whole article, so it's worth stating as plainly as possible.

```text
VALID CREDENTIAL
+
VALID TOOL
+
VALID PROTOCOL
+
VALID PRIVILEGE
```

can still add up to:

```text
MALICIOUS ACTIVITY
```

<div class="callout callout--tip">

<p class="callout-label">Analyst tip</p>

The honest failure in a lot of these incidents isn't "we failed to detect malware." It's closer to "we had no reliable way of telling expected administrative behaviour apart from malicious use of the exact same administrative capability." That's a considerably harder problem than tuning a signature, and it's worth naming directly rather than quietly treating every miss as a detection-engineering gap that a better rule would have caught.

</div>

<h2 id="environment-is-the-problem">Sometimes the environment is the problem</h2>

A few examples worth recognising, because any one of them can independently make malicious activity indistinguishable from normal use: users routinely holding local admin rights, privileged accounts being used for everyday browsing and email, RDP exposed more broadly than it needs to be, MFA missing on meaningful paths, shared accounts, service accounts being used interactively, unmanaged remote devices reaching internal systems, overly permissive firewall rules, flat networks with little internal segmentation, remote administration permitted from effectively anywhere, the same account reused across many systems, patchy asset inventory, and weak visibility into change management. Sometimes the actual problem isn't a missing detection rule at all. It's that the environment's own design makes malicious activity look exactly like the normal kind.

<h2 id="four-gaps">Four different kinds of gap</h2>

It's worth pulling apart a few categories that tend to get lumped together as "we missed it."

**Visibility gaps**, where the evidence was simply never collected: VPN logs not ingested, authentication data retained too briefly, EDR missing from servers rather than just workstations, no command-line auditing, no PowerShell Script Block Logging, no DNS telemetry, no proxy logs, missing domain-controller logs, backup-system logs excluded from the SIEM, firewall denies collected while allows are ignored, RMM telemetry unavailable, or thin cloud audit coverage. If the evidence was never collected, there's nothing left to correlate later, however good the analyst.

**Detection gaps**, where the telemetry exists but nothing alerts on it. The SIEM might genuinely hold the VPN login, the 4624, the 4769, and the firewall activity, all present and searchable, with no logic actually connecting them into anything worth surfacing. That's a correlation problem sitting on top of perfectly good visibility, not a missing log source.

**Context gaps**, where an alert fires but arrives stripped of the detail that would tell you whether it matters. `Successful VPN login: jsmith` says very little on its own. What it doesn't show, without extra work, is that jsmith is a Domain Admin, that the source ASN has never been seen for this account before, that jsmith normally only ever authenticates from a specific managed workstation, that another session was already active at the same time, or that the same account went on to touch five more servers shortly afterward. Without that context sitting next to the alert, it looks like nothing much.

**Process gaps**, where the telemetry and the alerts both genuinely exist, but different analysts or teams own different pieces of it, they sit in different queues, get worked in different tools, get closed independently of each other, survive a weak shift handover, get suppressed by a low severity rating before anyone escalates, or never get correlated into a single incident at all. Security failures here are usually systemic rather than one person missing one specific event.

<h3 id="what-failed-model">A model for "what actually failed"</h3>

```text
Preventative control gap
        ↓
Access was possible

Visibility gap
        ↓
We did not record it

Detection gap
        ↓
We recorded it but did not alert

Context gap
        ↓
We alerted but could not judge its importance

Correlation gap
        ↓
We saw individual events but not the pattern

Process gap
        ↓
We understood risk but response broke down

Response gap
        ↓
Action came too late
```

Worth adding, where relevant: architecture and recovery gaps sitting either side of this chain, since a weak segmentation model or an unprotected backup boundary can undo good detection work just as thoroughly as a missing log source can.

<h3 id="prevent-detect-respond">From every stage: prevent, detect, contextualise, correlate, respond</h3>

For any given stage above, it's worth deliberately separating what would have prevented it in the first place, from what would have detected it, from what would have made a detection actually legible, from what would have connected it to everything else, from what the appropriate response actually looks like. MFA on remote access is a prevention measure. A rule that flags a privileged account authenticating from a first-seen VPN source is a detection measure. Showing that account's privilege level, the asset it's touching, and its historical behaviour directly inside the alert is contextualisation. Recognising that the VPN login was followed by discovery activity and then privileged lateral authentication is correlation. Revoking the session, investigating the endpoint, and restricting the identity while that happens is response. Keeping these separate stops "we should have had MFA" from becoming the entire post-incident conversation when several other layers also had a role to play.

It's worth being honest that none of these layers are perfect. MFA helps enormously and can still be phished or bypassed, as the ScreenConnect case further down shows directly. EDR helps and can still fail, be evaded, or simply go quiet. Segmentation helps and can still be misconfigured or incomplete. The honest version of the claim isn't "MFA would have stopped this ransomware attack." It's closer to "MFA would have removed, or significantly narrowed, one of the more common access paths into this kind of incident."

<h2 id="qilin-case-study">Qilin case study: applying the framework to a real incident</h2>

<div class="callout callout--watch">

<p class="callout-label">Documented</p>

Returning to the Sophos-investigated VPN and Chrome-credential case described earlier, applying the same question set used throughout this article.

</div>

At the VPN authentication stage: the telemetry that would exist is a successful authentication event, source IP, and whatever session metadata the VPN platform logs. Without hindsight, this looks like exactly what it is on the surface, a successful login with accepted credentials. What might make it look legitimate is simply that the credentials worked and nothing else about the event stood out. What would raise confidence that something was wrong is the same list covered earlier: an unfamiliar source, no MFA on the path at all, or an account behaving differently from its established pattern. A detection worth building from this is a privileged, or even non-privileged, VPN authentication from a source that's never been associated with that account before. A preventative control that would have removed this specific path entirely is MFA on the VPN portal itself, which Sophos's write-up notes was absent.

At the eighteen-day mark, once lateral movement toward the domain controller began: the relevant telemetry would be authentication events reaching the domain controller from the original compromised identity, alongside whatever process or command telemetry existed on the intermediate hosts it touched along the way. Without hindsight, this could look like a privileged user doing privileged things on a system they're plausibly allowed to touch. What raises real confidence is the combination of a long dormant period followed by a sudden shift toward a genuinely sensitive system, particularly from an identity or source that doesn't normally go anywhere near it. Domain-controller access monitoring and unusual-authentication-pattern detection both sit squarely in this gap.

At the GPO modification and PowerShell credential harvesting stage: the telemetry that matters is a domain policy change event, the specific GPO content itself, and PowerShell execution and Script Block Logging output on any endpoint that processed the logon script. Without hindsight, a GPO change might not draw attention at all unless something is specifically watching for policy modifications, which is exactly the kind of activity that blends into normal domain administration if nobody's built a detection for it. What raises confidence sharply is a logon-triggered GPO that didn't exist before, containing a script referencing browser credential stores, deployed outside any documented change window. Worth building here: alerting on GPO changes generally, and specifically on any policy that triggers script execution at logon, alongside PowerShell telemetry able to actually reveal what a script block is doing rather than just that PowerShell ran.

At the log-clearing stage, once the attacker had exfiltrated what they wanted: event log clearing is itself a loud, specific, well-understood signal, and it's one of the few places in this entire chain where a single event genuinely deserves strong, immediate attention on its own rather than needing much correlation to justify it.

<h3 id="breaking-the-chain">What could have broken this specific chain?</h3>

Worth naming, without claiming any single one of these would have guaranteed prevention on its own: MFA on the VPN portal; more restrictive access controls around remote entry generally; clearer separation between everyday and privileged accounts, so that whatever got compromised initially wasn't itself capable of reaching a domain controller; baselining of unusual VPN sources specifically for privileged identities; domain-controller access and change monitoring; alerting on unusual GPO modifications; PowerShell Script Block Logging actually enabled and reviewed; credential-access detections tuned toward browser credential stores specifically; and alerting on event-log-clearing activity. Layered together, any reasonable subset of these would have materially improved the odds of interrupting this specific chain earlier. None of them, alone, is a guarantee.

<h2 id="affiliates-evolve">Qilin affiliates evolve, and that's the point</h2>

<div class="callout callout--watch">

<p class="callout-label">Documented</p>

A separate Qilin-linked incident, investigated by Sophos MDR and publicly documented in 2025, unrelated to the VPN case above.

</div>

In late January 2025, an administrator at a managed service provider received a well-crafted phishing email mimicking an authentication alert for the organisation's ScreenConnect remote-monitoring platform. The phishing infrastructure used the evilginx adversary-in-the-middle framework, proxying the administrator's login attempt through a lookalike domain to the real ScreenConnect service in real time, which let it capture not just the password but the time-based one-time passcode sent to complete MFA, and the resulting session. Sophos MDR attributed the activity with high confidence to an affiliate cluster it tracks separately, noting infrastructure and technique patterns consistent with phishing activity going back to late 2022. Once the administrator's credentials and session were captured, Qilin ransomware was deployed against multiple downstream customer environments the MSP managed, each with its own unique password, which is itself a small but telling detail about how deliberately the affiliate was targeting several distinct organisations through one compromised administrator.

This case shares almost nothing technically with the VPN and Chrome-harvesting incident described earlier. Different access method, different target profile, MFA present here but defeated through a phishing-relay technique rather than simply absent as in the other case, and an MSP supply-chain angle that isn't present in the first case at all. The lesson worth drawing from putting these two side by side isn't a Qilin-specific checklist. It's that the same ransomware brand, and quite possibly overlapping affiliate infrastructure, can arrive through genuinely different doors. Detect the behaviour: unusual authentication, credential and session harvesting, privilege misuse, lateral movement, defence impairment. Don't build your defence around what one particular group happened to do last time.

<h2 id="synnovis">Synnovis: what a downstream ransomware incident actually costs</h2>

<div class="callout callout--watch">

<p class="callout-label">Documented</p>

Facts here are drawn from NHS England's own published incident pages and corroborating reporting. Where the technical entry point isn't publicly disclosed, that's stated explicitly rather than inferred.

</div>

On 3 June 2024, Synnovis, a pathology partnership serving NHS trusts across south-east London, suffered a ransomware attack that significantly disrupted its ability to process blood and pathology tests. The impact fell hardest on Synnovis's partner trusts and their local boroughs in south-east London, and in the immediate aftermath the two most affected trusts alone postponed over ten thousand acute outpatient appointments and more than seventeen hundred elective procedures. On 20 June 2024, the group responsible published data it had stolen during the intrusion. By the time NHS England's forensic investigation concluded, in November 2025, the cumulative impact was recorded as more than eleven thousand outpatient and elective procedure delays across south-east London. Rebuilding the affected IT infrastructure took until late autumn 2024, and all Synnovis services available before the attack were reported restored by December 2024. Synnovis worked with the National Cyber Security Centre and law enforcement throughout, and separately obtained a legal injunction aimed at preventing further use or publication of the stolen data. The incident has been widely and consistently attributed to the Qilin ransomware operation.

What is not publicly established, and what this article deliberately does not speculate about, is the specific technical initial access route into Synnovis's environment, the credentials involved, the exact endpoints touched, any specific vulnerability exploited, or the precise lateral movement path taken inside the network. If that detail becomes part of the public record through an official investigation, it belongs in an update to this article rather than a guess sitting in it now.

<h3 id="why-synnovis-matters">Why this matters to a SOC analyst specifically</h3>

A strange login doesn't look dramatic. It doesn't look like months of pathology capacity running at reduced volume, cancelled and delayed procedures numbering in the thousands, sensitive patient data published publicly, or the better part of a year spent rebuilding infrastructure and restoring trust. That gap, between how small an early signal looks and how large the eventual consequence can become, is precisely why early detection exists in the first place. This isn't written to sensationalise a genuinely serious disruption to patient care. It's written because the distance between "a login succeeded" and "a pathology service across several hospitals is degraded for months" is exactly the distance this entire article is trying to close.

<h2 id="working-backwards">Working backwards from encryption</h2>

A useful post-incident exercise, whether the incident is real or a training scenario, is to deliberately start from the end and walk backward.

```text
Ransomware encrypted systems
        ↑
How was it deployed?
        ↑
What account/tool deployed it?
        ↑
How was privilege obtained?
        ↑
Where did credentials come from?
        ↑
How did the actor move?
        ↑
Where did access originate?
```

This is the shape of good post-incident detection engineering: not just documenting what the ransomware did once it ran, but tracing the full chain that made that moment possible, and asking at every link what evidence existed, and whether a detection could realistically have been built from it.

<h3 id="earliest-intervention">The earliest reasonable intervention, not the earliest malicious event</h3>

Worth being precise about the question here, because it's easy to ask the wrong one. Not: what was the first malicious event in this whole chain. Instead: what was the earliest point where the evidence actually available to the defender at that time reasonably justified intervening.

Those are genuinely different questions. The very first VPN login might have been too ambiguous on its own to justify anything beyond a shrug, and treating it as the point where everything should have stopped is unrealistic given what was visible at the time. The combination of that VPN login, plus an unexpected RDP session shortly after, plus privileged authentication that doesn't fit the account's normal pattern, might be the first point where a defensible case for intervention actually existed. Finding that point, honestly, is a more sophisticated and more useful exercise than simply flagging the earliest thing that turned out, in hindsight, to have been part of the attack.

<h3 id="hindsight-bias">Hindsight bias is worth naming directly</h3>

Once ransomware detonates, every earlier anomaly looks obvious in retrospect. It very often wasn't obvious at the time, and saying "the SOC should clearly have caught this" after the fact is usually unfair to whoever was actually looking at a single ambiguous event in isolation, without the benefit of everything that came later. A fairer post-incident assessment looks at what information was genuinely available at that moment, the quality of the alert itself, what baseline existed to compare against, what context was or wasn't surfaced, what telemetry existed at all, the analyst's actual workload at the time, and how the risk would reasonably have been assessed given all of that. The point of a post-incident review is to improve the systems and processes around detection, not to find the person who happened to be holding one piece of a puzzle nobody had assembled yet.

<h2 id="worked-timeline">A generic worked timeline</h2>

<div class="callout callout--tip">

<p class="callout-label">Illustrative</p>

The following is a fictional, generic scenario for training purposes. It is not the Qilin/Sophos case, the ScreenConnect case, or the Synnovis incident, and shouldn't be read as a factual account of any of them.

</div>

```text
Day 1  22:14  Successful VPN authentication
Day 1  22:32  RDP to internal server
Day 1  22:45  AD enumeration
Day 2  00:11  Privileged authentication
Day 2  00:18  SMB connections to several hosts
Day 2  00:31  New remote management software installed
Day 2  01:09  Archive created
Day 2  01:43  Large outbound transfer
Day 2  02:06  Backup service stopped
Day 2  02:11  EDR telemetry lost on several hosts
Day 2  02:23  Mass file modification begins
```

**22:14, successful VPN authentication.** Observation: a valid account authenticated successfully. Benign explanation: this is an ordinary remote logon, possibly a user working late or from home. What increases suspicion: an unfamiliar source ASN, no prior history from this location for this account, or the absence of MFA on the path used. Next pivot: check the account's normal authentication pattern and whether this source has been seen before. Reasonable to contain yet: no, on this alone there's nowhere near enough to justify it.

**22:32, RDP to an internal server.** Observation: the same session initiated an RDP connection eighteen minutes after authenticating. Benign explanation: legitimate remote administration, entirely plausible if this account holds admin rights. What increases suspicion: this specific account doesn't normally use RDP, or doesn't normally reach this particular server. Next pivot: check whether RDP is a normal behaviour for this identity, and what the target server actually is. Reasonable to contain yet: still no, though this is the point where the picture starts to firm up slightly.

**22:45, Active Directory enumeration.** Observation: the session is querying AD, users, groups, and structure. Benign explanation: administrators run inventory and audit queries constantly, and so does monitoring software. What increases suspicion: the volume or breadth of the queries, or the fact that they're originating from a session that only authenticated half an hour earlier. Next pivot: compare against this account's historical query patterns, if any exist to compare against. Reasonable to contain yet: not conclusively, but this is worth flagging for a closer look rather than closing outright.

**Day 2, 00:11, privileged authentication.** Observation: a privileged credential authenticates, roughly ninety minutes after the original VPN session began. Benign explanation: on-call administrative work, which happens. What increases suspicion: this privileged account is not the one that authenticated to the VPN originally, suggesting credential reuse or escalation, or the timing is unusual even for genuine on-call activity. Next pivot: establish the relationship between this identity and the original session, and whether privilege escalation actually occurred or a second valid credential was simply used. Reasonable to contain yet: this is close to the point worth treating as a serious candidate, particularly combined with everything before it.

**00:18, SMB connections to several hosts.** Observation: the same privileged session is connecting to multiple systems over SMB in quick succession. Benign explanation: legitimate administrative fan-out, software deployment, or a scripted maintenance task. What increases suspicion: the number and diversity of hosts being touched, especially if it doesn't match any known maintenance window. Next pivot: check for a corresponding change record, and start scoping which hosts have actually been reached. Reasonable to contain yet: this is a strong candidate point for at least partial containment, pending confirmation.

**00:31, new remote management software installed.** Observation: RMM software appears on one or more hosts that weren't running it before. Benign explanation: legitimate deployment of approved tooling. What increases suspicion: this specific tool isn't the organisation's approved RMM platform, or it's appearing outside any known deployment process. Next pivot: verify against the approved software baseline and any change ticket. Reasonable to contain yet: yes, if the tool doesn't match the environment's known baseline.

**01:09, archive created.** Observation: a compressed archive is created on one of the affected hosts. Benign explanation: backup activity, or a user or process legitimately bundling files. What increases suspicion: the contents include sensitive data, or the host involved isn't one that normally handles archiving. Next pivot: identify what's actually inside the archive and where it's staged. Reasonable to contain yet: yes, strongly, at this point.

**01:43, large outbound transfer.** Observation: a substantial volume of data leaves the network from the same host. Benign explanation: legitimate large file transfer or cloud sync. What increases suspicion: a new or unfamiliar destination, or the transfer immediately following the archive creation above. Next pivot: identify the destination and correlate it against known infrastructure or reputation data. Reasonable to contain yet: yes, this should already be moving toward active response.

**02:06, backup service stopped.** Observation: a backup service halts. Benign explanation: planned maintenance or a scheduled upgrade. What increases suspicion: no maintenance window exists, and this follows directly on from everything already observed. Next pivot: confirm whether this was operator-initiated and by whom. Reasonable to contain yet: yes, unambiguously by this point.

**02:11, EDR telemetry lost on several hosts.** Observation: multiple endpoints stop reporting. Benign explanation: a sensor fault or connectivity issue, which does happen independently of any attack. What increases suspicion: multiple hosts going dark simultaneously, immediately following backup interference. Next pivot: treat as defence impairment rather than a coincidental fault unless there's strong evidence otherwise. Reasonable to contain yet: yes, this is a clear escalation trigger regardless of anything else.

**02:23, mass file modification begins.** Observation: rapid file changes start across multiple systems. By this point the incident is no longer ambiguous in any sense, and the useful question has shifted entirely to scope and containment rather than whether something is wrong.

<h3 id="confidence-building">How confidence actually builds across a chain like this</h3>

```text
VPN login                     LOW
     +
unusual RDP                   LOW-MEDIUM
     +
AD discovery                  MEDIUM
     +
privileged lateral movement   HIGH
     +
defence impairment            VERY HIGH
```

These levels are illustrative, not a scoring formula to implement literally. The point is simply that confidence accumulates as independent pieces of evidence stack up, and that a reasonable containment decision doesn't require waiting for the final, unambiguous stage before acting.

<h3 id="what-changed">What changed?</h3>

A useful, recurring question throughout an investigation like this: is there a new account, a new source, a new tool, new privilege, a new remote-access path, a new relationship between hosts that didn't exist before, a new outbound destination, or new administrative behaviour from an existing identity. A large share of genuinely useful detections are really about change relative to an established baseline, not about matching a known-bad signature.

<h2 id="threat-intelligence">Threat intelligence, used appropriately</h2>

Knowing that a particular IP or domain is associated with Qilin infrastructure can genuinely help during an investigation. It's worth being realistic about its limits too: threat intelligence can be incomplete, stale by the time it reaches you, entirely absent for a given piece of infrastructure, sitting on shared hosting that isn't exclusively malicious, or simply unavailable at the exact moment initial access occurs. Attackers can and do use legitimate services, freshly registered infrastructure with no history yet, VPNs, proxies, and previously compromised systems that carry no reputation baggage of their own. Building ransomware defence primarily around known indicators is a fragile strategy for exactly this reason. Local behaviour, what's actually happening in your own environment relative to its own baseline, tends to be considerably more durable than any external IOC feed.

<h3 id="attck">A note on ATT&CK</h3>

MITRE ATT&CK is genuinely useful for describing which phase of an intrusion a given piece of behaviour sits in, and for giving analysts a shared vocabulary when comparing notes. This article has deliberately avoided turning into a technique-ID inventory, because the goal here is recognising the shape of an intrusion's progression, not accumulating a matrix of numbers. Use ATT&CK to organise what you find. Don't let assembling it become a substitute for actually investigating.

<h2 id="detection-engineering">Detection engineering opportunities worth building after an incident like this</h2>

Worth considering, conceptually rather than as ready-to-deploy rules: a privileged account authenticating from a first-seen VPN source; a privileged login followed shortly by unusual RDP activity; new RMM software appearing outside an approved deployment process; a high volume of host or share discovery originating from a workstation rather than known administrative infrastructure; domain-controller policy modification, especially anything that triggers script execution at logon; administrative activity on backup infrastructure from an unusual source; EDR telemetry loss across multiple hosts within a short window; and, most valuably, a correlated sequence combining discovery, privileged authentication and lateral movement rather than any one of those in isolation. A good post-incident review should feed directly into work like this, turning what was missed into something the next intrusion can't repeat unnoticed.

<h2 id="architecture">Architecture matters as much as detection</h2>

Detection can't solve everything on its own, and some of the most effective improvements sit outside the SOC's own remit entirely: MFA on every meaningful access path, least-privilege access as the default rather than the exception, separate administrative identities kept apart from everyday accounts, privileged access workstations or jump hosts for genuinely sensitive administration, restricted and monitored RDP, real network segmentation, hardened and non-interactive service accounts, backup infrastructure isolated behind its own boundary, broad and consistent EDR coverage including servers, logging that's actually retained long enough to be useful, tightly scoped remote-access controls, application control, and RMM platforms administered securely rather than left broadly reachable. Sometimes the best alert a SOC ever generates is the one the architecture made unnecessary in the first place.

<h2 id="common-mistakes">Common mistakes in ransomware response</h2>

Focusing entirely on the ransomware binary itself once it appears. Searching only for known Qilin, or any single family's, indicators. Assuming valid credentials mean a legitimate user was behind them. Dismissing discovery activity because "admins do that too," without checking whether it actually fits this account's pattern. Allowing privileged accounts to be used for routine, everyday activity as a matter of habit. Treating every alert as an isolated event rather than checking for related activity elsewhere. Ignoring how the remote-access architecture itself shapes what's possible. Failing to monitor backup infrastructure with the same rigour as anything else privileged. Investigating endpoint activity without pulling in identity logs, or investigating identity without pulling in endpoint context. Blocking a single IP and assuming that constitutes containment. Isolating encrypted hosts while leaving the credentials that got the attacker there untouched. Failing to properly scope how many other systems were actually reached. Restoring from backup before the access path into the environment is actually understood. And, perhaps most corrosively, treating any of this as one analyst's individual failure rather than a systemic weakness worth actually fixing.

<h2 id="interview-refresher">Things worth being able to explain in a SOC interview</h2>

Why encryption is very often a late-stage event rather than the start of an incident. What Ransomware-as-a-Service actually means, and the practical difference between an operator and an affiliate. What an Initial Access Broker is and why that role matters for attribution. Why legitimate credentials being used doesn't mean legitimate activity occurred. Why living-off-the-land techniques make detection genuinely harder rather than just theoretically harder. Why RDP, or any remote-access mechanism, isn't automatically malicious just by being present. Why excessive privilege raises both the risk of an incident and the difficulty of detecting one. Why lateral movement so often looks identical to ordinary administration. The practical difference between a visibility gap and a detection gap. Why correlation across independent sources matters more than any single strong alert. How to work backwards through an incident from encryption to root cause. What "earliest reasonable intervention" means, and why it's a different question from "earliest malicious event." What hindsight bias is and why it distorts post-incident review if left unchecked. Why IOC-based detection alone is insufficient for ransomware specifically. Why backup infrastructure deserves its own security boundary rather than inheriting whatever protects everything else. And why a good post-incident review is aimed at improving detection and controls, not assigning blame to whoever happened to see one piece of the picture.

<h2 id="quick-reference">Quick reference: the warning chain</h2>

<div class="table-scroll">

| Stage | Possible SOC evidence | What makes it more concerning |
| --- | --- | --- |
| Access | VPN or remote authentication | Unusual source combined with a privileged account |
| Persistence | New account, task, service or RMM tool | No matching change record, unusual creator or timing |
| Discovery | Enumeration or scanning activity | Originating from an unusual workstation or identity |
| Credential access | EDR or identity-platform evidence | Followed shortly by new, unrelated authentications |
| Privilege | Group membership or privileged logon change | Account or source doesn't fit the account's normal pattern |
| Lateral movement | RDP, SMB or WinRM activity | Fan-out to multiple systems in a short window |
| Staging | Archive creation | Sensitive data, on a host that doesn't normally archive |
| Exfiltration | Outbound transfer | New destination combined with unusually large volume |
| Defence impairment | EDR or logging changes | Multiple hosts affected with no maintenance window |
| Impact | Mass file modification | Distributed, rapid, across many hosts at once |

</div>

None of these are universal ransomware signatures, and no single row on its own should be read as proof of anything. The value is in the pattern across rows, not any individual line.

<h2 id="takeaway">Where this leaves the SOC</h2>

If encryption is the first point at which a SOC is genuinely certain there's an incident, the useful question afterward isn't simply how the ransomware got past the antivirus. It's: what was the earliest point in this intrusion where the evidence available to us should have changed our decision?

Worth asking honestly against that point: did we actually have the telemetry to see it? Did we have a detection built for it? Did the resulting alert carry enough context to be judged properly? Did another analyst, somewhere else, see a related event that never got connected to this one? Did our own architecture make the malicious activity look indistinguishable from the normal kind? And, given everything we did have, could we realistically have contained this earlier than we did?

None of this is about finding someone to blame for missing one ambiguous event in a sea of thousands. It's about making the next intrusion considerably harder to hide inside activity that looks, on the surface, like it belongs there.

<h2 id="references">References</h2>

- Sophos, "Qilin ransomware caught stealing credentials stored in Google Chrome": [sophos.com/en-us/blog/qilin-ransomware-caught-stealing-credentials-stored-in-google-chrome](https://www.sophos.com/en-us/blog/qilin-ransomware-caught-stealing-credentials-stored-in-google-chrome)
- Sophos, "Qilin affiliates spear-phish MSP ScreenConnect admin, targeting customers downstream": [sophos.com/en-us/blog/sophos-mdr-tracks-ongoing-campaign-by-qilin-affiliates-targeting-screenconnect](https://www.sophos.com/en-us/blog/sophos-mdr-tracks-ongoing-campaign-by-qilin-affiliates-targeting-screenconnect)
- Group-IB, "Qilin Ransomware: Tactics, Attack Methods & Mitigation Strategies": [group-ib.com/blog/qilin-ransomware/](https://www.group-ib.com/blog/qilin-ransomware/)
- NHS England, "Synnovis cyber incident": [england.nhs.uk/synnovis-cyber-incident/](https://www.england.nhs.uk/synnovis-cyber-incident/)
- NHS England (London), "Synnovis Ransomware Cyber-Attack": [england.nhs.uk/london/synnovis-ransomware-cyber-attack/](https://www.england.nhs.uk/london/synnovis-ransomware-cyber-attack/)
