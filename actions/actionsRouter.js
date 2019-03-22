//bring in express
const express = require("express");

//import db
const db = require("./actionModel.js");

//bring in router express
const router = express.Router();

//GET ALL ACTIONS
router.get("/", (req, res) => {
  db.get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res.status(500).json({ errorMessage: "Actions could not be retrieved" })
    );
});
module.exports = router;

//POST
// router.post("/", (req, res) => {
//   console.log(req.body);
//   const actionInfo = req.body;

//   if (actionInfo.name && actionInfo.description) {
//     db.insert(actionInfo)
//       .then(res => console.log(res))
//       .catch();
//   } else {
//     res
//       .status(404)
//       .json({ errorMessage: "Please provide name and description for action" });
//   }
// });
