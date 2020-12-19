const User = require("../models/users");

module.exports.profile = function(req,res){

    User.findById(req.params.id,function(err,user){
        
        if(err){console.log("Error"+ err);}
        
        return res.render('user_profile',{
            pageTitle : "User Profile",
            user_id : req.params.id,
            user_profile : user
    })

   
    });            

    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.render('user_profile',{
    //                 pageTitle : "User Profile",
    //                 user : user,
    //             });            
    //         }else{
    //             console.log("Faild1!");
    //             return res.redirect('/user-signin');
    //         }
    //     })
    // }else{
    //     return res.redirect('/user/user-signin');
    // }
    
}


//Render the signup page
module.exports.signup = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect ('/user/profile');
    };

    return res.render('user_sign_up',{
        pageTitle : "User Signup"
    })
}

//Render the singin Page
module.exports.signin = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect ('/');
    };

    return res.render('user_sign_in',{
        pageTitle: "Sign in"
    })
}


//Get signup data
module.exports.create = (req,res)=>{
    //Todo
    //password must same
      if(req.body.password != req.body.conformPassword)  {
          return res.redirect('back');
      }
      //
    //email must be unique
      User.findOne({email : req.body.email},function(err,user){
          if(err){
              console.log("Error in finding the users while singning up");
              return;}

              if(!user){
                    User.create(req.body,function(err,user){
                        if(err){
                            console.log("Error in Registering User while sign up");
                        }
                        return res.redirect('/user/user-signin');
                    });
              }else{
                  return res.redirect('back');
              }
        })

    //entry 



}

//get the signin data and create user-session
module.exports.createSession = function(req,res){

    req.flash('success','Logged in successfully');
    return res.redirect('/');

        //steps to auth user
        //find the user in db

        // User.findOne({email: req.body.email},function(err,user){
        //     if(err){
        //         console.log("Error in finding the users while singning up");
        //         return;
        //     }
        // //handle the user if user is found
        //     if(user){
        //         //handle the password which dont match
        //            if(user.password != req.body.password){
        //                 console.log("Password does not match!!");
        //                 return res.redirect('back');
        //            } 
        //            //create user session if password match

        //            res.cookie('user_id',user._id);
        //            return res.redirect('/user/profile');
        //     }else{
        //                 //handle if user not found
        //         console.log("User not Found!!");
        //         return res.redirect('back');
        //     }
        // })

        

}


module.exports.edit = function(req,res){

    User.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        email : req.body.email
    }, function(err,user){
        if(err){console.log("Error while updating user info",err);}

        return res.redirect('back');

    })


}

//logout the user and destroy the session
module.exports.logout = function(req,res){
      // Destroy the session if any
      req.logout();
      // Clear the specified cookies
      res.clearCookie('Codial');
      // Redirect to homepage
      req.flash('success','Logged out successfully');
      res.redirect('/');
}
