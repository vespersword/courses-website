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
    console.log(req.body);
    const user = new User({
        username: req.body.name,
        password: req.body.password
    });

    var error_status = 0;
    message1 = "Something went wrong please try again.";
    data1 = "";

    user.save((err, user) =>{
        if(err){
            error_status = 1;
            return console.log(err)
        }
        else{
            console.log("User successfully added.");
        }
    })
    if(error_status == 0) {
        message1 = "Registration Successful";
        data1 = JSON.stringify(req.body);
    }
    res.render('../views/register',{
        message: message1,
        data: data1
    })
});

module.exports = router;