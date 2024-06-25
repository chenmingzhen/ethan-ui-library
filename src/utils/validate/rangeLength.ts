import { ValidatorFunc, ValidatorProps } from '@/component/Rule/type'
import { isEmpty, isNumber } from '../is'

export default (options: ValidatorProps): ValidatorFunc =>
    (value) => {
        const { min, max, message } = options

        const error = new Error(message)

        if (isEmpty(value)) {
            if (min) return Promise.reject(error)

            return Promise.resolve(null)
        }

        const len = value.length

        if ((isNumber(min) && len < min) || (isNumber(max) && len > max)) {
            return Promise.reject(error)
        }

        return Promise.resolve(null)
    }
