import classnames from 'classnames'
import config from '../config'

/** 创建样式类名 */
export default (style, module, prefix = config.prefix) => (...args) => {
    const className = classnames(...args)

    if (!className) return ''

    const ns = `${prefix}${module ? `-${module}` : '-'}`

    let list = className.split(' ').map(item => (item === '_' ? ns : `${ns}-${item}`))

    if (config.cssModule) {
        list = list.map(item => style[item] || item)
    }

    return list.join(' ')
}
