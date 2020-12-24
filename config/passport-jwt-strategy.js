const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    console.log(jwtPayload);
    User.findById(JSON.parse(jwtPayload.data)._id,function(err,user){
        if(err){console.log("Error in finding the user from jwt stretgy"); return}
        if(user){return done(null,user);}
        else{return done(null,false);}
    })
}))

module.exports = passport;
