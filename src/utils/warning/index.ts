/** @see https://github.com/react-component/util/blob/master/src/warning.ts */

let warned: Record<string, boolean> = {}

export function warning(message) {
    if (process.env.NODE_ENV !== 'production' && console !== undefined) {
        console.error(`Warning: ${message}`)
    }
}

export function note(message) {
    if (process.env.NODE_ENV !== 'production' && console !== undefined) {
        console.warn(`Note: ${message}`)
    }
}

export function resetWarned() {
    warned = {}
}

export function call(method: (message: string) => void, message: string) {
    if (!warned[message]) {
        method(message)
        warned[message] = true
    }
}

export function warningOnce(string: string) {
    call(warning, string)
}

export function noteOnce(string: string) {
    call(note, string)
}

export default warningOnce
