const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded(
    {extended: false})
);
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

//Middleware to check cookie is saved and if user is not set, then logout user by deleting cookie.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

//Middleware to check if logged in or not.
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

app.use(express.static(path.join(__dirname, 'public')));

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', './views');

//Import routes
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const regRoute = require('./routes/register');
//Routing
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', regRoute);


//Database Connection
mongoose.connect("mongodb+srv://courses_db:rhino123@cluster0-kg3b2.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true }
,() => console.log("DB Connection successful...")
)



app.listen(3000, () => console.log("Server running..."))