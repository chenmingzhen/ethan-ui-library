import { setLocale } from 'ethan-ui'

export const STORAGE_KEY = 'ETHAN_UI'
const storage = window.localStorage || null

let language

if (storage) {
    language = storage.getItem(STORAGE_KEY)
}

if (!language) {
    language = 'zh-CN'
}

// setLocale(language)

export function getItem(key) {
    if (storage) return storage.getItem(key)
    return key
}

export function setItem(key, v) {
    if (storage) return storage.setItem(key, v)
    return v
}

export function setLanguage(lang) {
    language = lang
    if (storage) {
        storage.setItem(STORAGE_KEY, lang)
        setLocale(language)
    }
}

export function getLanguage() {
    return language
}

export default function (cn, en = null) {
    return language === 'zh-CN' ? cn : en
}
