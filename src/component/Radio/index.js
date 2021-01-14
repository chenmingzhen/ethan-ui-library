import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputable from '../Form/inputable'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'

const exports = consumer(Radio)
exports.Group = compose(
  inputable,
  Datum.hoc({ limit: 1, bindProps: ['disabled', 'format', 'prediction'], pure: false })
)(Group)

exports.displayName = 'EthanRadio'
exports.Group.displayName = 'EthanRadioGroup'

export default exports
