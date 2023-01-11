import Radio from './Radio'
import Group from './Group'
import { RadioProps } from './type'

interface RadioComponent extends React.FunctionComponent<RadioProps> {
    Group: typeof Group
}

const RadioContainer = Radio as unknown as RadioComponent

RadioContainer.Group = Group

export default RadioContainer
