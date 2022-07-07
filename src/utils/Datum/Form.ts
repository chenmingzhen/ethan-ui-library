import deepEqual from 'deep-eql'
import { unflatten, insertValue, spliceValue, getSthByName } from '@/utils/flat'
import { fastClone, deepClone } from '@/utils/clone'
import { deepGet, deepSet, deepRemove, deepMerge, objectValues, deepHas } from '@/utils/objects'
import { isObject, isArray } from '@/utils/is'
import { promiseAll, FormError } from '@/utils/errors'
import { Rule } from '@/component/Rule/type'
import {
    updateSubscribe,
    errorSubscribe,
    changeSubscribe,
    VALIDATE_ACTION,
    RESET_ACTION,
    CHANGE_ACTION,
    FORCE_PASS,
    ERROR_TYPE,
    IGNORE_VALIDATE,
} from './types'
import { warningOnce } from '../warning'

export default class {
    $events: Record<string, ((...args) => void)[]> = {}

    $errors: Record<string, FormError> = {}

    $defaultValues = {}

    $values = {}

    $inputNames = {}

    $validator: Record<string, (value, data, action) => void> = {}

    rules: Rule[] = []

    onChange: (value) => void

    deepSetOptions = { forceSet: true, removeUndefined: undefined }

    constructor(options = {}) {
        const { removeUndefined = true, rules, onChange, value, error, initValidate } = options

        this.rules = rules

        this.onChange = onChange

        this.deepSetOptions.removeUndefined = removeUndefined

        if (value) this.setValue(value, initValidate ? undefined : IGNORE_VALIDATE)

        if (error) this.resetFormError(error)
    }

    private dispatch = (name: string, ...args) => {
        const event = this.$events[name]

        if (!event) return

        event.forEach(callback => callback(...args))
    }

    get = (name: string | string[]) => {
        if (Array.isArray(name)) return name.map(n => this.get(n))

        return deepGet(this.$values, name)
    }

    /** 设置表单的值 相当于setFieldsValue */
    setValue = (value, type) => {
        const values = isObject(value) ? value : {}

        if (values !== value) {
            warningOnce('[Ethan UI:Form]:Form value must be an Object')
        }

        if (deepEqual(this.$values, values)) return

        this.$values = deepClone(values)

        Object.keys(this.$inputNames)
            .sort((a, b) => a.length - b.length)
            .forEach(name => {
                /** @todo 点对点更新 */
                this.dispatch(updateSubscribe(name), this.get(name), name, type)
            })
    }

    subscribe = (name: string, callback) => {
        if (!this.$events[name]) this.$events[name] = []

        const events = this.$events[name]

        events.push(callback)
    }

    bind = (name: string, callback, value, validate) => {
        if (this.$inputNames[name]) {
            warningOnce(`There is already an item with name "${name}" exists. The name props must be unique.`)
        }

        if (value !== undefined && this.get(name) === null) {
            this.set(name, value, true)
        }

        if (value) this.$defaultValues[name] = fastClone(value)

        this.$validator[name] = validate

        this.$inputNames[name] = true

        this.subscribe(updateSubscribe(name), callback)

        this.subscribe(errorSubscribe(name), callback)
    }

    /** 往下层传递更新事件 */
    private publishValue = (name, type) => {
        const na = `${name}[`

        const no = `${name}.`

        Object.keys(this.$inputNames)
            .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
            .forEach(n => {
                this.dispatch(updateSubscribe(n), this.get(n), n, type)
            })
    }

    /** 设置（单个字段）的值，相当于ant setFields */
    private set = (name: string | string[], value, pub: boolean) => {
        if (isArray(name)) {
            this.setArrayValue(name, value)

            return
        }

        if (value === this.get(name)) return

        deepSet(this.$values, name, value, this.deepSetOptions)

        if (this.$inputNames[name]) {
            this.dispatch(updateSubscribe(name), value, name)
        }

        if (isObject(value) || pub) this.publishValue(name, FORCE_PASS)

        this.handleChange()
    }

    private setArrayValue = (names: string[], values) => {
        names.forEach((name, index) => {
            deepSet(this.$values, name, values[index], this.deepSetOptions)
        })

        names.forEach((name, index) => {
            if (this.$inputNames[name]) {
                this.dispatch(updateSubscribe(name), values[index], name)
            }
        })

        this.handleChange()
    }

    private handleChange = () => {
        if (this.onChange) this.onChange(this.getValue())
    }

    private getValue = () => {
        return deepClone(this.$values)
    }
}
