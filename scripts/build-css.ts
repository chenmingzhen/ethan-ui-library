// less => css

import fs from 'fs'
import less from 'less'
import path from 'path'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const root = path.resolve(__dirname, '../src')
const publish = path.resolve(__dirname, '../publish')

// build less content to css content
async function render(data, setting) {
    return new Promise((resolve, reject) => {
        less.render(data, setting, (err, d) => {
            if (err) {
                reject(err)
                return
            }
            resolve(d.css)
        })
    })
}

function buildCss(stylePath) {
    const originPath = path.resolve(root, stylePath)
    const distPath = path.resolve(publish, 'css', stylePath)

    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    }

    fs.readdirSync(originPath)
        .filter((name) => name.indexOf('.less') > 0)
        .forEach(async (name) => {
            const fn = path.resolve(originPath, name)
            const cssFile = path.resolve(distPath, name.replace('.less', '.css'))

            const lessText = fs.readFileSync(fn).toString()
            const cssText = await render(lessText, { filename: fn })

            postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })])
                .process(cssText)
                .then((result) => {
                    fs.writeFileSync(cssFile, result.css)
                })
                .catch((e) => console.log(e))
        })
}

// 将style下的js文件的less引入改为css引入
function replaceLess() {
    const dir = path.resolve(publish, 'css/styles/')
    fs.readdirSync(dir)
        .filter((name) => /\.js$/.test(name))
        .forEach((name) => {
            const filePath = path.resolve(dir, name)
            const text = fs
                .readFileSync(filePath)
                .toString()
                .replace(/\.less/g, '.css')
            fs.writeFileSync(filePath, text)
        })
}

buildCss('styles')
buildCss('styles/spin')
replaceLess()
