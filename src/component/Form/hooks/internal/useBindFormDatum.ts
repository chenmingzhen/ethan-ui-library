import FormDatum from '@/utils/Datum/Form'
import { isArray } from '@/utils/is'
import { useIsomorphicLayoutEffect, useUpdate } from 'react-use'

interface UseBindFormDatumProps {
    formDatum: FormDatum
    name: string | string[]
    preserve: boolean
    defaultValue: any
    onUpdate: (name, data, type) => void
    onValidate: (value, formValue) => Promise<any>
}

export default function useBindFormDatum(props: UseBindFormDatumProps) {
    const { formDatum, name, defaultValue, preserve, onUpdate, onValidate } = props
    const update = useUpdate()

    useIsomorphicLayoutEffect(() => {
        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.bind(name, onUpdate, defaultValue, onValidate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.bind(n, onUpdate, defaultValues[i], onValidate))
            }

            update()

            return () => {
                formDatum.unbind(name, preserve)
            }
        }
    }, [name])
}
