import webpack, { Configuration, RuleSetRule } from 'webpack'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import config from '../../config'

export function getLessLoader(name: string): Configuration['loader'] {
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
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: [/node_modules/],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-typescript'],
                    },
                },
            ],
        },
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

    const commonConfig: Configuration = {
        module: {
            rules,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
            alias: config.webpack.alias,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    ETHAN_PREFIX: JSON.stringify(process.env.ETHAN_PREFIX || ''),
                },
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
}

export function getThemeWebpackConfig(options: GetThemeWebpackConfigParams) {
    const { name, entry, output, prefix = 'theme', mode = 'production' } = options

    /** 打包css生成的无用js文件 */
    const CSS_TEMP_JS = `temp_${name}.js`

    const themeConfig: Configuration = {
        mode,
        entry,
        optimization: {
            minimizer: [new CssMinimizerPlugin()],
        },
        resolveLoader: {
            modules: ['node_modules', 'webpack/loaders'],
        },
        resolve: {
            alias: config.webpack.alias,
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        },
        output: {
            ...output,
            filename: mode === 'production' ? CSS_TEMP_JS : output.filename,
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: getLessLoader(name),
                },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/preset-typescript'],
                            },
                        },
                    ],
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
            /** @see https://www.npmjs.com/package/clean-webpack-plugin */
            mode === 'production' &&
                new CleanWebpackPlugin({
                    /** CSS_TEMP_JS是Webpack构建过程中生成的资产,需要取消保护才能删除掉 */
                    protectWebpackAssets: false,
                    cleanAfterEveryBuildPatterns: [CSS_TEMP_JS],
                    /** 打包前不删除target目录 */
                    cleanOnceBeforeBuildPatterns: [],
                }),
            mode === 'development' && new ReactRefreshWebpackPlugin({ overlay: { sockPort: config.dev.webpackPort } }),
        ].filter(Boolean),
    }

    return themeConfig
}
