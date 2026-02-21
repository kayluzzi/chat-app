import jwt from "jsonwebtoken";
import client from "../dbPool.js"


const me = async (req, res, next) => {
  // const { id } = req.user;
  // console.log("me req.user", req.user)
 
  try {
      // const getUser = await client.query(`
      // SELECT *
      // FROM users
      // WHERE id = ${id}
      // `)
      // console.log(getUser.rows)
      // const user = getUser.rows.length === 1 ? getUser.rows[0] : null;
      const user = req.user

    if (!user) {
      res.status(401).json({ success: false, user: null })
    }
    // IMPORTANT: update column names
    res.status(200).json({ success: true, user: { firstName: user.first_name, lastName: user.last_name, email: user.email, username: user.username, roles: user.roles } })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Error."})
  }
}

export default me;