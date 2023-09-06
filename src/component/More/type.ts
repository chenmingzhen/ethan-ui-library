export interface MoreProps<T = any> {
    data?: T[]
    compressed: boolean
    getItemDoms(container: HTMLElement): NodeListOf<HTMLElement>
    getMoreElement(container: HTMLElement): HTMLElement
    getContainerElement(): HTMLElement
    getMoreText?(moreNodesLen: number): string
    renderItem?: (dataItem: T, index: number) => React.ReactNode
    renderMore: (moreNodes?: React.ReactNode[]) => React.ReactNode
    children?: React.ReactNode
    onComputeFinish?: (count: number) => void
}

export interface MoreItemProps {
    children: JSX.Element
}

export interface MoreContextProps {
    showCount: number
}
