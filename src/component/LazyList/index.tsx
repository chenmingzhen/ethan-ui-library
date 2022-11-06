import React from 'react'
import { setTranslate } from '@/utils/dom/translate'
import { Component } from '@/utils/component'
import { getRangeValue } from '@/utils/numbers'
import { isZero } from '@/utils/is'
import { computeScroll, getVirtualScrollCurrentIndex } from '@/utils/virtual-scroll'
import { KeyboardKey } from '@/utils/keyboard'
import Scroll from '../Scroll'

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
    keyboardControl?: boolean
}

export interface LazyListState {
    currentIndex: number
    scrollTopRatio: number
    lastScrollTop: number
}

/** 预留前后两个位置的偏差值 */
const LAZY_LIST_DATA_OFFSET = 2

/** 不能使用PureComponent，因为Item的部分状态是在上层中使用的，例如Select OptionList Option的hoverIndex prop， */
export default class LazyList<T = any> extends Component<LazyListProps<T>, LazyListState> {
    static defaultProps = {
        data: [],
        shouldRecomputed: () => true,
        defaultIndex: 0,
        keyboardControl: false,
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

    private optionInner: HTMLDivElement

    getInitState = (): LazyListState => {
        const { defaultIndex, lineHeight, height, data } = this.props

        /** 默认值小于容器高度，不计算 */
        if ((defaultIndex + 1) * lineHeight <= height) {
            return { currentIndex: 0, lastScrollTop: 0, scrollTopRatio: 0 }
        }

        const currentIndex = getVirtualScrollCurrentIndex({
            height,
            lineHeight,
            scrollIndex: defaultIndex,
            dataLength: data.length,
        })

        const { scrollTopRatio, lastScrollTop } = computeScroll({
            dataLength: this.props.data.length,
            lineHeight,
            height,
            currentIndex,
        })

        return {
            currentIndex,
            lastScrollTop,
            scrollTopRatio,
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

        if (this.state.lastScrollTop) {
            setTranslate(this.optionInner, '0rem', `-${this.state.lastScrollTop}px`)
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

                const lastScrollTop = nextContentHeight * nextScrollTopRatio

                this.dispatchState({
                    scrollTopRatio: nextScrollTopRatio,
                    lastScrollTop,
                    currentIndex: this.state.currentIndex,
                })
            } else {
                this.dispatchState({ currentIndex: 0, scrollTopRatio: 0, lastScrollTop: 0 })
            }
        }
    }

    /** 暴露外部使用 */
    scrollToView = (scrollIndex: number) => {
        const { lineHeight, height, data } = this.props

        if (scrollIndex < 0 || scrollIndex >= data.length || !this.scroll || this.state.currentIndex === scrollIndex)
            return

        const currentIndex = getVirtualScrollCurrentIndex({ height, lineHeight, scrollIndex, dataLength: data.length })

        const { lastScrollTop, scrollTopRatio } = computeScroll({
            currentIndex,
            dataLength: data.length,
            lineHeight,
            height,
        })

        this.dispatchState({ lastScrollTop, scrollTopRatio, currentIndex })
    }

    private dispatchState = (state: LazyListState) => {
        this.setState(state)

        const { onScrollStateChange } = this.props

        if (onScrollStateChange) {
            onScrollStateChange(state)
        }

        setTranslate(this.optionInner, '0rem', `-${state.lastScrollTop}px`)
    }

    private bindOptionInner = (el: HTMLDivElement) => {
        this.optionInner = el
    }

    private handleScroll = (_, scrollTopRatio, __, ___, ____, scrollContainerHeight, _____, pixelY) => {
        if (!this.optionInner) return

        const { lineHeight, data } = this.props

        const contentHeight = data.length * lineHeight - scrollContainerHeight

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
        }

        let currentIndex = Math.floor(lastScrollTop / lineHeight) - 1

        if (data.length - this.itemsInView < currentIndex) currentIndex = data.length - this.itemsInView

        if (currentIndex < 0) currentIndex = 0

        this.dispatchState({ scrollTopRatio, currentIndex, lastScrollTop })
    }

    handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = (evt) => {
        if (!this.props.keyboardControl) return

        const { currentIndex } = this.state

        const { data } = this.props

        const { key } = evt

        switch (key) {
            case KeyboardKey.ArrowUp:
                evt.preventDefault()

                this.scrollToView(currentIndex - 1 < 0 ? data.length - 1 : currentIndex - 1)

                break
            case KeyboardKey.ArrowDown:
                evt.preventDefault()

                this.scrollToView(currentIndex + 1 > data.length - this.itemsInView ? 0 : currentIndex + 1)

                break
            default:
                break
        }
    }

    render() {
        const { height, lineHeight, data, renderItem, keyboardControl } = this.props

        const { scrollTopRatio, currentIndex } = this.state

        const sliceData = data.slice(currentIndex, currentIndex + this.itemsInView + LAZY_LIST_DATA_OFFSET)

        return (
            <Scroll
                scroll={this.scroll}
                style={{ height: this.scroll ? height : undefined }}
                onScroll={this.handleScroll}
                scrollHeight={this.scrollHeight}
                scrollTop={scrollTopRatio}
            >
                <div
                    ref={this.bindOptionInner}
                    tabIndex={keyboardControl ? -1 : undefined}
                    onKeyDown={this.handleKeydown}
                >
                    <div style={{ height: currentIndex * lineHeight }} />
                    {sliceData.map((d, i) => renderItem(d, i))}
                </div>
            </Scroll>
        )
    }
}
