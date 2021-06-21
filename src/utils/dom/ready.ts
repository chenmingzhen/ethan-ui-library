const ready = (callback: () => void) => {
    if (!callback) return

    if (document.readyState !== 'loading') callback()
    else {
        document.addEventListener('DOMContentLoaded', callback)
    }
}

export default ready
