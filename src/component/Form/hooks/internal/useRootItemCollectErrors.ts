import useSafeState from '@/hooks/useSafeState'
import { isSameError } from '@/utils/errors'
import { isArray } from '@/utils/is'
import { useContext, useEffect } from 'react'
import { usePrevious, useUpdateEffect } from 'react-use'
import { ErrorListContext } from '../../FormItem'
import useEvent from './useEvent'

interface UseErrorListProps {
    name: string | string[]
    error?: Error
    collectErrorInRoot?: boolean
}

function arrayNamesToStr(name: string | string[] = '') {
    if (!isArray(name)) {
        return name
    }

    return name.join('_ETHAN_JOIN_')
}

/** 此hooks用于收集FormItem下面的所有FormItem的错误 */
export function useRootItemCollectErrors(props: UseErrorListProps) {
    const { name, error } = props
    const [errors, setErrors] = useSafeState<Record<string, Error>>({ [arrayNamesToStr(name)]: undefined })
    const prevError = usePrevious(error)
    const { onUpdateRootErrors } = useContext(ErrorListContext) || {}
    const updateErrors = useEvent((nameStr: string, err: Error) => {
        if (onUpdateRootErrors) {
            onUpdateRootErrors(arrayNamesToStr(name), err)
        } else {
            /** Root */
            setErrors((prev) => {
                const next = { ...prev }

                if (err) {
                    next[nameStr] = err
                } else {
                    delete next[nameStr]
                }

                return next
            })
        }
    })

    useUpdateEffect(() => {
        if (!isSameError(prevError, error)) {
            updateErrors(arrayNamesToStr(name), error)
        }
    }, [error])

    useEffect(() => {
        if (error) {
            updateErrors(arrayNamesToStr(name), error)
        }

        return () => {
            updateErrors(arrayNamesToStr(name), undefined)
        }
    }, [])

    return { errors, updateErrors, isRootItem: !!onUpdateRootErrors }
}
