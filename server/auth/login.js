import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import client from "../dbPool.js";

const jwtSecret = process.env.JWT_SECRET || "secret";
const tokenExpiration = process.env.TOKEN_EXPIRATION || 60 * 60 * 24 * 1; // 1days

const cookieOptions = {
  httpOnly: true,
  secure: false,
  signed: true,
  maxAge: tokenExpiration,
  sameSite: "none",
  domain: "localhost",
  path: "/",
};

const createToken = (user) => {
  console.log("createToken user", user);
  return jwt.sign(user, jwtSecret, { expiresIn: tokenExpiration });
};

const login = async (req, res, next) => {
  const { id } = req.user;
  const token = { token: createToken({ id }) };
  try {
    const updateUser = await client.query(`
      UPDATE users
      SET tokens = '[ { "token": "${token.token}" } ]'
      WHERE id = ${id}
      `);

    const getUser = await client.query(`
      SELECT *
      FROM users
      WHERE id = ${id}
      `);
    console.log(getUser, getUser.rows);
    const user = getUser.rows.length === 1 ? getUser.rows[0] : null;

    res.cookie("token", token, cookieOptions);
    res
      .status(200)
      .json({
        success: true,
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          username: user.username,
          roles: user.roles,
        },
        token: token.token,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error.😒😥😔" });
  }
};

export default login;
