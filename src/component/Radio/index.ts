import { compose } from '@/utils/func'
import withListDatum from '@/utils/Datum/withListDatum'
import withControl from '../../hoc/withControl'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'
import { RadioComponent } from './type'

const RadioContainer = compose(withControl, consumer)(Radio) as RadioComponent

RadioContainer.Group = compose(
    withControl,
    withListDatum({ limit: 1, bindProps: ['disabled', 'format', 'prediction'] })
)(Group)

RadioContainer.displayName = 'EthanRadio'

export default RadioContainer
