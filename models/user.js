import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:false},
    googleId:{type:String, required:false},
    id:{type:String},
    role:{type:String, required:true, default:"User"},
    department:{type:String},
    work:{type:String},
    yearofjoing:{type:Date},
});

const UserModal = mongoose.model("User",userSchema);

export default UserModal;