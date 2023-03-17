const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new startegy for google login
passport.use(new googleStrategy({

    clientID : "613430340252-1ivj8tp4hbof93n08181tbre3625njrc.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},

  function(accessToken,refreshToken,profile,done){
        //find user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){

            if(err){console.log("Error in google strategy passport: ",err); return;}

            console.log(profile);

            if(user){
                //if user found set this user as req.user
                return done(null,user)
            }else{

                //if not found create user and set it as req.user
                User.create({

                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){

                    if(err){console.log("Error in craeting user: ",err); return;}

                    return done(null,user);
                })
            }
        })
  }

))

module.exports = passport;