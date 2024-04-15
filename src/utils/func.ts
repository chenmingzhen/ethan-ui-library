// function的参数个数可以用length来获取  const f=(a,b,c)=>{}  f.length
// 此方法将多余的参数进行再封装 递归执行
// 需要筹齐所有参数才会执行的函数
export function curry(f, ...args) {
    if (args.length >= f.length) {
        return f(...args)
    }
    return (...next) => curry(f.bind(f, ...args), ...next)
}

export function preventDefault(e) {
    e.preventDefault()
}

export function noop() {}

export function stopPropagation(e) {
    e.stopPropagation()
}

export function debounce(fn, duration = 80) {
    let timer: NodeJS.Timeout

    const cancel = () => {
        if (timer) {
            clearTimeout(timer)

            timer = null
        }
    }

    function invoke(...args) {
        cancel()

        if (!duration) {
            fn(...args)

            return
        }

        timer = setTimeout(() => {
            fn(...args)
        }, duration)
    }

    invoke.cancel = cancel

    return invoke
}

export function throttleWrapper(cb, duration = 80) {
    let timer = null

    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(this, args)
                timer = null
            }, duration)
        }
    }
}

export function runAsMicrotask(cb: () => void) {
    Promise.resolve(null).then(cb)
}
