const fs = require('fs-extra')

const origin = 'src/styles'
const to = 'publish/lib/styles'

fs.mkdirpSync('publish/lib')

fs.copySync(origin, to)
