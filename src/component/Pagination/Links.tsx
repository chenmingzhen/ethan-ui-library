// @ts-nocheck 
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { paginationClass } from '@/styles'
import icons from '../icons'
import Item from './Item'
import Prev from './Prev'
import Next from './Next'

// 页码
const Links = props => {
  const { current, onChange, span, disabled, total, pageSize } = props

  const { links, max } = useMemo(() => {
    if (total === 0) return { links: [], max: 0 }
    const tMax = Math.ceil(total / pageSize)
    const tLinks = []

    // 一行除去左右指示 包含<< >> 一共九个links
    // 左边存在<<的情况 (包含<<指示)最多2个值 所以left最大为3 最小为1

    // 计算阶段
    let left = current - Math.floor(span / 2)

    let right

    if (left < 3) left = 3

    right = left + span

    if (right >= tMax) {
      right = tMax
      left = right - span

      if (left <= 0) left = 1
    }

    // push 阶段
    if (left > 1) tLinks.push(1)

    if (left === 3) tLinks.push(2)

    if (left > 3) tLinks.push('<<')

    for (let i = left; i < right; i++) {
      tLinks.push(i)
    }

    if (right < tMax) {
      tLinks.push('>>')
    }

    tLinks.push(tMax)

    return { links: tLinks, max: tMax }
  }, [current, total, pageSize, span])

  return (
    <div className={paginationClass('links', 'section')}>
      <Prev {...props} />
      {links.map(p => {
        if (typeof p === 'number') {
          return (
            <Item key={p} disabled={disabled} isCurrent={current === p} page={p} onClick={onChange}>
              {p}
            </Item>
          )
        }
        const isPrev = p === '<<'
        let page = isPrev ? current - span : current + span
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
      <Next {...props} />
    </div>
  )
}

Links.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Links.defaultProps = {
  span: 5,
  text: {},
}

export default memo(Links)
