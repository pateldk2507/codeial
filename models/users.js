const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.join('/uploads/users/avatars');
const DOWNLOAD_PATH = path.join('/users/avatars');


const userScheme = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
    }
},{timestamps:true});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',UPLOAD_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
//static functions 

userScheme.statics.uploadAvatar = multer({storage: storage}).single('avatar');
userScheme.statics.avatarPath = DOWNLOAD_PATH;

//   var upload = multer({ storage: storage })

const User = mongoose.model('User',userScheme);

module.exports = User;