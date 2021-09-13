import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { tabsClass } from '@/styles'
import { Tab, TabsProps, TabsState, Align } from './type'
import Header from './Header'

class Tabs extends PureComponent<TabsProps, TabsState> {
    static defaultProps = {
        background: '#fff',
        border: '#ddd',
        color: '#333',
        defaultCollapsed: false,
        inactiveBackground: 'transparent',
        lazy: true,
        shape: 'normal',
        navAnimation: true,
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

        const {
            children,
            shape,
            collapsible,
            tabBarExtraContent,
            inactiveBackground,
            color,
            navAnimation,
            innerPosition,
        } = this.props

        const tabs: Tab[] = []

        let { border } = this.props

        React.Children.toArray(children).forEach((child: React.ReactElement<any>, i, { length }) => {
            if (!child || !child.type) return

            const tab = child.type.isTabPanel ? child.props.tab : child.type.isTabLink ? child : undefined

            if (!tab) return

            const { id = i, background } = child.props

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
                navAnimation,
            })
        })

        return (
            <Header
                isVertical={isVertical}
                collapsed={this.state.collapsed}
                onCollapse={undefined}
                shape={shape}
                onChange={this.handleChange}
                tabs={tabs}
                tabBarExtraContent={tabBarExtraContent}
                border={border}
                currentActive={this.active}
                innerPosition={innerPosition}
            />
        )
    }

    render = () => {
        const { children, shape, style } = this.props

        const { align, isVertical } = this.align

        const className = classnames(
            tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape),
            this.props.className
        )

        return (
            <div className={className} style={style}>
                {align !== 'vertical-right' && align !== 'bottom' && this.renderHeader()}
            </div>
        )
    }

    handleChange = (active: number) => {
        const { onChange } = this.props

        onChange?.(active)

        this.setState({ active })
    }
}

export default Tabs
