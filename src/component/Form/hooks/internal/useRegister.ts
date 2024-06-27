import FormDatum from '@/utils/Datum/Form'
import { isArray } from '@/utils/is'
import { useIsomorphicLayoutEffect, useUpdate } from 'react-use'

interface UseRegisterProps {
    formDatum: FormDatum
    name: string | string[]
    preserve: boolean
    defaultValue: any
    onUpdate: (name, data, type) => void
    onValidate: (value, formValue) => Promise<any>
}

export default function useRegister(props: UseRegisterProps) {
    const { formDatum, name, defaultValue, preserve, onUpdate, onValidate } = props
    const update = useUpdate()

    useIsomorphicLayoutEffect(() => {
        if (formDatum && name) {
            if (!isArray(name)) {
                formDatum.register(name, onUpdate, defaultValue, onValidate)
            } else {
                const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue]

                name.forEach((n, i) => formDatum.register(n, onUpdate, defaultValues[i], onValidate))
            }

            update()

            return () => {
                formDatum.unregister(name, preserve)
            }
        }
    }, [name])
}
