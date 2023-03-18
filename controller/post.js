const Post=require("../model/post");
const Comment=require("../model/comment");

const createPost=async(req,res)=>{
    try {
        const post = new Post({
            title: req.body.title,
            description: req.body.description
            // user: req.user._id
        })
        const newPost=await post.save();
        res.status(200).json({"Post-ID":newPost._id,"Title":newPost.title,"Description":newPost.description,"Created Time(UTC)":newPost.createdAt});
    } catch (error) {
        res.status(400).json({"message":"Please enter the required fields"});
    }
}
const deletePost=async(req,res)=>{
    try {
        const userId=req.user._id;
        const postId=req.params.id;
        const post=await Post.deleteOne({_id:postId});
        res.status(200).json({"Message":"Post removed successfully"});
    } catch (error) {
        res.status(400).json({"message":"Please enter the required fields"});
    }
}

const like=async(req,res)=>{
    try {
        const postId=req.params.id;
        console.log(postId);
        const result= await Post.findByIdAndUpdate({_id:postId},{$inc:{likes:1}});
        res.status(200).json({"You just liked ":result.title});
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

const unlike=async(req,res)=>{
    try {
        const postId=req.params.id;
        const result= await Post.findByIdAndUpdate({_id:postId},{$inc:{likes:-1}});
        res.status(200).json({"You just unliked ":result.title});
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

const getPost=async(req,res)=>{
    try {
        const postId=req.params.id;
        console.log(postId);
        const result=await Post.findById({_id:postId});
        console.log(result.comments.length)
        if(result.comments.length==0){
            if(!result.likes) result.likes=0;
            res.status(200).json({"Post-ID":result._id,"Post Title":result.title,"Post Likes":result.likes, "Comments":0});
        }else{
            const arr=await Comment.find({post:result});
            const count=result.comments.length;
            var data=[];
            for(var i=0;i<count;i++){
                data[i]=arr[i].content;
            }
            console.log(data)
            if(!result.likes) result.likes=0;
            res.status(200).json({"Post-ID":result._id,"Post Title":result.title,"Post Likes":result.likes, "Comments":data});
        }    
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

const getAllPost=async(req,res)=>{
    try {
        const result=await Post.find().sort({createdAt: 'desc'});
        const count=result.length;
        var wholePost=[];
        
        for(var i=0;i<count;i++){// iteration for particular post
            if(result[i].comments.length==0){
                if(!result[i].likes) result[i].likes=0;
                var single={
                    id: result[i]._id,
                    title: result[i].title,
                    description: result[i].description,
                    created_at:result[i].createdAt,
                    likes: result[i].likes,
                    comments:0,
                }
                wholePost[i]=single;
            }else{
                const count1=result[i].comments.length;
                var data=[];
                const arr=await Comment.find({post:result[i]});
                for(var j=0;j<count1;j++){// iteration for particular comment
                    data[j]=arr[j].content;
                }
                if(!result[i].likes) result[i].likes=0;
                var single={
                    id: result[i]._id,
                    title: result[i].title,
                    description: result[i].description,
                    created_at:result[i].createdAt,
                    likes: result[i].likes,
                    comments:data,
                }
                wholePost[i]=single;
            }
        }
        res.status(200).json({"Feed":wholePost});
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

module.exports={createPost, deletePost, like, unlike, getPost, getAllPost};