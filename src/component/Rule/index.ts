import { getLocale } from '@/locale'
import { deepMerge } from '@/utils/objects'
import { substitute } from '@/utils/strings'
import {
    BaseOptions,
    Validator,
    BaseOptionKeys,
    BaseOptionRule,
    RequiredOptions,
    MinOptions,
    MaxOptions,
    RegExpOptions,
} from './type/index'
import { createLengthMessage, mergeOptions } from './util'

/**
 * @see https://stackoverflow.com/questions/70815177/typescript-complex-type-inference/70827227#70827227
 */
function Rule<R extends Validator | BaseOptions>(propOptions?: R) {
    const options = mergeOptions({}, propOptions) as R

    const deepMergeOptions = { skipUndefined: true }

    function required(msg: string) {
        const { message } = (options.required as RequiredOptions) || {}

        return deepMerge(
            {
                required: true,
                message: props => {
                    return substitute(getLocale(`rules.required.${props.type === 'array' ? 'array' : 'string'}`), props)
                },
            },
            deepMerge({ message }, { message: msg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    function min(length: number, msg: string) {
        const { message, min: optionsMin = 0 } = (options.min as MinOptions) || {}

        return deepMerge(
            { message: props => createLengthMessage('min', props) },
            deepMerge({ message, min: optionsMin }, { message: msg, min: length }, deepMergeOptions),
            deepMergeOptions
        )
    }

    function max(length: number, msg: string) {
        const { message, max: optionsMax = Number.MAX_SAFE_INTEGER } = (options.max as MaxOptions) || {}

        return deepMerge(
            { message: props => createLengthMessage('max', props) },
            deepMerge({ message, max: optionsMax }, { message: msg, max: length }, deepMergeOptions),
            deepMergeOptions
        )
    }

    function regExp(reg: string | RegExp, msg: string) {
        const { message, regExp: optionRegExp } = (options.regExp as RegExpOptions) || {}

        return deepMerge(
            { message: getLocale('rules.reg') },
            deepMerge({ message, regExp: optionRegExp }, { message: msg, regExp: reg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    const rules = {
        required,
        min,
        max,
        regExp,
    }

    Object.keys(rules).forEach(key => {
        rules[key].isInnerValidator = true
    })

    const innerRuleKeys = Object.keys(rules)

    if (propOptions) {
        Object.keys(propOptions).forEach(key => {
            if (!innerRuleKeys.includes(key) && typeof propOptions[key] === 'function') {
                rules[key] = propOptions[key]
            }
        })
    }

    return (rules as unknown) as { [T in keyof Omit<R, BaseOptionKeys>]: R[T] } & BaseOptionRule
}

export default Rule
