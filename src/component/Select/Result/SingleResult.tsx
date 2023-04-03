import Input from '@/component/Input'
import { selectClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import React from 'react'
import { SingleResultProps } from '../type'

const SingleResult: React.FC<SingleResultProps> = function (props) {
    const { selectedData, getResultContent, filterText, size, onInput, forwardedInputRef, placeholder, isDisabled } =
        props
    const content = getResultContent(selectedData[0], undefined)
    const showPlaceHolder = isEmpty(content) && isEmpty(filterText)
    const readOnly = !onInput || isDisabled || !isEmpty(content)
    const full = !content

    return (
        <>
            {content && <span className={selectClass('ellipsis')}>{content}</span>}

            <Input
                value={filterText}
                className={selectClass('input', full && 'f1', !readOnly && 'search')}
                onChange={onInput}
                forwardedRef={forwardedInputRef}
                readOnly={readOnly}
                size={size}
                placeholder={showPlaceHolder ? placeholder : undefined}
                disabled={isDisabled}
            />
        </>
    )
}

export default React.memo(SingleResult)
