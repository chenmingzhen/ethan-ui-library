import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '@/utils/component'
import shallowEqual from '@/utils/shallowEqual'
import { datepickerClass } from '@/styles'
import dateFns from './utils'
import utils from './utils'
import Picker from './Picker'

class Range extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      rangeDate: props.value,
    }

    this.pickers = []

    this.handleChange = this.handleChange.bind(this)
    this.handleFirstChange = this.handleChange.bind(this, 0)
    this.handleSecondChange = this.handleChange.bind(this, 1)
    this.handleDayHover = this.handleDayHover.bind(this)
    this.bindFirstPicker = this.bindPicker.bind(this, 0)
    this.bindSecondPicker = this.bindPicker.bind(this, 1)
    this.handleDisabledStart = this.handleDisabled.bind(this, 'start')
    this.handleDisabledEnd = this.handleDisabled.bind(this, 'end')
    this.changeDateSmart = this.changeDateSmart.bind(this)
    this.fillTime = this.fillTime.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { rangeDate } = this.state
    if (
      rangeDate.length !== 1 &&
      !shallowEqual(prevProps.value, this.props.value) &&
      !shallowEqual(this.state.rangeDate, this.props.value)
    ) {
      // eslint-disable-next-line
      this.setState({ rangeDate: this.props.value })
    }
  }

  bindPicker(index, el) {
    this.pickers[index] = el
  }

  resetRange(rangeDate) {
    this.setState({ rangeDate })
  }

  handleDayHover(date) {
    if (this.state.rangeDate.length === 1) {
      utils.cloneTime(date, this.props.value[1], this.props.format)
      // this.setState({ hover: date })
    }
  }

  changeDateSmart(rangeDate) {
    if (!rangeDate[0] || !rangeDate[1]) return
    const [s, e] = rangeDate
    const { range } = this.props
    if (typeof range === 'number') {
      if (utils.compareAsc(s, utils.addSeconds(e, -range)) < 0) rangeDate[1] = utils.addSeconds(s, range)
    }
    if (utils.compareAsc(s, e) > 0) {
      const sWitheTime = new Date(s)
      utils.setTime(sWitheTime, e)
      rangeDate[1] = utils.compareAsc(s, sWitheTime) > 0 ? s : sWitheTime
    }
  }

  handleChange(index, date, change, end, mode) {
    const { type, range, min, max } = this.props

    if (!change) {
      const current = immer(this.props.current, draft => {
        draft[index] = date
      })
      this.props.onChange(current)
      return
    }

    if (mode === 'time') {
      let endChangedDate
      this.setState(
        immer(draft => {
          // 设置值进去rangeDate
          draft.rangeDate[index] = date
          // 从draft中获取最新的rangeDate值
          const [l, r] = draft.rangeDate
          // 右Picker
          if (index !== 0) {
            if (l && l.getHours() === r.getHours()) {
              if (utils.compareAsc(l, r) === 1) {
                r.setMinutes(l.getMinutes())
              }
            }
            return
          }

          // 左Picker

          // 存在选值范围且左右相等 将最后选择的设置为endChangedDate
          if (range && utils.compareAsc(l, r) === 1) {
            endChangedDate = date
            draft.rangeDate[1] = endChangedDate
          }

          // 左右已经选择的情况，此时设有range，如果再选择左边，然后右边溢出范围，需要将右重新赋值，结果为左加最大range
          if (typeof range === 'number' && utils.compareAsc(l, utils.addSeconds(r, -range)) < 0) {
            endChangedDate = utils.addSeconds(l, range)
            draft.rangeDate[1] = endChangedDate
          }
        }),
        () => {
          // const current = immer(this.props.value, draft => {
          //   draft[index] = date
          //   if (endChangedDate) draft[1] = endChangedDate
          //   draft[1 - index] = draft[1 - index] || ''
          // })
          // 回调onChange
          const current = this.state.rangeDate
          this.props.onChange(current, true)
        }
      )
      return
    }

    if (type === 'month') {
      // eslint-disable-next-line
      const rangeDate = [...this.state.rangeDate]
      rangeDate[index] = date
      rangeDate[1 - index] = rangeDate[1 - index] || ''

      this.changeDateSmart(rangeDate)

      this.setState({ rangeDate })
      this.props.onChange(rangeDate, true, true, index === 1)

      return
    }

    utils.cloneTime(date, this.props.value[index])
    if (min && utils.compareAsc(date, min) <= 0) {
      utils.setTime(date, min)
    }
    if (max && utils.compareAsc(date, max) >= 0) {
      utils.setTime(date, max)
    }
    // if (this.state.rangeDate.filter(a => a).length !== 1) {
    //   this.setState({ rangeDate: index === 1 ? [undefined, date] : [date], hover: undefined })
    //   return
    // }

    this.setState(
      immer(draft => {
        // const method = utils.compareAsc(draft.rangeDate[0], date) > 0 ? 'unshift' : 'push'
        draft.rangeDate[index] = date
        draft.rangeDate[1 - index] = draft.rangeDate[1 - index] || ''
        // draft.rangeDate.map(this.fillTime)
        // range change start&end
        this.changeDateSmart(draft.rangeDate)
        draft.hover = undefined
      }),
      () => {
        // only 'datetime' don not need close, 'time is up'
        this.props.onChange(this.state.rangeDate, true, type !== 'datetime', index === 1)
      }
    )
  }

  fillTime(date, index) {
    const { defaultTime, format, value } = this.props
    return utils.formatDateWithDefaultTime(date, value[index], defaultTime[index], format)
  }

  handleDisabled(type, date) {
    const { disabled } = this.props
    const { rangeDate } = this.state
    if (disabled) {
      return disabled(date, type, ...rangeDate)
    }
    return false
  }

  handleQuick(quick) {
    if (quick.invalid) {
      console.error(`the date you provider for ${quick.name} is invalid, please check the date in quickSelect!`)
      return
    }
    this.setState({ rangeDate: quick.value })
    this.props.onChange(quick.value, true)
  }

  createQuick() {
    const { quicks, type } = this.props
    const { rangeDate } = this.state

    if (!quicks) return null

    return (
      <div className={datepickerClass('quick-select')}>
        {quicks.map(q => (
          <div
            onClick={this.handleQuick.bind(this, q)}
            className={datepickerClass(
              'quick-select-item',
              dateFns.compareDateArray(q.value, rangeDate, type) && 'quick-select-item-active'
            )}
            key={q.name}
          >
            {q.name}
          </div>
        ))}
      </div>
    )
  }

  render() {
    // min & max can not to child
    const { current, value, range, children, min, max, quicks, ...props } = this.props
    const quick = this.createQuick()
    const rangeDate = [...this.state.rangeDate]
    return (
      <div className={datepickerClass('range-picker')}>
        {quick || children}
        <Picker
          {...props}
          pos="start"
          disabled={this.handleDisabledStart}
          index={0}
          min={min}
          max={max}
          current={current[0]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeDate[0]}
          onChange={this.handleFirstChange}
          onChangeSync={this.handleChange}
          onDayHover={this.handleDayHover}
          ref={this.bindFirstPicker}
          value={utils.toDateWithFormat(value[0], props.format)}
          showTimePicker={value.length === 2}
        />
        <Picker
          {...props}
          disabled={this.handleDisabledEnd}
          index={1}
          min={rangeDate[0] ? rangeDate[0] : min}
          max={max}
          current={current[1]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeDate[0]}
          onChange={this.handleSecondChange}
          onChangeSync={this.handleChange}
          onDayHover={this.handleDayHover}
          ref={this.bindSecondPicker}
          value={utils.toDateWithFormat(value[1], props.format)}
          showTimePicker={value.length === 2}
        />
      </div>
    )
  }
}

Range.propTypes = {
  current: PropTypes.array,
  disabled: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  value: PropTypes.array,
  type: PropTypes.string.isRequired,
  defaultTime: PropTypes.array,
  quicks: PropTypes.array,
  min: PropTypes.object,
  max: PropTypes.object,
}

Range.defaultProps = {
  value: [],
}

export default Range
