import React, { useRef } from 'react'
import classnames from 'classnames'
import { tabsClass } from '@/styles'
import List from '../List'
import { TabsPanelProps } from './type'

export interface ComputedPanelComponent extends React.MemoExoticComponent<React.FC<TabsPanelProps>> {
    IS_ETHAN_PANEL: boolean
}

const CollapseList = List(['collapse'], 'fast')

const Panel: React.FC<TabsPanelProps> = props => {
    const { children, isActive, collapsible, collapsed, lazy, style, background, color } = props

    const hasRender = useRef(false)

    if (!isActive && !hasRender.current && lazy) return null

    hasRender.current = true

    const newStyle = Object.assign({ background, color }, style)
    const className = classnames(tabsClass('panel', isActive && 'show'), props.className)

    const result = (
        <div style={newStyle} className={className}>
            {children}
        </div>
    )

    if (!collapsible) return result

    // 处理折叠情况
    return <CollapseList show={!collapsed}>{result}</CollapseList>
}

const ComputedPanel = (Panel as unknown) as ComputedPanelComponent

ComputedPanel.IS_ETHAN_PANEL = true

export default React.memo(ComputedPanel)
