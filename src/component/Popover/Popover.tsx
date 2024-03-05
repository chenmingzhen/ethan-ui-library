import React, { useEffect, useRef } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import { popoverClass } from '@/styles'
import classnames from 'classnames'
import useSafeState from '@/hooks/useSafeState'
import { isArray } from '@/utils/is'
import { getPosition, getPositionStyle } from '@/utils/dom/popover'
import { parsePxToNumber } from '@/utils/strings'
import { getUidStr } from '@/utils/uid'
import { styles } from '@/utils/style/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { debounce } from '@/utils/func'
import { PopoverProps } from './type'
import Trigger from '../Trigger'

const Popover: React.FC<PopoverProps> = function (props) {
    const {
        title,
        style,
        content,
        children,
        placement,
        className,
        destroyOnClose,
        onVisibleChange,
        arrowProps = {},
        innerProps = {},
        popupProps = {},
        showArrow = true,
        animation = true,
        trigger = 'hover',
        mouseEnterDelay = 0.1,
        mouseLeaveDelay = 0.1,
        defaultVisible = false,
        autoAdjustOverflow = true,
        getPopupContainer = () => document.body,
    } = props
    const triggerActions = isArray(trigger) ? trigger : [trigger]
    const componentKey = useRef(getUidStr()).current
    const [triggerElement, setTriggerElement] = useSafeState<HTMLElement>()
    const [visible, updateVisible] = useMergedValue({
        defaultStateValue: defaultVisible,
        options: {
            value: props.visible,
            onChange(nextVisible) {
                if (onVisibleChange) {
                    onVisibleChange(nextVisible)
                }
            },
        },
    })

    const computedPopupElementPosition = useRefMethod((popupElement: HTMLElement) => {
        if (!popupElement) return

        const position = getPosition(placement, null, triggerElement, popupElement.parentElement)
        const posStyle = getPositionStyle(position, triggerElement, popupElement.parentElement)
        const ms = styles(style, posStyle)

        Object.keys(ms).forEach((k) => {
            popupElement.style[k] = ms[k]
        })

        popupElement.setAttribute('data-placement', position)
    })

    const adjustPopupElementPosition = useRefMethod((popupElement: HTMLElement) => {
        if (!autoAdjustOverflow) return

        if (!popupElement) return

        const { left, right, top, bottom } = popupElement.getBoundingClientRect()

        if (left < 0) {
            popupElement.style.left = `${parsePxToNumber(popupElement.style.left) + Math.abs(left)}px`
        } else if (right < 0) {
            popupElement.style.right = `${parsePxToNumber(popupElement.style.right) + Math.abs(right)}px`
        }

        if (top < 0) {
            popupElement.style.top = `${parsePxToNumber(popupElement.style.top) + Math.abs(top)}px`
        } else if (bottom < 0) {
            popupElement.style.bottom = `${parsePxToNumber(popupElement.style.bottom) + Math.abs(bottom)}px`
        }
    })

    const handleResize = useRefMethod(
        debounce((popupElement: HTMLElement) => {
            computedPopupElementPosition(popupElement)
            adjustPopupElementPosition(popupElement)
        }, 100)
    )

    useEffect(() => handleResize.cancel, [])

    return (
        <Trigger
            visible={visible}
            componentKey={componentKey}
            onWindowResize={handleResize}
            triggerActions={triggerActions}
            onVisibleChange={updateVisible}
            getPopupContainer={getPopupContainer}
            onTriggerElementResize={handleResize}
            bindTriggerElement={setTriggerElement}
            mouseEnterDelay={!triggerActions.includes('mousedown') ? mouseEnterDelay : undefined}
            mouseLeaveDelay={!triggerActions.includes('mousedown') ? mouseLeaveDelay : undefined}
            motionPopupProps={{
                enter: animation,
                leave: animation,
                name: popoverClass('_'),
                destroyAfterLeave: destroyOnClose,
                onEnterPrepare: computedPopupElementPosition,
                onEnterStart(element) {
                    element.style.display = 'block'
                },
                onEnterEnd: adjustPopupElementPosition,
                onLeaveEnd(element) {
                    element.style.display = 'none'
                },
                popup: (
                    <div
                        {...popupProps}
                        className={classnames(
                            popoverClass('_', !showArrow && 'hide-arrow', animation && 'animation'),
                            className
                        )}
                    >
                        {showArrow && (
                            <div className={popoverClass('arrow')} {...arrowProps}>
                                <div className={popoverClass('arrow-content')} />
                            </div>
                        )}
                        <div className={popoverClass('inner')} {...innerProps}>
                            {title && <div className={popoverClass('title')}>{title}</div>}

                            <div className={popoverClass('inner-content')}>
                                {typeof content === 'function'
                                    ? content(() => {
                                          updateVisible(false)
                                      })
                                    : content}
                            </div>
                        </div>
                    </div>
                ),
            }}
        >
            {children}
        </Trigger>
    )
}

export default React.memo(Popover)
