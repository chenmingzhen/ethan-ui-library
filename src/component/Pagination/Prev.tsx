import React from 'react'
import icons from '../icons'
import paginationContext from './context'
import Item from './Item'

const Prev: React.FC<{ isSimple?: boolean }> = ({ isSimple }) => {
    const { onChange, current, text, disabled } = React.useContext(paginationContext)

    const prev = current - 1

    const className = text.prev || isSimple ? 'no-border arrow' : 'arrow'

    return (
        <Item className={className} page={prev} disabled={disabled || prev < 1} onClick={onChange}>
            {text.prev || icons.AngleLeft}
        </Item>
    )
}

export default React.memo(Prev)
