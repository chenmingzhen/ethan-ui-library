import { ReactNode } from 'react'
import { SpinProps } from '../Spin'

export interface ImageProps {
    /** 加载失败时的备用地址 */
    alt?: string
    className?: string
    height?: number | string
    width?: number | string
    /** 缩略图 */
    thumbnail?: string
    lazy?: boolean | number
    onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void
    placeholder?: ReactNode | string
    shape?: 'rounded' | 'circle' | 'thumbnail'
    /** 原图 */
    src?: string
    style?: React.CSSProperties
    target?: '_blank' | '_sele' | '_modal' | '_download'
    title?: string
    /** 目标容器 */
    getContainer?: () => HTMLElement
    /** 图片出错的展示 */
    error?: ReactNode
    spinProps?: SpinProps
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export interface IImageProps extends ImageProps {
    onTouchStart(e)
    onTouchEnd(e)
}

export interface GroupProps {
    /** 是否堆叠 */
    pile?: boolean
    lazy?: boolean
    /** 单个图片高度(值为百分比时，对比值为图片宽度) */
    height?: number | string
    width?: number | string
    target?: '_modal' | '_blank' | '_self' | '_download'
    style?: React.CSSProperties
}

export interface ImageItem {
    key: string | number
    src: string
}

export interface MagnifyProps {
    src: string
    position: string
}

export interface GalleryProps {
    onClose(e: any): void
    current: number
    images: ImageItem[]
}
