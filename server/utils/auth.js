const dotenv = require("dotenv");
const ProjectCollection = require("../db/schema/projects");

dotenv.config();

const jwt = require("jsonwebtoken");

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log("Authentication");

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Error verifying user" });
    // console.log("User found token:", user);
    req.user = user;
    // console.log("Authenticated");
    next();
  });
}

async function ensureUserInProject(req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.user.id;

  // Find a this project where 'Im' part of.
  const project = await ProjectCollection.findById(projectId).catch((err) => {
    console.error("error getting project: ", err);
  });

  if (!project) {
    res
      .status(404)
      .send({
        message: "Oops, it seems the page you were looking for does not exist.",
      });
    return;
  }

  // TODO: check user privileged instead of the user being on the project
  if (!project.userIsAllow(userId)) {
    res
      .status(403)
      .send({ message: "You don't have permission to this project." });
    return;
  }
  req.project = project;
  next();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  ensureUserInProject,
};
