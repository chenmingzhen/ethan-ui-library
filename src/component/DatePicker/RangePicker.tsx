import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isArray, isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { styles } from '@/utils/style/styles'
import { getPickerPortalStyle } from '@/utils/position'
import { getLocale } from '@/locale'
import useSafeState from '@/hooks/useSafeState'
import { preventDefault, stopPropagation } from '@/utils/func'
import { isDescendent } from '@/utils/dom/element'
import Container from './Container'
import useFormat from './hooks/useFormat'
import useQuicks from './hooks/useQuicks'
import { QuickSelect, RangePickerProps } from './type'
import Text from './Text'
import utils from './utils'
import Icon from './Icon'
import Portal from '../Portal'
import AnimationList from '../List'
import Picker from './Picker'
import RangePickerContext from './context'

const RangePicker: React.FC<RangePickerProps> = function (props) {
    const {
        disabled,
        border,
        size,
        type = 'date',
        onFocus,
        defaultPickerValue,
        inputAble,
        onBlur,
        zIndex,
        portal,
        min,
        max,
        onChange,
        quickSelects,
        style,
    } = props

    const pickerId = useRef(getUidStr()).current
    const containerRef = useRef<HTMLDivElement>()
    const pickerContainerRef = useRef<HTMLDivElement>()
    const format = useFormat(props.format, props.type)
    const quicks = useQuicks(quickSelects, format)
    /** 面板显示的时间 */
    const [panelDates, updatePanelDates] = useSafeState([new Date(), new Date()])
    /** 选中的值（缓冲值，不会触发onChange,用于选中一边和输入时） */
    const [selectedPanelDates, updateSelectedPanelDates] = useSafeState<Date[]>([])
    const [show, updateShow] = useSafeState(false)
    const [hover, updateHover] = useSafeState<number>(null)
    const [position, updatePosition] = useSafeState(props.position)
    const leftInputRef = useRef<HTMLInputElement>()
    const rightInputRef = useRef<HTMLInputElement>()
    const leftPickerId = useRef(getUidStr()).current
    const rightPickerId = useRef(getUidStr()).current
    /** 选中的值（最终值，会触发onChange） */
    const [value, updateValue] = useMergedValue<Date[], [string[]]>({
        defaultStateValue: [],
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(dates, prevDates, dateStrings) {
                if (onChange) {
                    onChange(dates, dateStrings)
                }
            },
        },
    })

    useEffect(() => {
        if (!show) return

        if (!isEmpty(value)) {
            updatePanelDates(value)
        } else if (!isEmpty(defaultPickerValue)) {
            updatePanelDates(defaultPickerValue)
        } else {
            updatePanelDates([new Date(), new Date()])
        }
    }, [value, format, show])

    useEffect(() => {
        updateSelectedPanelDates(value)
    }, [show])

    const bindPickerContainerRef = useRefMethod((el) => {
        pickerContainerRef.current = el
    })

    function toggleOpen(nextOpen: boolean) {
        if (props.disabled === true || nextOpen === show) return

        if (nextOpen) {
            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = docSize.height
            const windowWidth = docSize.width
            const hasQuick = quicks.length > 0
            const pickerWidth = 540 + (hasQuick ? 120 : 0)
            let nextPosition = position

            if (!props.position) {
                if (rect.bottom + 300 > windowHeight) {
                    if (rect.left + pickerWidth > windowWidth) nextPosition = 'right-top'
                    else nextPosition = 'left-top'
                } else if (rect.left + pickerWidth > windowWidth) nextPosition = 'right-bottom'
                else nextPosition = 'left-bottom'
            }

            updateShow(true)
            updatePosition(nextPosition)
        } else {
            updateShow(false)
        }
    }

    function handleMouseDown(evt: React.MouseEvent) {
        if (show) return

        toggleOpen(true)

        if (evt.target === rightInputRef.current) {
            rightInputRef.current.focus()
        } else {
            leftInputRef.current.focus()
        }
    }

    const handleTextBlur = useRefMethod((date: Date, index: number) => {
        const dates = index ? [selectedPanelDates[0], date] : [date, selectedPanelDates[1]]
        if (utils.compareAsc(dates[0], dates[1]) > 0) dates.push(dates.shift())
        const dateStrings = dates.map((it) => (it ? utils.format(it, format) : '')) as [string, string]

        const rangeOne = !(dates[1 - index] && dates[index])

        if (rangeOne) {
            updateSelectedPanelDates(dates)
        } else {
            updateValue(dates, dateStrings)
        }
    })

    function handleContainerBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (onBlur) {
            onBlur(e)
        }

        toggleOpen(false)
    }

    const handleChange = useRefMethod((index: number, date: Date, mode?: string) => {
        const nextSelectedPanelDates = [...selectedPanelDates]
        nextSelectedPanelDates[index] = date
        utils.switchRangeDate(nextSelectedPanelDates)

        const rangeOne = !(nextSelectedPanelDates[1 - index] && nextSelectedPanelDates[index])
        const [change, dismiss] = rangeOne ? [false, false] : utils.getChangeState(type, mode)

        /** 非点击切换的ICON */
        if (mode) {
            updateSelectedPanelDates(nextSelectedPanelDates)
        }

        if (change) {
            const dateStrings = nextSelectedPanelDates.map((it) =>
                it ? utils.format(it, format, { weekStartsOn: getLocale('startOfWeek') }) : ''
            )

            updateValue(nextSelectedPanelDates, dateStrings)
        }

        if (dismiss) {
            toggleOpen(false)
        }

        updatePanelDates((prev) => {
            const next = [...prev]
            next[index] = date
            return next
        })
    })

    const handleClear = useRefMethod((e: React.MouseEvent) => {
        e.stopPropagation()

        updateValue([], [])
        toggleOpen(false)
        updateSelectedPanelDates([])
    })

    const handleDisabledStart = useRefMethod((date: Date) => {
        if (isFunc(disabled)) {
            return disabled(date, 'start', selectedPanelDates)
        }

        return false
    })

    const handleDisabledEnd = useRefMethod((date: Date) => {
        if (isFunc(disabled)) {
            return disabled(date, 'end', selectedPanelDates)
        }

        return false
    })

    const handleHoverPanel = useRefMethod((index: number) => {
        updateHover(index)
    })

    const handleInputValidDate = useRefMethod((date: Date, index: number) => {
        updateSelectedPanelDates((prev) => {
            const next = [...prev]
            next[index] = date
            return next
        })

        updatePanelDates((prev) => {
            const next = [...prev]
            next[index] = date
            return next
        })
    })

    function handleQuickChange(quickSelect: QuickSelect<Date[]>) {
        const dateStrings = quickSelect.value.map((it) =>
            it ? utils.format(it, format, { weekStartsOn: getLocale('startOfWeek') }) : ''
        )
        updateSelectedPanelDates(quickSelect.value)
        updateValue(quickSelect.value, dateStrings)
        updatePanelDates(quickSelect.value)
    }

    function getPlaceholder(index: number) {
        if (isArray(props.placeholder)) {
            return props.placeholder[index]
        }

        return props.placeholder
    }

    function handleDescClick(evt: MouseEvent) {
        const isRightDesc = isDescendent(evt.target as HTMLElement, rightPickerId)

        if (isRightDesc || evt.target === rightInputRef.current) {
            rightInputRef.current.focus()
        } else {
            leftInputRef.current.focus()
        }
    }

    function renderResult() {
        const empty = isEmpty(value)
        const clearable = disabled ? false : props.clearable
        const leftValue = selectedPanelDates[0]
            ? utils.format(selectedPanelDates[0], format, { weekStartsOn: getLocale('startOfWeek') })
            : utils.isInvalid(value[0])
            ? undefined
            : utils.format(value[0], format, { weekStartsOn: getLocale('startOfWeek') })
        const rightValue = selectedPanelDates[1]
            ? utils.format(selectedPanelDates[1], format, { weekStartsOn: getLocale('startOfWeek') })
            : utils.isInvalid(value[1])
            ? undefined
            : utils.format(value[1], format, { weekStartsOn: getLocale('startOfWeek') })

        return (
            <div className={datePickerClass('result')}>
                <Text
                    size={size}
                    format={format}
                    inputAble={inputAble}
                    placeholder={getPlaceholder(0)}
                    onTextBlur={handleTextBlur}
                    disabled={disabled === true}
                    hover={hover}
                    value={leftValue}
                    index={0}
                    onInputValidDate={handleInputValidDate}
                    forwardedInputRef={leftInputRef}
                />
                <span key="-" className={datePickerClass('separate')}>
                    ~
                </span>
                <Text
                    size={size}
                    format={format}
                    inputAble={inputAble}
                    placeholder={getPlaceholder(1)}
                    onTextBlur={handleTextBlur}
                    disabled={disabled === true}
                    hover={hover}
                    value={rightValue}
                    index={1}
                    onInputValidDate={handleInputValidDate}
                    forwardedInputRef={rightInputRef}
                />
                <Icon className={empty || !clearable ? '' : 'indicator'} name="Calendar" />
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
        const rect = containerRef.current?.getBoundingClientRect()
        const ms = styles({ zIndex }, portal && getPickerPortalStyle(rect, position))

        return (
            <Portal portal={portal} rootClass={datePickerClass('absolute')} show={show}>
                <AnimationList
                    style={ms}
                    show={show}
                    duration="fast"
                    data-id={pickerId}
                    animationTypes={['fade']}
                    getRef={bindPickerContainerRef}
                    className={datePickerClass('picker', 'location', `absolute-${position}`, quicks.length && 'quick')}
                >
                    <div className={datePickerClass('range-picker')}>
                        {quicks.length ? (
                            <div className={datePickerClass('quick-select')}>
                                {quicks.map((q) => (
                                    <div
                                        key={q.name}
                                        onClick={() => {
                                            handleQuickChange(q)
                                        }}
                                        className={datePickerClass(
                                            'quick-select-item',
                                            utils.compareDateArray(q.value, panelDates, type) &&
                                                'quick-select-item-active'
                                        )}
                                    >
                                        {q.name}
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <RangePickerContext.Provider
                            value={{
                                index: 0,
                                panelDates,
                                selectedPanelDates,
                                onHoverPanel: handleHoverPanel,
                            }}
                        >
                            <Picker
                                {...props}
                                pickerId={leftPickerId}
                                disabled={handleDisabledStart}
                                min={min}
                                max={max}
                                panelDate={panelDates[0]}
                                onChange={handleChange.bind(null, 0)}
                                type={type}
                                format={format}
                                selectedDate={selectedPanelDates[0]}
                            />
                        </RangePickerContext.Provider>
                        <RangePickerContext.Provider
                            value={{
                                index: 1,
                                panelDates,
                                selectedPanelDates,
                                onHoverPanel: handleHoverPanel,
                            }}
                        >
                            <Picker
                                {...props}
                                pickerId={rightPickerId}
                                disabled={handleDisabledEnd}
                                min={selectedPanelDates[0] ? selectedPanelDates[0] : min}
                                max={max}
                                panelDate={panelDates[1]}
                                onChange={handleChange.bind(null, 1)}
                                type={type}
                                format={format}
                                selectedDate={selectedPanelDates[1]}
                            />
                        </RangePickerContext.Provider>
                    </div>
                </AnimationList>
            </Portal>
        )
    }

    return (
        <Container
            size={size}
            type={type}
            border={border}
            onBlur={handleContainerBlur}
            onFocus={onFocus}
            data-id={pickerId}
            ref={containerRef}
            containerStyle={style}
            disabled={disabled === true}
            onMouseDown={handleMouseDown}
            onDescClick={handleDescClick}
            containerClassName={classnames(props.className, datePickerClass('_', `r-${type || 'date'}`))}
            innerClassName={datePickerClass(
                'inner',
                'range',
                size && `size-${size}`,
                disabled === true && 'disabled',
                position
            )}
        >
            {renderResult()}
            {renderWrappedPicker()}
        </Container>
    )
}

export default React.memo(RangePicker)