import { useRef } from 'react'
import FormDatum from '@/utils/Datum/Form'
import { FormInstance } from '../type'

function useForm<Value = any>(formInstance?: FormInstance<Value>) {
    const formRef = useRef<FormInstance>()

    if (!formRef.current) {
        if (formInstance) {
            formRef.current = formInstance
        } else {
            const formDatum = new FormDatum()

            formRef.current = formDatum.getForm()
        }
    }

    return formRef.current
}

export default useForm
