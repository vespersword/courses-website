const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

//Middleware to check if user is logged in
var updateLoginChecker = (req, res, next) =>{
    if (!req.session.username){
        req.flash('error','Please login first');
    }
    else{
        next();
    }
}

/* GET courses page. */
router.get('/', async function(req, res, next) {
    try{
        var users = await User.find({user_type: "General"}, (err, user)=>{
            if(err) return err;
            return user;
        });
        var instructors = await User.find({user_type: "Instructor"}, (err, user)=>{
            if(err) return err;
            return user;
        });
        res.render("../views/users",{
            session: req.session,
            student_list: users,
            instructor_list: instructors
        });

    }
    catch(err){console.log(err)};
})

router.get('/:username', async function(req, res, next){
    try{
    console.log(req.session);
    var courses_list = await Course.find({course_code: {$in: req.session.courses_enrolled}}, function(err, course){
        if(err) return err;
        return course;
    });
    console.log(courses_list);
    res.render('../views/user',{
        session: req.session,
        course_list: courses_list
    })
    }
    catch(e){console.log(e)};
});

module.exports = router;