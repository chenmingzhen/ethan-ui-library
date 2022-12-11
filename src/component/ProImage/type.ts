import React from 'react'
import { ImageProps } from '../Image/type'

export interface ProImageProps extends Omit<ImageProps, 'target'>, Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    intro?: string
}

export interface ProImageItem extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    src: string
    intro?: string
    key: string
    dom: HTMLDivElement
}

export interface ProImageSliderProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    proImageItems: ProImageItem[]
    currentIndex: number
    onClose(): void
}

export interface ProImageContextProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    addImage(item: ProImageItem): void
    removeImage(key: string): void
    onShow(key: string): void
}

export interface ProImageGroupProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    children: React.ReactNode
}

export enum ProImageAnimation {
    IN,
    OUT,
    NONE,
}

export interface ProImageSliderItemProps extends Pick<PhotoProps, 'loadingElement' | 'errorElement'> {
    proImageItem: ProImageItem
    animation: ProImageAnimation
    active: boolean
    style?: React.CSSProperties
    className?: string
    onResize(): void
    onClick(): void
    onMouseUp(triggerDirectionState: TriggerDirectionState, clientX: number, clientY: number): void
    onMove(triggerDirectionState: TriggerDirectionState, clientX: number, clientY: number): void
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

export enum CloseEdgeEnum {
    NORMAL_SIZE_SLIDE,
}

/** 滑动时候的移动 */
export enum TouchIntent {
    NONE,
    X_SLIDE, // x轴正常滑动
    Y_PULL_DOWN, // 下拉
    Y_PULL_UP, // 上拉
}

/** 缩放后图片接触边界的类型  */
export enum ScalePhotoTouchEdgeState {
    NONE, // 未缩放
    TOP_LEFT, // 触碰到顶部或左边
    BOTTOM_RIGHT, // 触碰到底部或右边
    NOT_TOUCH, // 未触碰到
}

/** 触发事件的方向 */
export enum TriggerDirectionState {
    NONE,
    X_AXIS,
    Y_AXIS,
}
