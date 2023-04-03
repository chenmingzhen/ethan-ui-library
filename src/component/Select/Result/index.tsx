import { selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import React from 'react'
import Caret from '../../icons/Caret'
import { SelectResultProps } from '../type'
import MultipleResult from './MultipleResult'
import SingleResult from './SingleResult'

const Result: React.FC<SelectResultProps> = function (props) {
    const {
        onInput,
        compressedClassName,
        resultClassName,
        onRemove,
        selectedData,
        multiple,
        compressed,
        size,
        filterText,
        placeholder,
        showArrow,
        onClear,
        disabledFunc,
        isDisabled,
        forwardedInputRef,
        getResultContent,
    } = props

    function renderIndicator() {
        if (!showArrow || (multiple && !compressed)) return null

        const showCaret = !multiple

        return <span className={selectClass('indicator', multiple ? 'multi' : 'caret')}>{showCaret && <Caret />}</span>
    }

    function renderClear() {
        if (onClear && selectedData.length > 0 && isDisabled !== true) {
            return (
                <div
                    onClick={onClear}
                    className={selectClass('close-wrapper')}
                    onMouseDown={(e) => {
                        preventDefault(e)
                        stopPropagation(e)
                    }}
                >
                    <span data-role="close" className={selectClass('indicator', 'close')} />
                </div>
            )
        }

        return null
    }

    const resultNode = multiple ? (
        <MultipleResult
            isDisabled={isDisabled}
            selectedData={selectedData}
            getResultContent={getResultContent}
            filterText={filterText}
            size={size}
            onInput={onInput}
            forwardedInputRef={forwardedInputRef}
            placeholder={placeholder}
            compressed={compressed}
            compressedClassName={compressedClassName}
            onRemove={onRemove}
            resultClassName={resultClassName}
            disabledFunc={disabledFunc}
        />
    ) : (
        <SingleResult
            selectedData={selectedData}
            getResultContent={getResultContent}
            filterText={filterText}
            size={size}
            onInput={onInput}
            forwardedInputRef={forwardedInputRef}
            placeholder={placeholder}
            isDisabled={isDisabled}
        />
    )

    return (
        <div className={selectClass('result', compressed && 'compressed')}>
            {resultNode}
            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(Result)
