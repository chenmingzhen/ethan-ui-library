// @ts-nocheck
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getKey } from '@/utils/uid'
import { setTranslate } from '@/utils/dom/translate'
import { getLocale } from '@/locale'
import { selectClass } from '@/styles'
import List from '../List'
import Scroll from '../Scroll'
import Spin from '../Spin'
import Option from './Option'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class OptionList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 目前选中的index
            currentIndex: 0,
            // 靠近的index
            hoverIndex: 0,
            // scroll的Top
            scrollTop: 0,
        }

        this.hoverMove = this.hoverMove.bind(this)
        this.handleHover = this.handleHover.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.renderList = this.renderList.bind(this)

        // 只有出现滚动才会有值
        this.lastScrollTop = 0

        props.bindOptionFunc('handleHover', this.handleHover)
        props.bindOptionFunc('hoverMove', this.hoverMove)
        props.bindOptionFunc('getIndex', () => this.state.hoverIndex)
    }

    // 数据源更新 重置位置
    componentDidUpdate(prevProps) {
        const { data } = this.props

        if (data !== prevProps.data && data.length !== prevProps.data.length) {
            this.lastScrollTop = 0
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ currentIndex: 0, scrollTop: 0 }, () => {
                if (this.optionInner) {
                    setTranslate(this.optionInner, '0px', '0px')
                    // this.optionInner.style.marginTop = '0px'
                }
            })
        }
    }

    getText(key) {
        return this.props.text[key] || getLocale(key)
    }

    // Select中使用
    // 上下键移动
    // 不同于handleScroll 因为handleScroll是必然滚动的，此处不一定滚动，所以滚动高度逻辑 以及ScrollTop逻辑发生改变
    hoverMove(step) {
        const max = this.props.data.length
        const { lineHeight, height, groupKey, itemsInView } = this.props
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

        // 用于计算的无意义高度
        // 当前hover的位置*每个Item的高度
        const emptyHeight = hoverIndex * lineHeight

        // 推理2：由于在到达当前视图的底部逻辑中，对lastScrollTop设置为scrollHeight，注意到scrollHeight是有减去height
        // 此时在height以内的高度 向上移动是不会触发lastScrollTop的更新，scrollTop不会得到重新的计算
        // 如果超过了height的阀值，即到达当前视图的顶部 就会触发下面的逻辑
        if (emptyHeight < this.lastScrollTop) {
            // 到达当前视图的顶部

            setTranslate(this.optionInner, '0px', `-${emptyHeight}px`)

            this.lastScrollTop = emptyHeight

            // FIX 处理hover为1 时白屏
            currentIndex = hoverIndex
            // if (currentIndex < 0) currentIndex = max - itemsInView

            this.setState({ currentIndex, scrollTop: emptyHeight / (lineHeight * max) })
            // lastScrollTop的初始值为0
            // 推理1：假设是打开Select(高度足够滚动) 此时的lastScrollTop的高度为0，height是容器的高度，一直移动
            // 当emptyHeight的高度大于容器的高度的时候 就应该触发到达当前视图的底部的逻辑
        } else if (emptyHeight + lineHeight > this.lastScrollTop + height) {
            // 到达当前视图的底部

            // 滚动的高度等于当前的hover*行高加上一个行高减去容器的高度
            const scrollHeight = emptyHeight + lineHeight - height

            setTranslate(this.optionInner, '0px', `-${scrollHeight}px`)

            this.lastScrollTop = scrollHeight

            // 由于currentIndex涉及到data的懒加载渲染，见RenderList
            // 到达视图底部，继续向下时，currentIndex的位置应该是当前hoverIndex减去（容器的高度/每个Item的高度）
            // 所以currentIndex会是在当前视图的顶部
            // 然后currentIndex+itemsInView确保数据被渲染出来
            currentIndex = hoverIndex - Math.ceil(height / lineHeight)

            if (currentIndex < 0) currentIndex = 0

            this.setState({ currentIndex, scrollTop: emptyHeight / (lineHeight * max) })
        } else if (hoverIndex === 0 && emptyHeight === 0) {
            // 到达数据源的顶部(0 1)

            setTranslate(this.optionInner, '0px', '0px')

            this.setState({ currentIndex: 0, scrollTop: 0 })
        }
        this.setState({ hoverIndex })
    }

    // 滚动回调
    handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
        if (!this.optionInner) return

        // 冲突掉hoverMove的marginTop影响

        const { data, itemsInView, lineHeight } = this.props

        // 屏内的高度
        const fullHeight = itemsInView * lineHeight
        // 内容高度需要减去容器高度
        // 假设内容data.length为2 lineHeight为20 容器高度h为20，第一个格子的顶部到第二个格子的顶部距离为20，活动范围为20，需要data.length * lineHeight - h
        const contentHeight = data.length * lineHeight - h

        let scrollTop = h > fullHeight ? 0 : y

        // scrollTop负责将Bar的位置进行推动 所以使用clientHeight（h） 记录上一次的位置,当滚动到最后的地方 有空白，需要scrollTop回顶(已废弃)
        // 真正起滚动作用的是translate

        // 移除使用scrollTop消除translate的影响 转而在translate中计算
        // this.optionInner.style.marginTop = `${scrollTop * h}px`

        if (pixelY === undefined || pixelY === 0) {
            // 拖动bar
            this.lastScrollTop = scrollTop * contentHeight
        } else {
            // wheel的滚动

            this.lastScrollTop += pixelY
            if (this.lastScrollTop < 0) this.lastScrollTop = 0

            // scroll over bottom
            if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight

            scrollTop = this.lastScrollTop / contentHeight
            // this.optionInner.style.marginTop = `${scrollTop * h}px`
        }

        // 计算目前的index
        let index = Math.floor(this.lastScrollTop / lineHeight) - 1
        if (data.length - itemsInView < index) index = data.length - itemsInView
        if (index < 0) index = 0

        // 设置滚动效果
        setTranslate(this.optionInner, '0px', `-${this.lastScrollTop}px`)

        this.setState({ scrollTop, currentIndex: index })
    }

    // 处理靠近
    // Select中handleInputFocus
    handleHover(index, force) {
        if ((this.props.control === 'mouse' || force) && this.state.hoverIndex !== index) {
            this.setState({ hoverIndex: index })
        }
    }

    // List中鼠标移动 改变控制模式
    handleMouseMove() {
        this.props.onControlChange('mouse')
    }

    renderList() {
        const {
            loading,
            data,
            renderPending,
            height,
            lineHeight,
            itemsInView,
            datum,
            keygen,
            multiple,
            onChange,
            renderItem,
            groupKey,
        } = this.props
        const { hoverIndex, currentIndex } = this.state

        let scroll = ''
        // Scroll的高度 包括隐藏部分
        const scrollHeight = lineHeight * data.length
        if (height < scrollHeight) {
            scroll = 'y'
        }

        if (loading)
            return (
                <span className={selectClass('option')}>
                    {typeof loading === 'boolean' ? <Spin size={20} /> : loading}
                </span>
            )

        // 无数据
        if (data.length === 0 || renderPending)
            return <span className={selectClass('option')}>{this.getText('noData')}</span>

        return (
            <Scroll
                scroll={scroll}
                style={{ height: scroll ? height : undefined }}
                onScroll={this.handleScroll}
                scrollHeight={data.length * lineHeight}
                scrollTop={this.state.scrollTop}
            >
                <div
                    ref={el => {
                        this.optionInner = el
                    }}
                >
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
                            multiple={multiple}
                            onClick={onChange}
                            renderItem={renderItem}
                            onHover={this.handleHover}
                            groupKey={groupKey}
                        />
                    ))}
                </div>
            </Scroll>
        )
    }

    render() {
        const { control, focus, style, selectId, autoClass, getRef } = this.props

        // 缩放的List
        return (
            <ScaleList
                show={focus}
                onMouseMove={this.handleMouseMove}
                style={style}
                data-id={selectId}
                className={classnames(selectClass('options', `control-${control}`), autoClass)}
                getRef={getRef}
            >
                {this.renderList()}
            </ScaleList>
        )
    }
}

OptionList.propTypes = {
    // 控制模式
    control: PropTypes.oneOf(['mouse', 'keyboard']),
    data: PropTypes.array,
    datum: PropTypes.object.isRequired,
    focus: PropTypes.bool,
    // List高度
    height: PropTypes.number,
    // 视图中Item数量
    itemsInView: PropTypes.number,
    keygen: PropTypes.any,
    // Item的高度
    lineHeight: PropTypes.number,
    loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    multiple: PropTypes.bool,
    onControlChange: PropTypes.func,
    onChange: PropTypes.func,
    renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    renderPending: PropTypes.bool,
    selectId: PropTypes.string,
    bindOptionFunc: PropTypes.func.isRequired,
    autoClass: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.object,
    groupKey: PropTypes.string,
    getRef: PropTypes.func,
}

export default OptionList
