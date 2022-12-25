import FormDatum from '@/utils/Datum/Form'
import { isArray } from '@/utils/is'
import { useIsomorphicLayoutEffect } from 'react-use'

interface UseBindFormDatumProps {
    formDatum: FormDatum
    name: string
    preserve: boolean
    defaultValue: any
    onUpdate
    onValidate
}

export default function useBindFormDatum(props: UseBindFormDatumProps) {
    const { formDatum, name, defaultValue, preserve, onUpdate, onValidate } = props

    useIsomorphicLayoutEffect(() => {
        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.bind(name, onUpdate, defaultValue, onValidate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.bind(n, this.handleUpdate, defaultValues[i], onValidate))
            }

            return () => {
                formDatum.unbind(name, preserve)
            }
        }
    }, [name])
}
