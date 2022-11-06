import inputBorder from '@/hoc/inputBorder'
import { compose } from '@/utils/func'
import { datepickerClass } from '@/styles'
import withControl from '../../hoc/withControl'
import Container from './Container'
import withValue from './Hoc/withValue'

const getClassName = (opt) => datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker = compose(withControl, inputBorder({ className: getClassName }), withValue)(Container)

Datepicker.displayName = 'EthanDatepicker'

export default Datepicker
