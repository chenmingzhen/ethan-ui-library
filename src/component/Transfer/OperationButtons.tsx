import React, { memo } from 'react'
import { transferClass } from '@/styles'
import Button from '../Button'
import icons from '../icons'
import { TransferOperationButtonProps } from './type'

const OperationButtons: React.FC<TransferOperationButtonProps> = (props) => {
    const {
        operations,
        operationIcon,
        isDisabledAll,
        addByDataItems,
        removeByDataItems,
        onSelectedKeyChange,
        selectedKeys,
        cacheDataMapping,
        disabled,
        oneWay,
    } = props

    function handleChange(index: number) {
        const nextSelectedDataItems = selectedKeys[1 - index].filter((selectedKey) => {
            const dataItem = cacheDataMapping.get(selectedKey)

            if (!dataItem) return false

            return !disabled(dataItem)
        })

        onSelectedKeyChange(1 - index, [])

        if (index) {
            addByDataItems(nextSelectedDataItems)
        } else {
            removeByDataItems(nextSelectedDataItems)
        }
    }

    return (
        <div className={transferClass('btns')}>
            <div>
                <Button
                    type="primary"
                    disabled={isDisabledAll || !selectedKeys[0].length}
                    size="small"
                    className={transferClass('btns-button', 'btns-bottom')}
                    onClick={() => {
                        handleChange(1)
                    }}
                >
                    {operationIcon && icons.AngleRight}
                    {operations[0]}
                </Button>
                {!oneWay ? (
                    <>
                        <br />
                        <Button
                            type="primary"
                            disabled={isDisabledAll || !selectedKeys[1].length}
                            size="small"
                            className={transferClass('btns-button')}
                            onClick={() => {
                                handleChange(0)
                            }}
                        >
                            {operationIcon && icons.AngleLeft}
                            {operations[1]}
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default memo(OperationButtons)
