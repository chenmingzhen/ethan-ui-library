import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { IGNORE_BIND } from '@/utils/Datum/types'
import { IFormProps } from './type'
import { FormProvider } from './context/formContext'

export default class Form extends PureComponent<IFormProps> {
    form: HTMLFormElement

    id = getUidStr()

    locked = false

    validating = false

    static defaultProps = {
        scrollToError: false,
        throttle: 1000,
    }

    componentDidMount() {
        const { formRef } = this.props

        if (formRef) formRef(this.form)

        this.setStatus()

        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit)
        }
    }

    componentDidUpdate(prevProps) {
        this.setStatus()
        if (prevProps.error !== this.props.error) this.props.datum.resetFormError(this.props.error)
    }

    componentWillUnmount() {
        this.props.datum.formUnmount = true
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
        }

        return (
            <FormProvider value={providerValue}>
                <form
                    ref={this.bindElement}
                    onReset={this.handleReset}
                    {...other}
                    className={className}
                    data-id={this.id}
                >
                    {this.props.children}
                </form>
            </FormProvider>
        )
    }
}
