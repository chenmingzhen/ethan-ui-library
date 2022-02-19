import React from 'react'

type Layout = 'links' | 'simple' | 'list' | 'jumper' | 'simple' | ((props: PaginationProps) => React.ReactNode)

export type Size = 'large' | 'default' | 'small'

export interface BasePaginationProps {
    current?: number

    pageSize?: number

    disabled?: boolean

    total: number

    text?: { prev?: string; next?: string; page?: string; jumper?: string }
}

export interface PaginationProps extends BasePaginationProps {
    defaultCurrent?: number

    align?: 'left' | 'center' | 'right'

    className?: string

    disabled?: boolean

    layouts?: Layout[]

    pageSizeList?: number[]

    onChange?: (current: number, pageSize: number) => void

    size?: Size

    style?: React.CSSProperties

    /** @todo selectedProps */
    sizeListProps?: any
}

export interface PaginationContext extends BasePaginationProps {
    onChange(newCurrent: number, newPagesize?: number): void
}

export interface ItemProps {
    onClick(page: number | string): void

    page: number | string

    isCurrent?: boolean

    className?: string

    children: React.ReactNode

    disabled: boolean
}

export interface PageSizeListProps {
    pageSizeList?: number[]

    size: Size

    /** @todo select的props参数 */
    sizeListProps: any
}

export interface JumperProps {
    size: Size

    isSimple?: boolean
}
