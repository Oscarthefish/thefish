---
title: "Simple HTTP Server"
date: 2022-04-05
categories: 
  - "skills"
  - "tools"
tags: 
  - "http-server"
  - "skills"
  - "tools"
coverImage: "http-mooshed.png"
---

If you need a quick web server on the fly then Python can help. Python comes with a simple built in HTTP server which turns any directory on your system into your web server directory. The only thing you need to have installed is Python.

Implementing this tiny but useful HTTP server is very simple, its just a single line command which will depend on the version of Python you are running. In version 2.x the module is SimpleHTTPServer, however in Python 3 the module is now called http.serverIf I wanted to share the directory /home/web and my IP address is 192.168.1.2 we would do the followingOpen up a terminal and type:

```
$ cd /home/web
$ python -m SimpleHTTPServer
```

 

or

$ python3 -m http.server

It’s as simple as that. Now your http server will start (if no port is specified the default port 8000 will be used) and you will get the message:

```
Serving HTTP on 0.0.0.0 port 8000 …
```

You can now open a browser and access the published files by going to the following address http://192.168.1.2:<port>

If the directory has an index.html present, that file will be served as the initial file. If there is no index.html, then the files in the directory will be listed.

![pizza party time](/images/pizza_small-1.gif)
