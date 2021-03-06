const ssh = require('ssh2')
const util = require('util')
const events = require('events')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const { Client } = ssh

const server = {
  host: '193.112.175.198',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync(path.join(__dirname, '../id_rsa')),
}

const SSHConnect = Client()

let isConnected = false

SSHConnect.on('ready', () => {
  isConnected = true
})
  .on('error', error => {
    console.log(chalk.red('SSH ERROR:', error))
  })
  .on('end', () => {
    console.log(chalk.blue('SSH END'))
  })
  .on('close', () => {
    console.log(chalk.blue('SSH CLOSE'))
  })
  .connect(server)

const getInstance = () =>
  new Promise(yes => {
    const wait = setInterval(() => {
      if (isConnected) {
        clearInterval(wait)
        yes(SSHConnect)
      }
    }, 1000)
  })

function GetFileAndDirList(localDir, dirs, files) {
  const dir = fs.readdirSync(localDir)
  for (let i = 0; i < dir.length; i++) {
    const p = path.join(localDir, dir[i])
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      dirs.push(p)
      GetFileAndDirList(p, dirs, files)
    } else {
      files.push(p)
    }
  }
}

async function Shell(cmd) {
  const client = await getInstance()

  return new Promise((yes, no) => {
    client.shell((e, s) => {
      if (e) {
        no(e)
      } else {
        s.on('close', () => {
          yes()
        }).on('data', data => {
          yes()
          s.close()
        })
        console.log(cmd)
        s.end(cmd)
      }
    })
  })
}

async function UploadDir(localDir, remoteDir) {
  const dirs = []
  const files = []
  GetFileAndDirList(localDir, dirs, files)

  // 创建远程目录
  for (let i = 0; i < dirs.length - 1; i++) {
    const to = path.join(remoteDir, dirs[i].slice(localDir.length + 1)).replace(/[\\]/g, '/')
    const cmd = `mkdir -p ${to} \n`

    await Shell(cmd)
  }
}

UploadDir(path.join(__dirname, '../publish'), '/ethan')
