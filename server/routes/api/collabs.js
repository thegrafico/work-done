const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ProjectInvitationCollection = require("../../db/schema/projectInvitation");

const _ = require("lodash");

const { invitationType } = require("../../utils/constants");

// POST - PROJECTS/:projectID/USERS
router.get(
  "/projects/:projectId/users",
  auth.authenticateToken,
  auth.ensureUserInProject,
  async function (req, res, next) {
    console.log("Getting request to get project users...");

    // since we're using the auth.ensureUserInProject, req hols the current project
    const projectUsers = req.project.users || [];

    let error = null;
    const users = await UserCollection.find({
      _id: { $in: projectUsers },
    }).catch((err) => {
      error = err;
    });

    if (error) {
      res.status(500).send({
        message: "Oops, it seems there was a problem getting the users",
        type: "error",
      });
      return;
    }

    console.log("users:", users);

    res.status(200).send({ users: [] });
  }
);

// POST - PROJECTS/TASK
router.post(
  "/projects/:projectId/sendInvitation",
  auth.authenticateToken,
  auth.ensureUserInProject,
  async function (req, res, next) {
    console.log("Getting request to send invitation to user...");

    const { username, email } = req.body;

    // check if user is not empty
    if (
      (!username || username.length === 0) &&
      (!email || email.length === 0)
    ) {
      console.error("Invalid user information. ");
      res
        .status(400)
        .send({ message: `Invalid user information cannot be empty` });
      return;
    }

    // TODO: add logic for look by email
    const targetUser = await UserCollection.findUserByUsername(username).catch(
      (err) => {
        console.error("Error getting the user: ", err);
      }
    );

    // check if valid user
    if (!targetUser || !targetUser._id) {
      console.error("Invalid user: ", targetUser);
      res.status(500).send({
        message:
          "Oops, there was a problem creating the invitation for the user.",
      });
      return;
    }

    // find target user id
    const toUserId = targetUser._id;

    // Object invitation
    const request = {
      from: req.user.id, // current logged user
      to: toUserId,
      projectId: req.params.projectId,
    };

    //  in case a dumbass try to add himself to the project
    if (request.from === req.user.id) {
      res.status(400).send({
        message: "You cannot invite yourself to the project dumbass.",
      });
      return;
    }

    // create invitation
    let error = undefined;
    const invitation = await ProjectInvitationCollection.create(request).catch(
      (err) => {
        console.error("Error creating invitation: ", err);
        error = err;
      }
    );

    if (error) {
      res.status(500).send({
        message:
          "Oops, there was a problem creating the invitation for the user.",
      });
      return;
    }

    res.status(200).send({ invitation });
  }
);

module.exports = router;
