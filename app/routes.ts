import Router from 'koa-router'
import multer from 'koa-multer'
import send from 'koa-send'
import fs from 'fs'
import got from 'got'
import config from '../config'
import ejs from '../scripts/ejs'

const router = new Router()

/** ------------------------- node_modules 脚本文件 ---------------------------- */
router.get('**/react.production.min.js', async (ctx) => {
    await send(ctx, 'node_modules/react/umd/react.development.js')
})
router.get('**/react-dom.production.min.js', async (ctx) => {
    await send(ctx, 'node_modules/react-dom/umd/react-dom.development.js')
})
router.get('**/jszip.min.js', async (ctx) => {
    await send(ctx, 'node_modules/jszip/dist/jszip.min.js')
})
router.get('**/react-markdown.js', async (ctx) => {
    await send(ctx, 'node_modules/react-markdown/umd/react-markdown.js')
})

/** ------------------------- 图片静态资源 ---------------------------- */
router.get('/images/*', async (ctx) => {
    await send(ctx, `site/${ctx.path}`)
})

/** ------------------------- 上传资源 ---------------------------- */
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads')
}
const upload = multer({})
router.post<any, { req: { file: multer.File } }>('/upload/', upload.single('file'), async (ctx) => {
    fs.writeFileSync(`uploads/${ctx.req.file.originalname}`, ctx.req.file.buffer)

    ctx.body = {
        success: true,
        model: {
            id: Date.now().toString(),
            name: ctx.req.file.originalname,
        },
    }
})

/** ------------------------- react-hot-loader 热更新 ---------------------------- */
router.get('/*.hot-update.js(on)?', async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*')

    ctx.body = await got(`http://localhost:${config.dev.webpackPort}${ctx.url}`).then((data) => data.body)
})

router.get(config.dev.scriptPath, async (ctx) => {
    let url: string | string[] = ctx.url.split('/')

    url = url[url.length - 1]
    ;[url] = url.split('?')

    if (url.endsWith('.css')) {
        ctx.set('Content-Type', 'text/css; charset=utf-8')
    }

    ctx.set('Access-Control-Allow-Origin', '*')

    ctx.body = await got(`http://localhost:${config.dev.webpackPort}/${url}`).then((data) => data.body)
})

router.get('/', (ctx) => {
    ctx.redirect('/cn/index/')
})

router.get('/*', async (ctx) => {
    const scripts = [
        ...(config.dev.scripts || []),
        ...Object.keys(config.webpack.entry).map((s) => `${s}.js`),
        '/__css_hot_loader.js',
    ]

    ctx.type = 'text/html; charset=utf-8'
    ctx.body = await ejs.asyncRenderFile('./site/index.html', {
        scripts,
        env: 'development',
        appName: config.appName,
        description: '',
    })
})

export default router
