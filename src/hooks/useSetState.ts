import { isFunc } from '@/utils/is'
import { useReducer, useRef } from 'react'
import useExecOnce from './useExecOnce'

export default function useSetState<S extends Record<string, any>>(initialState: S | (() => S)) {
    const defaultStateRef = useRef<S>(undefined)

    useExecOnce(() => {
        defaultStateRef.current = isFunc(initialState) ? initialState() : initialState
    })

    const defaultState = defaultStateRef.current

    return useReducer(
        (state: S, action: Partial<S> | ((state: S) => Partial<S>)) => ({
            ...state,
            ...(typeof action === 'function' ? action(state) : action),
        }),
        defaultState
    )
}
