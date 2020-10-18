// obj以js entries 的风格转  [key, value]
export const entries = (obj) => {
  if (!obj) return []
  const keys = Object.keys(obj)
  return keys.map((key) => [key, obj[key]])
}
