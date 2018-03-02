const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const session = require('koa-session')
// const redis = require('./config/redis')

// require('./src/passportauth')
require('./src2/authpassport')

// const r = require('./src/routes')
const r = require('./src2/routers')
const config = require('./config')
const { errorHandler } = require('./src/middlewares')

const app = new Koa()

app.use(logger(config.logger))
app.use(errorHandler())
app.use(bodyParser(config.bodyParser))

app.keys = config.secret
app.use(session(config.session, app))

app.use(passport.initialize())
app.use(passport.session())

app.use(r.routes())

app.listen(config.server.port)
