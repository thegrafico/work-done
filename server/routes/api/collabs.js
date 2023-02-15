const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ProjectInvitationCollection = require("../../db/schema/projectInvitation");

const _ = require("lodash");

const {
  invitationType,
  alertTypes,
  invitationStatus,
} = require("../../utils/constants");

// POST - PROJECTS/:projectID/USERS
router.get(
  "/projects/:projectId/users",
  auth.authenticateToken,
  auth.ensureUserInProject,
  async function (req, res, next) {
    console.log("Getting request to get project users...");

    // since we're using the auth.ensureUserInProject, req hols the current project
    const projectUserIds = req.project.users || [];

    // find users in invitations first so we can find the user later
    let error = null;
    const usersInInvitations = await ProjectInvitationCollection.find({
      projectId: req.project._id,
    }).catch((err) => {
      error = err;
    });

    if (error) {
      res.status(500).send({
        message: error.message,
        type: alertTypes.error,
      });
      return;
    }

    // map only the user ids from the invitations
    const userIdsFromInvitations = usersInInvitations.map((invitation) => {
      return invitation.to.toString();
    });

    // join both arrays projects users and invitations users
    const usersIds = projectUserIds.concat(userIdsFromInvitations);

    // find all users in project, including invitations
    const users = await UserCollection.find({
      _id: { $in: usersIds },
    }).catch((err) => {
      error = err;
    });

    if (error) {
      res.status(500).send({
        message: error.message,
        type: alertTypes.error,
      });
      return;
    }

    // remove owner user information
    let filteredUsers = users.filter(
      (user) => user._id.toString() != req.user.id.toString()
    );

    filteredUsers = filteredUsers.map((user) => {
      return {
        username: user.username,
        _id: user._id,
        creationDate: user.creationDate,
        status: !userIdsFromInvitations.includes(user._id.toString())
          ? invitationStatus.active
          : invitationStatus.pending,
      };
    });

    // console.log("Users: ", filteredUsers);

    res.status(200).send({ users: filteredUsers });
  }
);

// POST - PROJECTS/INVITE_USER
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
      res.status(400).send({
        message: `Invalid user information cannot be empty`,
        type: alertTypes.error,
      });
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
      res.status(400).send({
        message: "Could not find the user",
        type: alertTypes.error,
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
    const isInvitationForSameUser =
      request.from.toString() === request.to.toString();
    if (isInvitationForSameUser) {
      res.status(400).send({
        message: "You cannot invite yourself to the project dumbass.",
        type: alertTypes.warning,
      });
      return;
    }

    // create invitation
    let error = undefined;
    const invitation = await ProjectInvitationCollection.create(request).catch(
      (err) => {
        error = err;
      }
    );

    if (error) {
      // Duplicate invitation
      if (error.code === 11000) {
        res.status(400).send({
          message: `Invitation already exists`,
          type: alertTypes.info,
        });
      } else {
        res.status(500).send({
          message: `Oops, ${error.message}`,
          type: alertTypes.error,
        });
      }
      return;
    }

    // find the user information
    const userInfo = await UserCollection.findById(request.to).catch(err => {
      error = err;
    });

    // check if there is user information
    if (error || !userInfo) {
      res.status(500).send({
        message: `Oops, ${error.message || 'there was a problem getting the user information.'}`,
        type: alertTypes.error,
      });
      return;
    }

    // success
    res.status(200).send({
      invitation,
      user: { _id: userInfo._id, username: userInfo.username, creationDate: userInfo.creationDate, status: invitationStatus.pending },
      message: "invitatation was sucessfully sent",
      type: alertTypes.success,
    });
  }
);

// POST - PROJECTS/CANCEL_INVITATION
router.post(
  "/projects/:projectId/cancelInvitation",
  auth.authenticateToken,
  auth.ensureUserInProject,
  async function (req, res, next) {
    console.log("Getting request to cancel invitation for a user...");

    const { userId } = req.body;
    const projectId = req.params.projectId;

    // check if user is not empty
    if (!userId || userId.length === 0) {
      console.error("Invalid user information. ");
      res.status(400).send({
        message: "Invalid user information. Cannot be empty",
        type: alertTypes.error,
      });
      return;
    }

    const userInvitationQuery = {
      projectId,
      to: userId
    }

    // create invitation
    let error = undefined;
    const invitation = await ProjectInvitationCollection.findOneAndDelete(userInvitationQuery).catch(
      (err) => {
        error = err;
      }
    );

    // send the error
    if (error) {
      res.status(500).send({
        message: `Oops, ${error.message}`,
        type: alertTypes.error,
      });
    }

    // success
    res.status(200).send({
      invitation,
      message: "Invitation canceled!",
      type: alertTypes.success,
    });
  }
);

module.exports = router;
