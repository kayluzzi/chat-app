import express from "express";
import passport from "passport";
import userCreate from "./userCreate.js";


const userIndex = express.Router()


userIndex.post("/", passport.authenticate("jwt", { session: false }), userCreate) 


export default userIndex;