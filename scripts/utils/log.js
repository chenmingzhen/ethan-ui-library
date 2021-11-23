const chalk = require('chalk')

/**
 * @param {string} message
 */
function info(message) {
    console.log(chalk.blue(message))
}

/**
 * @param {string} message
 */
function error(message) {
    console.log(chalk.red(message))
}

/**
 * @param {string} message
 */
function success(message) {
    console.log(chalk.green(message))
}

const Log = {
    info,
    error,
    success,
}

module.exports = Log
