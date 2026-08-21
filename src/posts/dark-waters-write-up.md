---
title: "Kase Scenarios - Dark Waters"
date: 2023-04-16
categories: 
  - "ctf"
  - "kase"
  - "osint"
  - "skills"
tags: 
  - "ctf"
  - "dark-waters"
  - "osint"
  - "skills"
coverImage: "MOSHED-2023-4-17-0-1-28.png"
---

So if you haven't heard of it already, this is my write up for the **Kase Scenarios** OSINT challenge called **Dark Waters**.

To give you a bit of background information, this is the offical intro..

_**Welcome to Dark Waters, a scenario that allows you to take on the role of Investigative Journalist Alec Wolfe as he uncovers deadly secrets about a small town in Pennsylvania.**_

_Through Alec, you will experience first-hand what it's like to collect, analyze, and verify a breaking news piece for a newspaper. This scenario is designed to challenge and encourage you throughout the story to implement Open Source Intelligence and digital investigation techniques including:_

1. _Social media analysis_
2. _Visually extracting key data points from an image or video_
3. _Applying tools, methods, and resources to answer contextual questions to uncover the truth._

_When you have completed this scenario you should be comfortable applying tools and methodologies frequently used in digital investigations including journalism. You learn to pivot from key data points and collect information used to answer investigative questions._

_**Hints:**_

_If you're stuck on a question you will have the option to receive a hint. Remember there's a lot to learn from being stuck on challenges. Before taking a hint, be sure you have explored all options, resources, and tools at your disposal. Take a hint when you're absolutely sure you have tried everything in your toolset._

 

**So lets get started.**

But before I do I'd also like to say, I have omitted parts of the storyline and visual creativity as this is what makes this challenge so much fun. Where possible I don't want to spoil the drama Kase Scenarios have worked so hard to create and I want to try and focus only on whats important for my learning journey. If you like what you see, definitely sign up to experience it in person at [**https://courses.kasescenarios.com/courses/dark-waters**](https://courses.kasescenarios.com/courses/dark-waters)

 

**With that said, lets really get started.**

The scene is set with Alec and his boss George after the following letter is received.. it seems there might be something dark happening in Glen Rock.

![](/images/C9qAN7vAAvI08sjllxUt7K19Ul+LprKfkWqir4jctbKZt8b39DPT44hmgj+mQ0FnydcpqwaxYVkPlxf8HE0ABWSNO6jcAAAAASUVORK5CYII=)

![](/images/AqFWuO3Eu4SNAAAAAElFTkSuQmCC)

Cut to a video showing our arrival in the small town of Glen Rock in Pennsylvania. Once there we meet Lisa who works at the bar and arrange accomodation during our stay and we also notice a girl outside, a local biology student protesting about the quality of the local drinking water.

Form this interaction we can add some items of interest to our list

- Cars following the protester are all registered to the GRPC
- Her family have been in Glen Rock for a long time
- Her mothers great-grandfather bought land in Glen Rock back in 1837
- Her great-grandfather refused to give up his land to the GRPC plant

### **GRPC: The Company That Cares About Nature**

We're presented with a short promotional video about the GRPC and at the end of the video is a link to their website [https://www.kaseportal.com/grpc](https://www.kaseportal.com/grpc). I took some to to read though the website and what it contained. At this point i didn't make specific notes, but just a mental note of the content should I need to refer to it later.

### **Getting To Know The Town**

At this point we are presented with our first section of questions to investigate and solve. Let the game begin!

 

**\[Question\]** _What is the name of the protestors relative that was the first to own land on what is now Glen Rock?_

For this question we just have to do some simple research. A quick google for Glen Rock, Pennsylvania and our old friend Wikipedia is top of the list with a link to [https://en.wikipedia.org/wiki/Glen\_Rock,\_Pennsylvania](https://en.wikipedia.org/wiki/Glen_Rock,_Pennsylvania) and it doesn't take long to identify exactly what we're looking for.

<details>
<summary>Click here for the answer</summary>

Glen Rock was founded on August 29, 1859. It started in 1837 with **William Heathcote** — a native of Cheshire, England, who moved to Pennsylvania in 1826.

</details>

Brilliant! That was nice and easy.. on to the next question.

 

**\[Question\]** _What is the name of the main Railroad through town?_

Again, staying with our Wikipedia page for Glen Rock, we can see a section about the Heritage Rail Trail County Park and from here we can identify the railway line.

<details>
<summary>Click here for the answer</summary>

This trail runs along the active **_Northern Central Railway_** line and forms the southernmost part of Route J in the BicyclePA route system.

</details>

 

**\[Question\]** _On the side of the local library, what does the third part of the mural say?_

I got stuck on this for a while as I was looking at the wrong library.. oh boy. After a quick readjustment and a slap across the face we're back on track. A map search for Glen Rock, PA as a starting point gave me the following location [https://www.google.com/maps/place/Glen+Rock](https://www.google.com/maps/place/Glen+Rock,+PA+17327,+USA/@39.7937132,-76.7390777,15z/data=!3m1!4b1!4m6!3m5!1s0x89c863fe6c0f6479:0x9047786055018076!8m2!3d39.7931577!4d-76.7302495!16zL20vMF9qMGI)

![](/images/z91RjeYUcw14gAAAABJRU5ErkJggg==)

An additional search for libraries  in this location pointed me to the _Arthur Hufnagel Public Library_ of Glen Rock

![](/images/BWrKe7Hy+9BkAAAAAElFTkSuQmCC)

Looking through the photos directly in google maps I came across this mural painting on the side. This was also confirmed from a google street view

![](/images/xzmwurBZxmwAAAAAElFTkSuQmCC)

![](/images/wHHUPzPKHO2RgAAAABJRU5ErkJggg==)

Zooming in on the third panel as per the question. We can see what looks like a historic building and the words "FIRST NATIONAL BA"

![](/images/A2dcVhqqD2UXAAAAAElFTkSuQmCC)

A quick image search on google for FIRST NATIONAL BANK in Glen Rock presents us with the following building, which looks **very** similar to our mural painting.

![](/images/fuZU0HhirxoSM5v8ygN8bDvHhbr+L9+oyH7jIlyzAAAAAElFTkSuQmCC)

Arghh.. **_FIRST NATIONAL BANK_** gave me the dreaded "Sorry, wrong answer. Would you like a hint? If not, click no to try again". So what do you think the answer should be?

<details>
<summary>Click here for the answer</summary>

This brings up a good observation that thankfully I had read about in an early review by sector035 over at https://sector035.nl/articles/review-darkwaters. Due to the technical limitations of the testing platform, answers are **case sensitive**. So while "FIRST NATIONAL BANK" is clearly displayed on the building, the correct and exact answer is **_First National Bank_**

</details>

There you have it. Another question ticked off.

 

**\[Question\]** _Which female artist donated her pastel work "under the rainbow" to the library?_

Again I fired up the number one OSINT tool (google) and literally just searched for **"under the rainbow" "Arthur Hufnagel" Library**

The one and only result I got back was from issuu which is a digital publishing platform and is often useful for looking up digital copies of newspapers and magazines. In this case we have a copy of the Southern York County Community Courier from October 23, 2019.

<details>
<summary>Click here for the answer</summary>

_On page 6 you can see an article in which a Glen Rock artist donated her painting "Under the Rainbow" to the Arthur Hufnagel Library. Another win! The female artist is none other than_ **_Maryanne Smith_**

![](/images/weznvuRmAjsBHYCGwENgIbgRMisDctJwRzs9oIbAQ2AhuBjcAxjDE7AAAAsUlEQVRG4PYQ2JuW28N2c94IbAQ2AhuBjcBG4IQI7E3LCcHcrDYCG4GNwEZgI7ARuD0E9qbl9rDdnDcCG4GNwEZgI7AROCECe9NyQjA3q43ARmAjsBHYCGwEbg+BvWm5PWw3543ARmAjsBHYCGwETojA3rScEMzNaiOwEdgIbAQ2AhuB20Ngb1puD9vNeSOwEdgIbAQ2AhuBEyKwNy0nBHOz2ghsBDYCG4GNwEbg9hD4L1NtLlV1II48AAAAAElFTkSuQmCC)

The answer can also be found by tweaking the google search and you could have also obtained the answer from [https://townlively.com/library-will-display-artwork/](https://townlively.com/library-will-display-artwork/)

</details>

**\[Question\]** _What is the street name of Maryanne’s studio?_

So starting with Google again, I searched for the artists full name and  **Glen Rock Artist** and thought her LinkedIn profile might be helpful. Unfortunately that contained very little information, so I jumped back into google and I found some results from auction sites selling Maryannes paintings. From here you should be able to identify her studio address.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415142627.png)

As we can see from above and also reading the item details in the auction, her studio is called Maryanne Smith Studio, at 98 Ronald Street, which makes the answer _**Ronald Street**_

</details>

 

**\[Question\]** _Where was this taken in town?_

![](/images/Pasted-image-20230415142935.png)

If we run this through a reverse image search, I used Google in this case, we get a variety of generic results around graffiti, but at the bottom of my results I can see a perfect match for the location.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415143127.png)

So it looks like we have identified the location, but we can also take a look at the facebook page https://www.facebook.com/RuinsHall/ to be sure. And there we have it, on the 13th of November 2022 we have a match on the image to show it is indeed from _**Ruins Hall**_

</details>

 

**\[Question\]** _The protester was attending an event there on June 8th 2018 what was it?_

Staying on the facebook page for Ruins Hall, we can try to filter down the posts to a particular time.

![](/images/Pasted-image-20230415143516.png) ![](/images/Pasted-image-20230415143541.png)

This is where I got a little lost. I can see this venue hosting an event that weekend, but it's actually on June the 9th. However, after a bit of digging, I did see a reference to the same event in a post on the 18th of May announcing their first 2018 community movie night for Friday, June 8th. Maybe the date changed.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415144539.png)

So based on our previous research and looking at the event details which will be shown in my next answer, I gave _**Outdoor Movie Night**_ a try and it was correct!

</details>

 

**\[Question\]** _Which movie was shown at the event?_

Hopefully this is an easy one based on our previous research and observations.

<details>
<summary>Click here for the answer</summary>

The answer is _**Back to the Future**_. Even though the dates don't quite match up...

![](/images/Pasted-image-20230415144342.png)

</details>

 

**\[Question\]** _What was the high temp on that day in Celsius(Only one decimal point is needed)?_

There are a number of websites that can provide historical weather information for us. A google search for **historical weather "glen Rock" PA** returns a long list to chose from.

While i've used other sites before, for this question I'll just use [**Weather Underground**](https://www.wunderground.com/history/daily/us/pa/glen-rock/KMDT/date/2018-6-8)

You can change the dates as required and to change from Fahrenheit to Celsius click the settings icon in the top right corner. Now further down the page you'll see a summary section where you can see the high temp in Celsius.

<details>
<summary>Click here for the answer</summary>

So for this question, the answer is _**28**_ degrees celsius

![](/images/Pasted-image-20230415145621.png)

</details>

And we've done it! Well, this section that is. Don't worry, there's still lots more to come.

### **Cocktail Party**

Download the flyer for the cocktail party, maybe grab a drink for yourself as we have a long road ahead of us.

![](/images/Pasted-image-20230415145959.png)

It's only natural that Alec will want to check out the party. He wouldn't be a good investigator if he didn't!

While there he makes some observations that are worth keeping in mind. There seems to be a relationship between GlenRocks CEO and a local politician Alexander Ross and possibly the owner of the local paper.

While waiting to enter the party Alec overhears the bouncers chatting. Nothing major, but there is mention of the CEO's son being familiar with setting up crypto accounts. Maybe something for the memory bank to use later. Unfortunately at this point Alec is stoped at the door and refused entry.

Alec did get a photo of GlenRocks CEO, Alexander Ross and the owner of the local paper which we can download. But not sure what we do with it as yet.

 

![](/images/Screenshot-2023-04-16-at-11.29.03-PM.png)

Okay.. now we get back into the questions.. I hope you're hydrated and ready to go.

 

### **The Employees**

**\[Question\]** _Who created this flyer?_

There's nothing specifically noted on the flyer itself, but a good place to check is always in the metadata. Always check the metadata!

There are many tools you can use to do this. Either a locally installed tool which is my preferred method, or one of the many online tools available for free. In this case I'm working off a machine with no tools installed, so i'm relying on online services to get this done. Painful, but you've got to use what you have.

<details>
<summary>Click here for the answer</summary>

Uploading the image to [**https://www.metadata2go.com/**](https://www.metadata2go.com/) we see a long list of extracted fields. The one we are interested in is **creator: _Patti Stanton_**

![](/images/Pasted-image-20230415151958.png)

</details>

 

\[Question\] What is Patti's favorite thing to do?

Hmm so where do we go with this? Well, remember back at the start we reviewed the GRC website at [**https://www.kaseportal.com/grpc**](https://www.kaseportal.com/grpc). It wont be the last time we cast our eyes over it's content, but for now we're interested in their **Employees of the Month** section which gives us a little bit of info about three GRPC employees. Have a read and see what you can find.

<details>
<summary>Click here for the answer</summary>

And as you can see, a lot like the rest of us during Covid, Patti loves _**staycations**_

![](/images/Pasted-image-20230415153826.png)

</details>

 

**\[Question\]** _What is Patti's home SSID?_

Now we're getting tricky. If you're not familiar, SSID stands for **S**ervice **S**et **ID**entifier and is your network’s name. If you open the list of Wi-Fi networks on your laptop or phone, you’ll see a list of SSIDs. Wireless router or access points broadcast SSIDs so nearby devices can find and display any available networks.

So how do we find Patti's? Well the first place to start looking is with [**https://wigle.net/**](https://wigle.net/) which consolidates location and information of wireless networks world-wide to a central database which can then be searched online.

We know that Patti most likely lives in Glen Rock and she loves staycations, so lets see what we can find. You'll need an account, but the service is free so once you have that, log in and search for **Glen Rock, PA, USA** to get you in the right location on the map. You should see something like this.

![](/images/Pasted-image-20230415154737.png)

On the left you can search for SSID's and you can use % or \_ as a wild cards. Try searching for words, or parts of words that might be of importance or interest to Patti.

![](/images/Pasted-image-20230415154939.png)

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415155023.png)

So _**Staycation Wifi**_ is the SSID we're after. Obviously in the real world we'd need to do a lot more cross-referencing of data to ensure this SSID does in fact belong to Patti. But for this game we can roll with it.In saying that, you'd be surprised how many people near me use identifying features in their home Wifi SSID. Please don't be that person. Keep it generic. Blend in.

</details>

 

**\[Question\]** _What is the BSSID?_

Okay.. what even is a BSSID? Well, BSSID stands for **Basic Service Set Identifier**, and it's the MAC physical address of the access point or wireless router that is used to connect to the WiFi.

If you got the last question right, you can definitely get this one.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415155023.png)

So looking back at what we found on WiGLE, the BSSID and answer to this question is the hexadecimal number _**3C:7A:8A:93:D2:5E**_

</details>

 

**\[Question\]** _What year was this BSSID first seen?_

While the dates are shown in these results, using the Advanced Search feature makes it a bit clearer with a **First Seen** field showing the date we're looking for.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415160551.png)

So the answer to this question, the year this BSSID was first seen is, _**2021**_

</details>

 

**\[Question\]** _What is the vendor of this device?_

This can easily be obtained from the BSSID. If we put the BSSID into something like [https://macaddress.io/](https://macaddress.io/) we can see who the vendor is. But how does it know? The first 3 octets of the MAC address are the **OUI**. An OUI is a unique identifier that identifies an organization.  The IEEE assigns these unique identifiers to companies that need to include them in a product with networking capability.  The IEEE makes this information available to the public, and it is possible to determine what organisations own which OUI.  This is interesting because this is included in a MAC address.

Sorry.. I drifted off for a bit. must have been.. ummm. lack of coffee? Time for a fresh pot and on we go.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415160929.png)

So, to get back on track, the vendor of this device, based on the OUI of the MAC address is _**Arris Group, Inc**_

</details>

 

**\[Question\]** _What is the parent company of Arris Group Inc?_

So while initial research for the parent company of Arris Group may point to Commscope, we'll need to do further research into the company structure. Why? Well, I put that in and the computer said "No!"

![](/images/Pasted-image-20230415161417.png)

What we do know is that the company is US based, so a good place to get detailed documents is somewhere like **OpenCorporates**.

If we search for Arris Group, Inc and remove all the inactive results, you should come across the following listing - [**https://opencorporates.com/companies/us\_de/5260599**](https://opencorporates.com/companies/us_de/5260599)

<details>
<summary>Click here for the answer</summary>

Scrolling down, you will see a section dedicated to **Parent Companies** which shows _**Arris International Limited**_ as the parent company and as luck will have it, the correct answer to this question.

![](/images/Pasted-image-20230415163102.png)

</details>

### **Ross Campaign Funding**

No time to dilly-dally, we're straight into it..

 

**\[Question\]** _How much money has GRPC donated to Alexander Ross?_

So going back to the GRPC website (I told you we would), there's a section related to Company News. It's in this section you can download a copy of the [2022 Annual Report for Shareholders](https://www.kaseportal.com/s/2022_GRPC-ANNUAL_REPORT.pdf)

It's exciting reading so I did spend quite a bit of time picking through these reports, first looking for obvious transactions listed as 'donations' and then I tried looking for items that may be hiding the donations. Up and down I went. Multiple times.

Don't be me.

Go back to the website and read the information listed near the annual report link. This is where you will find your answer.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415163919.png)

And there it is right there in black and white. The amount donated to Alexander Ross is _**$1,214,000**_

</details>

 

**\[Question\]** _What is the GRPC campaign phone number for Alexander Ross?_

This one is an easy one if you reviewed the website. Make sure you read everything.. all the way to the end.

<details>
<summary>Click here for the answer</summary>

At the very very bottom of the site, the very last line says **Text MONEY to (931) 532-0554 to donate to the Alexander Ross Campaign.**

![](/images/Screenshot-2023-04-16-at-11.34.43-PM.png)

This ones not a cunning weasel. The answer we all want is _**(931) 532-0554**_

</details>

 

**\[Question\]** _How much did Glen Rock Paper Company spend on PR services in 2022?_

Right, this time we do actually want to refer to the annual report. And I can safely say I know it inside and out.. because.. research. You will see a line that documents **Public Relations Fees** which I think we can assume relates to PR services. Here you will find how much was spent in 2022.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415164338.png)

In this case we see a figure of 11,576 and in the top left it states **"In thousands"** so I could assume the dollar amount would be $11,576,000.

The correct answer is literally just _**11,576**_ as it appears on the report. Like I said, you sometimes just have to try a couple of variations of the answer just to get it to slot into place.

</details>

 

### Lab Test Cancelled

Nothing to answer in here.. just a bit of context for future questions. The images speak for themselves.

![](/images/Pasted-image-20230415165507.png)

![](/images/Pasted-image-20230415165529.png)

### Rock the Socks

**\[Question\]** _What is the full name of the owner of this email address?_

Right, we know the email address is **rockthesocks1982@fastmail.com** so what can we do with this?

Often people reuse the same alias across multiple services so we can start by searching for accounts using the same name using something like [**https://blackbird-osint.herokuapp.com/**](https://blackbird-osint.herokuapp.com/) which at the time of writing checks against 574 platforms. There are other great options, but this is one I wanted to try out recently.

We get two matches off the bat which we'll focus on for this challenge. One on facebook and the other on Reddit.

![](/images/Pasted-image-20230415170033.png)

Facebook gives me nothing easily accessible.

![](/images/Pasted-image-20230415170120.png)

However Reddit on the other hand points to [**https://www.reddit.com/user/rockthesocks1982**](https://www.reddit.com/user/rockthesocks1982) which looks interesting. We can see a number of posts and interactions from this user which we can read to gain further information about the user, profiling and so on.

One thing that stands out, is a post from rockthesocks1982 inviting others over to their Steam account to play games.

![](/images/Pasted-image-20230415170335.png)

Pivoting to this Steam profile **https://steamcommunity.com/profiles/76561199478297066/** we not only see their Steam alias, but also a list of others they have previously used. Super helpful.

![](/images/Pasted-image-20230415170427.png)

Now I wont lie. I did a bunch of google-fu trying to pull useful information relating to all of these listed aliases with little to no luck. So after a much needed needed break and two Red Bulls I started to focus on the Steam ID **76561199478297066**.

It was purely by accident I made the following discovery. I found this API that pulled additional information using the SteamID.. I do know in hindsight now that I could have gone to  [https://findsteamid.com/en/home](https://findsteamid.com/en/home) and plugged the SteamID directly in there. It's much prettier on the eyes and screenshots would have looked better in the writeup.. but it's not how my life played out. So instead you're going to see my accidental, boring API results.. which to be fair made me VERY happy at the time.

[**https://api.findsteamid.com/steam/api/summary/76561199478297066**](https://api.findsteamid.com/steam/api/summary/76561199478297066)

So using the unexciting api link we can see the following account information.

 

_\[{"id":3404171,"steamid":"76561199478297066","communityvisibilitystate":3,"profilestate":true,"personaname":"sloppyfpsgamer1982","lastlogoff":null,"profileurl":"https://steamcommunity.com/profiles/76561199478297066/","profilestring":"76561199478297066","avatarfull":"https://avatars.akamai.steamstatic.com/eacdad43d2cfcf1ec09eb4997e1e8c21a332290c\_full.jpg","personastate":0,**"realname":"John B"**,"timecreated":1676146430,"gameid":null,"gameserverip":null,"createdAt":"2023-02-25T06:02:33.000Z","updatedAt":"2023-04-09T12:05:05.000Z"}\]_

 

The highlight for me here is **"realname":"John B**"

Okay, that helps.. but there's a lot of Johns in this world. So what do we know and where can we go from here. We know John is located in Pennsylvania, most likely Glen Rock. So lets start searching.

We have a couple of options from here. I did try Linked in as it has quite good filters for people, locations and so on but with no initial luck I moved to our other social favourite, Facebook.

See how you get on over there.

<details>
<summary>Click here for the answer</summary>

Searching for people, I searched for **"John B"** and set the location to **"Glen Rock"** and low and behold. The very top result is for a **John Banks** who happens to be a **Senior Safety & Security Consultant at Glen Rock Paper Company**! That feels like a very hot lead when you put it in context.

![](/images/Pasted-image-20230415171608.png)

So who do we think is the owner of the rockthesocks1982@fastmail.com email address, the correct answer is **_John Banks_.**

</details>

 

**\[Question\]** _What year was he born?_

Given a number of his usernames contain **82** or **1982** I think that's a safe bet. Public announcement: please please please don't use your birth year, or ANY personal information in usernames. Thank you.

<details>
<summary>Click here for the answer</summary>

To collaborate our deductions, facebook to the rescue. _**1982**_ is indeed the year John Banks was born.

![](/images/Pasted-image-20230415173909.png)

</details>

 

**\[Question\]** _Which city is John from?_

This one should be a walk in the park, and a great example why not to overshare on social media.

<details>
<summary>Click here for the answer</summary>

According to Facebook, he's originally from _**Las Vegas**_

![](/images/Pasted-image-20230415172142.png)

</details>

 

### What is the Cache

![](/images/Pasted-image-20230415172317.png)

 

**\[Question\]** _What is the name of the cache?_

Lets see what we've got to work with and take a look at **r/glenrockresistance** on Reddit [**https://www.reddit.com/r/glenrockresistance/**](https://www.reddit.com/r/glenrockresistance/)

The linked image looks like some sort of encrypted message.

![](/images/Pasted-image-20230415172543.png)

If you're as old as me, these were all we had before emojis were even a twinkle in their fathers eye. These my friends are webdings born in the dark ages of 1997. So our best bet is to try and decode these using a reference sheet like the one below (Google is your friend).

![](/images/Pasted-image-20230415172839.png)

Or if you're lazy you can use a snazzy online tool such as [**https://www.dcode.fr/webdings-font**](https://www.dcode.fr/webdings-font). To be honest i'm slow at everything so prefer to do it by hand.

<details>
<summary>Click here for an early answer to a later question</summary>

So it seems our mysterious encoded message translates to **Incoming cache drop.Sloppyfpsgamer**

</details>

So we now have a couple of pieces of information. We know there's some sort of cache drop being placed, and it's most likely for **Sloppyfpsgamer**, which name we have come across earlier as an alias used by John Banks (refer back to the Steam accounts). So lets do some digging.

We know this is a cache of some sorts and if we search Google for **geocaching sites** we get a number of results. The top one being [**https://www.geocaching.com**](https://www.geocaching.com) which I assume is one of the bigger players. Note to criminals: Don't post details of criminal activity on public sites. Or do.

I definitely feel there's a better way to do this, so i'll be keeping an eye on other write ups. I created an account and logged in and then searched for caches in Glen Rock, PA. I'm too lazy to trawl through all the results even though there's only 217.

I managed to find an option to find friends at [**https://www.geocaching.com/find/default.aspx**](https://www.geocaching.com/find/default.aspx) which could be helpful. Given the information we already have, I searched for **Sloppyfpsgamer** and got the following:

[**https://www.geocaching.com/play/results/**](https://www.geocaching.com/play/results/?ct=2&sa=1&hb=Sloppyfpsgamer&asc=false&sort=placeDate)

Take a close look at the geocaching users activity and you'll find what you need to know.

<details>
<summary>Click here for the answer</summary>

This user owns one geocache in Pennsylvania - **https://www.geocaching.com/geocache/GCA4XH5** and the name of that cache and answer to this question is _**GRPC Recon.** As Bruce Willis once said.. yippee ki-yay.._

![](/images/Pasted-image-20230415184938.png)

</details>

 

**\[Question\]** _What are the coordinates of the cache?_

As shown in the cache screenshot above, I hope the co-ordinates are **N 39° 48.185' W 076° 53.772'**

But I was wrong. They're not. Don't copy this answer.

<details>
<summary>Click here for the answer</summary>

While technically it is correct, we have to do a bit of playing to get it right. I had to use the same co-ordinates, but without the ' symbols. And the working co-ordinates are actually _**N 39° 48.185 W 076° 53.772**_

The reason I had the slight difference in syntax, is I had clicked the edit button and copied the co-ordinates from the "Original" setting, which you can see below.

![](/images/Screenshot-2023-04-18-at-1.41.27-PM-1024x554.png)

</details>

 

**\[Question\]** _What did the encrypted text say that was posted on the conspiracy forum?_

This goes back to the initial encrypted Webding message posted on Reddit, which I did the ground work earlier. I like to be prepared for the future.

<details>
<summary>Click here for the answer</summary>

That decoded message and answer is  _**Incoming cache drop.Sloppyfpsgamer**_

</details>

 

### Finding the Cache

So it looks like we found the sneaky little cache. Well done detective! But what now?

![](/images/Pasted-image-20230415180253.png)

 

### Interesting Communication Technique

**\[Question\]** _What does the text translate to?_

**Arkg sylbire: Ynxr Zneohet** uses a Caesar cipher and to be honest I usually just try to wing it if i'm not 100% sure or familiar. I'd be lying if I said I knew exactly what type without testing it.

My go to site for ciphers is one of the following online tools: **\- [https://www.dcode.fr/caesar-cipher](https://www.dcode.fr/caesar-cipher)** **\- [https://gchq.github.io/CyberChef](https://gchq.github.io/CyberChef/#recipe=ROT13\(true,true,false,13\)&input=QXJrZyBzeWxiaXJlOiBZbnhyIFpuZW9oZX)**

For the decode.fr site, just add the cipher text we want to decode and smash that **bruteforce** button.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415180931.png)

It's also worth mentioning that there was a very big clue on how to decode this when we were looking at the GRPC Recon geocache entry at **https://www.geocaching.com/geocache/GCA4XH5**

On that page you would have seen the following Decryption key.

![](/images/Screenshot-2023-04-18-at-1.38.03-PM-1024x427.png)

So using either of these methods we know that the decrypted text is _**Next flyover: Lake Marburg**_ which was encoded using rot13.

</details>

 

**\[Question\]** _What does N1822H reference?_

N1822H is an aircraft registration and you can search and view full registration details at [**https://flightaware.com**](https://flightaware.com/) . Once you've seen a few of these you have a pretty good idea straight away that it's an aircraft registration.

![](/images/Pasted-image-20230415190836.png)

<details>
<summary>Click here for the answer</summary>

So what does it reference.. well, put simply it's an _**Aircraft**_

</details>

 

**\[Question\]** _What type of aircraft is N1822H?_

Using the FlightAware site again, you can find more details about an aircraft under summary.

![](/images/Pasted-image-20230415191737.png)

<details>
<summary>Click here for the answer</summary>

Lets see what we need to put in for this question.. You need to do a bit of jiggery pokery, but I finally got there with tweaking the answer to _**Piper PA-28-181**_

</details>

 

### Getting some Flight Data

At this point in the investigation, Alec has requested some flight data relating to N1822H from the 8th of January 2023 to which we are supplied with a .kml file.

What's a .kml file you say? It's Keyhole Markup Language "KML" which is an XML notation for expressing geographic annotation and visualisation within two-dimensional maps and three-dimensional Earth browsers. KML was developed for use with Google Earth.

So what will I do? Open it in Google Earth Pro (Free) of course and I can now see a visualisation of the requested flight path (below)

![](/images/Pasted-image-20230415192326.png)

 

### **Come Fly With Me**

**\[Question\]** _Which airport did this aircraft fly out of on January 8th 2023?_

Reviewing the flight data, either as a text file or with the geographic visualisation above, you'll be able to determine the airport in question. I know you can do it.

<details>
<summary>Click here for the answer</summary>

We can see _**KFDK - Frederick Municipal Airport**_ as the flight origin on that day, or more specifically for this question _**KFDK Airport**_

![](/images/Pasted-image-20230415192736.png)

</details>

 

**\[Question\]** _Which lake did the plane fly over on January the 8th?_

Reviewing the visualisation in Google Earth Pro, we can see a large body of water under the flight path as outlined in green.. You can enable this in the Google Earth Pro layers by ticking the **Water Body Outlines.**

![](/images/earth-settings.png)

![](/images/Pasted-image-20230415230037-1.png)

A google search of Cordorus State Park states it is a 3,500-acre Pennsylvania state park in Heidelberg, Manheim, Penn, and West Manheim Townships in southwestern York County, Pennsylvania in the United States. The park was created around the lake in question, an artificial lake covering 1,275 acres, and is named for Codorus Creek, which forms the lake.

<details>
<summary>Click here for the answer</summary>

So it looks like the plane flew over _**Lake Marburg**_ which would also correlate with the earlier encrypted geocache which said **"Next flyover: Lake Marburg"**

</details>

 

### Unknown Phone Number

**\[Question\]** _Who is the owner of the phone number?_

So at this point in the storyline we receive a threatening call from the following number.

![](/images/Pasted-image-20230415230632.png)

So who does this number belong to? Lets find out.

A number search on google returns very little other than it being a voip number serviced by google. Aren't they all these days. So I wanted to cast my net and revisit LinkedIn and Facebook again to see if I could identify any other contacts or associates to GRPC and possibly a connection to this number.

I reviewed what I have so far which was the employee from GRPC, John Banks. Unfortunately he didn't have any listed friends so I reviewed his posts to see if there were any connections, likes from other users, comments etc.. then I found an interesting post.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230415231931.png)

So it looks like this number belongs to the GRPC Admin Assistant.. and who is that? Back to the GRPC website and we can see _**Aleigha Brooks**_ with this title that matches the comment from John Banks.

![](/images/Pasted-image-20230415232033.png)

The owner of this number is the GRPC Admin Assistant, who is none other than _**Aleigha Brooks**_

</details>

 

### Image Exploration

So we've now been provided with the following image as part of the story and told it could be of importance. Lets see what we can find.

![](/images/Pasted-image-20230415232342.png)

![](/images/Pasted-image-20230415232334.webp)

 

**\[Question\]** _0x?_

Well.. this is cryptic. A zero and an x.. To the familiar, this looks like a prefix for a hexadecimal number. Lets look at the image to see if we can make some connections because at the moment I feel like a goldfish out of water. Gulp!

Looking at the back of the photo, it definitely looks like we have some sort of username/alias and a logo or stamp of some sorts.

Googling for Hoagie215, I started with "Hoagie" for some context as it's a new word to me. Not sure if it's important but a Hoagie is a large, long sandwich, or a submarine sandwich. Now i'm getting hungry!

Google gave me very little, but a search of that username on Blackbird matched a number of sites. I'll need to check each one so don't get excited just yet!

![](/images/Pasted-image-20230415233122.png)

Still no luck.. or i'm missing something. For now I'l pivot to the logo and see if we can make some connections. Sometimes it's best to take a step back, or sideways to clear the mind. The number of times i've spent hours over-analysing something when the answer was under my nose the whole time. I think that's par for the course in OSINT.

I uploaded the full image from the back of the photo, and then reduced the selection to just isolate the ship logo. Nothing interesting came back initially, so I cropped the image manually and uploaded to google image search.

Using many many additional search terms with the image, along the lines of "ocean", "boat", "sailor" and so on got me nothing until I eventually got lucky with "open sea".

![](/images/Pasted-image-20230416003546.png)

![](/images/Pasted-image-20230416003700.png)

Connecting to the [https://opensea.io](https://opensea.io) website I searched for **Hoagie215** and discovered an account with the same name and 3 NFT images.

The answer you are looking for can be found within Hoagie215's profile.

<details>
<summary>Click here for the answer</summary>

Reviewing Hoagie215's profile **https://opensea.io/Hoagie215**, we can see they have an Ethereum wallet which is _**0x446eEB480516B7824C4D938740A5a410CA0cdB34**_ and that also happens to be the answer to this question**.**

</details>

 

**\[Question\]** _Image 1_

Not much context here, vague and cryptic. What we can see is **Hoagie215** has three NFT images listed under his account so lets take a look at image 1 to see what we can find out.

Image 1 is named **Cool Robot 1.**  Maybe it is.. and maybe it isn't. NFT's are not my Jam so I wont argue the naming choice.. Young people today.

![](/images/Pasted-image-20230416004210.png)

I uploaded this image to the photo forensics site [**https://29a.ch/photo-forensics**](https://29a.ch/photo-forensics) and after adjusting the Error level analysis a bit (I played around with everything - don't be confused. I have no idea what i'm doing here) I found what we're all looking for. You should do the same.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230416010514.png)

Also playing with the luminance gradient I see the following.

![](/images/Pasted-image-20230416010605.png)

Zooming in closer the answer is _**15.03.2023**_

</details>

 

**\[Question\]** _Image 2_

Moving on to image number 2 which is also known as **Cool Robot 2** I'll take a similar approach and upload to [**https://29a.ch/photo-forensics**](https://29a.ch/photo-forensics) to review the image.

This one came out quite clear from the start. I didn't event need to tweak much, but I adjusted the settings below to make me feel better and improve my self-worth.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230416102652.png)

And there you have it, the sneaky text is _**LU YANG SHUN**_

![](/images/Pasted-image-20230416102638.png)

</details>

 

**\[Question\]** _Image 3_

On to the third and final image. Yet another cool robot, but i'm sure R2D2 would disagree. This time I adjusted the Error Level Analysis as below.

<details>
<summary>Click here for the answer</summary>

![](/images/Pasted-image-20230416103146.png)

And this is What I get.

![](/images/Pasted-image-20230416103207.png)

So it looks like we have our answer, and we have some co-ordinates. **39.264969. -76.598633**

Arghhh.. Well that didn't work.. yet I was so sure. A quick google on the format of co-ordinates reminded me that it should be a comma after the 9 and not a period. So the actual answer is.. _**39.264969, -76.598633**_

Based on the data extracted from the self proclaimed "cool" robots, all of the information points to the ocean vessel **LU YANG SHUN** being in the port of **Baltimore** on the **15.03.2023**.

</details>

 

**\[Question\]** _Final Pivot Chart_

So I have to admit.. I spent a lot of time on this last question, as i'm sure some of you would have too. I did all sorts of OSINT on the ship and the port. Looking for clues in all the wrong places. Looking at google street view for clues. And you should 100% do this too. Don't leave any stone unturned. Don't let me be the only one.

You did read my write up didn't you? When I said I often found myself  "over-analysing something when the answer was under my nose". Well this is one of those times.

I went back through the previous questions and answers and reminded myself to look at all the information presented. Never assume anything. And once I completed all the answers again. I let out a deep sigh, smiled and clicked **Continue.** Where did I find the password to unlock the pivot chart? You'll have to find this one on your own..

![](/images/Pasted-image-20230416112344.png)

![](/images/Pasted-image-20230416112419.png)

 

I hope you can learn something from this write up, as I will also learn from others. I also look forward to reading how others solved particular challenges. Learning from our mistakes and our successes.

I really enjoyed this challenge and I cant wait for the next.

PS - Thanks for the badge!

![](/images/Pasted-image-20230416112556.png)

 

 

 

Well.. you know what that means. Time for a slice of accomplishment. Until next time.

![pizza party time](/images/pizza_small-1.gif)
