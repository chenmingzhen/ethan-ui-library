import Datum from '@/utils/Datum'
import { wrapFormError } from '../errors'
import { substitute } from '../strings'
import { flattenArray } from '../flat'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import regTest from './regExp'

function getRule(rule, props: Record<string, any> = {}) {
    let innerRuleExecuteResult

    if (typeof rule === 'function') {
        /** 内置的检验的方法,执行方法获取message,tip等信息 */
        if (rule.isInnerValidator) innerRuleExecuteResult = rule()
        /** RuleRender */ else return rule
    }

    /** @todo remove  */
    if (typeof props === 'string') props = { type: props }

    // 执行内置检验方法获取的返回值
    const { type = props.type, message, regExp, validator, ...other } = innerRuleExecuteResult

    props = Object.assign({}, props, other)

    props.message = typeof message === 'function' ? message(props) : substitute(message, props)

    // 返回自定义的规则校验方法,并在回调的props中添加message的属性
    if (validator) return (val, formData, callback) => validator(val, formData, callback, props)

    if (other.required) return required(props)

    if (regExp) return regTest(regExp, props)

    if (other.min !== undefined || other.max !== undefined) {
        if (type === 'number' || type === 'integer') {
            // 范围检测
            return range(props)
        }
        // 长度检测
        return rangeLength(props)
    }

    const err = new Error('Rule is not valid.Please check your rule constructor and rulesProps')

    console.error(err)

    throw err
}

const validate = (value, formData, rules, props) =>
    new Promise((resolve, reject) => {
        // 扁平化后 递归调用
        const $rules = flattenArray(rules)
        const rule = $rules.shift()

        if (rule === undefined) {
            resolve(true)
            return
        }
        if (!rule) {
            validate(value, formData, $rules, props).then(resolve, reject)
            return
        }

        /**
         * 检验结果结果回调
         * @param result
         */
        const callback = result => {
            if (result !== true) {
                reject(wrapFormError(result))
                return
            }
            // 递归调用 直到rule===undefined resolve 递归结束
            validate(value, formData, $rules, props).then(resolve, reject)
        }

        const fn = getRule(rule, props)
        let val = value
        if (fn === rule && (value instanceof Datum.List || value instanceof Datum.Form)) {
            val = value.getValue()
        }

        // 处理自定义规则校验与内置规则校验
        const cb = fn(val, formData, callback)

        // 处理自定义规则校验 返回是Promise的情况
        if (cb && cb.then) {
            cb.then(callback.bind(null, true)).catch(e => {
                reject(wrapFormError(e))
            })
        }
    })

export default validate
