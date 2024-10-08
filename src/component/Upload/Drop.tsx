import React, { useState } from 'react'
import classnames from 'classnames'
import { uploadClass } from '@/styles'
import fileAccept from '@/component/Upload/utils/accept'
import { DropProps } from './type'

const Drop: React.FC<DropProps> = (props) => {
    const [drop, setDrop] = useState(false)
    const { className, disabled, multiple, accept, onDrop, children, dropData } = props

    if (!props.drop) return <>{children}</>

    function handleFileDrop(e: React.DragEvent<HTMLSpanElement>) {
        const { files } = e.dataTransfer

        const filter = accept ? Array.prototype.filter.call(files, (file) => fileAccept(file, accept)) : files

        if (!filter || filter.length === 0) return

        if (onDrop) onDrop(multiple ? filter : [filter[0]], dropData)
    }

    function handleDrag(e: React.DragEvent<HTMLSpanElement>) {
        if (disabled) return

        e.preventDefault()

        e.stopPropagation()

        setDrop(e.type === 'dragover')

        if (e.type === 'drop') handleFileDrop(e)
    }

    return (
        <span
            className={classnames(className, uploadClass(drop && 'drop'))}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrag}
        >
            {children}
        </span>
    )
}

export default React.memo(Drop)
