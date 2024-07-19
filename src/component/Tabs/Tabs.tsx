import React, { Children, useMemo } from 'react'
import classnames from 'classnames'
import { tabsClass } from '@/styles'
import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import useSafeState from '@/hooks/useSafeState'
import { Tab, TabsProps, Align, TabsPanelProps } from './type'
import Header from './Header'
import Panel from './Panel'

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        style,
        children,
        onChange,
        lazy = true,
        collapsible,
        shape = 'card',
        align: propAlign,
        tabBarExtraContent,
        overflowIcon = 'scroll',
        defaultCollapsed = false,
    } = props

    const [active, updateActive] = useMergedValue({
        defaultStateValue: 0,
        options: {
            value: props.active,
            defaultValue: props.defaultActive,
            onChange,
        },
    })
    const [collapsed, updateCollapsed] = useSafeState(defaultCollapsed)

    const { align, isVertical } = useMemo<{ align: Align; isVertical: boolean }>(() => {
        const vertical = propAlign?.indexOf('vertical') > -1

        if (shape === 'button' && vertical) {
            console.warn("align vertical-* can't supported when shape is button")

            return { align: 'left', isVertical: false }
        }

        if (collapsible && vertical) {
            console.warn("align vertical-* can't supported when collapsible is true")
            return { align: 'left', isVertical: false }
        }

        return { align: propAlign, isVertical: vertical }
    }, [shape, collapsible, propAlign])

    const handleCollapse = useRefMethod(() => {
        updateCollapsed(!collapsed)
    })

    function renderHeader() {
        const tabs: Tab[] = []

        let hrBorderColor

        React.Children.toArray(children).forEach((child: React.ReactElement<TabsPanelProps>, i, { length }) => {
            if (!child || !(child as any).type?.type?.IS_ETHAN_PANEL) return

            const { id = i, tab, activeTabStyle, tabStyle, background } = child.props
            const isActive = active === id
            const panelBorder = child.props.border

            if (isActive) hrBorderColor = panelBorder

            tabs.push({
                id,
                tab,
                align,
                shape,
                tabStyle,
                isActive,
                isVertical,
                background,
                activeTabStyle,
                border: panelBorder,
                isLast: length - 1 === i,
                disabled: child.props.disabled,
            })
        })

        return (
            <Header
                tabs={tabs}
                shape={shape}
                collapsed={collapsed}
                currentActive={active}
                isVertical={isVertical}
                onChange={updateActive}
                overflowIcon={overflowIcon}
                hrBorderColor={hrBorderColor}
                tabBarExtraContent={tabBarExtraContent}
                onCollapse={collapsible ? handleCollapse : undefined}
            />
        )
    }

    function renderPanel(child, i: number) {
        if (!child?.type?.type?.IS_ETHAN_PANEL) return

        const { id = i, ...other } = (child as React.ReactElement<TabsPanelProps>).props

        return (
            <Panel
                {...other}
                id={id}
                key={id}
                lazy={lazy}
                collapsed={collapsed}
                isActive={active === id}
                collapsible={collapsible}
            />
        )
    }

    const className = classnames(
        tabsClass('_', align && `align-${align}`, isVertical && 'vertical', shape),
        props.className
    )

    return (
        <div className={className} style={style}>
            {align !== 'vertical-right' && align !== 'bottom' && renderHeader()}
            {Children.toArray(children).map(renderPanel)}
            {(align === 'vertical-right' || align === 'bottom') && renderHeader()}
        </div>
    )
}

export default React.memo(Tabs)
