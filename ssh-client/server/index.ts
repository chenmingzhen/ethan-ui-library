import fs = require('fs')
import path = require('path')
import host = require('../private/host')

const server = {
  host,
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync(path.join(__dirname, '../private/id_rsa')),
}

export = server
