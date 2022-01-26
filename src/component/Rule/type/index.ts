export interface BaseOptions {
    required?: RequiredOptions | true
    min?: MinOptions
    max?: MaxOptions
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

export type BaseOptionKeys = keyof BaseOptions

export type Validator = {
    [key in string]?: (val: number, formData: string, callback, props) => void | Promise<void | Error>
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
export interface BaseOptionRuleOutput {
    required: (message: string) => RequiredFuncOutPut

    min: (message: string) => LenFuncOutPut

    max: (message: string) => LenFuncOutPut
}
