import { curry } from '@/utils/func'

const nameIs = curry((name, val) => val && val.constructor && val.constructor.name === name)

export const { isArray } = Array
export const isObject = (val) => val && typeof val === 'object' && !isArray(val)
export const isDate = (val) => val instanceof Date
export const isError = (val) => val instanceof Error
export const isRegexp = (val) => val instanceof RegExp
export const isMap = nameIs('Map')
export const isSet = nameIs('Set')
export const isSymbol = nameIs('Symbol')

export const isBuffer = (val) => {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val)
  }
  return false
}

export const isMergeable = (val) => {
  if (!isObject(val)) return false
  const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer]

  for (let i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false
  }
  return true
}
