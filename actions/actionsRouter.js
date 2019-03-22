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

//POST new action
router.post("/", async (req, res) => {
  console.log(req.body);
  const actionInfo = req.body;

  if (actionInfo.project_id && actionInfo.description && actionInfo.notes) {
    try {
      const action = await db.insert(actionInfo);
      res.status(201).json({ action });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ errorMessage: "Error while trying to post new action" });
    }
  } else {
    res.status(404).json({
      errorMessage: "Please provide project id, description, & notes for action"
    });
  }
});

//Delete action

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Action was removed" });
    } else {
      res.status(404).json({ errorMessage: "The actoun could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error removing the action" });
  }
});
