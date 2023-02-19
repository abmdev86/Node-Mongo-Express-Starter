const express = require("express");
const auth = require("../auth");

const router = express.Router();

router.use((req, res, next) => {
  const date = new Date(Date.now());
  const time = date.toLocaleTimeString("en-US");

  console.log("Time: ", time);
  next();
});

router.get("/", auth, (req, res) => {
  res.json({
    message: "You are authorized",
  });
});
module.exports = router;
