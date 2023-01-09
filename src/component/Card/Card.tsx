import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import resizable from '@/hoc/resizable'
import useRefMethod from '@/hooks/useRefMethod'
import { getUidStr } from '@/utils/uid'
import useDragPosition from '@/hooks/useDragPosition'
import { styles } from '@/utils/style/styles'
import { isEmpty } from '@/utils/is'
import { setTransformProp } from '@/utils/dom/translate'
import { CardContext, CardProps } from './type'
import { Provider } from './context'

const Card: React.FC<CardProps> = (props) => {
    const { collapsible = false, forwardedRef, moveable, shadow, className, defaultCollapsed, onCollapse } = props
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed || true)
    const id = useRef(getUidStr()).current

    const computedCollapsed = React.useMemo(() => {
        if (!collapsible) return undefined

        return props.collapsed ?? collapsed
    }, [collapsed, props.collapsed, collapsible])

    const getDragTarget = useRefMethod(() => {
        if (!moveable) return undefined

        const container = document.getElementById(id)

        return container.querySelector(`.${cardClass('header')}`)
    })

    const getBoundingElement = useRefMethod(() => document.getElementById(id))

    const { x, y, dragging } = useDragPosition({ getDragTarget, getBoundingElement })

    const handleCollapse = React.useCallback(() => {
        if (onCollapse) onCollapse(!computedCollapsed)
        else setCollapsed(!computedCollapsed)
    }, [computedCollapsed, onCollapse])
    const cls = classnames(
        cardClass('_', shadow === true ? 'shadow' : shadow, collapsible && 'collapsible', collapsed && 'collapsed'),
        className,
        cardClass(dragging && 'dragging')
    )
    const style = styles(
        props.style,
        !isEmpty(x) && !isEmpty(y) ? setTransformProp(`translate(${x}px, ${y}px)`) : undefined
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

export default resizable(React.memo(Card))
