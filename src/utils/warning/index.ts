/** @see https://github.com/react-component/util/blob/master/src/warning.ts */

import { warningMessageMap } from './types'

let warned: Record<string, boolean> = {}

export function warning(key: string) {
    if (process.env.NODE_ENV !== 'production' && console !== undefined && warningMessageMap[key]) {
        console.error(`Warning: ${warningMessageMap[key]}`)
    }
}

export function note(key: string) {
    if (process.env.NODE_ENV !== 'production' && console !== undefined && warningMessageMap[key]) {
        console.warn(`Note: ${warningMessageMap[key]}`)
    }
}

export function resetWarned() {
    warned = {}
}

export function call(method: (key: string) => void, key: string) {
    if (!warned[key]) {
        method(key)
        warned[key] = true
    }
}

export function warningOnce(key: string) {
    call(warning, key)
}

export function noteOnce(key: string) {
    call(note, key)
}

export default warningOnce
