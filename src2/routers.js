const Router = require('koa-router')
const passport = require('koa-passport')

const controllers = require('./controllers')
const { onlyAuth } = require('./middlewares')

const router = new Router()

router.post('/signup', controllers.signUpUserInfo)
router.post('/signup/photo', controllers.setPhotoToUser)
router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure',
  }),
)
router.get('/success', controllers.sucessAuth)
router.get('/failure', controllers.failureAuth)

router.get('/testauth', controllers.testAuth)

router.post('/posts', onlyAuth(), controllers.addPostDescription)
router.post('/posts/img', onlyAuth(), controllers.addPostPhoto)

router.get('/users/:id/posts', onlyAuth(), controllers.getPosts)

module.exports = router
