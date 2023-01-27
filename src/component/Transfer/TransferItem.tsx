import React, { memo, useContext } from 'react'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import Checkbox from '../Checkbox'
import { TransferContext } from './context'
import { TransferItemProps } from './type'

const Item: React.FC<TransferItemProps> = (props) => {
    const { selectedKeys, setSelectedKeys } = useContext(TransferContext)

    const { index, checkKey, content, disabled, itemClass, lineHeight } = props

    function handleCheck(check) {
        if (check) {
            setSelectedKeys(index, [...selectedKeys[index], checkKey])
        } else {
            setSelectedKeys(
                index,
                selectedKeys[index].filter((ch) => ch !== checkKey)
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
                checked={selectedKeys[index].indexOf(checkKey) > -1}
            >
                {content}
            </Checkbox>
        </div>
    )
}

export default memo(Item)
