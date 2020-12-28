const Post = require('../models/post');
const User = require('../models/users');
const Comment = require('../models/comment');

// module.exports.create = function(req,res){

//     Post.create({
//         content : req.body.content,
//         user : req.user._id
//     },function(err,post){
//         if(err){console.log("Error while creating post"); return;}
//         return res.redirect('back');
//     });

// }

// module.exports.destroy = function(req,res){

//     Post.findById(req.params.id,function(err,post){
//             if(post.user == req.user.id){
//                 post.remove();
//                 Comment.deleteMany({post: req.params.id},function(err){
//                     return res.redirect('back');
//                 })
                
//             }
//             else{
//                 return res.redirect('back');
//             }
//     })

// }


module.exports.create = async function(req,res){

    try {
      let post =   await  Post.create({
            content : req.body.content,
            user : req.user._id
        });

        let post_user = await User.findById(req.user._id);

     
        console.log("Post Data when Created " + post);
        if (req.xhr) {
            return res.status(200).json({
                data : {
                    post : post,
                    post_user : post_user,
                    
                },
                message : "Post Created"
            })
        }

       
        // req.flash('success','Post created ');
        // return res.redirect('back');
    } catch (error) {
        console.log("Error",error);
        req.flash('error','Something went wrong!');
        return res.redirect('back');
    }

  
}


module.exports.destroy = async function(req,res){

    try {
            let post = await Post.findById(req.params.id);
            if(post.user == req.user.id){
                         post.remove();
                           await  Comment.deleteMany({post: req.params.id});

                        if(req.xhr){
                            return res.status(200).json({
                                data :{
                                    post_id : req.params.id
                                },
                                message: "Post and its comment deleted",
                                
                            })
                        }

                           req.flash('success','Successfully deleted post and its comments');
                           res.redirect('back');
            }else{
                return res.redirect('back');
            }    
    } catch (error) {
        
        console.log("Error",error);
        req.flash('error','Something went wrong..');
        return res.redirect('back');

    }

}
