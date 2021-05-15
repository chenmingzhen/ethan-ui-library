// @ts-nocheck
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import Checkbox from '../Checkbox'
import { Consumer } from './context'

const Item = props => {
    const { index, selecteds, checkKey, setSelecteds, content, disabled, itemClass } = props
    const check = useCallback(
        c => {
            if (c) {
                setSelecteds(index, [...selecteds[index], checkKey])
            } else {
                setSelecteds(
                    index,
                    selecteds[index].filter(ch => ch !== checkKey)
                )
            }
        },
        [index, selecteds, checkKey, setSelecteds]
    )

    return (
        <div className={classnames(transferClass('item', disabled && 'item-disabled'), itemClass)}>
            <Checkbox
                className={transferClass('item-check')}
                onChange={check}
                disabled={disabled}
                checked={selecteds[index].indexOf(checkKey) > -1}
            >
                {content}
            </Checkbox>
        </div>
    )
}

Item.propTypes = {
    index: PropTypes.number,
    selecteds: PropTypes.array,
    checkKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    setSelecteds: PropTypes.func,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    itemClass: PropTypes.string,
}

export default memo(prop => (
    <Consumer>{value => <Item {...prop} selecteds={value.selecteds} setSelecteds={value.setSelecteds} />}</Consumer>
))
