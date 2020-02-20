const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

//Middleware to check if user is logged in
var enrollLoginChecker = (req, res, next) =>{
    //console.log("Login check middleware ran here");
    if (!req.session.username){
        req.flash('error','Please login first');
    }
    else{
        next();
    }
}

var checkUniExclusive = (req, res, next) =>{
    //console.log("Uni check middleware ran here");
    if(req.session.course_restrict=="true"){
        if(req.session.user_university!=req.session.course_university){
            req.flash('error', 'This course is only available to those enrolled in the same university.');
        }
    }
    else{
        next();
    }
}

var checkCredits = (req, res, next) => {
    //console.log("Credit check middleware ran here");
    if(req.session.course_restrict=="false") return next();
    var cred_sum = req.session.reg_creds + req.session.course_credits;
    console.log(cred_sum);
    if(cred_sum > 27){
        req.flash('error', 'Enrolling in this course makes your total credits '+cred_sum+' which is greater than 27.');
    }
    else{
        req.session.reg_creds = cred_sum;
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

router.get('/:coursecode', async function(req, res){
    try{
    //console.log("Session after GET");
    //console.log(req.session);
    var coursecode = req.params.coursecode;
    console.log(coursecode);
    var course = await Course.find({course_code: coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    var teacher = await User.find({username: course[0].instructor},(err, user) =>{
        if(err) return(err);
        return user;
    });
    //Set university in session variable for the page.
    req.session.course_university = course[0].university;
    req.session.current_course_code = coursecode;
    req.session.course_restrict = course[0].uni_exclusive;
    //console.log(req.session.course_restrict);
    req.session.course_credits = course[0].credits;

    //Saving enrolled users to session variable for use on this oage during POST. Deleted after posting.
    req.session.users_enrolled = course[0].users_enrolled;
    

    //console.log(course);
    res.render('../views/course',{
        session: req.session,
        course: course,
        instructor: teacher
    })
    }
    catch(err){
        console.log(err);
        alert("Something went wrong. Redirecting you now.");
        res.redirect('/');
    }
})

//All the middleware is used in this POST.

router.post('/:coursecode', enrollLoginChecker, checkUniExclusive, checkCredits, async function(req, res){
    try{
        //Get course details
    var course = await Course.find({course_code: req.params.coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })
    // Get instructor for course
    var teacher = await User.find({username: course[0].instructor},(err, user) =>{
        if(err) return(err);
        return user;
    });
    if(req.session.courses_enrolled == [null]){
        req.session.courses_enrolled = [course[0].course_code];
        await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled, reg_creds: req.session.reg_creds},
            (err, numUpdated) => {
                if(err) return err;
                console.log("Course added successfully in DB");
            }
            );
    //console.log("Log before adding user to enroll list.");
    //console.log(req.session.users_enrolled);
    if(req.session.users_enrolled == null){
        var enrolled_users = [req.session.username];
        var num_users = 1;
        console.log(enrolled_users);
        await Course.updateOne({course_code: req.session.current_course_code}, {users_enrolled: enrolled_users, no_enrolled: num_users},
            (err, numUpdated) =>{
                if(err) return err;
                console.log("User added to enroll list");
            });
        //delete req.session.users_enrolled;
    }
    else{
        req.session.users_enrolled.push(req.session.username);
        var num_users = req.session.users_enrolled.length;
        await Course.updateOne({course_code: req.session.current_course_code}, {users_enrolled: req.session.users_enrolled, no_enrolled: num_users},
            (err, numUpdated) =>{
                if(err) return err;
                console.log("User added to enroll list");
            });
        //delete req.session.users_enrolled;
    }
        
    }
    else{
        req.session.courses_enrolled.push(course[0].course_code);
        //var user_name = req.session.username;
        await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled},
            (err, numUpdated) => {
                if(err) return err;
                console.log("Course added successfully in DB");
            }
            );
        if(req.session.users_enrolled == null){
            var enrolled_users = [req.session.username];
            var num_users = 1;
            await Course.updateOne({course_code: req.session.current_course_code}, {users_enrolled: enrolled_users, no_enrolled: num_users},
                (err, numUpdated) =>{
                    if(err) return err;
                    console.log("User added to enroll list");
                });
            //delete req.session.users_enrolled;
        }
        else{
            //console.log("Log before adding user to enroll list");
            //console.log(req.session);
            req.session.users_enrolled.push(req.session.username);
            var num_users = req.session.users_enrolled.length;
            await Course.updateOne({course_code: req.session.current_course_code}, {users_enrolled: req.session.users_enrolled, no_enrolled: num_users},
                (err, numUpdated) =>{
                    if(err) return err;
                    console.log("User added to enroll list");
                });
           //delete req.session.users_enrolled;
        }
    }
    res.render('../views/course',{
        session: req.session,
        course: course,
        instructor: teacher
    })

    }
    catch(e){console.log(e)}
})

router.post('/:coursecode/delete', enrollLoginChecker, async function(req, res){
    try{
    /*var course = await Course.find({course_code: req.params.coursecode},(err, course) =>{
        if(err) return (err);
        return course;
    })*/

    //Deleting value from stored array.
    var del_index_enrolled_users = req.session.users_enrolled.indexOf(req.session.username);
    if(del_index_enrolled_users > -1){
        req.session.users_enrolled.splice(del_index_enrolled_users, 1);
        }
    //console.log(req.session.users_enrolled);
    var del_index = req.session.courses_enrolled.indexOf(req.params.coursecode);
    if(del_index > -1){
    req.session.courses_enrolled.splice(del_index, 1);
    }
    var new_creds = req.session.reg_creds - req.session.course_credits;
    req.session.reg_creds = new_creds;

    //Update user credits and courses list.
    await User.updateOne({username: req.session.username}, {enrolled_courses: req.session.courses_enrolled, reg_creds: new_creds},
        (err, numUpdated) => {
            if(err) return err;
            console.log("Course deleted successfully in DB");
        }
        );

    //Update course enrolled users list.
    console.log("Console log at enrolled list delete.");
    console.log(req.session.users_enrolled);
    var num_users = req.session.users_enrolled.length;
    await Course.updateOne({course_code: req.session.current_course_code}, {users_enrolled: req.session.users_enrolled, no_enrolled: num_users},
            (err, numUpdated) =>{
                if(err) return err;
                console.log("User removed from enroll list");
            });
    delete req.session.users_enrolled;
    res.redirect('/courses/'+req.params.coursecode);

    }
    catch(e){console.log(e)}
})

});

module.exports = router;