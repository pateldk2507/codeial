const Comment  = require('../models/comment');
const Post = require('../models/post');

module.exports.create =  async function(req,res){

    try {
        let post = await  Post.findById(req.body.post);

        if(post){
           let comment = await Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post});
               
                post.comments.push(comment);
                post.save();
                res.redirect('/');
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
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in deleting comment",error);   
    }

    
    
    
}