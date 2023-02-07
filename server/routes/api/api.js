const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ObjectId = require("mongoose").Types.ObjectId;

const _ = require("lodash");

// GET - projects
router.get(
  "/projects",
  auth.authenticateToken,
  async function (req, res, next) {
    const projects = await ProjectCollection.find({ owner: req.user.id });
    res.status(200).send(projects);
  }
);

// GET - projects/:projectId
router.get(
  "/projects/:projectId",
  auth.authenticateToken,
  auth.ensureUserInProject,
  async function (req, res, next) {
    
    const project = await ProjectCollection.findById(req.params.projectId);
    console.log("Projects: ", project);
    res.status(200).send({project});
  }
);

// router.get(
//   "/deleteAll",
//   // auth.authenticateToken,
//   async function (req, res, next) {
//     await ProjectCollection.deleteMany({});
//     res.status(200).send("deleted");
//   }
// );

router.post("/createProject", auth.authenticateToken, async function (req, res, next) {
  const { title, description } = req.body;

  if (!_.isString(title) || _.isEmpty(title)) {
    console.log("Title is empty: ", title);
    res.status(400).send({ message: "project title cannot be empty." });
    return;
  }

  if (!_.isString(description)) {
    description = "";
  }

  const project = { title, description, owner: req.user.id };

  let error = null;
  const newProject = await ProjectCollection.create(project).catch((err) => {
    error = err;
  });

  if (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: error });
    return;
  }

  res.status(200).send({ project: newProject });
}
);

router.post("/updateProject", auth.authenticateToken, async function (req, res, next) {
  const { title, description, projectId } = req.body;

  // check project title
  if (_.isEmpty(title)) {
    res.status(400).send({ message: "Invalid title for project" });
    return;
  }

  // create project schema
  const filter = { _id: projectId, owner: req.user.id }
  const update = { title, description };


  let error = null;
  const updatedProject = await ProjectCollection.findOneAndUpdate(filter, update).catch(err => {
    error = err;
  });

  if (error) {
    console.error("Error updating project: ", error);
    res.status(500).send({ message: "Oops, There was a problem updating the project. Please try later." });
    return;
  }

  res.status(200).send(updatedProject);
});

router.delete("/deleteProject/:projectId", auth.authenticateToken, async function (req, res, next) {
  const projectId = req.params.projectId;

  // check project title
  if (_.isEmpty(projectId) || !_.isString(projectId)) {
    res.status(400).send({ message: "Invalid project Information. Please try later." });
    return;
  }

  // create project schema
  const filter = { _id: projectId, owner: req.user.id }
  console.log("Delete filters: ", filter);
  let error = null;
  const projectWasDeleted = await ProjectCollection.findOneAndDelete(filter).catch(err => {
    error = err;
  });
  console.log("projectWasDeleted: ", projectWasDeleted);

  if (error) {
    console.error("Error removing the project: ", error);
    res.status(500).send({ message: "Oops, There was a problem when removing the project. Please try later." });
    return;
  }

  res.status(200).send(projectWasDeleted);
});

module.exports = router;
