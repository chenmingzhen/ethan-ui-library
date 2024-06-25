import { ValidatorProps } from '@/component/Rule/type'
import { isNumber } from '../is'
import nullable from './nullable'

export default (options: ValidatorProps) =>
    nullable((value) => {
        const { min, max, message } = options

        if (value === undefined || value === '') {
            return Promise.resolve(null)
        }

        const val = parseFloat(value)

        if (Number.isNaN(val)) {
            return Promise.reject(new Error(message))
        }

        if ((isNumber(min) && val < min) || (isNumber(max) && val > max)) {
            return Promise.reject(new Error(message))
        }

        return Promise.resolve(null)
    })
