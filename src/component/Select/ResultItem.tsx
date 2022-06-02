import React from 'react'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { isEmpty, isString } from '@/utils/is'
import { SelectResultItemProps } from './type'

const ResultItem: React.FC<SelectResultItemProps> = function(props) {
    const { result: value, onRemove, disabled, title, renderResult, resultClassName } = props

    const remove = disabled || !onRemove ? undefined : () => onRemove(value)

    const hideRemove = disabled || !remove

    const content = typeof renderResult === 'function' ? renderResult(value) : value?.[renderResult]

    if (isEmpty(content)) return null

    return (
        <a
            title={title && isString(content) ? content : null}
            tabIndex={-1}
            className={classnames(selectClass('item', disabled && 'disabled', hideRemove && 'ban'), resultClassName)}
        >
            {content}

            {!hideRemove && <span className={selectClass('indicator', 'close')} onClick={remove} />}
        </a>
    )
}

export default React.memo(ResultItem)
