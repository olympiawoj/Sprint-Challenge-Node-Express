const express = require("express");

const db = require("./projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Projects router workin");
});

module.exports = router;
