import React from 'react'
import { curry } from '@/utils/func'
import shallowEqual from '@/utils/shallowEqual'
import { IGNORE_VALIDATE } from './types'
import List from './List'
import Form from './Form'

interface HocProps {
    onChange()

    onDatumBind(datum)

    datum?: Form | List

    initValidate?: boolean

    value: any
}

interface Options {
    type?: 'list' | 'form'

    key?: string

    limit?: number

    bindProps?: string[]

    ignoreUndefined?: boolean
}

const types = {
    form: Form,
    list: List,
}

/**
 * Datum的高阶组件容器 通常给Group赋值Datum
 */
export default curry((options: Options, Origin) => {
    const { type = 'list', key = 'value', limit = 0, bindProps = [], ignoreUndefined } = options || {}

    const Datum = types[type]

    return class extends React.PureComponent<HocProps> {
        datum: typeof Form | List

        prevValues

        static defaultProps = {
            initValidate: false,
        }

        constructor(props) {
            super(props)

            const { datum, onChange, initValidate } = props

            const value = props[key]

            // 判断外部是否传进Datum
            if (datum instanceof Datum) {
                this.datum = datum
            } else {
                // 绑定指定Props
                // 让Datum使用Props指定bind的值
                const ops: any = bindProps.reduce(
                    (o, k) => {
                        // o {value,limit,initValidate} k keys
                        o[k] = props[k]
                        return o
                    },
                    // 初始值
                    { value, limit, initValidate }
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

            // 值发生改变时 重新设置值

            if (!shallowEqual(values, this.prevValues)) {
                this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE)

                this.prevValues = values
            }
        }

        setValue(action) {
            const values = this.props[key]

            if (ignoreUndefined && values === undefined) return

            if (type !== 'list') {
                this.datum.setValue(values, action)
            } else {
                ;(this.datum as List).setInnerValue(values, action)
            }
        }

        render() {
            const { onDatumBind, ...props } = this.props

            if (onDatumBind) onDatumBind(this.datum)

            return <Origin {...props} datum={this.datum} />
        }
    }
})
