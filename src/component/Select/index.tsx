// @ts-nocheck
import React from 'react'
import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputBorder from '@/hoc/inputBorder'
import { selectClass } from '@/styles'
import inputable from '../Form/inputable'
import Select from './Select'
import filter from './filter'
import group from './group'
import absolute from '../Table/context'

const limitWrap = Origin => props => {
    // eslint-disable-next-line
    const limit = props.multiple ? 0 : 1
    return <Origin {...props} limit={limit} />
}

const SelectContainer = compose(
    inputable,
    inputBorder({ className: selectClass('_'), tag: 'div' }),
    limitWrap,
    Datum.Hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'], pure: false }),
    filter,
    group,
    absolute
)(Select)

SelectContainer.displayName = 'EthanSelect'

export default SelectContainer
