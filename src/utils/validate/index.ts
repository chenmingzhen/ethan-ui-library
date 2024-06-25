import { BaseOptionRule, InnerRuleFuncResult, Rule, ValidatorFunc, ValidatorProps } from '@/component/Rule/type'
import { wrapFormError } from '../errors'
import { substitute } from '../strings'
import { flattenArray } from '../flat'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import regTest from './regExp'
import { isArray, isFunc, isPromise } from '../is'
import { warning } from '../warning'

function getRule(rule: Rule, props: ValidatorProps) {
    let innerRuleExecuteResult = rule as InnerRuleFuncResult

    if (isFunc(rule)) {
        /** 内置的检验的方法,执行方法获取message等信息 */
        if ((<BaseOptionRule[keyof BaseOptionRule]>rule).isInnerValidator) innerRuleExecuteResult = (rule as any)()
        /** RuleRender */ else return rule as unknown as ValidatorFunc
    }

    /** 执行内置检验方法获取的返回值 */
    const { type = props.type, message, ...other } = innerRuleExecuteResult

    props = Object.assign({}, props, other)

    props.message = typeof message === 'function' ? message(props) : substitute(message, props)

    if (other.required) return required(props)

    if (other.regExp) return regTest(props)

    if (other.min !== undefined || other.max !== undefined) {
        if (type === 'number') {
            /** 范围检测 */
            return range(props)
        }

        /** 长度检测 */
        return rangeLength(props)
    }

    const error = new Error('Rule is not valid.Please check your rule constructor and rulesProps')

    warning(`[Ethan UI:Rule]:${error.message}`)

    throw error
}

const validate = (value: any, formValues: any, rules: Rule[], props: ValidatorProps) =>
    new Promise((resolve, reject) => {
        const $rules = flattenArray(rules)
        const mergeProps: ValidatorProps = Object.assign({}, props, { type: isArray(value) ? 'array' : props.type })

        let remain = $rules.length

        for (const rule of $rules) {
            const validateFunction = getRule(rule, mergeProps)
            const promise = validateFunction(value, formValues, mergeProps)

            if (!isPromise(promise)) continue

            promise
                // eslint-disable-next-line @typescript-eslint/no-loop-func
                .then(() => {
                    remain -= 1

                    if (!remain) {
                        resolve(true)
                    }
                })
                .catch((error) => {
                    reject(wrapFormError(error))
                })
        }
    })

export default validate
