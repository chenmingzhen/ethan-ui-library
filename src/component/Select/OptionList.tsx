import useSetState from '@/hooks/useSetState'
import { selectClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import classnames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import { isEmptyStr } from '@/utils/is'
import { getLocale } from '@/locale'
import deepEql from 'deep-eql'
import LazyList, { LazyListState } from '../LazyList'
import AnimationList from '../List'
import Spin from '../Spin'
import { OptionListProps, SelectData } from './type'
import { transformSizeToPx } from './util'
import Option from './Option'

interface OptionListState {
    /* 目前选中的index */
    currentIndex: number
    /* 靠近的index */
    hoverIndex: number
    /* scroll的Top比例值 */
    scrollTopRatio: number
    /* Scroll的Top值 */
    lastScrollTop: number
    defaultIndex: number
}

export interface OptionListInstance {
    handleHover: (index: number, force?: boolean) => void
    hoverMove: (step: number) => void
    getHoverIndex: () => number
}

const OptionList: React.ForwardRefRenderFunction<OptionListInstance, OptionListProps> = function (props, ref) {
    const lazyListRef = useRef<LazyList>()
    const hoverMoveTimer = useRef<NodeJS.Timeout>()
    const scrollTimer = useRef<NodeJS.Timeout>()
    const {
        data,
        show,
        style,
        selectId,
        className,
        onTransitionEnd,
        control,
        onControlChange,
        loading,
        height,
        text,
        size,
        lineHeight,
        groupKey,
        onChange,
        filterText,
        onScrollRatioChange,
        disabled,
        customRender = {},
        getKey,
        getOptionContent,
        getCheckedStateByDataItem,
        selectedData,
        getDataItemValue,
    } = props
    const [state, setState] = useSetState<OptionListState>(() => {
        const defaultState = {
            currentIndex: 0,
            hoverIndex: undefined,
            scrollTopRatio: 0,
            lastScrollTop: 0,
            defaultIndex: 0,
        }

        if (!selectedData.length) return defaultState

        const index = data.findIndex((dataItem) =>
            deepEql(getDataItemValue(dataItem), getDataItemValue(selectedData[0]))
        )

        if (index === -1) return defaultState

        const defaultIndex = getRangeValue({ min: 0, max: data.length - 1, current: index })

        defaultState.defaultIndex = defaultIndex
        return defaultState
    })

    const handleHover = useRefMethod((index: number, force = false) => {
        /** 当鼠标在select的滚动容器内，键盘操作时，会触发Option的Hover，此时键盘的优先级更高 */
        if (control === 'keyboard' && !force) return

        if (state.hoverIndex !== index && !scrollTimer.current) {
            setState({ hoverIndex: index })
        }
    })

    const hoverMove = useRefMethod((step: number) => {
        if (hoverMoveTimer.current) {
            clearTimeout(hoverMoveTimer.current)

            hoverMoveTimer.current = null
        }

        hoverMoveTimer.current = setTimeout(() => {
            hoverMoveTimer.current = null
        }, 50)

        const max = data.length
        let { hoverIndex, currentIndex } = state
        const { lastScrollTop } = state
        /** 无hover 取当前的index */
        if (hoverIndex === undefined) hoverIndex = currentIndex
        else hoverIndex += step

        if (hoverIndex >= max) {
            hoverIndex = 0
        }

        const item = data[hoverIndex]

        /** 如果为Group的标题 则多加或减1 */
        if (item && item[groupKey]) {
            if (step > 0) hoverIndex += 1
            else hoverIndex -= 1
        }

        if (hoverIndex < 0) hoverIndex = max - 1

        const emptyHeight = hoverIndex * lineHeight

        if (emptyHeight < lastScrollTop) {
            /** 到达当前视图的顶部 */
            currentIndex = hoverIndex
        } else if (emptyHeight + lineHeight > lastScrollTop + height) {
            /** 到达当前视图的底部 */

            /** 如果可以整除，证明每个Item是与滚动容器贴合，加1，避免出现计算滚动值时缺少一个Item的高度 */
            const touchEdge = height % lineHeight === 0 ? 1 : 0

            currentIndex = hoverIndex - Math.floor(height / lineHeight) + touchEdge

            if (currentIndex < 0) currentIndex = 0
        } else if (hoverIndex === 0 && emptyHeight === 0) {
            /** 到达数据源的顶部 */
            currentIndex = 0
        }

        lazyListRef.current.scrollToView(currentIndex)
        setState({ hoverIndex })
    })

    const getHoverIndex = useRefMethod(() => state.hoverIndex)

    useImperativeHandle(ref, () => ({ getHoverIndex, hoverMove, handleHover }))

    const shouldLazyListRecomputed = useRefMethod((prevData: any[], nextData: any[]) => {
        /** 如果数据源的数据增加时，如果是输入框输入内容，则不需要重新计算位置,将hoverIndex置为0 */
        /** 数据源减少时，重置hoverIndex */

        if (nextData.length > prevData.length) {
            if (isEmptyStr(filterText)) return true

            setState({ hoverIndex: 0 })

            return false
        }

        if (nextData.length < prevData.length) {
            setState({ hoverIndex: 0 })

            return false
        }

        return true
    })

    const handleScrollStateChange = useRefMethod((lazyListState: LazyListState) => {
        const { scrollTopRatio, lastScrollTop } = lazyListState

        if (onScrollRatioChange) {
            onScrollRatioChange(scrollTopRatio, lastScrollTop)
        }

        setState(lazyListState)
    })

    function handleMouseMove() {
        if (control !== 'mouse' && !hoverMoveTimer.current) {
            onControlChange('mouse')
        }
    }

    function renderItem(dataItem: SelectData, i: number) {
        const { currentIndex, hoverIndex } = state

        return (
            <Option
                isActive={getCheckedStateByDataItem(dataItem)}
                disabled={disabled(dataItem)}
                isHover={hoverIndex === currentIndex + i}
                key={dataItem[groupKey] ? dataItem[groupKey] : getKey(dataItem, i)}
                index={currentIndex + i}
                data={dataItem}
                onClick={onChange}
                getOptionContent={getOptionContent}
                onHover={handleHover}
                groupKey={groupKey}
            />
        )
    }

    function renderList() {
        const spinSize = transformSizeToPx(size)

        if (loading)
            return (
                <span className={selectClass('option')}>
                    {typeof loading === 'boolean' ? <Spin size={spinSize} /> : loading}
                </span>
            )

        if (data.length === 0)
            return <span className={selectClass('option')}>{text?.noData || getLocale('noData')}</span>

        return (
            <LazyList
                height={height}
                defaultIndex={state.defaultIndex}
                ref={lazyListRef}
                data={data}
                renderItem={renderItem}
                lineHeight={lineHeight}
                shouldRecomputed={shouldLazyListRecomputed}
                onScrollStateChange={handleScrollStateChange}
            />
        )
    }

    const { header, footer } = customRender

    return (
        <AnimationList
            show={show}
            style={style}
            data-id={selectId}
            duration="fast"
            className={classnames(selectClass('options'), className)}
            animationTypes={['fade', 'scale-y']}
            onMouseMove={handleMouseMove}
            onTransitionEnd={onTransitionEnd}
        >
            {header ? <div className={selectClass('custom')}>{header}</div> : null}
            {renderList()}
            {footer ? <div className={selectClass('custom')}>{footer}</div> : null}
        </AnimationList>
    )
}

export default React.memo(React.forwardRef(OptionList))
