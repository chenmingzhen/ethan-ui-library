const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommon(config) {
  const lessLoader = [
    // dev 环境 忽然了 less-loader
    // {
    //   loader: MiniCssExtractPlugin.loader,
    // },
    'style-loader',
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
          'so-prefix': process.env.SO_PREFIX || 'so',
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
        SO_PREFIX: JSON.stringify(process.env.SO_PREFIX || ''),
        CSS_MODULE: !!process.env.LOCAL_IDENT_NAME,
        LOG_ENV: JSON.stringify(process.env.LOG_ENV || ''),
      },
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
          use: lessLoader, // config.DEV ? 'ignore-loader' : lessLoader, // 注意这里使样式失效了
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
