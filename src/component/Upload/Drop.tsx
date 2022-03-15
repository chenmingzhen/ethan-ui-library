// @ts-nocheck
import React, { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { uploadClass } from '@/styles'
import fileAccept from '@/component/Upload/utils/accept'

const Drop = props => {
    const [drop, setDrop] = useState(false)
    const { className, disabled, multiple, accept, onDrop, children, drop: pDrop, dropData } = props

    // --------------------------------------method------------------------------------------
    const handleFileDrop = useCallback(
        e => {
            const { files } = e.dataTransfer
            const filter = accept ? Array.prototype.filter.call(files, f => fileAccept(f, accept)) : files

            if (!filter || filter.length === 0) return
            if (onDrop) onDrop(multiple ? filter : [filter[0]], dropData)
        },
        [accept, multiple, onDrop, dropData]
    )
    const handleDrag = useCallback(
        e => {
            if (disabled) return

            e.preventDefault()
            e.stopPropagation()

            // 拖动进行中
            setDrop(e.type === 'dragover')
            // 拖动完成
            if (e.type === 'drop') handleFileDrop(e)
        },
        [disabled, handleFileDrop]
    )

    // ----------------------------------------render------------------------------------------
    if (!pDrop) return children
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

Drop.propTypes = {
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    onDrop: PropTypes.func,
    dropData: PropTypes.any,
    children: PropTypes.any,
    drop: PropTypes.bool,
    className: PropTypes.string,
}

export default memo(Drop)
