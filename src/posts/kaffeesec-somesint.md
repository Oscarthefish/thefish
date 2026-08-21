---
title: "KaffeeSec - SoMeSINT"
date: 2023-04-19
categories: 
  - "ctf"
  - "osint"
  - "try-hack-me"
tags: 
  - "ctf"
  - "osint"
  - "try-hack-me"
coverImage: "buddha.jpg"
---

Hello again!

After having such a great time on Kase Scenarios' Dark Waters, I'm going to move over to Try Hack Me and attempt some of their OSINT specific challenges - https://tryhackme.com/room/somesint

It's worth noting that this challenge is a number of years old now. And as we know in OSINT, lots of things can change in a short amount of time. If you read the following hack Me blog [https://tryhackme.com](https://tryhackme.com/forum/thread/605bda35a29f13711902d61e), the following problems are listed and good to know. I crossed out two, as they are both 100% findable using the wayback machine.. good luck.

- Shadowban service no longer exists
- Hans comment isn't visible using wayback machine
- [https://ghostbin.com/post/JENxv/](https://ghostbin.com/post/JENxv/) is no longer accessible \[ [https://ghostbin.com/post/JENxv/1qaz2wsx](https://ghostbin.com/post/JENxv/1qaz2wsx) with password\]

KaffeeSec - SoMeSINT offers an intro to SOCMINT (Social Media Intelligence/Investigation) techniques and tooling. We're going to use our OSINT skills to perform an online investigation of a mysterious husband!

Lets get into it.

 

### Task 1

#### Overview

 

We're told that in this room, we'll be learning about social media analysis and forensics. We'll learn about google dorking, website archiving, social media enumeration/analysis, and the basic usage of OSINT techniques in the context of social media investigation. We don't need any previous knowledge of OSINT for this room.

When we complete this room, we should be comfortable applying tools and methodologies to gather information through social media, and answer context-based questions concerning social media. The goal of this room is to prepare us for CTF challenges in this category, as well as real-world research.

Lets get busy!

All you have to do to complete this task is sign up. So with that done, lets move on to the next task.

 

### Task 2

#### Story

 

**Background Information:**

_You are Aleks Juulut, a private eye based out of Greenland. You don't usually work digitally, but have recently discovered OSINT techniques to make that aspect of your job much easier. You were recently hired by a mysterious person under the moniker "H" to investigate a suspected cheater, named Thomas Straussman._

_After a brief phone-call with his wife, Francesca Hodgerint, you've learned that he's been acting suspicious lately, but she isn't sure exactly what he could be doing wrong. She wants you to investigate him and report back anything you find. Unfortunately, you're out of the country on a family emergency and cannot get back to Greenland to meet the deadline of the investigation, so you're going to have to do all of it digitally. Good luck!_

 

**\[Question?\]** _Who hired you?_

This one's pretty simple. Reading the background information above it clearly states who we were hired by.

<details>
<summary>Click here for the answer</summary>

"You were recently hired by a mysterious person under the moniker "_**H**_" to investigate a suspected cheater, named Thomas Straussman"

</details>

 

**\[Question?\]** _Who are you investigating?_

Again, this one's pretty simple. Reading the background information above it states who we are to investigate.

<details>
<summary>Click here for the answer</summary>

"You were recently hired by a mysterious person under the moniker "H" to investigate a suspected cheater, named _**Thomas Straussman**_"

</details>

 

### Task 3

#### Lets get started!!

 

How exciting! Through talking to people who know Thomas, you've found out that he has a very guessable online handle: tstraussman. With this handle, we can find his social media accounts, and start off this room.

Before we start answering any of the following questions, we first need to identify who Thomas actually is. For the scope of this investigation, we've been told that any accounts of interested will only be found on Twitter and Reddit.

Using the information we currently have which is his known alias and full name. We can perform a basic Google search consisting of _**tstraussman "Thomas Straussman".**_ The first hit was get is for a **@TStraussman** on Twitter, who happens to be located in Greenland, which is where we are normally located and where our services were engaged.

[![](/images/Screenshot-2023-04-20-at-1.39.24-PM.png)](https://twitter.com/TStraussman)

Along side this, I have performed another Google search, this time limiting the results to urls containing reddit.com. The syntax being _**inurl:reddit.com tstraussman**_

This gives us a match to the reddit user _**https://www.reddit.com/user/Tstraussman**_ Which we can correlate back to the Twitter account when we look at the reddit profile.

[![](/images/Screenshot-2023-04-20-at-1.57.03-PM.png)](https://www.reddit.com/user/Tstraussman/)

With these two accounts, we can start to try and identify useful information as part of our investigation.

 

**\[Question\]** _Who are you investigating?_

So this one was a slight guess as I didn't see anything that specifically reffered to a favourite holiday. However if we take into account his birthday and look closely at his Twitter profile, we do get some clues.

<details>
<summary>Click here for the answer</summary>

Given the time of year that Thomas has his birthday and a comment on his twitter profile implying peace comes from x-mas for him, I felt he had a strong connection to _**Christmas**_ - which is the correct answer.

[![](/images/Screenshot-2023-04-20-at-2.32.13-PM.png)](https://twitter.com/TStraussman)

</details>

 

**\[Question\]** _What is Thomas' birth date?_

This time we're going to focus on Thomas's Reddit posts. Within these you're see comments celebrating a birthday milestone. It's from this we can try to work out his birth date.

<details>
<summary>Click here for the answer</summary>

Looking at Thomas' Reddit posts, we can see he made a comment on the 20th of December 2020 about making it to 30 years old.

The post itself only says "submitted 2 years a go" so we don't see an exact date. However, there's two ways we can revel this.

The first and easiest is to hover your mouse over the text showing **2 years ago**. When you do this a little box will show with the exact date that the post was made. This clearly shows **Sun Dec 20 20:32:57 2020 UTC**

![](/images/Screenshot-2023-04-20-at-2.07.20-PM.png)

 

The second is to inspect the page code, and by drilling down to the area of interest we'll see the following which clearly has a time/date stamp of **Sun Dec 20 20:32:57 2020 UTC**

![](/images/Screenshot-2023-04-20-at-2.02.45-PM.png)

I had to try a few different formats to get the answer to work, but using the hint will tell you straight away that the format is MM-DD-YYY so taking the above date of Thomas' post, subtracting 30 years and the answer will be _**12-20-1990**_

</details>

 

**\[Question\]** _What is Thomas' fiancee's Twitter handle?_

This one should be quite straight forward. What we do know is her name, _**Francesca Hodgerint**_ (Note, she's referred to as wife in the background information, but the question, and socials are Fiancee.)

From here we can try to identify any interactions or relationships with other social media accounts that meet our requirements.

<details>
<summary>Click here for the answer</summary>

Looking again at Thomas' Twitter account, we can look at his replies and also who he follows to quickly identify Francesca's Twitter handle

[![](/images/Screenshot-2023-04-20-at-2.23.07-PM.png)](https://twitter.com/FHodgelink)

So the answer to this question is _**@fhodgelink**_

</details>

 

**\[Question?\]** _What is Thomas' background picture of?_

For this we need to go back to our earlier investigation and observations when reviewing Thomas' Twitter account.

<details>
<summary>Click here for the answer</summary>

We can clearly see the background picture contains a statue of _**Buddha**_

[![](/images/Screenshot-2023-04-20-at-1.39.24-PM.png)](https://twitter.com/TStraussman)

</details>

 

### Task 4

#### Spider... what?

 

This section seems to be all about using Spiderfoot - https://github.com/smicallef/spiderfoot

**SpiderFoot** is an open source intelligence (OSINT) automation tool. It integrates with just about every data source available and utilises a range of methods for data analysis, making that data easy to navigate.

SpiderFoot has an embedded web-server for providing a clean and intuitive web-based interface but can also be used completely via the command-line.

The task has instructions on installing Spiderfoot, which once finished you'll be able to access a user friendly web interface at http://localhost:5001/

In my case I specified tstraussman as the target and set the use case as 'All'  which will enable all modules. Now press **Run Scan Now** to start your scan. Note my mistake below - when setting a username as a target it must be enclosed in quotes.

[![](/images/Screenshot-2023-04-20-at-3.06.53-PM.png)](https://github.com/smicallef/spiderfoot)

Running it correctly returns the following (as of April 2023)

![](/images/Screenshot-2023-04-21-at-10.20.09-AM.png)

 

**\[Question?\]** _What was the source module used to find these accounts?_

If we look at the Source Module column, this is where the module will be listed.

<details>
<summary>Click here for the answer</summary>

So the answer to this question is _**sfp\_accounts**_

![](/images/Screenshot-2023-04-21-at-10.24.11-AM.png)

</details>

 

**\[Question?\]** _Check the shadowban API. What is the value of "search"?_

Unfortunately at the time of attempting this challenge, Shadowban is no longer in existence and no longer part of Spiderfoot. This answer will have to be obtained from a historical writeup to continue with the challenge

<details>
<summary>Click here for the answer</summary>

I've had to obtain this answer from the write up at **https://thisisfinx.medium.com**

Back when the Shadowban service was running, it would have shown the following

[![](/images/1_aFi28WGY-6op0emz7Q4nOw.webp)](https://thisisfinx.medium.com/1-4-tryhackme-kaffeesec-somesint-writeup-e1a7286b4824)

Thant would hake the answer to this question (in the correct flag format) _**ks{1346173539712380929}**_

</details>

 

### Task 5

#### Connections, connections..

 

Now that you have Thomas' Reddit and Twitter accounts, you can do some cool stuff!

At this point, consider downloading a reverse search extension for your browser, my favorite is RevEye, which lets you choose from a handful of great reverse search engines, or use all of them simultaneously. Chrome / Firefox

There are a few key types of information that we want to find from socials:

Images of places that contain clear identifiers like buildings, signs, monuments, or landmarks (For IMINT/GEOMINT purposes). Clear images of the subject's face (For reverse image searches and possibly finding more accounts/sources of info). Clear images of the subject in a group of people (Family photos, friend groups, other information that can give context to their relationship with the group). Personal information in their bio, or other personal data from their profile itself (Where they grew up, currently live, went to school, etc..). Relevant posts that may contain information on their whereabouts or personal habits (Do they smoke? Drink? Go to bars often? Love to vacation to specific places? All this information can help in an investigation.) Since you have gotten most useful information from Thomas' Twitter, it's time to "pivot" to his fiancee's account.

What personal information can you find?

 

**\[Question?\]** _Where did Thomas and his fiancee vacation to?_

Okay, at first glance when we look through Francesa's Twitter account we can obviously see that she vacationed to Germany.. but the question needs a more specific answer than that. We need to know where in Germany they were?

[![](/images/Screenshot-2023-04-21-at-11.10.55-AM.png)](https://twitter.com/FHodgelink/status/1341170334783864833)

To answer this question, we can perform a reverse image search to try and identify the location.

<details>
<summary>Click here for the answer</summary>

Using the RevEye extension, you can right click on the image and perform a reverse Image Search.

Using either Google or Bing will be fine, and while you may get different results, they'll mostly be similar given this is a popular destination.

Google Image search identifies the specific monument as Deutsches Eck in Germany.

[![](/images/Screenshot-2023-04-21-at-11.19.40-AM.png)](https://www.google.com/search?q=Deutsches+Eck&kgmid=/m/026911v&hl=en-GB&gl=GB#cobssid=s)

If we further search on Deutsches Eck in Germany the top result presented is a [Wiki page](https://en.wikipedia.org/wiki/Deutsches_Eck) dedicated to this monument.

[![](/images/Screenshot-2023-04-21-at-11.23.14-AM.png)](https://en.wikipedia.org/wiki/Deutsches_Eck)

And it is here we can identify the location, and answer to this question as _**Koblenz, Germany**_

</details>

 

**\[Question?\]** _When is Francesca's Mother's birthday? (without the year)_

Okay, staying with Francescas Twitter account, this is just simply a review of previous posts to obtain the information. While in the real world you would defiantly try to cross reference this information with another source, for this challenge we can make an assumption.

<details>
<summary>Click here for the answer</summary>

So looking at previous tweet we can see the following.

[![](/images/Screenshot-2023-04-21-at-12.13.57-PM.png)](https://twitter.com/FHodgelink/status/1342574336276774912)Now, while the post is made on the 26th, it also states "merry Xmas", so my assumption here an dthis is always good to keep in mind, my timezone is ahead of Francescas' so if she were to post on the 25th, it would actually show in my feed as the 26th.

With that said, Francesca's mums birthday and the answer to this question is _**December 25th**_

</details>

**\[Question?\]** _What is the name of their cat?_

This should be another easy one.. I really hope Francesca doesn't use her cats name in any of her passwords.

This is easily found by reviewing Francescas previous tweets.

<details>
<summary>Click here for the answer</summary>

Here we have it.

[![](/images/Screenshot-2023-04-21-at-1.32.05-PM.png)](https://twitter.com/FHodgelink/status/1343023195855736837)

The name of the cat is _**Gotank**_

</details>

**\[Question?\]** _What show does Francesca like to watch?_

This one was a little obscure to me as I'm not familiar with the show, so it didn't catch my eye. Reading through Francescas' replies highlights an interest in this show

<details>
<summary>Click here for the answer</summary>

We can see two replies from Francesca which both reference a particular television show.

[![](/images/Screenshot-2023-04-21-at-1.43.50-PM.png)](https://twitter.com/90DayFiance)

What ever floats your boat I guess. So Francesca likes to watch _**90 Day Fiance**_

</details>

 

### Task 6

#### Turn back the clock!!

 

Now that we've gathered intel from Thomas and Francesca's Twitters, lets move to another platform - Reddit.

For the sake of this investigation, we're going to be using Reddit in two different ways:

Use the old version (http://old.reddit.com/) for wayback machine purposes Use the new version (https://www.reddit.com/) for other purposes (later on) First, you're going to want to install the WayBackMachine extension for your browser (you don't need it, but it'll make your life much easier).

Using Reddit's old site, navigate to Thomas' profile. Right click anywhere on the page and click on Wayback machine --> All Versions. You will see a calendar that shows all of the saved versions of the site, click through and take a look at each saved version (in this case there should be none).

So it hasn't been saved yet... Nothing out of the ordinary, right?

Next, go to Thomas' birthday post. Repeat the steps to find the first version of the site and..... Voila!

We've discovered a coworker, which is another source of intel for us! But the question is... how much intel?

 

**\[Question?\]** _What is the name of Thomas' coworker?_

Okay, this is a tricky one. Remember at the start of this write up I mentioned some things had changed over the years. It has been communicated that Hans' comment is no longer viewable in the Wayback machine.. but lets see how we go.

<details>
<summary>Click here for the answer</summary>

Running the Wayback machine on the reddit post of Thomas' birthday and requesting all versions we can see the following https://web.archive.org/web/20230000000000\*/https://www.reddit.com/user/Tstraussman/comments/kh1pzg/big\_thank\_you/

[![](/images/Screenshot-2023-04-21-at-2.01.02-PM.png)](https://web.archive.org/web/20230000000000*/https://www.reddit.com/user/Tstraussman/comments/kh1pzg/big_thank_you/)

If we select the oldest archive, back in 2020, and select the entry on the calendar. We can now view the post which includes the comment "Hey, It's Hans from work. Congrats!!"

Now, I'm not sure about you, but on mine the author isn't showing at all. Completely gone.. sooo Lets inspect the page and see if we can dig anything up in there. Searching for the word 'Author' in the code gives me 9 results. Most are obviously not what i'm looking for. But this one catches my eye.

[![](/images/Screenshot-2023-04-21-at-1.58.05-PM.png)](https://web.archive.org/web/20201221175145/https://www.reddit.com/user/Tstraussman/comments/kh1pzg/big_thank_you/)

Here we can see the author listed as **minikhans** which we can then view directly via **https://www.reddit.com/user/minikhans**

So far so good.. But we only have part of his name.. or do we?

Based on the information we have so far, I tried _**Minik Hans**_ and yes, that is the name of Thomas' coworker.

</details>

**\[Question?\]**_Where does his coworker live?_

I'm not sure if I should have don't a but more digging on this one. But as he's a co-worked of Thomas' I made an assumption that they both live in the same city.

<details>
<summary>Click here for the answer</summary>

So to find out which city that is, we can jump back over to Thomas' twitter account and we find the answer there

[![](/images/Screenshot-2023-04-21-at-2.22.53-PM.png)](https://twitter.com/TStraussman)

So it looks like Minik Hans lives in the city of _**Nuuk, Greenland**_

</details>

 

**\[Question?\]**_What is the paste ID for the link we found?_ 

I wasn't quite sure what this was about. I looked at ID's in the page code for the various posts with no luck. However I was still focusing my search on a small window which was December 2020.

If we start scrolling through the wayback machine captures for this user account we can see any other changes that may have occurred.

[![](/images/Screenshot-2023-04-21-at-2.31.10-PM.png)](https://web.archive.org/web/20210323231748/https://old.reddit.com/user/minikhans/)

As we do this, we come across something interesting..

<details>
<summary>Click here for the answer</summary>

On the 23rd of May 2021 we see a post which is subsequently removed in the next archive. **Disappointed 2 Electric Boogaloo**

[![](/images/Screenshot-2023-04-21-at-2.36.50-PM.png)](https://web.archive.org/web/20210323231748/https://old.reddit.com/user/minikhans/)

Clicking on this link takes us to the following Ghostbin post.

[![](/images/Screenshot-2023-04-21-at-2.38.57-PM.png)](https://ghostbin.com/paste/ww4ju)

The full URL to the post is https://ghostbin.com/paste/ww4ju which means the Past ID and answer to this question is _**ks{ww4ju}**_

</details>

 

**\[Question?\]** _Password for the next link?_

If you got this far, you'll just need to review the Ghostbin post which contains the link and password.

<details>
<summary>Click here for the answer</summary>

As per the ghostbin post, we see the following at the end of the message.

[![](/images/Screenshot-2023-04-21-at-2.42.01-PM.png)](http://Password%20for%20the%20next%20link?)

So the password for the next link, and answer to this question will be _**ks{1qaz2wsx}**_

</details>

 

**\[Question?\]**_What is the name of Thomas' mistress?_

Only one way to find out.. lets delve further into Thomas' little secret and see where that takes us..

<details>
<summary>Click here for the answer</summary>

Unfortunately Ghostbin is no longer available, but we can access this post through the wayback machine at https://web.archive.org/web/20210407192118/https://ghostbin.com/paste/JENxv/1qaz2wsx

Notice the format of encrypted pastes have this format: ghostbin.com/<pasteId>/<password>

[![](/images/Screenshot-2023-04-21-at-2.51.07-PM.png)](https://web.archive.org/web/20210407192118/https://ghostbin.com/paste/JENxv/1qaz2wsx)

And there we have it. Thomas' mistress is _**Emilia Moller**_

</details>

 

**\[Question?\]**_What is Thomas' Email address?_

This is also an easy one. Both found in the previous two Ghostbin posts

 

<details>
<summary>Click here for the answer</summary>

[![](/images/Screenshot-2023-04-21-at-2.53.05-PM.png)](https://web.archive.org/web/20210407192118/https://ghostbin.com/paste/JENxv/1qaz2wsx)

So the answer to this question will be _**straussmanthom@mail.com**_

</details>

 

 

So there you have it. And what did we learn? We learn't that true love never involves a Nigerian prince. Never. Ever.

Time for a slice of accomplishment. Until next time.

[![pizza party time](/images/pizza_small-1.gif)](http://thefish.nz)
