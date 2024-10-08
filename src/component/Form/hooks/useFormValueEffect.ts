import { useEffect } from 'react'
import { warningOnce } from '@/utils/warning'
import { isEmpty } from '@/utils/is'
import { deepSet } from '@/utils/objects'
import { NestedKeyOf } from '@/utils/utilityTypes'
import useRefMethod from '@/hooks/useRefMethod'
import { FormInstance, InternalFormInstance } from '../type'

interface UseFormValueEffectParams<Values extends Record<string, any>> {
    form: FormInstance<Values>

    deep: NestedKeyOf<Values>[]
}

/** 无法监听未存在的name */
const useFormValueEffect = <
    Values extends Record<string, any>,
    SelectedValues extends Record<string, any> = Partial<Values> | Values
>(
    callback: (v: SelectedValues) => void,
    params: UseFormValueEffectParams<Values>
) => {
    const { form, deep = [] } = params || {}

    const internalForm = form as InternalFormInstance

    const trackPathDeep = useRefMethod((name: string, trackCallback, isSubscribe: boolean) => {
        if (!internalForm) return

        const formDatum = internalForm.GET_INTERNAL_FORM_DATUM()

        const { $inputNames } = formDatum

        const JOIN_PATTERN = '__ETHAN_PATTERN__'
        const regExp = new RegExp(/(\[\d{1,}\])|\./g)

        Object.keys($inputNames).forEach((inputName) => {
            const paths = inputName.split(regExp).filter((it) => !isEmpty(it))

            let prevPath = ''

            paths.forEach((currentPath, index) => {
                /** 如果是paths的第一个，则不用使用连接符连接 */
                const eventName = prevPath
                    ? [prevPath, JOIN_PATTERN, currentPath].join('')
                    : [prevPath, currentPath].join('')

                /** 使用连接符join掉要操作的name，使它的格式与eventName的格式保持一致，然后做比较 */
                const splitAndJoin = name
                    .split(regExp)
                    .filter((it) => !isEmpty(it))
                    .join(JOIN_PATTERN)

                if (eventName === splitAndJoin) {
                    if (isSubscribe) {
                        formDatum.subscribe(inputName, trackCallback)
                    } else {
                        formDatum.unsubscribe(inputName, trackCallback)
                    }
                } else {
                    prevPath += paths[index]
                }
            })
        })
    })

    const handleUpdate = useRefMethod(() => {
        if (isEmpty(deep)) return

        const values: any = {}

        const formDatum = internalForm.GET_INTERNAL_FORM_DATUM()

        const valueList = formDatum.get(deep)

        deep.forEach((name, index) => {
            deepSet(values, name, valueList[index])
        })

        callback(values)
    })

    useEffect(() => {
        if (!internalForm) {
            warningOnce('[Ethan UI:Form]:useFormValueEffect must provide form')
        }

        if (isEmpty(deep)) {
            warningOnce('[Ethan UI:Form]:useFormValueEffect must provide non-empty deepList')
        }
    }, [])

    useEffect(() => {
        deep.forEach((name) => {
            trackPathDeep(name, handleUpdate, true)
        })

        return () => {
            deep.forEach((name) => {
                trackPathDeep(name, handleUpdate, false)
            })
        }
    }, [deep, callback])
}

export default useFormValueEffect
