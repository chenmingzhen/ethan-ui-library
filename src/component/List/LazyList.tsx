import React from 'react'
import { setTranslate } from '@/utils/dom/translate'
import { PureComponent } from '@/utils/component'
import Scroll from '../Scroll'

interface LazyListProps {
    scrollHeight: number
    data?: any[]
    itemsInView?: number
    lineHeight?: number
    height: number
    renderItem: (data, index: number) => React.ReactNode
}

interface LazyListState {
    currentIndex: number
    scrollTopRatio: number
}

export default class LazyList extends PureComponent<LazyListProps, LazyListState> {
    static defaultProps = {
        itemsInView: 10,
        lineHeight: 32,
        data: [],
    }

    get scroll(): 'y' | undefined {
        const { height, scrollHeight } = this.props

        if (height < scrollHeight) {
            return 'y'
        }
        return undefined
    }

    lastScrollTop = 0

    optionInner: HTMLDivElement

    constructor(props) {
        super(props)

        this.state = {
            currentIndex: 0,
            scrollTopRatio: 0,
        }
    }

    componentDidUpdate(prevProps: Readonly<LazyListProps>): void {
        if (prevProps.data.length !== this.props.data.length) {
            this.setState({ currentIndex: 0, scrollTopRatio: 0 })
        }
    }

    bindOptionInner = (el: HTMLDivElement) => {
        this.optionInner = el
    }

    handleScroll = (_, y, __, ___, ____, scrollContainerHeight, _____, pixelY) => {
        if (!this.optionInner) return

        const { itemsInView, lineHeight, data } = this.props

        const fullHeight = itemsInView * lineHeight

        const contentHeight = data.length * lineHeight - scrollContainerHeight

        let scrollTopRatio = scrollContainerHeight > fullHeight ? 0 : y

        if (!pixelY) {
            /** 拖动bar */
            this.lastScrollTop = scrollTopRatio * contentHeight
        } else {
            /** wheel滚动 */
            this.lastScrollTop += pixelY

            if (this.lastScrollTop < 0) this.lastScrollTop = 0

            /** 滚动到底部 */
            if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight

            scrollTopRatio = this.lastScrollTop / contentHeight
        }

        setTranslate(this.optionInner, '0rem', `-${this.lastScrollTop}px`)

        let currentIndex = Math.floor(this.lastScrollTop / lineHeight) - 1

        if (data.length - itemsInView < currentIndex) currentIndex = data.length - itemsInView

        if (currentIndex < 0) currentIndex = 0

        this.setState({ scrollTopRatio, currentIndex })
    }

    render() {
        const { height, scrollHeight, lineHeight, data, itemsInView, renderItem } = this.props

        const { scrollTopRatio, currentIndex } = this.state

        return (
            <Scroll
                stable
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
