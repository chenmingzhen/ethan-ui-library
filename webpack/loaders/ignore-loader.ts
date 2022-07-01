/** 对某一类文件的引入直接替换为空字符串 */
export default function(res) {
    /** https://webpack.docschina.org/api/loaders/#thiscacheable */
    if (this.cacheable) this.cacheable()

    return ''
}
