// @ts-nocheck
import { compose } from '@/utils/func'
import withControl from '../../hoc/withControl'
import Switch from './Switch'
import { consumer } from '../Checkbox/context'

const SwitchContainer = compose(withControl, consumer)(Switch)

SwitchContainer.displayName = 'EthanSwitch'
SwitchContainer.Switch = Switch

export default SwitchContainer
