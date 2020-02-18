const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("Session on index");
  //console.log(req.session);
    var find_promise = Course.find({}, (err, courses)=>{
        if(err) return (err);
        //console.log(course);
        return courses;
    })
    find_promise
    .then((courses)=>{
        //console.log(courses);
        console.log(courses[0].course_name);
    })
    .catch((err)=> console.log(err))

  //console.log(courses);
  /*res.render('../views/index', { 
      message: 'Enter your details',
      data: 'This is data',
      session: req.session
 });*/
});

module.exports = router;