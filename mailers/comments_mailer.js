const nodeMailer = require('../config/nodemailer');

module.exports.newComment = function(comment){

      nodeMailer.sendMail({   
        from : 'pateldk2507@gmail.com',
        to : comment.user.email,
        subject : 'New Comment',
        html : "someone has commented on your post"
    }, function(err,info){
        if(err){console.log("Error in sending the email",err); return}
        console.log("Message sent",info);
        return;
    })
}