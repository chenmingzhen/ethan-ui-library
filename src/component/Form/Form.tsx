import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { formClass } from '@/styles'
import shallowEqual from '@/utils/shallowEqual'
import { isEmpty } from '@/utils/is'
import { IFormProps } from './type'
import { FormProvider } from './context/formContext'

export default class Form<T extends Record<string, any>> extends PureComponent<IFormProps<T>> {
    form: HTMLFormElement

    submitting = false

    static defaultProps = {
        scrollToError: false,
        animation: true,
    }

    componentDidMount() {
        super.componentDidMount()

        const { formRef } = this.props

        if (formRef) formRef(this.form)
    }

    componentDidUpdate(prevProps) {
        if (!shallowEqual(prevProps.error, this.props.error)) this.props.datum.setFormError(this.props.error)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    bindElement = (form: HTMLFormElement) => {
        this.form = form
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit, action, datum } = this.props

        if (isEmpty(action)) {
            evt.preventDefault()

            evt.stopPropagation()

            this.submitting = true

            datum
                .validateForm()
                .then(values => {
                    onSubmit(values)
                })
                .catch(() => {
                    /** @todo 滚动到错误中 */
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
