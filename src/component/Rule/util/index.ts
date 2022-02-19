import { getLocale } from '@/locale'
import { isObject } from '@/utils/is'
import { deepMerge } from '@/utils/objects'
import { substitute } from '@/utils/strings'

export function mergeOptions(options = {}, ...args) {
    if (!isObject(options)) {
        console.error(new Error(`rules expect an object, got ${typeof options}`))

        return {}
    }

    if (args.length === 0) {
        return options
    }

    const arg = args.shift()

    return mergeOptions(deepMerge(options, arg), ...args)
}

export function createLengthMessage(key: 'min' | 'max', props) {
    let lt = ''
    switch (props.type) {
        case 'integer':
        case 'number':
            lt = 'number'
            break
        case 'array':
            lt = 'array'
            break
        default:
            lt = 'string'
    }

    return substitute(getLocale(`rules.length.${key}.${lt}`), props)
}
