import { Router } from "express";
import passport from "passport";
import login from "./login.js";
import me from "./me.js";
import logout from "./logout.js";

const authIndex = Router();

authIndex.post("/login", passport.authenticate("local"), login)
authIndex.get("/me", passport.authenticate("jwt", { session: false }), me)
authIndex.post("/logout", passport.authenticate("jwt", { session: false }), logout)

export default authIndex;