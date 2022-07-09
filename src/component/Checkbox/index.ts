import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import withControl from '../../hoc/withControl'
import Checkbox from './Checkbox'
import Group from './Group'
import { consumer } from './context'
import { CheckboxComponent } from './type'

const CheckboxContainer = compose(withControl, consumer)(Checkbox) as CheckboxComponent

CheckboxContainer.Group = compose(withControl, Datum.Hoc({ bindProps: ['disabled', 'format', 'prediction'] }))(Group)

CheckboxContainer.displayName = 'EthanCheckbox'

export default CheckboxContainer
