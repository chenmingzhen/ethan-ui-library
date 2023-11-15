import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import rimraf from 'rimraf'
import ejs from './ejs'
import Log from './utils/log'

const pagesPath = path.resolve(__dirname, '../site/pages')
const chunkPath = path.resolve(__dirname, '../site/chunks')
const componentExampleRootPath = path.resolve(pagesPath, './components')
const componentExamplePathOptionsCache = {}
const ComponentsGroups = JSON.parse(fs.readFileSync(path.resolve(componentExampleRootPath, 'group.json')).toString())

// 获取当前行的指定内容
function getComment(text, key) {
    const index = text.indexOf(key)

    if (index >= 0) {
        return text.substr(index + key.length).trim()
    }

    return null
}

function buildComponentExamplePage(componentName: string, filePath: string) {
    const componentPagePath = path.resolve(componentExampleRootPath, componentName)

    let componentExamplePageOptions = componentExamplePathOptionsCache[componentName]

    /** 只有目前file所在的目录变化才重新构建 */
    if (componentExamplePageOptions && filePath.indexOf(componentPagePath) < 0) {
        return componentExamplePageOptions
    }

    componentExamplePageOptions = {
        examples: [],
        group: '',
        name: componentName,
    }

    /** 左侧栏分类逻辑 */
    Object.keys(ComponentsGroups).forEach((group) => {
        const classifyGroup = ComponentsGroups[group]

        if (classifyGroup[componentName] !== undefined) {
            componentExamplePageOptions.group = group

            componentExamplePageOptions.cn = classifyGroup[componentName]
        }
    })

    const exampleFileNameList = fs.readdirSync(componentPagePath).filter((n) => n.indexOf('example-') === 0)

    exampleFileNameList.forEach((exampleFileName) => {
        const text = fs.readFileSync(path.resolve(componentPagePath, exampleFileName)).toString()
        // 获取example内注释说明
        const comment = /(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/.exec(text)
        const exam = { path: exampleFileName, cn: '', en: '' }

        if (comment) {
            let langLabel = ''

            comment[0].split('\n').forEach((line) => {
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

        componentExamplePageOptions.examples.push(exam)
    })

    const pageTemplateFunction = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-page.ejs'), 'utf-8'))

    const text = pageTemplateFunction({ ...componentExamplePageOptions })

    if (
        !componentExamplePathOptionsCache[componentName] ||
        text !== componentExamplePathOptionsCache[componentName].text
    ) {
        Log.info(`成功读取${componentName}示例`)

        fs.writeFileSync(path.resolve(chunkPath, './Components', `${componentName}.tsx`), text)

        componentExamplePageOptions.text = text
    }

    componentExamplePathOptionsCache[componentName] = componentExamplePageOptions

    return componentExamplePageOptions
}

let lastComponentRoutePageText = null

function buildComponentRoutePage(filePath = '') {
    const groups = {}

    Object.keys(ComponentsGroups).forEach((type) => {
        Object.keys(ComponentsGroups[type]).forEach((componentName) => {
            const componentExamplePath = `${componentExampleRootPath}/${componentName}`

            if (!fs.existsSync(componentExamplePath)) {
                if (!filePath) {
                    Log.warn(`已配置${componentName}组件，但无示例。`)
                }

                return
            }

            const state = fs.lstatSync(componentExamplePath)

            if (state.isDirectory()) {
                const page = buildComponentExamplePage(componentName, filePath)

                if (page) {
                    if (!groups[page.group]) {
                        groups[page.group] = []
                    }

                    groups[page.group].push(page)
                }
            }
        })
    })

    const templateRender = ejs.compile(fs.readFileSync(path.resolve(__dirname, './component-index.ejs'), 'utf-8'))
    const componentRoutePageText = templateRender({ groups })

    if (lastComponentRoutePageText !== componentRoutePageText) {
        fs.writeFile(path.resolve(chunkPath, './Components/index.tsx'), componentRoutePageText, (err) => {
            if (err) Log.error(err.message)
        })

        lastComponentRoutePageText = componentRoutePageText
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

    buildComponentRoutePage()

    if (process.env.NODE_ENV !== 'production') {
        chokidar
            .watch(componentExampleRootPath, { ignored: /index\.js$/, ignoreInitial: true })
            .on('all', (e, filePath) => {
                Log.info(`文件${filePath}发生改变!`)

                buildComponentRoutePage(filePath)
            })
    }
}

export default initSite
