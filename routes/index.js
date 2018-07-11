var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/dbconnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userID = req.session.userID;
  var userNickname = req.session.nickname;
  res.render('index', { title: 'webchat',id: userNickname });
});

module.exports = router;
