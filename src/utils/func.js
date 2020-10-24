// function的参数个数可以用length来获取  const f=(a,b,c)=>{}  f.length
// 此方法将多余的参数进行再封装 递归执行
export function curry(f, ...args) {
  if (args.length >= f.length) {
    return f(...args)
  }
  return (...next) => curry(f.bind(f, ...args), ...next)
}
