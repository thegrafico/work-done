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
  console.log(username, password);
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
  const nUser = await UserCollection.create({
    name: "alex",
    username: "rauleldomi",
    password: "admin",
  });

  res.status(200).send("Created dummy user");
});

router.get("/users", async function (req, res, next) {
  const users = await UserCollection.find({});

  res.status(200).send(users);
});

module.exports = router;
