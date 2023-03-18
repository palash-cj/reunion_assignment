require("dotenv").config();
const mongoose =require('mongoose');
const jwt=require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required:true,
        minlength:7
    },
    followers :{
        type:Number
    },
    followings :{
        type:Number
    },
    tokens:[{
        token:{
            required:true,
            type: String
        }
    }]
})

// Generating json web token
userSchema.methods.generateJWT = async function(){
    try {
        console.log("Entered in generate token")
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY); // generating the token
        this.tokens=this.tokens.concat({token:token}); // storing the token 
        
        return token;
    } catch (error) {
        console.log(`Error occured : ${error}`);
    }
}


const User = mongoose.model('User',userSchema);

module.exports=User;