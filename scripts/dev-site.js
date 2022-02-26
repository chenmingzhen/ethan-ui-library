/**
 *@description 读取pages/components下的组件md以及example,使用ejs将每个组件的信息作为一个chunk放置site/chunk,生成导出文件index.ts
 */
const fs = require('fs')
const path = require('path')
// Nodejs文件监控chokidar
const chokidar = require('chokidar')
const rimraf = require('rimraf')
const ejs = require('./ejs')
const Log = require('./utils/log')

const pagesPath = path.resolve(__dirname, '../site/pages')
const chunkPath = path.resolve(__dirname, '../site/chunks')
const componentPath = path.resolve(pagesPath, './components')

const componentsCache = {}
const ComponentsGroups = JSON.parse(fs.readFileSync(path.resolve(componentPath, 'group.json')).toString())

let lastComponentText = null

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
        examples: [],
        group: '',
        name,
    }

    /** 左侧栏分类逻辑 */
    Object.keys(ComponentsGroups).forEach(group => {
        /** Layout|Form|Feedback */
        const classifyGroup = ComponentsGroups[group]

        if (classifyGroup[name] !== undefined) {
            page.group = group

            page.cn = classifyGroup[name]
        }
    })

    /** 获取实例代码 */

    const exampleNames = fs.readdirSync(pagePath).filter(n => n.indexOf('example-') === 0)

    exampleNames.forEach(exampleName => {
        const text = fs.readFileSync(path.resolve(pagePath, exampleName)).toString()
        // 获取example内注释说明
        const comment = /(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/.exec(text)
        const exam = { path: exampleName, cn: '', en: '' }

        if (comment) {
            let langLabel = ''

            comment[0].split('\n').forEach(line => {
                // Demo：site/pages/components/Alert/example-1-base.js
                // 获取当前中英文状态

                // 标题
                if (line.trim().indexOf('* cn -') >= 0) {
                    langLabel = 'cn'
                    exam.cn = getComment(line, '* cn -')
                    return
                }

                if (line.trim().indexOf('* en -') >= 0) {
                    langLabel = 'en'
                    exam.en = getComment(line, '* en -')
                    return
                }

                // 获取副标题 如 基本的使用 Basic usage
                if (line.indexOf('--') >= 0) {
                    if (langLabel === 'cn') {
                        exam.cn += ` \\n ${getComment(line, '--')}`
                    } else if (langLabel === 'en') {
                        exam.en += ` \\n ${getComment(line, '--')}`
                    }
                }
            })
        }

        page.examples.push(exam)
    })

    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-page.ejs'), 'utf-8'))

    const text = template({ ...page })

    if (!componentsCache[name] || text !== componentsCache[name].text) {
        Log.success(`write file chunks/Components/${name}.js`)

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

    const groups = {}

    Object.keys(ComponentsGroups).forEach(key => {
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
        Log.success('write file chunks/Components/index.js')

        // 将模板内容写入chunks/Components/index

        fs.writeFile(path.resolve(chunkPath, './Components/index.js'), text, err => {
            if (err) Log.error(err.message)
        })
        lastComponentText = text
    }
}

function init() {
    if (fs.existsSync(chunkPath)) {
        rimraf.sync(chunkPath)
    }

    fs.mkdirSync(chunkPath)

    const chunksComponentsPath = path.resolve(chunkPath, './Components')

    if (fs.existsSync(chunksComponentsPath)) {
        rimraf.sync(chunksComponentsPath)
    }

    fs.mkdirSync(chunksComponentsPath)

    generateComponents()

    if (process.env.NODE_ENV !== 'production') {
        Log.info('watch site/pages')

        // 文件改变更新
        chokidar.watch(componentPath, { ignored: /index\.js$/, ignoreInitial: true }).on('all', (e, p) => {
            generateComponents(p)

            Log.info(`${p} has changed!`)
        })
    }
}

module.exports = {
    init,
}

init()
