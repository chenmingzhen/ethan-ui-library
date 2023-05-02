import useLockFocus from '@/hooks/useLockFocus'
import useRefMethod from '@/hooks/useRefMethod'
import { isDescendent } from '@/utils/dom/element'
import React, { ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react'
import useInputStyle from '../Input/hooks/useInputStyle'
import { ContainerProps } from './type'

const Container: ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = function (props, ref) {
    const {
        disabled,
        onFocus,
        onBlur,
        border,
        size,
        type,
        containerClassName,
        innerClassName,
        containerStyle,
        onDescClick,
        ...other
    } = props
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useLockFocus()
    const containerRef = useRef<HTMLDivElement>()
    const { className, style } = useInputStyle({
        focus,
        disabled,
        border,
        size,
        className: containerClassName,
        style: containerStyle,
    })

    const handleClickAway = useRefMethod((e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, props['data-id'])

        if (desc) {
            lockFocus(() => {
                onDescClick(e)
            })
        }
    })

    function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
        if (hasLockFocusRef.current || disabled) return
        if (onFocus) {
            onFocus(e)
        }

        document.addEventListener('mousedown', handleClickAway)

        updateFocus(true)
        lockFocus()
    }

    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (hasLockFocusRef.current || disabled) return
        if (onBlur) {
            onBlur(e)
        }

        document.removeEventListener('mousedown', handleClickAway)

        updateFocus(false)
    }

    useImperativeHandle(ref, () => containerRef.current)

    return (
        <div className={className} style={style}>
            <div {...other} onFocus={handleFocus} onBlur={handleBlur} className={innerClassName} ref={containerRef} />
        </div>
    )
}

export default React.memo(React.forwardRef(Container))
