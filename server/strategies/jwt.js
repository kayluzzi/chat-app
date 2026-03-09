import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import userModel from '../users/userModel.js'


const jwtSecret = process.env.JWT_SECRET || 'secret'

console.log('jwtSecret', jwtSecret)

// JWT Strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  passReqToCallback: true
}

passport.use(
  new JwtStrategy(opts, async (req, jwtPayload, done) => {
    const { _id } = jwtPayload
    try {
      const token = req.headers.authorization.split(' ')[1]

      // if (!user || !user.tokens.find((t) => t.token === token)) {
      // const getUser = await client.query(`
      // SELECT *
      // FROM users
      // WHERE id = ${jwtPayload.id}
      // `)
      // const user = await userModel.findOne({ _id: jwtPayload.id, "tokens.token": token })
      const user = await userModel.findOne({ _id})
console.log(user)

      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  })
)
