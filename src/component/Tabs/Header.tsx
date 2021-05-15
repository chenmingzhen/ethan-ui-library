// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '@/utils/component'
import { tabsClass } from '@/styles'
import Button from '../Button'
import icons from '../icons'
import Tab from './Tab'

const REDUNDANT = 30
class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            attribute: 0,
            overflow: false,
            attributeString: '',
        }

        this.setPosition = this.setPosition.bind(this)
        this.bindInner = this.bindElement.bind(this, 'innerElement')
        this.bindWrapper = this.bindElement.bind(this, 'wrapperElement')
        this.bindScroll = this.bindElement.bind(this, 'scrollElement')
        this.renderTab = this.renderTab.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlePrevClick = this.handleMove.bind(this, true)
        this.handleNextClick = this.handleMove.bind(this, false)
        this.moveToCenter = this.moveToCenter.bind(this)
        this.handleCollapse = this.handleCollapse.bind(this)
    }

    componentDidMount() {
        super.componentDidMount()
        const { isVertical } = this.props
        this.setPosition(isVertical)
    }

    componentDidUpdate() {
        const { isVertical } = this.props
        this.setPosition(isVertical)
    }

    setPosition(isVertical) {
        const attributeString = isVertical ? 'Height' : 'Width'
        if (!this.innerElement) return
        // 元素的宽||高
        const innerAttribute = this.innerElement[`client${attributeString}`]
        const scrollAttribute = this.scrollElement[`client${attributeString}`]
        const { attribute: domAttribute } = this.state
        this.setState({ overflow: scrollAttribute > domAttribute + innerAttribute, attributeString })
    }

    bindElement(name, el) {
        this[name] = el
    }

    /**
     * 左右按钮点击移动
     * @param lt true 左边 false 右边
     */
    handleMove(lt) {
        const { attributeString, attribute: a } = this.state

        const innerAttribute = this.innerElement[`client${attributeString}`]
        const scrollAttribute = this.scrollElement[`client${attributeString}`]

        // 计算滑动距离
        let attribute = a + (lt ? -innerAttribute : innerAttribute)
        // 距离超过左|顶
        if (attribute < 0) attribute = 0
        // 距离超过右|底
        if (attribute + innerAttribute > scrollAttribute) attribute = scrollAttribute - innerAttribute

        this.setState({ attribute })
    }

    /**
     * Tab被点击时顺带触发此事件 Tab回调执行
     * @param tabRect
     * @param last 是否是最后一个Tab
     * @param first 是否是第一个Tab
     */
    moveToCenter(tabRect, last, first) {
        const { isVertical } = this.props
        const positions = isVertical ? ['top', 'bottom'] : ['left', 'right']
        const rect = this.innerElement.getBoundingClientRect()

        // 比较Tab与容器的位置
        // marginLeft负数 左边
        if (tabRect[positions[0]] < rect[positions[0]]) {
            // Tab 小于 容器 Tab在容器左或在容器上了
            // 点击pre箭头触发
            this.setState(
                immer(draft => {
                    console.log(draft.attribute)
                    draft.attribute -= rect[positions[0]] - tabRect[positions[0]] + (first ? 0 : REDUNDANT)
                    console.log(draft.attribute)
                })
            )
        } else if (tabRect[positions[1]] > rect[positions[1]]) {
            // 点击next箭头触发
            this.setState(
                immer(draft => {
                    draft.attribute +=
                        tabRect[positions[1]] -
                        rect[positions[1]] -
                        (draft.attribute === 0 ? -30 : 0) +
                        (last ? 0 : REDUNDANT)
                })
            )
        }
    }

    handleClick(id, isActive) {
        if (!isActive) {
            if (this.props.onChange) this.props.onChange(id)
            this.ignoreNextCollapse = true
            setTimeout(() => this.handleCollapse(false), 200)
        }
    }

    /**
     * 折叠处理
     * @param e
     */
    handleCollapse(e) {
        const { onCollapse, collapsed } = this.props
        if (!onCollapse) return

        if (typeof e === 'boolean') {
            onCollapse(e)
            return
        }

        if (this.ignoreNextCollapse) {
            this.ignoreNextCollapse = false
            return
        }

        onCollapse(!collapsed)
    }

    renderTab({ tab, id, ...other }) {
        return (
            <Tab {...other} key={id} id={id} moveToCenter={this.moveToCenter} onClick={this.handleClick}>
                {tab}
            </Tab>
        )
    }

    renderButtons() {
        const { onChange, tabs } = this.props
        return (
            <Button.Group>
                {tabs.map(tab => (
                    <Button
                        key={tab.id}
                        onClick={tab.isActive ? undefined : onChange.bind(this, tab.id)}
                        className={tabsClass(tab.isActive && 'button-active')}
                        disabled={tab.disabled}
                    >
                        {tab.tab}
                    </Button>
                ))}
            </Button.Group>
        )
    }

    renderTabs() {
        const { border, onCollapse, collapsed, tabs, isVertical, tabBarExtraContent, tabBarStyle, shape } = this.props
        const { attribute, overflow } = this.state

        const position = isVertical ? 'Top' : 'Left'
        const showBorder = shape !== 'bordered' && shape !== 'dash'

        return (
            <div onClick={this.handleCollapse} className={tabsClass('header')} style={tabBarStyle || {}}>
                <div ref={this.bindWrapper} className={tabsClass('header-tabs')}>
                    {onCollapse && (
                        <span className={tabsClass('indicator', collapsed && 'collapsed')}>{icons.AngleRight}</span>
                    )}
                    {attribute > 0 && (
                        <div onClick={this.handlePrevClick} className={tabsClass('scroll-prev')}>
                            {icons.AngleLeft}
                        </div>
                    )}
                    {/* 宽度容器 */}
                    <div ref={this.bindInner} className={tabsClass('inner')}>
                        {/* 实际内容 */}
                        <div
                            ref={this.bindScroll}
                            style={{ [`margin${position}`]: -attribute }}
                            className={tabsClass('scroll')}
                        >
                            {tabs.map(this.renderTab)}
                        </div>
                    </div>
                    {overflow && (
                        <div onClick={this.handleNextClick} className={tabsClass('scroll-next')}>
                            {isVertical ? icons.AngleRight : icons.AngleRight}
                        </div>
                    )}
                </div>
                {tabBarExtraContent && <div className={tabsClass('extra')}>{tabBarExtraContent}</div>}
                {showBorder && <div style={{ borderColor: border }} className={tabsClass('hr')} />}
            </div>
        )
    }

    render() {
        return this.props.shape === 'button' ? this.renderButtons() : this.renderTabs()
    }
}

Header.propTypes = {
    border: PropTypes.string,
    collapsed: PropTypes.bool,
    isVertical: PropTypes.bool,
    onChange: PropTypes.func,
    onCollapse: PropTypes.func,
    shape: PropTypes.string,
    tabs: PropTypes.array,
    tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tabBarStyle: PropTypes.object,
}

export default Header
