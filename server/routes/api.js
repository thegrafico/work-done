const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const _ = require("lodash");

router.get(
  "/projects",
  // auth.authenticateToken,
  async function (req, res, next) {
    const projects = [
      {
        _id: "somerandomId1",
        title: "Project One",
        ownerId: "rauleldomi",
        description: "House",
        creationDate: new Date(),
      },
      {
        _id: "somerandomId2",
        title: "Project Two",
        ownerId: "rauleldomi",
        description: "Apartment",
        creationDate: new Date(),
      },
      {
        _id: "somerandomId2",
        title: "Project Two",
        ownerId: "rauleldomi",
        description: "Apartment",
        creationDate: new Date(),
      },
    ];
    res.status(200).send({projects: projects});
  }
);

module.exports = router;