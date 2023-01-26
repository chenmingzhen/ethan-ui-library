import React from 'react'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { isEmpty, isString } from '@/utils/is'
import { preventDefault, stopPropagation } from '@/utils/func'
import { SelectResultItemProps } from './type'

const ResultItem: React.FC<SelectResultItemProps> = function (props) {
    const { result: value, onRemove, disabled, title, renderResult, resultClassName } = props

    const remove = disabled || !onRemove ? undefined : () => onRemove(value)

    const hideRemove = disabled || !remove

    const content = renderResult(value)

    if (isEmpty(content)) return null

    return (
        <a
            title={title && isString(content) ? content : null}
            tabIndex={-1}
            className={classnames(selectClass('item', disabled && 'disabled', hideRemove && 'ban'), resultClassName)}
            onClick={stopPropagation}
            onMouseDown={(e) => {
                preventDefault(e)
                stopPropagation(e)
            }}
        >
            {content}

            {!hideRemove && <span className={selectClass('indicator', 'close')} onClick={remove} />}
        </a>
    )
}

export default React.memo(ResultItem)
