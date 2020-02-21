const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

//Middleware to check if user is logged in
var LoginChecker = (req, res, next) =>{
    if (!req.session.username){
        req.session.error = "Please Login before trying to view a user's page";
        res.redirect('../login');
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

router.get('/:username', LoginChecker, async function(req, res, next){
    try{
    //console.log(courses_list);
    //Increase page view count
    await User.updateOne({username: req.params.username}, {$inc:{no_views: 1}}, (err, suc)=>{
        if(err) return err;
        return //console.log("Page view count increased for "+req.params.username);
    });
    var userpage_user = await User.find({username: req.params.username}, (err, user)=>{
        if(err) return err;
        return user;
    })
    //console.log(userpage_user);
    //console.log(req.session);
    var courses_list = await Course.find({course_code: {$in: userpage_user[0].enrolled_courses}}, function(err, course){
        if(err) return err;
        return course;
    });

    //console.log(courses_list);

    var courses_taught = await Course.find({instructor: userpage_user[0].username},(err, courses)=>{
        if(err) return err;
        return courses;
    })
    //console.log(courses_list);
    req.session.userpage_username = req.params.username;
    //console.log(userpage_user);
    req.session.userpage_usertype = userpage_user[0].user_type;
    //console.log(req.session)
    res.render('../views/user',{
        session: req.session,
        course_list: courses_list,
        userpage: userpage_user[0],
        courses_taught: courses_taught
    })
    }
    catch(e){console.log(e)};
});

router.post('/:username', async function(req, res, next){
    try{
    var query = {username: req.session.username};
    var newData = {description: req.body.description, password: req.body.password, name: req.body.real_name, university: req.body.university};
    await User.updateOne(query,newData,{upsert: true}, function(err, doc){
        if(err) return err;
        return console.log("Details update successful.");
    });
    }
    catch(err){console.log(err)};
    res.redirect('/users/'+req.session.userpage_username);
});

module.exports = router;