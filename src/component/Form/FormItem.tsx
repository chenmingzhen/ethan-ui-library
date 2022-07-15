import React, { cloneElement, isValidElement } from 'react'
import classnames from 'classnames'
import { Component } from '@/utils/component'
import { formClass } from '@/styles'
import { FormError } from '@/utils/errors'
import FormDatum from '@/utils/Datum/Form'
import { isArray, isEmpty, isFunc } from '@/utils/is'
import withValidate, { ValidateHocOutPutProps } from '@/hoc/withValidate'
import immer from 'immer'
import shallowEqual from '@/utils/shallowEqual'
import { getGrid } from '../Grid/util'
import { FormItemProps } from './type'

interface IFormItemProps extends FormItemProps, ValidateHocOutPutProps {
    formDatum: FormDatum
}

interface FormItemState {
    value: any
}

class FormItem extends Component<IFormItemProps, FormItemState> {
    lastValue

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

    get errors() {
        const { formDatum, name } = this.props

        if (!name || !formDatum) return []

        const names = isArray(name) ? name : [name]

        const errors: FormError[] = []

        names.forEach(it => {
            const error = formDatum.getError(it)

            if (error) errors.push(error)
        })

        return errors
    }

    get formable() {
        const { formDatum, name } = this.props

        return formDatum && !isEmpty(name)
    }

    componentDidMount() {
        super.componentDidMount()

        this.lastValue = this.value
    }

    handleUpdate = (value, name) => {
        const { name: propName, validate } = this.props

        const newValue = !Array.isArray(propName)
            ? value
            : immer(this.value, draft => {
                  propName.forEach((n, i) => {
                      if (n === name) draft[i] = value
                  })
              })

        if (shallowEqual(newValue, this.lastValue)) return

        this.lastValue = newValue

        if (validate) {
            validate(newValue, undefined).catch(() => {})
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
            name.forEach((n, i) => formDatum.set(n, value[i]))
        } else {
            formDatum.set(name, value)
        }
    }

    renderHelp = (errors: FormError[]) => {
        if (errors.length > 0) {
            return (
                <div className={formClass('error')}>
                    {errors.map((e, i) => (
                        <div key={i}>{e.message}</div>
                    ))}
                </div>
            )
        }

        const { tip } = this.props

        if (!tip) return null

        return <div className={formClass('tip')}>{tip}</div>
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
        const { children } = this.props

        const { value } = this

        if (!this.formable) return children

        if (typeof children === 'function') {
            return children({ value, onChange: this.handleChange })
        }

        if (isValidElement(children)) {
            return cloneElement(children, { value, onChange: this.handleChange })
        }

        console.error(new Error('Form.Field expect a single ReactElement or a function.'))

        return null
    }

    render() {
        const { grid, label, labelAlign, labelWidth, required, style } = this.props

        const { errors } = this

        const className = classnames(
            getGrid(grid),
            formClass(
                'item',
                required && 'required',
                errors.length > 0 && 'invalid',
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
                    {this.renderHelp(errors)}
                </div>
            </div>
        )
    }
}

export default withValidate(FormItem)
