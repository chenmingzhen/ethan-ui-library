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
    const popupElementRef = useRef<HTMLDivElement>()

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

    const getPopupElement = useRefMethod(() => popupElementRef.current)

    const computedPopupElementPosition = useRefMethod(() => {
        const element = popupElementRef.current
        if (!element) return

        const position = getPosition(placement, null, triggerElement, element.parentElement)
        const posStyle = getPositionStyle(position, triggerElement, element.parentElement)
        const ms = styles(style, posStyle)

        Object.keys(ms).forEach((k) => {
            element.style[k] = ms[k]
        })

        element.setAttribute('data-placement', position)
    })

    const adjustPopupElementPosition = useRefMethod(() => {
        if (!autoAdjustOverflow) return

        const element = popupElementRef.current
        if (!element) return

        const { left, right, top, bottom } = element.getBoundingClientRect()

        if (left < 0) {
            element.style.left = `${parsePxToNumber(element.style.left) + Math.abs(left)}px`
        } else if (right < 0) {
            element.style.right = `${parsePxToNumber(element.style.right) + Math.abs(right)}px`
        }

        if (top < 0) {
            element.style.top = `${parsePxToNumber(element.style.top) + Math.abs(top)}px`
        } else if (bottom < 0) {
            element.style.bottom = `${parsePxToNumber(element.style.bottom) + Math.abs(bottom)}px`
        }
    })

    const handleResize = useRefMethod(
        debounce(() => {
            computedPopupElementPosition()
            adjustPopupElementPosition()
        }, 300)
    )

    useEffect(() => handleResize.cancel, [])

    return (
        <Trigger
            visible={visible}
            componentKey={componentKey}
            onWindowResize={handleResize}
            triggerActions={triggerActions}
            onVisibleChange={updateVisible}
            getPopupElement={getPopupElement}
            getPopupContainer={getPopupContainer}
            onTriggerElementResize={handleResize}
            bindTriggerElement={setTriggerElement}
            mouseEnterDelay={!triggerActions.includes('mousedown') ? mouseEnterDelay : undefined}
            mouseLeaveDelay={!triggerActions.includes('mousedown') ? mouseLeaveDelay : undefined}
            popup={
                <div
                    {...popupProps}
                    ref={popupElementRef}
                    data-ck={componentKey}
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
            }
            motionComponentProps={{
                enter: animation,
                leave: animation,
                forceStep: !animation,
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
            }}
        >
            {children}
        </Trigger>
    )
}

export default React.memo(Popover)
