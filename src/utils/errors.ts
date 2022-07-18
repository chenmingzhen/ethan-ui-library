export class FormError extends Error {
    value: any

    constructor(message: string, name?: string, value?: any) {
        super()
        this.message = message
        this.name = name
        this.value = value
    }
}

export const wrapFormError = error => {
    if (error instanceof Error) {
        return new FormError(error.message)
    }

    if (Array.isArray(error)) {
        return error.map(wrapFormError)
    }

    return error
}

export const promiseAll = (ops, isForm = true) =>
    new Promise((resolve, reject) => {
        Promise.all(ops)
            .then(res => {
                const error = res.find(r => r !== true)

                if (error) reject(error)
                else resolve(true)
            })
            .catch(e => {
                reject(isForm ? wrapFormError(e) : e)
            })
    })

/** @see https://github.com/react-component/field-form/blob/master/src/utils/asyncUtil.ts  */

export function allPromiseFinish(promiseList: Promise<any>[]): Promise<any[]> {
    let hasError = false
    let count = promiseList.length
    const results = []

    if (!promiseList.length) {
        return Promise.resolve([])
    }

    return new Promise((resolve, reject) => {
        promiseList.forEach((promise, index) => {
            promise
                .catch(e => {
                    hasError = true
                    return e
                })
                .then(result => {
                    count -= 1
                    results[index] = result

                    if (count > 0) {
                        return
                    }

                    if (hasError) {
                        reject(results)
                    }
                    resolve(results)
                })
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
