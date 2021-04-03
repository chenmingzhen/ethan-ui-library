const path = require('path')
const Client = require('./client')

const server = require('./server')
const cmd = require('./cmd/docs-pages-cmd')

const localPath = path.resolve(__dirname, 'docs-pages.zip')
const remotePath = '/root/nginx/upload/docs-pages.zip'

const startUpload = async () => {
  const client = new Client()

  // 解压
  await client.zip(`${__dirname}/docs-pages.zip`, path.resolve(__dirname, '../docs-pages'))

  // 连接
  await client.connect(server)

  // 上传文件
  await client.uploadFile(localPath, remotePath)

  // 执行shell
  await client.shell(cmd)

  client.ssh.end()
}

startUpload()
