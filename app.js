const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const router = require('./router');
const dbConnect = require('./db/dbConnect');

//execute db connection
dbConnect();
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
  
    process.exit(1);
  });
// configure body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

server.use('/',router);

module.exports = server;

