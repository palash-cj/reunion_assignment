const Comment=require('../model/comment')
const Post=require('../model/post')

const comment=async(req,res)=>{
    try {
        
        const getpost =await Post.findById({_id:req.params.id});
        const comment=new Comment({
            content : req.body.comment,
            post : getpost
            // user :req.user._id,
        });
        console.log(comment.content);
        console.log(comment.post)
        const result=await comment.save();
        await Post.findByIdAndUpdate({_id:req.params.id},{$push:{comments:result}})
        res.status(200).json({"Comment ID":result._id});
        
    } catch (error) {
        res.status(400).json({"message":"Please fill required fields"});
    }
}

module.exports=comment;