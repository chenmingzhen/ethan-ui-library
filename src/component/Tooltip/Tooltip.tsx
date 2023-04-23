import { tooltipClass } from '@/styles'
import { getPositionStyle, getPosition } from '@/utils/dom/popover'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { isArray } from '@/utils/is'
import useUpdate from '@/hooks/useUpdate'
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
    const update = useUpdate({ debounceDuration: 300 })

    useEffect(() => {
        if (!popupEl) return
        /** color样式注入 */
        popupEl.style.setProperty('--var-trigger-color', color || null)
    }, [color, popupEl])

    const [position, style] = (() => {
        if (!triggerEl) return [props.position ?? 'top', undefined]

        const innerPosition = getPosition(props.position, priorityDirection, triggerEl, getPopupContainer?.())
        const formatPosition = innerPosition.split('-')?.[0]

        return [formatPosition, getPositionStyle(innerPosition, triggerEl, popupEl?.parentElement)]
    })()

    return (
        <Trigger
            visible={visible}
            onWindowResize={update}
            mouseEnterDelay={delay}
            mouseLeaveDelay={delay}
            onTriggerElementResize={update}
            triggerActions={triggerActions}
            onVisibleChange={onVisibleChange}
            bindTriggerElement={setTriggerEl}
            getPopupContainer={getPopupContainer}
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
