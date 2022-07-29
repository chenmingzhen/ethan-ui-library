import deepEqual from 'deep-eql'
import { flatten, unflatten } from '@/utils/flat'
import { fastClone, deepClone } from '@/utils/clone'
import { deepGet, deepSet, deepRemove, deepHas } from '@/utils/objects'
import { isObject, isArray, isEmpty, isError, isString } from '@/utils/is'
import { Rule } from '@/component/Rule/type'
import { ERROR_ACTION, IGNORE_VALIDATE_ACTION, RESET_ACTION, CHANGE_ACTION } from './types'
import { warningOnce } from '../warning'
import { FormError } from '../errors'

interface FormDatumOptions {
    removeUndefined?: boolean

    rules?: Rule[]

    onChange?: (...args) => void

    value?: any

    initValidate?: boolean

    defaultValue?: any
}

interface DatumSetParams {
    name: string | string[]
    value: any
    /** 是否触发onChange */
    FOR_INTERNAL_USE_DISPATCH_CHANGE?: boolean
    /** 是否往下层触发更新 */
    publishToChildrenItem?: boolean
}

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

    $validator: Record<string, (value, data?) => Promise<true | FormError>> = {}

    rules: Rule[] = []

    onChange: (value) => void

    deepSetOptions = { forceSet: true, removeUndefined: undefined }

    constructor(options: FormDatumOptions) {
        const { removeUndefined = true, rules, onChange, value, defaultValue = {} } = options || {}

        this.rules = rules

        this.onChange = onChange

        this.deepSetOptions.removeUndefined = removeUndefined

        this.$defaultValues = { ...flatten(defaultValue) }

        const initValue = value in options ? value : defaultValue

        if (initValue) this.setValue(initValue)
    }

    private dispatch = (name: string, data, type) => {
        const event = this.$events[name]

        if (!event) return

        event.forEach(callback => callback(name, data, type))
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

    unbind = (name: string | string[]) => {
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

        deepRemove(this.$values, name)
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
    }: DatumSetParams) => {
        if (isArray(name)) {
            this.setArrayValue(name, value)

            return
        }

        if (value === this.get(name)) return

        deepSet(this.$values, name, value, this.deepSetOptions)

        this.dispatch(name, value, CHANGE_ACTION)

        if (isObject(value) || publishToChildrenItem) this.publishValue(name)

        if (FOR_INTERNAL_USE_DISPATCH_CHANGE) {
            this.handleChange()
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

    private setArrayValue = (names: string[], values) => {
        names.forEach((name, index) => {
            deepSet(this.$values, name, values[index], this.deepSetOptions)
        })

        names.forEach((name, index) => {
            if (this.$inputNames[name]) {
                this.dispatch(name, values[index], CHANGE_ACTION)
            }
        })

        this.handleChange()
    }

    private handleChange = () => {
        if (this.onChange) this.onChange(this.getValue())
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

        this.handleChange()
    }

    /** For FieldSet */
    insert = (name: string, index: number, value) => {
        const values = this.get(name) as any[]

        if (values) {
            values.splice(index, 0, value)

            this.handleChange()
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

        this.handleChange()

        this.publishValue(name)

        /** For useFormValuesEffect */
        this.dispatch(name, this.get(name), CHANGE_ACTION)
    }
}
