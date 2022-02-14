import React from 'react'
import { paginationClass } from '@/styles'
import Input from '../Input'
import { JumperProps } from './type'
import paginationContext from './context'

const inputStyle = { width: 60, display: 'inline-block' }

const Jumper: React.FC<JumperProps> = props => {
    const { total, pageSize, onChange, current, text, isSimple } = React.useContext(paginationContext)

    const [inputValue, updateInputValue] = React.useState(current)

    const { size } = props

    const max = Math.ceil(total / pageSize)

    React.useEffect(() => {
        updateInputValue(current)
    }, [current])

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            let newCurrent = parseInt(e.target.value, 10)

            // 无穷大
            if (!Number.isFinite(newCurrent)) return

            if (newCurrent < 1) newCurrent = 1

            if (newCurrent > max) newCurrent = max

            onChange(newCurrent)
        }
    }

    let txt: React.ReactNode[] = text.jumper ? text.jumper.split('{input}') : []

    if (isSimple) {
        const spanClass = paginationClass('simple-span')

        txt = [
            [],
            [
                <span key="separator" className={spanClass}>
                    /
                </span>,
                <span key="pageMax" className={spanClass}>
                    {max}
                </span>,
            ],
        ]
    }

    return (
        <div className={paginationClass('section')}>
            {txt[0]}

            <Input
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={updateInputValue}
                digits={0}
                type="number"
                style={inputStyle}
                size={size}
                className={paginationClass(isSimple && 'simple-input')}
                delay={400}
            />

            {txt[1]}
        </div>
    )
}

export default React.memo(Jumper)
