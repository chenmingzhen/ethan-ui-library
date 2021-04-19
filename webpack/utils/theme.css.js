const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const config = require('../../config')

const lessLoader = (name, hot) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    // {
    //   loader: 'var-polyfill-loader',
    // },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'less-loader',
      options: {
        // 通过modifyVars 修改默认的主题 对应less文件的变量
        modifyVars: {
          'ethan-prefix': process.env.ETHAN_PREFIX || 'ethan',
          'ethan-theme': name,
        },
      },
    },
  ]
  if (hot) loaders.splice(0, 0, { loader: 'css-hot-loader' })
  return loaders
}

module.exports = function({ name, hot, entry, output, clean, prefix = 'theme', mode = 'production' }) {
  const conf = {
    mode,
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    entry,
    resolveLoader: {
      modules: ['node_modules', 'webpack/loaders'],
    },
    resolve: {
      alias: config.webpack.alias,
    },
    output: {
      ...output,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: lessLoader(name, hot),
        },
      ],
    },
    plugins: [
      // 打包后样式的名字 对应default antd ethan的.css
      // 样式请求到这里
      // css 单独打包
      // 打包结果 会结合所有的less  例如现在打包入口的normalize.less
      // 在  normalize.less中添加body background red  name.css也会填充  name.css结合所有的less打包结果 生成一个请求链接
      // localhost:3000/name.css
      new MiniCssExtractPlugin({
        filename: prefix ? `${prefix}.${name}.css` : `${name}.css`,
      }),
    ],
  }

  if (clean) {
    conf.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ['_temp.file'],
        cleanOnceBeforeBuildPatterns: [],
      })
    )
  }
  if (hot) conf.plugins.push(new webpack.HotModuleReplacementPlugin())
  return conf
}
