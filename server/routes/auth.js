const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const _ = require("lodash");

const waitHanlder = function (req, res, next) {

}

router.post("/login", waitHanlder, async function (req, res, next) {
  const { username, password } = req.body;

  setTimeout(async () => {


    if (!_.isString(username) || _.isEmpty(username) || !_.isString(password) || _.isEmpty(password)) {
      res.status(400).send({ message: "Invalid usernamer or password" });
      return;
    }
    console.log(username, password);
    let error = null;
    const user = await UserCollection.findUserByCredentials(username, password).catch(err => {
      console.error("Error getting user: ", err);
      error = err;
    });

    if (error) {
      res.status(500).send({ message: "Oops, there was an error getting the user. Please try again" });
      return;
    }

    if (!user) {
      res.status(403).send({ message: "invalid credentials. User not found." });
      return;
    }
    res.status(200).send(user);
  }, 6000)

});

// TODO: Finish this
router.get("/signin", async function (req, res, next) {

  const nUser = await UserCollection.create({ name: "raul", username: "rauleldomi", password: "admin" });
  console.log("User created: ", nUser);

  res.status(200).send("Created dummy user");
});

router.get("/users", async function (req, res, next) {

  const users = await UserCollection.find({});

  res.status(200).send(users);
});


module.exports = router;