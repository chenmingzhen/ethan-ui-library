const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const pkg = require('../package.json')
const cssConf = require('./utils/theme.css')

const dir = pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)

// build css style
const cssConfig = config.themes.map(name =>
  cssConf({
    name,
    entry: [
      './src/styles/normalize.less',
      './src/styles/expose.ts',
      './src/styles/index.ts',
      './src/styles/spin.ts',
      // site style
      './site/styles/index.ts',
      './site/less-entry.ts',
    ],
    output: { path: path.join(__dirname, `../docs-pages/${dir}x`) },
    clean: true,
    prefix: '',
  })
)

// build app.js
// 目录js 由 webpackChunkName:XXX 见chunks/Components/index
// Lazy loading 懒加载
const jsConfig = merge(common({ ...config.webpack, DEV: true }), {
  stats: { children: false },
  devtool: config.webpack.devtool,
  entry: config.webpack.entry,
  output: {
    path: path.join(__dirname, `../docs-pages/${dir}x`),
    // 打包后资源的指定前缀 这里指app.js 生成 ../../app.js
    // https://webpack.docschina.org/configuration/output/#outputpublicpath
    // 以打包后html为基准
    publicPath: '../../',
    libraryTarget: 'umd',
    library: 'EthanDoc',
  },
  mode: 'production',
})

module.exports = [jsConfig, ...cssConfig]
