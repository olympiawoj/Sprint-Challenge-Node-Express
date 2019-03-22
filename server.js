//bring in express
const express = require("express");

const actionsRouter = require("./actions/actionsRouter.js");
// const projectsRouter = require("./projects/projectsRouter.js");

//create instance of server
const server = express();

//bring in JSON middleware
server.use(express.json());

server.use("/api/actions", actionsRouter);
// server.use("./api/projects", projectsRouter);

//root server test
server.get("/", (req, res) => {
  res.send("testing 123");
});

module.exports = server;
