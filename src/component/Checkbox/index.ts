import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import InputAble from '../Form/inputable'
import Checkbox from './Checkbox'
import Group from './Group'
import { consumer } from './context'
import { CheckboxComponent } from './type'

const CheckboxContainer = compose(InputAble, consumer)(Checkbox) as CheckboxComponent

CheckboxContainer.Group = compose(InputAble, Datum.Hoc({ bindProps: ['disabled', 'format', 'prediction'] }))(Group)

CheckboxContainer.displayName = 'EthanCheckbox'

export default CheckboxContainer
