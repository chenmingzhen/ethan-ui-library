import React, { Children } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { tabsClass } from '@/styles'
import { Tab, TabsProps, TabsState, Align, TabsPanelProps } from './type'
import Header from './Header'
import Panel from './Panel'

class Tabs extends PureComponent<TabsProps, TabsState> {
    static defaultProps = {
        background: '#fff',
        border: '#ddd',
        color: '#333',
        defaultCollapsed: false,
        inactiveBackground: 'transparent',
        lazy: true,
        shape: 'normal',
        overflowIcon: 'scroll',
    }

    get align(): { align: Align; isVertical: boolean } {
        const { shape, collapsible, align } = this.props
        const isVertical = align?.indexOf('vertical') > -1

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

    get active() {
        return this.props?.active ?? this.state.active
    }

    constructor(props) {
        super(props)

        this.state = {
            active: props.defaultActive || 0,
            collapsed: props.defaultCollapsed,
        }
    }

    renderHeader = () => {
        const { align, isVertical } = this.align

        const { children, shape, tabBarExtraContent, inactiveBackground, color } = this.props

        const tabs: Tab[] = []

        let { border } = this.props

        React.Children.toArray(children).forEach((child: React.ReactElement<TabsPanelProps>, i, { length }) => {
            if (!child || !(child as any).type?.type?.IS_ETHAN_PANEL) return

            const { id = i, background, tab } = child.props

            let childBorder = child.props.border

            this.active === id ? (childBorder ? (border = childBorder) : (childBorder = border)) : null

            tabs.push({
                id,
                isActive: this.active === id,
                tab,
                isVertical,
                align,
                shape,
                isLast: length - 1 === i,
                disabled: child.props.disabled,
                background: background || (this.active === id ? this.props.background : inactiveBackground),
                border: childBorder,
                color: child.props.color || (this.active === id ? color : undefined),
            })
        })

        return (
            <Header
                isVertical={isVertical}
                collapsed={this.state.collapsed}
                onCollapse={this.props.collapsible ? this.handleCollapse : undefined}
                shape={shape}
                onChange={this.handleChange}
                tabs={tabs}
                tabBarExtraContent={tabBarExtraContent}
                border={border}
                currentActive={this.active}
                overflowIcon={this.props.overflowIcon}
            />
        )
    }

    renderPanel = (child, i) => {
        if (!child?.type?.type?.IS_ETHAN_PANEL) return

        const { collapsible, lazy } = this.props

        const { id = i, ...other } = (child as React.ReactElement<TabsPanelProps>).props

        return (
            <Panel
                {...other}
                lazy={lazy}
                collapsed={this.state.collapsed}
                collapsible={collapsible}
                id={id}
                key={id}
                isActive={this.active === id}
            />
        )
    }

    render = () => {
        const { shape, style, children } = this.props

        const { align, isVertical } = this.align

        const className = classnames(
            tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape),
            this.props.className
        )

        return (
            <div className={className} style={style}>
                {align !== 'vertical-right' && align !== 'bottom' && this.renderHeader()}
                {Children.toArray(children).map(this.renderPanel)}
                {(align === 'vertical-right' || align === 'bottom') && this.renderHeader()}
            </div>
        )
    }

    handleChange = (active: number) => {
        const { onChange } = this.props

        onChange?.(active)

        this.setState({ active })
    }

    handleCollapse = () => {
        this.setState(prevState => ({ collapsed: !prevState.collapsed }))
    }
}

export default Tabs
