import got from 'got'
import Koa from 'koa'
import send from 'koa-send'
import Router from 'koa-router'
import multer from 'koa-multer'
import fs from 'fs'
import webpack, { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack/config.dev'
import config from './config'
import { version } from './package.json'
import ejs from './scripts/ejs'
import Log from './scripts/utils/log'
import initSite from './scripts/dev-site'

initSite()

const devServer = new WebpackDevServer(
    { port: config.dev.webpackPort, client: { overlay: false } },
    webpack(webpackConfig as Configuration)
)

devServer.startCallback(e => {
    if (e) {
        console.log(e)
    }
})

/** 开发环境Upload上传处理的文件 */
if (!fs.existsSync('temp')) {
    fs.mkdirSync('temp')
}

// dev server ================================================
const app = new Koa()
const router = new Router()

// use devlopment version React
router.get('**/react.production.min.js', async ctx => {
    await send(ctx, 'node_modules/react/umd/react.development.js')
})
router.get('**/react-dom.production.min.js', async ctx => {
    await send(ctx, 'node_modules/react-dom/umd/react-dom.development.js')
})

/** Upload Example中使用 */
router.get('**/jszip.min.js', async ctx => {
    await send(ctx, 'node_modules/jszip/dist/jszip.min.js')
})

router.get('/images/*', async ctx => {
    await send(ctx, `site/${ctx.path}`)
})

/** 不使用中间件的保存位置配置 自行读入文件 */
/** upload.single的中name要与表单的一致 */
const upload = multer({})
router.post('/upload/', upload.single('file'), async ctx => {
    fs.writeFileSync(`temp/${ctx.req.file.originalname}`, ctx.req.file.buffer)
    ctx.body = {
        success: true,
        model: {
            id: Date.now().toString(),
            name: ctx.req.file.originalname,
        },
    }
})

// dev code proxy
// 处理app.js 热模块更新
router.get(config.dev.scriptPath, async (ctx, next) => {
    /** @type string|string[] */
    let url = ctx.url.split('/')

    url = url[url.length - 1]
    ;[url] = url.split('?')

    if (url.endsWith('.Form') || url.endsWith('.List')) {
        await next()
    } else {
        const options = {
            url: `http://localhost:${config.dev.webpackPort}/${url}`,
            method: 'GET',
        }

        if (url.endsWith('.css')) {
            ctx.set('Content-Type', 'text/css; charset=utf-8')
        }

        ctx.set('Access-Control-Allow-Origin', '*')

        ctx.body = await got(options.url)
            .then(data => data.body)
            .catch(e => {
                Log.error(e, options.url)
            })
    }
})

// react-hot-loader proxy
router.get('/*.hot-update.js(on)?', async ctx => {
    const options = {
        url: `http://localhost:${config.dev.webpackPort}/${ctx.url}`,
        method: 'GET',
    }

    ctx.set('Access-Control-Allow-Origin', '*')

    ctx.body = await got(options.url).then(data => data.body)
})

router.get('/*', async ctx => {
    if (ctx.url === '/') ctx.redirect('/cn/index/')
    const reactVersion = ctx.query.v
    if (reactVersion) {
        ctx.body = await ejs.asyncRenderFile('./site/index-v.html', { version: reactVersion })
        return
    }
    const prepath = config.dev.scriptPath.replace('**', version)
    const scripts = [
        ...(config.dev.scripts || []),
        ...Object.keys(config.webpack.entry).map(s => prepath.replace('*.*', `${s}.js`)),
        '/__css_hot_loader.js',
    ]

    ctx.type = 'text/html; charset=utf-8'
    // 页面真正的渲染处理 通过ejs渲染处理 将参数传给模板
    // 页面中引入/site/index.js 进而显示web页面
    ctx.body = await ejs.asyncRenderFile('./site/index.html', {
        scripts,
        env: 'development',
        appName: config.appName,
        description: '',
    })
})

app.use(router.routes())

app.listen(config.dev.publishPort, () => {
    console.log(`server running on http://localhost${config.dev.publishPort}`)
})
