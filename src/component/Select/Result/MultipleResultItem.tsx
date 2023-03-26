import React from 'react'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { isEmpty, isFunc, isString } from '@/utils/is'
import { preventDefault, stopPropagation } from '@/utils/func'
import { MultipleResultItemProps } from '../type'

const MultipleResultItem: React.FC<MultipleResultItemProps> = function (props) {
    const { selectedDataItem, onRemove, disabled, title, getResultContent, resultClassName, index } = props
    const remove = disabled || !onRemove ? undefined : () => onRemove(selectedDataItem)
    const hideRemove = disabled || !remove
    const content = getResultContent(selectedDataItem, index)

    if (isEmpty(content)) return null

    return (
        <a
            title={title && isString(content) ? content : null}
            tabIndex={-1}
            className={classnames(
                selectClass('item', disabled && 'disabled', hideRemove && 'ban'),
                isFunc(resultClassName) ? resultClassName(selectedDataItem) : resultClassName
            )}
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

export default React.memo(MultipleResultItem)
