const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const TaskCollection = require("../../db/schema/task");
const {
  TASK_TITLE_MAX_LENGHT,
  TASK_TITLE_MIN_LENGHT,
  TASK_MIN_POINTS,
  TASK_MAX_POINTS
} = require("../../utils/constants");

const _ = require("lodash");

// GET - PROJECTS/TASK
router.get(
  "/projects/:projectId/tasks",
  auth.authenticateToken,
  async function (req, res, next) {

    console.log("Getting request to get project task...");
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

    // check if the user is in the project
    if (!project.userIsAllow(userId)) {
      res
        .status(403)
        .send({ message: "You don't have permission to this project." });
      return;
    }

    // Get project task
    let error = null;
    const tasks = await TaskCollection.find({ projectId: projectId }).catch(err => {
      console.error("Error getting the tasks: ", err);
      error = err;
    });

    if (error) {
      res.status(500).send({ message: "Error getting tasks" });
      return;
    }

    res.status(200).send({ project: project, tasks: tasks });
  }
);

// POST - Create/Task
router.post(
  "/projects/:projectId/task/create",
  auth.authenticateToken,
  async function (req, res, next) {
    const projectId = req.params.projectId;
    const userId = req.user.id;

    console.log("Request:", req.body);

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
      res
        .status(500)
        .send({
          message:
            "Oops, there was a problem creating the task. Please try later.",
        });
      return;
    }

    res.status(200).send(task);
  }
);

// POST = Increment/Task
router.post(
  "/projects/task/:taskId/increment",
  auth.authenticateToken,
  async function (req, res, next) {
    // const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.user.id;

    // getting the task
    const task = await TaskCollection.findById(taskId).catch((err) => {
      console.error("error getting Task: ", err);
    });

    // validating task
    if (!task) {
      res.status(404).send({
        message: "Oops, it seems the task does not exist.",
      });
      return;
    }

    // getting project
    const project = await ProjectCollection.findById(task.projectId).catch(err => {
      console.error("Error getting the project from the task");
    });

    if (!project) {
      console.error("At this point, either the project or the task should not exist");
      res.status(500).send({ message: "Oops, there was a problem finding the project for the task requested" });
      return;
    }

    // check if the user is  NOT allow to be at the project
    if (!project.userIsAllow(userId)) {
      res.status(403).send({ message: "You don't have permissition for this project" });
      return;
    }

    // AT this point we know the user is auth and is also in the project
    // so it can increment or decrement its points withing the task

    // if there is not points recorded yet: add the user. 
    if (_.isEmpty(task.points)) {
      task.points.push({ userId: userId, value: task.value });
    } else {
      const myPoints = task.points.find(userPoints => userPoints.userId.toString() === userId.toString());

      // if the user had never done this task 
      if (!myPoints) {
        console.info("It seems you dont have any points here. Adding user to task");
        task.points.push({ userId: userId, value: task.value });
      } else {

        // reset value if the substraction is less than 0
        if (myPoints.value + task.value > TASK_MAX_POINTS) {
          myPoints.value = TASK_MAX_POINTS;
        } else {
          // substrab points
          myPoints.value += task.value;
        }
      }
    }

    await task.save();

    res.status(200).send(task);
  }
);

// POST = Decrement/Task
router.post(
  "/projects/task/:taskId/decrement",
  auth.authenticateToken,
  async function (req, res, next) {
    // const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const userId = req.user.id;

    // getting the task
    const task = await TaskCollection.findById(taskId).catch((err) => {
      console.error("error getting Task: ", err);
    });

    // validating task
    if (!task) {
      res.status(404).send({
        message: "Oops, it seems the task does not exist.",
      });
      return;
    }

    // getting project
    const project = await ProjectCollection.findById(task.projectId).catch(err => {
      console.error("Error getting the project from the task");
    });

    if (!project) {
      console.error("At this point, either the project or the task should not exist");
      res.status(500).send({ message: "Oops, there was a problem finding the project for the task requested" });
      return;
    }

    // check if the user is  NOT allow to be at the project
    if (!project.userIsAllow(userId)) {
      res.status(403).send({ message: "You don't have permissition for this project" });
      return;
    }

    // AT this point we know the user is auth and is also in the project
    // so it can increment or decrement its points withing the task

    // if there is not points recorded yet: add the user. 
    if (_.isEmpty(task.points)) {
      task.points.push({ userId: userId, value: 0 });
    } else {
      const myPoints = task.points.find(userPoints => userPoints.userId.toString() === userId.toString());

      // if the user had never done this task 
      if (!myPoints) {
        console.info("It seems you dont have any points here. Adding user to task");
        task.points.push({ userId: userId, value: 0 });
      } else {

        // reset value if the substraction is less than 0
        if (myPoints.value - task.value < TASK_MIN_POINTS) {
          myPoints.value = 0;
        } else {
          // substrab points
          myPoints.value -= task.value;
        }
      }
    }

    await task.save();

    res.status(200).send(task);
  }
);

router.delete(
  "/projects/tasks/:taskId",
  auth.authenticateToken,
  async function (req, res, next) {
    // const projectId = req.params.projectId;
    const taskId  = req.params.taskId;
    const userId = req.user.id;

    const filter = { _id: taskId, owner: userId };
    // getting the task
    const task = await TaskCollection.deleteOne(filter).catch((err) => {
      console.error("error getting Task: ", err);
    });

    console.log("REMOVED TASK: ", task)

    res.status(200).send(task);
  }
);

module.exports = router;
