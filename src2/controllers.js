const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')
const uuid4 = require('uuid/v4')

const schemas = require('./schemas')
const { db, redis } = require('../config')
const { promisify } = require('util')

const getAsync = promisify(redis.get).bind(redis)

const { saveImg } = require('./helpers')

module.exports = {
  async getPosts(ctx) {
    try {
      const { id } = ctx.params

      const posts = await db('posts').where('id', id)
      ctx.status = 200
      ctx.body = posts
    } catch (e) {
      ctx.throw(400, e)
    }
  },

  async addPostDescription(ctx) {
    try {
      const { body } = ctx.request
      await schemas.postDescr.validate(body)
      redis.set(ctx.state.user.id, body.description)
      ctx.status = 201
    } catch (e) {
      ctx.throw(400, e)
    }
  },
  async addPostPhoto(ctx) {
    try {
      const postDescr = await getAsync(ctx.state.user.id)

      if (!postDescr) throw new Error('no user descr')

      const saved = await saveImg(ctx.req, process.env.PATH_TO_SAVE_IMAGES)

      await db('posts').insert({
        user_id: ctx.state.user.id,
        decription: postDescr,
        path_photo: saved,
      })
    } catch (e) {
      ctx.throw(400, e)
    }
  },
  async testAuth(ctx) {
    ctx.body = { auth: ctx.isAuthenticated(), user: ctx.state.user }
  },
  async failureAuth(ctx) {
    ctx.throw(400)
  },
  async sucessAuth(ctx) {
    ctx.status = 202
  },

  async setPhotoToUser(ctx) {
    try {
      const busboy = new Busboy({ headers: ctx.req.headers })
      const pathToSave = process.env.PATH_TO_SAVE_IMAGES

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const extFile = mimetype.split('/')[1]
        const saveTo = path.resolve(pathToSave, `${uuid4()}.${extFile}`)
        file.pipe(fs.createWriteStream(saveTo))
      })
      busboy.on('finish', () => {})

      ctx.req.pipe(busboy)

      ctx.status = 201
    } catch (e) {
      ctx.throw(400, e)
    }
  },

  async signUpUserInfo(ctx) {
    try {
      const { body } = ctx.request
      await schemas.signUp.validate(body)
      const [userId] = await db('users')
        .insert(body)
        .returning('id')

      ctx.status = 201
      ctx.body = { id: userId }
    } catch (e) {
      ctx.throw(400, e)
    }
  },
  async signInUser(ctx) {
    try {
      const { body } = ctx.request
      await schemas.signIn.validate(body)
    } catch (e) {
      ctx.throw(418, e)
    }
  },
}
