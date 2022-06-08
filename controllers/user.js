import bcrypt from 'bcryptjs';
import { request } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const secret = "test";
import UserModal from '../models/user.js';

//=====================SignIn=======================
export const signin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const oldUser = await UserModal.findOne({email});
        if(!oldUser)
            return res.status(400).json({message:"User doesn't exists"});
        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);

        if(!isPasswordCorrect)
            return res.status(400).json({message:"Invalid credentials"});
        
            const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"1h"});
            res.status(200).json({result:oldUser,token});

    } catch (error) {
        res.status(500).json({message:"Something went worng signin"});
        console.log(error);
    }
}

//=====================SignUp======================
export const signup = async(req,res)=>{
    const {email,password,firstName, lastName} = req.body;
    try {
        const oldUser = await UserModal.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword = await bcrypt.hash(password,12);

        const result = await UserModal.create({
            email,
            password: hashPassword,
            // name:`${firstName} ${lastName}`
            fname:firstName,
            lname:lastName
        });
        const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"24h"});
        res.status(201).json({result,token});
        
    } catch (error) {
        res.status(500).json({message:"Something went worng"});
        console.log(error);
    }
}

export const googleSignIn = async(req,res)=>{
    const {email,name,token,googleId} = req.body; 

    try {
        const oldUser = await UserModal.findOne({email});
        if(oldUser){
            const result = {_id:oldUser._id.toString(),email,name};
            return res.status(200).json({result,token});
        }
        const result = await UserModal.create({
            email,
            name,
            googleId,
        });
        res.status(200).json({result,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        console.log(error);
    }
}

//=====================For Profile update======================
export const updateUserProfile = async(req,res)=>{
    const {id} = req.params;
    const {fname,lname,email,role,department,work,yearofjoing,password} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:`No user exist with id: ${id}`});
        }
        const hashPassword = await bcrypt.hash(password,12);
        const updatedUserProfile={
            fname,
            lname,
            email,
            role,
            department,
            work,
            yearofjoing,
            password: hashPassword,
            _id:id
        }
        await UserModal.findByIdAndUpdate(id,updatedUserProfile,{new: true});
        res.json(updatedUserProfile);
        console.log(updatedUserProfile);
    } catch (error) {
        return res.status(404).json({message:"Something went wrong"});
    }
}