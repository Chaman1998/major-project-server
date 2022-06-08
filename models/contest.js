import mongoose from "mongoose";

const contSchema = mongoose.Schema({
    title:String,
    writing:String,
    fname:String,
    lname:String,
    creator:String,
    tags:[String],
    imageFile:String,
    createdAt:{
        type:Date,
        default:new Date(),
    },
    likeCount:{
        type:Number,
        default:0
    }
});

const ContestModal = mongoose.model("Contest",contSchema);

export default ContestModal;