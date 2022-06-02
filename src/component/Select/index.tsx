import React from 'react'
import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputBorder from '@/hoc/inputBorder'
import { selectClass } from '@/styles'
import inputable from '../Form/inputable'
import Select from './Select2'
import group from './group'
import FilterHoc from './Hoc/FilterHoc'

const limitWrap = Origin => props => {
    const limit = props.multiple ? 0 : 1

    return <Origin {...props} limit={limit} />
}

const SelectContainer = compose(
    inputable,
    inputBorder({ className: selectClass('_'), tag: 'div' }),
    limitWrap,
    Datum.Hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'], pure: false }),
    FilterHoc,
    group
)(Select)

SelectContainer.displayName = 'EthanSelect'

export default SelectContainer
