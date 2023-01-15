const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const TaskCollection = require("../../db/schema/task");

const _ = require("lodash");

// GET - PROJECTS/TASK
router.get(
  "/projects/:projectId/tasks",
  auth.authenticateToken,
  async function (req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.user.id;

    if (!_.isString(projectId) || _.isEmpty(projectId)) {
      res.status(400).send({ message: "Invalid project id." });
      return;
    }

    // Find a this project where 'Im' part of.
    const project = await ProjectCollection.findById(projectId);

    if (!project) {
      res.status(404).send({
        message: "Oops, it seems the page you were looking for does not exist.",
      });
      return;
    }

    if (!project.userIsAllow(userId)) {
      res
        .status(403)
        .send({ message: "You don't have permission to this project." });
      return;
    }

    // Get project task
    const tasks = await TaskCollection.find({ projectId: projectId });

    res.status(200).send({ project: project, tasks: tasks });
  }
);

router.post(
  "/projects/:projectId/task/create",
  auth.authenticateToken,
  async function (req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.user.id;
    const maxLengthTitle = 25;

    // Find a this project where 'Im' part of.
    const project = await ProjectCollection.findById(projectId).catch((err) => {
      console.error("error getting project: ", err);
    });

    if (!project) {
      res.status(404).send({
        message: "Oops, it seems the page you were looking for does not exist.",
      });
      return;
    }

    // Validate request data for task
    const { title, description, value, icon } = req.body;

    // TODO: check user privileged instead of the user being on the project
    if (!project.userIsAllow(userId)) {
      res
        .status(403)
        .send({ message: "You don't have permission to this project." });
      return;
    }

    const taskObject = {
      projectId: projectId,
      owner: userId,
      title: title,
      description: description,
      value: value,
      icon: icon,
    };

    let error = null;
    const task = await TaskCollection.create(taskObject).catch((err) => {
        console.error("Error creating the task: ", err);
        error = err;
    });

    // if error during task creation
    if (error) { 
        res.status(500).send({message: "Oops, there was a problem creating the task. Please try later."});
        return;
    }

    res.status(200).send(task);
  }
);

module.exports = router;
