const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const dbConnect = require("./db/dbConnect");
const authRouter = require("./router/authRouter");
const timeout = require("connect-timeout");
//execute db connection
dbConnect();
app.use(timeout("15s"));

// handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  if (!req.timedout) next();
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);

  process.exit(1);
});
// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/api", router);

module.exports = app;
