const webpack = require('webpack')
// 注意 webpack-merge版本
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const cssConf = require('./utils/theme.css')

function getEntry(entry) {
  const newEntry = {}
  Object.keys(entry).forEach(key => {
    newEntry[key] = [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${config.dev.webpackPort}`,
      'webpack/hot/only-dev-server',
      entry[key],
    ]
  })
  return newEntry
}

function getPublishPath() {
  if (config.dev.publishPort === 80) return 'http://localhost/'
  return `http://localhost:${config.dev.publishPort}/`
}

// css文件统一打包到__css_hot_loader.js中
const cssConfig = config.themes.map(name =>
  cssConf({
    mode: 'development',
    hot: true,
    name,
    entry: [
      `webpack-dev-server/client?http://localhost:${config.dev.webpackPort}`,
      'webpack/hot/only-dev-server',
      // './src/styles/normalize.less',
      './src/styles/expose.js',
      './src/styles/index.js',
      './src/styles/spin.js',
      // site style
      './site/styles/index.js',
      './site/less-entry.js',
    ],
    output: { publicPath: getPublishPath() },
    clean: false,
    filename: '__css_hot_loader.js',
    prefix: '',
  })
)

// js文件打包位置
const jsConfig = merge(common({ ...config.webpack, DEV: true }), {
  devtool: config.webpack.devtool,
  entry: getEntry(config.webpack.entry),
  output: {
    filename: '[name].js',
    publicPath: getPublishPath(),
    libraryTarget: 'umd',
  },
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = [jsConfig, ...cssConfig]
