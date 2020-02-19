const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

//Middleware to check if user is logged in
var enrollLoginChecker = (req, res, next) =>{
    if (!req.session.username){
        req.flash('error','Please login first');
    }
    else{
        next();
    }
}

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
        //console.log(courses[0].course_name);
        res.render('../views/courses',{
            session: req.session,
            course_list: courses
        });
        
    })
    .catch((err)=> {
        console.log(err)
        res.redirect('/');
    })

router.get('/:coursecode', function(req, res){
    var coursecode = req.params.coursecode;
    console.log(coursecode);
    var course_page_promise = Course.find({course_code: coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    course_page_promise
    .then((course)=>{
        //console.log(course);
        res.render('../views/course',{
            session: req.session,
            course: course
        })
        //console.log(course);
    })
    .catch((err)=>{
        console.log(err);
        alert("Something went wrong. Redirecting you now.");
        res.redirect('/');
    })
})

router.post('/:coursecode', enrollLoginChecker, function(req, res){
    var course_page_promise = Course.find({course_code: req.params.coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    course_page_promise
    .then((course) =>{
    if(req.session.courses_enrolled == null){
        //console.log(course);
        //req.session.courses_enrolled.push(course[0].course_code);
        req.session.coures_enrolled = [course[0].course_code];
        console.log("This log is happening if null");
        console.log(req.session);
    }
    else{
        console.log("This log happens if not null");
        req.session.courses_enrolled.push(course[0].course_code);
        console.log(req.session);
    }
    console.log("Session after updating enrolled course:");
    console.log(req.session);
    res.render('../views/course',{
        session: req.session,
        course: course
    })
    })
    .catch((err) => console.log(err));
})

});

module.exports = router;