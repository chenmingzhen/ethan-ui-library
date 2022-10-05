import path from 'path'
import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'
import pkg from '../package.json'

const dir = pkg.version.substring(0, pkg.version.lastIndexOf('.') + 1)

const cssConfig = config.themes.map(name =>
    getThemeWebpackConfig({
        name,
        entry: [
            './src/styles/style.ts',
            // site style
            './site/styles/index.ts',
            './site/less-entry.ts',
        ],
        output: { path: path.join(__dirname, `../docs-pages/${dir}x`) },
        prefix: '',
    })
)

const jsConfig = merge(getCommonConfig({ Dev: false }), {
    devtool: config.webpack.devtool,
    entry: config.webpack.entry,
    output: {
        path: path.join(__dirname, `../docs-pages/${dir}`),
        /** @see https://webpack.docschina.org/configuration/output/#outputpublicpath */
        publicPath: '../../',
        libraryTarget: 'umd',
        library: 'EthanDoc',
    },
    mode: 'production',
})

export default [jsConfig, ...cssConfig]
