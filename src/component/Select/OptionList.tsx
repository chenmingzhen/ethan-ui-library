import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { getLocale } from '@/locale'
import { setTranslate } from '@/utils/dom/translate'
import { getKey } from '@/utils/uid'
import { CHANGE_ACTION } from '@/utils/Datum/types'
import { isEmpty, isEmptyStr, isZero } from '@/utils/is'
import { getRangeValue } from '@/utils/numbers'
import { SelectListProps } from './type'
import Spin from '../Spin'
import Scroll from '../Scroll'
import Option from './Option'
import AnimationList from '../List'
import { transformSizeToPx } from './util'

interface OptionListState {
    // 目前选中的index
    currentIndex: number
    // 靠近的index
    hoverIndex: number
    // scroll的Top
    scrollTopRatio: number
}

class OptionList extends PureComponent<SelectListProps, OptionListState> {
    lastScrollTop = 0

    optionInner: HTMLDivElement

    hoverMoveTimer: NodeJS.Timeout

    scrollTimer: NodeJS.Timeout

    constructor(props: SelectListProps) {
        super(props)

        this.state = {
            currentIndex: 0,
            hoverIndex: 0,
            scrollTopRatio: 0,
        }

        props.bindOptionListFunc({
            handleHover: this.handleHover,
            hoverMove: this.hoverMove,
            getHoverIndex: () => this.state.hoverIndex,
        })
    }

    componentDidMount() {
        super.componentDidMount()

        this.props.datum.subscribe(CHANGE_ACTION, this.forceUpdate)

        /** 滚动到默认值的地方 */

        if (!this.props.datum.values.length) return

        const item = this.props.datum.getDataByValue(this.props.data, this.props.datum.values[0])

        if (!item) return

        const { index: scrollIndex } = item

        if ((scrollIndex + 1) * this.props.lineHeight <= this.props.height) return

        this.lastScrollTop = scrollIndex * this.props.lineHeight

        const contentHeight = this.props.data.length * this.props.lineHeight - this.props.height

        const scrollTopRatio = this.lastScrollTop / contentHeight

        setTranslate(this.optionInner, '0rem', `-${this.lastScrollTop}px`)

        this.setState({ scrollTopRatio, currentIndex: scrollIndex })
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.datum.subscribe(CHANGE_ACTION, this.forceUpdate)
    }

    componentDidUpdate(prevProps: Readonly<SelectListProps>, prevState: Readonly<OptionListState>): void {
        if (this.props.data !== prevProps.data && this.props.data.length !== prevProps.data.length) {
            /** 动态添加值 */
            if (isEmpty(this.props.filterText) && isEmptyStr(this.props.filterText) && !isZero(this.props.data)) {
                if (this.props.lineHeight * this.props.data.length < this.props.height) return

                const prevContentHeight = prevProps.data.length * prevProps.lineHeight - prevProps.height

                const prevScrollTopRatio = prevState.scrollTopRatio

                const nextContentHeight = this.props.data.length * this.props.lineHeight - this.props.height

                /** @todo 行高发生变化时，还未重新计算currentIndex */
                const nextCurrentIndex = prevProps.lineHeight === this.props.lineHeight ? this.state.currentIndex : 0

                const nextScrollTopRatio = getRangeValue({
                    current: prevScrollTopRatio * (prevContentHeight / nextContentHeight),
                })

                this.lastScrollTop = nextContentHeight * nextScrollTopRatio

                this.setState({ currentIndex: nextCurrentIndex, scrollTopRatio: nextScrollTopRatio }, () => {
                    if (this.optionInner) {
                        setTranslate(this.optionInner, '0rem', `-${this.lastScrollTop}px`)
                    }
                })
            } else {
                this.lastScrollTop = 0

                this.setState({ currentIndex: 0, scrollTopRatio: 0 }, () => {
                    if (this.optionInner) {
                        setTranslate(this.optionInner, '0rem', '0rem')
                    }
                })
            }
        }

        if (
            this.props.onScrollRatioChange &&
            prevState.scrollTopRatio !== this.state.scrollTopRatio &&
            !isZero(this.props.data)
        ) {
            this.props.onScrollRatioChange(this.state.scrollTopRatio, this.lastScrollTop)
        }
    }

    scrollToIndex = () => {}

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

    handleHover = (index: number) => {
        const { control } = this.props

        /** 当鼠标在select的滚动容器内，键盘操作时，会触发Option的Hover，此时键盘的优先级更高 */
        if (control === 'keyboard') return

        if (this.state.hoverIndex !== index && !this.scrollTimer) {
            this.setState({ hoverIndex: index })
        }
    }

    handleMouseMove = () => {
        if (this.props.control !== 'mouse' && !this.hoverMoveTimer) {
            this.props.onControlChange('mouse')
        }
    }

    handleScroll = (_, y, __, ___, ____, scrollContainerHeight, _____, pixelY) => {
        if (!this.optionInner) return

        const { data, itemsInView, lineHeight } = this.props

        this.startScrollTimer()

        // 屏内的高度
        const fullHeight = itemsInView * lineHeight
        // 内容高度需要减去容器高度
        // 假设内容data.length为2 lineHeight为20 容器高度h为20，第一个格子的顶部到第二个格子的顶部距离为20，活动范围为20，需要data.length * lineHeight - h
        const contentHeight = data.length * lineHeight - scrollContainerHeight

        let scrollTopRatio = scrollContainerHeight > fullHeight ? 0 : y

        // scrollTop负责将Bar的位置进行推动 所以使用clientHeight（h） 记录上一次的位置,当滚动到最后的地方 有空白，需要scrollTop回顶(已废弃)
        // 真正起滚动作用的是translate

        // 移除使用scrollTop消除translate的影响 转而在translate中计算
        // this.optionInner.style.marginTop = `${scrollTop * h}px`

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

        let currentIndex = Math.floor(this.lastScrollTop / lineHeight) - 1

        /** @todo 滚动到底部左右的位置,边界条件,考虑移除 */
        if (data.length - itemsInView < currentIndex) currentIndex = data.length - itemsInView

        if (currentIndex < 0) currentIndex = 0

        // 设置滚动效果
        setTranslate(this.optionInner, '0rem', `-${this.lastScrollTop}px`)

        this.setState({ scrollTopRatio, currentIndex })
    }

    /** 上下键移动 */
    /** 不同于handleScroll 因为handleScroll是必然滚动的，此处不一定滚动，所以滚动高度逻辑 以及ScrollTop逻辑发生改变 */
    hoverMove = (step: number) => {
        this.startHoverMoveTimer()

        const max = this.props.data.length
        const { lineHeight, height, groupKey } = this.props
        let { hoverIndex, currentIndex } = this.state

        // 无hover 取当前的index
        if (hoverIndex === undefined) hoverIndex = currentIndex
        else hoverIndex += step

        if (hoverIndex >= max) {
            hoverIndex = 0
            this.lastScrollTop = 0
        }

        const data = this.props.data[hoverIndex]

        // 如果为Group的标题 则多加或减1
        if (data && data[groupKey]) {
            if (step > 0) hoverIndex += 1
            else hoverIndex -= 1
        }

        if (hoverIndex < 0) hoverIndex = max - 1

        const emptyHeight = hoverIndex * lineHeight

        // 推理2：由于在到达当前视图的底部逻辑中，对lastScrollTop设置为scrollHeight，注意到scrollHeight是有减去height
        // 此时在height以内的高度 向上移动是不会触发lastScrollTop的更新，scrollTop不会得到重新的计算
        // 如果超过了height的阀值，即到达当前视图的顶部 就会触发下面的逻辑
        if (emptyHeight < this.lastScrollTop) {
            // 到达当前视图的顶部

            setTranslate(this.optionInner, '0rem', `-${emptyHeight}px`)

            this.lastScrollTop = emptyHeight

            currentIndex = hoverIndex

            this.setState({ currentIndex, scrollTopRatio: emptyHeight / (lineHeight * max) })
            // 推理1：假设是打开Select(高度足够滚动) 此时的lastScrollTop的高度为0，height是容器的高度，一直移动
            // 当emptyHeight的高度大于容器的高度的时候 就应该触发到达当前视图的底部的逻辑
        } else if (emptyHeight + lineHeight > this.lastScrollTop + height) {
            // 到达当前视图的底部

            const scrollHeight = emptyHeight + lineHeight - height

            setTranslate(this.optionInner, '0rem', `-${scrollHeight}px`)

            this.lastScrollTop = scrollHeight

            // 由于currentIndex涉及到data的懒加载渲染，见RenderList
            // 到达视图底部，继续向下时，currentIndex的位置应该是当前hoverIndex减去（容器的高度/每个Item的高度）
            // 所以currentIndex会是在当前视图的顶部
            // 然后currentIndex+itemsInView确保数据被渲染出来
            currentIndex = hoverIndex - Math.ceil(height / lineHeight)

            if (currentIndex < 0) currentIndex = 0

            this.setState({ currentIndex, scrollTopRatio: emptyHeight / (lineHeight * max) })
        } else if (hoverIndex === 0 && emptyHeight === 0) {
            // 到达数据源的顶部(0 1)

            setTranslate(this.optionInner, '0rem', '0rem')

            this.setState({ currentIndex: 0, scrollTopRatio: 0 })
        }

        this.setState({ hoverIndex })
    }

    bindOptionInner = el => {
        this.optionInner = el
    }

    renderList = () => {
        const {
            loading,
            data,
            height,
            lineHeight,
            itemsInView,
            datum,
            keygen,
            onChange,
            renderItem,
            groupKey,
            text,
            spinProps,
            size,
        } = this.props

        const { hoverIndex, currentIndex } = this.state

        const scroll = lineHeight * data.length > height ? 'y' : undefined

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
            <Spin size={spinSize} {...spinProps} loading={loading}>
                <Scroll
                    scroll={scroll}
                    style={{ height: scroll ? height : undefined }}
                    onScroll={this.handleScroll}
                    scrollHeight={data.length * lineHeight}
                    scrollTop={this.state.scrollTopRatio}
                >
                    <div ref={this.bindOptionInner}>
                        <div style={{ height: currentIndex * lineHeight }} />
                        {/* 优化性能 视图内的渲染 并非一次渲染全部 */}
                        {data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => (
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
                        ))}
                    </div>
                </Scroll>
            </Spin>
        )
    }

    render() {
        const { focus, style, selectId, className, onTransitionEnd } = this.props

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
                {this.renderList()}
            </AnimationList>
        )
    }
}

export default OptionList
