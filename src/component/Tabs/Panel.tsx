import React, { useRef } from 'react'
import classnames from 'classnames'
import { tabsClass } from '@/styles'
import AnimationHeight from '../List/AnimationHeight'
import { TabsPanelProps } from './type'

interface ITabsPanelProps extends TabsPanelProps {
    collapsed?: boolean

    collapsible?: boolean

    lazy?: boolean
}

export interface ComputedPanelComponent extends React.MemoExoticComponent<React.FC<ITabsPanelProps>> {
    IS_ETHAN_PANEL: boolean
}

// const CollapseList = List(['collapse'], 'fast')

const Panel: React.FC<ITabsPanelProps> = props => {
    const { children, isActive, collapsible, collapsed, lazy, style, background } = props

    const hasRender = useRef(false)

    if (!isActive && !hasRender.current && lazy) return null

    hasRender.current = true

    const newStyle = Object.assign({ background }, style)
    const className = classnames(tabsClass('panel', isActive && 'show'), props.className)

    const result = (
        <div style={newStyle} className={className}>
            {children}
        </div>
    )

    if (!collapsible) return result

    // 处理折叠情况
    return (
        <AnimationHeight show={!collapsed} height={!collapsed ? 'auto' : 0}>
            {result}
        </AnimationHeight>
    )
}

const ComputedPanel = (Panel as unknown) as ComputedPanelComponent

ComputedPanel.IS_ETHAN_PANEL = true

export default React.memo(ComputedPanel)
