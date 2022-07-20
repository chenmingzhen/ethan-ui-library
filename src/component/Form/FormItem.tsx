import React, { cloneElement, isValidElement } from 'react'
import classnames from 'classnames'
import { Component } from '@/utils/component'
import { formClass, inputClass } from '@/styles'
import { isSameError } from '@/utils/errors'
import { isArray, isEmpty, isFunc } from '@/utils/is'
import withValidate from '@/hoc/withValidate'
import immer from 'immer'
import shallowEqual from '@/utils/shallowEqual'
import { ERROR_ACTION } from '@/utils/Datum/types'
import { compose } from '@/utils/func'
import { getGrid } from '../Grid/util'
import { IFormItemProps } from './type'
import FormHelp from './FormHelp'
import { fieldSetConsumer } from './FieldSet'

interface FormItemState {
    error: Error
}

class FormItem extends Component<IFormItemProps, FormItemState> {
    lastValue

    validateTimer: NodeJS.Timeout

    constructor(props) {
        super(props)

        const { defaultValue, formDatum, validate, name } = this.props

        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.bind(name, this.handleUpdate, defaultValue, validate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, defaultValues[i], validate))
            }
        }
    }

    get formable() {
        const { formDatum, name } = this.props

        return formDatum && !isEmpty(name)
    }

    componentDidMount() {
        super.componentDidMount()

        this.lastValue = this.value
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        const { formDatum, name } = this.props

        if (formDatum && name) {
            formDatum.unbind(name)
        }
    }

    handleUpdate = (data, name, type) => {
        const { name: propName, validate, error, onInternalError, throttle } = this.props

        /** ERROR_ACTION */
        if (type === ERROR_ACTION) {
            if (!isSameError(data, error)) {
                onInternalError(data)
            }

            return
        }

        const newValue = !Array.isArray(propName)
            ? data
            : immer(this.value, draft => {
                  propName.forEach((n, i) => {
                      if (n === name) draft[i] = data
                  })
              })

        if (shallowEqual(newValue, this.lastValue)) return

        this.lastValue = newValue

        if (validate) {
            if (this.validateTimer) {
                clearTimeout(this.validateTimer)

                this.validateTimer = null
            }

            this.validateTimer = setTimeout(() => {
                validate(newValue, undefined).catch(() => {})
            }, throttle)
        }

        this.forceUpdate()
    }

    handleChange = (value, ...args) => {
        const { name, formDatum, children } = this.props

        const anyChildren = children as any

        if (anyChildren && anyChildren.props && anyChildren.props.onChange && isFunc(anyChildren.props.onChange)) {
            anyChildren.props.onChange(value, ...args)
        }

        if (isArray(name)) {
            name.forEach((n, i) => formDatum.set({ name: n, value: value[i] }))
        } else {
            formDatum.set({ name, value })
        }
    }

    get value() {
        const { formDatum, name } = this.props

        let value

        if (formDatum && name) {
            if (isArray(name)) {
                value = name.map(n => {
                    return formDatum.get(n)
                })
            } else {
                value = formDatum.get(name)
            }
        }

        return value
    }

    renderChildren = () => {
        const { children, error } = this.props

        const { value } = this

        if (!this.formable) return children

        const className = error ? inputClass('invalid') : undefined

        if (typeof children === 'function') {
            return children({ value, onChange: this.handleChange, className })
        }

        if (isValidElement(children)) {
            return cloneElement(children, { value, onChange: this.handleChange, className })
        }

        return children
    }

    render() {
        const { grid, label, labelAlign, labelWidth, required, style, error, animation } = this.props

        const className = classnames(
            getGrid(grid),
            formClass(
                'item',
                required && 'required',
                error && 'invalid',
                ['top', 'right'].indexOf(labelAlign) >= 0 && `label-align-${labelAlign}`
            ),
            this.props.className
        )

        return (
            <div className={className} style={style}>
                {label && (
                    <div style={{ width: labelWidth }} className={formClass('label')}>
                        {label}
                    </div>
                )}
                <div className={formClass('control')}>
                    {this.renderChildren()}
                    <FormHelp error={error} animation={animation} />
                </div>
            </div>
        )
    }
}

export default compose(withValidate, fieldSetConsumer)(FormItem)
