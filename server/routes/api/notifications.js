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

  // get the id of all projects from each invitation
  const projectIds = invitations.map((invitation) =>
    invitation.projectId.toString()
  );

  const senderIds = invitations.map((invitation) => invitation.from.toString());

  // get only unique ids to get unique projects
  const uniqueProjectIds = [...new Set(projectIds)];
  const uniqueSenderIds = [...new Set(senderIds)];

  // Get all projects where the user was invited
  const projects = await ProjectCollection.find({
    _id: { $in: uniqueProjectIds },
  }).catch((err) => {
    throw new Error(err.message);
  });

  // get the owner of each project
  if (!projects.length) {
    return [];
  }

  // get user information who send the invitation
  const senderInfo = await UserCollection.find({
    _id: { $in: uniqueSenderIds },
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
    const message = `${sender.username} invited you to join the project: '${project.title}' `;
    const type = notificationTypes.projectInvitation;

    // Combine the notification data with the user and project information
    return {
      _id: invitation._id,
      message,
      type,
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
