import express from "express";
import passport from "passport";
// import messageCreate from "./messageCreate.js";
import messageReadMany from "./messageReadMany.js";

const messageIndex = express.Router();

// messageIndex.post("/", passport.authenticate("jwt", { session: false }), messageCreate);
messageIndex.get("/:channelName", passport.authenticate("jwt", { session: false }), messageReadMany);

export default messageIndex;