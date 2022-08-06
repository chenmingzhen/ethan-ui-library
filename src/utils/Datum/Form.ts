import deepEqual from 'deep-eql'
import { flatten, unflatten } from '@/utils/flat'
import { fastClone, deepClone } from '@/utils/clone'
import { deepGet, deepSet, deepRemove, deepHas } from '@/utils/objects'
import { isObject, isArray, isEmpty, isError, isString } from '@/utils/is'
import { FormInstance, IDatumSetParams } from '@/component/Form/type'
import { ERROR_ACTION, IGNORE_VALIDATE_ACTION, RESET_ACTION, CHANGE_ACTION } from './types'
import { warningOnce } from '../warning'
import { FormError } from '../errors'

interface DatumSetErrorParams {
    name: string | string[]
    error: FormError | Error | string
}

/** 除$values外，其他的映射值均为扁平化存储  */
export default class {
    $events: Record<string, ((...args) => void)[]> = {}

    $errors: Record<string, FormError> = {}

    $defaultValues = {}

    /** 非扁平化存储 */
    $values = {}

    $inputNames = {}

    $validator: Record<string, (values, data?) => Promise<true | FormError>> = {}

    onChange: (changeValues, values) => void

    deepSetOptions = { forceSet: true, removeUndefined: undefined }

    private dispatch = (name: string, data, type) => {
        const event = this.$events[name]

        if (!event) return

        event.forEach(callback => callback(name, data, type))
    }

    getForm = (): FormInstance => {
        return {
            /** 外部使用 */
            get: this.get,
            getValue: this.getValue,
            set: this.set,
            setValue: this.setValue,
            setError: this.setError,
            setFormError: this.setFormError,
            validate: this.validate,
            validateForm: this.validateForm,
            reset: this.reset,
            /** 内部获取Datum实例 */
            GET_INTERNAL_FORM_DATUM: () => this,
        }
    }

    setDefaultValue = defaultValue => {
        this.$defaultValues = { ...flatten(defaultValue || {}) }

        if (defaultValue) {
            this.setValue(defaultValue)
        }
    }

    get = (name: string | string[]) => {
        if (Array.isArray(name)) return name.map(n => this.get(n))

        return deepGet(this.$values, name)
    }

    /** 设置表单的值 相当于setFieldsValue */
    setValue = value => {
        const values = isObject(value) ? value : {}

        if (values !== value) {
            warningOnce('[Ethan UI:Form]:Form value must be an Object')
        }

        if (deepEqual(this.$values, values)) return

        this.$values = deepClone(values)

        Object.keys(this.$inputNames)
            .sort((a, b) => a.length - b.length)
            .forEach(name => {
                this.dispatch(name, this.get(name), IGNORE_VALIDATE_ACTION)
            })
    }

    subscribe = (name: string, callback) => {
        if (!this.$events[name]) this.$events[name] = []

        const events = this.$events[name]

        events.push(callback)
    }

    unsubscribe = (name: string, callback?) => {
        if (!this.$events[name]) return

        if (callback) this.$events[name] = this.$events[name].filter(fn => fn !== callback)
        else delete this.$events[name]
    }

    bind = (name: string, callback, value, validate) => {
        if (this.$inputNames[name]) {
            warningOnce(`There is already an item with name "${name}" exists. The name props must be unique.`)
        }

        if (value !== undefined && isEmpty(this.get(name))) {
            this.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: false, publishToChildrenItem: true })
        }

        /** Form的defaultValue优先级高于FormItem的 */
        if (!(name in this.$defaultValues) && value !== undefined) this.$defaultValues[name] = fastClone(value)

        this.$validator[name] = validate

        this.$inputNames[name] = true

        this.subscribe(name, callback)
    }

    unbind = (name: string | string[], preserve = false) => {
        if (!name) return

        if (Array.isArray(name)) {
            name.forEach(n => this.unbind(n))

            return
        }

        this.unsubscribe(name)

        this.unsubscribe(name)

        delete this.$inputNames[name]

        delete this.$validator[name]

        delete this.$errors[name]

        delete this.$defaultValues[name]

        if (!deepHas(this.$values, name)) return

        if (!preserve) {
            deepRemove(this.$values, name)
        }
    }

    /** 往下层传递更新事件 */
    private publishValue = (name, type?) => {
        const na = `${name}[`

        const no = `${name}.`

        Object.keys(this.$inputNames)
            .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
            .forEach(n => {
                this.dispatch(n, this.get(n), type)
            })
    }

    /** 设置（单个字段）的值，相当于ant setFields */
    set = ({
        name,
        value,
        FOR_INTERNAL_USE_DISPATCH_CHANGE = false,
        publishToChildrenItem = false,
    }: IDatumSetParams) => {
        if (isArray(name)) {
            this.setArrayValue(name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE)

            return
        }

        if (value === this.get(name)) return

        deepSet(this.$values, name, value, this.deepSetOptions)

        this.dispatch(name, value, CHANGE_ACTION)

        if (isObject(value) || publishToChildrenItem) this.publishValue(name)

        if (FOR_INTERNAL_USE_DISPATCH_CHANGE) {
            this.handleChange(unflatten({ [name]: value }))
        }
    }

    setFormError = (errors = {}) => {
        const flattenErrors = flatten(errors)

        Object.keys(flattenErrors).forEach(name => {
            const error = flattenErrors[name]

            this.setError({ name, error })
        })
    }

    setError = ({ name, error }: DatumSetErrorParams) => {
        if (isArray(name)) {
            ;[name] = name
        }

        let wrapError: FormError

        const value = this.get(name)

        if (this.$inputNames[name]) {
            if (isError(error)) {
                wrapError = new FormError(error.message, name, value)
            } else if (isString(error)) {
                wrapError = new FormError(error, name, value)
            }
        }

        this.dispatch(name, wrapError, ERROR_ACTION)
    }

    private setArrayValue = (names: string[], values, FOR_INTERNAL_USE_DISPATCH_CHANGE) => {
        const changeValues: Record<string, any> = {}

        const currentValues = this.get(names) || []

        names.forEach((name, index) => {
            const currentValue = currentValues[index]

            deepSet(this.$values, name, values[index], this.deepSetOptions)

            if (this.$inputNames[name]) {
                this.dispatch(name, values[index], CHANGE_ACTION)
            }

            if (currentValue !== values[index]) {
                changeValues[name] = values[index]
            }
        })

        if (FOR_INTERNAL_USE_DISPATCH_CHANGE) {
            this.handleChange(unflatten(changeValues))
        }
    }

    private handleChange = (changeValues: any) => {
        if (this.onChange) this.onChange(changeValues, this.getValue())
    }

    getValue = () => {
        return deepClone(this.$values)
    }

    validateForm = async (names?: string[]) => {
        if (!names) {
            names = Object.keys(this.$validator)
        }

        const validatePromise: Promise<any>[] = []

        const successRecord: any = {}

        const failResult = []

        for (let i = 0; i < names.length; i++) {
            validatePromise.push(this.validate(names[i]))
        }

        let count = validatePromise.length

        await new Promise(next => {
            validatePromise.forEach((promise, index) => {
                const name = names[index]

                promise
                    .then(value => {
                        if (value === undefined && this.deepSetOptions.removeUndefined) return

                        successRecord[name] = value
                    })
                    .catch((error: FormError) => {
                        const validateResult = unflatten({ [`${[error.name]}`]: error.message })

                        failResult.push(validateResult)
                    })
                    .finally(() => {
                        count -= 1

                        if (!count) {
                            next(undefined)
                        }
                    })
            })
        })

        if (failResult.length) return Promise.reject(failResult)

        /** 恢复到原本的格式 */
        const validateResult = unflatten(successRecord)

        return Promise.resolve(validateResult)
    }

    validate = (name: string) => {
        const validator = this.$validator[name]

        return new Promise((resolve, reject) => {
            if (!validator) {
                resolve({ [`${name}`]: undefined })

                return
            }

            const value = this.get(name)

            validator(value)
                .then(res => {
                    if (res !== true) {
                        reject(new FormError(res.message, name, value))
                    } else {
                        resolve(value)
                    }
                })
                .catch(e => {
                    reject(new FormError(e.message, name, value))
                })
        })
    }

    reset = (names?: string[]) => {
        const empty = isEmpty(names)

        const resetNames = empty ? Object.keys(this.$inputNames) : names

        if (empty) {
            this.setValue(unflatten(this.$defaultValues))
        } else {
            names.forEach(name => {
                deepSet(this.$values, name, this.$defaultValues[name], this.deepSetOptions)

                this.publishValue(name, RESET_ACTION)
            })
        }

        resetNames.forEach(name => {
            this.dispatch(name, this.$defaultValues[name], RESET_ACTION)
        })

        const changeValues: Record<string, any> = {}

        Object.keys(this.$inputNames).forEach(name => {
            changeValues[name] = this.$defaultValues[name] !== undefined ? this.$defaultValues[name] : undefined
        })

        this.handleChange(unflatten(changeValues))
    }

    /** For FieldSet */
    insert = (name: string, index: number, value) => {
        const values = this.get(name) as any[]

        if (values) {
            values.splice(index, 0, value)

            this.handleChange({ [name]: values })
            /** 在FieldSet中是使用index作为Key，此处强制Item的更新，使Item获得对应的value */
            this.publishValue(name)

            /** For useFormValuesEffect */
            this.dispatch(name, this.get(name), CHANGE_ACTION)
        } else {
            this.set({ name, value: [value], FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
        }
    }

    splice = (name: string, index: number) => {
        const values = this.get(name)

        values.splice(index, 1)

        this.handleChange({ [name]: values })

        this.publishValue(name)

        /** For useFormValuesEffect */
        this.dispatch(name, this.get(name), CHANGE_ACTION)
    }
}
