// @ts-nocheck
import { compose } from '@/utils/func'
import delay from '@/hoc/delay'
import trim from '@/hoc/trim'
import inputable from '@/component/Form/inputable'
import Component from './EditableArea'

const EditableArea = compose(inputable, delay(400), trim)(Component)

EditableArea.displayName = 'EthanEditableArea'

export default EditableArea
