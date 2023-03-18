const User=require('../model/user');

const userLogin=async(req,res)=>{
    try{
        const email=req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);

        const result = await User.findOne({$and:[{email:email},{password:password}]});

        const token = await result.generateJWT();
        if(!null){
            res.status(200).json({"JWT Token":token});
        }else{
            res.end("Invalid Credentials")
        }
     
    }catch(e){
        res.status(500).send("Error from the server");
    }
} 

const follow=async(req,res)=>{
    try {
        const followerId=req.user._id;
        const leaderId=req.params.id;
        const result= await User.updateOne({_id:leaderId},{$inc:{followers:1}});
        const update= await User.updateOne({_id:followerId},{$inc:{followings:1}});
        res.status(200).end("Followed Successfully");
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

const unfollow=async(req,res)=>{
    try {
        const followerId=req.user._id;
        const leaderId=req.params.id;
        const result= await User.updateOne({_id:leaderId},{$inc:{followers:-1}});
        const update= await User.updateOne({_id:followerId},{$inc:{followings:-1}});
        res.status(200).end("Unfollowed Successfully");
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

const getUser=async(req,res)=>{
    try {
        const user=req.user;
        if(!user.followers) user.followers=0;
        if(!user.followings) user.followings=0;
        res.status(200).json({"User Name":user.name,"Number of followers":user.followers, "Number of followings ":user.followings});
    } catch (error) {
        res.status(500).json({"message":"error from the server"});
    }
}

module.exports={userLogin,follow,unfollow,getUser};