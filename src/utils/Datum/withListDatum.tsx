import React from 'react'
import { curry } from '@/utils/func'
import ListDatum from './List'
import shallowEqual from '../shallowEqual'

interface HocProps {
    onChange()

    value: any

    control: boolean
}

interface Options {
    limit?: number

    bindProps?: string[]
}

export default curry(
    (options: Options, Origin) =>
        class extends React.Component<HocProps> {
            prevValues

            datum: ListDatum

            control = false

            constructor(props) {
                super(props)

                const { limit = 0, bindProps = [] } = options || {}

                const { onChange, control, value } = props

                const ops: any = bindProps.reduce(
                    (o, k) => {
                        o[k] = props[k]
                        return o
                    },
                    { value, limit, control }
                )

                if (onChange) {
                    ops.onChange = onChange
                }

                this.datum = new ListDatum(Object.assign(ops))
            }

            componentDidMount() {
                this.prevValues = this.props.value
            }

            componentDidUpdate(prevProps) {
                if (prevProps.onChange !== this.props.onChange) {
                    this.datum.onChange = this.props.onChange
                }

                const values = this.props.value

                if (
                    this.props.control &&
                    (!shallowEqual(values, this.datum.getValue()) || !shallowEqual(this.prevValues, values))
                ) {
                    this.datum.setValue(values)
                }

                this.prevValues = values
            }

            render() {
                const { control, ...props } = this.props

                return <Origin {...props} datum={this.datum} />
            }
        }
)
