import { InputBorderProps } from '@/hoc/inputBorder'
import { TrimProps } from '@/hoc/trim'
import React from 'react'
import { Rule } from '../Rule/type'

export interface BaseInputProps<Value = string | number>
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'prefix' | 'type' | 'value' | 'onChange' | 'defaultValue' | 'width'
        >,
        TrimProps,
        InputBorderProps {
    rules?: Rule[]
    className?: string
    clearable?: boolean | (() => void)
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
}

export interface InputProps extends Omit<BaseInputProps<string | number>, 'onChange' | 'onEnterPress'> {
    onChange?: (value: string) => void
    onEnterPress?: (value: string, evt: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface InputNumberProps extends Omit<BaseInputProps<number>, 'onInput'> {
    allowNull?: boolean
    hideArrow?: boolean
    max?: number
    min?: number
    step?: number
    onInput?: (str: string) => void
}

export interface InputPasswordProps extends BaseInputProps<string> {
    iconRender?: (visible: boolean) => React.ReactNode
}

export interface InputGroupProps extends Pick<BaseInputProps, 'size'>, InputBorderProps {}

export interface IInputProps extends BaseInputProps {
    htmlName?: string
}

export interface InputComponent extends React.ComponentClass<InputProps> {
    Number: React.ComponentClass<InputNumberProps>
    Password: React.ComponentClass<InputPasswordProps>
    Group: React.FunctionComponent<InputGroupProps>
}
