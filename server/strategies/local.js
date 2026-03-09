import passport from "passport";
import { Strategy } from "passport-local";
import * as argon2 from "argon2";
import userModel from "../users/userModel.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // const findUser = await client.query(`
    //   SELECT *
    //   FROM users
    //   WHERE id = ${id}
    //   `);
    const findUser = await userModel.findOne({ _id: id })
    console.log(findUser, findUser.rows)
    // console.log(findUser, findUser.rows);
    if (!findUser) {
      throw new Error("Invalid creds.");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {

    const findUser = await userModel.findOne({ email: email })
    const user = findUser ? findUser : null
      if (!user) {
      
        done(null, false, { message: "invalid credentials." });
      }
      const isPasswordCorrect = await argon2.verify(user.password, password);
      if (!isPasswordCorrect) {
       
        done(null, false, { success: false, message: "invalid credentials." });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);
