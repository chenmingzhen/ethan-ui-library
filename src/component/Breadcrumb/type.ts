export interface BreadcrumbData {
    onClick?(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)

    url?: string

    icon?: React.ReactNode

    title?: React.ReactNode
}

export interface BreadcrumbProps {
    separator?: string

    data: BreadcrumbData[]

    className?: string

    renderItem?(item: BreadcrumbData): React.ReactNode

    style?: React.CSSProperties
}
