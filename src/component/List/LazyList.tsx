// @ts-nocheck 
import React, { useState, useRef, useCallback, memo, useMemo } from 'react'
import PropType from 'prop-types'
import { usePrevious, useUpdateEffect } from 'ethan-use-hooks'
import { setTranslate } from '@/utils/dom/translate'
import Scroll from '../Scroll'

// 懒加载原理，通过滚动的高度，以及props的itemsInView，itemsInView,data来计算当前的currentIndex，在而加上itemsInView 渲染数据
const LazyList = props => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // 滚动比例系数
  const [scrollTop, setScrollTop] = useState(0)
  const { scrollHeight, height, lineHeight, data, itemsInView, renderItem } = props
  const optionInner = useRef()
  const lastScrollTop = useRef(0)
  const prevProps = usePrevious(props)

  // ------------------------------------lifecycle---------------------------
  useUpdateEffect(() => {
    if (!props.stay && prevProps.data.length !== props.data.length) {
      setCurrentIndex(0)
      setScrollTop(0)
    }
  }, [props.stay, props.data])

  // ------------------------------------method and computed------------------
  const scroll = useMemo(() => {
    if (height < scrollHeight) {
      return 'y'
    }
    return ''
  }, [height, scrollHeight])

  // 懒加载原理
  const items = useMemo(() => data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => renderItem(d, i)), [
    data,
    currentIndex,
    itemsInView,
    renderItem,
  ])

  const handleScroll = useCallback(
    (x, y, max, bar, v, h, pixelX, pixelY) => {
      if (!optionInner.current) return

      const fullHeight = itemsInView * lineHeight
      const contentHeight = scrollHeight - h
      // 容器的高度大于内容高度 不需要设置滚动
      let newScrollTop = h > fullHeight ? 0 : y

      // 设置滚动
      // TODO 参考Select中的OptionList 去掉marginTop的引用
      optionInner.current.style.marginTop = `${scrollTop * h}px`

      // 以向下方向为例
      // marginTop 负责将容器往下顶
      // transform负责将内容上移
      if (pixelY === undefined || pixelY === 0) {
        // 点击条造成滚动
        lastScrollTop.current = scrollTop * contentHeight
      } else {
        // 鼠标滚轮滚动
        lastScrollTop.current += pixelY
        if (lastScrollTop.current < 0) lastScrollTop.current = 0

        // scroll over bottom
        if (lastScrollTop.current > contentHeight) lastScrollTop.current = contentHeight
        newScrollTop = lastScrollTop.current / contentHeight
        optionInner.current.style.marginTop = `${scrollTop * h}px`
      }

      let index = Math.floor(lastScrollTop.current / lineHeight) - 1
      if (data.length - itemsInView < index) index = data.length - itemsInView
      if (index < 0) index = 0

      setTranslate(optionInner.current, '0px', `-${lastScrollTop.current + scrollTop * h}px`)

      setScrollTop(newScrollTop)
      setCurrentIndex(index)
    },
    [optionInner.current, lastScrollTop.current, data, itemsInView, lineHeight, scrollHeight, scrollTop]
  )
  // ------------------------------------render------------------------------
  return (
    <Scroll
      stable
      scroll={scroll}
      style={{ height: scroll ? height : undefined }}
      onScroll={handleScroll}
      scrollHeight={scrollHeight}
      scrollTop={scrollTop}
    >
      <div
        ref={el => {
          optionInner.current = el
        }}
      >
        <div style={{ height: currentIndex * lineHeight }} />
        {items}
      </div>
    </Scroll>
  )
}

LazyList.defaultProps = {
  itemsInView: 10,
  lineHeight: 32,
  data: [],
}

LazyList.propTypes = {
  scrollHeight: PropType.number.isRequired,
  data: PropType.array,
  itemsInView: PropType.number,
  lineHeight: PropType.number,
  height: PropType.number.isRequired,
  renderItem: PropType.func.isRequired,
  stay: PropType.bool,
}

export default memo(LazyList)
