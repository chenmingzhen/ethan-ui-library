import useMergedValue from '@/hooks/useMergedValue'
import { sliderClass } from '@/styles'
import { isArray } from '@/utils/is'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import Slider from './Slider'
import { SliderContainerProps } from './type'
import { perToValue } from './utils'

const SliderContainer: React.FC<SliderContainerProps> = function (props) {
    const {
        vertical = false,
        height = 200,
        disabled,
        range,
        className,
        style,
        scale = [0, 100],
        onChange,
        step = 1,
        formatScale = (v) => v,
        autoHide,
        ...other
    } = props
    const [value, updateValue] = useMergedValue({
        defaultStateValue: undefined,
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(nextValue) {
                if (onChange) {
                    onChange(nextValue)
                }
            },
        },
    })
    const rangeContainerElementRef = useRef<HTMLDivElement>()
    const computedValue = useMemo(() => {
        const from = scale[0]

        if (!range) return value || from

        let val = value

        if (range && !Array.isArray(value)) val = [from, from]

        if (val[0] > val[1]) val = [val[1], val[0]]

        return val
    }, [range, value, scale])

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (disabled || (e.target as HTMLDivElement).className.indexOf(sliderClass('indicator')) >= 0) return

        const rect = rangeContainerElementRef.current.getBoundingClientRect()

        const per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width

        const val = perToValue(per, scale, step)

        if (!range) {
            updateValue(val)

            return
        }

        const values = [...(computedValue as number[])]

        if (val < values[0]) values[0] = val
        else values[1] = val

        updateValue?.(values)
    }

    function handleChange(index: number, val: number) {
        if (!range) {
            updateValue(val)
            return
        }

        const values = [...(computedValue as number[])]

        values[index] = val

        updateValue(values)
    }

    const cls = classnames(sliderClass('_', vertical && 'vertical', disabled && 'disabled'), className)
    const ms = styles(vertical ? { height } : undefined, style)
    const arrayValue = isArray(computedValue) ? computedValue : [0, computedValue]

    return (
        <div style={ms} className={cls}>
            <div className={sliderClass('background')} />
            <div ref={rangeContainerElementRef} onClick={handleClick} className={sliderClass('inner')}>
                {range && (
                    <Slider
                        {...other}
                        scale={scale}
                        index={0}
                        max={arrayValue[1]}
                        onChange={handleChange}
                        value={arrayValue[0]}
                        vertical={vertical}
                        step={step}
                        formatValue={formatScale}
                        autoHide={autoHide}
                    />
                )}

                <Slider
                    {...other}
                    index={1}
                    min={arrayValue[0]}
                    onChange={handleChange}
                    value={arrayValue[1]}
                    vertical={vertical}
                    step={step}
                    formatValue={formatScale}
                    autoHide={autoHide}
                    scale={scale}
                />
            </div>

            {formatScale ? (
                <div className={sliderClass('scale', !autoHide && 'show')}>
                    {scale.map((s) => (
                        <div key={s}>
                            <span>{formatScale(s)}</span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default React.memo(SliderContainer)
