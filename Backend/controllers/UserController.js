import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

//User Registration
const registerUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {name,email,password} = req.body;

        //check if user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create and save new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "User registered successfully", success: true});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error",success:false});
    }
    
}

//user Login
const LoginUser = async (req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({token:token,success:true});


    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error",success:false});
    }
}


export {registerUser,LoginUser};