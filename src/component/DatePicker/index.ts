// @ts-nocheck
import inputBorder from '@/hoc/inputBorder'
import { compose } from '@/utils/func'
import { datepickerClass } from '@/styles'
import withControl from '../../hoc/withControl'
import Container from './Container'
import value from './value'
import absolute from '../Table/context'

const getClassName = opt => datepickerClass('_', `${opt.range ? 'r' : 'c'}-${opt.type || 'date'}`)

const Datepicker = compose(
    withControl,
    inputBorder({ className: getClassName, innerWidth: true }),
    value,
    absolute
)(Container)

Datepicker.displayName = 'EthanDatepicker'

export default Datepicker
