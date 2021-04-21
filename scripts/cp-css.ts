const fs = require('fs-extra')

const origin = 'publish/css/'
const to = 'publish/lib'

fs.mkdirpSync('publish/lib')

fs.copySync(origin, to)

export {}
