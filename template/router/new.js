var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new', { title: 'new'});
  // console.log(req.user.userId);
});


module.exports = router;
