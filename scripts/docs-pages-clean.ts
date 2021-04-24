import fs = require('fs')
import rimraf = require('rimraf')
import pkg = require('../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const dir = `docs-pages/${version}`

if (fs.existsSync(dir)) {
  rimraf.sync(dir)
}
