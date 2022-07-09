import inputBorder from '@/hoc/inputBorder'
import { selectClass } from '@/styles'
import { compose } from '@/utils/func'
import React from 'react'
import Component from './Cascader'
import withControl from '../../hoc/withControl'
import absolute from '../Table/context'
import { CascaderProps } from './type'

const Cascader = compose(
    withControl,
    inputBorder({ className: selectClass('_'), tag: 'span' }),
    absolute
)(Component) as React.ComponentClass<CascaderProps>

Cascader.displayName = 'EthanCascader'

export default Cascader
