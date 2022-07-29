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

/** 无法监听未存在的name */
const useFormValueEffect = (callback: UseFormValueEffectCallback, params: UseFormValueEffectParams) => {
    const { formDatum, deep = [] } = params || {}

    const trackPathDeep = useCallback((name: string, trackCallback, isSubscribe: boolean) => {
        if (!formDatum) return

        const { $inputNames } = formDatum

        const JOIN_PATTERN = '__ETHAN_PATTERN__'
        const regExp = new RegExp(/(\[\d{1,}\])|\./g)

        Object.keys($inputNames).forEach(inputName => {
            const paths = inputName.split(regExp).filter(it => !isEmpty(it))

            let prevPath = ''

            paths.forEach((currentPath, index) => {
                /** 如果是paths的第一个，则不用使用连接符连接 */
                const eventName = prevPath
                    ? [prevPath, JOIN_PATTERN, currentPath].join('')
                    : [prevPath, currentPath].join('')

                /** 使用连接符join掉要操作的name，使它的格式与eventName的格式保持一致，然后做比较 */
                const splitAndJoin = name
                    .split(regExp)
                    .filter(it => !isEmpty(it))
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
    }, [])

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
            trackPathDeep(name, handleUpdate, true)
        })

        return () => {
            deep.forEach(name => {
                trackPathDeep(name, handleUpdate, false)
            })
        }
    }, [deep])
}

export default useFormValueEffect
