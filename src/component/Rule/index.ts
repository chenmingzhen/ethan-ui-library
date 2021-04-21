// @ts-nocheck 
import { deepMerge, objectValues } from '@/utils/objects'
import { isObject } from '@/utils/is'
import required from './required'
import length from './length'
import type from './type'
import regExp from './regExp'

export const RULE_TYPE = 'RULE_OBJECT'
const innerType = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']

/**
 * 合并自定义的检验规则
 * @param opts
 * @param args
 * @returns {{}}
 */
const mergeOptions = (opts = {}, ...args) => {
  if (!isObject(opts)) {
    console.error(new Error(`rules expect an object, got ${typeof options}`))
    return {}
  }

  if (args.length === 0) return opts
  const arg = args.shift()

  Object.keys(arg).forEach(k => {
    // 如果传入的是非标准的格式 进行格式化
    // 标准 isOneRule={isOne:{func:()=>{}}
    // 非标准 isOneRule={isOne:()=>{}}
    if (typeof arg[k] === 'function') arg[k] = { func: arg[k] }
  })
  return mergeOptions(deepMerge(opts, arg), ...args)
}

export default function(...opts) {
  const options = mergeOptions({}, ...opts)

  const rules = {
    required: required(options.required), // 执行required方法 返回闭包方法 util/validate/index中执行
    max: length('max', options.max),
    min: length('min', options.min),
    regExp: regExp(options.regExp),
    type: t => type(t, options.type),
  }

  rules.length = (min, max, msg) => [rules.min(min, msg), rules.max(max, msg)]
  rules.range = (min, max, msg) => [rules.min(min, msg), rules.max(max, msg)]

  // 对innerType规则进行声明 email等
  innerType.forEach(k => {
    // 如果构造时有传入type 则使用传入的消息
    // 否则 使用默认的校验

    // 如下

    // <Input rules={[{ type: 'email', message: 'Please enter a valid email.' }]} popover="top" />

    // const rule = Rule({
    //   required: {
    //     message: (props) => `The field ${props.title} is required.`
    //   },
    //   email: {
    //     message: 'Email is invalid.'
    //   }
    // })
    rules[k] = type(k, options[k] || options.type)
  })

  // 原始的规则Key  require max min 等
  const ruleKeys = Object.keys(rules)

  Object.keys(options).forEach(k => {
    if (!ruleKeys.includes(k)) {
      // 用户自定义的规则
      if (isObject(options[k])) {
        // 返回一个方法 执行该方法可以得到包含自定义的规则方法，message,args的对象 validate的getRule中使用
        rules[k] = args => Object.assign({}, options[k], { args })
      } else {
        console.error(new Error(`Rule ${k} is invalid, expect a function or an object.`))
      }
    }
  })

  objectValues(rules).forEach(rule => {
    rule.isInnerValidator = true
  })

  rules.$$type = RULE_TYPE
  return rules
}
