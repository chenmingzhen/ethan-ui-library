import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import { colorPickerClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import useSafeState from '@/hooks/useSafeState'
import useIsomorphicLayoutUpdateEffect from '@/hooks/useIsomorphicLayoutUpdateEffect'
import { styles } from '@/utils/style/styles'
import { getPortalPickerStyle } from '@/utils/position'
import useRefMethod from '@/hooks/useRefMethod'
import { ColorPickerProps } from './type'
import Caret from '../icons/Caret'
import ColorBoard from './ColorBoard'
import { getDefaultColor } from './util'
import Trigger from '../Trigger'

const ColorPicker: React.FC<ColorPickerProps> = function (props) {
    const {
        size,
        mode,
        style,
        value,
        onChange,
        disabled,
        className,
        defaultValue,
        dropdownStyle,
        format = 'rgba',
        showIcon = true,
        dropdownClassName,
        position = 'left-bottom',
        getPopupContainer = () => document.body,
        ...other
    } = props
    const [visible, updateVisible] = useSafeState(false)
    const [currentValue, updateCurrentValue] = useSafeState(value || defaultValue || getDefaultColor(format))
    const componentKey = useRef(getUidStr()).current
    const [triggerElement, setTriggerElement] = useState<HTMLDivElement>()
    const [portalElement, setPortalElement] = useState<HTMLDivElement>()
    const handleVisibleChange = useRefMethod((nextVisible: boolean) => {
        if (disabled) return

        updateVisible(nextVisible)
    })

    useIsomorphicLayoutUpdateEffect(() => {
        updateCurrentValue(value || getDefaultColor(format))
    }, [value])

    const handleChange = (color: string) => {
        if (onChange) {
            onChange(color)
        }

        const hasValue = 'value' in props && props.value !== undefined

        if (hasValue) return

        updateCurrentValue(color)
    }

    const transitionStyle = styles(dropdownStyle, getPortalPickerStyle(triggerElement, portalElement, position))
    const transitionCls = classnames(colorPickerClass('dropdown', dropdownClassName))

    return (
        <Trigger
            visible={visible}
            componentKey={componentKey}
            bindPortalElement={setPortalElement}
            getPopupContainer={getPopupContainer}
            onVisibleChange={handleVisibleChange}
            bindTriggerElement={setTriggerElement}
            transitionPopupProps={{
                style: transitionStyle,
                duration: 'fast',
                transitionTypes: ['fade'],
                hideDisplayAfterLeave: true,
                className: transitionCls,
                popup: (
                    <ColorBoard
                        {...other}
                        mode={mode}
                        format={format}
                        disabled={disabled}
                        value={currentValue}
                        onChange={handleChange}
                        componentKey={componentKey}
                    />
                ),
            }}
        >
            <div
                style={style}
                data-ck={componentKey}
                className={classnames(colorPickerClass('_', position, size && size, disabled && 'disabled'), className)}
            >
                <div className={colorPickerClass('inner')}>
                    <div className={colorPickerClass('result')}>
                        <div className={colorPickerClass('color')} style={{ backgroundColor: currentValue }} />
                    </div>
                    {showIcon && (
                        <span className={colorPickerClass('caret')}>
                            <Caret />
                        </span>
                    )}
                </div>
            </div>
        </Trigger>
    )
}

export default React.memo(ColorPicker)
