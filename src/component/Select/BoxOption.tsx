import { selectClass } from '@/styles'
import React from 'react'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'
import { SelectBoxOptionProps } from './type'

const BoxOption: React.FC<SelectBoxOptionProps> = function(props) {
    const { data, index, isActive, renderItem, columns, multiple, disabled, onClick } = props

    const width = `${(1 / columns) * 100}%`

    const CheckItem = multiple ? Checkbox : Radio

    const item = renderItem(data, index)

    function handleChange() {
        if (disabled) return

        onClick(data)
    }

    return (
        <CheckItem style={{ width }} checked={isActive} className={selectClass('option')} onChange={handleChange}>
            <span>{item}</span>
        </CheckItem>
    )
}

export default React.memo(BoxOption)
