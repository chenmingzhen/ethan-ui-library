import { ValidatorFunc } from '@/component/Rule/type'

export default (fn: ValidatorFunc): ValidatorFunc => (value, formData, callback) => {
    if (value == null || value.length === 0) {
        callback(true)

        return
    }

    fn(value, formData, callback)
}
