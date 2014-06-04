winston-websocket - view realtime log messages in Browser
=========================================================
[![NPM version](https://img.shields.io/npm/v/winston-websocket.svg)](https://www.npmjs.org/package/winston-websocket) [![Dependency Status](https://david-dm.org/palamccc/winston-websocket.png)](https://david-dm.org/palamccc/winston-websocket) ![MIT License](http://img.shields.io/badge/license-MIT-green.svg)

 - It registers websocket as one of transport for winston logger.
 - Then, the new transport broadcasts log messages to all connected browsers.
 - Browser should listen to websocket and update UI whenever a new log message is received. check index.html in example folder for html example.
 - This module uses [ws websocket library][1]. Its light weight and fast, but it doesn't fallback to old comet tricks in old browsers. So this module is meant for only for modern browsers which support websockets.
 
 
Try the demo
------------
    > npm install winston-websocket
    > cd node_modules/winston-websocket/example
    > npm install
    > node index.js
    [open http://localhost:3000 in browser and views the logs]

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
