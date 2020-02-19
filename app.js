const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash-notification');

//Heroku support
var port = process.env.PORT || 3000;

//Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded(
    {extended: false})
);
app.use(session({
    key: 'user_sid',
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1400000
    }
}));
app.use(flash(app));


//Middleware to check if admin logged in or not.
var adminChecker = (req, res, next) => {
    if (req.session.user_type!="Admin") {
        res.redirect('/');
    } else {
        next();
    }    
};

var loginChecker = (req, res, next) =>{
    if (!req.session.username){
        res.send(alert("Please login first."))
    }
    else{
        next();
    }
}

app.use(express.static(path.join(__dirname, 'public')));

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', './views');

//Import routes
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const regRoute = require('./routes/register');
const logoutRoute = require('./routes/logout');
const addCourseRoute = require('./routes/add-course');
const coursesRoute = require('./routes/courses');
//Routing
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', regRoute);
app.use('/logout', logoutRoute);
app.use('/add-course', adminChecker, addCourseRoute);
app.use('/courses', coursesRoute);

//Database Connection
mongoose.connect("mongodb+srv://courses_db:rhino123@cluster0-kg3b2.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true }
,() => console.log("DB Connection successful...")
)
   
app.listen(port, () => console.log("Server running..."))
