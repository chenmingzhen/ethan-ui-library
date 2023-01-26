import { inputClass, selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import { isFunc, isNumber, isString } from '@/utils/is'
import { warningOnce } from '@/utils/warning'
import classnames from 'classnames'
import React, { isValidElement, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import Caret from '../icons/Caret'
import Input from '../Input'
import Popover from '../Popover/Popover'
import ResultItem from './ResultItem'
import { SelectResultProps } from './type'

const Result: React.FC<SelectResultProps> = function (props) {
    const {
        show,
        onInput,
        compressedClassName,
        resultClassName,
        onRemove,
        result,
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

    function buildResult(item) {
        let node = null

        if (isFunc(props.renderResult)) {
            node = props.renderResult(item)
        }

        if (isString(props.renderResult)) {
            node = item?.[props.renderResult]
        }

        if (!isValidElement(node) && !isString(node) && !isNumber(node)) {
            warningOnce('[Ethan UI:Select]:renderResult must be a string of a function that return ReactNode')

            return null
        }

        return node
    }

    function renderMore(resultList: any[]) {
        const className = classnames(selectClass('popover'), compressedClassName)

        /** 阻止click冒泡到父容器中 */
        /** 阻止触发Focus和Blur事件 */
        return (
            <Popover
                key="more"
                innerProps={{
                    onMouseDown: preventDefault,
                    onClick: stopPropagation,
                }}
                className={className}
                trigger="click"
                innerAlwaysUpdate
                content={
                    <div className={selectClass('popover-result')}>
                        {resultList.map((r, i) => (
                            <ResultItem
                                key={i}
                                result={r}
                                disabled={disabledFunc(r)}
                                onRemove={onRemove}
                                renderResult={buildResult}
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
                    onMouseDown={preventDefault}
                >
                    <span>{`+${resultList.length}`}</span>
                </a>
            </Popover>
        )
    }

    function renderResult() {
        const value = buildResult(result[0])

        if (multiple) {
            const computedResults = compressed ? result.slice(0, 1) : result

            const removable = !compressed || result.length === 1

            const items = computedResults.map((r, index) => (
                <ResultItem
                    title
                    key={index}
                    result={r}
                    disabled={disabledFunc(r)}
                    onRemove={removable ? onRemove : undefined}
                    renderResult={buildResult}
                    resultClassName={resultClassName}
                />
            ))

            if (compressed && result.length > 1) {
                const restResult = result.slice(1)

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
            <span
                title={isString(value) ? value : undefined}
                className={classnames(selectClass('ellipsis'), resultClassName)}
            >
                {value}
            </span>
        )
    }

    function renderIndicator() {
        if (!showArrow || (multiple && !compressed)) return null

        const showCaret = !multiple

        return (
            <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
                {showCaret && <Caret />}
            </a>
        )
    }

    function renderClear() {
        if (onClear && result.length > 0 && isDisabled !== true) {
            return (
                <div onClick={onClear} className={selectClass('close-wrapper')} onMouseDown={preventDefault}>
                    <span data-role="close" className={selectClass('indicator', 'close')} />
                </div>
            )
        }

        return null
    }

    return (
        <div className={selectClass('result', compressed && 'compressed')}>
            {!result.length ? renderPlaceholder() : renderResult()}
            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(Result)
