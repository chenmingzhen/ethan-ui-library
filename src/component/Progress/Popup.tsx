import { progressClass } from '@/styles'
import React, { ReactNode } from 'react'

interface PopupProps {
    children: ReactNode

    value: number
}

const Popup: React.FC<PopupProps> = ({ children, value }) => {
    return (
        <div className={progressClass('popup')} style={{ left: `${value}%`, transform: 'translateX(-50%)' }}>
            <span className={progressClass('value')}>{children}</span>
            <span className={progressClass('arrow')} />
        </div>
    )
}

export default React.memo(Popup)
