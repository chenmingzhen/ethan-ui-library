import React, { createElement } from 'react'
import { datepickerClass } from '@/styles'
import icons from '../icons'
import { DatePickerIconProps } from './type'

const Icon: React.FC<DatePickerIconProps> = (props) => {
    const { className, name, onClick, tag, disabled } = props

    const newProps = {
        className: datepickerClass(className, 'icon', disabled && 'disabled'),
        onClick: disabled ? undefined : onClick,
    }

    return createElement(tag, newProps, icons[name])
}

Icon.defaultProps = {
    tag: 'span',
}

export default React.memo(Icon)
