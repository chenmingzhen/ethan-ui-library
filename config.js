const path = require('path')
const fs = require('fs')

const versions = {}
;['react', 'react-dom', 'prop-types', 'jszip', 'docsearch.js'].forEach(lib => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'node_modules/', lib, 'package.json')))
  versions[lib] = pkg.version
})

module.exports = {
  appName: 'Ethan',
  dev: {
    publishPort: 3000,
    webpackPort: 3001,
    scriptPath: '/*.*',
    scripts: [
      `/react@${versions.react}/umd/react.production.min.js`,
      `/react-dom@${versions['react-dom']}/umd/react-dom.production.min.js`,
      `/prop-types@${versions['prop-types']}/prop-types.min.js`,
      `/jszip@${versions.jszip}/dist/jszip.min.js`,
    ],
    styles: [
      /* `/docsearch.js@${versions['docsearch.js']}/dist/cdn/docsearch.css` */
    ],
  },
  themes: ['default'], // themes: ['default', 'antd', 'antd2', 'ethan'],
  webpack: {
    entry: {
      app: './site/index.js',
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
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
    },
  },
}
