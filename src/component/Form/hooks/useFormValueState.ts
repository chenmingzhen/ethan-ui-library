import { useCallback, useEffect, useRef } from 'react'
import FormDatum from '@/utils/Datum/Form'
import { warningOnce } from '@/utils/warning'
import useUpdate from '@/hooks/useUpdate'

const useFormValueState = (formDatum: FormDatum, name: string) => {
    const hasDatum = useRef(!!formDatum).current

    const update = useUpdate()

    const setFormValue = useCallback(value => {
        if (!hasDatum) return

        formDatum.set({ name, value, FOR_INTERNAL_USE_DISPATCH_CHANGE: true })
    }, [])

    useEffect(() => {
        if (!hasDatum) return

        formDatum.subscribe(name, update)

        return () => {
            formDatum.unsubscribe(name, update)
        }
    }, [])

    if (!hasDatum) {
        warningOnce('[Ethan UI:Form]:UseFormValueState must provide formDatum')
    }

    return [hasDatum ? formDatum.get(name) : undefined, setFormValue]
}

export default useFormValueState
