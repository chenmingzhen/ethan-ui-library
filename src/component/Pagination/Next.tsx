import React, { useContext } from 'react'
import icons from '../icons'
import paginationContext from './context'
import Item from './Item'

const Next: React.FC = () => {
    const { onChange, current, text, total, pageSize, disabled, isSimple } = useContext(paginationContext)

    const max = Math.ceil(total / pageSize)

    const next = current + 1

    const className = text.next || isSimple ? 'no-border arrow' : 'arrow'

    return (
        <Item className={className} page={next} disabled={disabled || next > max} onClick={onChange}>
            {text.next || icons.AngleRight}
        </Item>
    )
}

export default React.memo(Next)
