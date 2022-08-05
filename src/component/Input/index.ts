import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'

const InputContainer = Input

InputContainer.Group = Group
InputContainer.Number = Number
InputContainer.Password = Password

InputContainer.displayName = 'EthanInput'
InputContainer.Number.displayName = 'EthanInputNumber'
InputContainer.Password.displayName = 'EthanInputPassword'
InputContainer.Group.displayName = 'EthanInputGroup'

export default InputContainer
