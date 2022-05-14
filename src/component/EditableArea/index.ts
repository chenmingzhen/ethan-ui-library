import { compose } from '@/utils/func'
import trim from '@/hoc/trim'
import inputable from '@/component/Form/inputable'
import React from 'react'
import Component from './EditableArea'
import { EditableProps } from './type'

const EditableArea = compose(inputable, trim)(Component) as React.ClassicComponentClass<EditableProps>

export default EditableArea
