const ejs = require('ejs')

const rf = ejs.renderFile

ejs.renderFile = (path, data, options) =>
    new Promise((resolve, reject) => {
        rf(path, data, options, (err, str) => {
            if (err) {
                reject(err)
                return
            }
            resolve(str)
        })
    })

module.exports = ejs
