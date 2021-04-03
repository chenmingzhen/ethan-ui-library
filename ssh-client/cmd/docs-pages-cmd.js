const pkg = require('../../package.json')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`

const cmd = `
cd /root/nginx/upload/ethan-ui-pages \n

rm -rf ${version}\n

mkdir ${version} \n

unzip ${version}.zip -d ${version} \n

exit\n
`

module.exports = cmd
