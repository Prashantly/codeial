const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new startegy for google login
passport.use(new googleStrategy({

    clientID : env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_callback_url
},

  function(accessToken,refreshToken,profile,done){
        //find user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){

            if(err){console.log("Error in google strategy passport: ",err); return;}

            console.log(accessToken,refreshToken);

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