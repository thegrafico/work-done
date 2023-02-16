const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const _ = require("lodash");

router.post("/api/login", async function (req, res, next) {
  const { username, password } = req.body;

  if (
    !_.isString(username) ||
    _.isEmpty(username) ||
    !_.isString(password) ||
    _.isEmpty(password)
  ) {
    res.status(400).send({ message: "Invalid usernamer or password" });
    return;
  }
  let error = null;
  const user = await UserCollection.findUserByCredentials(
    username,
    password
  ).catch((err) => {
    console.error("Error getting user: ", err);
    error = err;
  });

  if (error) {
    res.status(500).send({
      message: "Oops, there was an error getting the user. Please try again",
    });
    return;
  }

  if (!user) {
    res.status(403).send({ message: "invalid credentials. User not found." });
    return;
  }
  res.status(200).send(user);
});

// TODO: Finish this
router.get("/signin", async function (req, res, next) {
  const dummyUsers = [
    {
      name: "Raul",
      username: "rauleldomi",
      password: "admin",
    },
    {
      name: "alex10",
      username: "rauleldomi2",
      password: "admin",
    },
    {
      name: "alexander",
      username: "rauleldomi3",
      password: "admin",
    },
    {
      name: "alexander",
      username: "rauleldomi4",
      password: "admin",
    },
    {
      name: "alexander",
      username: "rauleldomi5",
      password: "admin",
    },
    {
      name: "alexander",
      username: "rauleldomi6",
      password: "admin",
    },
    {
      name: "Pam",
      username: "rauleldomi7",
      password: "admin",
    },
    {
      name: "Man",
      username: "rauleldomi8",
      password: "admin",
    },
    {
      name: "alexander2",
      username: "rauleldomi9",
      password: "admin",
    },
  ];

  for (const user of dummyUsers) {
    await UserCollection.create(user).catch((err) => {
      console.error("Error creating user: ", err.message);
    });
  }

  res.status(200).send("Created dummy user");
});

router.get("/users", async function (req, res, next) {
  const users = await UserCollection.find({});

  res.status(200).send(users);
});

module.exports = router;
