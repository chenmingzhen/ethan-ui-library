import Input from '@/component/Input'
import Popover from '@/component/Popover/Popover'
import { selectClass } from '@/styles'
import { preventDefault, stopPropagation } from '@/utils/func'
import classnames from 'classnames'
import React from 'react'
import { isEmpty } from '@/utils/is'
import MultipleResultItem from './MultipleResultItem'
import { MultipleResultProps, SelectData } from '../type'

const MultipleResult: React.FC<MultipleResultProps> = function (props) {
    const {
        selectedData,
        getResultContent,
        filterText,
        size,
        onInput,
        forwardedInputRef,
        compressed,
        placeholder,
        disabledFunc,
        onRemove,
        resultClassName,
        compressedClassName,
        isDisabled,
    } = props

    function renderMore(resultList: SelectData[]) {
        const className = classnames(selectClass('popover'), compressedClassName)

        return (
            <Popover
                key="more"
                className={className}
                trigger="hover"
                popupProps={{
                    onMouseDown(e) {
                        preventDefault(e)
                        stopPropagation(e)
                    },
                    onClick: stopPropagation,
                }}
                content={
                    <div className={selectClass('popover-result')}>
                        {resultList.map((selectedDataItem, i) => (
                            <MultipleResultItem
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
                <span className={selectClass('item', 'item-compressed', 'item-more')}>{`+${resultList.length}`}</span>
            </Popover>
        )
    }

    function buildItem() {
        const computedResults = compressed ? selectedData.slice(0, 1) : selectedData

        const removable = !compressed || selectedData.length === 1

        const items = computedResults.map((selectedDataItem, index) => (
            <MultipleResultItem
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

        return items
    }

    const showPlaceHolder = selectedData.length === 0 && isEmpty(filterText)
    const readOnly = !onInput || isDisabled

    return (
        <>
            {buildItem()}

            <Input
                value={filterText}
                className={selectClass('input')}
                size={size}
                onChange={onInput}
                forwardedRef={forwardedInputRef}
                readOnly={readOnly}
                disabled={isDisabled}
                placeholder={showPlaceHolder ? placeholder : undefined}
            />
        </>
    )
}

export default React.memo(MultipleResult)
