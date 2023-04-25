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
        getPopupContainer,
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

    const portal = !!getPopupContainer

    const transitionStyle = styles(
        dropdownStyle,
        portal && getPortalPickerStyle(triggerElement, portalElement, position)
    )
    const transitionCls = classnames(colorPickerClass('dropdown', dropdownClassName))

    return (
        <div style={style} data-id={componentKey} className={classnames(colorPickerClass('_', position), className)}>
            <Trigger
                visible={visible}
                componentKey={componentKey}
                bindPortalElement={setPortalElement}
                getPopupContainer={getPopupContainer}
                onVisibleChange={handleVisibleChange}
                transitionComponentProps={{
                    style: transitionStyle,
                    duration: 'fast',
                    transitionTypes: ['fade'],
                    hideDisplayAfterLeave: true,
                    className: transitionCls,
                }}
                popup={
                    <ColorBoard
                        {...other}
                        mode={mode}
                        format={format}
                        disabled={disabled}
                        value={currentValue}
                        onChange={handleChange}
                        componentKey={componentKey}
                    />
                }
            >
                <div
                    className={colorPickerClass('inner', size && size, disabled && 'disabled')}
                    ref={setTriggerElement}
                >
                    <div className={colorPickerClass('result')}>
                        <div className={colorPickerClass('color')} style={{ backgroundColor: currentValue }} />
                    </div>
                    {showIcon && (
                        <span className={colorPickerClass('caret')}>
                            <Caret />
                        </span>
                    )}
                </div>
            </Trigger>
        </div>
    )
}

export default React.memo(ColorPicker)
