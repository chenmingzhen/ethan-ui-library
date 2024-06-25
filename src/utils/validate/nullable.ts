import { ValidatorFunc } from '@/component/Rule/type'

export default (fn: ValidatorFunc): ValidatorFunc =>
    (value, formData) => {
        if (value == null || value.length === 0) {
            return Promise.resolve(null)
        }

        return fn(value, formData)
    }
