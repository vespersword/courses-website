const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', { 
      message: 'Enter your details',
      data: 'This is data'
 });
});

module.exports = router;