const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = function(req,res)
{
    Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate:{
                path : 'user'
            }
        })
        .exec(function(err,posts){
            User.find({},function(err,users){
                return res.render('main',{
                    pageTitle : 'Codial Home',
                    posts : posts,
                    all_users : users
                });
            })
            
        });
}

