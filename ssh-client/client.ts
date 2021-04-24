const path = require('path')
const archiver = require('archiver')
const fs = require('fs')
import ssh2 from 'ssh2'
const chalk = require('chalk')

const ERROR = 'red'
const SUCCESS = 'green'
const INFO = 'blue'

class Client {
  ssh: ssh2

  constructor() {
    this.ssh = ssh2()
  }

  connect(server) {
    return new Promise((yes, no) => {
      this.ssh
        .on('ready', () => {
          Client.log('connect ready')

          yes(null)
        })
        .on('close', () => {
          Client.log('connect close')
        })
        .on('error', e => {
          Client.log(e, ERROR)
          no(e)
        })
        .connect(server)
    })
  }

  uploadFile(localPath, remotePath) {
    return new Promise((yes, no) => {
      this.ssh.sftp((err, sftp) => {
        if (err) {
          Client.log(err, ERROR)
          no(err)
        } else {
          sftp.fastPut(localPath, remotePath, error => {
            if (!error) {
              const filePath = localPath.split('/')
              const fileName = filePath[filePath.length - 1]

              fs.unlinkSync(path.resolve(__dirname, fileName))
              yes(null)
            }
          })
        }
      })
    })
  }

  shell(cmd) {
    return new Promise((yes, no) => {
      this.ssh.shell((err, stream) => {
        if (err) {
          Client.log(err, ERROR)
          no(err)
        } else {
          stream
            .on('close', () => {
              yes(null)
            })
            .on('data', data => {
              Client.log(`OUTPUT: ${data}`, INFO)
            })
          stream.end(cmd)
        }
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  async zip(target, targetSrc) {
    const archive = archiver('zip', {
      zlib: { level: 5 }, // 递归扫描最多5层
    }).on('error', err => {
      Client.log(err, ERROR)
      throw err
    })

    const output = fs.createWriteStream(`${target}`).on('close', err => {
      if (err) {
        Client.log(err, ERROR)
        return
      }

      Client.log('已生成zip包')

      Client.log('开始上传zip', INFO)
    })

    archive.pipe(output)

    // 将srcPach路径对应的内容添加到zip包中/public路径
    // 第二个参数是否将内容放到某个文件夹的下面
    // 这里直接放到根目录下
    archive.directory(targetSrc, '/')

    await archive.finalize()
  }

  static log(message, color = SUCCESS) {
    console.log(chalk[color](message))
  }
}

export = Client
