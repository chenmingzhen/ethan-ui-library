// TODO 考虑到webpack url-loader中已经将图片打包进来 只有icon无打包进docs-pages/x.x.x/ 部分图片复制操作多余
import fs = require('fs-extra')
import pkg = require('../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const dir = `docs-pages/${version}`
const imagePath = `${dir}/images`

const oriImgPath = `site/images`

// if (fs.pathExistsSync(imagePath)) {
//   rimraf(imagePath)
// }

fs.copySync(oriImgPath, imagePath)
