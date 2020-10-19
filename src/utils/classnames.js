import classnames from 'classnames'
import config from '../config'

/*
    create a new className generate function, add namespace, handle css module
 * @param style - object; for css module  eg:if import from less and without cssModule, style is {}
 * @param module - string    eg:"message"
 * @param prefix - string, default value is 'shineout'
 */
export default (style, module, prefix = config.prefix) => (...args) => {
  const className = classnames(...args)
  if (!className) return ''

  const ns = `${prefix}${module ? `-${module}` : '-'}`

  // _ means default(ns)
  let list = className.split(' ').map((item) => (item === '_' ? ns : `${ns}-${item}`))

  // If you turn on modularity
  if (config.cssModule) {
    list = list.map((item) => style[item] || item)
  }
  return list.join(' ')
}
