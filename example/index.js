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
