import path = require('path')
import pkg = require('../package.json')
import Client = require('./client')
import server = require('./server')
import cmd = require('./cmd/docs-pages-cmd')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const localPath = path.resolve(__dirname, `${version}.zip`)
const remotePath = `/root/nginx/upload/ethan-ui-pages/${version}.zip`

const startUpload = async () => {
  const client = new Client()

  // 解压
  await client.zip(`${__dirname}/${version}.zip`, path.resolve(__dirname, `../docs-pages/${version}`))

  // 连接
  await client.connect(server)

  // 上传文件
  await client.uploadFile(localPath, remotePath)

  // 执行shell
  await client.shell(cmd)

  client.ssh.end()
}

startUpload()
