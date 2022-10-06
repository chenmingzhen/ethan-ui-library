import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'

const cssConfig = config.themes.map(name =>
    getThemeWebpackConfig({
        mode: 'development',
        name,
        entry: ['./src/styles/style.ts', './site/styles/index.ts', './site/less-entry.ts'],
        output: {
            publicPath: `http://localhost:${config.dev.publishPort}/`,
            filename: '__css_hot_loader.js',
            uniqueName: '__css_hot_loader',
        },
        prefix: '',
    })
)

const jsConfig = merge(getCommonConfig({ Dev: true }), {
    devtool: config.webpack.devtool,
    entry: config.webpack.entry,
    output: {
        filename: '[name].js',
        /** 指示打包生成的路径，热更新请求publicPath的资源 */
        uniqueName: '[name]',
        publicPath: `http://localhost:${config.dev.publishPort}/`,
        library: {
            type: 'umd',
        },
    },
    mode: 'development',
})

export default [jsConfig, ...cssConfig]
