const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
    },

    //this defines the object id of the like object [post/comment]
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel' //self refrence
    },

    //this field is use for defining type of the object since this is the dynamic 
    onModel :{
        type : String,
        required : true,
        enum : ['Post','Comment'],
    }
},{timestamps : true})

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;