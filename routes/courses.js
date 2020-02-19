const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

//Middleware to check if user is logged in
var enrollLoginChecker = (req, res, next) =>{
    if (!req.session.username){
        req.flash('error','Please login first');
    }
    else{
        next();
    }
}

/* GET courses page. */
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

router.post('/:coursecode', enrollLoginChecker, async function(req, res){
    try{
    var course = await Course.find({course_code: req.params.coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    if(req.session.courses_enrolled == null){
        req.session.courses_enrolled = [course[0].course_code];
        await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled},
            (err, numUpdated) => {
                if(err) return err;
                console.log("Course added successfully in DB");
            }
            );
    }
    else{
        req.session.courses_enrolled.push(course[0].course_code);
        await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled},
            (err, numUpdated) => {
                if(err) return err;
                console.log("Course added successfully in DB");
            }
            );
    }
    res.render('../views/course',{
        session: req.session,
        course: course
    })

    }
    catch(e){console.log(e)}
})

router.post('/:coursecode/delete', enrollLoginChecker, async function(req, res){
    try{
    var course = await Course.find({course_code: req.params.coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    
    var del_index = req.session.courses_enrolled.indexOf(req.params.coursecode);
    if(del_index > -1){
    req.session.courses_enrolled.splice(del_index, 1);
    }
    await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled},
        (err, numUpdated) => {
            if(err) return err;
            console.log("Course deleted successfully in DB");
        }
        );

    res.redirect('/'+req.params.coursecode);

    }
    catch(e){console.log(e)}
})

});

module.exports = router;