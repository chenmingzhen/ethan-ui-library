import React, { useMemo } from 'react'
import { paginationClass } from '@/styles'
import icons from '../icons'
import Item from './Item'
import Prev from './Prev'
import Next from './Next'
import paginationContext from './context'

const SPAN = 5

const Links: React.FC = () => {
    const { disabled, current, onChange, total, pageSize } = React.useContext(paginationContext)

    const { links, max } = useMemo(() => {
        if (total === 0) return { links: [], max: 0 }

        const computedMax = Math.ceil(total / pageSize)

        const computedLinks = []

        // 一行除去左右指示 包含<< >> 一共九个links
        // 左边存在<<的情况 (包含<<指示)最多2个值 所以left最大为3 最小为1

        // 计算阶段
        let left = current - Math.floor(SPAN / 2)

        let right

        if (left < 3) left = 3

        right = left + SPAN

        if (right >= computedMax) {
            right = computedMax

            left = right - SPAN

            if (left <= 0) left = 1
        }

        // push 阶段
        if (left > 1) computedLinks.push(1)

        if (left === 3) computedLinks.push(2)

        if (left > 3) computedLinks.push('<<')

        for (let i = left; i < right; i++) {
            computedLinks.push(i)
        }

        if (right < computedMax) {
            computedLinks.push('>>')
        }

        computedLinks.push(computedMax)

        return { links: computedLinks, max: computedMax }
    }, [current, total, pageSize])

    return (
        <div className={paginationClass('links', 'section')}>
            <Prev />

            {links.map(p => {
                if (typeof p === 'number') {
                    return (
                        <Item key={p} disabled={disabled} isCurrent={current === p} page={p} onClick={onChange}>
                            {p}
                        </Item>
                    )
                }

                const isPrev = p === '<<'

                let page = isPrev ? current - SPAN : current + SPAN

                if (page < 1) page = 1

                if (page > max) page = max

                return (
                    <Item
                        key={p}
                        disabled={disabled}
                        page={page}
                        className={`no-border ${isPrev ? 'more-left' : 'more-right'}`}
                        onClick={onChange}
                    >
                        {isPrev ? icons.AngleDoubleLeft : icons.AngleDoubleRight}
                    </Item>
                )
            })}

            <Next />
        </div>
    )
}

export default React.memo(Links)
