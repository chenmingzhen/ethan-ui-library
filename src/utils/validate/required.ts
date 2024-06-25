import { ValidatorFunc, ValidatorProps } from '@/component/Rule/type'

/** required校验 */
export default (options: ValidatorProps): ValidatorFunc =>
    (value) => {
        const { message } = options

        /** tip: undefined==null => true. undefined===null => false */
        if (value == null || value.length === 0) {
            return Promise.reject(new Error(message))
        }

        return Promise.resolve(null)
    }
