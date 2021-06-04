const webpack = require('webpack')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function getCommon(config) {
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
    ]

    const minimizer = [
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
    ]

    if (config.DEV) {
        // esbuild 压缩插件
        minimizer.push(
            new ESBuildMinifyPlugin({
                target: 'es2015', // Syntax to compile to (see options below for possible values)
            })
        )
    }

    return {
        optimization: {
            minimizer: minimizer,
        },

        externals: config.externals,

        resolve: {
            alias: config.alias,
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
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
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/],
                    use: [
                        !config.DEV
                            ? {
                                  // 由于生产环境中UglifyWebpackPlugin不支持es6的压缩
                                  // 而且esbuild的target最低为es2015 所以生产环境中使用ts-ignore
                                  loader: 'ts-loader',
                                  options: {
                                      transpileOnly: true, // use transpileOnly mode to speed-up compilation
                                  },
                              }
                            : {
                                  loader: 'esbuild-loader',
                                  options: {
                                      loader: 'tsx',
                                      target: 'es2015',
                                  },
                              },
                        // dev环境 less由cssConfig负责打包 移除所有的less导入 改为var $1={}
                        {
                            // 将tsx中的less的引入代码剔除 在ignore-loader中已经将less的内容置空
                            loader: 'remove-less-loader',
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    // dev环境 less由cssConfig负责打包
                    // 将less文件内容置空
                    use: 'ignore-loader',
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
                                // 以打包后的app.js为基的相对路径  通过require的形式引入 见Image的example
                                name: './images/[name].[ext]',
                                // name: './img/[name].[ext]',
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
