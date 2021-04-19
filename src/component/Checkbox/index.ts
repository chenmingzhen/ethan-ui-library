import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputable from '../Form/inputable'
import Checkbox from './Checkbox'
import Group from './Group'
import { consumer } from './context'

const CheckboxContainer = compose(inputable, consumer)(Checkbox)
CheckboxContainer.Group = compose(
  inputable,
  Datum.hoc({ bindProps: ['disabled', 'format', 'prediction', 'separator'] })
)(Group)
CheckboxContainer.Checkbox = Checkbox

CheckboxContainer.displayName = 'EthanCheckbox'
CheckboxContainer.Group.displayName = 'EthanCheckboxGroup'

export default CheckboxContainer
