import fs = require('fs')
import fsExtra = require('fs-extra')
import path = require('path')
import ejs = require('./ejs')
import pkg = require('../package.json')
import config = require('../config')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const cdn = 'https://unpkg.com'
const dir = `docs-pages/${version}`
const componentPaths = path.resolve(__dirname, '../site/pages/components')
// const documentPaths = path.resolve(__dirname, '../site/pages/documentation')

// 创建目录
function createDir(lang) {
  if (!lang) return
  fs.mkdirSync(`${dir}/${lang}`)
  fs.mkdirSync(`${dir}/${lang}/index`)
  fs.mkdirSync(`${dir}/${lang}/components`)
  // fs.mkdirSync(`${dir}/${lang}/documentation`)
}

// function getDocumentation() {
//   const result = []
//   const docus = fs.readdirSync(documentPaths)
//   docus.forEach(d => {
//     if (d === 'changelog') {
//       fs.readdirSync(`${documentPaths}/changelog`).forEach(c => result.push(c.substring(0, c.length - 3)))
//     } else {
//       const sd = d.split('.')[0]
//       if (sd.startsWith('api')) result.push(sd.split('-')[1].toLowerCase())
//       else result.push(sd)
//     }
//   })
//   return result
// }

const renderEjs = (scripts, styles, description, lang = 'en') =>
  ejs.renderFile(`./site/index.html`, {
    description,
    scripts,
    env: 'production',
    styles,
    appName: lang === 'cn' ? `Ethan UI 组件库` : `Ethan UI Library`,
  })

async function buildRedirect(lang) {
  // TODO 无用 考虑去除
  const inner = await ejs.renderFile(`./site/redirect.html`, {
    inner: true,
  })
  // 对window.location.href 转发 到 cn/en
  const outer = await ejs.renderFile(`./site/redirect.html`, {
    inner: false,
  })
  fs.writeFileSync(`${dir}/index.html`, outer)
  fs.writeFileSync(`${dir}/${lang}/index.html`, inner)
}

async function buildHtml(lang) {
  createDir(lang)

  const components = fs.readdirSync(componentPaths).map(c => c.split('.')[0])
  // const documents = getDocumentation()
  // no style
  const styles = config.dev.styles.map(p => cdn + p)
  const scripts = config.dev.scripts.map(p => cdn + p)

  // push 入口文件
  Object.keys(config.webpack.entry).forEach(s => {
    scripts.push(`../../${s}.js`)
  })

  const html = await renderEjs(scripts, styles, '', lang)

  fs.writeFileSync(`${dir}/${lang}/index/index.html`, html)

  components.forEach(async c => {
    if (c === 'group') return
    const comHtml = await renderEjs(scripts, styles, `react-${c}`, lang)
    fs.writeFileSync(`${dir}/${lang}/components/${c}.html`, comHtml)
  })

  // documents.forEach(async c => {
  //   if (c === 'index') return
  //   const dHtml = await renderEjs(scripts, styles, `shineout-${c}`, lang)
  //   fs.writeFileSync(`${dir}/${lang}/documentation/${c}.html`, dHtml)
  // })

  buildRedirect(lang)
}

buildHtml('en')
buildHtml('cn')

// copy 404
const errorPath = path.resolve(__dirname, '../site/404.html')
fsExtra.copySync(errorPath, `${dir}/404.html`)
