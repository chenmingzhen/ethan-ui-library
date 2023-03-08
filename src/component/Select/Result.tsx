import { inputClass, selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import { isString } from '@/utils/is'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import Caret from '../icons/Caret'
import Input from '../Input'
import Popover from '../Popover/Popover'
import ResultItem from './ResultItem'
import { SelectData, SelectResultProps } from './type'

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

    function renderInput(inputPlaceholder?: React.ReactNode) {
        return (
            <Input
                autoFocus
                key="key"
                value={filterText}
                className={selectClass('input')}
                size={size}
                onChange={onInput}
                placeholder={isString(inputPlaceholder) ? inputPlaceholder : undefined}
                forwardedRef={forwardedInputRef}
            />
        )
    }

    function renderPlaceholder() {
        if (showInput) {
            return renderInput()
        }

        return (
            <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
                <span>{placeholder}</span>
            </span>
        )
    }

    function renderMore(resultList: SelectData[]) {
        const className = classnames(selectClass('popover'), compressedClassName)

        return (
            <Popover
                key="more"
                innerProps={{
                    onMouseDown(e) {
                        preventDefault(e)
                        stopPropagation(e)
                    },
                    onClick: stopPropagation,
                }}
                className={className}
                trigger="click"
                innerAlwaysUpdate
                content={
                    <div className={selectClass('popover-result')}>
                        {resultList.map((selectedDataItem, i) => (
                            <ResultItem
                                key={i}
                                index={i}
                                selectedDataItem={selectedDataItem}
                                disabled={disabledFunc(selectedDataItem)}
                                onRemove={onRemove}
                                getResultContent={getResultContent}
                                resultClassName={resultClassName}
                            />
                        ))}
                    </div>
                }
            >
                <a
                    tabIndex={-1}
                    className={selectClass('item', 'item-compressed', 'item-more')}
                    onClick={stopPropagation}
                    onMouseDown={(e) => {
                        preventDefault(e)
                        stopPropagation(e)
                    }}
                >
                    <span>{`+${resultList.length}`}</span>
                </a>
            </Popover>
        )
    }

    function renderResult() {
        const value = getResultContent(selectedData[0], undefined)

        if (multiple) {
            const computedResults = compressed ? selectedData.slice(0, 1) : selectedData

            const removable = !compressed || selectedData.length === 1

            const items = computedResults.map((selectedDataItem, index) => (
                <ResultItem
                    title
                    key={index}
                    selectedDataItem={selectedDataItem}
                    disabled={disabledFunc(selectedDataItem)}
                    onRemove={removable ? onRemove : undefined}
                    getResultContent={getResultContent}
                    index={index}
                    resultClassName={resultClassName}
                />
            ))

            if (compressed && selectedData.length > 1) {
                const restResult = selectedData.slice(1)

                items.push(renderMore(restResult))
            }

            if (showInput) {
                items.push(renderInput())
            }

            return items
        }

        if (showInput) {
            return renderInput(value)
        }

        return (
            <span title={isString(value) ? value : undefined} className={classnames(selectClass('ellipsis'))}>
                {value}
            </span>
        )
    }

    function renderIndicator() {
        if (!showArrow || (multiple && !compressed)) return null

        const showCaret = !multiple

        return (
            <a
                tabIndex={-1}
                className={selectClass('indicator', multiple ? 'multi' : 'caret')}
                onMouseDown={(e) => {
                    preventDefault(e)
                    stopPropagation(e)
                }}
            >
                {showCaret && <Caret />}
            </a>
        )
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

    return (
        <div className={selectClass('result', compressed && 'compressed')}>
            {!selectedData.length ? renderPlaceholder() : renderResult()}
            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(Result)
