import { compose } from '@/utils/func'
import withControl from '@/hoc/withControl'
import inputBorder from '@/hoc/inputBorder'
import trim from '@/hoc/trim'
import withValidate from '@/hoc/withValidate'
import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'
import { InputComponent } from './type'

const InputContainer = (compose(
    withValidate,
    withControl,
    inputBorder({ popover: true }),
    trim
)(Input) as unknown) as InputComponent

InputContainer.Group = inputBorder({ tag: 'div', isGroup: true, from: 'input', popover: true })(Group)
InputContainer.Number = compose(withControl, inputBorder({ popover: true }))(Number)
InputContainer.Password = compose(withControl, inputBorder({ popover: true }))(Password)

InputContainer.displayName = 'EthanInput'
InputContainer.Group.displayName = 'EthanInputGroup'

export default InputContainer
