import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from "morgan";

import userRouter from "./routes/user.js";
import contRouter from "./routes/contest.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

//==============User Router===============
app.use("/users",userRouter);
app.use("/contest",contRouter);

// ============Backend connection================
const MONGODB_URL="mongodb+srv://csarkar:Password1234@cluster0.bhxru.mongodb.net/mernstack?retryWrites=true&w=majority";
const port = 9000;

// ===============Mongoose connection===============
mongoose.connect(MONGODB_URL)
    .then(()=>{
        app.listen(port,()=>
            console.log(`Server running on port ${port}`));
    }).catch((error)=>console.log(`${error} did not conncet`));

app.get("/",(req,res)=>{
    res.send("Hello express");
});

// app.listen(port,()=>{
//     console.log(`Server running on port ${port}`);
// })

// PORT=4000
// DATABASE=mongodb+srv://csarkar:Password1234@cluster0.bhxru.mongodb.net/mernstack?retryWrites=true&w=majority
// SECRET_KEY=FOR_MAJOR_PROJECT