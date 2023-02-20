const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const _ = require("lodash");

const getUserByUsernameAndPassword = async (username, password) => {
  if (
    !_.isString(username) ||
    _.isEmpty(username) ||
    !_.isString(password) ||
    _.isEmpty(password)
  ) {
    throw new Error("Invalid username or password");
  }

  const user = await UserCollection.findUserByCredentials(
    username,
    password
  ).catch((err) => {
    throw new Error(err.message);
  });

  return user;
};

router.post("/api/login", async function (req, res, next) {
  const { username, password } = req.body;
  let error = null;

  const user = await getUserByUsernameAndPassword(username, password).catch(
    (err) => {
      error = err;
    }
  );

  if (error) {
    res.status(500).send({
      message: error.message,
      type: "error",
    });
    return;
  }

  if (!user) {
    res.status(403).send({
      message: "Cannot find the user information.",
      type: "error",
    });
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

module.exports = router;
