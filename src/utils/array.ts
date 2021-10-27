export function pull<T>(array: T[], removeKey: T) {
    return array.filter(it => it !== removeKey)
}
