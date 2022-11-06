import { ValidatorFunc, ValidatorProps } from '@/component/Rule/type'
import { isEmpty, isNumber } from '../is'

export default (options: ValidatorProps): ValidatorFunc =>
    (value, formData, callback) => {
        const { min, max, message } = options

        const error = new Error(message)

        if (isEmpty(value)) {
            if (min) callback(error)
            else callback(true)
            return
        }

        const len = value.length

        if ((isNumber(min) && len < min) || (isNumber(max) && len > max)) {
            callback(error)
        } else {
            callback(true)
        }
    }
