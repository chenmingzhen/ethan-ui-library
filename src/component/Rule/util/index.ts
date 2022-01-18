import { isObject } from '@/utils/is'
import { deepMerge } from '@/utils/objects'
import { Options } from '../type/index'

export function mergeOptions(options: Options = {}, ...args: Options[]) {
    if (!isObject(options)) {
        console.error(new Error(`rules expect an object, got ${typeof options}`))

        return {}
    }

    if (args.length === 0) {
        return options
    }

    // Object.keys(args).forEach(key => {
    //     if (typeof options[key] !== 'function') {
    //         args[key] = { func: args[key] }
    //     }
    // })

    return mergeOptions(deepMerge(options, args[0]), ...args.splice(1))
}
