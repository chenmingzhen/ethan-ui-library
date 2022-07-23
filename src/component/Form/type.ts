import { ValidateHocOutPutProps } from '@/hoc/withValidate'
import FormDatum from '@/utils/Datum/Form'
import { FormError } from '@/utils/errors'
import React from 'react'
import { Rule } from '../Rule/type'

export interface FormItemProps extends Pick<FormContextProps, 'animation'> {
    className?: string
    label?: React.ReactNode
    labelAlign?: 'top' | 'right'
    labelWidth?: number | string
    required?: boolean
    tip?: React.ReactNode
    children: React.ReactNode
    style?: React.CSSProperties
    grid?: number

    name?: string | string[]
    defaultValue?: any
    flow?: string[] | true
}

export interface IFormItemProps extends FormItemProps, ValidateHocOutPutProps, WithFlowOutputProps {
    formDatum: FormDatum

    throttle?: number
}

export interface FormItemContextProps {
    bindInputToItem: (name: string | string[]) => void
    unbindInputFromItem: (name: string | string[]) => void
    onItemError: (name: string, error: FormError) => void
}

export interface FormContextProps {
    formDatum: FormDatum
    disabled?: boolean
    labelAlign?: 'top' | 'right' | 'left'
    labelWidth?: string | number
    rules: Rule[]
    animation?: boolean
}

export interface FormProps<T extends Record<string, any>>
    extends Omit<
        React.FormHTMLAttributes<HTMLFormElement>,
        'value' | 'onChange' | 'defaultValue' | 'onSubmit' | 'onError'
    > {
    className?: string
    disabled?: boolean
    defaultValue?: Partial<T>
    inline?: boolean
    /** @todo */
    formRef?: (form: HTMLFormElement) => void
    onError?: (error: FormError) => void
    onReset?: () => void
    onSubmit?: (value: T) => void
    rules: Rule[]
    scrollToError?: boolean | number
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
    setFormStatus
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
