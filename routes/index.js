const Router = require('koa-router')

const router = Router();

router.get('/*', async(ctx, next) => {
    ctx.response.body = "api request router"
})

module.exports = router