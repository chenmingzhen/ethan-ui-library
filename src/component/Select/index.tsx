import React from 'react'
import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputBorder from '@/hoc/inputBorder'
import { selectClass } from '@/styles'
import withControl from '../../hoc/withControl'
import Select from './Select'
import group from './group'
import FilterHoc from './Hoc/FilterHoc'

const limitWrap = Origin => props => {
    const limit = props.multiple ? 0 : 1

    return <Origin {...props} limit={limit} />
}

const SelectContainer = compose(
    withControl,
    inputBorder({ className: selectClass('_'), tag: 'div' }),
    limitWrap,
    Datum.Hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'multiple'] }),
    FilterHoc,
    group
)(Select)

SelectContainer.displayName = 'EthanSelect'

export default SelectContainer
