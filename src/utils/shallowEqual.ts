import deepEqual from 'deep-eql' // 深度比较值
import { isEmpty } from './is'

interface ShallowEqualOptions {
    skip?: string[]

    deep?: string[]
}

const { hasOwnProperty } = Object.prototype

function is(x, y) {
    return x === y
}

function getOption(options, key) {
    if (!options[key]) return []

    const val = options[key]

    return Array.isArray(val) ? val : [val]
}

/** 浅比较(+选择性比较)
 *  skip 跳过比较的值 deep 需要深度比较的值
 */
export default function shallowEqual(
    objA: Record<string, any>,
    objB: Record<string, any>,
    options: ShallowEqualOptions = {}
) {
    if (is(objA, objB)) {
        return true
    }

    if (typeof objA !== 'object' || isEmpty(objA) || typeof objB !== 'object' || isEmpty(objB)) {
        return false
    }

    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) {
        return false
    }

    const skip = getOption(options, 'skip')
    const deep = getOption(options, 'deep')

    keysA.sort((prevKey, nextKey) => deep.indexOf(prevKey) - deep.indexOf(nextKey))

    for (let i = 0; i < keysA.length; i++) {
        const k = keysA[i]

        if (skip.includes(k)) continue

        // 固定A  比较B是否存在K 或者 A与B是否绝对相同
        if (!hasOwnProperty.call(objB, k) || !is(objA[k], objB[k])) {
            // 第一种情况基本遇不到 遇到直接走最下面的false 下面是对第二种情况判断
            // 如果A B地址不一样 先对比是不是一样Message的Error 再利用deep-eql判断是否深度的值一样
            if (objA[k] instanceof Error && objB[k] instanceof Error) {
                if (objA[k].message !== objB[k].message) return false
                continue
            }

            if (deep.includes(k)) {
                if (!deepEqual(objA[k], objB[k])) return false
            } else {
                return false
            }
        }
    }

    return true
}
