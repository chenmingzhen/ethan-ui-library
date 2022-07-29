import { ValidateHocOutPutProps } from '@/hoc/withValidate'
import FormDatum from '@/utils/Datum/Form'
import { FormError } from '@/utils/errors'
import React from 'react'
import { Rule } from '../Rule/type'

export interface FormItemChildrenFuncParams {
    formDatum: FormDatum
    value: any
    onChange: (value: any, ...args) => void
    error: undefined | Error
}

export interface FormItemProps extends Pick<FormContextProps, 'animation'> {
    className?: string
    label?: React.ReactNode
    labelAlign?: 'top' | 'right'
    labelWidth?: number | string
    required?: boolean
    tip?: React.ReactNode
    children: React.ReactNode | ((params: FormItemChildrenFuncParams) => React.ReactNode)
    style?: React.CSSProperties
    grid?: number

    name?: string | string[]
    defaultValue?: any
    flow?: string[] | true
    noStyle?: boolean
    /** 根FormItem设置不集中收集Error */
    noErrorInRoot?: boolean
}

export interface FormItemErrorListContext {
    onUpdateChildItemErrors?: (id: string, error: Error) => void
}

export interface IFormItemProps
    extends FormItemProps,
        ValidateHocOutPutProps,
        WithFlowOutputProps,
        FormItemErrorListContext {
    formDatum: FormDatum

    throttle?: number
}

export interface FormItemContextProps {
    hasItemError?: boolean
}

export interface FormContextProps {
    formDatum: FormDatum
    disabled?: boolean
    labelAlign?: 'top' | 'right' | 'left'
    labelWidth?: string | number
    rules: Rule[]
    animation?: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface FormProps<T extends Record<string, any> = {}>
    extends Omit<
        React.FormHTMLAttributes<HTMLFormElement>,
        'value' | 'onChange' | 'defaultValue' | 'onSubmit' | 'onError'
    > {
    className?: string
    disabled?: boolean
    defaultValue?: Partial<T>
    inline?: boolean
    formRef?: (form: HTMLFormElement) => void
    onError?: (error: any) => void
    onReset?: () => void
    onSubmit?: (value: T) => void
    rules: Rule[]
    scrollToError?: boolean
    style?: React.CSSProperties
    throttle?: number
    initValidate?: boolean
    labelAlign?: 'top' | 'right' | 'left'
    labelVerticalAlign?: 'top' | 'middle' | 'bottom'
    labelWidth?: string | number
    onChange?: (value: T) => void
    removeUndefined?: boolean
    value?: T
    error?: Record<string, string | Error>
    animation?: boolean
}

export interface IFormProps<T extends Record<string, any>> extends FormProps<T> {
    datum: FormDatum
}

export interface FormHelpProps extends Pick<FormContextProps, 'animation'> {
    error?: Error

    tip?: React.ReactNode
}

export interface FieldSetChildrenFuncParams {
    onAppend(value): void
    onRemove(): void
    onInsert(index: number, value): void
    list: any[]
    index: number
    value: any
}

export interface FieldSetProps extends Pick<FormContextProps, 'animation'> {
    defaultValue?: any[]
    emptyRender?: (insert: (value) => void) => React.ReactNode
    name: string
    rules?: Rule[]
    children: React.ReactNode | ((params: FieldSetChildrenFuncParams) => React.ReactNode)
    flow?: string[]
}

export interface IFieldSetProps extends FieldSetProps, ValidateHocOutPutProps, WithFlowOutputProps {
    formDatum: FormDatum
}

export interface FieldSetContextProps {
    path?: string
}

export type WithFlowProps = IFieldSetProps | IFormItemProps

export interface WithFlowOutputProps {
    onFlowUpdateBind: (update: () => void) => void
}
