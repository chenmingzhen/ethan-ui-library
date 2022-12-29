import { isEmpty } from '@/utils/is'
import React, { useEffect, useState } from 'react'
import Popover, { PopoverProps } from '../Popover/Popover'

interface WrapperPopoverProps {
    children?: JSX.Element
    popoverProps?: Omit<PopoverProps, 'children'>
    tip?: React.ReactNode
    focus?: boolean
    className?: string
    hasError?: boolean
}

const WrapperPopover: React.FC<WrapperPopoverProps> = function (props) {
    const { children, popoverProps = {}, focus, tip, className, hasError } = props

    const [popoverVisible, updateVisible] = useState(() => {
        if (hasError) return true

        if (!focus) return false

        if (!isEmpty(tip)) return false

        return true
    })

    useEffect(() => {
        updateVisible(hasError || (focus && !isEmpty(tip)))
    }, [focus, tip, hasError])

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
            trigger="click"
            {...popoverProps}
            visible={popoverVisible}
            style={popoverStyles}
            className={className}
            placement={placement}
            content={tip}
            innerAlwaysUpdate
        >
            {children}
        </Popover>
    )
}

export default React.memo(WrapperPopover)
