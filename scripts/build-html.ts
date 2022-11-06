import fs from 'fs'
import path from 'path'
import ejs from './ejs'
import config, { version } from '../config'

const cdn = 'https://unpkg.com'
const dir = `docs-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')

// 创建目录
function createDir(lang) {
    if (!lang) return

    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}`, { recursive: true })
    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}/index`, { recursive: true })
    fs.mkdirSync(`${process.cwd()}/${dir}/${lang}/components`, { recursive: true })
}

const renderEjs = (scripts, description, lang = 'en') =>
    ejs.asyncRenderFile('./site/index.html', {
        description,
        scripts,
        env: 'production',
        appName: lang === 'cn' ? 'Ethan UI 组件库' : 'Ethan UI Library',
    })

async function buildRedirect(lang) {
    const inner = await ejs.asyncRenderFile('./site/redirect.html', {
        inner: true,
    })

    // 对window.location.href 转发 到 cn/en
    const outer = await ejs.asyncRenderFile('./site/redirect.html', {
        inner: false,
    })

    fs.writeFileSync(`${dir}/index.html`, outer)
    fs.writeFileSync(`${dir}/${lang}/index.html`, inner)
}

async function buildHtml(lang) {
    createDir(lang)

    const components = fs.readdirSync(componentPaths).map((c) => c.split('.')[0])

    const scripts = config.dev.scripts.map((p) => cdn + p)

    // push 入口文件
    Object.keys(config.webpack.entry).forEach((s) => {
        scripts.push(`../../${s}.js`)
    })

    const html = await renderEjs(scripts, '', lang)

    fs.writeFileSync(`${dir}/${lang}/index/index.html`, html)

    components.forEach(async (c) => {
        if (c === 'group') return

        const componentHtml = await renderEjs(scripts, `react-${c}`, lang)

        fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, componentHtml)
    })

    buildRedirect(lang)
}

buildHtml('en')
buildHtml('cn')
