type MessageType = string | ((props: any) => string)

export interface BaseOptions {
    required?: RequiredOptions
    min?: MinOptions
    max?: MaxOptions
    regExp?: RegExpOptions
}

/** Options可以直接在构建Rule时传入进行配置，但优先级最低 */
/** const rule=Rule({required:{message:'BlaBlaBla'},min:{message(){return 'BlaBlaBla'},min:10}}) */
export type RequiredOptions = {
    message?: MessageType
}

export type MinOptions = {
    min: number
    message?: MessageType
}

export type MaxOptions = {
    max: number
    message?: MessageType
}

export type RegExpOptions = {
    regExp: string | RegExp
    message?: MessageType
}

export type BaseOptionKeys = keyof BaseOptions

export type ValidatorFunc = (
    val: any,
    formValues: any,
    callback: (res: true | Error) => void,
    props?: Record<string, any>
) => void | Promise<true>

export type Validator = {
    [key in string]?: ValidatorFunc
}

export type ValidatorProps = {
    [key in string]?: string | number
} & {
    max?: MaxFuncOutPut['max']
    min?: MinFuncOutPut['min']
    required?: RequiredFuncOutPut['required']
    regExp?: RegExpFuncOutPut['regExp']
    message?: string
}

/** 内置校验方法的输出,如果不想使用方法的形式，可以直接传入校验方法的输出 */
/** <Something rules={[Rule.require]} /> => <Something rules={[{required:true,message:'BlaBlaBla'}]} /> */
export interface RequiredFuncOutPut {
    message: MessageType
    required: boolean
}

export interface MinFuncOutPut {
    message: MessageType
    min: number
}

export interface MaxFuncOutPut {
    message: MessageType
    max: number
}

export interface RegExpFuncOutPut {
    message: MessageType
    regExp: string | RegExp
}

export interface Type {
    type: 'number' | 'array' | 'string'
}

export type InnerRuleFuncResult = RequiredFuncOutPut & MinFuncOutPut & MaxFuncOutPut & RegExpFuncOutPut & Type

/** 内置校验方法 */
export interface BaseOptionRule {
    required: {
        (message?: string): RequiredFuncOutPut
        isInnerValidator: true
    }
    min: {
        (length: number, message?: string): MinFuncOutPut
        isInnerValidator: true
    }
    max: {
        (length: number, message?: string): MaxFuncOutPut
        isInnerValidator: true
    }
    regExp: {
        (regexp: string | RegExp, message?: string): RegExpFuncOutPut
        isInnerValidator: true
    }
}

export type Rule =
    | Validator[keyof Validator]
    | BaseOptionRule[keyof BaseOptionRule]
    | RequiredFuncOutPut
    | MinFuncOutPut
    | MaxFuncOutPut
    | RegExpFuncOutPut
    | Type
