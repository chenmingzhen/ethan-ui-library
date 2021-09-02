import { swiperClass } from '@/styles'
import React from 'react'

interface SwiperDotsProps {
    realIndex: number

    items: React.ReactNode

    onDotsClick(index: number): void
}

const SwiperDots: React.FC<SwiperDotsProps> = ({ realIndex, items, onDotsClick }) => {
    function handleClick(index: number) {
        onDotsClick(index)
    }

    return (
        <ul className={swiperClass('dots')}>
            {React.Children.map(items, (child: React.ReactElement, i) => {
                return (
                    <li
                        key={child?.key || i}
                        className={swiperClass(realIndex === i && 'active')}
                        onClick={() => {
                            // 换算成虚拟index
                            handleClick(i + 1)
                        }}
                    />
                )
            })}
        </ul>
    )
}

export default React.memo(SwiperDots)
