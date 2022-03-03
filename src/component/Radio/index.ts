import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputable from '../Form/inputable'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'
import { RadioComponent } from './type'

const RadioContainer = compose(inputable, consumer)(Radio) as RadioComponent

RadioContainer.Group = compose(
    inputable,
    Datum.Hoc({ limit: 1, bindProps: ['disabled', 'format', 'prediction'] })
)(Group)

RadioContainer.displayName = 'EthanRadio'

export default RadioContainer
