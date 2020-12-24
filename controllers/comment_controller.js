const Comment  = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');

module.exports.create =  async function(req,res){

    try {
        let post = await  Post.findById(req.body.post);

        if(post){
           let comment = await Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post});

                post.comments.push(comment);

                let populatedComment =  await comment.populate('user','name email').execPopulate();

                commentMailer.newComment(populatedComment);

                post.save();

                if (req.xhr) {
                    return res.status(200).json({
                        data : {
                            comment : comment
                        },
                        message : "Comment Created"
                    })
                }
               
                
                // req.flash('success','comment added.');
                // res.redirect('/');
        }      
    } catch (error) {
        console.log("Error in creating the comment ",error);
    }
  
    


}

module.exports.destroy = async function(req,res){


    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

        let post = await Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}});
                console.log(post);
                req.flash('success',"comment deleted successfully..");
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in deleting comment",error);   
    }

    
    
    
}