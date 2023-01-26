// function的参数个数可以用length来获取  const f=(a,b,c)=>{}  f.length
// 此方法将多余的参数进行再封装 递归执行
// 需要筹齐所有参数才会执行的函数
export function curry(f, ...args) {
    if (args.length >= f.length) {
        return f(...args)
    }
    return (...next) => curry(f.bind(f, ...args), ...next)
}

/**
 * 整合context  左边层次最高 funcs从左边一直包裹到右边
 * 也可整合高阶组件 Origin Input示例
 */
export function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    const lastFunc = funcs[funcs.length - 1]

    const restFuncs = funcs.slice(0, -1)

    return (...args) => restFuncs.reduceRight((composed, f) => f(composed), lastFunc(...args))
}

export function preventDefault(e) {
    e.preventDefault()
}

export function noop() {}

export function stopPropagation(e) {
    e.stopPropagation()
}

export function createFunc(func) {
    if (typeof func === 'function') return func
    return (data) => (func ? data[func] : data)
}

export function debounce(fn, delay = 80) {
    let timer: NodeJS.Timeout

    const cancel = () => {
        if (timer) {
            clearTimeout(timer)

            timer = null
        }
    }

    function invoke(...args) {
        cancel()

        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }

    invoke.cancel = cancel

    return invoke
}

export function throttleWrapper(cb, delay = 80) {
    let timer = null

    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(this, args)
                timer = null
            }, delay)
        }
    }
}
