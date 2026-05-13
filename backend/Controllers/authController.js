const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signup = async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:'User already exist, you can login',success:false});
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,5);
        await userModel.save();
        res.status(201).json({message: "Signup successfull", success:true})
    }catch(err){    
        res.status(500).json({message:"Internal server error", success:false})
    }
}

const login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await UserModel.findOne({email});
        const msg= "Auth failed email or password wrong!"
        if(!user){
            return res.status(403).json({message:msg,success:false});
        }
        const isPwEqual = await bcrypt.compare(password, user.password);
        if(!isPwEqual){
            return res.status(403).json({message:msg,success:false});
        }
        const jwtToken = jwt.sign(
            {
                email:user.email, _id:user._id
            },
            process.env.JWT_SECRET, //secret key for jwt, should be in env variable in production
            {expiresIn:'24h'}
        )
        res.status(200).json({message: "Login successfull", success:true, jwtToken,email,name:user.name})
    }catch(err){    
        res.status(500).json({message:"Internal server error", success:false})
    }
}

module.exports = {
    signup,
    login
}