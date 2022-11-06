import React, { useRef } from 'react'
import classnames from 'classnames'
import { getUidStr } from '@/utils/uid'
import { tabsClass } from '@/styles'
import { filterUndefined } from '@/utils/objects'
import { TabProps } from './type'

const Tab: React.FC<TabProps> = (props) => {
    const {
        isActive,
        disabled,
        children,
        shape,
        isLast,
        onClick,
        id,
        moveToCenter,
        tabMoveMap,
        border,
        background,
        color,
        align,
        isVertical,
        activeTabStyle = {},
        tabStyle = {},
    } = props

    const uid = useRef(getUidStr()).current

    const element = useRef<HTMLElement>()

    function handleClick(init?: boolean | React.MouseEvent) {
        if (disabled) return

        if (init !== true) onClick(id, isActive)

        const domRect = element.current?.getBoundingClientRect?.()

        domRect && moveToCenter(domRect, isLast, id === 0)
    }

    const computedStyle = () => {
        const firstStyle = isActive ? { ...tabStyle, ...activeTabStyle } : tabStyle

        if (shape === 'line' || shape === 'dash') return firstStyle

        const style: React.CSSProperties = { background, color }

        if (border) {
            if (!isVertical) {
                style.borderColor = `${border} ${border} ${isActive ? background ?? border : border} ${border}`
            }

            if (align === 'vertical-left')
                style.borderColor = `${border} ${isActive ? background ?? border : border}  ${border} ${border}`

            if (align === 'vertical-right')
                style.borderColor = `${border} ${border} ${border} ${isActive ? background ?? border : border}`
        }

        const filterStyle = filterUndefined(style)

        return { ...firstStyle, ...filterStyle }
    }

    const newProps = {
        className: classnames(
            tabsClass('tab', isActive && 'active', disabled && 'disabled', shape === 'card' && 'tab-card'),
            uid
        ),
        onClick: handleClick,
        style: computedStyle(),
    }

    React.useEffect(() => {
        element.current = document.querySelector(`.${uid}`)

        if (isActive) handleClick(true)
    }, [])

    React.useEffect(() => {
        tabMoveMap.set(id, handleClick)
    }, [handleClick])

    return <div {...newProps}>{children}</div>
}

export default React.memo(Tab)
