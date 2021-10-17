// @ts-nocheck
import { compose } from '@/utils/func'
import inputAble from '@/component/Form/inputable'
import inputBorder from '@/hoc/inputBorder'
import delay from '@/hoc/delay'
import trim from '@/hoc/trim'
import coin from '@/hoc/coin'
import Input from './Input'
import Number from './Number'
import Group from './Group'
import Password from './Password'

// delay 是柯里化函数 传入第一个值对应defaultDelay
const InputContainer = compose(inputAble, inputBorder({ popover: true }), delay(400), trim, coin('input'))(Input)
InputContainer.Group = inputBorder({ tag: 'div', isGroup: true, from: 'input', popover: true })(Group)
InputContainer.Number = compose(inputAble, inputBorder({ popover: true }), coin())(Number)
InputContainer.Password = compose(inputAble, inputBorder({ popover: true }))(Password)

InputContainer.displayName = 'EthanInput'
InputContainer.Group.displayName = 'EthanInputGroup'

export default InputContainer
