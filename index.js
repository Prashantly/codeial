const express=require('express');
const cookieParser = require('cookie-parser');
const app= express();
const port=8000;
const db=require('./configurations/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./configurations/passport-local-strategy");
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

// accessing static files
app.use(express.static("./assets"));

//using layout library
const expressLayouts=require("express-ejs-layouts");
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting up view Engine
app.set("view engine","ejs");

// accessing view file
app.set("views","./views");

//mongo store is used to store the session cookie in the db
app.use(session({

    name : 'codeial',
    secret : 'something',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)                                                                              
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },

        function(err){
            console.log(err || "connect mongodb setup ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


//use express router
app.use('/',require("./routes/index"));




app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is running on port: ${port}`);
})