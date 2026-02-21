import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import client from '../dbPool.js'

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
    try {
      const token = req.headers.authorization.split(' ')[1]

      // if (!user || !user.tokens.find((t) => t.token === token)) {
      const getUser = await client.query(`
      SELECT *
      FROM users
      WHERE id = ${jwtPayload.id}
      `)
      const user = getUser.rows.length === 1 ? getUser.rows[0] : null;
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
