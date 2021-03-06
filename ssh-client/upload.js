// const ssh = require('ssh2')
// const util = require('util')
// const events = require('events')
// const fs = require('fs')
// const path = require('path')
// const async = require('async_hooks')
//
// const { Client } = ssh
//
// const SSHConnect = Client()
// /**
//  * 描述：连接远程电脑
//  * 参数：server 远程电脑凭证；then 回调函数
//  * 回调：then(conn) 连接远程的client对象
//  */
//
// const connect = (server, callback) => {
//   SSHConnect.on('ready', () => {
//     callback(SSHConnect)
//   })
//     .on('error', error => {})
//     .on('end', () => {})
//     .on('close', () => {})
//     .connect(server)
// }
//
// /**
//  * 描述：运行shell命令
//  * 参数：server 远程电脑凭证；cmd 执行的命令；then 回调函数
//  * 回调：then(err, data) ： data 运行命令之后的返回数据信息
//  * 例子：shell(server, `echo "Hello" \n`, conn => {})
//  */
// const shell = (server, cmd, then) => {
//   connect(server, conn => {
//     conn.shell((err, stream) => {
//       if (err) {
//         then(err)
//       } else {
//         stream
//           .on('close', () => {
//             console.log('Stream :: close')
//             then(err)
//             conn.end()
//           })
//           .on('data', data => {
//             console.log(`OUTPUT: ${data}`)
//           })
//         stream.end(cmd)
//       }
//     })
//   })
// }
//
// /**
//  * 描述：上传文件
//  * 参数：server 远程电脑凭证；localPath 本地文件路径；remotePath 远程存放路径；then 回调函数
//  * 回调：then(err, result)
//  * 例子：uploadFile(server, path.resolve(__dirname, '../test.js'), '/ethan', (error, result) => {})
//  */
// function uploadFile(server, localPath, remotePath, then) {
//   connect(server, conn => {
//     conn.sftp((err, sftp) => {
//       if (err) {
//         then(err)
//       } else {
//         const prefixArr = localPath.split('\\')
//
//         remotePath = `${remotePath}/${prefixArr[prefixArr.length - 1]}`
//
//         sftp.fastPut(localPath, remotePath, (error, result) => {
//           conn.end()
//           then(error, result)
//         })
//       }
//     })
//   })
// }
//
// function uploadFileNoPrefix(server, localPath, remotePath, then) {
//   connect(server, conn => {
//     conn.sftp((err, sftp) => {
//       if (err) {
//         then(err)
//       } else {
//         sftp.fastPut(localPath, remotePath, (error, result) => {
//           conn.end()
//           then(error, result)
//         })
//       }
//     })
//   })
// }
//
// /**
//  * 描述：下载文件
//  * 参数：server 远程电脑凭证；remotePath 远程路径；localPath 本地路径；then 回调函数
//  * 回调：then(err, result)
//  * 例子：downloadFile(server, '/ethan/test.js', path.resolve(__dirname), (e, r) => {})
//  */
// function downloadFile(server, remotePath, localPath, then) {
//   connect(server, conn => {
//     conn.sftp((err, sftp) => {
//       if (err) {
//         then(err)
//       } else {
//         const prefixArr = remotePath.split('/')
//
//         localPath = path.resolve(localPath, prefixArr[prefixArr.length - 1])
//
//         sftp.fastGet(remotePath, localPath, (error, result) => {
//           if (error) {
//             then(error)
//           } else {
//             conn.end()
//
//             then(error, result)
//           }
//         })
//       }
//     })
//   })
// }
//
// /**
//  * 描述：获取远程文件路径下文件列表信息
//  * 参数：server 远程电脑凭证；
//  *		remotePath 远程路径；
//  *		isFile 是否是获取文件，true获取文件信息，false获取目录信息；
//  *		then 回调函数
//  * 回调：then(err, dirs) ： dir, 获取的列表信息
//  * 例子:getFileOrDirList(server, '/tmp', true, (e, r) => {})
//  */
// function getFileOrDirList(server, remotePath, isFile, then) {
//   const cmd = `find ${remotePath} -type ${isFile === true ? 'f' : 'd'}\r\nexit\r\n`
//   shell(server, cmd, (err, data) => {
//     let arr = []
//     const remoteFile = []
//     arr = data.split('\r\n')
//     arr.forEach(dir => {
//       if (dir.indexOf(remotePath) === 0) {
//         remoteFile.push(dir)
//       }
//     })
//     then(err, remoteFile)
//   })
// }
//
// /**
//  * 描述：控制上传或者下载一个一个的执行
//  */
// function Control() {
//   events.EventEmitter.call(this)
// }
// util.inherits(Control, events.EventEmitter)
//
// const control = new Control()
//
// control.on('doNext', (todos, then) => {
//   if (todos.length > 0) {
//     const func = todos.shift()
//     func(err => {
//       if (err) {
//         then && then(err)
//       } else {
//         control.emit('doNext', todos, then)
//       }
//     })
//   } else {
//     then && then(null)
//   }
// })
//
// /**
//  * 描述：获取windows上的文件目录以及文件列表信息
//  * 参数：destDir 本地路径，
//  *		dirs 目录列表
//  *		files 文件列表
//  */
// function getFileAndDirList(localDir, dirs, files) {
//   const dir = fs.readdirSync(localDir)
//
//   for (let i = 0; i < dir.length; i++) {
//     const p = path.join(localDir, dir[i])
//     const stat = fs.statSync(p)
//
//     if (stat.isDirectory()) {
//       dirs.push(p)
//       getFileAndDirList(p, dirs, files)
//     } else {
//       files.push(p)
//     }
//   }
// }
//
// /**
//  * 描述：上传文件夹到远程目录
//  * 参数：server 远程电脑凭证；
//  *		localDir 本地路径，
//  *		remotePath 远程路径；
//  *		then 回调函数
//  * 回调：then(err)
//  */
// function uploadDir(server, localDir, remoteDir, then) {
//   const dirs = []
//   const files = []
//   getFileAndDirList(localDir, dirs, files)
//
//   // 创建远程目录
//   const todoDir = []
//   dirs.forEach(dir => {
//     todoDir.push(done => {
//       const to = path.join(remoteDir, dir.slice(localDir.length + 1)).replace(/[\\]/g, '/')
//
//       const cmd = `mkdir -p ${to}\r\nexit\r\n`
//
//       shell(server, cmd, done)
//     }) // end of push
//   })
//
//   // 上传文件
//   const todoFile = []
//   files.forEach(file => {
//     todoFile.push(done => {
//       const to = path.join(remoteDir, file.slice(localDir.length + 1)).replace(/[\\]/g, '/')
//
//       uploadFileNoPrefix(server, file, to, done)
//     })
//   })
//
//   control.emit('doNext', todoDir, err => {
//     if (err) {
//       throw err
//     } else {
//       control.emit('doNext', todoFile, then)
//     }
//   })
// }
//
// const server = {
//   host: '193.112.175.198',
//   port: 22,
//   username: 'root',
//   privateKey: fs.readFileSync(path.join(__dirname, '../id_rsa')),
// }
//
// uploadDir(server, path.join(__dirname, '../publish'), '/ethan', e => {})

const util = require('util')
const events = require('events')
const { Client } = require('ssh2')
const fs = require('fs')
const path = require('path')
const async = require('async')

/**
 * 描述：连接远程电脑
 * 参数：server 远程电脑凭证；then 回调函数
 * 回调：then(conn) 连接远程的client对象
 */
function Connect(server, then) {
  const conn = new Client()
  conn
    .on('ready', () => {
      then(conn)
    })
    .on('error', err => {
      // console.log("connect error!");
    })
    .on('end', () => {
      // console.log("connect end!");
    })
    .on('close', had_error => {
      // console.log("connect close");
    })
    .connect(server)
}

/**
 * 描述：运行shell命令
 * 参数：server 远程电脑凭证；cmd 执行的命令；then 回调函数
 * 回调：then(err, data) ： data 运行命令之后的返回数据信息
 */
function Shell(server, cmd, then) {
  Connect(server, conn => {
    conn.shell((err, stream) => {
      if (err) {
        then(err)
      } else {
        // end of if
        let buf = ''
        stream
          .on('close', () => {
            then(err, buf)
          })
          .on('data', data => {
            buf += data
            stream.close()
          })
          .stderr.on('data', data => {
            console.log(`stderr: ${data}`)
          })
        stream.end(cmd)
      }
    })
  })
}

/**
 * 描述：上传文件
 * 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径；then 回调函数
 * 回调：then(err, result)
 */
function UploadFile(server, localPath, remotePath, then) {
  Connect(server, conn => {
    conn.sftp((err, sftp) => {
      if (err) {
        then(err)
      } else {
        sftp.fastPut(localPath, remotePath, (err, result) => {
          sftp.end()
          then(err, result)
        })
      }
    })
  })
}

/**
 * 描述：下载文件
 * 参数：server 远程电脑凭证；remotePath 远程路径；localPath 本地路径；then 回调函数
 * 回调：then(err, result)
 */
function DownloadFile(server, remotePath, localPath, then) {
  Connect(server, conn => {
    conn.sftp((err, sftp) => {
      if (err) {
        then(err)
      } else {
        sftp.fastGet(remotePath, localPath, (err, result) => {
          if (err) {
            then(err)
          } else {
            conn.end()
            then(err, result)
          }
        })
      }
    })
  })
}

/**
 * 描述：获取远程文件路径下文件列表信息
 * 参数：server 远程电脑凭证；
 *		remotePath 远程路径；
 *		isFile 是否是获取文件，true获取文件信息，false获取目录信息；
 *		then 回调函数
 * 回调：then(err, dirs) ： dir, 获取的列表信息
 */
function GetFileOrDirList(server, remotePath, isFile, then) {
  const cmd = `find ${remotePath} -type ${isFile === true ? 'f' : 'd'}\r\nexit\r\n`
  Shell(server, cmd, (err, data) => {
    let arr = []
    const remoteFile = []
    arr = data.split('\r\n')
    arr.forEach(dir => {
      if (dir.indexOf(remotePath) === 0) {
        remoteFile.push(dir)
      }
    })
    then(err, remoteFile)
  })
}

/**
 * 描述：控制上传或者下载一个一个的执行
 */
function Control() {
  events.EventEmitter.call(this)
}
util.inherits(Control, events.EventEmitter) // 使这个类继承EventEmitter

const control = new Control()

control.on('donext', (todos, then) => {
  if (todos.length > 0) {
    const func = todos.shift()
    func((err, result) => {
      if (err) {
        throw err
      } else {
        control.emit('donext', todos, then)
      }
    })
  } else {
    then(null)
  }
})

/**
 * 描述：获取windows上的文件目录以及文件列表信息
 * 参数：destDir 本地路径，
 *		dirs 目录列表
 *		files 文件列表
 */
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

/**
 * 描述：上传文件夹到远程目录
 * 参数：server 远程电脑凭证；
 *		localDir 本地路径，
 *		remotePath 远程路径；
 *		then 回调函数
 * 回调：then(err)
 */
function UploadDir(server, localDir, remoteDir, then) {
  const dirs = []
  const files = []
  GetFileAndDirList(localDir, dirs, files)

  // 创建远程目录
  const todoDir = []
  dirs.forEach(dir => {
    todoDir.push(done => {
      const to = path.join(remoteDir, dir.slice(localDir.length + 1)).replace(/[\\]/g, '/')
      const cmd = `mkdir -p ${to} \n`
      console.log(cmd)
      Shell(server, cmd, done)
    }) // end of push
  })

  // 上传文件
  const todoFile = []
  files.forEach(file => {
    todoFile.push(done => {
      const to = path.join(remoteDir, file.slice(localDir.length + 1)).replace(/[\\]/g, '/')
      console.log(`upload ${to}`)
      UploadFile(server, file, to, done)
    })
  })

  control.emit('donext', todoDir, err => {
    if (err) {
      throw err
    } else {
      control.emit('donext', todoFile, then)
    }
  })
}

const server = {
  host: '193.112.175.198',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync(path.join(__dirname, '../id_rsa')),
}

UploadDir(server, path.join(__dirname, '../publish'), '/ethan', e => {})

exports.Shell = Shell
exports.UploadFile = UploadFile
exports.DownloadFile = DownloadFile
exports.GetFileOrDirList = GetFileOrDirList
