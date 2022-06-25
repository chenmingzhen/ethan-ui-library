const got = require('got')
const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const multer = require('koa-multer')
const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const { execSync } = require('child_process')
const webpackConfig = require('./webpack/config.dev')
const config = require('./config')
const { version } = require('./package.json')
const ejs = require('./scripts/ejs')
const Log = require('./scripts/utils/log')

// 通过ejs生成模板
require('./scripts/dev-site')

//  webpack server ===========================================

// 生成临时打包文件 供后面koa2使用

const devServer = new WebpackDevServer(
    { port: config.dev.webpackPort, client: { overlay: false } },
    webpack(webpackConfig)
)

devServer.startCallback(e => {
    if (e) {
        console.log(e)
    }
})

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

// dll
router.get('**/vendors.dll.js', async ctx => {
    await send(ctx, './webpack/dll/vendors.dll.js')
})

// docs upload中使用
router.get('**/jszip.min.js', async ctx => {
    await send(ctx, 'node_modules/jszip/dist/jszip.min.js')
})

router.get('/images/*', async ctx => {
    await send(ctx, `site/${ctx.path}`)
})

if (!fs.existsSync('temp')) {
    fs.mkdirSync('temp')
}

// 不使用中间件的保存位置配置 自行读入文件
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
    let url = ctx.url.split('/')
    url = url[url.length - 1]
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
    // ctx.body = request(options)
    ctx.body = await got(options.url).then(data => data.body)
})

router.get('/*', async ctx => {
    if (ctx.url === '/') ctx.redirect('/cn/index/')
    const reactVersion = ctx.query.v
    if (reactVersion) {
        ctx.body = await ejs.renderFile('./site/index-v.html', { version: reactVersion })
        return
    }
    const prepath = config.dev.scriptPath.replace('**', version)
    const scripts = [
        ...(config.dev.scripts || []),
        ...Object.keys(config.webpack.entry).map(s => prepath.replace('*.*', `${s}.js`)),
        '/__css_hot_loader.js',
    ]
    const styles = config.dev.styles || []
    ctx.type = 'text/html; charset=utf-8'
    // 页面真正的渲染处理 通过ejs渲染处理 将参数传给模板
    // 页面中引入/site/index.js 进而显示web页面
    ctx.body = await ejs.renderFile(`./site/index.html`, {
        scripts,
        env: 'development',
        appName: config.appName,
        styles,
        description: '',
    })
})

if (config.proxy) config.proxy(router)

app.use(router.routes())

app.listen(config.dev.publishPort, () => {
    console.log(`server running on http://localhost${config.dev.publishPort}`)
})
