import fs = require('fs')
import path = require('path')
import ejs = require('ejs')
import glob = require('glob')
import ts = require('typescript')

interface MarkDownData {}

const GlobSync = glob.sync

const srcPath = path.resolve(__dirname, '../src')
const libPath = path.resolve(__dirname, '../publish/lib')
const sitePath = path.resolve(__dirname, '../site/pages/components')
const template = fs.readFileSync(path.resolve(__dirname, './component-declare.ejs'), 'utf-8')

const segmentation = '--- |'

const ignoreModule = ['Icons', 'List', 'start']

if (!fs.existsSync(libPath)) fs.mkdirSync(libPath, { recursive: true })

const markdown = GlobSync('**/en.md', { cwd: sitePath })

const parseTable = content => {
  // 获取每一行
  const lines = content.split('\n')
  // 存储每一行的Props数据
  const list = []
  // 判断TableContent是否为有效内容
  if (content.indexOf('| ') === -1) return []
  // 行数遍历
  lines.forEach(line => {
    if (!line.trim()) return
    // 替换\|
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw
    // console.log`Hello`
    const replaced = String.raw`${line}`.replace(/\\\|/g, '#REP#')

    const [attribute, type, def, desc] = replaced
      .split('|')
      .filter(v => !!v)
      .map(v => v.trim())
      .map(d => d.replace(/#REP#/g, '|'))
      .map(d => d.replace('\\[', '['))

    list.push({
      attribute,
      type,
      def,
      desc,
    })
  })
  return list
}

/**
 *
 * @param c markdown 文件内容
 * @param name 组件名字
 * @returns
 */
const readMarkdown = (c, name) => {
  const data = []
  let content = c

  // 先匹配 如 ### DropdownData Dropdown.md的内容
  const dataDclare = content.search(new RegExp(`### ${name}[a-zA-Z]`))

  // 存在 ### ComponentNameXXX的形式 截取到###的前面
  if (dataDclare >= 0) content = content.substring(0, dataDclare)

  // 截取组件中还有附属组件的情况 Button Button.Group
  const index = content.search(new RegExp(`### ${name}[. \n]`))
  if (index === -1) {
    // 只有一个组件 如Avatar
    const table = content.substring(content.lastIndexOf(segmentation) + segmentation.length)

    data.push({
      name,
      props: parseTable(table),
    })
  } else {
    // 多个组件 如Alert Alert.ScrollAlert
    const apis = content
      .substring(index)
      .split('###')
      .filter(v => !!v)
    apis.forEach(api => {
      let componentName = api.substring(0, api.indexOf('\n')).trim()
      if (componentName.indexOf('*') !== -1) {
        componentName = componentName.substring(0, componentName.indexOf('*')).trim()
      }
      // multiple components inline
      if (componentName.indexOf(',') !== -1) {
        const names = componentName.split(',').map(v => v.trim())
        names.forEach(item => {
          data.push({
            name: item.replace('.', ''),
            props: parseTable(api.substring(api.indexOf('\n'))),
          })
        })
        return
      }
      data.push({
        name: componentName.replace('.', ''),
        props: parseTable(api.substring(api.indexOf('\n'))),
      })
    })
  }
  return data
}

markdown.forEach(p => {
  // p Alert/en.md
  const componentName = path.dirname(p)
  // componentName Alert

  if (ignoreModule.includes(componentName)) return

  const componentDir = path.resolve(libPath, componentName)
  if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir)

  const srcIndexDTs = path.resolve(srcPath, componentName, 'index.d.ts')
  const fullPath = path.resolve(componentDir, 'index.d.ts')

  if (fs.existsSync(srcIndexDTs)) {
    fs.copyFileSync(srcIndexDTs, fullPath, fs.constants.COPYFILE_FICLONE)
  } else {
    const content = fs.readFileSync(path.resolve(sitePath, p), 'utf-8')
    const data = readMarkdown(content, componentName)
    const declare = ejs.render(template, { data })
    fs.writeFileSync(fullPath, declare)
    // validator
    const dangerous = ts.createProgram([fullPath], { allowJs: true }).getSyntacticDiagnostics()
    if (dangerous.length)
      throw new Error(
        `The generated declaration file: <${fullPath}> does not meet the standards, please check your api documentation: <${p}>`
      )
  }
})

// copy index
fs.copyFileSync(path.resolve(srcPath, 'index.js'), path.resolve(libPath, 'index.d.ts'))
