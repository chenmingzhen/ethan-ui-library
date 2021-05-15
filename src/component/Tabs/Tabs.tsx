// @ts-nocheck
import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { tabsClass } from '@/styles'
import Header from './Header'
import Wrapper from './Wrapper'

class Tabs extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            active: props.defaultActive || 0,
            collapsed: props.defaultCollapsed,
        }

        this.getAlign = this.getAlign.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCollapse = this.handleCollapse.bind(this)
        this.renderContent = this.renderContent.bind(this)
    }

    getAlign() {
        const { shape, collapsible, align } = this.props
        const isVertical = align && align.indexOf('vertical') > -1
        if (shape === 'button' && isVertical) {
            console.warn("align vertical-* can't supported when shape is button")
            return { align: 'left', isVertical: false }
        }

        if (collapsible && isVertical) {
            console.warn("align vertical-* can't supported when collapsible is true")
            return { align: 'left', isVertical: false }
        }

        return { align, isVertical }
    }

    /**
     * 获取当前Active的Tab
     * @returns {number|*}
     */
    getActive() {
        // 如果Tabs的Active状态由prop控制，不由该UI层做处理
        // Active由业务||封装组件处理
        if ('active' in this.props) return this.props.active
        return this.state.active
    }

    handleChange(active) {
        const { onChange } = this.props
        if (onChange) onChange(active)
        this.setState({ active })
    }

    handleCollapse(collapsed) {
        this.setState({ collapsed })
    }

    /**
     * 渲染头部
     * @param align 位置
     * @param isVertical 是否垂直
     * @returns {JSX.Element}
     */
    renderHeader({ align, isVertical }) {
        const { children, color, shape, tabBarStyle, inactiveBackground, collapsible, tabBarExtraContent } = this.props
        const active = this.getActive()
        const tabs = []

        let { border } = this.props
        Children.toArray(children).forEach((child, i, arr) => {
            // 如果child不存在type Panel 或者Link  type: class Panel type:class Link
            if (!child || !child.type) return

            let tab = null
            if (child.type.isTabPanel) {
                // 获取Tabs.Panel 的tab props
                // eslint-disable-next-line prefer-destructuring
                tab = child.props.tab
            } else if (child.type.isTabLink) {
                tab = child
            } else return

            const { id = i, background } = child.props
            let childBorder = child.props.border

            if (active === id) {
                if (childBorder) border = childBorder
                else childBorder = border
            }

            tabs.push({
                id,
                isActive: active === id,
                tab,
                isVertical,
                align,
                background: background || (active === id ? this.props.background : inactiveBackground),
                border: childBorder,
                color: child.props.color || (active === id ? color : undefined),
                disabled: child.props.disabled,
                shape,
                last: arr.length - 1 === i,
            })
        })

        return (
            <Header
                isVertical={isVertical}
                border={border}
                collapsed={this.state.collapsed}
                onCollapse={collapsible ? this.handleCollapse : undefined}
                shape={shape}
                onChange={this.handleChange}
                tabs={tabs}
                tabBarExtraContent={tabBarExtraContent}
                tabBarStyle={tabBarStyle}
            />
        )
    }

    renderContent(child, i) {
        // 剔除非Tab组件下的children
        if (!(child && child.type && child.type.isTabPanel)) return null

        const { collapsible, lazy } = this.props
        const { id = i, ...other } = child.props

        return (
            <Wrapper
                {...other}
                lazy={lazy}
                collapsed={this.state.collapsed}
                collapsible={collapsible}
                id={id}
                key={id}
                active={this.getActive()}
            />
        )
    }

    render() {
        const { children, shape, style } = this.props
        const position = this.getAlign()
        const { align, isVertical } = position
        const className = classnames(
            tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape),
            this.props.className
        )

        // 分层渲染 根据align的位置渲染wrapper的内容
        return (
            <div className={className} style={style}>
                {align !== 'vertical-right' && align !== 'bottom' && this.renderHeader(position)}
                {Children.toArray(children).map(this.renderContent)}
                {(align === 'vertical-right' || align === 'bottom') && this.renderHeader(position)}
            </div>
        )
    }
}

Tabs.propTypes = {
    active: PropTypes.any,
    align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right', 'bottom']),
    background: PropTypes.string, // 选中标签背景色
    border: PropTypes.string, // 边框颜色
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    className: PropTypes.string,
    collapsible: PropTypes.bool,
    color: PropTypes.string,
    defaultActive: PropTypes.any,
    defaultCollapsed: PropTypes.bool,
    inactiveBackground: PropTypes.string, // 未选中标签背景色
    onChange: PropTypes.func,
    shape: PropTypes.oneOf(['card', 'line', 'button', 'bordered', 'dash']),
    style: PropTypes.object,
    tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tabBarStyle: PropTypes.object, // tab bar 的样式对象
    lazy: PropTypes.bool,
}

Tabs.defaultProps = {
    background: '#fff',
    border: '#ddd',
    color: '#333',
    defaultCollapsed: false,
    inactiveBackground: 'transparent',
    lazy: true,
}

export default Tabs
