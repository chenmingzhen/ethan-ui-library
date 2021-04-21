// build CDN links way and css style

const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const cssConf = require('./utils/theme.css')

const cssConfig = config.themes.map(name =>
  cssConf({
    name,
    entry: ['./src/styles/normalize.less', './src/styles/expose.ts', './src/styles/index.ts', './src/styles/spin.ts'],
    output: { path: path.join(__dirname, '../publish/dist') },
    clean: true,
  })
)

const jsConfig = merge(common({ ...config.webpack, IGNORE_LESS: true }), {
  stats: { children: false },
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '../publish/dist'),
    libraryTarget: 'umd',
    library: 'Ethan',
    filename: 'Ethan.min.js',
  },
  mode: 'production',
})

module.exports = [jsConfig, ...cssConfig]
