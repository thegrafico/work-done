const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");


router.get("/login", function (req, res, next) {
  res.status(200).send("login");
});

router.get("/signin", function (req, res, next) {
  res.status(200).send("Sign in is deactivate for the moment");
});


module.exports = router;