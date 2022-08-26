import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { curry } from '@/utils/func'
import shallowEqual from '@/utils/shallowEqual'
import { FormInstance, FormProps, IFormProps } from '../type'
import useForm from '../hooks/useForm'

export default curry((Origin: React.ClassicComponentClass<IFormProps<any>>) =>
    React.forwardRef<FormInstance, FormProps>((props, ref) => {
        const { form, onChange, defaultValue, errors, removeUndefined = true, ...other } = props

        const hasInjectProps = useRef(false)

        const forwardForm = useForm(form)

        const prevErrors = useRef<FormProps['errors']>()

        const formDatum = forwardForm.GET_INTERNAL_FORM_DATUM()

        if (!hasInjectProps.current && formDatum) {
            formDatum.deepSetOptions.removeUndefined = removeUndefined

            formDatum.setDefaultValue(defaultValue)

            formDatum.onChange = onChange

            hasInjectProps.current = true
        }

        useEffect(() => {
            formDatum.onChange = onChange
        }, [onChange])

        useEffect(() => {
            if (!shallowEqual(prevErrors, errors)) formDatum.setFormError(errors)

            prevErrors.current = errors
        })

        useImperativeHandle(ref, () => forwardForm)

        return <Origin {...other} datum={formDatum} />
    })
)
