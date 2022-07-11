import React from 'react'
import { compose, curry } from '@/utils/func'
import Form from '@/utils/Datum/Form'
import { ValidateHocOutPutProps } from '@/hoc/withValidate'
import { Component } from '@/utils/component'
import immer from 'immer'
import shallowEqual from '@/utils/shallowEqual'
import { FormItemContextProps } from '../type'
import { itemConsumer } from '../Item'
import withFormConsumer from './withFormConsumer'

interface WithFormableProps extends ValidateHocOutPutProps, FormItemContextProps {
    formDatum: Form

    name?: string | string[]

    defaultValue?

    required?: boolean

    onChange?
}

// const consumer = compose(withFormConsumer(['formDatum', 'disabled']), itemConsumer)
const consumer = Origin => Origin

export default curry(Origin =>
    consumer(
        class extends Component<WithFormableProps, { value }> {
            lastValue

            get subscribeName() {
                const { name } = this.props

                return Array.isArray(name) ? name.join('|') : name
            }

            constructor(props) {
                super(props)

                const { formDatum, name, defaultValue } = props

                this.state = {
                    value: defaultValue,
                }

                this.lastValue = formDatum && name ? formDatum.get(name) || {} : {}
            }

            componentDidMount() {
                super.componentDidMount()

                const { formDatum, name, defaultValue, bindInputToItem, validate } = this.props

                if (formDatum && name) {
                    if (Array.isArray(name)) {
                        const dv = defaultValue || []

                        name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, dv[i], validate))

                        // this.setImmerState(draft => {
                        //     draft.value = name.map(n => formDatum.get(n))
                        // })
                    } else {
                        formDatum.bind(name, this.handleUpdate, defaultValue, validate)

                        // this.setImmerState(draft => {
                        //     draft.value = formDatum.get(name)
                        // })
                    }
                }

                if (bindInputToItem && name) bindInputToItem(this.subscribeName)
            }

            handleUpdate = (value, name, type) => {
                const { name: propName, onChange, validate } = this.props

                const newValue = !Array.isArray(propName)
                    ? value
                    : immer(this.state.value, draft => {
                          propName.forEach((n, i) => {
                              if (n === name) draft[i] = value
                          })
                      })

                if (shallowEqual(newValue, this.lastValue)) return

                this.lastValue = newValue

                if (onChange) onChange(newValue)

                if (validate) {
                    validate(newValue, undefined).catch(() => {})
                }

                this.forceUpdate()
            }

            handleChange = (value, ...args) => {
                const { formDatum, name, onChange } = this.props

                if (!formDatum || !name) return

                if (args.length === 0 && shallowEqual(value, this.state.value)) {
                    return
                }

                formDatum.set(name, value)

                onChange?.(value, ...args)
            }

            render() {
                const {
                    formDatum,
                    error,
                    validate,
                    onItemError,
                    bindInputToItem,
                    unbindInputFromItem,
                    ...other
                } = this.props

                return (
                    <Origin
                        {...other}
                        error={error}
                        formDatum={formDatum}
                        onChange={this.handleChange}
                        // value={this.state.value}
                        value={formDatum?.get(this.props.name)}
                    />
                )
            }
        }
    )
)
