import nullable from './nullable'

/**
 *
 * @param regExp 检验的正则表达式
 * @param options props
 * @returns {function(*=, *=, *=): (undefined)}
 */
export default (regExp, options) =>
    nullable((value, formData, callback) => {
        const { message } = options

        const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp
        if (reg.test(value)) {
            callback(true)
        } else {
            callback(new Error(message))
        }
    })
