const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//
const sassMiddleaware = require('node-sass-middleware');


const flash = require('connect-flash');
const customeMiddleware = require('./config/middleware');


app.use(sassMiddleaware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','views');


app.use(session({
    name : 'Codial',
    //todo change the secret key 
    secret : 'SecretKeyToChange',
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },function(err){
        console.log(err || "connect mongodb setup ok");
    })

}));

// app.get('/user/logout', function(req, res){
//     // Destroy the session if any
//     req.logout();
//     // Clear the specified cookies
//     res.clearCookie('Codial');
//     // Redirect to homepage
//     res.redirect('/');
// });

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customeMiddleware.setFlash);


app.use('/', require('./routes'));






app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
    
});