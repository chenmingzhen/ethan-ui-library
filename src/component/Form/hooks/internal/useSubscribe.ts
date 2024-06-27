import useUpdate from '@/hooks/useUpdate'
import { useIsomorphicLayoutEffect } from 'react-use'
import FormDatum from '@/utils/Datum/Form'
import { isArray, isEmpty } from '@/utils/is'
import { CHANGE_ACTION } from '@/utils/Datum/types'

interface UseSubscribeProps {
    formDatum: FormDatum
    dependencies: boolean | string[]
    name: string | string[]
    validate: (value, formValue) => Promise<any>
}

export default function useSubscribe(props: UseSubscribeProps) {
    const update = useUpdate()
    const { formDatum, dependencies, name, validate } = props

    useIsomorphicLayoutEffect(() => {
        if (!formDatum || isEmpty(dependencies)) return

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

        if (isArray(dependencies)) {
            dependencies.forEach((n) => {
                formDatum.subscribe(n, handleUpdate)
            })

            return () => {
                dependencies.forEach((n) => {
                    formDatum.unsubscribe(n, handleUpdate)
                })
            }
        }
        if (dependencies === true) {
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
