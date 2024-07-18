import React, { useCallback } from 'react'
import { paginationClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import Input from '../Input'
import { JumperProps } from './type'
import paginationContext from './context'

const Jumper: React.FC<JumperProps> = (props) => {
    const { total, pageSize, onChange, current, text } = React.useContext(paginationContext)

    const [inputValue, updateInputValue] = React.useState(current)

    const { size, isSimple } = props

    const max = Math.ceil(total / pageSize)

    React.useEffect(() => {
        updateInputValue(current)
    }, [current])

    const handleKeyDown = useRefMethod((e) => {
        if (e.keyCode === 13) {
            let newCurrent = parseInt(e.target.value, 10)

            // 无穷大
            if (!Number.isFinite(newCurrent)) return

            if (newCurrent < 1) newCurrent = 1

            if (newCurrent > max) newCurrent = max

            if (newCurrent === current) {
                /** 当输入一个溢出max的值时，需要将Input的值设为max */
                updateInputValue(newCurrent)
            }

            onChange(newCurrent)
        }
    })

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

    const handleInputChange = useCallback((val: string) => {
        updateInputValue(Number(val))
    }, [])

    return (
        <div className={paginationClass('section')}>
            {txt[0]}

            <Input
                digits={0}
                size={size}
                type="number"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                style={{ width: 60, display: 'inline-block' }}
                className={paginationClass(isSimple && 'simple-input')}
            />

            {txt[1]}
        </div>
    )
}

export default React.memo(Jumper)
