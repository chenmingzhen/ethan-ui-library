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

export function isSameArrayValue(arr1: Array<any>, arr2: Array<any>) {
    if (arr1?.length === undefined || arr2?.length === undefined) return false

    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }

    return true
}
