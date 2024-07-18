import React, { useMemo } from 'react'
import { paginationClass } from '@/styles'
import icons from '../icons'
import Item from './Item'
import Prev from './Prev'
import Next from './Next'
import paginationContext from './context'

/** 跳跃的间隙 */
const SPAN = 5

function computedPagination(total: number, pageSize: number, current: number) {
    if (total === 0) return { links: [], totalPage: 0 }

    const totalPage = Math.ceil(total / pageSize)

    const links = []

    let left = current - Math.floor(SPAN / 2)
    let right

    if (left < 3) left = 3
    right = left + SPAN

    if (right >= totalPage) {
        right = totalPage
        left = right - SPAN

        if (left <= 0) left = 1
    }

    if (left > 1) links.push(1)
    if (left === 3) links.push(2)
    if (left > 3) links.push('<<')

    for (let i = left; i < right; i++) {
        links.push(i)
    }

    if (right < totalPage) {
        links.push('>>')
    }

    links.push(totalPage)

    return { links, totalPage }
}

const Links: React.FC = () => {
    const { disabled, current, onChange, total, pageSize } = React.useContext(paginationContext)

    const { links, totalPage } = useMemo(() => computedPagination(total, pageSize, current), [current, total, pageSize])

    return (
        <div className={paginationClass('links', 'section')}>
            <Prev />

            {links.map((p) => {
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
                if (page > totalPage) page = totalPage

                return (
                    <Item
                        key={p}
                        page={page}
                        onClick={onChange}
                        disabled={disabled}
                        className={`no-border ${isPrev ? 'more-left' : 'more-right'}`}
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
