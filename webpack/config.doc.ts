import path from 'path'
import { merge } from 'webpack-merge'
import config from '../config'
import { getCommonConfig, getThemeWebpackConfig } from './utils'
import pkg from '../package.json'

const dir = pkg.version

const cssConfig = config.themes.map(name =>
    getThemeWebpackConfig({
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
        output: { path: path.join(__dirname, `../docs-pages/${dir}`) },
        clean: true,
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