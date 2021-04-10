const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = function getCommon(config) {
  const lessLoader = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: {
          'ethan-prefix': process.env.ETHAN_PREFIX || 'ethan',
          ...config.modifyVars,
        },
      },
    },
  ]
  const jsLoaders = [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  ]
  const plugins = [
    new MiniCssExtractPlugin({
      filename: `${config.extractTextPluginPath}`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ETHAN_PREFIX: JSON.stringify(process.env.ETHAN_PREFIX || ''),
        CSS_MODULE: !!process.env.LOCAL_IDENT_NAME,
        LOG_ENV: JSON.stringify(process.env.LOG_ENV || ''),
      },
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json'),
    }),
  ]
  if (config.IGNORE_LESS) {
    jsLoaders.splice(0, 0, { loader: 'remove-less-loader' })
    plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.less$/,
      })
    )
  }
  return {
    optimization: {
      minimizer: [
        // UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件
        // 打包生成的vendors文件由此产生
        new UglifyWebpackPlugin({
          cache: true, // 是否启用文件缓存 ，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
          parallel: true, // 使用多进程并行运行来提高构建速度
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },

    externals: config.externals,

    resolve: {
      alias: config.alias,
      extensions: ['.js', '.json', '.jsx'],
    },

    // 外部loader和自定义loader位置 ignore-loader例子
    resolveLoader: {
      modules: ['node_modules', 'webpack/loaders'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: jsLoaders,
        },

        {
          test: /\.less$/,
          // dev环境 less由cssConfig负责打包
          use: config.DEV ? 'ignore-loader' : lessLoader,
        },

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: './images/[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.(ttf|eot|woff|woff2|otf|svg)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './font/[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },

    plugins,
  }
}
