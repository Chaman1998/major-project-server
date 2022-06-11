import express from "express";
const router = express.Router();

import {signup, signin, googleSignIn, updateUserProfile, getUploadedFiles, deleteContests} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/googleSignIn",googleSignIn);
router.get("/getFiles", auth, getUploadedFiles);
router.delete("/deleteContests", auth, deleteContests);


router.patch("/profile/:id",auth,updateUserProfile);//profile update

export default router;