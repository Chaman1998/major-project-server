import ContestModal from "../models/contest.js";
import mongoose from "mongoose";

export const createConst = async(req,res)=>{
    const contest = req.body;
    const newContest = new ContestModal({
        ...contest,
        creator:req.userId,
        createAt:new Date().toISOString()
    });

    try {
        await newContest.save();
        res.status(201).json(newContest);
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
};

// ==============For multiple data==============
export const getContests = async(req,res)=>{

    try {
        const contests = await ContestModal.find();
        res.status(200).json(contests);
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
};

// ==============For single data==============
export const getContest = async(req,res)=>{
    const {id} = req.params;
    try {
        const contest = await ContestModal.findById(id);
        console.log(contest);
        res.status(200).json(contest);
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
};

export const getContestsByUser = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"User doesn't exist"});
    }
    const userContests = await ContestModal.find({creator:id});
    res.status(200).json(userContests);
}

//========================== For content delete=========================
export const deleteContest = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:`No content exist with id: ${id}`});
        }
        await ContestModal.findByIdAndRemove(id);
        res.json({message:'Content deleted successfully'});
    } catch (error) {
        return res.status(404).json({message:"Something went wrong"});
    }  
};

//========================== For content Update=========================
export const updateContest = async(req,res)=>{
    const {id} = req.params;
    const {title,writing,creator,imageFile,tags} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:`No content exist with id: ${id}`});
        }
        const updatedContest={
            creator,
            title,writing,
            tags,imageFile,
            _id:id
        }
        await ContestModal.findByIdAndUpdate(id,updatedContest,{new: true});
        res.json(updatedContest);
    } catch (error) {
        return res.status(404).json({message:"Something went wrong"});
    }  
};



// export const uploadFiles = (req, res) => {
//     try {

//         const 
        
//     } catch (error) {
        
//     }
// }