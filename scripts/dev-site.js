const fs = require('fs')
const path = require('path')
// Nodejs文件监控chokidar
const chokidar = require('chokidar')
// 删除文件
const rimraf = require('rimraf')
const ejs = require('./ejs')

const pagesPath = path.resolve(__dirname, '../site/pages')
const chunkPath = path.resolve(__dirname, '../site/chunks')
const componentPath = path.resolve(pagesPath, './components')

const componentsCache = {}
let lastComponentText = null

function getGroups() {
  return JSON.parse(fs.readFileSync(path.resolve(componentPath, 'group.json')))
}

// 获取当前行的指定内容
function getComment(text, key) {
  const index = text.indexOf(key)
  if (index >= 0) {
    return text.substr(index + key.length).trim()
  }

  return null
}

function getComponentPage(name, file) {
  const pagePath = path.resolve(componentPath, name)

  let page = componentsCache[name]
  if (page && file.indexOf(pagePath) < 0) {
    return page
  }

  page = {
    codes: [],
    examples: [],
    group: '',
    name,
  }

  // 左侧栏分类逻辑

  const componentGroups = getGroups()

  Object.keys(componentGroups).forEach(k => {
    const g = componentGroups[k]
    if (g[name] !== undefined) {
      page.group = k
      page.cn = g[name]
    }
  })

  // 获取实例代码
  fs.readdirSync(pagePath)
    .filter(n => n.indexOf('example-') === 0 || n.indexOf('code-') === 0)
    .forEach(e => {
      const text = fs.readFileSync(path.resolve(pagePath, e))
      // 获取example内代码
      const comment = /(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/.exec(text)
      const exam = { path: e, cn: '', en: '' }

      if (comment) {
        let langlabel = ''
        comment[0].split('\n').forEach(t => {
          // t example当前行

          // exam.cn 拼接描述与代码
          // Demo：site/pages/components/Alert/example-1-base.js
          // 获取当前中英文状态
          if (t.trim().indexOf('* cn -') >= 0) {
            langlabel = 'cn'
            exam.cn = getComment(t, '* cn -')
            return
          }
          if (t.trim().indexOf('* en -') >= 0) {
            langlabel = 'en'
            exam.en = getComment(t, '* en -')
            return
          }

          // 获取副标题 如 基本的使用 Basic usage
          if (t.indexOf('--') >= 0) {
            if (langlabel === 'cn') {
              exam.cn += ` \\n ${getComment(t, '--')}`
            } else if (langlabel === 'en') {
              exam.en += ` \\n ${getComment(t, '--')}`
            }
          }
        })
      }

      if (e.indexOf('example-') === 0) {
        page.examples.push(exam)
      } else {
        page.codes.push(exam.path.replace('code-', '').replace('.js', ''))
      }
    })

  const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-page.ejs'), 'utf-8'))
  const text = template({ ...page })

  if (!componentsCache[name] || text !== componentsCache[name].text) {
    console.log(`write file chunks/Components/${name}.js`)
    fs.writeFileSync(path.resolve(chunkPath, './Components', `${name}.js`), text)
    page.text = text
  }

  componentsCache[name] = page

  return page
}

// 生成chunks/Components/index
function generateComponents(file = '') {
  // 获取ejs模板文件
  const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-index.ejs'), 'utf-8'))
  const componentGroups = getGroups()

  const groups = {}
  Object.keys(componentGroups).forEach(key => {
    groups[key] = []
  })

  fs.readdirSync(componentPath).forEach(dirName => {
    // lstatSync 获取文件信息
    const state = fs.lstatSync(`${componentPath}/${dirName}`)
    if (state.isDirectory()) {
      const page = getComponentPage(dirName, file)
      if (page) {
        groups[page.group].push(page)
      }
    }
  })

  const text = template({ groups })

  if (lastComponentText !== text) {
    console.log('write file chunks/Components/index.js')
    // 将模板内容写入chunks/Components/index
    fs.writeFile(path.resolve(chunkPath, './Components/index.js'), text, err => {
      if (err) console.log(err)
    })
    lastComponentText = text
  }
}

function init() {
  const cp = path.resolve(chunkPath, './Components')

  // 存在目录 删除
  if (fs.existsSync(cp)) {
    rimraf.sync(cp)
  }
  // 生成文件夹
  fs.mkdirSync(cp)

  generateComponents()

  if (process.env.NODE_ENV !== 'production') {
    console.log('watch site/pages')

    // chokidar 监听文件
    // 文件改变更新
    chokidar.watch(componentPath, { ignored: /index\.js$/, ignoreInitial: true }).on('all', (e, p) => {
      generateComponents(p)
    })
  }
}

module.exports = {
  init,
}

init()
