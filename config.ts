import path from 'path'
import fs from 'fs'

const versions: { react?: string; 'react-dom'?: string; jszip?: string } = {}
;['react', 'react-dom', 'jszip'].forEach(lib => {
    const libPackageBuffer = fs.readFileSync(path.resolve(__dirname, 'node_modules/', lib, 'package.json')).toString()

    const pkg = JSON.parse(libPackageBuffer.toString())

    versions[lib] = pkg.version
})

const config = {
    appName: 'Ethan',
    dev: {
        publishPort: 4000,
        webpackPort: 4001,
        scriptPath: '/*.*',
        /** 以下为docs中需要的脚本 由于react不进行打包 需要koa需要对脚本的请求进行处理 */
        /** example中 import React from 'react' 某种程度上是多余的 因为React是通过link引入的 ，所以未import进来会是undefined,但是不导入React而出现jsx语法 会提示错误 所以象征性导入 无实际意义 */
        scripts: [
            `/react@${versions.react}/umd/react.production.min.js`,
            `/react-dom@${versions['react-dom']}/umd/react-dom.production.min.js`,
            /** upload examples中使用jszip 将jsZip打包进来 window中即存在 window.jszip */
            `/jszip@${versions.jszip}/dist/jszip.min.js`,
        ],
        styles: [],
    },
    themes: ['default', 'ethan', 'antd'],
    webpack: {
        entry: {
            app: './site/index.tsx',
        },
        output: {
            chunkFilename: '[name].[chunkhash].js',
            filename: '[name].js',
        },
        devtool: 'cheap-module-source-map',
        alias: {
            ethan: path.resolve(__dirname, 'src'),
            docs: path.resolve(__dirname, 'site/Components'),
            doc: path.resolve(__dirname, 'site'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
}

export default config
