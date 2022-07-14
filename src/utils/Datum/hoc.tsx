import React from 'react'
import { curry } from '@/utils/func'
import ListDatum from './List'
import FormDatum from './Form'
import shallowEqual from '../shallowEqual'

interface HocProps {
    onChange()

    onDatumBind(datum)

    initValidate?: boolean

    value: any

    control?: boolean
}

interface Options {
    type?: 'list' | 'form'

    key?: string

    limit?: number

    bindProps?: string[]
}

const types = {
    form: FormDatum,
    list: ListDatum,
}

/**
 * Datum的高阶组件容器 通常给Group赋值Datum
 */
export default curry((options: Options, Origin) => {
    const { type = 'list', key = 'value', limit = 0, bindProps = [] } = options || {}

    const Datum = types[type]

    return class extends React.PureComponent<HocProps> {
        datum: typeof FormDatum | ListDatum

        prevValues

        control = false

        static defaultProps = {
            initValidate: false,
        }

        constructor(props) {
            super(props)

            const { onChange, initValidate, control } = props

            const value = props[key]

            const ops: any = bindProps.reduce(
                (o, k) => {
                    o[k] = props[k]
                    return o
                },
                // 初始值
                { value, limit, initValidate, control }
            )

            if (onChange) {
                ops.onChange = onChange
            }

            this.datum = new Datum(Object.assign(ops))
        }

        componentDidMount() {
            this.prevValues = this.props[key]
        }

        componentDidUpdate(prevProps) {
            if (prevProps.onChange !== this.props.onChange) {
                this.datum.onChange = this.props.onChange
            }

            const values = this.props[key]

            if (this.props.control) {
                console.log(values)

                this.datum.setValue(values)
            }

            this.prevValues = values
        }

        render() {
            const { onDatumBind, control, ...props } = this.props

            if (onDatumBind) onDatumBind(this.datum)

            return <Origin {...props} datum={this.datum} />
        }
    }
})
