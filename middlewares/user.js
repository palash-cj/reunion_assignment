const jwt=require('jsonwebtoken');
const User = require('../model/user')

const userAuth = async (req,res,next)=>{
    try {
        const token=req.headers["authorization"].substring(7, req.headers["authorization"].length);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({_id:verifyUser._id});
        req.user=user;
        next();
    } catch (error) {
        res.status(400).json({"message":"Invalid request"});
    }
}
module.exports = userAuth;