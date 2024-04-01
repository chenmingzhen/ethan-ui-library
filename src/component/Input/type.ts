import React from 'react'
import { Rule } from '../Rule/type'
import { PopoverProps } from '../Popover/type'

export interface BaseInputProps<Value = string | number>
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'prefix' | 'type' | 'value' | 'onChange' | 'defaultValue' | 'width' | 'onError'
    > {
    rules?: Rule[]
    className?: string
    clearable?: boolean
    defaultValue?: Value
    digits?: number
    maxLength?: number
    name?: string
    onChange?: (value: Value) => void
    onEnterPress?: (value: Value, evt: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
    size?: 'large' | 'default' | 'small'
    style?: React.CSSProperties
    type?: HTMLInputElement['type']
    value?: Value
    forwardedRef?: React.MutableRefObject<HTMLInputElement> | React.RefCallback<HTMLInputElement>
    onError?: (error: Error) => void
    disabled?: boolean
    tip?: React.ReactNode | ((value: string | number) => React.ReactNode)
    popoverProps?: Omit<PopoverProps, 'children'>
    onBlur?: (e: React.FocusEvent<Element>) => void
    onFocus?: (e: React.FocusEvent<Element>) => void
    border?: boolean
    width?: React.CSSProperties['width']
    autoFocus?: boolean
    trim?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
}

export interface InputProps extends Omit<BaseInputProps<string | number>, 'onChange' | 'onEnterPress'> {
    onChange?: (value: string) => void
    onEnterPress?: (value: string, evt: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface InputNumberProps extends Omit<BaseInputProps<number>, 'onInput' | 'onEnterPress'> {
    hideArrow?: boolean
    max?: number
    min?: number
    step?: number
    onInput?: (str: string) => void
    onEnterPress?: (value: number, evt: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface InputPasswordProps extends BaseInputProps<string> {
    iconRender?: (visible: boolean) => React.ReactNode
}

export interface InputGroupProps {
    disabled?: boolean
    tip?: React.ReactNode
    popoverProps?: Omit<PopoverProps, 'children'>
    onBlur?: (e: React.FocusEvent<Element>) => void
    onFocus?: (e: React.FocusEvent<Element>) => void
    border?: boolean
    width?: React.CSSProperties['width']
    style?: React.CSSProperties
    size?: 'large' | 'default' | 'small'
    className?: string
}

export interface IInputProps extends BaseInputProps {
    htmlName?: string
}
