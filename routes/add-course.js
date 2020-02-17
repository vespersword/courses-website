const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
/* GET home page. */
router.get('/', (req, res, next) => {
    //console.log("Session before submitting course");
    //console.log(req.session);
    res.render('../views/add-course', { 
        message: 'Enter your details',
        data: 'This is register data',
        session: req.session
   });
});

router.post('/', (req, res) => {
    //console.log(req.body);
    var promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
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
                    session: req.session
                })
            }
            else if(data=="New"){
                const course = new Course({
                    course_name: req.body.course_name,
                    course_code: req.body.course_code,
                    course_type: req.body.course_type,
                    course_category: req.body.course_category,
                    description: req.body.description
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
                            session: req.session
                        });
                    }
                })
            }
        })
        .catch((err) => console.log(err));
        
    });

module.exports = router;