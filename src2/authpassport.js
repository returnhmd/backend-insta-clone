const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
// const bcrypt = require('bcrypt')
const { db } = require('../config')

// function comparePassword(userPswd, dbPswd) {
//   return bcrypt.compareSync(userPswd, dbPswd)
// }

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await db('users')
    .first()
    .where('id', id)

  if (!user) return done(null, false)

  return done(null, user)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await db('users')
          .first()
          .where({ email: username })

        if (!user) throw new Error('User does not exist')
        else done(null, user)
      } catch (e) {
        done(e)
      }
    },
  ),
)
