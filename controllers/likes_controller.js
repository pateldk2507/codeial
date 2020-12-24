const Like  = require('../models/like');
const Post  = require('../models/post');
const Comment = require('../models/comment');
const mongoose  = require('mongoose');

module.exports.toggleLike = async function(req,res){

    try {

        // likes/toggle?id=123&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == "Post"){
            //populate the post in the likable variable
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            //populate the comment in likeable variable
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        
        //check if a like already exists
        let x = mongoose.Types.ObjectId(req.query.id);
        let existingLike = await Like.findOne({
            likeable : x,
            onModel : req.query.type,
            user : req.user._id
        });

     
        //if a like already exist then delete it

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;

        }else{

            //make a new Like

            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.status(200).json({
            message : 'Request successful',
            deleted : deleted
        });


    } catch (error) {
        console.log("Error ",error);
        return res.status(500).json({
            message : 'internal server error'
        })
    }


}