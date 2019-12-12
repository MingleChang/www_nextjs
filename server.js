const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const static = require('koa-static')
const body = require('koa-body')

const port = parseInt(process.env.PORT) || 8000
const env = process.env.NODE_ENV !== 'production'
const app = next({dev:env, dir:__dirname})
const handler = app.getRequestHandler()

const apiRouter = require('./routes/index')

app.prepare()
.then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(body({
        multipart: true
    }))

    server.use(static(__dirname + '/public'));
    
    router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

    router.get('*', async ctx => {
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(router.routes(), router.allowedMethods())

    server.listen(port, () => {
        let environment = env?"DEV":"PROD"
        console.log(environment + " Server Start http://127.0.0.1:" + port)
    })
})