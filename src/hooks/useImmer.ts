import immer, { Draft } from 'immer'
import { useCallback } from 'react'
import { useGetSet } from 'react-use'
import useSafeState from './useSafeState'

type UpdaterType<T> = ((draft: Draft<T> | T) => void) | T

const useImmer = <T>(initialValue: T): [() => T, (f: UpdaterType<T>) => void] => {
    const [val, updateValue] = useGetSet(initialValue)

    return [
        val,
        useCallback((updater: (draft: Draft<T> | T) => void) => {
            if (typeof updater === 'function') updateValue(immer(updater as any))
            else updateValue(updater)
        }, []),
    ]
}

export default useImmer
