const express = require('express');
const router = express.Router();
const User = require('../models/User');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('../views/register', { 
        message: 'Enter your details',
        data: 'This is register data'
   });
});

router.post('/', (req, res) => {
    //console.log(req.body);
    var promise = new Promise(function(resolve, reject) {
        var uname = req.body.name;
        User.findOne({username: uname}, (err, usr) =>{
        if(err) return reject(err);
        if(usr){
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
                console.log("Username taken");
                res.render('../views/register',{
                    message: "Username is already taken.",
                    data: "This is a duplicate username test message sent through pug."
                })
            }
            else if(data=="New"){
                const user = new User({
                    username: req.body.name,
                    password: req.body.password,
                    name: req.body.real_name,
                    university: req.body.university,
                    user_type: req.body.account_type
                });
                user.save((err, user) =>{
                    if(err){
                        error_status = 1;
                        return console.log(err)
                    }
                    else{
                        console.log("User successfully added.");
                        res.render('../views/register',{
                            message: "Registered Successfully",
                            data: "This is successfull registration test message."
                        });
                    }
                })
            }
        })
        .catch((err) => console.log(err));
        
    });

module.exports = router;