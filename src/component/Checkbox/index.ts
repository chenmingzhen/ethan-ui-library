import Checkbox from './Checkbox'
import Group from './Group'
import { CheckboxProps } from './type'

interface CheckboxComponent extends React.FunctionComponent<CheckboxProps> {
    Group: typeof Group
}

const CheckboxContainer = Checkbox as unknown as CheckboxComponent

CheckboxContainer.Group = Group

export default CheckboxContainer
