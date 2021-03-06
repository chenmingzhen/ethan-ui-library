// build publish package.json

import fs = require('fs')
import path = require('path')
import pkg = require('../package.json')

delete pkg.devDependencies

const publishDir = path.resolve(__dirname, '../publish')
if (!fs.existsSync(publishDir)) fs.mkdirSync(publishDir)
fs.writeFileSync(path.resolve(__dirname, '../publish/package.json'), JSON.stringify(pkg, null, 2))
