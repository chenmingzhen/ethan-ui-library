import { compose } from '@/utils/func'
import inputable from '../Form/inputable'
import Switch from './Switch'
import { consumer } from '../Checkbox/context'

const SwitchContainer = compose(inputable, consumer)(Switch)

SwitchContainer.displayName = 'EthanSwitch'
SwitchContainer.Switch = Switch

export default SwitchContainer
