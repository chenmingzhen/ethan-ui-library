export function insertPoint(name) {
  const reg = /(\[\d+\])/gi
  return name.replace(reg, (s, m, i) => s.replace(m, i === 0 ? m : `.${m}`))
}
