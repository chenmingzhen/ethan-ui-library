export interface BaseOptions {
    required?: RequiredOptions
    min?: MinOptions
    max?: MaxOptions
    regExp?: RegExpOptions
}

export type RequiredOptions = {
    message?: string

    tip?: string
}

export type MinOptions = {
    len: number
    message?: string
}

export type MaxOptions = {
    len: number
    message?: string
}

export type RegExpOptions = {
    regExp: string | RegExp
    message?: string
}

export type BaseOptionKeys = keyof BaseOptions

export type Validator = {
    /**
     * @todo 完善类型
     */
    [key in string]?: (val: any, formData: any, callback, props) => void | Promise<void | Error>
}

export type RequiredFuncOutPut = {
    message: (() => string) | string
    tip?: string
    required: true
}

export type LenFuncOutPut = {
    message: string

    len: number
}

export type RegExpFuncOutPut = {
    message: string

    regExp: string | RegExp
}

export interface BaseOptionRuleOutput {
    required: (message: string) => RequiredFuncOutPut

    min: (message: string) => LenFuncOutPut

    max: (message: string) => LenFuncOutPut

    regExp: (message: string) => RegExpFuncOutPut
}

export type Rule = Validator[keyof Validator] | BaseOptionRuleOutput[keyof BaseOptionRuleOutput]
