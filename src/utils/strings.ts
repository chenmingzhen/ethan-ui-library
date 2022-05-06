export function capitalize(str: string) {
    if (typeof str !== 'string') {
        console.error(new Error('str should be a string'))
    }

    return str && str[0].toUpperCase() + str.slice(1)
}

export function substitute(str: string | ((obj: Record<string, any>) => any), obj: Record<string, any>) {
    if (typeof str === 'string') {
        if (str.indexOf('{') < 0) {
            return str
        }

        return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
            if (match.charAt(0) === '\\') {
                return match.slice(1)
            }

            return obj[name] === null || obj[name] === undefined ? '' : obj[name]
        })
    }
    if (typeof str === 'function') {
        let val = str(obj)

        if (val === obj && typeof val === 'object') {
            val = Object.assign({}, obj)
        }

        return val
    }

    return ''
}

export const parsePxToNumber = str => Number(str.replace(/\s+|px/gi, ''))
