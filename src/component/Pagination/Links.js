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

    let right
    // 页码左部分
    let left = current - Math.floor(span / 2)
    if (left < 3) {
      left = 3
    }
    // 页码右部分
    right = left + span

    if (right + 1 >= tMax) {
      right = tMax - 1
      left = right - span
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    if (left > 1) {
      tLinks.push(1)
    }
    if (left === 3) {
      tLinks.push(2)
    } else if (left > 3) {
      tLinks.push('<<')
    }

    for (let i = left; i < right + 1; i++) {
      tLinks.push(i)
    }

    if (right === tMax - 2) {
      tLinks.push(tMax - 1)
    } else if (right < tMax - 1) {
      tLinks.push('>>')
    }

    if (right < tMax) {
      tLinks.push(tMax)
    }

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
