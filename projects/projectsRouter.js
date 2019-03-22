const express = require("express");

const db = require("./projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err =>
      res.status(400).json({ errorMessage: "Error - cannot get projects" })
    );
});

module.exports = router;
