import * as argon2 from "argon2"
import userModel from "./userModel.js"

const userCreate = async (req, res) => {
  const { firstName, lastName, email, username, password, roles } = req.body;

  try {
    const encryptedPassword = await argon2.hash(password)
    // const user = await client.query(`
    //     INSERT INTO users (first_name, last_name, email, username, password, roles, auth_strategy) VALUES (
    //     '${firstName}',
    //     '${lastName}',
    //     '${email}',
    //     '${username}',
    //     '${encryptedPassword}',
    //      '{ "${roles}" }',
    //      'local'
    //     );
    //         `);
    const user = await userModel.create({ firstName, lastName, email, username, password, roles })
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
