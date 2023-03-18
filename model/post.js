const mongoose =require('mongoose');

const postSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required:true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    likes : {
        type:Number
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        comment:{
            required:true,
            type : mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    }]
})

const Post = mongoose.model('Post',postSchema);

module.exports=Post;