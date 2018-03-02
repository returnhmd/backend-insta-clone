const path = require('path')

const ROOT = path.resolve('../')

require('dotenv').config(path.join(ROOT, '.env'))

const { DB_CLIENT, DB_NAME, DB_USER, DB_PASSWORD } = process.env

module.exports = {
  development: {
    client: DB_CLIENT || 'postgresql',
    connection: {
      database: DB_NAME || 'insta',
      user: DB_USER || 'hmd',
      password: DB_PASSWORD || 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(ROOT, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(ROOT, 'db', 'seeds'),
    },
  },
}
