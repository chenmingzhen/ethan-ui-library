import React, { useCallback, useEffect, useRef, useState } from 'react'

function useFocus(): [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    (callback?: () => void) => void,
    React.MutableRefObject<boolean>
] {
    const [focus, updateFocus] = useState(false)
    const hasLockFocusRef = useRef(false)
    const lockTimer = useRef<NodeJS.Timeout>()

    /** 短暂阻止执行onFocus和onBlur，callback内可以操作重新获取焦点 */
    const lockFocus = useCallback((callback?: () => void) => {
        hasLockFocusRef.current = true

        lockTimer.current = setTimeout(() => {
            if (callback) {
                callback()
            }

            setTimeout(() => {
                hasLockFocusRef.current = false
            })
        }, 30)
    }, [])

    const cancelLockFocus = useCallback(() => {
        hasLockFocusRef.current = false

        clearTimeout(lockTimer.current)
    }, [])

    useEffect(() => cancelLockFocus, [])

    return [focus, updateFocus, lockFocus, hasLockFocusRef]
}

export default useFocus
