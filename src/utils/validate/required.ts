import { ValidatorFunc, ValidatorProps } from '@/component/Rule/type'

/** required校验 */
export default (options: ValidatorProps): ValidatorFunc =>
    (value, _, callback) => {
        const { message } = options

        /** tip: undefined==null => true. undefined===null => false */
        if (value == null || value.length === 0) {
            callback(new Error(message))
        } else {
            callback(true)
        }
    }
