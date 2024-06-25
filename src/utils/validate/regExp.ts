import { ValidatorProps } from '@/component/Rule/type'
import { isString } from '../is'
import nullable from './nullable'

export default (options: ValidatorProps) =>
    nullable((value) => {
        const { message, regExp } = options

        const reg = isString(regExp) ? new RegExp(regExp) : regExp

        if (reg.test(value)) {
            return Promise.resolve(null)
        }

        return Promise.reject(new Error(message))
    })
