import React, { memo } from 'react'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import Checkbox from '../Checkbox'
import { TransferItemProps } from './type'
import icons from '../icons'

const Item: React.FC<TransferItemProps> = (props) => {
    const {
        index,
        checkKey,
        content,
        disabled,
        itemClass,
        lineHeight,
        sideSelectedKeys,
        onSelectedKeyChange,
        oneWay,
        removeByDataItems,
        dataItem,
    } = props

    const handleCheck = useRefMethod((checked: boolean) => {
        if (checked) {
            onSelectedKeyChange(index, [...sideSelectedKeys, checkKey])
        } else {
            onSelectedKeyChange(
                index,
                sideSelectedKeys.filter((ch) => ch !== checkKey)
            )
        }
    })

    const handleDelete = useRefMethod(() => {
        if (disabled) return

        removeByDataItems([dataItem])
    })

    return (
        <div
            className={classnames(transferClass('item', disabled && 'item-disabled'), itemClass)}
            style={{ height: lineHeight }}
        >
            {oneWay && index ? (
                <span className={transferClass('item-right')}>
                    <span>{content}</span>
                    <span className={transferClass('item-delete')} onClick={handleDelete}>
                        {icons.Delete}
                    </span>
                </span>
            ) : (
                <Checkbox
                    className={transferClass('item-checkbox')}
                    onChange={handleCheck}
                    disabled={disabled}
                    checked={sideSelectedKeys.indexOf(checkKey) > -1}
                >
                    {content}
                </Checkbox>
            )}
        </div>
    )
}

export default memo(Item)
