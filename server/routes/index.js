var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: check if user is login
  res.status(200).send("Home");
});

router.get('/ping', function(req, res, next) {
  res.status(200).send("pong");
});

module.exports = router;
