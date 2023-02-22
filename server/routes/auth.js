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

// POST - /Signup user
router.post("/api/signin", async function (req, res, next) {
  const { username, password, email } = req.body;

  const newUser = req.body;

  let error = null;
  const user = await UserCollection.create(newUser).catch((err) => {
    error = err;
  });

  if (error) {
    console.log("error: ", error);
    if (error.code === 11000) {
      res.status(500).send({
        message: "User already exist with this information",
        type: "error",
      });
    } else {
      res.status(500).send({ message: error.message, type: "error" });
    }
    return;
  }
  console.log("User created: ", user);
  res.status(200).send({ user: user });
});

router.get("/users", async function (req, res, next) {
  console.log("Getting request to updte user info ");

  const users = await UserCollection.find({}).catch((err) => {
    console.error("Error updating user info: ", err);
  });

  console.log("users: ", users);
  res.status(200).send({ users: users });
});

module.exports = router;
