import { useCallback, useEffect } from 'react'
import { warningOnce } from '@/utils/warning'
import useUpdate from '@/hooks/useUpdate'
import { NestedKeyOf } from '@/utils/utilityTypes'
import { FormInstance } from '../type'

const useFormValueState = <S, FormValues extends Record<string, any> = Record<string, any>>(
    form: FormInstance<FormValues>,
    name: NestedKeyOf<FormValues>
) => {
    const update = useUpdate()

    const setFormValue = useCallback(value => {
        if (!form) return

        const formDatum = form.GET_INTERNAL_FORM_DATUM()

        formDatum.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
    }, [])

    useEffect(() => {
        if (!form) return

        const formDatum = form.GET_INTERNAL_FORM_DATUM()

        formDatum.subscribe(name, update)

        return () => {
            formDatum.unsubscribe(name, update)
        }
    }, [])

    if (!form) {
        warningOnce('[Ethan UI:Form]:UseFormValueState must provide form')
    }

    return [form ? form.GET_INTERNAL_FORM_DATUM().get(name) : undefined, setFormValue] as [
        S | undefined,
        (value: S) => void
    ]
}

export default useFormValueState
