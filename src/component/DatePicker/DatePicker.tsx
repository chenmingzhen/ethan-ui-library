import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '@/utils/style/styles'
import { getPortalPickerStyle } from '@/utils/position'
import { getLocale } from '@/locale'
import { preventDefault, stopPropagation } from '@/utils/func'
import useMergedValue from '@/hooks/useMergedValue'
import shallowEqual from '@/utils/shallowEqual'
import useLockFocus from '@/hooks/useLockFocus'
import { ChangeMode, DatePickerProps, QuickSelect } from './type'
import utils from './utils'
import Icon from './Icon'
import Text from './Text'
import Picker from './Picker'
import useFormat from './hooks/useFormat'
import useQuicks from './hooks/useQuicks'
import Trigger from '../Trigger'
import useInputStyle from '../Input/hooks/useInputStyle'

const DatePicker: React.FC<DatePickerProps> = function (props) {
    const {
        min,
        max,
        size,
        style,
        border,
        zIndex,
        onBlur,
        onFocus,
        onChange,
        disabled,
        inputAble,
        placeholder,
        quickSelects,
        type = 'date',
        defaultPickerValue,
        getPopupContainer = () => document.body,
    } = props

    const componentKey = useRef(getUidStr()).current
    const [triggerElement, setTriggerElement] = useState<HTMLDivElement>()
    const pickerContainerRef = useRef<HTMLDivElement>()
    const format = useFormat(props.format, props.type)
    const quicks = useQuicks(quickSelects, format)
    const inputRef = useRef<HTMLInputElement>()
    const portalElementRef = useRef<HTMLDivElement>()
    /** 面板的参考值，改变Year Month时的参考值 */
    const [panelDate, updatePanelDate] = useState(new Date())
    const [visible, updateVisible] = useState(false)
    /** 选中的值（缓冲值，不会触发onChange，用于输入时） */
    const [selectedDate, updateSelectedDate] = useState<Date>(undefined)
    const [position, updatePosition] = useState(props.position)
    /** 选中的值（最终值，会触发onChange） */
    const [value, updateValue] = useMergedValue<Date, [string]>({
        defaultStateValue: undefined,
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(date, prevDate, dateStr) {
                updateSelectedDate(date)

                /** 至少有一个Date是有值才执行,（避免Input无值失去焦点也执行一次onChange null） */
                if (onChange && (date || prevDate) && !shallowEqual(date, prevDate)) {
                    onChange(date, dateStr)
                }
            },
        },
    })

    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useLockFocus()

    const { className: cls, style: ms } = useInputStyle({
        focus,
        disabled: disabled === true,
        border,
        size,
        className: classnames(props.className, datePickerClass('_', `c-${type || 'date'}`)),
        style,
    })

    useEffect(() => {
        if (!visible) return

        if (value) {
            updatePanelDate(value)
        } else if (defaultPickerValue) {
            updatePanelDate(defaultPickerValue)
        } else {
            updatePanelDate(new Date())
        }
    }, [value, format, visible])

    useEffect(() => {
        if (visible) {
            updateSelectedDate(value)
        }
    }, [visible])

    const bindPickerContainerRef = useRefMethod((el) => {
        pickerContainerRef.current = el
    })

    const inputFocus = useRefMethod(() => {
        inputRef.current.focus({ preventScroll: true })
    })

    function toggleOpen(nextOpen: boolean) {
        if (props.disabled === true || nextOpen === visible) return

        if (nextOpen) {
            const rect = triggerElement.getBoundingClientRect()
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
            updateVisible(true)
            updatePosition(nextPosition)
        } else {
            updateVisible(false)
        }
    }

    const handleTextBlur = useRefMethod((date: Date) => {
        const nextValue = date || value

        if (!nextValue) return

        const dateStr = utils.format(nextValue, format)

        updateValue(nextValue, dateStr)
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

    const handleInputValidDate = useRefMethod((date: Date) => {
        updatePanelDate(date)
        updateSelectedDate(date)
    })

    function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
        if (hasLockFocusRef.current || disabled === true) return
        if (onFocus) {
            onFocus(e)
        }

        updateFocus(true)
        lockFocus()
    }

    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (hasLockFocusRef.current || disabled === true) return
        if (onBlur) {
            onBlur(e)
        }

        toggleOpen(false)
        updateFocus(false)
    }

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
                    onInputValidDate={handleInputValidDate}
                    value={utils.isInvalid(value) ? undefined : utils.format(value, format)}
                    forwardedInputRef={inputRef}
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

    function handleDescClick() {
        lockFocus(() => {
            inputFocus()
        })
    }

    function handleMouseDown(e: React.MouseEvent) {
        // 阻止document获取到焦点
        e.preventDefault()

        inputFocus()
    }

    return (
        <Trigger
            visible={visible}
            componentKey={componentKey}
            onVisibleChange={toggleOpen}
            onDescClick={handleDescClick}
            bindPortalElement={portalElementRef}
            getPopupContainer={getPopupContainer}
            portalClassName={datePickerClass('absolute')}
            bindTriggerElement={setTriggerElement}
            transitionPopupProps={{
                duration: 'fast',
                transitionTypes: ['fade'],
                ref: bindPickerContainerRef,
                hideDisplayAfterLeave: true,
                className: datePickerClass('picker', 'location', `absolute-${position}`, quicks.length && 'quick'),
                style: styles({ zIndex }, getPortalPickerStyle(triggerElement, portalElementRef.current, position)),
                popup: (
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
                            format={format}
                            panelDate={panelDate}
                            onChange={handleChange}
                            disabled={isFunc(disabled) ? disabled : undefined}
                            selectedDate={selectedDate}
                        />
                    </div>
                ),
            }}
        >
            <div className={cls} style={ms} onMouseDown={handleMouseDown} onFocus={handleFocus} onBlur={handleBlur}>
                <div
                    className={datePickerClass(
                        'inner',
                        size && `size-${size}`,
                        disabled === true && 'disabled',
                        position
                    )}
                >
                    {renderResult()}
                </div>
            </div>
        </Trigger>
    )
}

export default React.memo(DatePicker)
