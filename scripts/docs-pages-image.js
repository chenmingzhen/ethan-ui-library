const fs = require('fs-extra')
const rimraf = require('rimraf')
const pkg = require('../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const dir = `docs-pages/${version}`
const imagePath = `${dir}/images`

const oriImgPath = `site/images`

if (fs.pathExistsSync(imagePath)) {
  rimraf(imagePath)
}

fs.copySync(oriImgPath, imagePath)
