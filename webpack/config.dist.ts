/** 构建CDN库链接和样式 */
import path from 'path'
import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'

const cssConfig = config.themes.map((name) =>
    getThemeWebpackConfig({
        name,
        entry: ['./src/styles/style.ts'],
        output: { path: path.join(__dirname, '../publish/dist'), uniqueName: name },
    })
)

const jsConfig = merge(getCommonConfig({ Dev: false }), {
    stats: { children: false },
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, '../publish/dist'),
        libraryTarget: 'umd',
        library: 'Ethan',
        filename: 'Ethan.min.js',
        uniqueName: 'Ethan',
    },
    /** @see https://webpack.docschina.org/configuration/externals/ */
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
    mode: 'production',
})

export default [jsConfig, ...cssConfig]
