import { curry } from '@/utils/func'
import React, { isValidElement, SyntheticEvent } from 'react'

const nameIs = curry((name, val) => val?.constructor?.name === name)

export const { isArray } = Array

export const isObject = val => val && typeof val === 'object' && !isArray(val)

export const isDate = val => val instanceof Date

export const isFunc = (f): f is (...args) => any => typeof f === 'function'

export const isString = (s): s is string => typeof s === 'string'

export const isNumber = (n): n is number => typeof n === 'number'

export const isBoolean = (b): b is boolean => typeof b === 'boolean'

export const isError = (val): val is Error => val instanceof Error

export const isNull = (val): val is null => val === null

export const isRegexp = val => val instanceof RegExp

export const isMap = nameIs('Map')

export const isSet = nameIs('Set')

export const isSymbol = nameIs('Symbol')

export const isPromise = (p): p is Promise<any> => p && (nameIs('Promise', p) || isFunc(p.then))

/** 是否为React的合成事件 */
export const isSyntheticEvent = (event): event is SyntheticEvent =>
    event && nameIs('SyntheticBaseEvent', event) && event.nativeEvent

export const isBuffer = val => {
    if (val?.constructor && typeof val.constructor.isBuffer === 'function') {
        return val.constructor.isBuffer(val)
    }
    return false
}

export const isBlob = (val): val is Blob => val instanceof Blob

export const isEmpty = val => {
    if (val === null) return true

    if (val === undefined) return true

    if (val.length !== undefined) return val.length === 0

    if (val instanceof Date) return false

    if (typeof val === 'object') return Object.keys(val).length === 0

    return false
}

export function isEmptyStr(str: string) {
    return str === ''
}

export function isZero(num: number) {
    return num === 0
}

export const isMergeable = val => {
    if (!isObject(val)) return false

    const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer, isBlob]

    for (let i = 0; i < fns.length; i++) {
        if (fns[i](val)) return false
    }

    return true
}

export const isOne = val => {
    if (val === 1) return true

    return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1
}

// /\d{1,3}%$/
export const isPercent = n => typeof n === 'string' && /\d{1,3}%$/.test(n)

// 不可再拆分类型
export const isInseparable = val =>
    Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val)

export const isLink = (el: React.ReactElement<{ to?: string }>) => {
    if (!isValidElement(el)) return false

    if (!el.type) return false

    if (el.type === 'a') return true

    if (el?.props?.to) return true

    return false
}

export const isEnterPress = (e: React.KeyboardEvent) => e.keyCode === 13

/** 是否为原始数据 */
export const isPrimitive = val => Object(val) !== val
