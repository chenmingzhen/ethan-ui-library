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

export default class {
    $events: Record<string, ((...args) => void)[]> = {}

    $errors: Record<string, FormError> = {}

    $defaultValues = {}

    $values = {}

    $inputNames = {}

    $validator: Record<string, (value, data, action) => void> = {}

    rules: Rule[] = []

    onChange: (value) => void

    constructor(options = {}) {
        const { removeUndefined = true, rules, onChange, value, error, initValidate } = options

        this.rules = rules

        this.onChange = onChange

        this.removeUndefined = removeUndefined

        this.deepSetOptions = { removeUndefined, forceSet: true }

        if (value) this.setValue(value, initValidate ? undefined : IGNORE_VALIDATE)
        if (error) this.resetFormError(error)
    }


}
