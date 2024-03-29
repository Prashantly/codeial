const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/user');

let opts = {

    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret

}

passport.use(new JwtStrategy(opts,function(jwt_payload, done){

    User.findOne({_id:jwt_payload._id},function(err,user){

        if(err){
            console.log('Error in finding user from JWT');
            return done(err,false);
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;