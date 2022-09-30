import { entries } from './utils/objects'

const config = {
    cssModule: false,

    prefix: 'ethan',

    locale: 'en-US',

    delay: undefined,

    scrollRatio: 100,

    trim: undefined,

    spin: undefined,

    caret: undefined,
}

export function set(name, value) {
    if (value !== undefined && name in config) config[name] = value
}

export function setConfig(conf) {
    for (const [key, value] of entries(conf)) {
        set(key, value)
    }
}

export default config
