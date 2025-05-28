import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";


// SIGNUP CONTROLER
export const signUp = async (req,res,next)=> {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);     // Password hashing
        const newUser = new User({ ...req.body, password: hash})   // new user obj with hashed password
        
        await newUser.save();     // Saving user in DB
        res.status(200).send("User created")
    }catch(err){
        next(err);
    }
}


// SIGN CONTROLLER
export const signIn = async (req, res, next) => {

    try{
       const user = await User.findOne({name:req.body.name})   // Find user in DB by their name
       if(!user) return next(createError(404, "User not Found Sorry!"))

       const isCorrect = await bcrypt.compare(req.body.password, user.password)   // Password comparision
       
       if(!isCorrect) return next(createError(400, "Wrong Credentials!"))

        const token = jwt.sign({id:user._id}, process.env.JWT)    // JWT token
        const {password, ...others} = user._doc;

        res.cookie("access_token", token,{
            httpOnly:true
        })
        .status(200)
        .json({ ...others, token });
    }catch(err){
        next(err);
    }
}