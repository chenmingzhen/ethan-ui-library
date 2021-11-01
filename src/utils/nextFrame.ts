export function runInNextFrame(cb: () => void) {
    let rafId = requestAnimationFrame(() => {
        cb()

        rafId = null
    })

    return () => {
        if (rafId) {
            cancelAnimationFrame(rafId)

            rafId = null
        }
    }
}
