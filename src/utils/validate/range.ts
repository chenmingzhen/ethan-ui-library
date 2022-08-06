import { ValidatorProps } from '@/component/Rule/type'
import { isNumber } from '../is'
import nullable from './nullable'

export default (options: ValidatorProps) =>
    nullable((value, _, callback) => {
        const { min, max, message } = options

        if (value === undefined || value === '') {
            callback(true)
            return
        }

        const val = parseFloat(value)

        if (Number.isNaN(val)) {
            callback(new Error(message))
        }

        if ((isNumber(min) && val < min) || (isNumber(max) && val > max)) {
            callback(new Error(message))
        } else {
            callback(true)
        }
    })
