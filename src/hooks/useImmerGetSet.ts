import immer, { Draft } from 'immer'
import { useCallback } from 'react'
import { useGetSet } from 'react-use'
import useUnmountedRef from './useUnmountedRef'

type UpdaterType<T> = ((draft: Draft<T> | T) => void) | T

const useImmerGetSet = <T>(initialValue: T): [() => T, (f: UpdaterType<T>) => void] => {
    const [val, updateValue] = useGetSet(initialValue)

    // 使用标志符 避免结束挂载后仍然更新状态
    const unmount = useUnmountedRef()

    return [
        val,
        useCallback((updater: (draft: Draft<T> | T) => void) => {
            if (unmount.current) return

            if (typeof updater === 'function') updateValue(immer(updater as any))
            else updateValue(updater)
        }, []),
    ]
}

export default useImmerGetSet
