import { compose } from '@/utils/func'
import inputAble from '@/component/Form/inputable'
import inputBorder from '@/hoc/inputBorder'
import trim from '@/hoc/trim'
import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'
import { InputComponent } from './type'

const InputContainer = (compose(inputAble, inputBorder({ popover: true }), trim)(Input) as unknown) as InputComponent

InputContainer.Group = inputBorder({ tag: 'div', isGroup: true, from: 'input', popover: true })(Group)
InputContainer.Number = compose(inputAble, inputBorder({ popover: true }))(Number)
InputContainer.Password = compose(inputAble, inputBorder({ popover: true }))(Password)

InputContainer.displayName = 'EthanInput'
InputContainer.Group.displayName = 'EthanInputGroup'

export default InputContainer
