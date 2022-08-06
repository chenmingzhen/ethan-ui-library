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
        /** RuleRender */ else return (rule as unknown) as ValidatorFunc
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
        /** 扁平化后 递归调用 */
        const $rules = flattenArray(rules)

        const rule = $rules.shift()

        const mergeProps = Object.assign({}, props, { type: isArray(value) ? 'array' : props.type })

        /** 递归结束 */
        if (rule === undefined) {
            resolve(true)

            return
        }

        function runNextCallback(result: boolean | string | Error | Error[]) {
            if (result !== true) {
                reject(wrapFormError(result))

                return
            }

            validate(value, formValues, $rules, mergeProps).then(resolve, reject)
        }

        const validateFunction = getRule(rule, mergeProps)

        /** 处理自定义规则校验与内置规则校验 */
        const promise = validateFunction(value, formValues, runNextCallback, mergeProps)

        /** 处理自定义规则校验 返回是Promise的情况 */
        if (isPromise(promise)) {
            promise.then(runNextCallback.bind(null, true)).catch(e => {
                reject(wrapFormError(e))
            })
        }
    })

export default validate
