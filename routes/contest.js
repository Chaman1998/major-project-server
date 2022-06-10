import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {createConst, getContests, getContest, getContestsByUser, deleteContest, updateContest, uploadFiles} from "../controllers/contest.js";

router.post("/",auth,createConst);
router.get("/",getContests);
router.get("/:id",getContest);
router.delete("/:id",auth,deleteContest);
router.patch("/:id",auth,updateContest);
router.get("/userContests/:id",auth,getContestsByUser);
router.post("/uploadFiles", auth, uploadFiles);

export default router;