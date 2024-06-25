export class FormError extends Error {
    value: any

    constructor(message: string, name?: string, value?: any) {
        super()
        this.message = message
        this.name = name
        this.value = value
    }
}

export const wrapFormError = (error) => {
    if (error instanceof Error) {
        return new FormError(error.message)
    }

    if (Array.isArray(error)) {
        return error.map(wrapFormError)
    }

    return error
}

export function isEveryRulePass(promises: Array<Promise<any>>) {
    return new Promise((resolve, reject) => {
        Promise.all(promises)
            .then(() => {
                resolve(true)
            })
            .catch((e) => {
                reject(wrapFormError(e))
            })
    })
}

export const isSameError = (a, b) => {
    if (a === b) return true

    if (a instanceof Error && b instanceof Error) {
        return a.message === b.message
    }

    return a === b
}
