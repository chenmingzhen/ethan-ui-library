const path = require('path')
const archiver = require('archiver')
const fs = require('fs')
const ssh2 = require('ssh2')
const chalk = require('chalk')
const { server, cmd } = require('./private')

const localPath = path.resolve(__dirname, 'publish.zip')
const remotePath = '/ethan/publish.zip'

const ssh = ssh2()

const connect = callback => {
  ssh
    .on('ready', () => {
      console.log(chalk.green('connect ready'))
      callback(ssh)
    })
    .on('close', () => {
      console.log(chalk.green('connect close'))
    })
    .connect(server)
}

const shell = conn => {
  conn.shell((err, stream) => {
    if (err) {
      console.log(chalk.ref(err))
    } else {
      stream
        .on('close', () => {
          conn.end()
        })
        .on('data', data => {
          console.log(`OUTPUT: ${data}`)
        })
      stream.end(cmd)
    }
  })
}

const uploadFile = conn => {
  conn.sftp((err, sftp) => {
    if (err) {
      console.log(err)
    } else {
      sftp.fastPut(localPath, remotePath, error => {
        if (!error) {
          fs.unlinkSync(path.resolve(__dirname, 'publish.zip'), e => {
            if (!e) console.log(chalk.green('delete publish.zip success'))
          })
          shell(conn)
        }
      })
    }
  })
}

// 压缩dist目录为public.zip
function startZip() {
  const archive = archiver('zip', {
    zlib: { level: 5 }, // 递归扫描最多5层
  }).on('error', err => {
    throw err
  })

  const output = fs.createWriteStream(`${__dirname}/publish.zip`).on('close', err => {
    if (err) {
      console.log(chalk.red(err))
      return
    }
    console.log(chalk.green('已生成zip包'))
    console.log(chalk.blue('开始上传public.zip至远程机器...'))
    connect(uploadFile)
  })

  archive.pipe(output)
  // 将srcPach路径对应的内容添加到zip包中/public路径
  archive.directory(path.resolve(__dirname, '../publish'), '/publish')
  archive.finalize()
}

startZip()
