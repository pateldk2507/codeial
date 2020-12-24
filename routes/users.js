const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/user-signup',userController.signup);
router.get('/user-signin',userController.signin);
router.post('/create',userController.create); //Register
router.get('/logout',userController.logout);
router.post('/edit/:id',userController.edit);
//use passport as middleware to authanticate

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/user/user-signin'} //it will execute when password is incorrect or user not found
) , userController.createSession); //login 

router.get('/auth/google',passport.authenticate('google',
            {scope : ['profile','email']}));

router.get('/auth/google/callback', passport.authenticate('google',
        {failureRedirect : '/user/sign-in'}),userController.createSession);

module.exports =router;