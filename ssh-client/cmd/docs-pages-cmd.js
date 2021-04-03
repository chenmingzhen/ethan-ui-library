const cmd = `
cd /root/nginx/upload \n

rm -rf ethan-ui-pages \n

mkdir ethan-ui-pages \n

unzip docs-pages.zip -d ethan-ui-pages \n

rm -rf docs-pages.zip \n

exit\n
`

module.exports = cmd
