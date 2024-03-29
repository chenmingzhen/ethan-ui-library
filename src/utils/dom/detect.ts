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
