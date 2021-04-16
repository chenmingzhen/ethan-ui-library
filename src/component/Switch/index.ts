import { compose } from '@/utils/func'
import inputable from '../Form/inputable'
import Switch from './Switch'
import { consumer } from '../Checkbox/context'

const exports = compose(inputable, consumer)(Switch)

exports.displayName = 'EthanSwitch'
exports.Switch = Switch

export default exports
