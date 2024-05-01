import React, { useCallback, useRef } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { getUidStr } from '@/utils/uid'
import useDragPosition from '@/hooks/useDragPosition'
import { styles } from '@/utils/style/styles'
import { isEmpty } from '@/utils/is'
import { setTransformProp } from '@/utils/dom/translate'
import useResizeSize from '@/hooks/useResizeSize'
import useMergedValue from '@/hooks/useMergedValue'
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
    const id = useRef(getUidStr()).current

    const [collapsed, setCollapsed] = useMergedValue({
        defaultStateValue: collapsible,
        options: {
            defaultValue: collapsible ? defaultCollapsed : undefined,
            value: collapsible ? props.collapsed : undefined,
            onChange: onCollapse,
        },
    })

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

    const { x, y, dragging } = useDragPosition({ getDragTarget, getBoundingElement, dragable: moveable })
    const { width, height } = useResizeSize({ getResizeTarget })
    const handleCollapse = useRefMethod(() => {
        setCollapsed(!collapsed)
    })
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
        collapsed,
    }

    return (
        <div className={cls} ref={forwardedRef} style={style} id={id}>
            <Provider value={providerValue}>{props.children}</Provider>
        </div>
    )
}

export default React.memo(Card)
