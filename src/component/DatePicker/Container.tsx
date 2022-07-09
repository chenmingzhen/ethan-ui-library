// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { PureComponent } from '@/utils/component'
import { datepickerClass, inputClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { isArray } from '@/utils/is'
import { getParent } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'
import { getLocale } from '@/locale'
import Icon from './Icon'
import utils from './utils'
import Picker from './Picker'
import Range from './Range'
import Text from './Text'
import AbsoluteList from '../List/AbsoluteList'
import AnimationList from '../List'
import DateFns from './utils'

class Container extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            current: this.getCurrent(),
            position: props.position,
            picker0: false,
            picker1: false,
        }

        this.pickerId = `picker_${getUidStr()}`
        this.bindElement = this.bindElement.bind(this)
        this.bindPicker = this.bindPicker.bind(this)
        this.bindWrappedPicker = this.bindWrappedPicker.bind(this)
        this.bindTextSpan = this.bindTextSpan.bind(this)
        this.handleClick = this.handleToggle.bind(this, true)
        this.handleBlur = this.handleToggle.bind(this, false)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleHover = this.handleHover.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.parseDate = this.parseDate.bind(this)
        this.dateToCurrent = this.dateToCurrent.bind(this)
        this.shouldFocus = this.shouldFocus.bind(this)

        this.bindClickAway = this.bindClickAway.bind(this)
        this.clearClickAway = this.clearClickAway.bind(this)
        this.handleClickAway = this.handleClickAway.bind(this)
        this.getDefaultTime = this.getDefaultTime.bind(this)
        this.getQuick = this.getQuick.bind(this)

        this.firstRender = false
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.clearClickAway()
    }

    // 获取当前设置的Date事件
    getCurrent() {
        let current
        const { defaultRangeMonth } = this.props

        if (this.props.range) {
            current = (this.props.value || []).map((v, i) => {
                v = this.parseDate(v)

                if (utils.isInvalid(v)) v = utils.newDate(defaultRangeMonth[i])
                return v
            })
            if (current.length === 0)
                current = [utils.newDate(defaultRangeMonth[0]), utils.newDate(defaultRangeMonth[1])]
        } else {
            current = this.parseDate(this.props.value)
        }

        // 返回Date实例
        // Tue Mar 02 2021 22:46:18 GMT+0800 (中国标准时间)
        return current
    }

    getFormat() {
        const { format, type } = this.props
        if (format) {
            if (type === 'week' && format.indexOf('I') > -1) return format.replace(/y/g, 'Y')

            return format
        }
        switch (type) {
            case 'date':
                return 'yyyy-MM-dd'
            case 'month':
                return 'yyyy-MM'
            case 'time':
                return 'HH:mm:ss'
            case 'week':
                return 'RRRR II'
            default:
                return 'yyyy-MM-dd HH:mm:ss'
        }
    }

    // 从快速选择中获取数组Date
    getQuick(format) {
        const { quickSelect } = this.props

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

    // 获取默认时间Date
    getDefaultTime() {
        const { defaultTime } = this.props

        if (typeof defaultTime === 'string') return [defaultTime]
        if (isArray(defaultTime)) return defaultTime
        return []
    }

    // 绑定外层div ref
    bindElement(el) {
        this.element = el
    }

    // 绑定Picker组件 ref
    bindPicker(picker) {
        this.picker = picker
    }

    bindWrappedPicker(el) {
        this.pickerContainer = el
    }

    // result中text的实例引用
    bindTextSpan(el) {
        this.textSpan = el
    }

    // 根据value和format解析出Date对象
    parseDate(value) {
        return utils.toDateWithFormat(value, this.getFormat(), undefined)
    }

    // 绑定点击document事件
    bindClickAway() {
        document.addEventListener('mousedown', this.handleClickAway)
    }

    // 清除点击document事件
    clearClickAway() {
        document.removeEventListener('mousedown', this.handleClickAway)
    }

    shouldFocus(el) {
        if (el.getAttribute('data-id') === this.pickerId) return true
        if (getParent(el, `.${datepickerClass('result')}`)) return true
        return false
    }

    handleClickAway(e) {
        const onPicker = e.target === this.element || this.element.contains(e.target)
        const onAbsolutePicker = getParent(e.target, `.${datepickerClass('location')}`)

        if (!onPicker && !onAbsolutePicker) {
            if (this.props.inputable && this.textSpan) this.textSpan.blur()
            this.clearClickAway()
            this.handleToggle(false)
            this.props.onBlur()
        }
    }

    handleFocus(e) {
        if (!this.shouldFocus(e.target)) return

        this.props.onFocus(e)
        this.bindClickAway()
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.handleToggle(!this.state.focus)
        }

        // fot close the list
        if (e.keyCode === 9) {
            this.props.onBlur(e)

            if (this.state.focus) this.handleToggle(false)
            else this.clearClickAway()
        }
    }

    // 展开DatePicker
    // setState操作
    handleToggle(focus, e) {
        if (this.props.disabled === true) return

        if (focus === this.state.focus) return

        // 处于展开状态且点击DatePicker展开框不处理
        if (e && focus && getParent(e.target, this.pickerContainer)) return

        // 点击close Icon
        if (focus && e && e.target.classList.contains(datepickerClass('close'))) return

        this.setState(
            immer(state => {
                state.focus = focus

                if (focus === true) {
                    const rect = this.element.getBoundingClientRect()
                    const windowHeight = docSize.height
                    const windowWidth = docSize.width
                    const pickerWidth = this.props.range ? 540 : 270

                    // 计算DatePicker展开的位置
                    if (!this.props.position) {
                        if (rect.bottom + 300 > windowHeight) {
                            if (rect.left + pickerWidth > windowWidth) state.position = 'right-top'
                            else state.position = 'left-top'
                        } else if (rect.left + pickerWidth > windowWidth) state.position = 'right-bottom'
                        else state.position = 'left-bottom'
                    }
                    state.current = this.getCurrent()
                }
            })
        )

        // 重置picker的值
        if (focus && this.picker && this.picker.resetRange) {
            this.picker.resetRange((this.props.value || []).map(this.parseDate))
        }

        // 绑定事件
        if (focus === true) {
            this.firstRender = true

            this.bindClickAway()
        } else {
            this.props.onValueBlur()
        }
    }

    // value失焦执行
    triggerValueBlur(cb) {
        const { inputable } = this.props
        const { focus } = this.state

        if (cb && typeof cb === 'function') cb()

        // OnChange is not triggered when handling copy and paste

        if (inputable && focus === false) {
            this.props.onValueBlur()
        }
    }

    // result 中 text改变回调
    handleTextChange(date, index) {
        const format = this.getFormat()
        const val = date ? utils.format(date, format) : ''

        if (!this.props.range) {
            this.props.onChange(val, this.triggerValueBlur.bind(this, this.handleBlur))
            return
        }

        const value = [
            ...immer(this.props.value, draft => {
                draft[index] = val
            }),
        ]

        // 比对时间 调整位置
        if (utils.compareAsc(value[0], value[1]) > 0) value.push(value.shift())

        this.props.onChange(
            value,
            this.triggerValueBlur.bind(this, () => {
                this.setState({ current: this.getCurrent() })
            })
        )
    }

    dateToCurrent(date) {
        const { range } = this.props
        if (!range) return date

        const { current } = this.state

        return [date[0] || current[0], date[1] || current[1]]
    }

    // DatePicker实例改变的回调(Range or Picker)
    // change为true 表示为最终选中 可以把date设为value而非current
    handleChange(date, change, blur, isEnd) {
        // is range only select one
        const rangeOne = this.props.range && !(date[0] && date[1])

        const format = this.getFormat()

        let value
        if (this.props.range)
            value = date.map(v =>
                v
                    ? utils.format(v, format, {
                          weekStartsOn: getLocale('startOfWeek'),
                      })
                    : v
            )
        else
            value = utils.format(date, format, {
                weekStartsOn: getLocale('startOfWeek'),
            })

        let callback
        if (!this.props.range) callback = blur ? this.handleBlur : undefined
        else {
            callback = blur && isEnd && !rangeOne ? this.handleBlur : undefined
        }

        const newCurrent = this.dateToCurrent(date)

        if (change) {
            this.setState({ current: newCurrent })
            this.props.onChange(value, callback)
        } else {
            this.setState({ current: newCurrent }, callback)
        }
    }

    // 清除value
    handleClear(e) {
        e.stopPropagation()

        // Remove the warning with null value instead of string value
        const value = this.props.range ? [null, null] : null

        this.props.onChange(value, () => {
            this.props.onValueBlur()
            this.handleToggle(false)
            this.element.focus()
        })
    }

    // DatePicker实例Hover的回调(Range or Picker)
    handleHover(index, isEnter) {
        this.setState({
            [`picker${index}`]: isEnter,
        })
    }

    // 渲染Result中的text
    renderText(value, placeholder, key) {
        const { inputable, formatResult, disabled } = this.props

        // Date对象值
        const date = this.parseDate(value)

        const className = classnames(
            datepickerClass('txt', this.state[`picker${key}`] && 'text-focus'),
            utils.isInvalid(date) && inputClass('placeholder')
        )

        const resultFormat = formatResult || this.getFormat()
        return (
            <Text
                key={key}
                onTextSpanRef={this.bindTextSpan}
                className={className}
                focus={this.state.focus}
                format={resultFormat}
                element={this.element}
                index={key}
                inputable={inputable}
                placeholder={placeholder}
                onChange={this.handleTextChange}
                value={utils.isInvalid(date) ? undefined : utils.format(date, resultFormat)}
                disabled={disabled === true}
            />
        )
    }

    // 结果框
    renderResult() {
        const { disabled, range, placeholder, type } = this.props

        let { value } = this.props
        if (!value && range) value = []

        const isEmpty = !value || value.length === 0
        let { clearable } = this.props
        if (disabled === true) clearable = false

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
                    className={isEmpty || !clearable ? '' : 'indecator'}
                    name={type === 'time' ? 'Clock' : 'Calendar'}
                />
                {!isEmpty && clearable && (
                    <Icon name="CloseCircle" className="close" tag="a" onClick={this.handleClear} />
                )}
            </div>
        )
    }

    renderWrappedPicker() {
        const { focus, position } = this.state
        const { absolute, zIndex } = this.props
        const props = {
            absolute,
            focus,
            className: datepickerClass('picker', 'location', `absolute-${position}`),
            position,
            zIndex,
            getRef: this.bindWrappedPicker,
        }
        // computed absolute position needed
        if (absolute) {
            props.rootClass = datepickerClass('absolute')
            props.parentElement = this.element
        }

        /** @todo AbsoluteList AnimationList */

        return (
            <AnimationList {...props} show={focus} animationTypes={['fade']}>
                {this.renderPicker()}
            </AnimationList>
        )
    }

    renderPicker() {
        // TODO 移除firstRender
        if (!this.firstRender) return undefined

        const { range, type, value, min, max, disabled, allowSingle, hourStep, minuteStep, secondStep } = this.props
        const format = this.getFormat()
        const quicks = this.getQuick(format)
        const Component = range ? Range : Picker

        return (
            <Component
                ref={this.bindPicker}
                defaultTime={this.getDefaultTime()}
                current={this.state.current}
                format={format}
                disabled={typeof disabled === 'function' ? disabled : undefined}
                onChange={this.handleChange}
                type={type}
                range={range}
                quicks={quicks}
                value={range ? (value || []).map(v => this.parseDate(v)) : this.parseDate(value)}
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
        const { focus } = this.state

        const className = datepickerClass(
            'inner',
            range && 'range',
            size && `size-${size}`,
            focus && 'focus',
            disabled === true && 'disabled',
            this.state.position
        )

        return (
            <div
                // eslint-disable-next-line
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

Container.propTypes = {
    clearable: PropTypes.bool,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    // 不同type对应的默认值
    // 'date': 'yyyy-MM-dd'
    // 'time': 'HH:mm:ss'
    // 'week': 'RRRR II'
    // 'month': 'yyyy-MM'
    // 'datetime': 'yyyy-MM-dd HH:mm:ss'
    format: PropTypes.string,
    formatResult: PropTypes.string,
    inputable: PropTypes.bool,
    placeholder: PropTypes.any,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    position: PropTypes.string,
    // 范围跨度，单位 秒，为 true 时表示不限制选择范围。
    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    size: PropTypes.string,
    // 时间类型
    // 'date' | 'time' | 'datetime' | 'month' | 'week'
    type: PropTypes.string,
    allowSingle: PropTypes.bool,
    defaultTime: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    // 值为 string 时，需要和 format 属性匹配。range 属性为 true 时，值为长度为2的数组
    // 实际已选中值 current为暂时值
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]),
    absolute: PropTypes.bool,
    zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueBlur: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    // 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围
    quickSelect: PropTypes.array,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    // 范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue
    defaultRangeMonth: PropTypes.array,
    hourStep: PropTypes.number,
    minuteStep: PropTypes.number,
    secondStep: PropTypes.number,
}

Container.defaultProps = {
    clearable: true,
    placeholder: <span>&nbsp;</span>,
    type: 'date',
    allowSingle: false,
    defaultRangeMonth: [],
}

export default Container
