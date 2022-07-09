import { compose } from '@/utils/func'
import trim from '@/hoc/trim'
import withControl from '@/hoc/withControl'
import React from 'react'
import Component from './EditableArea'
import { EditableProps } from './type'

const EditableArea = compose(withControl, trim)(Component) as React.ClassicComponentClass<EditableProps>

export default EditableArea
