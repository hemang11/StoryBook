const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const {connDB} = require('./config/db');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//const MongoDBStore = require('connect-mongodb-session')(session);

// Loading the config file
dotenv.config({path:'./config/config.env'});

// Passport configuration
require('./config/passport')(passport);

// Connect to the database
connDB();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// morgan checks which type of request is coming for login to the server
if(process.env.NODE_ENV === 'DEV'){
    app.use(morgan('dev'));
}

// Handlebars Helpers
const {
    formatDate,
    stripTags,
    truncate,
  } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs',exhbs({ helpers : {
    formatDate,
    stripTags,
      truncate,
},defaultLayout:'main',extname:'.hbs'})) // don't have to write .handlebars again and again
app.set('view engine','.hbs'); // setting the view engine

// express session
app.use(session({
    secret:'Use and throw',
    resave:false,
    saveUninitialized:false.valueOf,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin@cluster0.vujxs.mongodb.net/storybook?retryWrites=true&w=majority'
    })
}))


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname,'public')));

// routes
const routes = require('./routes/index');
const authRoutes = require('./routes/auth');
app.use('/',routes);
app.use('/auth',authRoutes);
app.use('/stories', require('./routes/stories'))

// Listening to PORT 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is Running on PORT ${PORT}`))