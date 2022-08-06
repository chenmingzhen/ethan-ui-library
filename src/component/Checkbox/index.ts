import { compose } from '@/utils/func'
import withListDatum from '@/utils/Datum/withListDatum'
import withControl from '../../hoc/withControl'
import Checkbox from './Checkbox'
import Group from './Group'
import { consumer } from './context'
import { CheckboxComponent } from './type'

const CheckboxContainer = compose(withControl, consumer)(Checkbox) as CheckboxComponent

CheckboxContainer.Group = compose(
    withControl,
    withListDatum({ bindProps: ['disabled', 'format', 'prediction'] })
)(Group)

CheckboxContainer.displayName = 'EthanCheckbox'

export default CheckboxContainer
