---
title: "The Insider Threat CTF (1)"
date: 2023-05-03
categories: 
  - "ctf"
  - "osint"
  - "skills"
tags: 
  - "ctf"
  - "osint"
  - "skills"
coverImage: "insider-threat-1.jpg"
---

Welcome to The Insider Threat. An OSINT CTF to gather intelligence on a missing person that carried out a cyberattack on the organisation they were working at.

This CTF has been provided by [bushidotoken.net](https://blog.bushidotoken.net/p/ctf.html) and is based on real life investigations.

The back story is that we have been tasked by a client whose network has been compromised and taken offline. Incident responders and digital forensic investigators are currently on the scene and have conducted a preliminary investigation. Their findings show how the attack was orchestrated from one user account at the company, meaning this was an insider threat.

The client has alerted the authorities, which are currently too busy to help at this time. The client has come to us asking for help to find the malicious employee who has since disappeared.

 

As a starting point we have been supplied with the employees GitHub account [https://github.com/EMarseille99](https://github.com/EMarseille99) and need to find out as much as we can from this information.

 

### Task 1

#### Find out more information about the person of interests GitHub account.

 

**\[Question?\]** _What is their API key?_

This one's pretty simple. Connecting to, and reading through some of the early code that user EMarseille99 has committed to their GitHub will provide us with this answer.

<details>
<summary>Click here for the answer</summary>

Connect to https://github.com/EMarseille99 and change the year of contribution activity to 2020. Here you will see their first repository which was created on May 23, 2020.

[![](/images/EMarseille99-GitHub-Repository.png)](https://github.com/EMarseille99?tab=overview&from=2020-12-01&to=2020-12-31)

If you click on the project link **Project-Build---Custom-Login-Page** and then open the **[L](https://github.com/EMarseille99/Project-Build---Custom-Login-Page/blob/master/Login%20Page.js)ogin Page.js** file you will identify the API on line 1 in the JS code.

 

The answer to this question is API Key \= _**aJFRaLHjMXvYZgLPwiJkroYLGRkNBW**_

</details>

 

**\[Question?\]** _What is their real name, job role, company and university?_

A quick glance over the users GitHub profile shows a company name and a generic location of EU (European Union). I did some initial searching on Linkedin as this is the type of information provided there, but I had issues filtering my requirements by location and company name to get actionable results.

In the end I still focused on Linkedin, but this time carried out my search filtering direct through Google Dorks.

<details>
<summary>Click here for the answer</summary>

From Google I searched for the following **inurl:linkedin.com EMarseille99**

This time I get some focussed results from **fr.linkedin.com** which points to **Émilie Marseille - Back End Developer - Self Employed** so I think we're on the right track.

[![](/images/Emilie-Marseille-Linkedin.png)](https://www.linkedin.com/in/%C3%A9milie-marseille-4b353a1aa/)

From this we have indicators that this is a good match. We have matches with the profile image, the name compared to the GitHub account name, She's obviously in the EU and her title is a Back End Developer.

I think based on the information obtained from the Linkedin profile, correlated with her Github account, we can answer the questions as follows.

Full name = _**Émilie Marseille**_

Job role = _**Back End Developer**_

Company = Currently self employed, but as per her GitHub and Linkedin comments it was _**Software Consultants Inc**_

University = _**Sorbonne Université**_

</details>

 

**\[Question?\]** _What is their username and plaintext password?_

Again, by reviewing the code in [Login Page.js](https://github.com/EMarseille99/Project-Build---Custom-Login-Page/blob/master/Login%20Page.js) we can abstract useful information to answer this question.

<details>
<summary>Click here for the answer</summary>

On line 46 of the JS code, the username is displayed in clear text.

So the username is _**EMarseille99**_

For the password, we can see this defined on line 58 as **UGljYXNzb0JhZ3VldHRlOTk=** and for those who are unsure, the next line also clarifies that this is actually encoded using base64. There are a number of ways we can decode this to the plaintext password. We can use an online tool such as CyberChef, or we can even do this from the command line in a terminal.

For CyberChef, go to https://gchq.github.io/CyberChef/ and use the recipe "From base64. Add the base64 string as the input and our decoded text will appear in the output.

We can also do this from the command line (I'm on Mac OS) by typing > **echo 'UGljYXNzb0JhZ3VldHRlOTk=' | base64 -D** and this will also return the decoded text on the next line.

So the plaintext password and answer to this second part of this question is _**PicassoBaguette99**_

</details>

 

### Task 2

#### Looking at their GitHub account, what hacking tools did the person of interest use on company PCs?

 

Before starting this question, it's good to just review and get familiar with the repositories and tools that Emilie  has forked. While these aren't proof that these tools were used by her as part of the incident being investigated, we can make assumptions that each of these tools served a purposed in part of this fictitious CTF.

 

**(Some of) The Tools:**

 

**QuasarRAT** _Quasar is a fast and light-weight remote administration tool (RAT) coded in C#. Quasar can be used to access Task Manager, Registry Editor, manage files and startup items, download/upload and execute files, access system information, run various computer commands, log keystrokes, steal passwords and access files stored on the computer._

 

**Empire** _Empire 3 is a post-exploitation framework that includes a pure-PowerShell 2.0 Windows agent, and compatibility with Python 3.x Linux/OS X agents. It is the merger of the previous PowerShell Empire and Python EmPyre projects. The framework offers cryptologically-secure communications and flexible architecture. Basically, Empire is a tool that is similar to Metasploit but specific to PowerShell. It allows you to run PowerShell scripts in memory and make a connection back to your machine._

Read more at [https://www.bc-security.org/blog](https://www.bc-security.org/blog)

 

**Metasploit-framework** _The Metasploit Framework is a Ruby-based, modular penetration testing platform that enables you to write, test, and execute exploit code. The Metasploit Framework contains a suite of tools that you can use to test security vulnerabilities, enumerate networks, execute attacks, and evade detection._

Read more at [https://docs.rapid7.com](https://docs.rapid7.com/metasploit/msf-overview/#:~:text=The%20Metasploit%20Framework%20is%20a,execute%20attacks%2C%20and%20evade%20detection.)

 

**Meterpeter** _Meterpreter is a Metasploit attack payload that provides an interactive shell to the attacker from which to explore the target machine and execute code. Meterpreter is deployed using in-memory DLL injection. As a result, Meterpreter resides entirely in memory and writes nothing to disk._

 

**Mimikatz** _Mimikatz is a tool made by gentilkiwi that is commonly used by hackers and security professionals to extract sensitive information, such as passwords and credentials, from a system's memory._

Read more at [http://blog.gentilkiwi.com/mimikatz](http://blog.gentilkiwi.com/mimikatz)

 

**Hashcat** _hashcat is the world's fastest and most advanced password recovery utility, supporting five unique modes of attack for over 300 highly-optimized hashing algorithms. hashcat currently supports CPUs, GPUs, and other hardware accelerators on Linux, Windows, and macOS, and has facilities to help enable distributed password cracking._

Read more at [https://hashcat.net/wiki/](https://hashcat.net/wiki/)

 

**Bloodhound** _BloodHound is an Active Directory reconnaissance and attack path management tool that uses graph theory to identify hidden relationships, user permissions, sessions and attack paths in a source Windows domain._

Read more at [https://bloodhound.readthedocs.io](https://bloodhound.readthedocs.io/en/latest/index.html)

 

**Nmap** _Nmap is used to discover hosts and services on a computer network by sending packets and analyzing the responses. Nmap provides a number of features for probing computer networks, including host discovery and service and operating system detection._

Read more at [https://nmap.org](https://nmap.or)

 

**xmrig** _XMRig High performance, open source, cross platform RandomX, CryptoNight, AstroBWT and Argon2 CPU/GPU miner, with official support for Windows._

 

**\[Question?\]** _What was used for lateral movement and privilege escalation?_

<details>
<summary>Click here for the answer</summary>

This would have to be a combination of _**Metasploit-framework**_ and _**Meterpeter**_ or _**Empire**_ Mimikatz could have also been used to obtain additional accounts and passwords to aide in privilege escalation

</details>

 

**\[Question?\]** _What was used for remote control__?_

<details>
<summary>Click here for the answer</summary>

This one has to be the Remote Access Tool (RAT) called **_QuasarRAT_**

</details>

 

**\[Question?\]** _What was used for r__econnaissance?_ 

<details>
<summary>Click here for the answer</summary>

My guess for this would be a combination of _**BloodHound**_, given it's an Active Directory reconnaissance and attack path management tool and _**Nmap**_ which can perform host discovery and identify open ports and services.

</details>

 

**\[Question?\]** _What was used for_ _cryptocurrency mining?_ 

<details>
<summary>Click here for the answer</summary>

Definitely has to be _**xmrig**_ for this

</details>

 

**\[Question?\]** _What was used for_ _password cracking?_ 

<details>
<summary>Click here for the answer</summary>

_**Mimikatz**_ would have been used for obtaining the passwords/hashes from compromised machines, but it doesn't do the actual cracking itself. This would have been passed off to another application such as _**Hashcat**_ for "recovery'

</details>

 

### Task 3

#### Can you find Emilies other accounts online?

 

Some of these we have already come across while investigating early information. For the most part this will involve running additional searchs on the information we currently have, such as full name, company, country and even focusing on image searching to see what we can identify.

 

**\[Question?\]** Identify their account on a popular business/hiring network_?_ 

<details>
<summary>Click here for the answer</summary>

So I think we'd assume a good place for this information will be Linkedin. From Google I searched for the following **inurl:linkedin.com EMarseille99** and I get some focussed results from **fr.linkedin.com** which points to **Émilie Marseille - Back End Developer - Self Employed** so I think we're on the right track.

[![](/images/Emilie-Marseille-Linkedin.png)](https://www.linkedin.com/in/%C3%A9milie-marseille-4b353a1aa/)

From this we have indicators that this is a good match. We have matches with the profile image, the name compared to the GitHub account name, She's obviously in the EU and her title is a Back End Developer.

So the answer to this will be _**[linkedin.com/in/émilie-marseille-4b353a1aa](https://www.linkedin.com/in/%C3%A9milie-marseille-4b353a1aa?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B8m7vvujfRCqA6s5kQjsqUw%3D%3D)**_

</details>

 

**\[Question?\]** Identify their social media account for taking photos_?_ 

Another google search using only the known alias gives us immediate results to solve this question.

<details>
<summary>Click here for the answer</summary>

The very first result is linking to Instagram

[![](/images/instagram-search.png)](https://www.google.com/search?q=+EMarseille99)

Following this link, we have some good indicators that this belongs to the person of interest. The Instagram profile and answer to this question, _**www.instagram.com/emarseille99**_ shows the same user image, full name, job role and company name.

[![](/images/instagram-profile.png)](http://www.instagram.com/emarseille99)

</details>

 

**\[Question?\]** Identify their community profile for playing PC games and what university club were they in_?_ 

We can stick with Google to continue our search, or we can try something different. We can also search a number of online platforms by username using something like [**https://blackbird-osint.herokuapp.com/**](https://blackbird-osint.herokuapp.com/)

<details>
<summary>Click here for the answer</summary>

By searching for EMarseille99 we get a number of positive responses and if we are focused on identifying gaming sites, we can see an account for EMarseille99 exists on Steam.

[![](/images/blackbird.png)](https://blackbird-osint.herokuapp.com/)

Clicking on the hyperlink for this result, we can deduce that the steam account [_**https://steamcommunity.com/id/EMarseille99/**_](https://steamcommunity.com/id/EMarseille99/) does in fact belong to Emilie.

[![](/images/steam-profile.png)](https://steamcommunity.com/id/EMarseille99/)

 

Pivoting back to Emilies Linked in account, we can see _**eSports**_ listed as an activity and society from Sorbonne Université.

 

We could have also arrived at this conclusion through other means, which was through a post on her Instagram account when we reviewed it in an earlier question. Reviewing her posts in there, you will see a photo containing a QR code and the comment "Add me for some games ;)".

[![](/images/QR-code.png)](https://steamcommunity.com/id/emarseille99/)

Following the URL from the QR code will redirect you to Emilies Steam profile _**https://steamcommunity.com/id/emarseille99/**_

</details>

 

### Task 4

#### Using Emilies social media, find out the following..

 

**\[Question?\]** Where did she go on holiday_?_ 

Looking at Emilies Instagram account, we can see a photo with a comment from Emily that says "Once in a lifetime holiday here, love me some slings x". I'm not familiar with the building below, but as soon as she said "slings" I think of the alcoholic drink, Singapore Slings.. lets see

![](/images/Screenshot-2023-05-03-at-3.55.40-PM.png)

 

<details>
<summary>Click here for the answer</summary>

Instagrams a bit of a pain, so I inspected the source, found the image and opened _**[https://scontent-syd2-1.cdninstagram.com](https://scontent-syd2-1.cdninstagram.com/v/t51.2885-15/100993437_582426785720427_6773448642860963652_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-syd2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=6NksMi07ft4AX-Y493S&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=MjMxNTcwOTg4ODU0NDkyOTY0NA%3D%3D.2-ccb7-5&oh=00_AfDk_qPS20u9Ey54Y4GkAhxrlqfURlFmq9aI0LKeizMing&oe=64578B74&_nc_sid=022a36)**_ in a new tab. A reverse image search gave me the answer I was looking for.

![](/images/Screenshot-2023-05-03-at-3.46.25-PM.png)

It would seem that Emilie was on holiday in _**Singapore**_ and this particular photo was taken by the _**Marina bay Sands**_ - https://www.marinabaysands.com/hotel.html

![](/images/Screenshot-2023-05-03-at-3.51.13-PM.png)

</details>

 

**\[Question?\]** Which city does she live in_?_ 

We have some initial clues from the start of this challenge which showed her location on Linkedin as Île-de-France, France, but lets try to confirm this.

Reviewing Emilies Instagram account she has posted a picture of a location with the comment "Love working in this beautiful city x". So lets see if we can confirm where this may be from the photo below.

[![](/images/Love-working-in-this-beautiful-city.png)](https://www.instagram.com/p/CAjC9umFTZJ/)

 

<details>
<summary>Click here for the answer</summary>

A reverse image search gives us a number of similar images of buildings next to the Seine river in Paris. And cross referencing these, it looks like we are looking back towards the Notre Dame cathedral. We can confirm this to 100% certainty on Google Maps street view at _**[https://www.google.com/maps/@48.8519859,2.3535824](https://www.google.com/maps/@48.8519859,2.3535824,3a,75y,104.66h,105.96t/data=!3m8!1e1!3m6!1sAF1QipOhFY39-n7POyxpNIgyFSanOb-QRG970yECqPhW!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOhFY39-n7POyxpNIgyFSanOb-QRG970yECqPhW%3Dw203-h100-k-no-pi-0-ya55.513374-ro-0-fo100!7i8704!8i4352?hl=en-GB)**_

[![](/images/street-view.png)](https://www.google.com/maps/@48.8519859,2.3535824,3a,75y,104.66h,105.96t/data=!3m8!1e1!3m6!1sAF1QipOhFY39-n7POyxpNIgyFSanOb-QRG970yECqPhW!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOhFY39-n7POyxpNIgyFSanOb-QRG970yECqPhW%3Dw203-h100-k-no-pi-0-ya55.513374-ro-0-fo100!7i8704!8i4352?hl=en-GB)

I was initially a bit thrown as Linkedin shows _**Île-de-France**_ yet we know this photo is in _**Paris**_ but agian, a quick Google and education explains that The Île-de-France is literally "Isle of France" and is the most populous of the eighteen regions of France, with an official estimated population of 12,271,794 residents on 1 January 2023. Centred on the capital Paris, it is located in the north-central part of the country and often called the Paris Region.

So there you have it. Emilie lives in _**Paris**_.

</details>

 

**\[Question?\]** Where is her family based (country)_?_ 

Again, referring back to Emilies' Instagram profile, we can see two photos that are referred to as being with friends and family.

[![](/images/Screenshot-2023-05-04-at-5.06.07-PM.png)](https://www.instagram.com/p/CAjCfM1lKhq/)

[![](/images/Friends-and-family-2.png)](https://www.instagram.com/p/CAjCdGrldGr/)

Since we're not trying to find the exact address, but only the country of residence, we can obtain this quite easily.

 

<details>
<summary>Click here for the answer</summary>

From the first photo we see a very unique building, which a reverse search identifies as the Burj Khalifa skyscraper and this would place us in _**Dubai, United Arab Emirates**_.

[![](/images/Burj-Khalifa-image-search-1024x694.png)](https://lens.google.com/search?p=ATHekxdgglxSqLdQppSXsKVp8evQx1DXCVeg6gOTWp2FHNkKE2ljBjLnJB2gyDhe96v4b3sSxzAE-P9vtsS6BImUuyvjIw9CUZMlJkt9obnwddqEnFYoPxYzggC2CHWzm4CmtvEVXUAhDGV3soCx1KBJGi6IfWkHWxaMmsK24aqnI3cq9bwhMbe9eXieP3OdFPj-VvNrWymlpVFM8jJO0jAyOo5uCx7npJs9ZyQmItluuqWgyAAJ6JlN7_kjqjaBViJ-BR1kQ2hcI29dRYB7CZNw3Cf_rZhKhM6Xx3pptEXN7czP2ftrO0hSG8ZQpXmRyj4fj5wjwLksWYiwhRy0KNSmdePguNJP5VhqXlbgmjx3-9eNZa33XziB3cOVl6Kcq9NTG-CgSkvHD6VYHspaODQDuyybjZFlRa-459G_Pha13XX_4S-WHcgi7bIUCMw%3D#lns=W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIkVrY0tKRFZpWlRGallqZGhMV05sTXpRdE5EUmtPQzFoWmpVM0xUWTROVFUyWkRVNE5EVTJPUklmVFRKU1FtMTBOMVZ2UnpSUldVeHVaVFo2U1ROWFNFNHhNMEl5VFdab1p3PT0iLG51bGwsbnVsbCxudWxsLDEsbnVsbCxbbnVsbCxudWxsLFs2MTAwMSwyMDQ3Niw3NTU5NSwzODk5OV0sbnVsbCw1XSxudWxsLG51bGxd)

One of the first unique identifying features in the second photo is a flag.. but what flag? We can do this a few ways if you're unsure.

We can compare the colours and layout to other flags, or use an online identifier like [https://flagid.org](https://flagid.org/found.asp?qa=16&ci=r,v,w,n&co=on)

This lets us input the colours and then provides possible matches as seen below.

[![](/images/FlagID-1024x400.png)](https://flagid.org/found.asp?qa=16&ci=r,v,w,n&co=on)

We can also do a reverse image search and isolate the area of the flag to achieve a similar result. In both methods we see that the flag colours and layout matches Al-Imārāt al-Arabiyyah al-Muttaidah • _**United Arab Emirate****s**_ (formerly Trucial Coast • Trucial Oman or Trucial Sheikdoms).

</details>

 

 

### Task 5

#### Find the location of Emilies company.

 

So we have have been provided with the following image of a building in which the company Emilies  works for has an office.

![](/images/photo-of-office-building.png)

 

**\[Question?\]** Which city is the company located_?_ 

We have a few areas of interest that can aide with our research. We have a unique street sign with a number of landmarks listed in English, we have a very distinct silver building in the background, which for the purpose of this CTF i'll assume is the building of interest. There's a large pedestrian only area and in the background we see signs for "Grand Central" which is maybe a transport hub of some sorts. And we also have a brick looking building with "ODEON" on it, which could be a cinema or similar.

So lets start with an easy method and reverse image search to see what comes up.

 

<details>
<summary>Click here for the answer</summary>

Too easy. Immediately we get 100% hits on the image search which places this location in _**Birmingham**_ which is located in the West Midlands region of England, approximately 100 miles (160 km) from London.

[![](/images/Birmingham-office-image-search.png)](https://lens.google.com/search?p=ATHekxe_TnIL2kfvHJtN_Kuk_hjenYvGnnnGTaog4RWofzXOXLJrwIdKPFFPYWVh5hWwG_R7-EuP34-mZybiwLEHF6E8dTeoAwqtDZe75jg0897BYeLI77jqlH9n_nh38QUpyn-NmV2vIgHTWVs3nXdVKQjCiodzsk2DYgn88hB0aG6F93tXwiqx_TEiILzMj007d5jZtTV-0zAVV6umif_2abP5mnyQnA-uo6RLZ3UkkNa1zIQdkMR1YRQC6Zc6YPe4I87KQqMUdN1MeN9SBDfoqSC9sYhU4FQDw6ZhPjl7gxtOHvMFWeK229lB157INOK7-qMVAavDhNsaMTbVFJhcQPRaGrtP2fypwjJRfrWjV8MTmnKebkxgSTisNYVpq05HMTq7T3emVzdL-5Gal75MvnwOoMhSrbZ4hzUMgHnKU5th7rOeToHsmgKAsDDiOA%3D%3D#lns=W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIkVrY0tKRGd5TWpobU9EUTJMVGd6TTJJdE5ESTFOaTA0TnpsaUxUYzJNVE00TlRVd01UQTJZUklmTkMxaGJVeGxVRUV0WWxGaldVeHVaVFo2U1ROWFNFNXNMVkpwVG1ab1p3PT0iLG51bGwsbnVsbCxudWxsLDEsbnVsbCxbW10sbnVsbCxudWxsLG51bGwsOF0sbnVsbCxudWxsXQ==)

We could have also figured this out buy looking at the landmarks on the street sign. The one pointing left clearly displays Hippodrome Theatre,  Alexandra Theatre and Chinese Quarter. You can select this text directly from Google image search, or manually search in. But in either case, but searching for these three landmarks together with give you all the information to identify this city.

[![](/images/Hippodrome-Theatre-Alexandra-Theatre-Chinese-Quarter.png)](https://www.google.com/search?q=Hippodrome+Theatre+Alexandra+Theatre+Chinese+Quarter&authuser)

</details>

 

 

### Task 6

#### Emilie has left the country, but where is she now?

 

Emilie has been observed leaving her apartment and going to the airport. From there she has boarded a flight to another country, but where?  our intelligence team has spotted Emilie through a remote IP camera and provided us with the following image. Can we identify which state and country the camera (and Emilie) is in?

![](/images/A-view-from-the-dome-1024x736.jpg)

 

**\[Question?\]** Which state and country is this camera in_?_ 

We have a couple of things we can focus on in the image. First we have the distinct park layout and the unique architecture. But more importantly we can see that the image has been taken by something called EarthCam and possibly that camera is labeled as "A View from the Dome". All excellent information points to work on.

[EarthCam](https://www.earthcam.com/) is a webcam Network of live streaming webcams for tourism and entertainment. Searching for the term "Dome" on their website returns 15 camera which at first glance don't match our image. However the images from the cameras based in Germany have very similar architecture and could be worth a further look.

So, my first issue is timing. As I try to check any of these cameras i'm presented with pure darkness as the current time in Europe is around 1:00AM.

So rather than view live webcams, I'm now going to search Google Images for static webcam photos. Using the term "_**earthcam germany dome**_". I get a number of results back, but I see two that catch my eye immediately.

It's worth noting, and always good practice to try various search terms. In this case I would have got better results by searching for _**webcam "a view from the dome".**_

 

<details>
<summary>Click here for the answer</summary>

Two of the images identify this location as the Live Webcam, and guess what - It's not even in Europe! To view the live stream and read more about this camera and location, visit https://dome.nd.edu/

[![](/images/Golden-Dome.jpg)](https://dome.nd.edu/)

So where did we find Emilie? Not in France or Germany. Not even in Europe. The answer to this final question is _**Indiana, United States of America**_

[![](/images/Notre-Dame-Indiana.jpg)](https://www.google.com/search?q=notre+dame+indiana)

</details>

 

Time for a slice of accomplishment. Until next time.

[![pizza party time](/images/pizza_small-1.gif)](https://thefish.nz/)
