import React, { useRef } from 'react'
import classnames from 'classnames'
import { tabsClass } from '@/styles'
import List from '../List'
import { TabsPanelProps } from './type'

export interface ComputedPabelComponent extends React.MemoExoticComponent<React.FC<TabsPanelProps>> {
    IS_ETHAN_PANEL: boolean
}

const CollapseList = List(['collapse'], 'fast')

const Panel: React.FC<TabsPanelProps> = props => {
    const { children, background, color, isActive, collapsible, collapsed, lazy } = props

    const hasRender = useRef(false)

    if (!isActive && !hasRender && lazy) return null

    hasRender.current = true

    const style = Object.assign({ background: background || '#fff', color }, props.style)
    const className = classnames(tabsClass('panel', isActive && 'show'), props.className)

    const result = (
        <div style={style} className={className}>
            {children}
        </div>
    )

    if (!collapsible) return result

    // 处理折叠情况
    return <CollapseList show={!collapsed}>{result}</CollapseList>
}

const ComputedPanel = (Panel as unknown) as ComputedPabelComponent

ComputedPanel.IS_ETHAN_PANEL = true

export default React.memo(ComputedPanel)
