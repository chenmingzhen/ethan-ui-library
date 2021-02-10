const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pack = require('../package')

const rootPath = path.resolve(__dirname, '../src')
const files = fs
  .readdirSync(rootPath)
  .filter(n => fs.lstatSync(path.resolve(rootPath, n)).isDirectory() && /^[A-Z]/.test(n))
  .filter(v => v !== 'List' && v !== 'DataList')

const line = `// Created by scripts/src-index.js.
import './styles/normalize.less'

export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig } from './config'

export { default as LazyList } from './List/LazyList'
export { default as List } from './DataList'
<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './<%= name %>'
<% }) -%>`

const text = ejs.render(line, { files, version: pack.version })
fs.writeFileSync(`${rootPath}/index.js`, text)
