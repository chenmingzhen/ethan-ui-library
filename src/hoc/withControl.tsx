import React from 'react'
import { Component } from '@/utils/component'
import { curry } from '@/utils/func'
import shallowEqual from '@/utils/shallowEqual'
import { ValidateHocOutPutProps } from '@/hoc/withValidate'

interface WithControlProps extends ValidateHocOutPutProps {
    defaultValue: any

    onChange: (...args) => void

    value: any
}

interface WithControlState {
    value: any
}

export default curry(
    Origin =>
        class extends Component<WithControlProps, WithControlState> {
            static propTypes = {}

            static defaultProps = {
                rules: [],
            }

            /** 是否为受控，Datum中使用 */
            control = false

            constructor(props) {
                super(props)

                const { defaultValue } = props

                this.state = {
                    value: props.value || defaultValue,
                }
            }

            getValue = () => {
                const { value } = this.props

                const hasValue = 'value' in this.props || 'checked' in this.props

                this.control = hasValue

                return !hasValue ? this.state.value : value
            }

            /** 子组件value改变 (datum管理value) 此处驱动更新 */
            handleChange = (value, ...args) => {
                const { onChange, validate } = this.props

                const currentValue = this.getValue()

                if (args.length === 0 && shallowEqual(value, currentValue)) {
                    return
                }

                this.setState({ value })

                if (validate) {
                    validate(value).catch(() => {})
                }

                onChange?.(value, ...args)
            }

            render() {
                const { value, defaultValue, error, ...other } = this.props

                return (
                    <Origin
                        {...other}
                        error={error}
                        value={this.getValue()}
                        onChange={this.handleChange}
                        data-control={this.control}
                    />
                )
            }
        }
)
