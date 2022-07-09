import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import withControl from '../../hoc/withControl'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'
import { RadioComponent } from './type'

const RadioContainer = compose(withControl, consumer)(Radio) as RadioComponent

RadioContainer.Group = compose(
    withControl,
    Datum.Hoc({ limit: 1, bindProps: ['disabled', 'format', 'prediction'] })
)(Group)

RadioContainer.displayName = 'EthanRadio'

export default RadioContainer
