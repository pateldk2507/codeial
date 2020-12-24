const Comment = require('../../../models/comment');
const Post = require('../../../models/post');
const User = require('../../../models/users');

module.exports.getAll = async function(req,res){
    try {

        let post = await Post.findById(req.params.id)
                    .populate('user')
                    .populate({
                        path : 'comments',
                        populate : {
                           path : 'user'
                        }
                    })

        return res.status(200).json({
            message : 'All post',
            post : post
        })
        
    } catch (error) {
        console.log("Error in getting comments",error);
    }
}
