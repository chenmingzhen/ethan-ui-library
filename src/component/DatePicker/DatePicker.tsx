import useRefMethod from '@/hooks/useRefMethod'
import useSetState from '@/hooks/useSetState'
import { datePickerClass, inputClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import { getParent, isDescendent } from '@/utils/dom/element'
import { styles } from '@/utils/style/styles'
import { getPickerPortalStyle } from '@/utils/position'
import useLockFocus from '@/hooks/useLockFocus'
import { getLocale } from '@/locale'
import { preventDefault, stopPropagation } from '@/utils/func'
import { useIsomorphicLayoutEffect } from 'react-use'
import useMergedValue from '@/hooks/useMergedValue'
import shallowEqual from '@/utils/shallowEqual'
import { DatePickerProps, QuickSelect } from './type'
import useInputStyle from '../Input/hooks/useInputStyle'
import utils from './utils'
import Icon from './Icon'
import Text from './Text'
import Portal from '../Portal'
import AnimationList from '../List'
import Picker from './Picker'

interface DatePickerState {
    open: boolean
    position: string
}

const DatePicker: React.FC<DatePickerProps> = function (props) {
    const {
        disabled,
        border,
        size,
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
        quickSelects,
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
    const quicks = useMemo(() => {
        if (!quickSelects) return []

        const results: QuickSelect[] = []

        quickSelects.forEach((quickSelect) => {
            const date = utils.toDateWithFormat(quickSelect.value, format)

            if (utils.isInvalid(date)) return

            results.push({ name: quickSelect.name, value: date })
        })

        return results
    }, [quickSelects, format])
    const [value, updateValue] = useMergedValue<Date, [string]>({
        defaultStateValue: undefined,
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(date, prevDate, dateStr) {
                /** 至少有一个Date是有值才执行,（避免Input无值失去焦点也执行一次onChange null） */
                if (onChange && (date || prevDate) && !shallowEqual(date, prevDate)) {
                    onChange(date, dateStr)
                }
            },
        },
    })
    const [panelDate, updatePanelDate] = useState(new Date())
    const [state, setState] = useSetState<DatePickerState>({
        open: false,
        position: props.position,
    })

    useIsomorphicLayoutEffect(() => {
        if (!state.open) return

        if (value) {
            updatePanelDate(value)
        } else if (defaultPickerValue) {
            updatePanelDate(defaultPickerValue)
        } else {
            updatePanelDate(new Date())
        }
    }, [value, format, state.open])

    const { className, style } = useInputStyle({
        focus,
        disabled: disabled === true,
        border,
        size,
        className: classnames(props.className, datePickerClass('_', `c-${type || 'date'}`)),
        style: props.style,
    })

    const handleClickAway = useRefMethod((e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, pickerId)

        if (desc) {
            const clickInput = getParent(e.target as HTMLElement, 'input')

            lockFocus(() => {
                if (!clickInput) {
                    containerRef.current.focus()
                }
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
            const hasQuick = quicks.length > 0

            const pickerWidth = 270 + (hasQuick ? 120 : 0)
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
            updateValue(date ? new Date(date) : null, dateStr)
        }

        if (shouldDismiss) {
            toggleOpen(false)
        }

        if (date) {
            /** 点击年月份Icon切换，时间滚动 更新PanelDate */
            updatePanelDate(date)
        }
    })

    const handleClear = useRefMethod((e: React.MouseEvent) => {
        e.stopPropagation()

        handleChange(null, true, true)
    })

    function renderResult() {
        const clearable = disabled ? false : props.clearable
        const empty = isEmpty(value)

        return (
            <div className={datePickerClass('result')}>
                <Text
                    size={size}
                    format={format}
                    inputAble={inputAble}
                    placeholder={placeholder}
                    onTextBlur={handleTextBlur}
                    disabled={disabled === true}
                    className={classnames(datePickerClass('txt'), utils.isInvalid(value) && inputClass('placeholder'))}
                    value={utils.isInvalid(value) ? undefined : utils.format(value, format)}
                />
                <Icon
                    name={type === 'time' ? 'Clock' : 'Calendar'}
                    className={empty || !clearable ? '' : 'indecator'}
                />
                {!empty && clearable && (
                    <Icon
                        tag="a"
                        className="close"
                        name="CloseCircle"
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

    /** 考虑将Range和Picker拆分成不同的组件 */

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
                    getRef={bindPickerContainerRef}
                    data-id={pickerId}
                    className={datePickerClass(
                        'picker',
                        'location',
                        `absolute-${state.position}`,
                        quicks.length && 'quick'
                    )}
                >
                    <Picker
                        format={format}
                        type={type}
                        value={value}
                        min={min}
                        max={max}
                        quicks={quicks}
                        panelDate={panelDate}
                        onChange={handleChange}
                        disabled={isFunc(disabled) ? disabled : undefined}
                    />
                </AnimationList>
            </Portal>
        )
    }

    return (
        <div className={className} style={style}>
            <div
                tabIndex={disabled === true ? -1 : 0}
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-id={pickerId}
                ref={containerRef}
                onMouseDown={handleMouseDown}
                className={datePickerClass(
                    'inner',
                    size && `size-${size}`,
                    disabled === true && 'disabled',
                    state.position
                )}
            >
                {renderResult()}
                {renderWrappedPicker()}
            </div>
        </div>
    )
}

export default React.memo(DatePicker)
