const { merge } = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const cssConf = require('./utils/theme.css')

/** @see http://gaearon.github.io/react-hot-loader/getstarted/ */

/**  What's the difference between webpack/hot/dev-server and webpack/hot/only-dev-server */
/** @see https://github.com/webpack/webpack-dev-server/issues/658 */

const cssConfig = config.themes.map(name =>
    cssConf({
        mode: 'development',
        name,
        entry: [
            './src/styles/normalize.less',
            './src/styles/expose.ts',
            './src/styles/index.ts',
            './src/styles/spin.ts',
            // site style
            './site/styles/index.ts',
            './site/less-entry.ts',
        ],
        output: { publicPath: `http://localhost:${config.dev.publishPort}/` },
        clean: false,
        // now filename is placeholder
        // next line has been removed
        filename: `__css_hot_loader.js`,
        prefix: '',
    })
)

// js文件打包位置
// 默认的css样式也会被打包进app.js
// site加载完毕 随着cssConfig将theme打包完成 site/utils/theme.js被添加进页面 所以样式的文件名为主题.css
const jsConfig = merge(common({ ...config.webpack, DEV: true }), {
    
    devtool: config.webpack.devtool,
    entry: config.webpack.entry,
    output: {
        filename: '[name].js',
        /** 指示打包生成的路径，热更新请求publicPath的资源 */
        publicPath: `http://localhost:${config.dev.publishPort}/`,
        libraryTarget: 'umd',
    },
    mode: 'development',
})

module.exports = [jsConfig, cssConfig[0]]
