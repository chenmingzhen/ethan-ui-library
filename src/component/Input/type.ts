import { InputBorderProps } from '@/hoc/inputBorder'
import React from 'react'
import { InputAbleProps } from '../Form/inputable'
import { PopoverProps } from '../Popover'

export interface InputProps<Value = string | number>
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'prefix' | 'type' | 'value' | 'onChange' | 'defaultValue'
        >,
        InputAbleProps {
    className?: string
    clearable?: boolean | (() => void)
    defaultValue?: Value
    digits?: number
    info?: number | ((value: Value) => string)
    maxLength?: number
    name?: string
    onChange?: (value: Value) => void
    onEnterPress?: (value: Value, evt: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
    size?: 'large' | 'default' | 'small'
    style?: React.CSSProperties
    type?: HTMLInputElement['type']
    value?: Value
    forwardedRef?: React.MutableRefObject<HTMLInputElement>
    /** InputBorder */
    tip?: React.ReactNode
    popoverProps?: Omit<PopoverProps, 'children'>
    /** Trim */
    trim?: boolean
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

export type IInputGrounpProps = Omit<InputGroupProps, 'className'>

export interface IInputProps extends InputProps {
    forceChange?(value: InputProps['value'])
    htmlName?: string
}

export interface InputComponent extends React.ComponentClass<InputProps> {
    Number: React.ComponentClass<InputNumberProps>
    Password: React.ComponentClass<InputPasswordProps>
    Group: React.FunctionComponent<InputGroupProps>
}
