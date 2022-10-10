import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import rimraf from 'rimraf'
import ejs from './ejs'
import Log from './utils/log'

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

function getComponentPage(componentName: string, file: string) {
    const componentPagePath = path.resolve(componentPath, componentName)

    let componentPage = componentsCache[componentName]

    /** 只有目前file所在的目录变化才重新构建 */
    if (componentPage && file.indexOf(componentPagePath) < 0) {
        return componentPage
    }

    componentPage = {
        examples: [],
        group: '',
        name: componentName,
    }

    /** 左侧栏分类逻辑 */
    Object.keys(ComponentsGroups).forEach(group => {
        /** Layout|Form|Feedback */
        const classifyGroup = ComponentsGroups[group]

        if (classifyGroup[componentName] !== undefined) {
            componentPage.group = group

            componentPage.cn = classifyGroup[componentName]
        }
    })

    /** 获取实例代码 */

    const exampleNames = fs.readdirSync(componentPagePath).filter(n => n.indexOf('example-') === 0)

    exampleNames.forEach(exampleName => {
        const text = fs.readFileSync(path.resolve(componentPagePath, exampleName)).toString()
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

        componentPage.examples.push(exam)
    })

    const pageTemplateFunction = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-page.ejs'), 'utf-8'))

    const text = pageTemplateFunction({ ...componentPage })

    if (!componentsCache[componentName] || text !== componentsCache[componentName].text) {
        Log.success(`write file chunks/Components/${componentName}.js`)

        fs.writeFileSync(path.resolve(chunkPath, './Components', `${componentName}.js`), text)

        componentPage.text = text
    }

    componentsCache[componentName] = componentPage

    return componentPage
}

/** 生成chunks */
function generateComponents(file = '') {
    /** 获取ejs模板文件 */
    const indexTemplateFunction = ejs.compile(
        fs.readFileSync(path.resolve(__dirname, './component-index.ejs'), 'utf-8')
    )

    const groups = {}

    Object.keys(ComponentsGroups).forEach(key => {
        groups[key] = []
    })

    fs.readdirSync(componentPath).forEach(dirName => {
        /** lstatSync 获取文件信息 */
        const state = fs.lstatSync(`${componentPath}/${dirName}`)

        if (state.isDirectory()) {
            const page = getComponentPage(dirName, file)

            if (page) {
                groups[page.group].push(page)
            }
        }
    })

    const text = indexTemplateFunction({ groups })

    if (lastComponentText !== text) {
        Log.success('write file chunks/Components/index.js')

        /** 将模板内容写入chunks/Components/index */
        fs.writeFile(path.resolve(chunkPath, './Components/index.js'), text, err => {
            if (err) Log.error(err.message)
        })

        lastComponentText = text
    }
}

function initSite() {
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
        chokidar.watch(componentPath, { ignored: /index\.js$/, ignoreInitial: true }).on('all', (e, file) => {
            generateComponents(file)

            Log.info(`${file} has changed!`)
        })
    }
}

export default initSite
