import React, { memo, useContext } from 'react'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import Checkbox from '../Checkbox'
import { TransferContext } from './context'
import { TransferItemProps } from './type'

const Item: React.FC<TransferItemProps> = (props) => {
    const { selecteds, setSelecteds } = useContext(TransferContext)

    const { index, checkKey, content, disabled, itemClass, lineHeight } = props

    function handleCheck(check) {
        if (check) {
            setSelecteds(index, [...selecteds[index], checkKey])
        } else {
            setSelecteds(
                index,
                selecteds[index].filter((ch) => ch !== checkKey)
            )
        }
    }

    return (
        <div
            className={classnames(transferClass('item', disabled && 'item-disabled'), itemClass)}
            style={{ height: lineHeight }}
        >
            <Checkbox
                className={transferClass('item-check')}
                onChange={handleCheck}
                disabled={disabled}
                checked={selecteds[index].indexOf(checkKey) > -1}
            >
                {content}
            </Checkbox>
        </div>
    )
}

export default memo(Item)
