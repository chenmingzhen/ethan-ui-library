import { useRef, useCallback } from 'react'

export default function useRefMethod<T extends (...args) => any>(callback: T): T {
    const fnRef = useRef<any>()

    fnRef.current = callback

    const memoFn = useCallback<T>(((...args: any) => fnRef.current?.(...args)) as any, [])

    return memoFn
}
