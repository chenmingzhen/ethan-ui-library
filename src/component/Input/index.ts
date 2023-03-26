import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'
import { InputGroupProps, InputNumberProps, InputPasswordProps, InputProps } from './type'

interface InputComponent extends React.FunctionComponent<InputProps> {
    Number: React.FunctionComponent<InputNumberProps>
    Password: React.FunctionComponent<InputPasswordProps>
    Group: React.FunctionComponent<InputGroupProps>
}

const InputContainer = Input as unknown as InputComponent

InputContainer.Group = Group
InputContainer.Number = Number
InputContainer.Password = Password

InputContainer.displayName = 'EthanInput'
InputContainer.Number.displayName = 'EthanInputNumber'
InputContainer.Password.displayName = 'EthanInputPassword'
InputContainer.Group.displayName = 'EthanInputGroup'

export default InputContainer
