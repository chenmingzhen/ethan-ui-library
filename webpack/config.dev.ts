import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'

const cssConfig = config.themes.map((name) =>
    getThemeWebpackConfig({
        mode: 'development',
        name,
        entry: ['./src/styles/style.ts', './site/styles/style.ts'],
        output: {
            publicPath: `http://localhost:${config.dev.publishPort}/`,
            filename: '__css_hot_loader.js',
            // 在不使用 uniqueName 时，热更新时，不同配置产生的模块可能会因为名称相同而产生冲突，导致更新错误地应用或者更新根本没有应用。
            // 这是因为不同构建间的模块ID可能会发生冲突；
            // 加入 uniqueName 后，Webpack 可以通过这个独特的标识来保证每个构建的模块ID是独一无二的，避免了热更新之间的命名冲突。
            // 遵循将 uniqueName 设置为每个构建配置独一无二的值的最佳实践可以避免大多数问题
            uniqueName: name,
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
        publicPath: `http://localhost:${config.dev.publishPort}/`,
        uniqueName: 'app',
    },
    mode: 'development',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-markdown': 'reactMarkdown',
    },
})

export default [jsConfig, ...cssConfig]
