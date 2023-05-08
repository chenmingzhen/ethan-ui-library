import Input from '@/component/Input'
import { inputClass, selectClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import classnames from 'classnames'
import React from 'react'
import { SingleResultProps } from '../type'

const SingleResult: React.FC<SingleResultProps> = function (props) {
    const { selectedData, getResultContent, filterText, size, onInput, forwardedInputRef, placeholder, isDisabled } =
        props

    const content = getResultContent(selectedData[0], undefined)
    const showPlaceHolder = isEmpty(content) && isEmpty(filterText)
    const showContent = content && isEmpty(filterText)
    const readOnly = !onInput || isDisabled

    return (
        <>
            <Input
                size={size}
                onChange={onInput}
                value={filterText}
                readOnly={readOnly}
                disabled={isDisabled}
                className={selectClass('input')}
                forwardedRef={forwardedInputRef}
            />

            {showContent && <span className={selectClass('ellipsis', 'single-item')}>{content}</span>}

            {showPlaceHolder && (
                <span className={classnames(inputClass('placeholder'), selectClass('ellipsis', 'placeholder'))}>
                    {placeholder}
                </span>
            )}
        </>
    )
}

export default React.memo(SingleResult)
