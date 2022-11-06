import React, { useState } from 'react'
import withControl from '@/hoc/withControl'
import { inputClass } from '@/styles'
import { compose } from '@/utils/func'
import inputBorder from '@/hoc/inputBorder'
import Input from './Input'
import { InputComponent, InputPasswordProps } from './type'
import { FontAwesome } from '../Icon'
import Button from '../Button/Button'
import Group from './Group'

const Password: React.FC<InputPasswordProps> = React.memo((props) => {
    const { value, onChange, style, className, ...others } = props

    const [visible, updateVisible] = useState(false)

    return (
        <Group style={style} className={className}>
            <Input
                {...others}
                type={visible ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                className={inputClass('password')}
            />
            <Button
                text
                onClick={() => {
                    updateVisible(!visible)
                }}
                className={inputClass('btn-suffix')}
            >
                <FontAwesome name={visible ? 'eye' : 'eye-slash'} />
            </Button>
        </Group>
    )
})

export default compose(withControl, inputBorder({ popover: true }))(Password) as InputComponent['Password']
