---
title: "From Header to Host: Investigating Phishing in the SOC"
date: 2026-09-20
series: "soc"
categories:
  - "soc"
  - "phishing"
  - "email-security"
tags:
  - "soc"
  - "phishing"
  - "email-security"
  - "investigation"
  - "identity"
  - "incident-response"
  - "dfir"
  - "field-guide"
seoTitle: "From Header to Host: Investigating Phishing in the SOC | Jason Hill"
description: "A phishing investigation isn't finished when you decide whether the email looks malicious. A practical guide to following the evidence from headers and URLs through delivery, interaction, endpoint and identity impact."
coverImage: "phishing-investigation-cover.svg"
coverImageAlt: "Terminal-style illustration of a central email node branching into headers, a URL and an attachment, then into user interaction, an endpoint process tree, and an identity session node."
---

A user forwards an email to the SOC with a short note: "I think this might be phishing." The analyst opens it up. The display name looks familiar. The sender domain is slightly off, though nothing dramatic. SPF passes. DKIM passes. There's a Microsoft 365 login link. No obvious attachment.

Is it malicious? Possibly. But that question, on its own, is a much smaller part of the job than it feels like in the moment. A phishing investigation is not complete when you've decided whether the email looks bad. The questions that actually matter come after that: was it delivered? Who received it? Who interacted with it? What happened after they did? Was a credential entered? Was a session established? Did malware execute? Did the attacker gain persistence anywhere? Did the same campaign land on other users? What, if anything, now needs to be contained?

<pre class="flow-diagram"><span class="step">Email</span>
<span class="arrow">↓</span>
<span class="step">Sender / headers</span>
<span class="arrow">↓</span>
<span class="step">URLs / attachments</span>
<span class="arrow">↓</span>
<span class="step">Delivery</span>
<span class="arrow">↓</span>
<span class="step">User interaction</span>
<span class="arrow">↓</span>
<span class="step">Endpoint</span>
<span class="arrow">↓</span>
<span class="step">Identity</span>
<span class="arrow">↓</span>
<span class="step">Scope</span>
<span class="arrow">↓</span>
<span class="step">Containment</span></pre>

That's the shape this article follows, and it's a considerably longer road than most people picture when they think "phishing investigation."

<div class="contents-box">
<p class="contents-lead">analyst@thefish.nz:~$ cat contents.txt</p>
<div class="contents-grid">
<div>
<h3>Sections</h3>
<ul>
<li><a href="#dont-start-here">Don't start with "is this phishing"</a></li>
<li><a href="#email-anatomy">Email anatomy</a></li>
<li><a href="#domain-analysis">Domain analysis</a></li>
<li><a href="#urls">URLs</a></li>
<li><a href="#attachments">Attachments</a></li>
<li><a href="#delivery">Delivery</a></li>
<li><a href="#scope">Scope</a></li>
<li><a href="#user-interaction">User interaction</a></li>
<li><a href="#credential-phishing">Credential phishing and identity</a></li>
<li><a href="#endpoint-impact">Endpoint impact</a></li>
<li><a href="#identity-impact">Identity impact and BEC</a></li>
<li><a href="#containment">Containment</a></li>
<li><a href="#worked-investigation">A worked investigation</a></li>
<li><a href="#worked-scenario-attachment">Scenario: a malicious attachment</a></li>
</ul>
</div>
<div>
<h3>More sections</h3>
<ul>
<li><a href="#worked-scenario-false-alarm">Scenario: a false alarm</a></li>
<li><a href="#campaign-analysis">Linking messages into a campaign</a></li>
<li><a href="#threat-intel-sandboxes">Threat intel and sandboxes</a></li>
<li><a href="#common-mistakes">Common mistakes</a></li>
<li><a href="#user-reported-phishing">User-reported phishing</a></li>
<li><a href="#analyst-mindset">Analyst mindset</a></li>
<li><a href="#email-vs-incident-verdict">Email verdict vs incident verdict</a></li>
<li><a href="#detection-ideas">Detection ideas</a></li>
<li><a href="#correlation">Correlation</a></li>
<li><a href="#quick-reference-workflow">Quick reference workflow</a></li>
<li><a href="#interview-refresher">SOC interview refresher</a></li>
<li><a href="#practice-scenarios">Six scenarios to practise</a></li>
<li><a href="#quick-reference-table">Quick reference table</a></li>
<li><a href="#takeaway">The point</a></li>
</ul>
</div>
</div>
</div>

<h2 id="dont-start-here">Don't start with "is this phishing"</h2>

A binary first question tends to trap analysts in visual analysis, staring at fonts and logos, arguing with themselves about whether a domain looks close enough to the real one. A more useful sequence:

<pre class="flow-diagram"><span class="step">What is the message trying to make the user do?</span>
<span class="arrow">↓</span>
<span class="step">What evidence supports legitimacy or deception?</span>
<span class="arrow">↓</span>
<span class="step">Was the message delivered?</span>
<span class="arrow">↓</span>
<span class="step">Was there user interaction?</span>
<span class="arrow">↓</span>
<span class="step">Did interaction create security impact?</span></pre>

The first question, what is this trying to make the user do, is worth answering before anything technical, because it tells you what to actually check for downstream: a credential harvest wants a login attempt, an invoice lure wants a payment change, an attachment-based lure wants execution. Everything after that follows from what the message was actually built to achieve.

<h2 id="email-anatomy">Email anatomy, briefly</h2>

Worth knowing what a handful of fields can and can't tell you, without turning this into an RFC walkthrough. `From` is what the recipient sees, and it's trivially set by whoever sends the message. `Return-Path` is typically where bounce messages get directed, and usually mirrors the envelope sender. `Reply-To` is where a reply would actually go, which can differ from `From` for entirely legitimate reasons. `Message-ID` is a unique identifier assigned at creation, useful for searching your own mail security telemetry for the exact same message elsewhere. `Received` headers record the hop-by-hop path the message took through mail infrastructure. `Authentication-Results` records what SPF, DKIM and DMARC concluded. Subject, body, URLs and attachments are the content itself, and the actual payload of whatever the message is trying to achieve.

<h3 id="display-names">Display names are weak evidence</h3>

```text
From: "Microsoft Support" <randomdomain.example>
```

Users notice the display name and rarely look past it, which is exactly why attackers set it to whatever looks trustworthy. It's worth resisting the inverse mistake too: plenty of entirely legitimate services send through third-party infrastructure with a display name that doesn't match the sending domain at all. A mismatch is a reason to check further, not a verdict on its own.

<h3 id="from-return-path-reply-to">From, Return-Path and Reply-To are three different questions</h3>

`From` is what the user sees. `Return-Path` is where bounces go. `Reply-To` is where a genuine reply would land. A `Reply-To` that differs from `From` can be a useful signal, particularly when it points somewhere that has nothing to do with the organisation the message claims to represent. It's worth knowing that legitimate marketing and automated systems do this constantly and for entirely mundane reasons, so treat a mismatch as worth a closer look rather than automatic proof of anything.

<h3 id="received-headers">Received headers, read from the bottom up</h3>

Each hop a message passes through can add its own `Received` header, and the convention worth knowing is that you generally read them from the bottom of the stack toward the top to reconstruct the path the message actually took, since each new hop prepends its own entry above the ones before it. Internal trust boundaries matter here: infrastructure you control and trust can be relied on to have logged accurately. Headers claiming to originate from before that point can, in principle, be added or forged by whoever composed the message. The most useful question to ask isn't "what do the headers say" in isolation, it's which headers were added by infrastructure you actually trust.

<h3 id="authentication-results">Authentication-Results: SPF, DKIM, DMARC</h3>

This gets a full treatment in the [SPF, DKIM and DMARC guide](/posts/spf-dkim-dmarc-email-authentication/), so here's the condensed version relevant to phishing triage specifically. SPF checks whether the sending infrastructure was authorised for the envelope sender's domain. DKIM checks a cryptographic signature tying the message to a signing domain and confirming the signed content hasn't been altered in transit. DMARC checks whether the domain that actually authenticated, via SPF or DKIM, aligns with the domain shown in the visible `From` address.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

`SPF pass, DKIM pass, DMARC pass` does not equal `safe email`. A malicious actor can register their own domain, configure SPF correctly, configure DKIM correctly, and pass DMARC cleanly, because every one of those checks is only asking whether the domain that authenticated is genuinely responsible for the message it authenticated. They say nothing at all about whether that domain, or the person behind it, has honest intentions.

</div>

Authentication answers "was this message authorised by the domain it claims to represent." It does not, and was never designed to, answer "is the sender's intention legitimate."

<h3 id="header-investigation-sequence">A practical header-investigation sequence</h3>

What domain is actually visible to the user? What envelope or return domain was used? Which domain signed with DKIM? Did SPF, DKIM and DMARC each pass? Which `Received` headers were added by infrastructure you trust? What infrastructure actually originated the message? Does `Reply-To` differ from `From`? Is `Message-ID` consistent with the infrastructure you'd expect for this sender? Does the whole path resemble the legitimate sender's normal mail route? Comparing against a known genuine message from the same sender, where you have one on hand, is often more useful in practice than trying to memorise what a "normal" header pattern is supposed to look like.

<h2 id="domain-analysis">Domain analysis</h2>

Worth examining closely: the exact spelling of the domain, any subdomains involved, the actual registrable domain underneath them, lookalike characters, extra words inserted to look plausible, whether the domain was registered recently, and whether an unrelated domain is sitting behind a familiar-looking display name.

```text
microsoft.com
```

versus

```text
hxxps://microsoft-login[.]example
```

or

```text
hxxps://secure-microsoft365[.]example
```

None of this needs to become a full typosquatting catalogue to be useful. The pattern is always the same: does the registrable domain, stripped of subdomains and decoration, actually belong to who it claims to.

<h3 id="whois-rdap">WHOIS and RDAP</h3>

Registration data can add useful context: creation date, registrar, nameservers, and rough registration age where it's available. Worth treating carefully: a newly registered domain is suspicious context, not proof. Plenty of entirely legitimate marketing campaigns, product launches and small businesses register domains and start sending from them within days.

<h3 id="dns-pivots">DNS pivots</h3>

Worth checking A and AAAA records, MX records, TXT records, nameservers and CNAME entries. Where is the domain actually hosted? Does it have mail infrastructure that looks like a real sending domain, or nothing at all? Are there related subdomains worth pulling on? Passive DNS is genuinely useful for building context here, but it's worth not overstating what it proves about ownership or intent on its own.

<h3 id="certificate-transparency">Certificate transparency, as optional enrichment</h3>

Certificate transparency logs can surface related hostnames issued under the same certificate authority activity, which is useful for understanding the shape of an attacker's infrastructure. It's context for building a picture, not proof of ownership or malicious intent by itself.

<h2 id="urls">URLs</h2>

Don't visually scan link text and stop there. A link can display `https://microsoft.com` while the actual `href` points somewhere else entirely, and the only way to know is to check the real destination directly rather than trusting what's rendered on screen.

Worth checking: the actual href, the domain it resolves to, whether it goes through a redirect, whether a URL shortener is involved, nested redirect parameters, the path and query string, punycode (used to represent non-ASCII characters that can visually mimic legitimate letters), unusual subdomains, usernames embedded in the URL itself, and IP-based URLs with no domain name at all.

Whenever writing up a suspicious domain or URL, use defanged notation, for example `hxxps://login-example[.]com`, and never paste a genuinely live malicious link into a ticket, chat, or document where it might get clicked by accident.

<h3 id="redirect-chains">Redirect chains</h3>

The first visible URL is very often not the final destination.

<pre class="flow-diagram"><span class="step">Email link</span>
<span class="arrow">↓</span>
<span class="step">URL shortener</span>
<span class="arrow">↓</span>
<span class="step">tracking service</span>
<span class="arrow">↓</span>
<span class="step">compromised site</span>
<span class="arrow">↓</span>
<span class="step">credential phishing page</span></pre>

Worth mapping the whole chain rather than stopping at the first hop: which redirects actually occurred, which domains were involved at each step, and whether any legitimate services were abused along the way as an unwitting redirect stage. This matters because simplistic domain blocking based only on the first URL seen can miss the actual destination entirely.

<h3 id="safe-url-analysis">Investigate URLs safely</h3>

Don't browse a suspicious link directly from an ordinary workstation. Worth using dedicated URL scanning services, a sandboxed or isolated browsing environment, whatever analysis capability your mail security platform already provides, and proxy logs to see what happened when the link was actually visited by a real user, rather than manually reproducing the click yourself on unprotected infrastructure.

<h3 id="url-reputation">VirusTotal and URL reputation are enrichment, not a verdict</h3>

VirusTotal and similar services can show vendor detections, historical observations, and infrastructure relationships. Worth being realistic about the limits: no detections doesn't mean safe, since newly stood-up phishing infrastructure may simply be unknown to every vendor yet. A single detection doesn't automatically prove malicious intent either, and a compromised legitimate site can carry a perfectly good reputation right up until the moment it's abused. Reputation is context, not conclusion.

<h2 id="attachments">Attachments</h2>

Common types include Office documents, PDFs, archives, HTML files, images, executables and scripts. This isn't malware analysis training, it's the first set of questions worth asking about any attachment: what's the filename, what's the actual file type versus the extension, what's the MIME type, what's the hash, what's the size, where did it come from, was it actually delivered, was it opened, and was it executed.

<h3 id="extension-vs-type">Extension is not the same thing as file type</h3>

`invoice.pdf.exe` is a classic example, and mismatches between a file's claimed extension, its actual MIME type, and its true file signature are all worth checking rather than trusting the filename at face value.

<h3 id="hash-enrichment">Hash enrichment</h3>

A hash lookup can surface reputation, prior sightings, and malware-family associations. A hash absent from VirusTotal is not proof of safety, particularly for something freshly built for this specific campaign. A hash confirmed malicious is strong evidence, and it's still worth confirming separately whether the file was actually delivered, written to disk, and executed, rather than assuming all three followed automatically from the hash match.

<h3 id="password-archives">Password-protected archives</h3>

Attackers use these deliberately to evade automated scanning and shift the extraction step onto the user, who has to manually enter a password usually supplied in the email body itself. Legitimate business workflows use password-protected archives too, for entirely mundane reasons. Worth checking whether the password sits in the email body, whether the archive type is unusual for this sender, what's actually inside once extracted, and whether user interaction was required to get there.

<h3 id="html-attachments">HTML attachments</h3>

Increasingly common, and worth understanding specifically: an HTML attachment can render a fake login page locally, redirect the browser elsewhere, or contain obfuscated script that builds a malicious page on the fly once opened. Worth investigating what the attachment actually does when rendered, using safe analysis methods rather than opening it on a normal endpoint.

<h3 id="pdfs">PDFs</h3>

Can be genuinely legitimate documents, simple link-delivery vehicles, pure social-engineering lures with no technical payload at all, or, occasionally, exploit carriers. Don't assume PDF equals safe just because the format itself is common and mostly innocuous.

<h3 id="qr-phishing">QR-code phishing</h3>

Worth a short mention on its own, because it's become common enough to expect. QR codes are attractive to attackers because they move the interaction onto a personal mobile device, hide the actual URL from any visual or automated inspection of the email itself, can bypass some URL-parsing security controls entirely, and take the user outside whatever managed workstation protections exist. The investigation still asks the same questions as any other link: what's the actual destination URL, who received the message, who scanned the code, and what identity activity followed.

<h3 id="the-lure">The lure matters</h3>

Phishing is social engineering first and a technical delivery mechanism second. Common themes worth recognising: password expiry notices, a shared document, an invoice, a voicemail notification, payroll or HR content, an MFA-related prompt, a delivery notification, or urgent payment requests. This doesn't need to become an exhaustive catalogue to be useful. The one question worth holding onto: what action is the attacker actually trying to induce.

<h2 id="delivery">Delivery</h2>

Move beyond the single submitted email. Was it actually delivered to the mailbox, or blocked, quarantined, or removed after the fact? Search your email security telemetry using the Message-ID, sender, sender domain, subject, URL, attachment hash, recipient, and any campaign identifiers your platform tags messages with, to establish the full delivery picture rather than relying on the one copy that happened to get reported.

<h2 id="scope">Scope: one report rarely means one affected user</h2>

One user reporting one email does not mean there is one affected user. Worth pivoting on the sender, subject, Message-ID, URL, domain, attachment hash, attachment name, Reply-To address, and any broader campaign pattern your tooling can surface. Worth asking how many recipients actually received it, which business units were touched, whether executives, finance staff or administrators were among them, whether any external recipients were included, and whether any distribution lists carried it further than the individual inboxes you can see directly.

<h3 id="campaign-similarity">Similar doesn't mean identical</h3>

Campaigns vary the subject line, sender address, and generate unique URLs or per-recipient identifiers and attachment hashes across different copies of what is functionally the same attack. Exact IOC matching can miss related messages entirely. Worth thinking in terms of campaign patterns, shared infrastructure and structural similarity rather than requiring a byte-for-byte match before treating two messages as related.

<h2 id="user-interaction">User interaction</h2>

This is the point where phishing analysis becomes incident investigation rather than email triage. Did the user read the email? Click the link? Download the attachment? Open it? Run anything? Enter credentials? Approve an MFA prompt? Install software? Reply? Send a payment? None of these should be assumed from any of the others.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Click does not equal compromise. A click can lead to a blocked page, a dead link, entirely legitimate content the URL happened to redirect to, an actual phishing page, or a malware download, and you need further evidence to know which. It's equally worth being honest in the other direction: no known click does not guarantee no impact, if the telemetry available to you is incomplete.

</div>

<h3 id="web-proxy-evidence">Web and proxy evidence</h3>

Useful sources include proxy logs, secure web gateway logs, DNS query logs, firewall logs, browser telemetry, and EDR-reported network events. Worth checking whether the device actually resolved the domain at all, whether it connected, whether the connection was blocked, what URL and HTTP status resulted, how much data moved, whether anything downloaded, and what connections followed afterward.

<h2 id="credential-phishing">Credential phishing and the pivot to identity</h2>

If the page was built to steal credentials, the investigation needs to move into identity telemetry. Worth checking for authentication shortly after the click, a new source IP, a new device, a new ASN, MFA prompt activity, failed and successful logons, and any account changes that followed. Worth resisting the shortcut of assuming a click followed by a new login automatically means the credentials were stolen and used; correlate the actual timing and context rather than treating proximity alone as proof.

<h3 id="mfa-sequence">The MFA sequence worth watching for</h3>

<pre class="flow-diagram"><span class="step">Phishing email</span>
<span class="arrow">↓</span>
<span class="step">Fake login page</span>
<span class="arrow">↓</span>
<span class="step">credentials entered</span>
<span class="arrow">↓</span>
<span class="step">MFA prompts</span>
<span class="arrow">↓</span>
<span class="step">successful session</span></pre>

Worth asking: did the user actually approve an MFA prompt around this time? Was an MFA method changed? Did an unusual session begin? Did mailbox activity follow shortly after? This connects directly to the reasoning in the [Identity Attacks guide](/posts/identity-attacks-for-soc-analysts/), which covers this territory in far more depth.

<h3 id="aitm">Adversary-in-the-middle phishing</h3>

A phishing site can proxy the genuine authentication flow in real time and capture the resulting session material once MFA completes, rather than relying on a crude static fake page. The SOC implication is direct: MFA success does not guarantee the resulting session is legitimate, if the method used can be relayed this way.

<h2 id="endpoint-impact">Endpoint impact</h2>

If the phishing message delivered a file or script that actually ran, pivot into endpoint telemetry: was the attachment written to disk, was it opened, what was the parent process, what child processes appeared, what was the command line, what network activity followed, what files were created, is there anything resembling persistence, and did EDR raise anything at all.

<pre class="flow-diagram"><span class="step">outlook.exe</span>
<span class="arrow">↓</span>
<span class="step">winword.exe</span>
<span class="arrow">↓</span>
<span class="step">powershell.exe</span>
<span class="arrow">↓</span>
<span class="step">external connection</span></pre>

This is exactly the territory the [PowerShell and LOLBins guide](/posts/powershell-is-not-the-alert/) covers in depth, and the same reasoning applies here directly: the process names alone tell you very little without the surrounding context.

<div class="callout callout--tip">

<p class="callout-label">Analyst tip</p>

Attachment opened does not equal payload executed. A file can be previewed, opened, blocked, sandboxed, or otherwise prevented from running its actual content by the platform it was opened in. You need genuine endpoint evidence of execution, not just evidence that the file was clicked on.

</div>

<h3 id="browser-based-phishing">Browser-based phishing without an attachment</h3>

Plenty of phishing has no attachment at all. Worth checking browser process activity, the actual URLs visited, any files that downloaded as a result, any browser extensions installed around the same time, and any indicators consistent with credential-theft malware or session theft specifically.

<h2 id="identity-impact">Identity impact</h2>

Once credential compromise is suspected, worth reviewing sign-in history, MFA activity, any new devices or sessions, mailbox rules, forwarding configuration, OAuth application grants, password or MFA method changes, file access across SharePoint and OneDrive, and, where the account is privileged, any administrative actions taken. This is exactly the checklist covered in full in the [Identity Attacks guide](/posts/identity-attacks-for-soc-analysts/).

<h3 id="bec">Business email compromise</h3>

<pre class="flow-diagram"><span class="step">Credentials stolen</span>
<span class="arrow">↓</span>
<span class="step">Mailbox access</span>
<span class="arrow">↓</span>
<span class="step">Attacker watches conversation</span>
<span class="arrow">↓</span>
<span class="step">Payment details altered</span></pre>

Worth stating plainly: this can happen with no malware anywhere, no EDR alert, and no suspicious executable at all. The entire incident can live in identity and email telemetry, which is precisely why an investigation that stops the moment endpoint scanning comes back clean is stopping in the wrong place.

<h3 id="reply-chain-attacks">Reply-chain attacks</h3>

An attacker can send phishing from a legitimate, already-compromised mailbox, replying into a genuine existing thread. In that case SPF may pass, DKIM may pass, DMARC may pass, the sender may be someone the recipient genuinely knows, and the thread itself may be entirely real up until the point the attacker inserted themselves into it. This is one of the more important points in this whole article: authentication passing tells you the domain is genuine. It says nothing about whether the specific account sending this specific message has been compromised.

<h3 id="internal-phishing">Internal phishing</h3>

Phishing sent from a compromised internal account is harder to catch precisely because everything that normally raises suspicion is absent: a trusted sender, an internal domain, an existing relationship, a normal mail route, and authentication that passes cleanly because it genuinely is the real domain.

<div class="callout callout--watch">

<p class="callout-label">Watch out</p>

Email authentication is not malicious-intent detection, and internal phishing is where that distinction matters most.

</div>

<h3 id="thread-hijacking">Thread hijacking</h3>

Attackers can use genuine existing message history to make a phishing attempt considerably more credible. Worth watching for an unusual link or attachment suddenly appearing partway through an established thread, a shift in language or writing style, a new `Reply-To` address, an unusual sending session for that account, or any other evidence pointing toward mailbox compromise rather than a fresh external attempt.

<h2 id="containment">Containment</h2>

**Email.** Quarantine or remove matching messages, block the malicious sender or domain where justified, block the specific URLs involved, block the attachment hash.

**Identity.** Reset credentials, revoke active sessions, remove any MFA methods the attacker registered, remove malicious OAuth grants, remove forwarding or inbox rules the attacker created, disable the account where warranted.

**Endpoint.** Isolate the device, remove malicious files, terminate the relevant process, collect evidence before anything changes further, rebuild the endpoint where appropriate.

<div class="callout callout--tip">

<p class="callout-label">Analyst tip</p>

Containment should always be proportionate to actual, established impact. Don't isolate every endpoint that merely received a copy of a phishing email with no evidence anyone interacted with it at all.

</div>

<h3 id="scope-after-compromise">Scope after a confirmed compromise</h3>

If one account is confirmed compromised, worth asking whether the attacker used it to send further phishing, access internal data, reach shared drives, change mailbox rules, add applications, or specifically target finance or executive accounts. Scope can expand from one phishing email into a full identity incident, an endpoint compromise, or a multi-user campaign, and it's worth actively checking for that expansion rather than assuming the incident ends at the account you started with.

<h2 id="worked-investigation">A worked investigation</h2>

A finance user reports a Microsoft 365 "shared document" email.

```text
08:42  email delivered
08:49  user clicks link
08:49  DNS query to suspicious domain
08:50  TLS connection
08:51  successful cloud authentication from new infrastructure
08:54  inbox forwarding rule created
09:03  mailbox search activity
09:11  new phishing email sent from compromised account
```

**08:42, email delivered.** Observation: the message reached the mailbox. Interpretation: nothing yet, delivery on its own is unremarkable. Confidence: unchanged. Next pivot: check whether the same message was delivered to anyone else.

**08:49, user clicks the link.** Observation: the recipient interacted with the URL. Interpretation: this establishes interaction occurred, not what the destination actually was or did. Confidence: slightly raised, purely because interaction happened at all. Next pivot: establish exactly where the link led and what the page presented.

**08:49, DNS query to a suspicious domain.** Observation: the endpoint resolved a domain worth attention. Interpretation: consistent with the click actually reaching an external destination rather than being blocked before resolution. Confidence: raised further. Next pivot: check reputation, registration age and any prior sightings of this domain.

**08:50, TLS connection established.** Observation: an encrypted connection followed the DNS resolution. Interpretation: the user's browser successfully reached whatever was hosted there. Confidence: raised, this rules out the possibility that the attempt was silently blocked. Next pivot: check proxy or web telemetry for what was actually served on that connection.

**08:51, successful cloud authentication from new infrastructure.** Observation: a login succeeds from infrastructure that doesn't match this user's history, one minute after the TLS connection. Interpretation: strongly consistent with credentials being entered on a phishing page and immediately replayed, or with a session captured via an adversary-in-the-middle flow. Confidence: high. Next pivot: check MFA status on this authentication and whether it matches a genuine prompt the user actually approved.

**08:54, inbox forwarding rule created.** Observation: a new rule appears three minutes after the suspicious authentication. Interpretation: this is a deliberate persistence step, not routine mailbox housekeeping, given the timing. Confidence: very high. Next pivot: read the rule itself, its destination, and whether it's hidden.

**09:03, mailbox search activity.** Observation: the account is searching its own mailbox content. Interpretation: consistent with reconnaissance, likely looking for financial or invoice-related conversations specifically, given the original lure. Confidence: essentially confirmed at this point. Next pivot: identify what was searched for and opened.

**09:11, a new phishing email sent from the compromised account.** Observation: the account itself is now sending phishing. Interpretation: the incident has expanded from one compromised user into an active campaign originating from trusted internal infrastructure. Confidence: fully confirmed, and now a scoping and containment priority rather than an open question. Next pivot: identify every recipient of the message just sent, and move immediately to session revocation, credential reset, and forwarding rule removal.

<h2 id="worked-scenario-attachment">Second worked scenario: a malicious attachment</h2>

A shorter, contrasting shape:

<pre class="flow-diagram"><span class="step">Email attachment</span>
<span class="arrow">↓</span>
<span class="step">user opens document</span>
<span class="arrow">↓</span>
<span class="step">Office launches script interpreter</span>
<span class="arrow">↓</span>
<span class="step">external connection</span>
<span class="arrow">↓</span>
<span class="step">payload written</span></pre>

The investigation here shifts fast, from email security territory into endpoint, network and identity work simultaneously, because the moment Office spawns a script interpreter, the question stops being "was this email malicious" and becomes "what did the resulting process actually do."

<h2 id="worked-scenario-false-alarm">Third scenario: a false alarm</h2>

Worth including at least one benign example, because forcing a malicious conclusion is its own kind of mistake. A user reports an email from an unfamiliar SaaS sender, with a `Return-Path` that differs from `From`, a valid DKIM signature, a tracking link, and a domain that was registered recently. On investigation: it turns out to be an expected business application the organisation is actively onboarding, sent by a known vendor, delivered identically to several other legitimate users, with no malicious redirects anywhere in the chain, and entirely normal authentication throughout. The lesson: unfamiliar and unusual are not the same as malicious, and the investigation's job is to establish which one this actually is, not to confirm a suspicion that formed on first glance.

<h2 id="campaign-analysis">Linking messages into a campaign</h2>

Useful shared properties for tying several emails together: sending infrastructure, a display-name pattern, URL structure, a shared redirector, attachment metadata, lure text, subject-line pattern, landing page, and timing. Exact IOC matches aren't required to treat messages as part of the same campaign; structural similarity across enough of these properties is often sufficient and considerably more useful in practice.

<h2 id="threat-intel-sandboxes">Threat intelligence, sandboxes, and their limits</h2>

Useful sources include URL and domain reputation, file reputation, passive DNS, WHOIS and RDAP data, sandbox output, and phishing-specific databases. Threat intelligence enriches the local investigation. It doesn't replace mail logs, endpoint telemetry, identity telemetry, or actual user interaction data, all of which tell you what happened in your own environment specifically.

Sandboxes can genuinely help establish a redirect chain, observed file behaviour, process creation, and network destinations reached. Worth knowing the limits: evasion techniques aimed specifically at sandboxes, geofencing that only serves malicious content to specific regions, links that expire before analysis happens, pages that require a genuine login before revealing anything, one-time tokens that only work once, and deliberately delayed malicious behaviour. A sandbox seeing nothing does not mean the destination was safe.

<h3 id="infrastructure-lifespan">Phishing infrastructure doesn't stay still</h3>

Domains and pages can be disabled, redirected elsewhere, have their content changed, serve only specific targeted users, or only operate for a few hours before going dark. Historical telemetry, what your systems actually recorded at the time, matters more here than trying to re-check a link days later.

<h3 id="dead-url">If the URL is already dead</h3>

Don't close the investigation automatically just because a link no longer resolves. You can still establish who clicked it, what the DNS and proxy history shows from when it was live, what endpoint activity occurred, what identity events followed, and the full scope of who else received the same campaign.

<h3 id="screenshots">Screenshots are useful context, weak technical evidence</h3>

A screenshot can usefully demonstrate the lure, the branding used, and the action being requested. It doesn't prove the actual sending infrastructure, the real destination URL, the delivery path, or whether any interaction genuinely occurred. Treat it as helpful colour, not as a substitute for the technical evidence itself.

<h3 id="mobile-visibility-gap">QR phishing and the mobile visibility gap</h3>

When interaction shifts onto a personal or mobile device, corporate visibility can drop sharply. The SOC may still have email telemetry and identity telemetry, while having essentially nothing from the device's own browser or endpoint activity. This is exactly why identity investigation becomes especially important in QR-code and mobile-targeted phishing specifically, since it may be the only visibility that survives the jump off managed infrastructure.

<h2 id="common-mistakes">Common mistakes</h2>

Deciding purely on spelling or grammar. Assuming a professional-looking email is automatically safe. Assuming SPF passing means safe. Assuming DMARC failing means definitely malicious. Only ever analysing the single submitted copy of the email. Not checking campaign scope at all. Clicking a suspicious link directly from a normal workstation. Treating VirusTotal as the final verdict. Assuming no reputation hit means safe. Assuming a click automatically means compromise. Assuming no known click automatically means no compromise. Assuming an attachment being present means it executed. Investigating the email while ignoring identity telemetry entirely. Investigating the email while ignoring endpoint telemetry entirely. Resetting a password without revoking sessions. Deleting one email and declaring the whole campaign contained. Failing to check forwarding rules or OAuth grants. Blocking an external sender while missing that an internal account is also compromised. Ignoring the possibility of reply-chain compromise on an otherwise trusted thread.

<h3 id="looks-legitimate">"Looks legitimate" is not evidence</h3>

Professional design, correct grammar and convincing branding mean very little on their own. Equally, poor grammar or an amateurish layout is not proof of phishing either. Rely on the technical evidence and the surrounding context, not on how polished the message happens to look.

<h2 id="user-reported-phishing">User-reported phishing is genuinely valuable</h2>

Users can supply context telemetry alone can't: "I wasn't expecting this." "I don't recognise this sender." "I clicked it." "I entered my password." "I approved the MFA prompt." "I downloaded the file." "The page disappeared before I could do anything." None of this is a reason to blame the person reporting it. The goal is simply getting accurate information quickly, from someone who was actually there when it happened.

<h3 id="questions-for-user">Questions worth asking the user</h3>

Did you click the link? Did you enter any credentials? Did you approve an MFA prompt? Did you download or open anything? Did anything appear to run? Did you reply? Did you make a payment? What device were you using at the time? Neutral, specific wording gets more accurate answers than anything that sounds like an accusation, and a user who feels safe reporting honestly is worth far more to a SOC than one who's learned to stay quiet.

<h2 id="analyst-mindset">Analyst mindset</h2>

The same discipline covered in the [SOC interview methodology piece](/posts/how-to-think-like-a-soc-analyst-in-an-interview/) applies directly here: what do I actually know, what am I currently assuming, what happened immediately next, what evidence would confirm real impact, what evidence would rule it out, and who else might be affected.

<h2 id="email-vs-incident-verdict">The email verdict and the incident verdict are not the same thing</h2>

Worth keeping these explicitly separate. A possible email verdict: malicious, suspicious, benign, spam, unwanted. A possible incident impact: no interaction at all, a link clicked but blocked, credentials genuinely entered, a confirmed account compromise, malware that actually executed, a compromised endpoint, a full BEC incident, or a campaign affecting multiple users across the organisation. A malicious email can result in no compromise whatsoever. A legitimate-looking email sent from a genuinely compromised account can result in serious, sustained compromise. The two verdicts answer different questions, and conflating them is one of the more common ways a phishing investigation gets called finished too early.

<h2 id="detection-ideas">Detection ideas worth building</h2>

A newly registered domain combined with a credential-lure pattern. An external sender spoofing an executive's display name. Repeated, structurally similar messages landing across many users. A first-seen sender paired with a suspicious URL. An email click followed by an unfamiliar authentication event. MFA prompts appearing shortly after a phishing click. A mailbox rule created shortly after unusual authentication. An Office application spawning a scripting process. An internal user suddenly sending campaign-style messages outward. None of these are universal rules, and every one needs tuning against your own environment's actual baseline before it's genuinely useful rather than noisy.

<h2 id="correlation">Correlation is where phishing investigation actually becomes powerful</h2>

```text
Email
  +
DNS / Proxy
  +
Endpoint
  +
Identity
  +
Mailbox
  =
Impact assessment
```

No single source in that list tells the whole story on its own. Together, they're what separates a genuinely defensible impact assessment from a guess dressed up as one.

<h2 id="quick-reference-workflow">Quick reference workflow</h2>

1. Preserve and identify the message.
2. Analyse trusted header data.
3. Inspect sender, domain, URLs and attachments.
4. Determine delivery scope.
5. Determine user interaction.
6. Check endpoint and network evidence.
7. Check identity and mailbox impact.
8. Scope related users, messages and activity.
9. Contain based on actual impact.
10. Document and improve detections.

Not rigid. Sufficiently severe evidence, an active session takeover in progress, for instance, may justify moving straight to containment before every earlier step is fully complete.

<h2 id="interview-refresher">Things worth being able to explain in a SOC interview</h2>

The practical difference between `From`, `Reply-To` and `Return-Path`. What `Received` headers show and why trust boundaries matter when reading them. What SPF, DKIM and DMARC each actually check, and their limits. Why passing DMARC doesn't mean an email is safe. How to properly investigate a URL rather than just reading the visible link text. The difference between a known file hash and confirmed execution. Why a click isn't automatically compromise, in either direction. How to scope a phishing campaign beyond the single reported message. What identity follow-up looks like after suspected credential phishing. Why session revocation matters more than a password reset alone. What business email compromise typically looks like. Why internal phishing and reply-chain attacks are especially hard to catch. How endpoint and identity telemetry correlate with email evidence. And how to contain proportionately to actual, established impact.

<h2 id="practice-scenarios">Six scenarios to practise</h2>

**A user reports an email with SPF, DKIM and DMARC all passing.** A strong response doesn't stop at the authentication result, checks the actual registrable domain and its age, and investigates the URL destination independently of whether authentication passed.

**Five users receive the same credential-phishing link.** A strong response establishes total delivery scope first, checks which of the five actually interacted with it, and pivots into identity telemetry for anyone who did.

**A user clicked the link but says they entered nothing.** A strong response still checks proxy and DNS evidence for what the page actually did, and doesn't take the self-report as the sole source of truth without corroboration.

**A user entered credentials and approved an MFA prompt.** A strong response moves immediately into identity investigation: new sessions, MFA changes, mailbox rules, OAuth grants, and treats this as likely compromised until evidence says otherwise.

**An Office attachment was opened and PowerShell subsequently started.** A strong response pivots straight into endpoint telemetry, checking the full process chain, command line, and any network activity that followed.

**A phishing email was sent from a legitimate internal account.** A strong response treats this as probable mailbox compromise from the outset, checks sign-in history and mailbox rules on the sending account, and scopes who received the outbound message.

<h2 id="quick-reference-table">Quick reference table</h2>

<div class="table-scroll">

| Evidence source | What it can tell me | What it cannot prove |
| --- | --- | --- |
| Email headers | Path, authentication results, sender identity claims | Sender's intent, or whether content is malicious |
| SPF | Whether the sending infrastructure was authorised | Whether the message content or sender is trustworthy |
| DKIM | Whether the signing domain is genuine and content unaltered | Whether that domain is honest, or the account uncompromised |
| DMARC | Whether the authenticated domain aligns with the visible sender | Whether the aligned domain itself is legitimate |
| URL reputation | Known detections, historical sightings | Safety of a brand-new or freshly abused destination |
| File hash | Prior sightings, malware-family association | Whether this specific file was actually delivered or run |
| Proxy logs | Whether a connection was made, blocked, or allowed | User intent, or what happened after a permitted connection |
| EDR | Process, file and network activity on the endpoint | Activity outside its visibility, e.g. mobile or unmanaged devices |
| Identity logs | Authentication, session and device activity | Whether the accepted credentials belonged to the real user |
| Mailbox audit | Rules, forwarding, delegation, access activity | Intent behind a legitimate-looking configuration change |

</div>

This piece leans directly on several others: the [SPF, DKIM and DMARC guide](/posts/spf-dkim-dmarc-email-authentication/) for the authentication detail behind the header section above, the [Identity Attacks guide](/posts/identity-attacks-for-soc-analysts/) for everything after a credential phish lands on the identity side, the [PowerShell and LOLBins guide](/posts/powershell-is-not-the-alert/) for the endpoint side once an attachment actually executes, [Windows Event Logs](/posts/windows-event-logs-for-soc-analysts/) for the underlying telemetry behind a lot of the endpoint pivots, [The IP Isn't the Attacker](/posts/ip-isnt-the-attacker-nat-vpn-proxy/) for the network and infrastructure reasoning behind domain and IP checks, [Alert to Conclusion](/posts/alert-to-conclusion-investigating-without-tunnel-vision/) for the general investigation methodology this article builds on throughout, and [How to Think Like a SOC Analyst in an Interview](/posts/how-to-think-like-a-soc-analyst-in-an-interview/) for the analyst-mindset section above.

<h2 id="takeaway">The point</h2>

The email verdict and the incident verdict are not the same thing. A message can be genuinely malicious and still cause no compromise at all. A message can look entirely legitimate, sent from a real, trusted, currently-compromised account, and still be the reason an organisation ends up with a serious incident. A good phishing investigation follows the evidence the whole way: message, delivery, interaction, endpoint, identity, scope, impact. Stopping at "is this email phishing" answers the smallest and least useful part of that chain.
