export function formatSize(size) {
    const ss = /^(\d+)([%|\w]*)$/.exec(size)
    return {
        value: parseFloat(ss[1]),
        unit: ss[2] || 'px',
    }
}
