import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { errorSubscribe, RESET_ACTION } from '@/utils/Datum/types'
import { FormError } from '@/utils/errors'
import { isArray } from '@/utils/is'
import { objectValues } from '@/utils/objects'
import { formClass } from '@/styles'
import { FormItemContextProps, IFormItemProps } from './type'
import { getGrid } from '../Grid/util'
import { FormItemConsumer, FormItemProvider } from './context/formItemContext'

interface FormItemState {
    inputs: Record<string, boolean>
    errors: Record<string, FormError>
}

export default class FormItem extends PureComponent<IFormItemProps, FormItemState> {
    events: FormItemContextProps

    get errors() {
        const { formDatum } = this.props

        const errors: FormError[] = []

        if (formDatum) {
            Object.keys(this.state.inputs).forEach(name => {
                const error = formDatum.getError(name)

                if (error) errors.push(error)
            })
        }

        objectValues(this.state.errors).forEach(error => {
            if (error) errors.push(error)
        })

        return errors
    }

    constructor(props: IFormItemProps) {
        super(props)

        this.state = {
            inputs: {},
            errors: {},
        }

        this.events = {
            bindInputToItem: this.bindInputToItem,
            unbindInputFromItem: this.unbindInputFromItem,
            onItemError: this.handleItemError,
        }

        if (props.formDatum) props.formDatum.subscribe(RESET_ACTION, this.forceUpdate)
    }

    bindInputToItem: FormItemContextProps['bindInputToItem'] = name => {
        const { formDatum } = this.props

        const names = isArray(name) ? name : [name]

        if (formDatum) {
            names.forEach(n => {
                formDatum.subscribe(errorSubscribe(n), this.forceUpdate)
            })
        }

        this.setImmerState(state => {
            names.forEach(n => {
                state.inputs[n] = true
            })
        })
    }

    unbindInputFromItem: FormItemContextProps['unbindInputFromItem'] = name => {
        const names = Array.isArray(name) ? name : [name]

        const { formDatum } = this.props

        if (formDatum) {
            names.forEach(n => {
                formDatum.unsubscribe(errorSubscribe(n))
            })
        }

        this.setImmerState(state => {
            names.forEach(n => {
                delete state.inputs[n]
            })
        })
    }

    handleItemError = (name: string, error: FormError) => {
        this.setState(state => {
            state.errors[name] = error
        })
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

    render() {
        const { children, grid, label, labelAlign, labelWidth, required, style } = this.props

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
            <FormItemProvider value={this.events}>
                <div className={className} style={style}>
                    {label && (
                        <div style={{ width: labelWidth }} className={formClass('label')}>
                            {label}
                        </div>
                    )}
                    <div className={formClass('control')}>
                        {children}
                        {this.renderHelp(errors)}
                    </div>
                </div>
            </FormItemProvider>
        )
    }
}

export const itemConsumer = Origin => props => {
    return <FormItemConsumer>{events => <Origin {...props} {...events} />}</FormItemConsumer>
}
