//bring in express
const express = require("express");

//import db
const db = require("./actionModel.js");

//bring in router express
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello test test again");
});
module.exports = router;
