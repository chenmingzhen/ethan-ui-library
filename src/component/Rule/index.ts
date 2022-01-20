import { deepMerge } from '@/utils/objects'
import { substitute } from '@/utils/strings'
import { getLocale } from '@/locale'
import { mergeOptions } from './util'
import { Options, RequiredOptions } from './type/index'

export const RULE_TYPE = 'RULE_TYPE'

export default class Rule {
    options: Options

    $$type = RULE_TYPE

    constructor(propOptionArray: Options[] = []) {
        this.options = mergeOptions({}, ...propOptionArray)

        Reflect.defineProperty(this.required, 'isInnerValidator', { value: true })
        Reflect.defineProperty(this.validator, 'isInnerValidator', { value: true })
    }

    required = (msg: string): { required: boolean; message: string; tip?: string } => {
        const deepMergeOptions = { skipUndefined: true }

        const { message, tip } = (this.options.required as RequiredOptions) || {}

        return deepMerge(
            {
                required: true,
                message: props => {
                    // 如果props为空 则使用内置的requiredMessage 文案
                    return substitute(getLocale(`rules.required.${props.type === 'array' ? 'array' : 'string'}`), props)
                },
            },
            deepMerge({ message, tip }, { message: msg }, deepMergeOptions),
            deepMergeOptions
        )
    }

    validator = () => ({
        validator: this.options.validator,
    })
}
