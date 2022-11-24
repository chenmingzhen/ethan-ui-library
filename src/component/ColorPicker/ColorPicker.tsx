import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import { colorPickerClass } from '@/styles'
import { isDescendent } from '@/utils/dom/element'
import { getUidStr } from '@/utils/uid'
import useSafeState from '@/hooks/useSafeState'
import useIsomorphicLayoutUpdateEffect from '@/hooks/useIsomorphicLayoutUpdateEffect'
import { styles } from '@/utils/style/styles'
import { getPickerPortalStyle } from '@/utils/position'
import { ColorPickerProps } from './type'
import Caret from '../icons/Caret'
import AnimationList from '../List'
import ColorBoard from './ColorBoard'
import { getDefaultColor } from './util'
import Portal from '../Portal'

const ColorPicker: React.FC<ColorPickerProps> = function (props) {
    const {
        portal = true,
        size,
        disabled,
        className,
        style,
        value,
        defaultValue,
        position = 'left-bottom',
        onChange,
        mode,
        format = 'rgba',
        showIcon = true,
        dropdownClassName,
        dropdownStyle,
        ...other
    } = props

    const [show, updateShow] = useState(false)

    const [currentValue, updateCurrentValue] = useSafeState(value || defaultValue || getDefaultColor(format))

    const colorPickerId = useRef(getUidStr()).current

    const isRenderRef = useRef(false)

    const btnContainerRef = useRef<HTMLDivElement>()

    useIsomorphicLayoutUpdateEffect(() => {
        updateCurrentValue(value)
    }, [value])

    const cls = classnames(className, colorPickerClass('preview-btn', size && size, disabled && 'disabled'))

    const handleClickAway = useCallback((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, colorPickerId)

        if (desc) return

        updateShow(false)

        clearClickAway()
    }, [])

    const handleChange = (color: string) => {
        if (onChange) {
            onChange(color)
        }

        const hasValue = 'value' in props && props.value !== undefined

        if (hasValue) return

        updateCurrentValue(color)
    }

    const bindClickAway = () => {
        document.addEventListener('click', handleClickAway)
    }

    const clearClickAway = () => {
        document.removeEventListener('click', handleClickAway)
    }

    function togglePanel() {
        if (disabled) return

        if (!show) {
            bindClickAway()
        } else {
            clearClickAway()
        }

        updateShow(!show)
    }

    function renderColorBoard() {
        if (!show && !isRenderRef.current) return

        isRenderRef.current = true

        const rect = btnContainerRef.current?.getBoundingClientRect()

        const ms = styles(dropdownStyle, portal && getPickerPortalStyle(rect, position))

        return (
            <Portal portal={portal}>
                <AnimationList
                    lazyDom
                    show={show}
                    style={ms}
                    className={classnames(colorPickerClass('dropdown', dropdownClassName))}
                    animationTypes={['fade']}
                    duration="fast"
                    data-id={colorPickerId}
                >
                    <ColorBoard
                        {...other}
                        disabled={disabled}
                        mode={mode}
                        format={format}
                        value={currentValue}
                        onChange={handleChange}
                    />
                </AnimationList>
            </Portal>
        )
    }

    return (
        <div className={colorPickerClass('_', position)} data-id={colorPickerId}>
            <div className={cls} style={style} ref={btnContainerRef}>
                <div className={colorPickerClass('result')} onClick={togglePanel}>
                    <div className={colorPickerClass('color')} style={{ backgroundColor: currentValue }} />
                </div>
                {showIcon && (
                    <span className={colorPickerClass('caret')} onClick={togglePanel}>
                        <Caret />
                    </span>
                )}
            </div>

            {renderColorBoard()}
        </div>
    )
}

export default React.memo(ColorPicker)
