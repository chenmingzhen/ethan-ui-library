import classnames from 'classnames'
import config from '../config'

/** 创建样式类名 */
export default (module, prefix = config.prefix) => (...args): string => {
    const className = classnames(...args)

    if (!className) return ''

    const ns = `${prefix}${module ? `-${module}` : '-'}`

    const list = className.split(' ').map(item => (item === '_' ? ns : `${ns}-${item}`))

    return list.join(' ')
}
