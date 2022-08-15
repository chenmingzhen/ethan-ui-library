import { InputBorderProps } from '@/hoc/inputBorder'
import { TrimProps } from '@/hoc/trim'
import React from 'react'
import { Rule } from '../Rule/type'

/** 实际上Input组件的value都是string类型，泛型是给内部Input.Number使用的 */
export interface InputProps<Value extends string | number = string>
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

export interface InputNumberProps extends Omit<InputProps<number>, 'onInput'> {
    allowNull?: boolean
    hideArrow?: boolean
    max?: number
    min?: number
    step?: number
    onInput?: (str: string) => void
}

export interface InputPasswordProps extends InputProps<string> {
    iconRender?: (visible: boolean) => React.ReactNode
}

export interface InputGroupProps extends Pick<InputProps, 'size'>, InputBorderProps {}

export interface IInputProps extends InputProps {
    htmlName?: string
}

export interface InputComponent extends React.ComponentClass<InputProps> {
    Number: React.ComponentClass<InputNumberProps>
    Password: React.ComponentClass<InputPasswordProps>
    Group: React.FunctionComponent<InputGroupProps>
}
