import { selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import React, { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import Caret from '../../icons/Caret'
import { SelectResultProps } from '../type'
import MultipleResult from './MultipleResult'
import SingleResult from './SingleResult'

const Result: React.FC<SelectResultProps> = function (props) {
    const {
        show,
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

    const [showInput, updateShowInput] = useState(!!(show && onInput))

    useUpdateEffect(() => {
        if (!onInput) return

        if (!show) {
            setTimeout(() => {
                updateShowInput(false)
            }, 10)
        } else {
            updateShowInput(show)
        }
    }, [show])

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
            showInput={showInput}
            placeholder={placeholder}
            compressed={compressed}
            compressedClassName={compressedClassName}
            onRemove={onRemove}
            resultClassName={resultClassName}
            disabledFunc={disabledFunc}
            show={show}
        />
    ) : (
        <SingleResult
            selectedData={selectedData}
            getResultContent={getResultContent}
            filterText={filterText}
            size={size}
            onInput={onInput}
            forwardedInputRef={forwardedInputRef}
            showInput={showInput}
            placeholder={placeholder}
            show={show}
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
