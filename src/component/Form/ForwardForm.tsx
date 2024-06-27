import React, { useEffect, useImperativeHandle, useRef } from 'react'
import shallowEqual from '@/utils/shallowEqual'
import classnames from 'classnames'
import { formClass } from '@/styles'
import cleanProps from '@/utils/cleanProps'
import useRefMethod from '@/hooks/useRefMethod'
import { FormContextProps, FormInstance, FormProps, InternalFormInstance } from './type'
import useForm from './hooks/useForm'
import { FormProvider } from './context/formContext'

export default React.forwardRef<FormInstance, FormProps>((props, ref) => {
    const {
        form,
        onChange,
        defaultValue,
        errors,
        onError,
        onSubmit,
        onReset,
        disabled,
        inline,
        labelAlign,
        labelWidth,
        preserve,
        scrollToError = true,
        removeUndefined = true,
        animation = true,
        ...other
    } = props

    const hasInjectProps = useRef(false)

    const realFormRef = useRef<HTMLFormElement>()

    const forwardForm = useForm(form) as InternalFormInstance

    const prevErrors = useRef<FormProps['errors']>()

    const formDatum = forwardForm.GET_INTERNAL_FORM_DATUM()

    if (!hasInjectProps.current && formDatum) {
        formDatum.deepSetOptions.removeUndefined = removeUndefined

        formDatum.setDefaultValue(defaultValue)

        hasInjectProps.current = true
    }

    const handleSubmit = useRefMethod((evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        evt.stopPropagation()

        formDatum.submit()
    })

    const handleScrollToError = useRefMethod(() => {
        if (!scrollToError) return

        const element = realFormRef.current?.querySelector(`.${formClass('invalid')}`) as HTMLElement

        if (!element) return

        element.scrollIntoView()

        if (element.focus) element.focus()
    })

    const handleReset = useRefMethod(() => {
        formDatum.reset()
    })

    /** Inject to form datum */
    useEffect(() => {
        formDatum.onChange = onChange
    }, [onChange])

    useEffect(() => {
        formDatum.onError = (es) => {
            if (onError) {
                onError(es)
            }

            handleScrollToError()
        }
    }, [onError])

    useEffect(() => {
        formDatum.onSubmit = onSubmit
    }, [onSubmit])

    useEffect(() => {
        formDatum.onReset = onReset
    }, [onReset])

    useEffect(() => {
        if (!shallowEqual(prevErrors, errors)) formDatum.setFormError(errors)

        prevErrors.current = errors
    }, [errors])

    useImperativeHandle(ref, () => forwardForm)

    const className = classnames(formClass('_', disabled && 'disabled', inline && 'inline'), props.className)

    const providerValue: FormContextProps = {
        formDatum,
        disabled,
        labelAlign,
        labelWidth,
        animation,
        preserve,
    }

    return (
        <FormProvider value={providerValue}>
            <form
                {...cleanProps(other)}
                ref={realFormRef}
                onSubmit={handleSubmit}
                onReset={handleReset}
                className={className}
            />
        </FormProvider>
    )
})
