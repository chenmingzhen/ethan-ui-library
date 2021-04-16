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
const exports = compose(inputAble, inputBorder({}), delay(400), trim, coin('input'))(Input)
exports.Group = inputBorder({ tag: 'div', isGroup: true, from: 'input' })(Group)
exports.Number = compose(inputAble, inputBorder({}), coin())(Number)
exports.Password = compose(inputAble, inputBorder({}))(Password)

exports.displayName = 'EthanInput'
exports.Group.displayName = 'EthanInputGroup'

export default exports
