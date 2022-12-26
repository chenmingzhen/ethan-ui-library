/** 如果在FieldSet下的Item，需要添加上一层的name(path) */
export function extendName(path = '', name: string | string[]): string | string[] {
    if (name === undefined) return undefined

    if (name === '') return path

    if (Array.isArray(name)) return name.map((n) => extendName(path, n) as string)

    return `${path}${path.length > 0 ? '.' : ''}${name}`
}
