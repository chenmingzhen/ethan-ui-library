import { useCallback, useEffect, useRef } from 'react'
import useSafeState from './useSafeState'

type Updater<T> = T | ((origin: T) => T)

export default function useStateCallback<T>(
    initialState: T | (() => T)
): [T, (state: Updater<T>, cb?: (state: T) => void) => void] {
    const [state, setState] = useSafeState(initialState)
    const cbRef = useRef<((state: T) => void) | undefined>(undefined)
    const setStateCallback = useCallback((nextState: Updater<T>, cb?: (state: T) => void) => {
        cbRef.current = cb
        setState(nextState)
    }, [])

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state)
            cbRef.current = undefined
        }
    }, [state])

    return [state, setStateCallback]
}
