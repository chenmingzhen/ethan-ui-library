import { tooltipClass } from '@/styles'
import { getPositionStyle, getPosition } from '@/utils/dom/popover'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { isArray } from '@/utils/is'
import { TooltipProps } from './type'
import Trigger from '../Trigger'

const Tooltip: React.FC<TooltipProps> = function (props) {
    const {
        tip,
        color,
        children,
        className,
        getPopupContainer,
        visible,
        trigger = 'hover',
        delay = 0,
        priorityDirection,
        onVisibleChange,
        animation = true,
    } = props

    const triggerActions = isArray(trigger) ? trigger : [trigger]
    const [triggerEl, setTriggerEl] = useState<HTMLElement>()
    const [popupEl, setPopupEl] = useState<HTMLElement>()

    /** 样式注入 */
    useEffect(() => {
        if (!popupEl) return

        popupEl.style.setProperty('--var-trigger-color', color || null)
    }, [color, popupEl])

    const [position, style] = useMemo(() => {
        if (!triggerEl) return [props.position ?? 'top', undefined]

        const innerPosition = getPosition(props.position, priorityDirection, triggerEl, getPopupContainer?.())
        const formatPosition = innerPosition.split('-')?.[0]

        return [formatPosition, getPositionStyle(innerPosition, triggerEl, popupEl?.parentElement)]
    }, undefined)

    return (
        <Trigger
            portal
            delay={delay}
            visible={visible}
            onVisibleChange={onVisibleChange}
            getPopupContainer={getPopupContainer}
            bindTriggerElement={setTriggerEl}
            triggerActions={triggerActions}
            motionComponentProps={{
                enter: animation,
                leave: false,
                leaveClassName: tooltipClass('hidden'),
                name: tooltipClass('_'),
            }}
            popup={
                <div
                    ref={setPopupEl}
                    style={styles(props.style, style)}
                    className={classnames(tooltipClass('_', position), className)}
                >
                    <div className={tooltipClass('arrow')} />
                    <div className={tooltipClass('inner')}>{tip}</div>
                </div>
            }
        >
            {children}
        </Trigger>
    )
}

export default React.memo(Tooltip)
