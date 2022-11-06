import fs = require('fs')
import path = require('path')
import ejs = require('ejs')
import pack = require('../package.json')

const rootPath = path.resolve(__dirname, '../src')

const componentsPath = path.join(rootPath, '/component')

/**
 * @todo finish  table then remove de filter for them
 */
const ignoreComponents = ['List', 'Table']

const files = fs
    .readdirSync(componentsPath)
    // lstat获取文件信息（不解析符号链接）。
    .filter((n) => fs.lstatSync(path.resolve(componentsPath, n)).isDirectory() && /^[A-Z]/.test(n))
    .filter((v) => !ignoreComponents.includes(v))

const line = `/** Created by scripts/src-index.ts.  */
/** Do not manually change. */
/** Please run build-index to build index.ts */

export { setLocale } from './locale'
export { default as config, setConfig } from './config'
export { style } from './utils/style'
export { FontAwesome } from './component/Icon'
export { default as Lazyload } from './component/LazyLoad'

<% files.forEach(function (name) { -%>
export { default as <%= name %> } from './component/<%= name %>'
<% }) -%>`

const text = ejs.render(line, { files, version: pack.version })
fs.writeFileSync(`${rootPath}/index.ts`, text)
