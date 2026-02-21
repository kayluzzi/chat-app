import client from "../dbPool.js"


const logout = async (req, res) => {
  const { id } = req.user
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not auth." })
  }
  const logoutUser = await client.query(`
      UPDATE users
      SET
        tokens = null
      WHERE id = ${id};
      `)
      console.log(logoutUser.rows)

  try {
    res.status(200).json({success: true, message: "logged out success."})
  }
  catch (err) {
    res.status(500).json({ success: false, message: "error" })
  }
}

export default logout;