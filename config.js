const path = require('path')
const fs = require('fs')

const versions = {}
;['react', 'react-dom', 'jszip'].forEach(lib => {
  // @ts-ignore
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'node_modules/', lib, 'package.json')))
  versions[lib] = pkg.version
})

const config = {
  appName: 'Ethan',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    // 以下为docs中需要的脚本 由于react不进行打包 需要koa需要对脚本的请求进行处理
    // example中 import React from 'react' 某种程度上是多余的 因为React是通过link引入的 ，所以未import进来会是undefined
    // 但是不导入React而出现jsx语法 会提示错误 所以象征性导入 无实际意义
    // 通过浏览器可以直接看到React已经成为全局变量 window.React window.JSZIP
    scripts: [
      `/react@${versions.react}/umd/react.production.min.js`,
      `/react-dom@${versions['react-dom']}/umd/react-dom.production.min.js`,
      // upload examples中使用jszip 将jsZip打包进来 window中即存在 window.jszip
      `/jszip@${versions.jszip}/dist/jszip.min.js`,
      // './webpack/dll/vendors.dll.js',
    ],
    styles: [],
  },
  themes: ['default', 'ethan', 'antd'],
  webpack: {
    entry: {
      app: './site/index.tsx',
    },
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].js',
    },
    // for site/
    alias: {
      ethan: path.resolve(__dirname, 'src'),
      docs: path.resolve(__dirname, 'site/Components'),
      doc: path.resolve(__dirname, 'site'),
      '@': path.resolve(__dirname, 'src'),
    },
    devtool: 'cheap-module-source-map',
    // 不打包的模块
    // publish需要用户自行安装
    // docs中通过请求 获取node_modules下的目录
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  },
}

// if (process.env.NODE_ENV === 'development') config.dev.scripts.push('./webpack/dll/vendors.dll.js')

module.exports = config

// export {}
