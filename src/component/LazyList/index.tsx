import React from 'react'
import { PureComponent } from '@/utils/component'
import { getRangeValue } from '@/utils/numbers'
import { isZero } from '@/utils/is'
import { computeScroll, getVirtualScrollCurrentIndex } from '@/utils/virtual-scroll'
import Scroll from '../Scroll'
import { ScrollChangeEvent } from '../Scroll/type'

interface LazyListProps<T = any> {
    data: T[]
    lineHeight: number
    height: number
    renderItem: (data: T, index: number) => React.ReactNode
    /** 当数据源的长度发生变化且数据源长度大于1时，传入判断函数是否允许重新计算对应的滚动值 */
    shouldRecomputed?: (prevData: T[], nextData: T[]) => boolean
    /** 数据源起始的Index,默认hover的位置，视图会滚动到此处 */
    defaultIndex?: number
    onScrollStateChange?(params: LazyListState): void
}

export interface LazyListState {
    currentIndex: number
    scrollTopRatio: number
    scrollTop: number
}

/** 预留前后两个位置的偏差值 */
const LAZY_LIST_DATA_OFFSET = 2

export default class LazyList<T = any> extends PureComponent<LazyListProps<T>, LazyListState> {
    static defaultProps = {
        data: [],
        shouldRecomputed: () => true,
        defaultIndex: 0,
    }

    private get scrollHeight() {
        const { data, lineHeight } = this.props

        return data.length * lineHeight
    }

    private get scroll(): 'y' | undefined {
        const { height } = this.props

        if (height < this.scrollHeight) {
            return 'y'
        }

        return undefined
    }

    private get itemsInView() {
        const { height, lineHeight } = this.props

        return Math.ceil(height / lineHeight)
    }

    getInitState = (): LazyListState => {
        const { defaultIndex, lineHeight, height, data } = this.props

        /** 默认值小于容器高度，不计算 */
        if ((defaultIndex + 1) * lineHeight <= height) {
            return { currentIndex: 0, scrollTopRatio: 0, scrollTop: 0 }
        }

        const currentIndex = getVirtualScrollCurrentIndex({
            height,
            lineHeight,
            scrollIndex: defaultIndex,
            dataLength: data.length,
        })

        const { scrollTopRatio, scrollTop } = computeScroll({
            dataLength: this.props.data.length,
            lineHeight,
            height,
            currentIndex,
        })

        return {
            currentIndex,
            scrollTopRatio,
            scrollTop,
        }
    }

    constructor(props: LazyListProps) {
        super(props)

        this.state = this.getInitState()
    }

    componentDidMount() {
        const { onScrollStateChange } = this.props

        if (onScrollStateChange) {
            onScrollStateChange(this.state)
        }
    }

    componentDidUpdate(prevProps: Readonly<LazyListProps>, prevState: Readonly<LazyListState>): void {
        if (this.props.data !== prevProps.data && this.props.data.length !== prevProps.data.length) {
            /** 重新计算位置 */
            if (
                !isZero(this.props.data.length) &&
                this.scroll &&
                this.props.shouldRecomputed(prevProps.data, this.props.data)
            ) {
                const prevContentHeight = prevProps.data.length * prevProps.lineHeight - prevProps.height

                const prevScrollTopRatio = prevState.scrollTopRatio

                const nextContentHeight = this.props.data.length * this.props.lineHeight - this.props.height

                const nextScrollTopRatio = getRangeValue({
                    current: prevScrollTopRatio * (prevContentHeight / nextContentHeight),
                })

                const scrollTop = nextContentHeight * nextScrollTopRatio

                this.dispatchState({
                    scrollTopRatio: nextScrollTopRatio,
                    currentIndex: this.state.currentIndex,
                    scrollTop,
                })
            } else {
                this.dispatchState({ currentIndex: 0, scrollTopRatio: 0, scrollTop: 0 })
            }
        }
    }

    /** 暴露外部使用 */
    scrollToView = (scrollIndex: number) => {
        const { lineHeight, height, data } = this.props

        if (scrollIndex < 0 || scrollIndex >= data.length || !this.scroll || this.state.currentIndex === scrollIndex)
            return

        const currentIndex = getVirtualScrollCurrentIndex({ height, lineHeight, scrollIndex, dataLength: data.length })

        const { scrollTopRatio, scrollTop } = computeScroll({
            currentIndex,
            dataLength: data.length,
            lineHeight,
            height,
        })

        this.dispatchState({ scrollTopRatio, currentIndex, scrollTop })
    }

    private dispatchState = (state: LazyListState) => {
        this.setState(state)

        const { onScrollStateChange } = this.props

        if (onScrollStateChange) {
            onScrollStateChange(state)
        }
    }

    private handleScroll = (evt: ScrollChangeEvent) => {
        const { scrollTopRatio, scrollTop } = evt
        const { lineHeight, data } = this.props

        let currentIndex = Math.floor(scrollTop / lineHeight) - 1

        if (data.length - this.itemsInView < currentIndex) currentIndex = data.length - this.itemsInView

        if (currentIndex < 0) currentIndex = 0

        this.dispatchState({ scrollTopRatio, currentIndex, scrollTop })
    }

    render() {
        const { height, lineHeight, data, renderItem } = this.props

        const { scrollTopRatio, currentIndex } = this.state

        const sliceData = data.slice(currentIndex, currentIndex + this.itemsInView + LAZY_LIST_DATA_OFFSET)

        return (
            <Scroll
                scroll={this.scroll}
                onScroll={this.handleScroll}
                scrollTopRatio={scrollTopRatio}
                scrollHeight={this.scrollHeight}
                containerHeight={this.scroll ? height : undefined}
            >
                <div style={{ height: currentIndex * lineHeight }} />
                {sliceData.map((d, i) => renderItem(d, i))}
            </Scroll>
        )
    }
}
