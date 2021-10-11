let supportPassive = false
try {
    const opts = Object.defineProperty({}, 'passive', {
        get() {
            supportPassive = true
        },
    })
    window.addEventListener('test', null, opts)
    // 理论执行完上面 supportPassive为true 可以拿到浏览器打印试试
} catch (e) {}

export const eventPassive = supportPassive ? { passive: true } : false

export const TRANSFORMS = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform',
}

let transform = 'transform'

export function getTransformName() {
    return transform
}

/**
 * 是否支持translate
 * @returns {boolean}
 */
export function has3d() {
    if (!window.getComputedStyle) {
        return false
    }

    const el = document.createElement('p')
    let result

    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null)

    Object.keys(TRANSFORMS).forEach(t => {
        // 每个浏览器有自己的前缀 如chrome 则webkitTransform有 transform为undefined
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)'
            transform = t
            result = window.getComputedStyle(el).getPropertyValue(TRANSFORMS[t])
        }
    })

    document.body.removeChild(el)

    return result !== undefined && result.length > 0 && result !== 'none'
}
