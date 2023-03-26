import Input from '@/component/Input'
import { inputClass, selectClass } from '@/styles'
import { isEmpty, isString } from '@/utils/is'
import classnames from 'classnames'
import React from 'react'
import { SingleResultProps } from '../type'

/** 无输入状态 */
/** 单选 */
/** 多选 */
/** Input是绝对定位，placeholder是默认 */

/** 输入状态 */
/** 单选 */
/** 多选 */
/** Input是默认，placeholder是绝对定位 */

const SingleResult: React.FC<SingleResultProps> = function (props) {
    const {
        selectedData,
        getResultContent,
        filterText,
        size,
        onInput,
        forwardedInputRef,
        showInput,
        placeholder,
        show,
        isDisabled,
    } = props
    const content = getResultContent(selectedData[0], undefined)
    /** 是否正在输入状态 */
    const search = !!(show && onInput)
    const showPlaceHolder = isEmpty(content) && isEmpty(filterText)

    function getInputPlaceHolder() {
        if (!search) return undefined
        if (isString(content)) return content

        return undefined
    }

    return (
        <>
            <Input
                value={filterText}
                className={selectClass('input', search && 'search')}
                onChange={onInput}
                forwardedRef={forwardedInputRef}
                readOnly={!showInput}
                size={size}
                placeholder={getInputPlaceHolder()}
                disabled={isDisabled}
            />

            {content && !search && <span className={selectClass('ellipsis')}>{content}</span>}

            {showPlaceHolder && (
                <span
                    className={classnames(
                        inputClass('placeholder'),
                        selectClass('ellipsis', search && 'search', 'placeholder')
                    )}
                >
                    {placeholder}
                </span>
            )}
        </>
    )
}

export default React.memo(SingleResult)
