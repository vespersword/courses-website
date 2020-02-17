const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    res.render('../views/login', { 
        message: 'Enter your details',
        data: 'This is data',
        session: req.session
   });
});

router.post('/', (req, res) =>{
    var uname = req.body.name;
    var pass = req.body.password;
    var ssn = req.session;
    var promise = new Promise(function(resolve, reject){
        User.findOne({username: uname}, (err, user) =>{
            if(err) return reject(err);
            if(!user){
                resolve("No");
            }
            else if(user.password!= pass){
                resolve("No");
            }
            else{
                resolve(user.username);
            }
        })
    });
    promise
        .then((data) =>{
            if(data=="No"){
                res.render('../views/login', { 
                    message: 'Invalid username/password',
                    data: 'This is data',
                    session: req.session
               });
            }
            else{
                req.session.username = data;
                console.log(req.session);
                res.redirect('/');
                /*
                res.render('../views/login', {
                    message: 'Login successful',
                    session: req.session
                })*/
            }
        })
});

module.exports = router;