const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('../views/login', { 
        message: 'Enter your details',
        data: 'This is data'
   });
});

router.post('/', (req, res) =>{
    
})

module.exports = router;