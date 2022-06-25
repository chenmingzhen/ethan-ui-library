const chalk = require('chalk')

function info(...args) {
    console.log(chalk.blue(args))
}

function error(...args) {
    console.log(chalk.red(args))
}

function success(...args) {
    console.log(chalk.green(args))
}

const Log = {
    info,
    error,
    success,
}

module.exports = Log
