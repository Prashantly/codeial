const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//import user
const User = require("../models/user");

//authentication using passport
passport.use(new LocalStrategy(
    
    {usernameField : 'email'},

    function(email,password,done){
        //find a user and establish identity 

        User.findOne({email : email},function(err,user){

            if(err){
                console.log("Error in finding user --> passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid Username/password");
                return done(null,false);
            }

            return done(null,user);

        })

    }

));


passport.serializeUser(function(user,done){

    console.log('serialized');
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){

        if(err){
            console.log("Error in finding user --> passport");
            return done(err);
        }

        console.log('deserialized');
        return done(null,user);
    })
})


// check user is auhenticated

passport.checkAuthentication = function(req,res,next){

    //if user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){

        //req.user contains the current signed-in user from session cookie and we are just seding this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;