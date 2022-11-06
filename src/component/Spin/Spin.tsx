import React, { memo } from 'react'
import classnames from 'classnames'
import { range } from '@/utils/numbers'
import { SpinProps } from '.'

interface ISpinProps extends SpinProps {
    className?: string

    count?: number

    margin?: number | string

    render?(spinClass, i: number, props: ISpinProps): React.ReactNode

    size?: number | string

    spinClass?(...rest): string

    style?: React.CSSProperties
}

const Spin: React.FC<ISpinProps> = (props) => {
    const { size, margin, spinClass, count = 0, render } = props

    const className = classnames(spinClass('_'), props.className)
    const style = Object.assign(
        {
            width: size,
            height: size,
            margin,
        },
        props.style
    )

    if (count < 1) {
        return <div style={style} className={className} />
    }

    return (
        <div style={style} className={className}>
            {range(count + 1, 1).map((i) => render(spinClass, i, props))}
        </div>
    )
}

export default memo(Spin)
