import useUpdate from '@/hooks/useUpdate'
import { useIsomorphicLayoutEffect } from 'react-use'
import FormDatum from '@/utils/Datum/Form'
import { isArray, isEmpty } from '@/utils/is'
import { CHANGE_ACTION } from '@/utils/Datum/types'

interface UseFlowProps {
    formDatum: FormDatum
    flow: boolean | string[]
    name: string | string[]
    validate: (value, formValue) => Promise<any>
}

export default function useFlow(props: UseFlowProps) {
    const update = useUpdate()
    const { formDatum, flow, name, validate } = props

    useIsomorphicLayoutEffect(() => {
        if (!formDatum || isEmpty(flow)) return

        function handleUpdate(_, __, type) {
            if (!isEmpty(name)) {
                const formValue = formDatum.getValue()

                const value = formDatum.get(name)

                if (type === CHANGE_ACTION) {
                    validate(value, formValue).catch(() => {})
                }
            }

            update()
        }

        if (isArray(flow)) {
            flow.forEach((n) => {
                formDatum.subscribe(n, handleUpdate)
            })

            return () => {
                flow.forEach((n) => {
                    formDatum.unsubscribe(n, handleUpdate)
                })
            }
        }

        if (flow === true) {
            const { $inputNames } = formDatum

            const keys = Object.keys($inputNames)

            keys.forEach((n) => {
                formDatum.subscribe(n, handleUpdate)
            })

            return () => {
                keys.forEach((n) => {
                    formDatum.unsubscribe(n, handleUpdate)
                })
            }
        }
    }, [])
}
