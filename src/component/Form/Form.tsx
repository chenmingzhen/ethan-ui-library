import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { IGNORE_BIND } from '@/utils/Datum/types'
import shallowEqual from '@/utils/shallowEqual'
import { IFormProps } from './type'
import { FormProvider } from './context/formContext'

export default class Form<T extends Record<string, any>> extends PureComponent<IFormProps<T>> {
    form: HTMLFormElement

    id = getUidStr()

    locked = false

    validating = false

    static defaultProps = {
        scrollToError: false,
        throttle: 300,
        animation: true,
    }

    componentDidMount() {
        const { formRef } = this.props

        if (formRef) formRef(this.form)

        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit)
        }
    }

    componentDidUpdate(prevProps) {
        if (!shallowEqual(prevProps.error, this.props.error)) this.props.datum.setFormError(this.props.error)
    }

    componentWillUnmount() {
        if (this.form) {
            this.form.removeEventListener('submit', this.handleSubmit)
        }
    }

    bindElement = (form: HTMLFormElement) => {
        this.form = form
    }

    handleSubmit = (evt: SubmitEvent) => {
        if (evt) {
            evt.preventDefault()
        }

        if (evt && (evt.target as HTMLElement).getAttribute('data-id') !== this.id) return

        if (this.validating || this.locked) return

        this.validating = true

        this.locked = true

        setTimeout(() => {
            this.locked = false
        }, this.props.throttle)

        const { datum, onSubmit } = this.props

        const { activeElement } = document

        if (activeElement) activeElement.blur()

        datum
            .validate(IGNORE_BIND)
            .then(() => {
                this.validating = false

                if (onSubmit) onSubmit(datum.getValue())

                if (activeElement) activeElement.focus()
            })
            .catch(err => {
                this.validating = false

                setTimeout(this.scrollToError.bind(this, err))
            })
    }

    handleReset = () => {
        const { datum, onReset } = this.props

        datum.reset()

        if (onReset) onReset()
    }

    render() {
        const {
            style,
            inline,
            disabled,
            datum,
            rules,
            onError,
            onReset,
            labelAlign,
            labelVerticalAlign,
            labelWidth,
            animation,
            throttle,
            /** */
            defaultValue,
            onChange,
            onSubmit,
            ...other
        } = this.props

        if (datum && rules && datum.rules !== rules) {
            datum.rules = rules
        }

        const className = classnames(formClass('_', disabled && 'disabled', inline && 'inline'), this.props.className)

        const providerValue = {
            formDatum: datum,
            disabled,
            labelAlign,
            labelVerticalAlign,
            labelWidth,
            rules,
            animation,
            throttle,
        }

        return (
            <FormProvider value={providerValue}>
                <form
                    ref={this.bindElement}
                    {...other}
                    onReset={this.handleReset}
                    className={className}
                    data-id={this.id}
                >
                    {this.props.children}
                </form>
            </FormProvider>
        )
    }
}
