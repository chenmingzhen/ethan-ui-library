import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass, inputClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import { styles } from '@/utils/style/styles'
import { getPickerPortalStyle } from '@/utils/position'
import { getLocale } from '@/locale'
import { preventDefault, stopPropagation } from '@/utils/func'
import { useIsomorphicLayoutEffect } from 'react-use'
import useMergedValue from '@/hooks/useMergedValue'
import shallowEqual from '@/utils/shallowEqual'
import { ChangeMode, DatePickerProps, QuickSelect } from './type'
import utils from './utils'
import Icon from './Icon'
import Text from './Text'
import Portal from '../Portal'
import AnimationList from '../List'
import Picker from './Picker'
import useFormat from './hooks/useFormat'
import useQuicks from './hooks/useQuicks'
import Container from './Container'

const DatePicker: React.FC<DatePickerProps> = function (props) {
    const {
        disabled,
        border,
        size,
        type = 'date',
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
        style,
    } = props

    const isRender = useRef(false)
    const pickerId = useRef(getUidStr()).current
    const containerRef = useRef<HTMLDivElement>()
    const pickerContainerRef = useRef<HTMLDivElement>()
    const format = useFormat(props.format, props.type)
    const quicks = useQuicks(quickSelects, format)
    const [panelDate, updatePanelDate] = useState(new Date())
    const [show, updateShow] = useState(false)
    const [position, updatePosition] = useState(props.position)
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

    useIsomorphicLayoutEffect(() => {
        if (!show) return

        if (value) {
            updatePanelDate(value)
        } else if (defaultPickerValue) {
            updatePanelDate(defaultPickerValue)
        } else {
            updatePanelDate(new Date())
        }
    }, [value, format, show])

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
            const pickerWidth = 270 + (hasQuick ? 120 : 0)
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

    function handleMouseDown() {
        toggleOpen(true)
    }

    const handleTextBlur = useRefMethod((date: Date) => {
        const dateStr = date ? utils.format(date, format) : ''

        updateValue(date, dateStr)
    })

    const handleChange = useRefMethod((date: Date, mode?: ChangeMode) => {
        const dateStr = date ? utils.format(date, format, { weekStartsOn: getLocale('startOfWeek') }) : ''
        const [change, dismiss] = utils.getChangeState(type, mode)

        if (change) {
            updateValue(date ? new Date(date) : null, dateStr)
        }

        if (dismiss) {
            toggleOpen(false)
        }

        if (date) {
            /** 点击年月份Icon切换，时间滚动 更新PanelDate */
            updatePanelDate(date)
        }
    })

    const handleClear = useRefMethod((e: React.MouseEvent) => {
        e.stopPropagation()

        updateValue(null, '')
        toggleOpen(false)
    })

    const handleQuickChange = useRefMethod((quick: QuickSelect<Date>) => {
        updateValue(
            new Date(quick.value),
            utils.format(quick.value, format, { weekStartsOn: getLocale('startOfWeek') })
        )
        updatePanelDate(quick.value)
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
                <Icon name="Calendar" className={empty || !clearable ? '' : 'indicator'} />
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

    function renderWrappedPicker() {
        if (!show && !isRender.current) return null

        isRender.current = true

        const rect = containerRef.current?.getBoundingClientRect()
        const ms = styles({ zIndex }, portal && getPickerPortalStyle(rect, position))

        return (
            <Portal portal={portal} rootClass={datePickerClass('absolute')}>
                <AnimationList
                    lazyDom
                    style={ms}
                    show={show}
                    duration="fast"
                    data-id={pickerId}
                    animationTypes={['fade']}
                    getRef={bindPickerContainerRef}
                    className={datePickerClass('picker', 'location', `absolute-${position}`, quicks.length && 'quick')}
                >
                    <div className={datePickerClass('split')}>
                        {quicks.length ? (
                            <div className={datePickerClass('quick-select')}>
                                {quicks.map((q) => (
                                    <div
                                        key={q.name}
                                        className={datePickerClass('quick-select-item')}
                                        onClick={() => {
                                            handleQuickChange(q)
                                        }}
                                    >
                                        {q.name}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <Picker
                            min={min}
                            max={max}
                            type={type}
                            value={value}
                            format={format}
                            panelDate={panelDate}
                            onChange={handleChange}
                            disabled={isFunc(disabled) ? disabled : undefined}
                        />
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
            onBlur={onBlur}
            onFocus={onFocus}
            data-id={pickerId}
            ref={containerRef}
            containerStyle={style}
            toggleOpen={toggleOpen}
            disabled={disabled === true}
            onMouseDown={handleMouseDown}
            containerClassName={classnames(props.className, datePickerClass('_', `c-${type || 'date'}`))}
            innerClassName={datePickerClass('inner', size && `size-${size}`, disabled === true && 'disabled', position)}
        >
            {renderResult()}
            {renderWrappedPicker()}
        </Container>
    )
}

export default React.memo(DatePicker)
