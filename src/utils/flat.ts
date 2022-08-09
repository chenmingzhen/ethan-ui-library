import { isArray, isEmpty, isPrimitive } from './is'
import { deepClone } from './clone'

export function insertPoint(name) {
    const reg = /(\[\d+\])/gi

    return name.replace(reg, (s, m, i) => s.replace(m, i === 0 ? m : `.${m}`))
}

export function flatten(data) {
    if (isEmpty(data)) return data

    const result = {}

    function recurse(cur, prop) {
        /** 基本数据类型，方法，日期，错误 */
        if (isPrimitive(cur) || typeof cur === 'function' || cur instanceof Date || cur instanceof Error) {
            if (cur !== undefined) {
                result[prop] = cur
            }
        } else if (Array.isArray(cur)) {
            if (cur.length === 0) {
                result[prop] = []
            } else {
                for (let i = 0, l = cur.length; i < l; i++) {
                    recurse(cur[i], prop ? `${prop}[${i}]` : `[${i}]`)
                }
            }
        } else {
            let empty = true
            // eslint-disable-next-line
            for (const p in cur) {
                empty = false
                recurse(cur[p], prop ? `${prop}.${p}` : p)
            }
            if (empty) {
                result[prop] = {}
            }
        }
    }

    recurse(data, '')

    return result
}

export function unflatten(data: Record<string, any>) {
    if (isEmpty(data) || Array.isArray(data)) {
        return data
    }

    const result = {}

    let { cur, prop, idx, last, temp, match }: any = {}

    Object.keys(data)
        .sort()
        .forEach(p => {
            const pathWithPoint = insertPoint(p)
            cur = result
            prop = ''
            last = 0
            do {
                idx = pathWithPoint.indexOf('.', last)
                temp = pathWithPoint.substring(last, idx !== -1 ? idx : undefined)
                match = /^\[(\d+)\]$/.exec(temp)
                cur = cur[prop] || (cur[prop] = match ? [] : {})
                prop = match ? match[1] : temp
                last = idx + 1
            } while (idx >= 0)
            cur[prop] = deepClone(data[p])
        })
    return result['']
}

export function flattenArray<T>(arr: T[]) {
    return arr.reduce(
        (previousValue, currentValue) =>
            isArray(currentValue)
                ? previousValue.concat(flattenArray(currentValue))
                : previousValue.concat(currentValue),
        []
    )
}
