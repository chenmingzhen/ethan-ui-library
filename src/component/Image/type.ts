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
}

export interface IImageProps extends ImageProps {
    onTouchStart(e)
    onTouchEnd(e)
}
