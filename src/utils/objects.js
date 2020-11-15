import { isMergeable, isObject } from '@/utils/is'
import { insertPoint } from './flat'

const { hasOwnProperty } = Object.prototype

const PATH_MODE = {
  loose: '?',
  strict: '!',
  insert: '^',
  append: '$',
}

// obj以js entries 的风格转  [key, value]
export const entries = obj => {
  if (!obj) return []
  const keys = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}

export const objectValues = obj => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
}

export function pathGenerator(raw) {
  const path = insertPoint(raw)
  const reg = /^\[(\d+)\]$/
  const pathModeValues = objectValues(PATH_MODE)
  let index = 0
  let last = 0
  let prop = ''
  const results = []
  while (index >= 0) {
    index = path.indexOf('.', last)
    prop = path.substring(last, index === -1 ? undefined : index)

    let mode
    const lastChar = prop.charAt(prop.length - 1)
    if (pathModeValues.includes(lastChar)) {
      mode = lastChar
      prop = prop.substring(0, prop.length - 1)
    }

    // array index
    const match = reg.exec(prop)
    // eslint-disable-next-line
    if (match) prop = parseInt(match[1], 10)

    last = index + 1
    results.push([prop, index === -1 ? undefined : path.substring(last), mode])
  }
  return results
}

// 深度合并对象 不包括数组
export const deepMerge = (target = {}, source, { clone, removeUndefined, skipUndefined } = {}) => {
  if (!isMergeable(source)) return source

  const dest = {}
  if (isMergeable(target)) {
    Object.keys(target).forEach(k => {
      dest[k] = clone ? deepMerge({}, target[k], clone) : target[k]
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    })
  }

  Object.keys(source).forEach(k => {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], clone)
    } else {
      if (skipUndefined && source[k] === undefined) return
      dest[k] = deepMerge({}, source[k], clone)
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    }
  })

  return dest
}

export const deepGet = (target, path, options = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  if (path === '') return target
  const { defaultValue, strictMode } = options

  let current = target
  for (const [prop, , mode] of pathGenerator(path)) {
    const isStrict = mode === PATH_MODE.strict || (strictMode && defaultValue === undefined && mode !== PATH_MODE.loose)
    if (current != null && hasOwnProperty.call(current, prop)) {
      current = current[prop]
    } else if (isStrict) {
      throw new Error(`Path ${path} is not exist.`)
    } else {
      current = defaultValue
      break
    }
  }

  return current
}
