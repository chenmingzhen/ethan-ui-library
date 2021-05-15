// @ts-nocheck
import React, { useCallback, useRef, memo, useImperativeHandle } from 'react'

const inputStyle = { display: 'none' }

const FileInput = (props, ref) => {
    const inputRef = useRef()
    const locked = useRef(false)

    const click = useCallback(() => {
        if (locked.current) return
        locked.current = true

        inputRef.current.value = ''
        inputRef.current.click()

        setTimeout(() => {
            locked.current = false
        }, 1000)
    }, [inputRef.current, locked.current])

    useImperativeHandle(ref, () => ({ click }))

    const { accept, onChange, multiple, webkitdirectory } = props

    return (
        <input
            ref={inputRef}
            accept={accept}
            multiple={multiple}
            onChange={onChange}
            style={inputStyle}
            // for chrome
            webkitdirectory={webkitdirectory}
            type="file"
        />
    )
}

export default memo(React.forwardRef(FileInput))
