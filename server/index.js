import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import './strategies/local.js'
import './strategies/jwt.js'
import authIndex from './auth/index.js'
import userIndex from "./users/userIndex.js"
import taskIndex from "./tasks/taskIndex.js"

const app = express()
const port = process.env.PORT || 8000
const cookieSecret = process.env.COOKIE_SECRET || 'secret'
const sessionSecret = process.env.SESSION_SECRET || 'secret'

app.use(express.json())
app.use(cookieParser(cookieSecret))
app.use(cors())
app.disable('x-powered-by')

// const queryResults = await client.query('SELECT NOW()')
// console.log(queryResults.rows)

app.use(
  session({ secret: sessionSecret, resave: false, saveUninitialized: true })
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', authIndex)
app.use('/user', userIndex)
app.use('/task', taskIndex)

try {
  app.listen(port, () => {
    console.log(`Project Tracker app listening on port ${port}`)
  })
} catch (err) {
  console.log(err)
}