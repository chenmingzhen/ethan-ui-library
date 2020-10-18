import { entries } from './utils/objects'

const config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCALE || 'en-US',
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
}

export default config

export function set(name, value) {
  if (value !== undefined && name in config) config[name] = value
}

export function setConfig(conf) {
  for (const [key, value] of entries(conf)) {
    set(key, value)
  }
}
