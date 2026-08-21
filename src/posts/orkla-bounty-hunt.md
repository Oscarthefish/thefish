---
title: "Kase Scenarios - Orkla: Bounty Hunt"
date: 2024-10-14
categories: 
  - "ctf"
  - "kase"
  - "orkla"
  - "osint"
  - "skills"
tags: 
  - "kase-scenarios"
  - "orkla"
  - "osint"
  - "skills"
coverImage: "BountyHunt.png"
---

Welcome to _Orkla: Bounty Hunt_, an OSINT challenge from [Kase Scenarios](https://courses.kasescenarios.com/courses/bounty) that pulls you deep into the grey zone of the web.

In this scenario, you’ll be piecing together fragments of information, tracing digital breadcrumbs, and scrutinising every detail to get to the heart of who’s behind this shady file sharing service, and why does your mystery contact want to investigate it? The truth, as always, lies in the data—if you know where to look.

If you’re ready to test your OSINT skills and untangle a web of intrigue, this one’s for you. But remember: the deeper you go, the more questions you'll find.

 

**Before we get started..**

Some parts of the following storyline may provide answers for solving some questions. Where possible I try to hide any definitive answers behind a spoiler tag and try to only provide guidance where possible to show how I came to my own answers.

 

 

 

 

 

 

**Now we start..**

After an initial introduction and housekeeping we'll start of acknowledging that we will follow industry guidelines for ethical information gathering and that we are ultimately responsible for our own actions.

 

![](/images/Picture-2.jpg)

 

Once that is out of the way.. the scenario begins

![](/images/Picture-1.jpg)

 

The delivery of this new scenario is different to previous releases. This feels more like a real time interaction between yourself, a fictitious Kase Discord server and a mysterious user by the name or Orkla, who believes you have the necessary skills to help uncover and explore the digital infrastructure of a file sharing service called cyberfile.me

![](/images/Orkla-Bio.jpg)

 

Before proceeding we are provided with a essential list of resources which are great to get familiar with, not just in the course of this scenario, but also as part of your OSINT toolkit.

 

**Links:**

[Bellingcat's Online Investigation Toolkit](https://bit.ly/bcattools) [The OSINT Curious website](https://osintcurio.us/) [Start.me page by hatless1der](https://start.me/p/DPYPMz/the-ultimate-osint-collection) [Benjamin Strick's Youtube channel](https://www.youtube.com/@Bendobrown) [The Kase Scenarios Discord](https://discord.gg/4dKPGfhcM4) [Rae Baker's OSINT book](https://raebaker.net/book) [Forensic OSINT, gather and save data while you work](https://forensicosint.com) [Forensic OSINT Youtube channel](https://www.youtube.com/@ForensicOSINT)

 

 

Orkla gets straight to the point after this. While Orkla can be a little condescending.. just remind yourself they came to you for help.

![](/images/Question-1.png)

 

This should be an easy one to find using basic tools. Using the [PING](https://en.wikipedia.org/wiki/Ping_\(networking_utility\)) command we can easily find out the IP address behind the domain name.

 

<details>
<summary>Click here for the answer</summary>

% **ping** cyberfile.me

PING cyberfile.me (**91.149.226.12**): 56 data bytes 64 bytes from 91.149.226.12: icmp\_seq=0 ttl=44 time=286.839 ms 64 bytes from 91.149.226.12: icmp\_seq=1 ttl=44 time=366.566 ms 64 bytes from 91.149.226.12: icmp\_seq=2 ttl=44 time=282.511 ms

\--- cyberfile.me ping statistics ---

3 packets transmitted, 3 packets received, 0.0% packet loss round-trip min/avg/max/stddev = 282.511/311.972/366.566/38.644 ms

</details>

 

Next, we're asked how many subdomains of cyberfile.me have valid certificates, specifically as of June 2024.

![](/images/Question-2.png)

 

There are a number of online tools that can check this information for you. In my case I used [https://crt.sh](https://crt.sh) which is a web interface to a distributed database called the certificate transparency logs. You can read more about certificate transparency at https://certificate.transparency.dev/

When you search for cyberfile.me on crt.sh you should see output similar to the following.

![](/images/cert_sh.png)

 

My approach from this point was to sort by date. Specifically I wanted to identify any certs that we issued in June 2024 and which also had a 'not after' date also in June 2024

![](/images/cert_sh_2.png)

 

I there i copied these values into excel and extracted the column of  ‘Matching identities’. I then removed any duplicates and the top level domain to identify the unique subdomains.

 

<details>
<summary>Click here for the answer</summary>

This gave me the unique subdomains highlighted in green, and my answer of **7** (seven)

![](/images/cert_sh_answer.png)

</details>

 

The next question relates what software is used to remotely connect to the server hosting cyberfile.me.

![](/images/Question-3-1.png)

 

One of my favourite online tools for reviewing domains to get a basic overview is [https://dnsdumpster.com](https://dnsdumpster.com).

DNSdumpster is an online passive scanning tool to obtain information about domains, block addresses, emails, and all kind of information DNS related. If we go to this site, we can search and perform a scan on cyberfile.me

![](/images/DNSdumpster-1024x223.png)

 

We can then review the results and make some educated guesses about what software is used to remotely connect to cyberfile.me. Specifically we are looking at the types of services running on these servers, the ones related to remote access. There are a bunch of similar online tools like Shodan and command line tools such as Nmap that you can use. All of which discover hosts and services on a computer network by sending packets and analyzing the responses.

![](/images/DNSdumpster_cyberfile.me_.png)

 

Did you find what you were looking for?

 

<details>
<summary>Click here for the answer</summary>

You'll notice a number of the cyberfile.me servers are running the same remote access service, SSH

![](/images/DNSdumpster_ssh-1024x260.png)

 

But before you enter SSH as the answer, this is the service that's running. The answer is actually **OpenSSH**.

OpenSSH is a suite of secure networking utilities based on the Secure Shell protocol, which provides a secure channel over an unsecured network in a client–server architecture.

</details>

 

Moving on to the next question, we want to look at known CVE's which relate to this remote access software.

![](/images/CVE-1-1024x152.png)

 

There are a number of sites that will provide lists of CVE's and vulnerability databases. In our previous question and answer, we were able to identify not only the software being used, but also a specific version.

Using this information we are to search known vulnerabilities using a site such as [https://nvd.nist.gov](https://nvd.nist.gov)

To quote directly from the NIST website, it states: The NVD is the U.S. government repository of standards based vulnerability management data represented using the Security Content Automation Protocol (SCAP). This data enables automation of vulnerability management, security measurement, and compliance. The NVD includes databases of security checklist references, security-related software flaws, product names, and impact metrics.

Sounds like this is exactly what we'll need to answer this question. Specifically we want to know of any CVE's with a **CVS V3** score of **9.8**

 

<details>
<summary>Click here for the answer</summary>

We know we are looking at OpenSSH version 8.2 so we can filter our results with the following settings:

First, change the search type to **Advanced**. Then set the CVS metrics to **Version 3.x** as requested in the question. Set the severity to **Critical** and lastly, set the product to **OpenSSh** with a version of **8.2** and click **Search.**

 

![](/images/NVD_NIST-1024x592.png)

 

The returned result matches our search criteria, and is the only RCE CVE which makes our answer **CVE-2023-38408**

![](/images/CVE-2023-38408.png)

</details>

 

As we continue through, we're asked to try and find a contact for cyberfile.me

![](/images/contact-cyberfile-1024x117.png)

 

Initial searches of the contact pages revealed nothing and I even tried some google dorking using inurl: and site: operators but there's a lot of hosted content that came back when I tried to filter on words such as "contact", "email" and "@". Some of which is not appropriate for sensitive eyes.

I'd love to know how others did this, but I returned to a manual method of searching.

 

<details>
<summary>Click here for the answer</summary>

Going through each section of the main pages I did searches for the "@" symbol to find email addresses.

![](/images/admin_at_dark.bz_-1024x256.png)

It was on the https://cyberfile.me/term page that I got lucky and found the answer I was looking for, **admin@dark.bz**

</details>

 

Now that we have an email, or more specifically a domain. We can start digging to help Orkla find the legal company number that was associated with this domain.

![](/images/legal-company_number-1024x139.png)

 

Unfortunately this domain is no longer active so most searches with come back empty. What we need to somehow do is search through historical records from a time when it was active and further details can be extracted.

Sometimes when people register domains they slip up and forget to hide personal details. One way to find this information is through historical Whois registers.

In this case i'm going to start by searching using [https://www.bigdomaindata.com](https://www.bigdomaindata.com)

From there I may be able to find information that will help me pivot and identify a company behind this domain.

 

<details>
<summary>Click here for the answer</summary>

Searching for dark.bz, the domain we identified in the previous question, we come up with the following historical whois information.

**https://www.bigdomaindata.com/whois/dark.bz**

![](/images/bigdomaindata.com_-1024x533.png)

 

As we review the result, we see the same registrar details reappearing:

**Sarek Oy** **https://sarek.fi**

Using this information we can see that the registered website ends with **.fi** which belongs to **Finland**. I did a google search for Finnish company registers and found **https://tietopalvelu.ytj.fi**

We know from previous whois searches that the company we are searching for is called Sarek Oy.

![](/images/tietopalvelu.ytj_.fi_-1024x612.png)

 

This returns the following company based in Helsinki and the line of business matches what we are interested in.

![](/images/SarekOy-1024x145.png)

 

We can view the full details related to the business, which also includes their Business ID

![](/images/SarekOy2-1024x477.png)

 

So the company (Business) ID and answer to this question is  **3090388-4**

</details>

 

Now that we know the company, orkla needs us to find out who actually founded it?

![](/images/WhoFoundedSarekOy-1024x121.png)

 

There's a number of paths we can go down, such as reviewing company ownership records and so on. But in this case a simple Google search should reveal the information you seek.

 

<details>
<summary>Click here for the answer</summary>

Google search: **"Sarek Oy" founder**

![](/images/Sarek-Oy-founder-1024x344.png)

 

We can expand on this a little now that we have a name and see if there's any supporting results.

Google search: **"Sarek Oy" "Peter Sunde"**

![](/images/Sarek-Oy-founder2-1024x240.png)

 

With this we can find additional links and documentation related to Peter Sunde and his relationship with Sarek Oy.

https://www.icann.org/en/system/files/files/complaint-response-00019589-13sep22-en.pdf

![](/images/PeterSunde-1024x485.png)

 

Based on these results my answer to this question is **Peter Sunde Kolmisoppi**

</details>

 

We're making progress now!  Orkla's been doing some digging of their own and it seems there may be accusations  of this person or the companies they run being a bit shady and slack with abuse requests.

![](/images/AnotherCompany-1024x236.png)

 

Based on the information we have found so far, we need to track down a post from 2022 that contained a comprehensive list of this registrar's response rates to complaints.

This is where some Google dorking comes in handy. We know the owner and a month and year. All good data points to search and pivot from.

 

<details>
<summary>Click here for the answer</summary>

First things first. We want to know what the other company is that **Peter Sunde** operates. We know it's something that deals with abuse requests, so the easiest starting point is to see what comes up for this person.

Google search: **"Peter Sunde Kolmisoppi"**

And straight away we can see Peter is behind the infamous TPB (The Pirate Bay)

![](/images/ThePirateBay-1024x272.png)

 

Checking further results we can see he is also behind a number of other projects or companies

![](/images/Peter_AlsoKnownFor-1024x410.png)

 

Taking this new information, we are able to craft a more specific Google search to refine our results to a specific time. In this case I want to only see results from Janurary 2022.

Google search: **"Sarek Oy" and "comprehensive list" before:2022-02-01 and after:2022-01-01**

And while I didn't get an exact match, the very first result contains enough similarity to be worthy of a look.

![](/images/GoogleResults2022-1024x420.png)

 

Clicking the link: https://scammer.info/t/shutting-down-scam-websites/88306 takes us to a post on the scammer.info website which is indeed dated Janurary 2022. This does indeed look like the post we are looking for.

![](/images/AngelFatPost-1024x637.png)

 

And we can see the poster and answer to this question is **AngelFat**

</details>

 

Tut, tut.. nothing good becomes of being dodgy. Seems Peter has been denied accreditation for reselling certain doamins.

![](/images/PeterComplaint-1024x174.png)

 

Using what we know, can we find the complaint under which this claim was registered? If you remember a few questions back, we actually came across this complaint in a previous search.

Can you find it again?

 

<details>
<summary>Click here for the answer</summary>

This should be an easy one. Back to Google again quickly and perform the following search.

Google search: **Peter Sunde Kolmisoppi complaint**

![](/images/Sarek-Oy-founder2-1024x240.png)

 

One of the results will take us direcly to https://www.icann.org/en/system/files/files/complaint-response-00019589-13sep22-en.pdf

![](/images/PeterComplaint_letter-1024x661.png)

 

Conveniently the complaint number is also included in the naming of the official document. Which gives us the answer of **00019589**

</details>

 

![](/images/ChangeIP-1024x135.png)

 

Sometimes I wish Orkla was more transparent, but i'll take any work I can get. Orkla wants to know what IP address was being used by cyberfile.me back on September 7th, 2023. I'll just do as i'm told.

Like most things, there's often a record of past deeds. We can possible use a service like [https://viewdns.info](https://viewdns.info) as I'm sure they'd have some way at looking up IP history for a site?

 

<details>
<summary>Click here for the answer</summary>

using the IP History tool we are able to search for anything related to cberfile.me

https://viewdns.info/iphistory/?domain=cyberfile.me

![](/images/IPHistory-1024x256.png)

 

Based on this we can see that cyberfile.me had an IP address of **190.115.31.35** on the 7th of September 2023

</details>

 

![](/images/SloveniaQuestion-1024x262.png)

 

We're going to pivot a bit here based on Orkla's clients requirements. We need to identify some information related to a variant of bankr.ru based in Slovenia, specifically what email was used to register the domain.

What we do know is that the top-level domain over there is .si

![](/images/si_solvenia-1024x205.png)

 

<details>
<summary>Click here for the answer</summary>

Using this piece of information, we want to find any domain registers or whois data for that country.

![](/images/Solvenia_domain_whois-1024x387.png)

Our first result points us to https://www.register.si which looks promising. A search for bunkr.si shows it is indeed register and conveniently (for us) they have listed a contact for the domain holder.

![](/images/Bunkr_si-1024x901.png)

 

The domain holders email is **contact@knox.su**

</details>

 

Looks like we're making good progress and Orkla is pleased with our efforts so far.

![](/images/GigahostSister-1024x197.png)

 

Our next piece of information relates to a company called Gigahost AS. Seems the owner of this company may be involved in a similar company to host certain parts of their ecosystem.

A quick search of Gigahost AS shows it as a hosting company based in Norway

![](/images/GigahostAS-300x189.png)

 

Using this information, the best starting point would be to identify the registered owner of Gigahost AS with a Norwegian business register, then pivot from there to find other companies under their control.

Good luck!

 

<details>
<summary>Click here for the answer</summary>

One such register is **https://data.brreg.no** where we can search for Gigahost AS. This points us towards the following company registration - https://data.brreg.no/enhetsregisteret/oppslag/enheter/933452549

![](/images/GigahostAS_reg-1024x571.png)

 

If we scroll down the page, we can see an expandable section which displays roles and specifically the Chairman of the Board, **Erik Gulliksen**

![](/images/Erik-Gulliksen.png)

 

I got a little stuck here as I was expecting a bit more functionality and the ability to then search for any businesses by persons name. Not sure if I'm just missing it, but I ad to pivot and try a different service.

I switched to https://www.proff.no/roller/gigahost-as/sandefjord/it-drift-og-support/IFFR4LH0ZDG which allowed me the option to people related to the business, but also pivot to each and see what businesses they were related to.

![](/images/GigahostAS_Roles.png)

 

From this point I reviewed each name listed on the board of directors and reviewed the companies they were associated with. At the same time I did a search on google to see if any information correlated with what I was seeing.

Google search: **"gigahost as" sister company**

This pointed me to post that described Gigahost acquiring Terrahost in Norway and the Netherlands

https://lowendtalk.com/discussion/196094/gigahost-acquires-terrahosts-hosting-services-in-norway-and-the-netherlands

Reviewing the board of directors for Gigahost AS we can see that Andreas Melsom Haakonsen is a chairman of the board for Terrahost AS

https://www.proff.no/roller/terrahost-as/sandefjord/datamaskiner-og-utstyr/IGGOHD5009N

![](/images/Terrahost.png)

 

So the answer Orkla is looking for is [Terrahost AS](https://www.proff.no/selskap/terrahost-as/-/-/995474921)

</details>

 

Following on from identifying the company, Orkla really needs our help to identify the potential owner of this company. This shouldn't be too hard given that we are already looking in the right place.

![](/images/Terrahost_primary-1.png)

 

<details>
<summary>Click here for the answer</summary>

While we are looking at the company details for Terrahost AS on the https://www.proff.no website we can scroll down to view the management/administration information for the company. It's here we can see the Chairman of the board is a gentleman by the name of Andreas Melsom Haakonsen.

![](/images/Andreas.png)

 

So the person of interest that we are looking for behind Terrahost AS is [Andreas Melsom Haakonsen](https://www.proff.no/rolle/andreas-melsom-haakonsen/-/545434)

</details>

 

So far we're making great progress and Orkla seems to be happy with our results. Lets see if we can keep the momentum going.

Now that we have identified a person behind the company, it would be really beneficial to see if we can find a personal gmail account tied to them.

![](/images/Haakonsen_gmail.png)

 

Can we do that? For sure we can! But how?

 

<details>
<summary>Click here for the answer</summary>

Our first port of call will be a simple Google search to see if that turns up anything.

Google search: gmail "Andreas Melsom Haakonsen" TERRAHOST

What I do get back is two (close) results. One for a Github repository belonging to @melsom. And a Facebook post by DJ Howard which contains a comment from a user named Andreas Melsom Haakonsen with what is possibly the gmail address we are looking for. Now, while these look promising, we need a way to verify if these do in fact belong to the same person that we are interested in.

If we first check the Github profile, we have a clear profile picture and Terrahost AS is listed as their pace of work.

![](/images/Haakonsen_github.png)

 

If we now review the Facebook profile of the person with the same name, we see a number of photos including their profile image which are of the same person identified in the Github account. I think it's safe to say that the facebook profile is in fact the same person.

![](/images/Haakonsen_facebook.png)

 

If we go back to the post made by Andreas Melsom Haakonsen on the DJ Howard post, we can identify the gmail address for this person.

![](/images/Haakonsen_gmail_answer.png)

 

The address Orkla is looking for is: **melsom@gmail.com**

</details>

 

Now that we have a personal email for Andreas there's more we can do.

![](/images/Haakonsen_domains.png)

 

Often when we look at domains we are trying to find who it's registered to. In this case we want to do a reverse of that and try to identify any domains that may have been registered to this particular email address.

There are a number of tools that can do this for us, if you know where to look.

 

<details>
<summary>Click here for the answer</summary>

One such online tool that allows us to look up domains registered to an email is https://viewdns.info and the specific tool or process is called a Reverse Whois Lookup.

If you navigate to https://viewdns.info/reversewhois you can perform a search on melsom@gmail.com

![](/images/Haakonsen_reverseWhois.png)

 

From this we can see melsom@gmail.com has been used to register the domain **rag3.net**

</details>

![](/images/Who_owns_Terrahost.png)

 

We completely forgot about Terrahost.. well, Orkla didn't ask so it's their fault. Lets see if we can find out more details about who's behind them. And the best place to start is back with https://proff.no

 

<details>
<summary>Click here for the answer</summary>

Going back to Terrahost AS https://www.proff.no/aksjon%C3%A6rer/bedrift/terrahost-as/995474921 there is a section that lists **Owners** near the bottom.

![](/images/terrahost_owner-1024x168.png)

 

And as we can see, Terrahost AS is 100% owned by **Epik Holdings, Inc**

</details>

 

![](/images/Epik_Holding_owner.png)

 

Now we're talking.. slowly working our way up the chain. So who owns THIS company?

 

<details>
<summary>Click here for the answer</summary>

After a little sleuthing we can tell that Epik Holdings is a US incorporated company and one of the best resources to search is the "open database of the corporate world" https://opencorporates.com

A quick search for Epik Holdings Inc will take us to the following entry https://opencorporates.com/companies/us\_wa/602976304

![](/images/Epik_Holding_owner2.png)

From here we can see the Director and answer to this question, **Robert Monster**

</details>

![](/images/Monster_trial.png)

 

Hmmm Orkla, I think you're right. If this was common knowledge and published openly, we should be able to find something using Google.

 

<details>
<summary>Click here for the answer</summary>

My course of action for this one was to search for keywords, but to also use the **before:** search function to limit my results to anything before a certain date.

Google search: "Epik Holdings" monster case before:2024-01-01

One of the first links went to an entry at https://dockets.justia.com for Adkisson v. Epik Holdings and while this wasn't what I wanted to find, there is a helpful section at the bottom that links to searches related to parties in this case. The one we are interested in are searches for the defendant: Robert W. Monster

![](/images/DefendantRobert-W-Monster.png)

 

From here I clicked on the link to search Google News an dthe ver first result is an article at Domain Name Wire titled **Man gets $486k judgment against Rob Monster and Epik Inc over stolen domain.**

Reviewing the article at https://domainnamewire.com/2024/04/11/man-gets-486k-judgment-against-rob-monster-and-epik-inc-over-stolen-domain/

The article details match what we are interested in and within that article is a link to [https://domainnamewire.com/wp-content/RLE-default-judgment.pdf](https://domainnamewire.com/wp-content/RLE-amended-complaint.pdf) within the statement "According to the suit ([see the first amended complaint, pdf](https://domainnamewire.com/wp-content/RLE-amended-complaint.pdf)),"

We can open this document to review the case details and extract the case number.

![](/images/case_number.png)

 

The case number and answer to this question is **19-CIV-07263**

</details>

 

![](/images/how-much-money.png)

 

So it looks like Rob Monster had to pay up in the end. Do we know how much? I'm thinking this would have been decided by the Judge so we should be able to find it in legal documents somewhere?

 

<details>
<summary>Click here for the answer</summary>

A Google search for the case number "19-CIV-07263" links us to a document, DECLARATION OF ROBERT M. LEE IN SUPPORT OF DEFAULT hosted on https://domainnamewire.com/

In section 58.d we can see the amount requested for punitive damages.

![](/images/punitive-damages.png)

The total amount requested and the answer to this question is **$125,000**

</details>

 

![](/images/shady-service.png)

 

I'd agree with Orkla here. Definitely some shady things going on in the background that we need to get to the bottom of. Lets see if we can identify who owns 107.189.6.189 in Luxembourg.

Do you remember that online tool we used earlier? dnsdumpster it was called.. maybe that can help us? It's a good starting point to see who that IP belongs to and then we can pivot from there.

 

<details>
<summary>Click here for the answer</summary>

As https://dnsdumpster.com ssays, we can use it for "dns recon & research, find & lookup dns records". A search for 107.189.6.189 brings up the following details.

![](/images/dns_lookup_ponynet.png)

 

From this we can see that Ip belongs to something called **PONYNET**

Interesting. Let's perform another search now on Google for PONYNET and see what comes up.

The very first result points to https://whois.ipip.net/AS53667 and this will correlate our AS Name of PONYNET to the actual organisation name.

So we can confidently say this IP belongs to **Frantech Solutions**

</details>

 

![](/images/owner-of-frantech.png)

 

Damn. Seems like there's layer upon layer like a rotten onion. First we need to figure out what the other brand is and who's behind it. The best place to start in this case is with what we know, Frantech Solutions webpage, https://frantech.ca/

 

<details>
<summary>Click here for the answer</summary>

If we visit Frantechs webpage, there's very little content to see. What they do have however is the following line "We humbly ask that you try out our alternative brand, **[BuyVM](http://buyvm.net/)"** and a link to their alternative brand.

https://buyvm.net looks reasonable enough at first glance, but no obvious names jumping out so a good place to check is the **About Us** page. It's here we are introduced to the founder of Frantech Solutions.

![](/images/Francisco.png)

 

So it looks like we have found our guy and the answer to this question, **Francisco**

</details>

 

![](/images/closing-in.png)

 

This guy sounds like a piece of work doesn't he. Lets see if we can figure out what law he's hiding behind.

For this I'm going to resort to searching news.google.com for some known key words.

 

<details>
<summary>Click here for the answer</summary>

news.google.com search: Francisco frantech solutions hosting law

Even with that simple search I get two results. The second result returned points to an article published in Janurary 2018 at The New Yorker - https://www.newyorker.com/tech/annals-of-technology/the-neo-nazis-of-the-daily-stormer-wander-the-digital-wilderness

A quick CTRL+F and search for the word **Law** gives us 12 results. If we review each of these, we soon find the law that Francisco is hiding behind.

![](/images/law-of-the-land.png)

 

So there it is, the **Law of the Land**

</details>

 

![](/images/cyberfile.me-IP.png)

 

Common Orkla, this is an easy one and you don't need us for this, surely? Lets head over to https://dnschecker.org and it should be pretty easy to pull this one up.

 

<details>
<summary>Click here for the answer</summary>

All we need to do is plug in the IP we want to look up and bob's your uncle https://dnschecker.org/ip-whois-lookup.php?query=91.149.226.12

![](/images/dnsschecker.png)

 

There you go Orkla, **BULLETNET LTD**

</details>

 

![](/images/BULLETNET-LTD.png)

 

This looks like another job for https://opencorporates.com do you think?

 

<details>
<summary>Click here for the answer</summary>

Using the company search field at the top, search for BULLETNET LTD and we get a single hit for a United Kingdom company https://opencorporates.com/companies/gb/14302697

![](/images/BULLETNET-LTD-owner.png)

 

At the bottom of this entry you will see a person listed under Statements of Control and the answer to this question **LOICHENKO, Anhelina**

</details>

 

![](/images/well-done-1024x162.png)

 

We did it! That was an excellent scenario put together by the talented people over at https://kasescenarios.com

We hope this won't be the last.. who knows what Orkla may need help with in the future. Let's wait and see.

 

![](/images/Bounty-Hunt.png)

 

 

 

**Additional Links:**

Below is a list of the online resources I used during the course of this scenario. It's good to get familiar with them and how or when they could be utilised in a similar investigation.

\[su\_accordion\]

<details>
<summary>ping</summary>

**ping** (Packet Internet or Inter-Network Groper) is a computer network administration software utility used to test the reachability of a host on an Internet Protocol network. It is available for virtually all operating systems that have networking capability, including most embedded network administration software

</details> <details>
<summary>https://crt.sh</summary>

crt.sh provides a searchable database of certificate transparency logs. Certificate Transparency is an Internet security standard and open source framework for monitoring and auditing digital certificates

</details> <details>
<summary>https://dnsdumpster.com</summary>

DNSdumpster is _an online passive scanning tool_ to obtain information about domains, block addresses, emails, and all kind of information DNS related.

</details> <details>
<summary>https://nvd.nist.gov</summary>

The NVD is the U.S. government repository of standards based vulnerability management data represented using the Security Content Automation Protocol (SCAP). This data enables automation of vulnerability management, security measurement, and compliance.

</details> <details>
<summary>https://www.bigdomaindata.com/whois</summary>

BigDomainData is made up of 2 primary databases ([Current WHOIS Database](https://www.bigdomaindata.com/current-whois-database/) and [Historical WHOIS Database](https://www.bigdomaindata.com/historical-whois-database/)). Our Current WHOIS Database contains the latest WHOIS record of only active domain names (_over 267 Million_). While the Historical WHOIS Database contains WHOIS history of every domain name (_over 574 Million_) that was ever registered on the Internet.

</details> <details>
<summary>https://tietopalvelu.ytj.fi</summary>

Business Information System (government service), Finnish government service known in Finnish as Yritys- ja yhteisötietojärjestelmä. Search by name, Business ID or LEI code. You can also search by using other search criteria.

</details> <details>
<summary>https://virre.prh.fi</summary>

The prh.fi website. Responsible for the service Finnish Patent and Registration Office.

</details> <details>
<summary>https://www.icann.org</summary>

The Internet Corporation for Assigned Names and Numbers (ICANN) is a global multistakeholder group and nonprofit organization headquartered in the United States responsible for coordinating the maintenance and procedures of several databases related to the namespaces and numerical spaces of the Internet, ensuring the Internet's stable and secure operation

</details> <details>
<summary>https://scammer.info</summary>

Scambait forum and phone scammer database. Share information and numbers with over 30000 registered scambaiters.

</details> <details>
<summary>https://viewdns.info/iphistory</summary>

Shows a historical list of IP addresses a given domain name has been hosted on as well as where that IP address is geographically located, and the owner of that IP address

</details> <details>
<summary>https://viewdns.info/reversewhois</summary>

This free tool will allow you to find domain names owned by an individual person or company. Simply enter the email address or name of the person or company to find other domains registered using those same details.

</details> <details>
<summary>https://www.register.si</summary>

Register.si is the registry for . si top-level domain name and it operates within Academic and Research Network of Slovenia. In addition to the registration of domain names under . si, the registry manages top-level DNS server for . si.

</details> <details>
<summary>https://data.brreg.no</summary>

This register provides information about ownership and control in organisations with activity in Norway.

</details> <details>
<summary>https://www.proff.no</summary>

Proff offers databases of companies in Norway and helps to find potential customers, suppliers, partners within specific industries

</details> <details>
<summary>https://opencorporates.com/</summary>

OpenCorporates aims to transform corporate transparency by providing reliable, standardised information about legal entities worldwide. This data is a powerful tool for journalists, researchers, and anyone interested in corporate accountability

</details>

\[/su\_accordion\]
