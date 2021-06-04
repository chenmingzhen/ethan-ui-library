// 对某一类文件的引入直接替换为空字符串
// 本项目的less
module.exports = function(res) {
    // 输出less文件内的内容
    // console.log('ignore-loader:', res)

    // https://webpack.docschina.org/api/loaders/#thiscacheable
    if (this.cacheable) this.cacheable()

    return ''
}
