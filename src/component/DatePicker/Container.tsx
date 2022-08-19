import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { datepickerClass, inputClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { isArray, isEmpty } from '@/utils/is'
import { getParent, isDescendent } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'
import { getLocale } from '@/locale'
import { KeyboardKey } from '@/utils/keyboard'
import immer from 'immer'
import Icon from './Icon'
import utils from './utils'
import Picker from './Picker'
import Range from './Range'
import Text from './Text'
import AnimationList from '../List'
import DateFns from './utils'
import { DatePickerContainerProps } from './type'
import AbsoluteList from '../List/AbsoluteList'

interface DatePickerState {
    open: boolean
    panelShowDate: Date | Date[]
    position: string
    picker0: boolean
    picker1: boolean
}

class Container extends PureComponent<DatePickerContainerProps, DatePickerState> {
    static defaultProps = {
        clearable: true,
        placeholder: <span>&nbsp;</span>,
        type: 'date',
        allowSingle: false,
        defaultRangeMonth: [],
    }

    pickerId = `picker_${getUidStr()}`

    isRendered = false

    element: HTMLDivElement

    pickerContainer: HTMLDivElement

    picker: any

    focusLockTimer: NodeJS.Timeout

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            panelShowDate: this.transformPropValueToPanelShowDate(),
            position: props.position,
            picker0: false,
            picker1: false,
        }
    }

    componentWillUnmount() {
        this.clearClickAway()
    }

    transformPropValueToPanelShowDate = (): Date | Date[] => {
        let panelShowDate

        const { defaultRangeMonth, format } = this.props

        if (this.props.range) {
            panelShowDate = (this.props.value || []).map((v, i) => {
                v = utils.toDateWithFormat(v, format)

                if (utils.isInvalid(v)) v = utils.newDate(defaultRangeMonth[i])

                return v
            })

            if (panelShowDate.length === 0)
                panelShowDate = [utils.newDate(defaultRangeMonth[0]), utils.newDate(defaultRangeMonth[1])]
        } else {
            panelShowDate = utils.toDateWithFormat(this.props.value, format)
        }

        return panelShowDate
    }

    getQuick = () => {
        const { quickSelect, format } = this.props

        if (!Array.isArray(quickSelect)) return undefined

        return quickSelect.map(q => {
            if (!q.value || q.value.length !== 2) return { name: q.name, invalid: true }

            const date = q.value.map(v => DateFns.toDateWithFormat(v, format))

            if (DateFns.isInvalid(date[0]) || DateFns.isInvalid(date[1])) return { name: q.name, invalid: true }

            return {
                name: q.name,
                value: date,
            }
        })
    }

    getDefaultTime = () => {
        const { defaultTime } = this.props

        if (typeof defaultTime === 'string') return [defaultTime]

        if (isArray(defaultTime)) return defaultTime

        return []
    }

    bindElement = (el: HTMLDivElement) => {
        this.element = el
    }

    bindPicker = picker => {
        this.picker = picker
    }

    bindWrappedPicker = (el: HTMLDivElement) => {
        this.pickerContainer = el
    }

    bindClickAway = () => {
        document.addEventListener('mousedown', this.handleClickAway)
    }

    clearClickAway = () => {
        document.removeEventListener('mousedown', this.handleClickAway)
    }

    handleClickAway = (e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, this.pickerId)

        if (desc) return

        this.clearClickAway()

        this.props.onBlur()

        this.handleToggleOpen(false)
    }

    handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = evt => {
        if (evt.key === KeyboardKey.Enter) {
            evt.preventDefault()

            this.handleToggleOpen(!this.state.open)
        }

        if (evt.key === KeyboardKey.Tab) {
            this.props.onBlur()

            this.clearClickAway()

            if (this.state.open) this.handleToggleOpen(false)
        }
    }

    handleToggleOpen = (open: boolean) => {
        if (this.props.disabled === true || open === this.state.open) return

        this.setImmerState(state => {
            state.open = open

            if (open === true) {
                const rect = this.element.getBoundingClientRect()

                const windowHeight = docSize.height

                const windowWidth = docSize.width

                const pickerWidth = this.props.range ? 540 : 270

                if (!this.props.position) {
                    if (rect.bottom + 300 > windowHeight) {
                        if (rect.left + pickerWidth > windowWidth) state.position = 'right-top'
                        else state.position = 'left-top'
                    } else if (rect.left + pickerWidth > windowWidth) state.position = 'right-bottom'
                    else state.position = 'left-bottom'
                }

                state.panelShowDate = this.transformPropValueToPanelShowDate()
            }
        })
    }

    dateToCurrentShowDate = (date: Date | Date[]) => {
        const { range } = this.props

        if (!range) return date

        const { panelShowDate: selectedDateValue } = this.state

        return [date[0] || selectedDateValue[0], date[1] || selectedDateValue[1]]
    }

    /** change为true 表示为最终选中 可以把date设为value而非current */
    handleChange = (date: Date | Date[], change: boolean, blur: boolean, isEnd: boolean) => {
        const { range, onChange, format } = this.props

        const rangeOne = range && !(date[0] && date[1])

        const dates = isArray(date) ? date : [date]

        const values = dates.map(data => {
            return data
                ? utils.format(data, format, {
                      weekStartsOn: getLocale('startOfWeek'),
                  })
                : data
        }) as string[]

        const value = range ? values : values[0]

        if (!range) {
            if (blur) {
                this.handleToggleOpen(false)
            }
        } else if (blur && isEnd && !rangeOne) {
            this.handleToggleOpen(false)
        }

        const newCurrentShowDate = this.dateToCurrentShowDate(date)

        if (change) {
            this.setState({ panelShowDate: newCurrentShowDate })

            onChange(value)
        } else {
            this.setState({ panelShowDate: newCurrentShowDate })
        }
    }

    handleClear: React.MouseEventHandler<HTMLAnchorElement> = e => {
        e.stopPropagation()

        const value = this.props.range ? [null, null] : null

        this.props.onChange(value, () => {
            this.handleToggleOpen(false)

            this.element.focus()
        })
    }

    handleHover = (index: number, isHover: boolean) => {
        this.setImmerState(state => {
            state[`picker${index}`] = isHover
        })
    }

    /** 存在模式模式下使用 */
    lockFocusEvent = () => {
        const { inputAble } = this.props

        if (!inputAble) return

        this.focusLockTimer = setTimeout(() => {
            this.focusLockTimer = null
        }, 10)
    }

    handleFocus: React.FocusEventHandler<HTMLDivElement> = evt => {
        if (this.props.disabled || this.focusLockTimer) return

        this.lockFocusEvent()

        this.props.onFocus(evt)

        /** 点击closeIcon的时候，也要绑定事件，避免无法执行onBlur */
        this.bindClickAway()
    }

    handleClick: React.MouseEventHandler<HTMLDivElement> = evt => {
        const target = evt.target as HTMLElement

        const { open } = this.state

        if (open && getParent(target, this.pickerContainer)) return

        if (open && target.classList.contains(datepickerClass('close'))) return

        if (this.focusLockTimer) return

        this.handleToggleOpen(true)
    }

    handleTextBlur = (date: Date, index: number) => {
        const { format } = this.props

        const val = date ? utils.format(date, format) : ''

        if (!this.props.range) {
            this.props.onChange(val, () => {})
            return
        }

        const value = [
            ...immer(this.props.value as Array<string>, draft => {
                draft[index] = val
            }),
        ]

        /** 比对时间 调整位置 */
        if (utils.compareAsc(value[0], value[1]) > 0) value.push(value.shift())

        this.props.onChange(value)
    }

    handleTextFocus = () => {}

    renderText = (value, placeholder: React.ReactNode, key?: number) => {
        const { inputAble, disabled, size, format } = this.props

        const date = utils.toDateWithFormat(value, format)

        const className = classnames(
            datepickerClass('txt', this.state[`picker${key}`] && 'text-focus'),
            utils.isInvalid(date) && inputClass('placeholder')
        )

        return (
            <Text
                format={format}
                key={key}
                className={className}
                index={key}
                inputAble={inputAble}
                placeholder={placeholder}
                onTextBlur={this.handleTextBlur}
                onTextFocus={this.handleTextFocus}
                value={utils.isInvalid(date) ? undefined : utils.format(date, format)}
                disabled={disabled === true}
                size={size}
            />
        )
    }

    renderResult = () => {
        const { disabled, range, placeholder, type } = this.props

        const clearable = disabled ? false : this.props.clearable

        const value = !this.props.value && range ? [] : this.props.value

        const empty = isEmpty(value)

        return (
            <div className={datepickerClass('result')}>
                {range
                    ? [
                          this.renderText(value[0], placeholder[0], 0),
                          <span key="-" className={datepickerClass('separate')}>
                              ~
                          </span>,
                          this.renderText(value[1], placeholder[1], 1),
                      ]
                    : this.renderText(value, placeholder)}
                <Icon
                    className={empty || !clearable ? '' : 'indecator'}
                    name={type === 'time' ? 'Clock' : 'Calendar'}
                />
                {!empty && clearable && (
                    <Icon name="CloseCircle" className="close" tag="a" onClick={this.handleClear} />
                )}
            </div>
        )
    }

    renderWrappedPicker = () => {
        const { open, position } = this.state

        const { absolute, zIndex } = this.props

        if (!open && !this.isRendered) return null

        this.isRendered = true

        return (
            <AbsoluteList
                focus={open}
                absolute={absolute}
                position={position}
                zIndex={zIndex}
                rootClass={datepickerClass('absolute')}
                getParentElement={() => this.element}
            >
                <AnimationList
                    lazyDom
                    show={open}
                    duration="fast"
                    animationTypes={['fade']}
                    className={datepickerClass('picker', 'location', `absolute-${position}`)}
                    getRef={this.bindWrappedPicker}
                >
                    {this.renderPicker()}
                </AnimationList>
            </AbsoluteList>
        )
    }

    renderPicker = () => {
        const {
            range,
            type,
            value,
            min,
            max,
            disabled,
            allowSingle,
            hourStep,
            minuteStep,
            secondStep,
            format,
        } = this.props

        const quicks = this.getQuick()

        const Component: any = range ? Range : Picker

        return (
            <Component
                ref={this.bindPicker}
                defaultTime={this.getDefaultTime()}
                current={this.state.panelShowDate}
                format={format}
                disabled={typeof disabled === 'function' ? disabled : undefined}
                onChange={this.handleChange}
                type={type}
                range={range}
                quicks={quicks}
                value={
                    range
                        ? (value || []).map(v => utils.toDateWithFormat(v, format))
                        : utils.toDateWithFormat(value, format)
                }
                showTimePicker={!!value}
                allowSingle={allowSingle}
                handleHover={this.handleHover}
                min={DateFns.toDateWithFormat(min, format)}
                max={DateFns.toDateWithFormat(max, format)}
                hourStep={hourStep}
                minuteStep={minuteStep}
                secondStep={secondStep}
            >
                {this.props.children}
            </Component>
        )
    }

    render() {
        const { range, size, disabled } = this.props

        const className = datepickerClass(
            'inner',
            range && 'range',
            size && `size-${size}`,
            disabled === true && 'disabled',
            this.state.position
        )

        return (
            <div
                tabIndex={disabled === true ? -1 : 0}
                className={className}
                onFocus={this.handleFocus}
                data-id={this.pickerId}
                ref={this.bindElement}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                {this.renderResult()}
                {this.renderWrappedPicker()}
            </div>
        )
    }
}

export default Container
