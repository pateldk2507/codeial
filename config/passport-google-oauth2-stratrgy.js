const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/users');
const crypto = require('crypto');

//tell passport to use new strategy for google auth

passport.use(new googleStrategy({

    clientID : "22220246454-knribl7fi000g6p8k79pqpstnlj321gs.apps.googleusercontent.com",
    clientSecret : "dBBbZjWEP0Fzy6n-Nj_CXwzQ",
    callbackURL : "http://localhost:8000/user/auth/google/callback"

}, function (accessToken,refreshToken,profile,done){

    User.findOne({email : profile.emails[0].value}).exec((err,user)=>{
        if(err){
                console.log("Error in passport google",err);
                return;
        }

        if(user){
            //if found set user as req.user
            return done(null,user);
        }else{
            //if not found then create the user profile and set req.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            }, function(err ,user){
                if(err){
                    console.log("error in crearing the user");
                }
                return done(null,user);
            })

        }


    })

} ))

module.exports = passport;