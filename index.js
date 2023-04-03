const express=require('express');
const env = require('./configurations/environment');
const cookieParser = require('cookie-parser');
const app= express();
const port=8000;
//using layout library
const expressLayouts=require("express-ejs-layouts");
const db=require('./configurations/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./configurations/passport-local-strategy");
const passportJWT = require("./configurations/passport-jwt-strategy");
const passportGoogle = require("./configurations/passport-google-oauth2-strategy");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const customMware = require('./configurations/middleware');

//setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./configurations/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000")

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// accessing static files
app.use(express.static(env.asset_path));

//make the uploades path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

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
    secret : env.session_cookie_key,
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
app.use(passport.setAuthenticatedUser);

// use flash
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require("./routes/index"));

app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is running on port: ${port}`);
})