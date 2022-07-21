import { ValidatorProps } from '@/component/Rule/type'
import { isString } from '../is'
import nullable from './nullable'

export default (options: ValidatorProps) =>
    nullable((value, formData, callback) => {
        const { message, regExp } = options

        const reg = isString(regExp) ? new RegExp(regExp) : regExp

        if (reg.test(value)) {
            callback(true)
        } else {
            callback(new Error(message))
        }
    })
