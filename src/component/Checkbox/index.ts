import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputable from '../Form/inputable'
import Checkbox from './Checkbox'
import Group from './Group'
import { consumer } from './context'

const exports = compose(inputable, consumer)(Checkbox)
exports.Group = compose(inputable, Datum.hoc({ bindProps: ['disabled', 'format', 'prediction', 'separator'] }))(Group)
exports.Checkbox = Checkbox

exports.displayName = 'EthanCheckbox'
exports.Group.displayName = 'EthanCheckboxGroup'

export default exports
