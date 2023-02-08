import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { getUidStr } from '@/utils/uid'
import useDragPosition from '@/hooks/useDragPosition'
import { styles } from '@/utils/style/styles'
import { isEmpty } from '@/utils/is'
import { setTransformProp } from '@/utils/dom/translate'
import useResizeSize from '@/hooks/useResizeSize'
import { CardContext, CardProps } from './type'
import { Provider } from './context'

const Card: React.FC<CardProps> = (props) => {
    const {
        collapsible = false,
        forwardedRef,
        moveable,
        resizable,
        shadow,
        className,
        defaultCollapsed,
        onCollapse,
    } = props
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed || true)
    const id = useRef(getUidStr()).current

    const computedCollapsed = React.useMemo(() => {
        if (!collapsible) return undefined

        return props.collapsed ?? collapsed
    }, [collapsed, props.collapsed, collapsible])

    const getDragTarget = useCallback(() => {
        if (!moveable) return undefined

        const container = document.getElementById(id)

        return container.querySelector(`.${cardClass('header')}`)
    }, [moveable])

    const getResizeTarget = useCallback(() => {
        if (!resizable) return undefined

        return document.getElementById(id)
    }, [resizable])

    const getBoundingElement = useRefMethod(() => document.getElementById(id))

    const { x, y, dragging } = useDragPosition({ getDragTarget, getBoundingElement })
    const { width, height } = useResizeSize({ getResizeTarget })
    const handleCollapse = React.useCallback(() => {
        if (onCollapse) onCollapse(!computedCollapsed)
        else setCollapsed(!computedCollapsed)
    }, [computedCollapsed, onCollapse])
    const cls = classnames(
        cardClass(
            '_',
            shadow === true ? 'shadow' : shadow,
            collapsible && 'collapsible',
            collapsed && 'collapsed',
            dragging && 'dragging'
        ),
        className
    )
    const style = styles(
        props.style,
        !isEmpty(x) && !isEmpty(y) ? setTransformProp(`translate(${x}px, ${y}px)`) : undefined,
        width && height ? { width, height } : undefined
    )

    const providerValue: CardContext = {
        onCollapse: handleCollapse,
        collapsible,
        collapsed: computedCollapsed,
    }

    return (
        <div className={cls} ref={forwardedRef} style={style} id={id}>
            <Provider value={providerValue}>{props.children}</Provider>
        </div>
    )
}

export default React.memo(Card)
