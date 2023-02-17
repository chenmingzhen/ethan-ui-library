import useRefMethod from '@/hooks/useRefMethod'
import useSetState from '@/hooks/useSetState'
import { datePickerClass, inputClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { isDescendent } from '@/utils/dom/element'
import { styles } from '@/utils/style/styles'
import { getPickerPortalStyle } from '@/utils/position'
import useLockFocus from '@/hooks/useLockFocus'
import { getLocale } from '@/locale'
import { preventDefault, stopPropagation } from '@/utils/func'
import { DatePickerProps } from './type'
import useInputStyle from '../Input/hooks/useInputStyle'
import useDatePickerValue from './hooks/useDatePickerValue'
import utils from './utils'
import Icon from './Icon'
import Text from './Text'
import Portal from '../Portal'
import AnimationList from '../List'
import Picker from './Picker'

interface DatePickerState {
    open: boolean
    position: string
    picker0: boolean
    picker1: boolean
}

const DatePicker: React.FC<DatePickerProps> = function (props) {
    const {
        disabled,
        border,
        size,
        range,
        type,
        onFocus,
        defaultPickerValue,
        placeholder = <span>&nbsp;</span>,
        inputAble,
        onBlur,
        zIndex,
        portal,
        min,
        max,
        onChange,
    } = props

    const isRender = useRef(false)
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useLockFocus()
    const pickerId = useRef(getUidStr()).current
    const containerRef = useRef<HTMLDivElement>()
    const pickerContainerRef = useRef<HTMLDivElement>()
    const format = useMemo(() => {
        if (props.format) return props.format

        switch (props.type) {
            case 'date-time':
                return 'yyyy-MM-dd HH:mm:ss'
            case 'year':
                return 'yyyy'
            case 'month':
                return 'yyyy-MM'
            case 'time':
                return 'HH:mm:ss'
            case 'week':
                return 'RRRR II'
            default:
                return 'yyyy-MM-dd'
        }
    }, [props.type, props.format])
    const { value, updateValue } = useDatePickerValue({
        defaultValue: props.defaultValue,
        value: props.value,
        format,
        type: props.type,
        onChange,
    })
    const [panelDate, updatePanelDate] = useState(() => {
        if (value) {
            return value
        }
        if (defaultPickerValue) {
            return defaultPickerValue
        }

        return new Date()
    })

    useEffect(() => {
        if (value) {
            updatePanelDate(value)
        } else if (defaultPickerValue) {
            updatePanelDate(defaultPickerValue)
        } else {
            updatePanelDate(new Date())
        }
    }, [value, format])

    const [state, setState] = useSetState<DatePickerState>({
        open: false,
        position: props.position,
        picker0: false,
        picker1: false,
    })
    const { className, style } = useInputStyle({
        focus,
        disabled: disabled === true,
        border,
        size,
        className: classnames(props.className, datePickerClass('_', `${range ? 'r' : 'c'}-${type || 'date'}`)),
        style: props.style,
    })

    const handleClickAway = useRefMethod((e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, pickerId)

        if (desc) {
            lockFocus(() => {
                containerRef.current.focus()
            })
        }
    })

    const bindPickerContainerRef = useRefMethod((el) => {
        pickerContainerRef.current = el
    })

    function handleFocus(e: React.FocusEvent<HTMLElement>) {
        if (hasLockFocusRef.current || disabled === true) return
        if (onFocus) {
            onFocus(e)
        }

        document.addEventListener('mousedown', handleClickAway)
        updateFocus(true)
        lockFocus()
    }

    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (hasLockFocusRef.current || disabled === true) return
        if (onBlur) {
            onBlur(e)
        }

        document.removeEventListener('mousedown', handleClickAway)
        toggleOpen(false)
        updateFocus(false)
    }

    function toggleOpen(nextOpen: boolean) {
        if (props.disabled === true || nextOpen === state.open) return

        if (nextOpen) {
            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = docSize.height
            const windowWidth = docSize.width
            const pickerWidth = 270
            let nextPosition = state.position

            if (!props.position) {
                if (rect.bottom + 300 > windowHeight) {
                    if (rect.left + pickerWidth > windowWidth) nextPosition = 'right-top'
                    else nextPosition = 'left-top'
                } else if (rect.left + pickerWidth > windowWidth) nextPosition = 'right-bottom'
                else nextPosition = 'left-bottom'
            }

            setState({ open: true, position: nextPosition })
        } else {
            setState({ open: false })
        }
    }

    function handleMouseDown() {
        toggleOpen(true)
    }

    const handleTextBlur = useRefMethod((date: Date) => {
        const dateStr = date ? utils.format(date, format) : ''

        updateValue(date, dateStr)
    })

    const handleChange = useRefMethod((date: Date, shouldChange?: boolean, shouldDismiss?: boolean) => {
        const dateStr = date ? utils.format(date, format, { weekStartsOn: getLocale('startOfWeek') }) : null

        if (shouldChange) {
            updateValue(date, dateStr)
        }

        if (shouldDismiss) {
            toggleOpen(false)
        }

        if (date) {
            updatePanelDate(date)
        }
    })

    const handleClear = useRefMethod((e: React.MouseEvent) => {
        e.stopPropagation()

        handleChange(null, true, true)
    })

    function renderText(date: Date, textPlaceholder: React.ReactNode, key?: number) {
        const cls = classnames(
            datePickerClass('txt', state[`picker${key}`] && 'text-focus'),
            utils.isInvalid(date) && inputClass('placeholder')
        )

        return (
            <Text
                format={format}
                key={key}
                className={cls}
                index={key}
                inputAble={inputAble}
                placeholder={textPlaceholder}
                onTextBlur={handleTextBlur}
                value={utils.isInvalid(date) ? undefined : utils.format(date, format)}
                disabled={disabled === true}
                size={size}
            />
        )
    }

    function renderResult() {
        const clearable = disabled ? false : props.clearable
        const empty = isEmpty(value)

        return (
            <div className={datePickerClass('result')}>
                {renderText(value, placeholder)}
                <Icon
                    className={empty || !clearable ? '' : 'indecator'}
                    name={type === 'time' ? 'Clock' : 'Calendar'}
                />
                {!empty && clearable && (
                    <Icon
                        name="CloseCircle"
                        className="close"
                        tag="a"
                        onClick={handleClear}
                        onMouseDown={(e) => {
                            preventDefault(e)
                            stopPropagation(e)
                        }}
                    />
                )}
            </div>
        )
    }

    function renderWrappedPicker() {
        if (!state.open && !isRender.current) return null

        isRender.current = true

        const rect = containerRef.current?.getBoundingClientRect()
        const ms = styles({ zIndex }, portal && getPickerPortalStyle(rect, state.position))

        return (
            <Portal portal={portal} rootClass={datePickerClass('absolute')}>
                <AnimationList
                    lazyDom
                    show={state.open}
                    style={ms}
                    duration="fast"
                    animationTypes={['fade']}
                    className={datePickerClass('picker', 'location', `absolute-${state.position}`)}
                    getRef={bindPickerContainerRef}
                    data-id={pickerId}
                >
                    <Picker
                        panelDate={panelDate}
                        format={format}
                        disabled={isFunc(disabled) ? disabled : undefined}
                        onChange={handleChange}
                        type={type}
                        value={value}
                        handleHover={() => {}}
                        min={min}
                        max={max}
                    />
                </AnimationList>
            </Portal>
        )
    }

    const innerCls = datePickerClass(
        'inner',
        range && 'range',
        size && `size-${size}`,
        disabled === true && 'disabled',
        state.position
    )

    return (
        <div className={className} style={style}>
            <div
                tabIndex={disabled === true ? -1 : 0}
                className={innerCls}
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-id={pickerId}
                ref={containerRef}
                onMouseDown={handleMouseDown}
            >
                {renderResult()}
                {renderWrappedPicker()}
            </div>
        </div>
    )
}

export default React.memo(DatePicker)
