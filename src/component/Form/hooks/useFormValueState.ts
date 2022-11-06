import { useCallback, useEffect } from 'react'
import { warningOnce } from '@/utils/warning'
import useUpdate from '@/hooks/useUpdate'
import { NestedKeyOf } from '@/utils/utilityTypes'
import { FormInstance, InternalFormInstance } from '../type'

const useFormValueState = <Value = any, FormValues extends Record<string, any> = Record<string, any>>(
    form: FormInstance<FormValues>,
    name: NestedKeyOf<FormValues>
) => {
    const update = useUpdate()

    const internalForm = form as InternalFormInstance

    const setFormValue = useCallback((value) => {
        if (!internalForm) return

        const formDatum = internalForm.GET_INTERNAL_FORM_DATUM()

        formDatum.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
    }, [])

    useEffect(() => {
        if (!internalForm) return

        const formDatum = internalForm.GET_INTERNAL_FORM_DATUM()

        formDatum.subscribe(name, update)

        return () => {
            formDatum.unsubscribe(name, update)
        }
    }, [])

    if (!internalForm) {
        warningOnce('[Ethan UI:Form]:UseFormValueState must provide formDatum')
    }

    return [internalForm ? internalForm.GET_INTERNAL_FORM_DATUM().get(name) : undefined, setFormValue] as [
        Value | undefined,
        (value: Value) => void
    ]
}

export default useFormValueState
