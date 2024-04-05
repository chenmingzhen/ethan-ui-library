import fs from 'fs'
import path from 'path'
import ejs from './ejs'
import config, { version } from '../config'

const cdn = 'https://unpkg.com'
const dir = `docs-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')
const components = fs.readdirSync(componentPaths).map((c) => c.split('.')[0])

// 创建目录
function createDir(lang) {
    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}`)
    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}/home`)
    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}/components`)
}

const renderEjs = (scripts, description, lang = 'en') =>
    ejs.asyncRenderFile('./site/index.html', {
        description,
        scripts,
        env: 'production',
        appName: lang === 'cn' ? 'Ethan UI 组件库' : 'Ethan UI Library',
    })

async function buildRedirect(lang) {
    const langHtml = await ejs.asyncRenderFile('./site/redirect.html', {
        root: false,
    })

    // 对window.location.href 转发 到 cn/en
    const rootHtml = await ejs.asyncRenderFile('./site/redirect.html', {
        root: true,
    })

    fs.writeFileSync(`${dir}/index.html`, rootHtml)
    fs.writeFileSync(`${dir}/${lang}/index.html`, langHtml)
}

async function buildHtml(lang) {
    createDir(lang)

    const scripts = config.dev.scripts.map((p) => cdn + p)

    // push 入口文件
    Object.keys(config.webpack.entry).forEach((s) => {
        scripts.push(`../../${s}.js`)
    })

    const homeHtml = await renderEjs(scripts, '', lang)

    fs.writeFileSync(`${dir}/${lang}/home/index.html`, homeHtml)

    components.forEach(async (c) => {
        if (c === 'group') return

        const componentHtml = await renderEjs(scripts, `react-${c}`, lang)

        fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, componentHtml)
    })

    buildRedirect(lang)
}

buildHtml('en')
buildHtml('cn')
