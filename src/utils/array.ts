import { deepClone } from './clone'

export function pull<T>(array: T[], removeKey: T) {
    return array.filter(it => it !== removeKey)
}

export function getSameValue<T>(array: T[]) {
    const cloneArray = deepClone(array) as T[]

    cloneArray.sort()

    const duplicateArray = []

    for (let i = 0; i < cloneArray.length; i++) {
        if (cloneArray[i] === cloneArray[i + 1]) {
            duplicateArray.push(cloneArray[i])
        }
    }

    return [...new Set(duplicateArray)]
}
