import React from 'react'
import Input from './Input'
import { InputPasswordProps } from './type'

const Password: React.FC<InputPasswordProps> = props => {
    const { point, value, onChange, ...others } = props

    function handleChange(val: string) {
        const newValue = []

        val.split('').forEach((v, i) => {
            newValue.push(v === point ? value[i] : v)
        })

        onChange(newValue.join(''))
    }

    const hiddenValue = Array.from({ length: value.length }, () => point).join('')

    return <Input {...others} type="text" value={hiddenValue} onChange={handleChange} />
}

export default React.memo(Password)

Password.defaultProps = {
    value: '',
    point: '•',
}
