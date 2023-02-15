const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const UserCollection = require("../../db/schema/user");
const ProjectCollection = require("../../db/schema/projects");
const ProjectInvitationCollection = require("../../db/schema/projectInvitation");

const { alertTypes } = require("../../utils/constants");

async function getProjectInvitations(userId) {
  let error = null;
  // TODO: add to find: { to: userId }
  const invitations = await ProjectInvitationCollection.find().catch(err => {
    error = err;
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  // if there is not invitation
  if (!invitations.length) { return [];}

  // get the id of all projects from each invitation
  const projectIds = invitations.map(invitation => invitation.projectId.toString());

  const uniqueProjectIds = [...new Set(projectIds)];

  const projects = await ProjectCollection.find({_id: {$in: uniqueProjectIds}}).catch(err => {
    error = err;
  });

  if (error) { 
    console.error(error.message);
    throw new Error(error.message);
  }

  return [];
}

// GET - projects
router.get(
  "/notifications",
  auth.authenticateToken,
  async function (req, res, next) {
    console.log("Getting request to get user notifications...");

    const userId = req.user.id;

    let error = null;
    const projectInvitations = await getProjectInvitations(userId);
    if (error) {
      res.status(500).send({ message: error.message, type: alertTypes.error });
      return;
    }


    res.status(200).send({ notifications: []});
  }
);


module.exports = router;
