import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { getLocale } from '@/locale'
import { getKey } from '@/utils/uid'
import { CHANGE_ACTION } from '@/utils/Datum/types'
import { isEmptyStr } from '@/utils/is'
import { getRangeValue } from '@/utils/numbers'
import { SelectListProps } from './type'
import Spin from '../Spin'
import Option from './Option'
import AnimationList from '../List'
import { transformSizeToPx } from './util'
import LazyList, { LazyListState } from '../List/LazyList'

interface OptionListState {
    /* 目前选中的index */
    currentIndex: number
    /* 靠近的index */
    hoverIndex: number
    /* scroll的Top比例值 */
    scrollTopRatio: number
    /* Scroll的Top值 */
    lastScrollTop: number
}

class OptionList extends PureComponent<SelectListProps, OptionListState> {
    optionInner: HTMLDivElement

    hoverMoveTimer: NodeJS.Timeout

    scrollTimer: NodeJS.Timeout

    lazyList: LazyList

    defaultIndex = 0

    getInitState = (): OptionListState => {
        const { datum, data } = this.props

        const defaultState = {
            currentIndex: 0,
            hoverIndex: 0,
            scrollTopRatio: 0,
            lastScrollTop: 0,
        }

        if (!datum.values.length) return defaultState

        const item = datum.getDataByValue(data, datum.values[0])

        if (!item) return defaultState

        const { index } = item

        const defaultIndex = getRangeValue({ min: 0, max: data.length - 1, current: index })

        defaultState.hoverIndex = defaultIndex

        this.defaultIndex = defaultIndex

        return defaultState
    }

    constructor(props: SelectListProps) {
        super(props)

        this.state = this.getInitState()

        props.bindOptionListFunc({
            handleHover: this.handleHover,
            hoverMove: this.hoverMove,
            getHoverIndex: () => this.state.hoverIndex,
        })
    }

    componentDidMount() {
        super.componentDidMount()

        this.props.datum.subscribe(CHANGE_ACTION, this.forceUpdate)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.datum.subscribe(CHANGE_ACTION, this.forceUpdate)
    }

    bindLazyList = (instance: LazyList) => {
        this.lazyList = instance
    }

    startHoverMoveTimer = () => {
        if (this.hoverMoveTimer) {
            clearTimeout(this.hoverMoveTimer)

            this.hoverMoveTimer = null
        }

        this.hoverMoveTimer = setTimeout(() => {
            this.hoverMoveTimer = null
        }, 50)
    }

    startScrollTimer = () => {
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer)

            this.scrollTimer = null
        }

        this.scrollTimer = setTimeout(() => {
            this.scrollTimer = null
        }, 10)
    }

    handleHover = (index: number, force = false) => {
        const { control } = this.props

        /** 当鼠标在select的滚动容器内，键盘操作时，会触发Option的Hover，此时键盘的优先级更高 */
        if (control === 'keyboard' && !force) return

        if (this.state.hoverIndex !== index && !this.scrollTimer) {
            this.setState({ hoverIndex: index })
        }
    }

    handleMouseMove = () => {
        if (this.props.control !== 'mouse' && !this.hoverMoveTimer) {
            this.props.onControlChange('mouse')
        }
    }

    /** 上下键移动 */
    /** 不同于handleScroll 因为handleScroll是必然滚动的，此处不一定滚动，所以滚动高度逻辑 以及ScrollTop逻辑发生改变 */
    hoverMove = (step: number) => {
        this.startHoverMoveTimer()

        const max = this.props.data.length

        const { lineHeight, height, groupKey } = this.props

        let { hoverIndex, currentIndex } = this.state

        const { lastScrollTop } = this.state

        /** 无hover 取当前的index */
        if (hoverIndex === undefined) hoverIndex = currentIndex
        else hoverIndex += step

        if (hoverIndex >= max) {
            hoverIndex = 0
        }

        const data = this.props.data[hoverIndex]

        /** 如果为Group的标题 则多加或减1 */
        if (data && data[groupKey]) {
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

        this.lazyList.scrollToView(currentIndex)

        this.setState({ hoverIndex })
    }

    handleScrollStateChange = (state: LazyListState) => {
        const { onScrollRatioChange } = this.props

        const { scrollTopRatio, lastScrollTop } = state

        if (onScrollRatioChange) {
            onScrollRatioChange(scrollTopRatio, lastScrollTop)
        }

        this.setState(state)
    }

    bindOptionInner = el => {
        this.optionInner = el
    }

    shouldRecomputed = (prevData: any[], nextData: any[]) => {
        /** 如果数据源的数据增加时，如果是输入框输入内容，则不需要重新计算位置,将hoverIndex置为0 */
        /** 数据源减少时，重置hoverIndex */
        if (nextData.length > prevData.length) {
            if (isEmptyStr(this.props.filterText)) return true

            this.setState({ hoverIndex: 0 })

            return false
        }

        if (nextData.length < prevData.length) {
            this.setState({ hoverIndex: 0 })

            return false
        }

        return true
    }

    renderItem = (d, i: number) => {
        const { currentIndex, hoverIndex } = this.state

        const { datum, groupKey, keygen, onChange, renderItem } = this.props

        return (
            <Option
                isActive={datum.check(d)}
                disabled={datum.disabled(d)}
                isHover={hoverIndex === currentIndex + i}
                key={d[groupKey] ? `__${d[groupKey]}__` : getKey(d, keygen, i)}
                index={currentIndex + i}
                data={d}
                onClick={onChange}
                renderItem={renderItem}
                onHover={this.handleHover}
                groupKey={groupKey}
            />
        )
    }

    renderList = () => {
        const { loading, data, height, text, size } = this.props

        const spinSize = transformSizeToPx(size)

        if (loading && !data.length)
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
                defaultIndex={this.defaultIndex}
                ref={this.bindLazyList}
                data={this.props.data}
                renderItem={this.renderItem}
                lineHeight={this.props.lineHeight}
                shouldRecomputed={this.shouldRecomputed}
                onScrollStateChange={this.handleScrollStateChange}
            />
        )
    }

    render() {
        const { focus, style, selectId, className, onTransitionEnd, customRender = {} } = this.props

        const { header, footer } = customRender

        return (
            <AnimationList
                lazyDom
                show={focus}
                style={style}
                data-id={selectId}
                duration="fast"
                className={classnames(selectClass('options'), className)}
                animationTypes={['fade', 'scale-y']}
                onMouseMove={this.handleMouseMove}
                onTransitionEnd={onTransitionEnd}
            >
                {header ? <div className={selectClass('custom')}>{header}</div> : null}
                {this.renderList()}
                {footer ? <div className={selectClass('custom')}>{footer}</div> : null}
            </AnimationList>
        )
    }
}

export default OptionList
