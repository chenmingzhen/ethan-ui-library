import webpack, { Configuration, RuleSetRule } from 'webpack'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyWebpackPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import config from '../../config'

export function getLessLoader(name: string) {
    const loaders: Configuration['loader'] = [
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
                lessOptions: {
                    /** 通过modifyVars 修改默认的主题 对应less文件的变量 */
                    modifyVars: {
                        'ethan-prefix': process.env.ETHAN_PREFIX || 'ethan',
                        'ethan-theme': name,
                    },
                },
            },
        },
    ]

    return loaders
}

interface GetCommonConfigOptionParams {
    Dev: boolean
}

export function getCommonConfig(options: GetCommonConfigOptionParams) {
    const { Dev } = options

    const rules: RuleSetRule[] = [
        /** dev环境 less由cssConfig负责打包 */
        /** 将less文件内容置空 */
        {
            test: /\.less$/,
            use: path.resolve(__dirname, '../loaders/ignore-loader.ts'),
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
                        /** 以打包后的app.js为基的相对路径  通过require的形式引入 见Image的example */
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
    ]

    const jsxRule: RuleSetRule = {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
    }

    /** dev环境 less由cssConfig负责打包 移除所有的less导入 改为var $1={} */
    /** 将tsx中的less的引入代码剔除 在ignore-loader中已经将less的内容置空 */
    const tsxRule: RuleSetRule = {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
    }

    if (Dev) {
        jsxRule.use = [
            {
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',
                    target: 'es2015',
                },
            },
        ]

        tsxRule.use = [
            {
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015',
                },
            },
            {
                loader: path.resolve(__dirname, '../loaders/remove-less-loader.ts'),
            },
        ]
    } else {
        jsxRule.use = [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
        ]

        tsxRule.use = [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                loader: path.resolve(__dirname, '../loaders/remove-less-loader.ts'),
            },
        ]
    }

    rules.unshift(...[jsxRule, tsxRule])

    const commonConfig: Configuration = {
        module: {
            rules,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
            alias: config.webpack.alias,
            /** webpack5中不提供path模块 */
            /** @see https://webpack.docschina.org/configuration/resolve/#resolvefallback */
            /** @see https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5 */
            fallback: {
                path: require.resolve('path-browserify'),
            },
        },
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
        optimization: {
            minimizer: [
                /** UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件 */
                new UglifyWebpackPlugin({
                    cache: true, // 是否启用文件缓存 ，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
                    parallel: true, // 使用多进程并行运行来提高构建速度
                    uglifyOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    ETHAN_PREFIX: JSON.stringify(process.env.ETHAN_PREFIX || ''),
                },
            }),
            /** @see https://webpack.docschina.org/plugins/provide-plugin/#root */
            /** https://github.com/vfile/vfile/issues/38 */
            /** webpack5中不提供process模块 */
            /** process 在浏览器环境中不存在 需要垫片支持 */
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            Dev && new ReactRefreshWebpackPlugin({ overlay: { sockPort: config.dev.webpackPort } }),
        ].filter(Boolean),
    }

    return commonConfig
}

interface GetThemeWebpackConfigParams {
    name: string
    entry: Configuration['entry']
    output: Configuration['output']
    prefix?: string
    mode?: 'production' | 'development'
    clean?: boolean
    Dev?: boolean
}

export function getThemeWebpackConfig(options: GetThemeWebpackConfigParams) {
    const { name, entry, output, prefix = 'theme', mode = 'production', clean = false, Dev = false } = options

    const themeConfig: Configuration = {
        mode,
        entry,
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
        resolveLoader: {
            modules: ['node_modules', 'webpack/loaders'],
        },
        resolve: {
            alias: config.webpack.alias,
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        },
        output,
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: getLessLoader(name),
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: [/node_modules/],
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
        },
        plugins: [
            // 打包后样式的名字 对应default antd ethan的.css
            // 样式请求到这里
            // css 单独打包
            // 打包结果 会结合所有的less  例如现在打包入口的normalize.less
            // 在normalize.less中添加body background red  name.css也会填充  name.css结合所有的less打包结果 生成一个请求链接
            // localhost:3000/name.css
            new MiniCssExtractPlugin({
                filename: prefix ? `${prefix}.${name}.css` : `${name}.css`,
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            clean && new CleanWebpackPlugin(),
            Dev && new ReactRefreshWebpackPlugin({ overlay: { sockPort: config.dev.webpackPort } }),
        ].filter(Boolean),
    }

    return themeConfig
}
