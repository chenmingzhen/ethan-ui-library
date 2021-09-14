import React, { useRef, useMemo } from 'react'
import classnames from 'classnames'
import { getUidStr } from '@/utils/uid'
import { tabsClass } from '@/styles'
import { TabProps } from './type'

const Tab: React.FC<TabProps> = props => {
    const {
        isActive,
        background,
        border,
        color,
        isVertical,
        disabled,
        children,
        shape,
        isLast,
        onClick,
        id,
        moveToCenter,
        align,
        tabMoveMap,
    } = props

    const uid = useRef(getUidStr()).current

    const element = useRef<HTMLElement>()

    const isBordered = shape === 'bordered'

    const activeStyle = useMemo<React.CSSProperties>(() => {
        if (shape === 'line' || shape === 'dash') return {}

        if (shape === 'bordered') return { background }

        const style: React.CSSProperties = { background, color }

        if (!isVertical) {
            style.borderColor = `${border} ${border} ${isActive ? background : border} ${border}`
        }

        if (align === 'vertical-left')
            style.borderColor = `${border} ${isActive ? background : border}  ${border} ${border}`

        if (align === 'vertical-right')
            style.borderColor = `${border} ${border} ${border} ${isActive ? background : border}`

        return style
    }, null)

    function handleClick(init?: boolean | React.MouseEvent) {
        if (disabled) return

        if (init !== true) onClick(id, isActive)

        const domRect = element.current?.getBoundingClientRect?.()

        domRect && moveToCenter(domRect, isLast, id === 0)
    }

    const newProps = {
        className: classnames(
            tabsClass(
                'tab',
                isActive && (isBordered ? 'tab-bordered-active' : 'active'),
                disabled && 'disabled',
                isBordered && 'tab-bordered'
            ),
            uid
        ),
        onClick: handleClick,
        style: activeStyle,
    }

    React.useEffect(() => {
        element.current = document.querySelector(`.${uid}`)

        if (isActive) handleClick(true)
    }, [])

    React.useEffect(() => {
        tabMoveMap.current.set(id, handleClick)
    }, [handleClick])

    if (children?.type?.isTabLink) {
        return React.cloneElement(children, { ...newProps })
    }

    return <div {...newProps}>{children}</div>
}

Tab.defaultProps = {
    border: 'transparent',
}

export default React.memo(Tab)
