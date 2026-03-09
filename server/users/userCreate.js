import * as argon2 from "argon2"
import userModel from "./userModel.js"

const userCreate = async (req, res) => {
  const { firstName, lastName, email, username, password, roles } = req.body;

  try {
    const encryptedPassword = await argon2.hash(password)
  
    const user = await userModel.create({ firstName, lastName, email, username, password, roles, authStrategy: "local", tokens: [] })
    console.log("user", user);
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, user: {}, message: "There was an error stupid" });
  }
};

export default userCreate;
