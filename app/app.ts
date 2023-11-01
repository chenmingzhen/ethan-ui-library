import Koa from 'koa'
import router from './routes'
import config from '../config'

const app = new Koa()

async function errorHandler(ctx: Koa.Context, next: Koa.Next) {
    try {
        await next()
    } catch (error) {
        ctx.status = 500

        console.error(error.stack)
    }
}

app.use(errorHandler)
app.use(router.routes())

app.listen(config.dev.publishPort, () => {
    console.log('代理服务器启动成功')
})
