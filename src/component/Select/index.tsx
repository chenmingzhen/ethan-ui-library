import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputBorder from '@/hoc/inputBorder'
import { selectClass } from '@/styles'
import inputable from '../Form/inputable'
import Select from './Select'
import group from './group'
import FilterHoc from './Hoc/FilterHoc'

const SelectContainer = compose(
    inputable,
    inputBorder({ className: selectClass('_'), tag: 'div' }),
    Datum.Hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator', 'multiple'] }),
    FilterHoc,
    group
)(Select)

SelectContainer.displayName = 'EthanSelect'

export default SelectContainer
