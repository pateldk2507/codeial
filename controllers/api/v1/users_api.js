const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {

        let user = await User.findOne({email : req.body.email});
		
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message : 'Invalid username or password'
            })
        }

        return res.status(200).json({
            message : 'Sign in success here is your key to authenticate',
            data : {
                token : jwt.sign({
                    data : JSON.stringify(user)
                },'codeial', { expiresIn : 1000 * 60 * 60 })
            }
        
        })

    } catch (error) {
        console.log("Error in login..",error);
        return res.status(500).json({
            message : 'Internal server error'
        })
    }
}

module.exports.profile = async function(req,res){
    try {

        let user = await User.findOne({email : req.params.email});

        if(user){
            return res.status(200).json({
                message : 'User Info',
                user : user
            })
        }


    } catch (error) {
        console.log("Error in finding user",error);
    }
}

module.exports.getAll = async function(req,res){
    try {

        let users = await User.find({});

        if(users){

            return res.status(200).json({
                message : 'All Users Info',
                users  : users
            })
        }
        

    } catch (error) {
        
        return res.status(400).json({
            message : 'error',error
        })
    }
}