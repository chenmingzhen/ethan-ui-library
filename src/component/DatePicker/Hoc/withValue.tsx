import React, { Component } from 'react'
import shallowEqual from '@/utils/shallowEqual'
import { getLocale } from '@/locale'
import { isArray } from '@/utils/is'
import utils from '../utils'
import { WithValueProps } from '../type'

interface WithValueHocState {
    value: string | string[]
}

export default Origin =>
    class extends Component<WithValueProps, WithValueHocState> {
        get format() {
            const { format, type } = this.props

            if (format) return format

            switch (type) {
                case 'date-time':
                    return 'yyyy-MM-dd HH:mm:ss'
                case 'month':
                    return 'yyyy-MM'
                case 'time':
                    return 'HH:mm:ss'
                case 'week':
                    return 'RRRR II'
                default:
                    return 'yyyy-MM-dd'
            }
        }

        constructor(props) {
            super(props)

            this.state = { value: props.value }
        }

        get isRangeWithSingle() {
            const { value } = this.state

            const { range, allowSingle } = this.props

            if (!value) return false

            return range && !allowSingle && isArray(value) && value.filter(v => v).length === 1
        }

        componentDidMount() {
            this.convertValue(this.props.value)
        }

        componentDidUpdate(prevProps) {
            const { value } = this.props

            if (!shallowEqual(prevProps.value, value)) {
                this.convertValue(value)
            }
        }

        /** Props的中value可能为string或number，将值转化成format后的字符串 */
        convertValue = value => {
            const { range } = this.props

            const { format } = this

            if (!value) {
                this.setState({ value })

                return
            }

            if (!range) {
                const newValue = utils.format(utils.toDateWithFormat(value, format), format, {
                    weekStartsOn: getLocale('startOfWeek'),
                })

                if (newValue !== value) {
                    this.props.onChange(newValue)
                }

                if (newValue !== this.state.value) {
                    this.setState({ value: newValue })
                }
            } else {
                const newValue = value.map(v => {
                    if (!v) return undefined

                    return utils.format(utils.toDateWithFormat(v, format), format, {
                        weekStartsOn: getLocale('startOfWeek'),
                    })
                })

                if (!shallowEqual(newValue, value)) {
                    this.props.onChange(newValue)
                }

                if (!shallowEqual(newValue, this.state.value)) {
                    this.setState({ value: newValue })
                }
            }
        }

        handleChange = (value, callback) => {
            this.setState({ value }, callback)

            this.props.onChange(value)
        }

        render() {
            const { value } = this.state

            return <Origin {...this.props} format={this.format} onChange={this.handleChange} value={value} />
        }
    }
