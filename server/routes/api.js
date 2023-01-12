const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const ProjectCollection = require("../db/schema/projects");
const ObjectId = require("mongoose").Types.ObjectId;

const _ = require("lodash");

router.get(
  "/projects",
  auth.authenticateToken,
  async function (req, res, next) {
    const projects = await ProjectCollection.find({owner: req.user._id});

    res.status(200).send({ projects: projects });
  }
);

router.post(
  "/deleteAll",
  auth.authenticateToken,
  async function (req, res, next) {
    await ProjectCollection.deleteMany();
    res.status(200).send("deleted");
  }
);

router.post(
  "/createProject",
  auth.authenticateToken,
  async function (req, res, next) {
    const { title, description } = req.body;

    console.log("body: ", req.body);

    if (!_.isString(title) || _.isEmpty(title)) {
      console.log("Title is empty: ", title);
      res.status(400).send({ message: "project title cannot be empty." });
      return;
    }

    if (!_.isString(description)) {
      description = "";
    }

    const project = { title, description, owner: req.user._id };

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

router.post(
  "/updateProject",
  // auth.authenticateToken,
  async function (req, res, next) {
    const wasUpdated = true;
    res.status(200).send(wasUpdated);
  }
);

module.exports = router;
