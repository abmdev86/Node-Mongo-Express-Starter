const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const router = require("./router");
const dbConnect = require("./db/dbConnect");
const authRouter = require("./router/authRouter");

//execute db connection
dbConnect();

// handle CORS
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);

  process.exit(1);
});
// configure body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", authRouter);
server.use("/api", router);

module.exports = server;
