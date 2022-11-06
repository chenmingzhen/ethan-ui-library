import React from 'react'
import Line from './Line'
import Circle from './Circle'
import { ProgressProps } from './type'

const Progress: React.FC<ProgressProps> = (props) => {
    switch (props.shape) {
        case 'circle':
            return <Circle {...props} />
        default:
            return <Line {...props} />
    }
}

Progress.defaultProps = {
    shape: 'line',
}

Progress.displayName = 'EthanProgress'

export default React.memo(Progress)
