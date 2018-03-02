// const path = require('path')
// const { promisify } = require('util')

const knex = require('knex')
const knexFile = require('./knexfile')
const redis = require('./redis')

// const ROOT = path.resolve('../')
const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'
const isDev = NODE_ENV === 'development'

module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  env: {
    isDev,
    isProd,
    isTest,
  },
  cors: {},
  bodyParser: {},
  logger: {},
  secret: [process.env.SECRET],
  session: {},

  db: knex(knexFile[NODE_ENV]),
  redis,
}
