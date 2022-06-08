import { InputBorderProps } from '@/hoc/inputBorder'
import { TrimProps } from '@/hoc/trim'
import React from 'react'
import { InputAbleProps } from '../Form/inputable'

export interface InputProps<Value = string | number>
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'prefix' | 'type' | 'value' | 'onChange' | 'defaultValue'
        >,
        InputAbleProps,
        TrimProps,
        InputBorderProps {
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

export interface InputNumberProps extends InputProps {
    allowNull?: boolean
    hideArrow?: boolean
    max?: number
    min?: number
    step?: number
}

export interface InputPasswordProps extends InputProps<string> {
    point?: string
}

export interface InputGroupProps extends InputBorderProps {
    style?: React.CSSProperties
    className?: string
}

export type IInputGroupProps = Omit<InputGroupProps, 'className'>

export interface IInputProps extends InputProps {
    htmlName?: string
}

export interface InputComponent extends React.ComponentClass<InputProps> {
    Number: React.ComponentClass<InputNumberProps>
    Password: React.ComponentClass<InputPasswordProps>
    Group: React.FunctionComponent<InputGroupProps>
}
