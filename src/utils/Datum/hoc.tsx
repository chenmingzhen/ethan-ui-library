import React from 'react'
import { curry } from '@/utils/func'
import shallowEqual from '@/utils/shallowEqual'
import { IGNORE_VALIDATE } from './types'
import ListDatum from './List'
import FormDatum from './Form'
import { isEmpty } from '../is'

interface HocProps {
    onChange()

    onDatumBind(datum)

    datum?: FormDatum | ListDatum

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

            const { datum, onChange, initValidate } = props

            const value = props[key]

            if (datum instanceof Datum) {
                this.datum = datum
            } else {
                /** 绑定指定Props */
                /** 让Datum使用Props指定bind的值 */
                const ops: any = bindProps.reduce(
                    (o, k) => {
                        o[k] = props[k]
                        return o
                    },
                    // 初始值
                    { value, limit, initValidate, control: props['data-control'] }
                )

                if (onChange) {
                    ops.onChange = onChange
                }

                this.datum = new Datum(Object.assign(ops))
            }
        }

        componentDidMount() {
            this.prevValues = this.props[key]
        }

        componentDidUpdate(prevProps) {
            if (prevProps.onChange !== this.props.onChange) {
                this.datum.onChange = this.props.onChange
            }

            const values = this.props[key]

            if (!shallowEqual(values, this.prevValues)) {
                this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE)

                this.prevValues = values
            }
        }

        setValue(action) {
            const values = this.props[key]

            this.datum.setValue(values, action)
        }

        render() {
            const { onDatumBind, control, ...props } = this.props

            if (onDatumBind) onDatumBind(this.datum)

            return <Origin {...props} datum={this.datum} />
        }
    }
})
