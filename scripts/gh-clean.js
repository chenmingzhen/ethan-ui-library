const fs = require('fs')
const rimraf = require('rimraf')
const pkg = require('../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const dir = `gh-pages/${version}`

if (fs.existsSync(dir)) {
  rimraf.sync(dir)
}
