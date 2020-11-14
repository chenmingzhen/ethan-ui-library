// const path = require('path')
const config = require('./config')

module.exports = {
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),
    // },
    alias: config.webpack.alias,
    extensions: ['.js', '.json', '.jsx'],
  },
}
