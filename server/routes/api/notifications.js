const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ProjectInvitationCollection = require("../../db/schema/projectInvitation");

const { alertTypes, notificationTypes } = require("../../utils/constants");

async function getProjectInvitations(userId) {
  // TODO: add to find: { to: userId }
  const invitations = await ProjectInvitationCollection.find().catch((err) => {
    throw new Error(err.message);
  });

  // if there is not invitation
  if (!invitations.length) {
    return [];
  }

  // get only unique ids to get unique projects
  const projectIds = [...new Set(invitations.map((invitation) =>
    invitation.projectId.toString()
  ))];
  
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
  const senderIds = [...new Set(invitations.map((invitation) => invitation.from.toString()))];

  // get user information who send the invitation
  const senderInfo = await UserCollection.find({
    _id: { $in: senderIds },
  }).catch((err) => {
    throw new Error(err.message);
  });

  // Creating user and project maps
  const userMap = new Map(senderInfo.map((user) => [user._id.toString(), user]));
  const projectMap = new Map(projects.map((project) => [project._id.toString(), project]));

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

// GET - projects
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

module.exports = router;
