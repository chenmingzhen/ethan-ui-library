// 本文件用以js迁移到ts后 在所有ts|tsx文件中添加 @ts-nocheck 使tsc编译通过
// 并删除example文件夹
import fs = require('fs')
import path = require('path')
import fsExtra = require('fs-extra')

const srcPath = path.resolve(__dirname, '../src')

const tsFilesPath = []

const readDir = find => {
  const dir = fs.readdirSync(find)

  dir.forEach(it => {
    const ph = path.join(find, it)
    const stat = fs.statSync(ph)

    if (stat.isDirectory()) {
      if (it.indexOf('example') > -1) {
        fsExtra.remove(ph)

        return
      }

      readDir(ph)
    } else {
      const ext = path.extname(it)
      if (ext === '.ts' || ext === '.tsx') {
        tsFilesPath.push(ph)
      }
    }
  })
}

readDir(srcPath)

tsFilesPath.forEach(it => {
  const originalText = fs.readFileSync(it).toString()

  const txt = `// @ts-nocheck \n${originalText}`

  fs.writeFileSync(it, txt)
})
