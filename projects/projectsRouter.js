const express = require("express");

const db = require("./projectModel.js");

const router = express.Router();

//GET all projects
router.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err =>
      res.status(400).json({ errorMessage: "Error - cannot get projects" })
    );
});

//POST and insert a new project
router.post("/", async (req, res) => {
  const projectInfo = req.body;
  if (!projectInfo.name && !projectInfo.description) {
    res.status(404).json({
      errorMessage: "Please provide a name and description for this project"
    });
  } else {
    try {
      const project = await db.insert(req.body);
      res.status(201).json({ project });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the post" });
    }
  }
});

//DELETE a project
router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const count = await db.remove(req.params.id);
    console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The user has been removed" });
    } else {
      res.status(404).json({ errorMessage: "The user could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error removing the post" });
  }
});

//GET actions of a project by using projectID

module.exports = router;
