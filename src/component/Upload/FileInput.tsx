import React, { useCallback, useRef, memo, useImperativeHandle } from 'react'
import { FileInputProps } from './type'

export interface FileInputInstance {
    click(): void
}

const FileInput: React.ForwardRefRenderFunction<FileInputInstance, FileInputProps> = (props, ref) => {
    const inputRef = useRef<HTMLInputElement>()

    const locked = useRef(false)

    const click = useCallback(() => {
        if (locked.current) return

        locked.current = true

        inputRef.current.value = ''

        inputRef.current.click()

        setTimeout(() => {
            locked.current = false
        }, 1000)
    }, [])

    useImperativeHandle(ref, () => ({ click }))

    const { accept, onChange, multiple } = props

    return (
        <input
            ref={inputRef}
            accept={accept}
            multiple={multiple}
            onChange={onChange}
            style={{ display: 'none' }}
            type="file"
        />
    )
}

export default memo(React.forwardRef(FileInput))
