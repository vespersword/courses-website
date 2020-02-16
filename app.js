const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.urlencoded(
    {extended: false})
)
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