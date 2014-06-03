winston-websocket - view realtime log messages in Browser
=========================================================
[![NPM version](https://img.shields.io/npm/v/winston-websocket.svg)](https://www.npmjs.org/package/winston-websocket) [![Dependency Status](https://david-dm.org/palamccc/winston-websocket.png)](https://david-dm.org/palamccc/winston-websocket) ![MIT License](http://img.shields.io/badge/license-MIT-green.svg)

 - It registers websocket as one of transport for winston logger.
 - Then, all log messages are sent to browser using websocket, and in browser messages can be displayed as live scrolling page.
 - It uses light weight [ws websocket library][1]. Its light weight and fast, but it doesn't fallback to old comet tricks in old browsers.
 
Try the demo
------------
    npm install winston-websocket
    cd node_modules/winston-websocket/example
    npm install
    node index.js

Basic usage
-----------

    var http = require("http");
    var express = require("express");
    var logger = require("winston");
    var winstonWS = require("winston-websocket");
    
    //configure express
    var app = express()
      .use(express.static("."));
    
    //create http server
    var server = http.createServer(app);
    
    //register websocet transport
    logger.add( winstonWS.WSTransport, { wsoptions: { server: server, path: '/logs' } });
    
    //start server
    server.listen(3000);
    console.log("Server is listening on port 3000");
    
    //random logger for testing
    setInterval(function(){
        logger.info("New Random Number is " + parseInt(Math.random()*1000000));
      }, 500);

Note for ExpressJS Users
------------------------
If you are already having app.listen call, you have to break it into two statements.
**Before:**

    app.listen(3000)

**After:**

    var server = require("http").createServer(app);
    //logger.add( .. .. <add winston-websocket to logger and listen with server >
    server.listen(3000);
    

  [1]: https://github.com/einaros/ws
