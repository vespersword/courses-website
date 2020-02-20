const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
/* GET home page. */
router.get('/', async (req, res, next) => {
    //console.log("Session before submitting course");
    //console.log(req.session);
    try{
    var users = await User.find({user_type: "Instructor"}, (err, user)=>{
        if(err) return (err);
        //console.log(course);
        return user;
    })
    req.session.page_load_instructors = users;
    res.render('../views/add-course', { 
        message: 'Enter your details',
        data: 'This is register data',
        session: req.session,
        instructor_list: users
   });
   console.log(users);
    //return(find_promise)
    }
    catch(err){console.log(err)};
});

router.post('/', (req, res) => {
    //console.log(req.body);
    var promise = new Promise(function(resolve, reject) {
        var ccode = req.body.course_code;
        Course.findOne({course_code: ccode}, (err, course) =>{
        if(err) return reject(err);
        if(course){
            //console.log("Duplicate User");
            //message1 = "Username is already taken.";
            resolve("Duplicate");
        }
        else {
           resolve("New");
        }
      });
    });
    promise
        .then((data) => {
            if(data=="Duplicate"){
                console.log("Duplicate course code");
                res.render('../views/add-course',{
                    message: "Course code is already taken.",
                    data: "This is a duplicate coursecode test message sent through pug.",
                    session: req.session,
                    instructor_list: req.session.page_load_instructors
                })
                delete req.session.page_load_instructors;
            }
            else if(data=="New"){
                var status = false;
                if(req.body.restrict==1){
                    status = true;
                }
                const course = new Course({
                    course_name: req.body.course_name,
                    course_code: req.body.course_code,
                    course_type: req.body.course_type,
                    course_category: req.body.course_category,
                    description: req.body.description,
                    instructor: req.body.instructor,
                    university: req.body.university,
                    uni_exclusive: status,
                    credits: req.body.credits
                });
                course.save((err, user) =>{
                    if(err){
                        return console.log(err)
                    }
                    else{
                        console.log("Course successfully added.");
                        res.render('../views/add-course',{
                            message: "Course added successfully",
                            data: "This is successfull course add test message.",
                            session: req.session,
                            instructor_list: req.session.page_load_instructors
                        });
                        delete req.session.page_load_instructors;
                    }
                })
            }
        })
        .catch((err) => console.log(err));
        
    });

module.exports = router;