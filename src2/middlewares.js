module.exports = {
  onlyAuth() {
    return async (ctx, next) => {
      if (ctx.isUnauthenticated()) {
        ctx.throw(401)
      }
      await next()
    }
  },
  errorHandler() {
    return async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        if (e.status) ctx.status = e.status
        else ctx.status = 418
        ctx.body = { status: ctx.status, message: e.message }
      }
    }
  },
}
