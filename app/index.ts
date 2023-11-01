import spawn from 'cross-spawn'
import { ChildProcess } from 'child_process'
import path from 'path'
import chokidar from 'chokidar'
import treeKill from 'tree-kill'

let appProcess: ChildProcess

const watcher = chokidar.watch(path.resolve(__dirname, '../app'), {
    ignored: ['node_modules', path.resolve(__dirname, '../app/index.ts')],
    persistent: true,
})

watcher.on('change', () => {
    console.log('正在重新启动代理服务器...')

    if (appProcess) {
        treeKill(appProcess.pid, (error) => {
            if (!error) {
                startApp()
            } else {
                console.error('重新启动代理服务器失败:', error.message)
            }
        })
    }
})

function startApp() {
    appProcess = spawn('ts-node', ['./app/app.ts'])
    appProcess.stdout.setEncoding('utf-8')
    appProcess.stderr.setEncoding('utf-8')

    /** 输出的console.log已带换行符，使用write避免造成两次换行 */
    appProcess.stdout?.on('data', (data) => {
        process.stdout.write(data)
    })
    appProcess.stderr?.on('data', (data) => {
        process.stdout.write(data)
    })
}

export default startApp
