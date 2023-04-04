import useMergedValue from '@/hooks/useMergedValue'
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
        children,
        tip,
        trigger = 'hover',
        delay = 0,
        priorityDirection,
        visible,
        onVisibleChange,
        className,
        animation = true,
        color,
        getPopupContainer,
    } = props

    const triggerActions = isArray(trigger) ? trigger : [trigger]
    const [triggerEl, setTriggerEl] = useState<HTMLElement>()
    const [popupEl, setPopupEl] = useState<HTMLElement>()
    const [show, updateShow] = useMergedValue({
        defaultStateValue: false,
        options: {
            value: visible,
            onChange(nextVisible) {
                if (onVisibleChange) {
                    onVisibleChange(nextVisible)
                }
            },
        },
    })

    /** 样式注入 */
    useEffect(() => {
        if (!popupEl) return

        popupEl.style.setProperty('--var-trigger-color', color || null)
    }, [color, show, popupEl])

    const [position, style] = useMemo(() => {
        if (!triggerEl || !show) return [props.position ?? 'top', undefined]

        const innerPosition = getPosition(props.position, priorityDirection, triggerEl, getPopupContainer?.())
        const formatPosition = innerPosition.split('-')?.[0]

        return [formatPosition, getPositionStyle(innerPosition, triggerEl, popupEl?.parentElement)]
    }, undefined)

    return (
        <Trigger
            portal
            delay={delay}
            visible={show}
            onVisibleChange={updateShow}
            getPopupContainer={getPopupContainer}
            bindPopupElement={setPopupEl}
            bindTriggerElement={setTriggerEl}
            triggerActions={triggerActions}
            popupStyle={styles(props.style, style)}
            popup={
                <>
                    <div className={tooltipClass('arrow')} />
                    <div className={tooltipClass('inner')}>{tip}</div>
                </>
            }
            popupClassName={classnames(
                tooltipClass('_', position, animation && 'animation', show && 'show'),
                className
            )}
        >
            {children}
        </Trigger>
    )
}

export default React.memo(Tooltip)
