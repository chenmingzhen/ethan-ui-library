import React from 'react'
import { setTranslate } from '@/utils/dom/translate'
import { Component } from '@/utils/component'
import { getRangeValue } from '@/utils/numbers'
import { isZero } from '@/utils/is'
import Scroll from '../Scroll'

interface LazyListProps<T extends any = any> {
    scrollHeight: number
    data?: T[]
    itemsInView: number
    lineHeight: number
    height: number
    renderItem: (data, index: number) => React.ReactNode
    onScrollRatioChange?: (ratio: number, lastScrollTop: number) => void
    /** 当数据源的长度发生变化且数据源长度大于1时，传入判断函数是否允许重新计算对应的滚动值 */
    shouldRecomputed?: (prevData: T[], nextData: T[]) => boolean
    /* 如果受控处理，下面的Props必须传 */
    control?: boolean
    onStateChange?(params: Partial<LazyListState>): void
    currentIndex?: number
    scrollTopRatio?: number
    lastScrollTop?: number
}

export interface LazyListState {
    currentIndex: number
    scrollTopRatio: number
    lastScrollTop: number
}

interface ComputedScrollParams {
    dataLength: number
    lineHeight: number
    height: number
    currentIndex: number
}

/** 存在滚动的情况下，计算滚动的比例值和滚动值 */
export function computeScroll(params: ComputedScrollParams) {
    const { dataLength, lineHeight, height, currentIndex } = params

    const lastScrollTop = currentIndex * lineHeight

    const contentHeight = dataLength * lineHeight - height

    const scrollTopRatio = lastScrollTop / contentHeight

    return { lastScrollTop, scrollTopRatio }
}

/** 不能使用PureComponent，因为Item的部分状态是在上层中使用的，例如Select OptionList Option的hoverIndex prop， */
export default class LazyList<T extends any = any> extends Component<LazyListProps<T>, LazyListState> {
    static defaultProps = {
        itemsInView: 10,
        lineHeight: 32,
        data: [],
        shouldRecomputed: () => true,
    }

    static getDerivedStateFromProps(nextProps: LazyListProps, nextState: LazyListState): LazyListState {
        if (nextProps.control) {
            return {
                currentIndex: nextProps.currentIndex,
                scrollTopRatio: nextProps.scrollTopRatio,
                lastScrollTop: nextProps.lastScrollTop,
            }
        }

        return {
            currentIndex: nextState.currentIndex,
            scrollTopRatio: nextState.scrollTopRatio,
            lastScrollTop: nextState.lastScrollTop,
        }
    }

    private get scroll(): 'y' | undefined {
        const { height, scrollHeight } = this.props

        if (height < scrollHeight) {
            return 'y'
        }

        return undefined
    }

    private optionInner: HTMLDivElement

    constructor(props: LazyListProps) {
        super(props)

        this.state = {
            currentIndex: props.currentIndex || 0,
            scrollTopRatio: props.scrollTopRatio || 0,
            lastScrollTop: props.lastScrollTop || 0,
        }
    }

    componentDidMount() {
        setTranslate(this.optionInner, '0rem', `-${this.state.lastScrollTop}px`)
    }

    componentDidUpdate(prevProps: Readonly<LazyListProps>, prevState: Readonly<LazyListState>): void {
        if (this.props.data !== prevProps.data && this.props.data.length !== prevProps.data.length) {
            /** 重新计算位置 */
            if (!isZero(this.props.data.length) && this.props.shouldRecomputed(prevProps.data, this.props.data)) {
                if (this.props.lineHeight * this.props.data.length < this.props.height) return
                console.log(111)
                const prevContentHeight = prevProps.data.length * prevProps.lineHeight - prevProps.height

                const prevScrollTopRatio = prevState.scrollTopRatio

                const nextContentHeight = this.props.data.length * this.props.lineHeight - this.props.height

                const nextScrollTopRatio = getRangeValue({
                    current: prevScrollTopRatio * (prevContentHeight / nextContentHeight),
                })

                const lastScrollTop = nextContentHeight * nextScrollTopRatio

                this.dispatchState({ scrollTopRatio: nextScrollTopRatio, lastScrollTop })
            } else {
                this.dispatchState({ currentIndex: 0, scrollTopRatio: 0, lastScrollTop: 0 })
            }
        }

        if (prevState.lastScrollTop !== this.state.lastScrollTop && this.optionInner) {
            setTranslate(this.optionInner, '0rem', `-${this.state.lastScrollTop}px`)
        }

        if (
            this.props.onScrollRatioChange &&
            prevState.scrollTopRatio !== this.state.scrollTopRatio &&
            !isZero(this.props.data.length)
        ) {
            this.props.onScrollRatioChange(this.state.scrollTopRatio, this.state.lastScrollTop)
        }
    }

    private dispatchState = (state: Partial<LazyListState>) => {
        if (this.props.control && this.props.onStateChange) {
            this.props.onStateChange(state)
        } else {
            this.setState(state as LazyListState)
        }
    }

    private bindOptionInner = (el: HTMLDivElement) => {
        this.optionInner = el
    }

    scrollToView = (scrollIndex: number) => {
        if ((scrollIndex + 1) * this.props.lineHeight <= this.props.height) return

        const { lastScrollTop, scrollTopRatio } = computeScroll({
            currentIndex: scrollIndex,
            dataLength: this.props.data.length,
            lineHeight: this.props.lineHeight,
            height: this.props.height,
        })

        this.dispatchState({ lastScrollTop, scrollTopRatio, currentIndex: scrollIndex })
    }

    private handleScroll = (_, y, __, ___, ____, scrollContainerHeight, _____, pixelY) => {
        if (!this.optionInner) return

        const { itemsInView, lineHeight, data } = this.props

        const fullHeight = itemsInView * lineHeight

        const contentHeight = data.length * lineHeight - scrollContainerHeight

        let scrollTopRatio = scrollContainerHeight > fullHeight ? 0 : y

        let { lastScrollTop } = this.state

        if (!pixelY) {
            /** 拖动bar */
            lastScrollTop = scrollTopRatio * contentHeight
        } else {
            /** wheel滚动 */
            lastScrollTop += pixelY

            if (lastScrollTop < 0) lastScrollTop = 0

            /** 滚动到底部 */
            if (lastScrollTop > contentHeight) lastScrollTop = contentHeight

            scrollTopRatio = lastScrollTop / contentHeight
        }

        let currentIndex = Math.floor(lastScrollTop / lineHeight) - 1

        if (data.length - itemsInView < currentIndex) currentIndex = data.length - itemsInView

        if (currentIndex < 0) currentIndex = 0

        this.dispatchState({ scrollTopRatio, currentIndex, lastScrollTop })
    }

    render() {
        const { height, scrollHeight, lineHeight, data, itemsInView, renderItem } = this.props

        const { scrollTopRatio, currentIndex } = this.state

        return (
            <Scroll
                scroll={this.scroll}
                style={{ height: this.scroll ? height : undefined }}
                onScroll={this.handleScroll}
                scrollHeight={scrollHeight}
                scrollTop={scrollTopRatio}
            >
                <div ref={this.bindOptionInner}>
                    <div style={{ height: currentIndex * lineHeight }} />
                    {data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => renderItem(d, i))}
                </div>
            </Scroll>
        )
    }
}
