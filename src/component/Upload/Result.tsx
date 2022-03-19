import React, { memo } from 'react'
import { uploadClass } from '@/styles'
import icons from '../icons'
import { ResultProps } from './type'

const Result: React.FC<ResultProps> = props => {
    const { renderResult, value, recoverAble, showRecover, onRemove, onRecover, index } = props

    const className = uploadClass('view-value', recoverAble && 'to-be-delete')

    const handleRemove = () => {
        onRemove(index)
    }

    const handleRecover = () => {
        onRecover(index, value)
    }

    return (
        <div className={className}>
            <div className={uploadClass('text')}>{renderResult(value)}</div>

            {onRemove && (
                <a className={uploadClass('delete')} onClick={handleRemove}>
                    {icons.Close}
                </a>
            )}

            {showRecover && (
                <a className={uploadClass('recover')} onClick={handleRecover}>
                    {icons.Recovery}
                </a>
            )}
        </div>
    )
}

export default memo(Result)
