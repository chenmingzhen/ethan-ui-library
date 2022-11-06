/** 构建CDN库链接和样式 */
import path from 'path'
import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'

const cssConfig = config.themes.map((name) =>
    getThemeWebpackConfig({
        name,
        entry: ['./src/styles/style.ts'],
        output: { path: path.join(__dirname, '../publish/dist') },
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
    },
    mode: 'production',
})

export default [jsConfig, ...cssConfig]
