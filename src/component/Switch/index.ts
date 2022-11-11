import withControl from '../../hoc/withControl'
import Switch from './Switch'
import { SwitchProps } from './type'

const SwitchContainer = withControl(Switch) as React.ComponentClass<SwitchProps>

SwitchContainer.displayName = 'EthanSwitch'

export default SwitchContainer
