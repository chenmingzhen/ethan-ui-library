import { isEmpty } from '@/utils/is'
import React, { useEffect, useState } from 'react'
import Popover from '../Popover/Popover'
import { PopoverProps } from '../Popover/type'

interface WrapperPopoverProps {
    children?: JSX.Element
    popoverProps?: Omit<PopoverProps, 'children'>
    tip?: React.ReactNode
    focus?: boolean
    className?: string
    hasError?: boolean
    /** 是否需要Popover，不存在tip或者rule的时候直接显示children */
    shouldPop: boolean
}

const WrapperPopover: React.FC<WrapperPopoverProps> = function (props) {
    const { children, popoverProps = {}, focus, tip, className, hasError, shouldPop } = props

    const [popoverVisible, updatePopoverVisible] = useState(() => {
        if (!shouldPop) return false

        if (hasError) return true

        if (!focus) return false

        if (!isEmpty(tip)) return false

        return true
    })

    useEffect(() => {
        if (shouldPop) {
            updatePopoverVisible(hasError || (focus && !isEmpty(tip)))
        }
    }, [focus, tip, hasError, shouldPop])

    if (!shouldPop) return children

    const popoverStyles =
        popoverProps.style && popoverProps.style.width
            ? popoverProps.style
            : popoverProps.style
            ? Object.assign({}, { minWidth: 200, maxWidth: 400 }, popoverProps.style)
            : { minWidth: 200, maxWidth: 400 }

    const placement = popoverProps.placement || 'bottom-left'

    return (
        <Popover
            animation={false}
            trigger="mousedown"
            {...popoverProps}
            visible={popoverVisible}
            style={popoverStyles}
            className={className}
            placement={placement}
            content={tip}
        >
            {children}
        </Popover>
    )
}

export default React.memo(WrapperPopover)
