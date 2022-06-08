import express from "express";
const router = express.Router();

import {signup, signin, googleSignIn, updateUserProfile} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/googleSignIn",googleSignIn);

router.patch("/profile/:id",auth,updateUserProfile);//profile update

export default router;