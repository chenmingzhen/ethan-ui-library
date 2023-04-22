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
        visible,
        children,
        className,
        delay = 0.2,
        onVisibleChange,
        animation = true,
        trigger = 'hover',
        priorityDirection,
        getPopupContainer = () => document.body,
    } = props

    const triggerActions = isArray(trigger) ? trigger : [trigger]
    const [triggerEl, setTriggerEl] = useState<HTMLElement>()
    const [popupEl, setPopupEl] = useState<HTMLElement>()

    useEffect(() => {
        if (!popupEl) return
        /** color样式注入 */
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
            visible={visible}
            mouseEnterDelay={delay}
            mouseLeaveDelay={delay}
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
