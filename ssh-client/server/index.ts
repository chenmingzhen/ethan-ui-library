const fs = require('fs')
const path = require('path')
const host = require('../private/host')

const server = {
  host,
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync(path.join(__dirname, '../private/id_rsa')),
}

module.exports = server
