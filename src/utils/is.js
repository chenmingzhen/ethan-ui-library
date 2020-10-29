import { curry } from '@/utils/func'

const nameIs = curry((name, val) => val && val.constructor && val.constructor.name === name)

export const { isArray } = Array
export const isObject = (val) => val && typeof val === 'object' && !isArray(val)
export const isDate = (val) => val instanceof Date
export const isFunc = (f) => typeof f === 'function'
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

export const isOne = (val) => {
  if (val === 1) return true
  return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1
}

// /\d{1,3}%$/
export const isPercent = (n) => typeof n === 'string' && /\d{1,3}%$/.test(n)
export const isInseparable = (val) =>
  Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val)
