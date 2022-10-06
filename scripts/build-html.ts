import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import ejs from './ejs'
import pkg from '../package.json'
import config from '../config'

const { version } = pkg
const cdn = 'https://unpkg.com'
const dir = `docs-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')

// 创建目录
function createDir(lang) {
    if (!lang) return

    fs.mkdirSync(`${dir}/${lang}`)
    fs.mkdirSync(`${dir}/${lang}/index`)
    fs.mkdirSync(`${dir}/${lang}/components`)
}

const renderEjs = (scripts, description, lang = 'en') =>
    ejs.renderFile('./site/index.html', {
        description,
        scripts,
        env: 'production',
        appName: lang === 'cn' ? 'Ethan UI 组件库' : 'Ethan UI Library',
    })

async function buildRedirect(lang) {
    const inner = await ejs.renderFile('./site/redirect.html', {
        inner: true,
    })

    // 对window.location.href 转发 到 cn/en
    const outer = await ejs.renderFile('./site/redirect.html', {
        inner: false,
    })

    fs.writeFileSync(`${dir}/index.html`, outer)
    fs.writeFileSync(`${dir}/${lang}/index.html`, inner)
}

async function buildHtml(lang) {
    createDir(lang)

    const components = fs.readdirSync(componentPaths).map(c => c.split('.')[0])

    const scripts = config.dev.scripts.map(p => cdn + p)

    // push 入口文件
    Object.keys(config.webpack.entry).forEach(s => {
        scripts.push(`../../${s}.js`)
    })

    const html = await renderEjs(scripts, '', lang)

    fs.writeFileSync(`${dir}/${lang}/index/index.html`, html)

    components.forEach(async c => {
        if (c === 'group') return

        const componentHtml = await renderEjs(scripts, `react-${c}`, lang)

        fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, componentHtml)
    })

    buildRedirect(lang)
}

buildHtml('en')
buildHtml('cn')

// copy 404
const errorPath = path.resolve(__dirname, '../site/404.html')
fsExtra.copySync(errorPath, `${dir}/404.html`)
