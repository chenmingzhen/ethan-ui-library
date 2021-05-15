// @ts-nocheck
import Datum from '@/utils/Datum'
import { wrapFormError } from '../errors'
import { substitute } from '../strings'
import { flattenArray } from '../flat'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import typeOf from './type'
import regTest from './regExp'

/**
 *
 * @param rules 用户输入的rule
 * @param props 经过筛选后的string或number类型的props
 * @returns function(*=, *=, *=): (undefined)
 */
function getRule(rules, props = {}) {
    if (typeof rules === 'function') {
        // 如果内置的检验的方法  执行该方法
        if (rules.isInnerValidator) rules = rules()
        else return rules
    }

    if (typeof props === 'string') props = { type: props }

    // 从执行的require中获取message 等信息
    // other中为内置的检测类型
    const { type = props.type, message, regExp, func, ...other } = rules

    props = Object.assign({}, props, other)
    // 执行requiredMessage XXXMessage的方法 获取到message的信息
    props.message = typeof message === 'function' ? message(props) : substitute(message, props)

    // 返回自定义的规则校验方法,并在回调的props中添加message的属性
    if (func) return (...args) => func(...args, props)

    // 如果rules对象中包含require 返回执行require检验
    if (other.required) return required(props)

    //
    if (regExp) return regTest(regExp, props)

    if (other.min !== undefined || other.max !== undefined) {
        if (type === 'number' || type === 'integer') {
            // 范围检测
            return range(props)
        }
        // 长度检测
        return rangeLength(props)
    }

    // 类型检测
    if (type) return typeOf(type, props.message)

    const err = new Error(`Rule ${JSON.stringify(rules)} is not valid.`)
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
