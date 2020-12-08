export default function(value) {
  if (typeof value === 'object') return true
  if (
    /^[\],:{}\s]*$/.test(
      value
        // 修改部分
        .replace(/\\["\\\bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  ) {
    try {
      JSON.parse(value)
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
