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

//Update a project
router.put("/:id", async (req, res) => {
  console.log(req.body);
  const projectInfo = req.body;
  if (projectInfo.name && projectInfo.description) {
    try {
      const project = await db.update(req.params.id, projectInfo);
      console.log(project);
      if (project) {
        res.status(200).json({ project });
      } else {
        res
          .status(204)
          .json({ errorMessage: "The project could not be found" });
      }
    } catch (error) {
      res.status(500).json({ errorMessage: "Error updating this project" });
    }
  } else {
    res
      .status(404)
      .json({ errorMessage: "Please provide name or description for user" });
  }
});

//GET actions of a project by using projectID
router.get("/:id/actions", async (req, res) => {
  console.log(req.params);
  try {
    const projActions = await db.getProjectActions(req.params.id);

    console.log(projActions);
    if (projActions.length) {
      res.status(200).json(projActions);
    } else {
      res
        .status(404)
        .json({ message: "The specified project does not have any actions" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Error getting actions of this project" });
  }
});

module.exports = router;
