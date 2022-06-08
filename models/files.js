import mongoose from "mongoose";

const filesSchema = mongoose.Schema({
    filecreator:String,
    filecreatedAt:String,
    fileImage:String,
    data:{
        title:String,
        writing:String,
        name:String,
        creator:String,
        tags:[String],
        imageFile:String,
        createdAt:{
            type:Date,
            default:new Date(),
        },
    },
});

const FilesModal = mongoose.model("Files",filesSchema);
export default FilesModal;