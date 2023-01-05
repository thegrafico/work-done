var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.status(200).send("Hellow");
});

router.get('/ping', function(req, res, next) {
  res.status(200).send("pong");
});

module.exports = router;
