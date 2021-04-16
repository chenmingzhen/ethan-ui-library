import { compose } from '@/utils/func'
import delay from '@/hoc/delay'
import trim from '@/hoc/trim'
import inputBorder from '@/hoc/inputBorder'
import inputable from '../Form/inputable'
import Component from './Textarea'

const input = compose(inputable, inputBorder({}), delay(400), trim)

const Textarea = input(Component)

Textarea.displayName = 'EthanTextarea'

export default Textarea
