/* https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useSafeState/index.ts */

import React, { Dispatch, SetStateAction } from 'react'
import useUnmountedRef from './useUnmountedRef'

function useSafeState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>]

function useSafeState<T = undefined>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useSafeState(initialState?) {
    const unmountedRef = useUnmountedRef()

    const [state, setState] = React.useState(initialState)

    const setSafeState = React.useCallback(currentState => {
        if (unmountedRef.current) return

        setState(currentState)
    }, [])

    return [state, setSafeState] as const
}

export default useSafeState
