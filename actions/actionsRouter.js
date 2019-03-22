//bring in express
const express = require("express");

//import db
const db = require("./actionModel.js");

//bring in router express
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res.status(500).json({ errorMessage: "Actions could not be retrieved" })
    );
});
module.exports = router;
