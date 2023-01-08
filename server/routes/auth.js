const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const UserCollection = require("../db/schema/user");
const _ = require("lodash");


router.post("/login", async function (req, res, next) {

  const {username, password} = req.body;

  if (!_.isString(username) || _.isEmpty(username) || !_.isString(password) || _.isEmpty(password)){
    res.status(400).send({error:"Invalid usernamer or password"});
    return;
  }

  const user = await UserCollection.login(username, password);

  if (!user) {
    res.status(401).send({error: "invalid credentials. User not found."});
    return;
  }

  const token = auth.generateAccessToken(user.username);
  console.log("Token for user: ", token);

  res.status(200).send({user, token});
});

router.post("/signin", function (req, res, next) {
  res.status(200).send("Sign in is deactivate for the moment");
  // const nUser = await UserCollection.create({name: "raul", username: "rauleldomi", password: "admin"});
  // console.log("New User was created: ", nUser);
});


module.exports = router;