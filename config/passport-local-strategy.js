const { disconnect } = require('mongoose');
const passport = require('passport');
const User = require('../models/users');
const { pass } = require('./mongoose');
const LocalStrategy = require('passport-local').Strategy;

//Authantication using passport

passport.use(new LocalStrategy({
    usernameField : 'email',
}, function(email,password,done){
    //find user and establish identity.
    User.findOne({email : email},function(err,user){
        
        //if error is thrown while execute the code
        if(err){console.log("Error in finding the user  passport->user",err); return done(err);}
        
        //if user is not found
        if(!user){console.log("User not found!!",err); return done(null,false);}
        
        //if password does not match
        if(user.password !=password){console.log("Username or password is incorrect"); return done(err,false);}
        
        //if all ok.
        return done(null,user);
    })
} ));

//serializing the user to decide which key is to be kept in the cookie...

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log("Error in finding the user ->> Passport"); return done(err,false);}
        done(err,user);
    })
})

//check if the user is authanticate

passport.checkAuthentication = function(req,res,next){
    
    //if user is sign in passon the req to the next function(controller)

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/user-signin');

}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
        //req.user contains signed used from the session and we are sending to local-str
        //local variable set on whole project
        res.locals.user = req.user;

    }

    next();
}


module.exports = passport;