/**
 * @deprecated 已迁移到github pages 该脚本不再使用
 */
// "docs-build-image": "ts-node scripts/docs-pages-image.ts",

import fs = require('fs-extra')
import pkg = require('../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const dir = `docs-pages/${version}`
const imagePath = `${dir}/images`

const oriImgPath = 'site/images'

// if (fs.pathExistsSync(imagePath)) {
//   rimraf(imagePath)
// }

fs.copySync(oriImgPath, imagePath)
