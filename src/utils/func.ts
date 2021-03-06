// function的参数个数可以用length来获取  const f=(a,b,c)=>{}  f.length
// 此方法将多余的参数进行再封装 递归执行
// 需要筹齐所有参数才会执行的函数
export function curry(f, ...args) {
    if (args.length >= f.length) {
        return f(...args)
    }
    return (...next) => curry(f.bind(f, ...args), ...next)
}

// 整合context  左边层次最高 funcs从左边一直包裹到右边
// 也可整合高阶组件 Origin Input示例
export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    // last(...args) 起始值
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

export function empty(e) {
    e.preventDefault()
}

export function createFunc(func) {
    if (typeof func === 'function') return func
    return data => (func ? data[func] : data)
}
