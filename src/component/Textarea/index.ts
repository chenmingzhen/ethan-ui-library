import { compose } from '@/utils/func'
import trim from '@/hoc/trim'
import inputBorder from '@/hoc/inputBorder'
import React from 'react'
import inputable from '../Form/inputable'
import Textarea from './Textarea'
import { TextareaProps } from './type'

const TextareaComponent = compose(
    inputable,
    inputBorder({ tag: 'div', popover: true }),
    trim
)(Textarea) as React.MemoExoticComponent<React.FC<TextareaProps>>

TextareaComponent.displayName = 'EthanTextarea'

export default TextareaComponent
