const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const rootPath = path.resolve(__dirname, '../src')

const componentsPath = path.join(rootPath, '/component')

const files = fs
  .readdirSync(componentsPath)
  // lstat获取文件信息（不解析符号链接）。
  .filter(n => fs.lstatSync(path.resolve(componentsPath, n)).isDirectory() && /^[A-Z]/.test(n))
  // TODO finish form and table then remove de filter for them
  .filter(v => v !== 'List' && v !== 'DataList' && v !== 'Form' && v !== 'Table')

const line = `// Created by scripts/src-index.js.
import './styles/normalize.less'

export { setLocale } from './locale'
export { default as config, setConfig } from './config'

export { FontAwesome } from './component/Icon'
export { default as Lazyload } from './component/LazyLoad'

<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './component/<%= name %>'
<% }) -%>`

const text = ejs.render(line, { files, version: pack.version })
fs.writeFileSync(`${rootPath}/index.js`, text)
