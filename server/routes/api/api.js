const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const { alertTypes } = require("../../utils/constants");
const _ = require("lodash");

// GET - projects
router.get(
  "/projects",
  auth.authenticateToken,
  async function (req, res, next) {
    const userId = req.user.id;
    // get my projects
    const projects = await ProjectCollection.find({
      $or: [{ owner: userId }, { users: { $in: [userId] } }],
    });
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
    res.status(200).send({ project });
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

router.post(
  "/createProject",
  auth.authenticateToken,
  async function (req, res, next) {
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
      res.status(400).send({ message: error, type: alertTypes.error });
      return;
    }

    res.status(200).send({ project: newProject });
  }
);

router.post(
  "/updateProject",
  auth.authenticateToken,
  async function (req, res, next) {
    const { title, description, projectId } = req.body;

    // check project title
    if (_.isEmpty(title)) {
      res.status(400).send({ message: "Invalid title for project" });
      return;
    }

    // create project schema
    const filter = { _id: projectId, owner: req.user.id };

    // create update for the project
    let update = { title };
    if (description != undefined) {
      update.description = description;
    }

    let error = null;
    const updatedProject = await ProjectCollection.findOneAndUpdate(
      filter,
      update
    ).catch((err) => {
      error = err;
    });

    if (error) {
      console.error("Error updating project: ", error);
      res.status(500).send({
        message:
          "Oops, There was a problem updating the project. Please try later.",
        type: alertTypes.error,
      });
      return;
    }

    res.status(200).send(updatedProject);
  }
);

router.delete(
  "/deleteProject/:projectId",
  auth.authenticateToken,
  async function (req, res, next) {
    const projectId = req.params.projectId;

    // check project title
    if (_.isEmpty(projectId) || !_.isString(projectId)) {
      res
        .status(400)
        .send({ message: "Invalid project Information. Please try later." });
      return;
    }

    // create project schema
    const filter = { _id: projectId, owner: req.user.id };
    console.log("Delete filters: ", filter);
    let error = null;
    const projectWasDeleted = await ProjectCollection.findOneAndDelete(
      filter
    ).catch((err) => {
      error = err;
    });
    console.log("projectWasDeleted: ", projectWasDeleted);

    if (error) {
      console.error("Error removing the project: ", error);
      res.status(500).send({
        message:
          "Oops, There was a problem when removing the project. Please try later.",
      });
      return;
    }

    res.status(200).send(projectWasDeleted);
  }
);

/**
 * Update user info
 * @param {{oldPassword: String, newPassword: String, allowProjectInvitations: Boolean}} update - expected values
 */
async function updateUserInfo(userId, update) {
  console.log("Update user info: ", update);
  // get user
  const user = await UserCollection.findById(userId).catch((err) => {
    throw err;
  });

  if (!user || !user._id) {
    throw new Error("User not found");
  }
  // check if the old password is correct

  // if the old password and new password are different than undefined and also are not the same
  if (update.oldPassword != undefined && update.newPassword != undefined) {
    // if password are the same
    if (update.newPassword == update.oldPassword) {
      throw new Error("Old password cannot be same as new password");
    }

    // check if the old password match the user
    const isOldPasswordCorrect = await user.authenticate(update.oldPassword);
    if (!isOldPasswordCorrect) {
      throw new Error("Old password is incorrect");
    }

    // update password for new password
    user.password = update.newPassword;
  }

  // check if user changed project invitations status
  if (update.allowProjectInvitations != undefined) {
    user.allowProjectInvitations = update.allowProjectInvitations;
  }

  // save the user
  await user.save().catch((err) => {
    throw err;
  });

  // problem is the local store from js is not updating the user

  // return user
  return user;
}

/**
 * POST - USER/UPDATE
 */
router.post(
  "/user/update",
  auth.authenticateToken,
  async function (req, res, next) {
    console.log("Getting request to updte user info ");

    // variables to update
    // const { oldPassword, newPassword, allowProjectInvitations } = req.body;

    let error = null;
    const user = await updateUserInfo(req.user.id, req.body).catch((err) => {
      console.error("Error updating user info: ", err);
      error = err;
    });

    // check on error
    if (error) {
      res.status(400).send({ message: error.message, type: alertTypes.error });
      return;
    }

    res
      .status(200)
      .send({
        user: user,
        message: "Information Updated!",
        type: alertTypes.success,
      });
  }
);

module.exports = router;
