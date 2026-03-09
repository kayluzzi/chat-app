import express from "express";
import passport from "passport";
import channelCreate from "./channelCreate.js";
import channelReadMany from "./channelReadMany.js";

const channelIndex = express.Router();

channelIndex.post("/", passport.authenticate("jwt", { session: false }), channelCreate);
channelIndex.get("/", passport.authenticate("jwt", { session: false }), channelReadMany);

export default channelIndex;
