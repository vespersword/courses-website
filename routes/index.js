const express = require('express');
const router = express.Router();
//commit test
/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("Session on index");
  //console.log(req.session);
  res.render('../views/index', { 
      message: 'Enter your details',
      data: 'This is data',
      session: req.session
 });
});

module.exports = router;