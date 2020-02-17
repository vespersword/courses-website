const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  req.session.destroy(function(err){
      if(err) console.log(err);
      else{
          res.redirect('/');
      }
  })
});

module.exports = router;