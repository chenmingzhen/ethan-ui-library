import { useCallback, useEffect } from 'react'
import FormDatum from '@/utils/Datum/Form'
import { warningOnce } from '@/utils/warning'
import { isEmpty } from '@/utils/is'
import { deepSet } from '@/utils/objects'

interface UseFormValueEffectParams {
    formDatum: FormDatum

    deep: string[]
}

type UseFormValueEffectCallback<V = any> = (values: V) => void

const useFormValueEffect = (callback: UseFormValueEffectCallback, params: UseFormValueEffectParams) => {
    const { formDatum, deep = [] } = params || {}

    const handleUpdate = useCallback(() => {
        if (isEmpty(deep)) return

        const values = {}

        const valueList = formDatum.get(deep)

        deep.forEach((name, index) => {
            deepSet(values, name, valueList[index])
        })

        callback(values)
    }, [deep, callback])

    useEffect(() => {
        if (!formDatum) {
            warningOnce('[Ethan UI:Form]:useFormValueEffect must provide formDatum')
        }

        if (isEmpty(deep)) {
            warningOnce('[Ethan UI:Form]:useFormValueEffect must provide non-empty deepList')
        }
    }, [])

    useEffect(() => {
        deep.forEach(name => {
            formDatum.subscribe(name, handleUpdate)
        })

        return () => {
            deep.forEach(name => {
                formDatum.unsubscribe(name, handleUpdate)
            })
        }
    }, [deep])
}

export default useFormValueEffect
