// @ts-nocheck 
import { compose } from '@/utils/func'
import Datum from '@/utils/Datum'
import inputable from '../Form/inputable'
import { consumer } from '../Checkbox/context'
import Group from './Group'
import Radio from './Radio'

// 接受Group中 无data 用户自定义渲染的情况 提供的context这里使用
const RadioContainer = consumer(Radio)

RadioContainer.Group = compose(
  inputable,
  Datum.hoc({ limit: 1, bindProps: ['disabled', 'format', 'prediction'], pure: false })
)(Group)

RadioContainer.displayName = 'EthanRadio'
RadioContainer.Group.displayName = 'EthanRadioGroup'

export default RadioContainer
