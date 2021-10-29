import React from 'react'

interface FixedLengthHandlerProps {
    length: number

    scrollLength: number

    children: (params: { barLength: number }) => React.ReactNode
}

const FixedLengthHandler: React.FC<FixedLengthHandlerProps> = props => {
    const { length, scrollLength, children } = props

    const barLength = Math.max(20, (length / scrollLength) * length)

    return <>{children({ barLength })}</>
}

export default React.memo(FixedLengthHandler)
