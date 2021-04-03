const cmd = `
cd /root/nginx/upload \n

rm -rf ethan-ui-publish \n

mkdir ethan-ui-publish \n

unzip publish.zip -d ethan-ui-publish \n

rm -rf publish.zip \n

exit\n
`

module.exports = cmd
