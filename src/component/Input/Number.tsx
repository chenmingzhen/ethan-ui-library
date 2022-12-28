import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { inputClass } from '@/styles'
import { isNan, isNull, isString } from '@/utils/is'
import { KeyboardKey } from '@/utils/keyboard'
import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import { InputNumberProps } from './type'
import icons from '../icons'
import useInputStyle from './hooks/useInputStyle'

const Number: React.FC<InputNumberProps> = function (props) {
    const {
        step = 1,
        allowNull = false,
        hideArrow = false,
        onInput,
        onEnterPress,
        disabled,
        digits,
        onChange,
        min,
        max,
        defaultValue,
        onBlur,
        ...other
    } = props

    const [valueStr, updateValueStr] = useState<string>()
    const [focus, updateFocus] = useState(other.autoFocus || false)
    const holdRef = useRef<boolean>()
    const keyPressTimer = useRef<NodeJS.Timeout>()
    const [value, updateValue] = useMergedValue({
        defaultStateValue: undefined,
        options: { value: other.value, defaultValue, onChange },
    })
    const { className, style } = useInputStyle({
        border: other.border,
        size: other.size,
        disabled,
        className: other.className,
        width: other.width,
        style: other.style,
        focus,
    })
    useEffect(() => {
        if (valueStr !== undefined) {
            updateValueStr(undefined)
        }
    }, [value])

    const parseValue = useRefMethod((rawValue: string) => {
        let parsedValue = parseFloat(rawValue)

        if (rawValue === '' && allowNull) {
            parsedValue = null
        }

        if (isNan(parsedValue)) parsedValue = 0

        return parsedValue
    })

    const handleEnterPress = useRefMethod((_, evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterPress) {
            const parsedValue = parseValue(valueStr)

            if (!isNan(parsedValue)) {
                onEnterPress(parsedValue, evt)
            } else {
                onEnterPress(null, evt)
            }
        }
    })

    const beforeChange = useRefMethod((nextValue: string) => {
        /** 处于手动输入状态 */
        if (isString(nextValue) && new RegExp('^-?\\d*\\.?\\d*$').test(nextValue)) {
            updateValueStr(nextValue)

            if (onInput) {
                onInput(nextValue)
            }
        }
    })

    const handleChange = useRefMethod((nextValue: number | null) => {
        updateValueStr(undefined)

        if (onInput) {
            onInput(undefined)
        }
        if (isNull(nextValue)) {
            updateValue(nextValue)

            return
        }

        if (typeof digits === 'number') {
            nextValue = parseFloat(nextValue.toFixed(digits))
        } else {
            const stepStr = step.toString()
            const dot = stepStr.lastIndexOf('.')

            if (dot >= 0) nextValue = parseFloat(nextValue.toFixed(stepStr.length - dot))
        }

        if (max !== undefined && nextValue > max) nextValue = max
        if (min !== undefined && nextValue < min) nextValue = min

        updateValue(nextValue)
    })

    const changeValue = useRefMethod((mod: number) => {
        if (disabled) return

        let rawValue = parseFloat(`${String(value) || ''}`.replace(/,/g, ''))

        if (isNan(value)) rawValue = 0

        handleChange(rawValue + mod)
    })

    const handleKeyDown = useRefMethod((e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e

        if (key !== KeyboardKey.ArrowUp && key !== KeyboardKey.ArrowDown) return

        e.preventDefault()

        const mod = key === KeyboardKey.ArrowUp ? step : -step

        changeValue(mod)
    })

    const handleBlur = useRefMethod((e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e)
        }
        const parsedValue = parseValue(e.target.value)

        updateFocus(false)

        handleChange(parsedValue)
    })

    function longPress(mod) {
        if (!holdRef.current) return

        setTimeout(() => {
            changeValue(mod)

            longPress(mod)
        }, 50)
    }

    const handleCalc = useRefMethod((mod) => {
        holdRef.current = true

        changeValue(mod)

        keyPressTimer.current = setTimeout(() => {
            longPress(mod)
        }, 500)
    })

    function handleArrowMouseUp() {
        holdRef.current = false

        if (keyPressTimer.current) {
            clearTimeout(keyPressTimer.current)

            keyPressTimer.current = null
        }
    }

    function renderArrowGroup() {
        if (hideArrow) return []

        return [
            <a
                key="up"
                tabIndex={-1}
                className={inputClass('number-up')}
                onMouseDown={() => {
                    handleCalc(step)
                }}
                onMouseUp={handleArrowMouseUp}
                onMouseLeave={handleArrowMouseUp}
            >
                {icons.AngleRight}
            </a>,

            <a
                key="down"
                tabIndex={-1}
                className={inputClass('number-down')}
                onMouseDown={() => {
                    handleCalc(-step)
                }}
                onMouseUp={handleArrowMouseUp}
                onMouseLeave={handleArrowMouseUp}
            >
                {icons.AngleRight}
            </a>,
        ]
    }

    return (
        <span className={className} style={style}>
            {[
                <Input
                    key="input"
                    {...other}
                    onEnterPress={onEnterPress ? handleEnterPress : undefined}
                    disabled={disabled}
                    value={valueStr !== undefined ? valueStr : value}
                    onChange={beforeChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className={inputClass({ number: !hideArrow })}
                    onFocus={() => {
                        updateFocus(true)
                    }}
                    type="number"
                />,
                ...renderArrowGroup(),
            ]}
        </span>
    )
}

export default React.memo(Number)
