import React from 'react'
import Tabs from './Tabs'
import Panel from './Panel'
import { TabsProps } from './type'

export * from './type'

export interface ComputedTabsComponent extends React.ClassicComponentClass<TabsProps> {
    Panel: typeof Panel
}

const ComputedTabs = (Tabs as unknown) as ComputedTabsComponent

ComputedTabs.Panel = Panel

export default ComputedTabs
