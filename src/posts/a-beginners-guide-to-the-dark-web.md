---
title: "A Beginners Guide to the Dark Web"
date: 2022-04-05
categories: 
  - "dark-web"
tags: 
  - "dark-web"
  - "skills"
coverImage: "red-iceberg-mooshed.png"
---

So Some of you might only know this term from the ‘internet iceberg’ image as that black shady part of the iceberg with terms like ‘Tor’ and ‘I2P’.

## Access to ‘the Dark Web’

In this blog we’ll focus on the usage of Tor (The Onion Router, click [here](https://en.wikipedia.org/wiki/Tor_\(network\)) for the Wikipedia page for further explanation).

To gain access to Tor, we suggest using the simple, Firefox-like Tor Browser which can be downloaded for free from [https://www.torproject.org/download/](https://www.torproject.org/download/). There are other ways to gain access to Tor like using [Tails](https://tails.boum.org/) which is an operating system that you can run from a Virtual Machine or from a USB drive. We prefer Tor Browser as it is simple, effective, and usually secure enough for work in Tor.

Below is an image of what the Tor Browser looks like once it has connected to Tor. If you see this page, your Tor Browser is ready for a URL to visit! You can visit URLs from the surface web (like [https://osintcurio.us](https://osintcurio.us/)) or use Hidden Services in Tor. Many of these hidden services are similar to web sites on the surface web except that their host names end in “.onion”. A good example of this is the the DuckDuckGo search engine’s Tor hidden service at [https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion](https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion/).

<figure>

![](/images/torbrowser.png)

<figcaption>

The Tor browser

</figcaption>

</figure>

Do keep in mind that using the Tor Browser might won’t give you a fast connection, since Tor has to route your traffic through a number of nodes, which might not all have the fastest connection.

## How Do I Know Which URL to Visit?

Well, the Tor Browser isn’t so different from your regular internet browser. You can still visit the normal pages you can visit with your regular browser. For example; you can still visit our own [OSINTCurious blog](https://osintcurio.us/), even though this URL doesn’t end with ‘.onion’.

<figure>

![](/images/Screenshot-2021-11-03-at-14.29.55.png)

<figcaption>

Visiting the OSINTcurio.us website using a Tor browser.

</figcaption>

</figure>

But how can you find the URL’s that end on .onion which you can’t visit using your regular browser? You can’t just always search for them because the dark web is not really well indexed by search engines. Well, there are a couple of places you consider to start:

## Finding the Onions

**Wiki’s** The [Hidden Wiki](https://thehiddenwiki.org/) is a collection of .onion-URLs categorised by topic. You can visit the website of the Hidden Wiki using your regular browser or using your Tor Browser. Only the links displayed in the Wiki can be visited using a Tor Browser. The wiki is updated quite often so you’ll be able to find most of the resources there.

[Dark.fail](http://dark.fail/) is a website where you can find similar content you can find on the Hidden Wiki but they also indicate if a website is currently on- or offline. [Deeponionweb.com](https://www.deeponionweb.com/) also gives you this information.

**Reddit** Not everyone is familiar with the post popular forum on the internet; [Reddit](https://reddit.com/). On Reddit there are lots of people talking about a various range of topics. dark web was a huge subreddit until [Reddit decided to ban it from their site](https://www.vice.com/en/article/ne9v5k/reddit-bans-subreddits-dark-web-drug-markets-and-guns) back in 2018. Currently you can find some similar threads from users on the [deepweb subreddit](https://www.reddit.com/r/deepweb/). Members of this community are sharing their best practices, warnings and more. There is an open environment to ask questions to others. So if you need a little more help, you can start here. Other great subreddits are: [onions](https://reddit.com/r/onions), [DarkWebDread](https://reddit.com/r/DarkWebDread) and [Darknet](https://www.reddit.com/r/darknet/).

There is also a Reddit-like forum on Tor called Dread: [http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion](http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion/)

**Hunchly Daily Darkweb Report** You might have heard about [Hunchly](http://hunch.ly/) before; it’s a great tool to help you keep track of your OSINT investigations. But they have another product to offer which is the [Daily Darkweb Report](https://www.hunch.ly/darkweb-osint/). When you’ve signed up to the mailing list, using your email address, you’ll receive a daily update on which .onion links are new only since that day and which .onion links are still up. The first time you open the document, you might see just only one or two links. This list is far more extensive than the Hidden Wiki, but not categorised like the Wiki and they have an archived collection going from 2017 onwards!

<figure>

![](/images/Screenshot-2021-11-03-at-14.47.14.png)

<figcaption>

Example of a Daily Darkweb Report. Make sure to use the tabs to navigate!

</figcaption>

</figure>

## Search Engines for Tor/Onions

If you’re comfortable using the Tor Browser, you can try to search for some search engines that to try to index Tor sites. There are a couple of search engines to choose from. We’ve listed a couple of URLs that are only accessible via a Tor Browser. Keep in mind that Tor sites can sometimes go offline without any particular reason. It may be that some of the below named onion-sites are no longer operating. If this happens, make sure to use a surface web search engine like Google to find out what happened.

**Torch**: [http://torch4st4l57l2u2vr5wqwvwyueucvnrao4xajqr2klmcmicrv7ccaad.onion](http://torch4st4l57l2u2vr5wqwvwyueucvnrao4xajqr2klmcmicrv7ccaad.onion/) **Recon**: [http://recon222tttn4ob7ujdhbn3s4gjre7netvzybuvbq2bcqwltkiqinhad.onion](http://recon222tttn4ob7ujdhbn3s4gjre7netvzybuvbq2bcqwltkiqinhad.onion/) **Haystak**: [http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion](http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion/) **Tor66**: [http://tor66sewebgixwhcqfnp5inzp5x5uohhdy3kvtnyfxc2e5mxiuh34iid.onion](http://tor66sewebgixwhcqfnp5inzp5x5uohhdy3kvtnyfxc2e5mxiuh34iid.onion/) **Phobos**: [http://phobosxilamwcg75xt22id7aywkzol6q6rfl2flipcqoc4e4ahima5id.onion](http://phobosxilamwcg75xt22id7aywkzol6q6rfl2flipcqoc4e4ahima5id.onion/) **Kilos**: [http://mlyusr6htlxsyc7t2f4z53wdxh3win7q3qpxcrbam6jf3dmua7tnzuyd.onion](http://mlyusr6htlxsyc7t2f4z53wdxh3win7q3qpxcrbam6jf3dmua7tnzuyd.onion/)

There are several clear web search engines to search for onion-links, two of them are: [OnionLand Search](https://onionlandsearchengine.com/) and [Ahmia.fi](https://ahmia.fi/). You can search for anything you like. But keep in mind that the results are .onion-links and can only be viewed by using the Tor browser.

## Dark Web News

If you want to stay up to date on what is happening on the dark web, there are several websites that keep track of the news. Which market is busted or which forum is popular? If might be helpful to check either one of these websites:

- [Darknetlive](https://darknetlive.com/)
- [Darknet stats](https://www.darknetstats.com/)
- [DNStats](https://dnstats.net/)
- [The Daily Swig](https://portswigger.net/daily-swig/dark-web)
- [DarknetOne](https://darknetone.com/)
- [DarknetMarkets](https://www.darknetmarkets.com/)
