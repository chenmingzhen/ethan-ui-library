import FormDatum from '@/utils/Datum/Form'
import { FormError } from '@/utils/errors'
import React from 'react'
import { Rule } from '../Rule/type'

export interface FormItemChildrenFuncParams<FormValue = any> {
    form: FormInstance<FormValue>
    value: any
    onChange: (value: any, ...args) => void
    error: undefined | Error
}

export interface FormItemProps<Value = any> extends Pick<FormContextProps, 'animation' | 'preserve' | 'disabled'> {
    className?: string
    label?: React.ReactNode
    labelAlign?: 'top' | 'right'
    labelWidth?: number | string
    required?: boolean
    tip?: React.ReactNode
    children: React.ReactNode | ((params: FormItemChildrenFuncParams<Value>) => React.ReactNode)
    style?: React.CSSProperties
    grid?: number | { width?: number; offset?: number; responsive?: number }
    rules?: Rule[]
    name?: string | string[]
    defaultValue?: any
    dependencies?: string[] | true
    noStyle?: boolean
    beforeChange?: (value: any, prevValue: any, form: FormInstance<Value>) => any
    /** 根FormItem集中收集Error */
    collectErrorInRoot?: boolean
}

export interface FormItemErrorListContext {
    onUpdateRootErrors?: (id: string, error: Error) => void
}

export interface IFormItemProps extends FormItemProps {
    formDatum: FormDatum
}

export interface FormItemContextProps extends Pick<FormContextProps, 'disabled'> {
    hasItemError?: boolean
}

export interface FormContextProps {
    formDatum: FormDatum
    disabled?: boolean
    labelAlign?: 'top' | 'right' | 'left'
    labelWidth?: string | number
    animation?: boolean
    preserve?: boolean
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
    onError?: (error: any) => void
    onReset?: () => void
    onSubmit?: (value: T) => void
    scrollToError?: boolean
    style?: React.CSSProperties
    labelAlign?: 'top' | 'right' | 'left'
    labelWidth?: string | number
    onChange?: (changeValues: Partial<T> | T, value: T) => void
    removeUndefined?: boolean
    errors?: Record<string, string | Error>
    animation?: boolean
    form?: FormInstance
    preserve?: boolean
}

export interface FormHelpProps extends Pick<FormContextProps, 'animation'> {
    error?: Error

    tip?: React.ReactNode
}

export interface FieldSetChildrenFuncParams<Value = any> {
    onAppend(value: Value): void
    onRemove(): void
    onInsert(index: number, value: Value): void
    list: any[]
    index: number
    value: any
}

export interface FieldSetProps<Value = any> extends Pick<FormContextProps, 'animation'> {
    defaultValue?: Value[]
    emptyRender?: (insert: (value: Value) => void) => React.ReactNode
    name: string
    rules?: Rule[]
    children: React.ReactNode | ((params: FieldSetChildrenFuncParams<Value>) => React.ReactNode)
    dependencies?: string[]
    preserve?: boolean
}

export interface IFieldSetProps extends FieldSetProps {
    formDatum: FormDatum
}

export interface FieldSetContextProps {
    path?: string
}

export type WithFlowProps = IFieldSetProps | IFormItemProps

export interface WithFlowOutputProps {
    onFlowUpdateBind: (update: () => void) => void
}

interface DatumSetParams {
    name: string | string[]
    value: any
}

export interface IDatumSetParams extends DatumSetParams {
    /** 是否触发onChange */
    FOR_INTERNAL_USE_DISPATCH_CHANGE?: boolean
    /** 是否往下层触发更新 */
    publishToChildrenItem?: boolean
}

interface DatumSetErrorParams {
    name: string | string[]
    error: FormError | Error | string
}
export interface FormInstance<Value = any> {
    get(name: string | string[]): any
    getValue(): Value
    set(params: DatumSetParams): void
    setValue(value: Partial<Value>): void
    setError(params: DatumSetErrorParams): void
    setFormError(errors: Record<string, string | Error>): void
    validate(name): any
    validateForm(names?: string[]): Promise<Value>
    reset(names?: string[]): void
    submit(): void
}

export interface InternalFormInstance extends FormInstance {
    GET_INTERNAL_FORM_DATUM(): FormDatum
}
