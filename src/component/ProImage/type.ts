import EventBus from '@/utils/EventBus'
import React from 'react'
import { ImageProps } from '../Image/type'

export interface ProImageCommonProps {
    backdropOpacity?: number
    defaultIndex?: number
}

export interface ProImageProps
    extends Omit<ImageProps, 'target'>,
        Pick<PhotoProps, 'loadingElement' | 'errorElement'>,
        Omit<ProImageCommonProps, 'defaultIndex'> {
    intro?: string
}

export interface ProImageItem extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    src: string
    intro?: string
    key: React.Key
    getElement?: () => HTMLElement
}

export interface ProImageSliderProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'>, ProImageCommonProps {
    proImageItems: ProImageItem[]
    currentIndex?: number
    defaultIndex?: number
    visible?: boolean
    esc?: boolean
    onClose?(): void
    onIndexChange?(index: number): void
}

export interface ProImageContextProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    addImage(item: ProImageItem): void
    removeImage(key: string): void
    onShow(key: string): void
}

export interface ProImageGroupProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'>, ProImageCommonProps {
    children: React.ReactNode
}

export enum ProImageAnimation {
    OPEN,
    CLOSE,
    NONE,
}

export interface ProImageSliderItemProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    proImageItem: ProImageItem
    animation: ProImageAnimation
    active: boolean
    style?: React.CSSProperties
    className?: string
    eventBus: ReturnType<typeof EventBus<ProImageSliderEvent>>
    onResize(): void
    onClick(): void
    onMouseUp(touchIntent: TouchIntent, clientX: number, clientY: number): void
    onMove(touchIntent: TouchIntent, clientX: number, clientY: number): void
}

export interface PhotoProps extends React.HTMLAttributes<HTMLImageElement> {
    src: string
    loaded: boolean
    error: boolean
    width: number
    height: number
    pending: boolean
    onLoad(evt): void
    onError(): void
    loadingElement?: JSX.Element
    errorElement?: JSX.Element
}

export enum TouchIntent {
    NONE,
    /** X轴正常滑动 */
    X_SLIDE,
    /** Y轴正常移动 */
    Y_MOVE,
    /** 缩放移动 */
    SCALE_MOVE,
}

/** 缩放后图片接触边界的类型  */
export enum ScalePhotoTouchEdgeState {
    /** 触碰到顶部或左边 */
    TOP_LEFT,
    /** 触碰到底部或右边 */
    BOTTOM_RIGHT,
    /** 未触碰到 */
    NOT_TOUCH,
}

export enum ProImageSlideEventKey {
    ROTATE_CHANGE,
    SCALE_CHANGE,
}

export interface ProImageSliderEvent {
    [ProImageSlideEventKey.ROTATE_CHANGE]: number | undefined
    [ProImageSlideEventKey.SCALE_CHANGE]: number | undefined
}
