import { useRef } from 'react'
import FormDatum from '@/utils/Datum/Form'

function useFormDatum() {
    const formRef = useRef<FormDatum>(new FormDatum({}))

    return formRef.current
}

export default useFormDatum
