import { ValidatorProps } from '@/component/Rule/type'
import { isNumber } from '../is'

export default (options: ValidatorProps) => (value, _, callback) => {
    const { min, max, message } = options

    const val = parseFloat(value)

    if (Number.isNaN(val)) {
        callback(new Error(message))
    }

    if ((isNumber(min) && val < min) || (isNumber(max) && val > max)) {
        callback(new Error(message))
    } else {
        callback(true)
    }
}
