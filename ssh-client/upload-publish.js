const path = require('path')
const Client = require('./client')

const server = require('./server')
const cmd = require('./cmd/publish-cmd')

const localPath = path.resolve(__dirname, 'publish.zip')
const remotePath = '/root/nginx/upload/publish.zip'

const startUpload = async () => {
  const client = new Client()

  // 解压
  await client.zip(`${__dirname}/publish.zip`, path.resolve(__dirname, '../publish'))

  // 连接
  await client.connect(server)

  // 上传文件
  await client.uploadFile(localPath, remotePath)

  // 执行shell
  await client.shell(cmd)

  client.ssh.end()
}

startUpload()
