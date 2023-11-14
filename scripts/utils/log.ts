import chalk from 'chalk'

function info(...args) {
    console.log(chalk('[INFO]:', args))
}

function error(...args) {
    console.log(chalk.red('[ERROR]:', args))
}

function warn(...args) {
    console.log(chalk.yellow('[WARN]:', args))
}

const Log = {
    info,
    error,
    warn,
}

export default Log
