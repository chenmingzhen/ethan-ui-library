export interface RequiredOptions {
    message?: string
    tip?: string
}

export interface Options {
    required?: RequiredOptions | boolean

    /** 通过Option创建的自定义检验 */
    /** @todo 添加类型 */
    validator?: (val, formData, callback, props) => void | Promise<any>
}

export interface InnerRuleExecuteResult {
    message?: (props: { type?: 'array' | 'string' }) => void | string
    tip?: string
    required?: boolean
    validator?: (val, formData, callback, props) => void | Promise<any>
}

/** @todo 考虑将form传入 */
export type RuleRender = (form) => Options

export type RuleType = (Options | RuleRender)[]
