import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { FormContextProps, IFormProps } from './type'
import { FormProvider } from './context/formContext'

export default class Form<T extends Record<string, any>> extends PureComponent<IFormProps<T>> {
    form: HTMLFormElement

    submitting = false

    static defaultProps = {
        scrollToError: true,
        animation: true,
    }

    componentDidMount() {
        super.componentDidMount()

        const { formRef } = this.props

        if (formRef) formRef(this.form)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    bindElement = (form: HTMLFormElement) => {
        this.form = form
    }

    scrollToError = () => {
        const { scrollToError } = this.props

        if (!scrollToError) return

        const element = this.form.querySelector(`.${formClass('invalid')}`) as HTMLElement

        if (!element) return

        element.scrollIntoView()

        if (element.focus) element.focus()
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit, action, datum, onError } = this.props

        if (isEmpty(action)) {
            evt.preventDefault()

            evt.stopPropagation()

            this.submitting = true

            datum
                .validateForm()
                .then(values => {
                    onSubmit(values)
                })
                .catch(error => {
                    if (onError) {
                        onError(error)
                    }

                    this.scrollToError()
                })
                .finally(() => {
                    this.submitting = false
                })
        }

        /** 存在action,使用原生的表单提交 */
    }

    handleReset = () => {
        const { onReset, datum } = this.props

        datum.reset()

        if (onReset) {
            onReset()
        }
    }

    render() {
        const {
            style,
            inline,
            disabled,
            datum,
            onError,
            onReset,
            labelAlign,
            labelWidth,
            animation,
            preserve,
            /** */
            defaultValue,
            onChange,
            onSubmit,
            ...other
        } = this.props

        const className = classnames(formClass('_', disabled && 'disabled', inline && 'inline'), this.props.className)

        const providerValue: FormContextProps = {
            formDatum: datum,
            disabled,
            labelAlign,
            labelWidth,
            animation,
            preserve,
        }

        return (
            <FormProvider value={providerValue}>
                <form
                    ref={this.bindElement}
                    {...other}
                    onSubmit={this.handleSubmit}
                    onReset={this.handleReset}
                    className={className}
                >
                    {this.props.children}
                </form>
            </FormProvider>
        )
    }
}
