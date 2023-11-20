export interface MoreProps<T extends Record<any, any> = {}> {
    data?: T[]
    compressed?: boolean
    getMoreElement(container: HTMLElement): HTMLElement
    getContainerElement(): HTMLElement
    getMoreText?(moreNodesLen: number): string
    renderItem?: (dataItem: T, index: number) => JSX.Element
    renderMore: (moreNodes?: React.ReactNode[]) => React.ReactNode
    onComputeFinish?: (count: number) => void
    itemKey?: string
}

export interface MoreItemProps {
    children: JSX.Element
    itemKey: React.Key
}

export interface MoreContextProps {
    showCount: number
}

export interface MoreItemContextProps {
    ['data-more-item-key']: React.Key
}
