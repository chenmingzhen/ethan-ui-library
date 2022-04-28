import React, { useCallback, useEffect } from 'react'
import { treeClass } from '@/styles'
import { useUpdate } from 'react-use'
import Checkbox from '../Checkbox/Checkbox'
import { TreeCheckboxProps } from './type'

const TreeCheckbox: React.FC<TreeCheckboxProps> = props => {
    const { id, onChange, disabled, datum } = props

    const update = useUpdate()

    useEffect(() => {
        datum.bind(id, update)

        return () => {
            datum.unbind(id)
        }
    }, [])

    const handleChange = useCallback(
        checked => {
            datum.set(id, checked ? 1 : 0)

            onChange(datum.getValue(), id)
        },
        [onChange, id]
    )

    const checkDisabled = useCallback(() => {
        if (disabled) return true

        return datum.isDisabled(id)
    }, [id, disabled])

    const checked = datum.getChecked(id)

    return (
        <Checkbox
            checked={checked}
            disabled={checkDisabled()}
            onChange={handleChange}
            className={treeClass('checkbox')}
        />
    )
}

export default React.memo(TreeCheckbox)
