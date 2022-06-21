import React, { useRef } from 'react'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import icons from '../icons'
import { OptionProps } from './type'

const Option: React.FC<OptionProps> = props => {
    const { data, onClick, isActive, index, disabled, groupKey, onHover, isHover, renderItem } = props

    const locked = useRef(false)

    function handleClick() {
        if (locked.current || disabled || data[groupKey]) return

        onClick(data)
    }

    const isGroupTitle = data[groupKey]

    const className = classnames(
        selectClass('option', isActive && 'active', isHover && 'hover', disabled && 'disabled', isGroupTitle && 'group')
    )

    const result = isGroupTitle ?? renderItem(data, index)

    return (
        <span
            className={className}
            onClick={handleClick}
            onMouseMove={() => {
                onHover(index)
            }}
        >
            {result}
            {isActive && icons.Check}
        </span>
    )
}

export default React.memo(Option)
