const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ProjectInvitationCollection = require("../../db/schema/projectInvitation");

const { alertTypes, notificationTypes } = require("../../utils/constants");

/**
 * Get all invitations for the user
 * @param {String} userId - id of the user
 * @returns
 */
async function getProjectInvitations(userId) {
  // TODO: add to find:
  const invitations = await ProjectInvitationCollection.find({
    to: userId,
  }).catch((err) => {
    throw new Error(err.message);
  });

  // if there is not invitation
  if (!invitations.length) {
    return [];
  }

  // get only unique ids to get unique projects
  const projectIds = [
    ...new Set(
      invitations.map((invitation) => invitation.projectId.toString())
    ),
  ];

  // Get all projects where the user was invited
  const projects = await ProjectCollection.find({
    _id: { $in: projectIds },
  }).catch((err) => {
    throw new Error(err.message);
  });

  if (!projects.length) {
    return [];
  }

  // get only unique ids of senders users
  const senderIds = [
    ...new Set(invitations.map((invitation) => invitation.from.toString())),
  ];

  // get user information who send the invitation
  const senderInfo = await UserCollection.find({
    _id: { $in: senderIds },
  }).catch((err) => {
    throw new Error(err.message);
  });

  // Creating user and project maps
  const userMap = new Map(
    senderInfo.map((user) => [user._id.toString(), user])
  );
  const projectMap = new Map(
    projects.map((project) => [project._id.toString(), project])
  );

  const projectInvitations = invitations.map((invitation) => {
    // Get the relevant user and project information from the maps
    const sender = userMap.get(invitation.from.toString());
    const project = projectMap.get(invitation.projectId.toString());

    // set notification message
    const message = `${sender.username} invited you to join the project: '${project.title}' `;

    // set notification type since there will be more types of notifications for the user
    const type = notificationTypes.projectInvitation;

    // Combine the notification data with the user and project information
    return {
      _id: invitation._id,
      message,
      type,
      createdAt: invitation.createdAt,
      status: invitation.status,
    };
  });

  return projectInvitations || [];
}

// GET - Notifications
router.get(
  "/notifications",
  auth.authenticateToken,
  async function (req, res, next) {
    console.log("Getting request to get user notifications...");

    let error = null;
    const projectInvitations = await getProjectInvitations(req.user.id).catch(
      (err) => {
        error = err;
      }
    );

    if (error) {
      res.status(500).send({ message: error.message, type: alertTypes.error });
      return;
    }

    // TODO: add message notifications

    res.status(200).send({ notifications: projectInvitations });
  }
);

/**
 * Delete a user notification
 * @param {String} userId
 * @param {String} notificationId
 */
async function deleteNotification(userId, notificationId, notificationType) {
  let wasDeleted = false;
  switch (notificationType) {
    // Delete project Invitations
    case notificationTypes.projectInvitation:
      wasDeleted = await deleteProjectInvitation(userId, notificationId);
      break;
    default:
      console.log("Invalid notification type");
      break;
  }

  return wasDeleted;
}

async function deleteProjectInvitation(userId, notificationId) {
  // check if the user has a notification with that id
  const invitationWasDeleted =
    await ProjectInvitationCollection.findOneAndDelete({
      to: userId,
      _id: notificationId,
    }).catch((err) => {
      throw new Error(err.message);
    });

  if (!invitationWasDeleted || !invitationWasDeleted._id) {
    return false;
  }

  return true;
}

// POST - Notification/Delete
router.post(
  "/notifications/delete",
  auth.authenticateToken,
  async function (req, res, next) {
    console.log("Getting request to delete notification...");
    const userId = req.user.id;
    const { id, type } = req.body;

    let error = null;
    const wasDeleted = await deleteNotification(userId, id, type).catch(
      (err) => {
        error = err;
      }
    );

    if (error) {
      res.status(500).send({ message: error.message, type: alertTypes.error });
      return;
    }

    res.status(200).send({
      message: "Notification deleted",
      deleted: wasDeleted,
      notificationId: id,
    });
  }
);

/**
 * Accept a user notification
 * @param {String} userId
 * @param {String} notificationId
 */
async function acceptNotification(userId, notificationId, notificationType) {
  let wasAccepted = false;
  switch (notificationType) {
    // Delete project Invitations
    case notificationTypes.projectInvitation:
      wasAccepted = await acceptProjectInvitation(userId, notificationId);
      break;
    default:
      console.log("Invalid notification type");
      break;
  }

  return wasAccepted;
}

async function acceptProjectInvitation(userId, notificationId) {
  // find the invitation
  const invitation = await ProjectInvitationCollection.findOne({
    _id: notificationId,
    to: userId,
  }).catch((err) => {
    throw new Error(err.message);
  });

  if (!invitation || !invitation._id) {
    return false;
  }
  // get the project information
  const project = await ProjectCollection.findById({
    _id: invitation.projectId,
  }).catch((err) => {
    throw new Error(err.message);
  });

  if (!project || !project._id) {
    return false;
  }

  // add the invited user to the project users list
  project.users.push(userId);
  await project.save().catch((err) => {
    throw new Error(err.message);
  });

  // delete the invitation since the user is added to the project
  invitation.delete().catch((err) => {
    console.error(err);
    throw new Error(
      "User was added to the project but invitation was not deleted"
    );
  });

  return true;
}

// POST - Notification/Accept
router.post(
  "/notifications/accept",
  auth.authenticateToken,
  async function (req, res, next) {
    console.log("Getting request to accept notification...");
    const userId = req.user.id;
    const { id, type } = req.body;

    let error = null;
    const wasAccepted = await acceptNotification(userId, id, type).catch(
      (err) => {
        error = err;
      }
    );

    if (error) {
      res.status(500).send({ message: error.message, type: alertTypes.error });
      return;
    }

    res.status(200).send({
      message: "Notification accepted",
      accepted: wasAccepted,
      notificationId: id,
    });
  }
);

module.exports = router;
