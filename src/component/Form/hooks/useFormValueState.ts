import { useCallback, useEffect } from 'react'
import { warningOnce } from '@/utils/warning'
import useUpdate from '@/hooks/useUpdate'
import { FormInstance } from '../type'

const useFormValueState = (form: FormInstance, name: string) => {
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
        warningOnce('[Ethan UI:Form]:UseFormValueState must provide formDatum')
    }

    return [form ? form.GET_INTERNAL_FORM_DATUM().get(name) : undefined, setFormValue]
}

export default useFormValueState
