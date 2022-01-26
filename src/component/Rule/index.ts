import { getLocale } from '@/locale'
import { deepMerge } from '@/utils/objects'
import { substitute } from '@/utils/strings'
import {
    BaseOptions,
    Validator,
    BaseOptionKeys,
    BaseOptionRuleOutput,
    RequiredOptions,
    MinOptions,
    MaxOptions,
} from './type/index'
import { createLengthMessage, mergeOptions } from './util'

/**
 * @see https://stackoverflow.com/questions/70815177/typescript-complex-type-inference/70827227#70827227
 */
function Rule<R extends Validator | BaseOptions>(propOptions?: R) {
    const options = mergeOptions({}, propOptions) as R

    const deepMergeOptions = { skipUndefined: true }

    function required(msg: string) {
        const { message, tip } = (options.required as RequiredOptions) || {}

        return deepMerge(
            {
                required: true,
                message: props => {
                    return substitute(getLocale(`rules.required.${props.type === 'array' ? 'array' : 'string'}`), props)
                },
            },
            deepMerge({ message, tip }, { message: msg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    function min(msg: string) {
        const { message, len } = (options.min as MinOptions) || {}

        return deepMerge(
            { message: props => createLengthMessage('min', props) },
            deepMerge({ message, min: len }, { message: msg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    function max(msg: string) {
        const { message, len } = (options.max as MaxOptions) || {}

        return deepMerge(
            { message: props => createLengthMessage('max', props) },
            deepMerge({ message, min: len }, { message: msg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    const rules = {
        required,
        min,
        max,
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

    return rules as { [T in keyof R]: T extends BaseOptionKeys ? BaseOptionRuleOutput[T] : R[T] }
}

export default Rule
