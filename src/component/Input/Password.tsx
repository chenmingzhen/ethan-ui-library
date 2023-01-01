import React, { useState } from 'react'
import { inputClass } from '@/styles'
import Input from './Input'
import { InputPasswordProps } from './type'
import { FontAwesome } from '../Icon'

const Password: React.FC<InputPasswordProps> = React.memo((props) => {
    const { value, ...others } = props

    const [visible, updateVisible] = useState(false)

    return (
        <Input
            {...others}
            type={visible ? 'text' : 'password'}
            value={value}
            suffix={
                <FontAwesome
                    className={inputClass('password-suffix')}
                    name={visible ? 'eye' : 'eye-slash'}
                    onClick={() => {
                        updateVisible(!visible)
                    }}
                />
            }
        />
    )
})

export default Password
