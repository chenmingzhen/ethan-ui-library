import { ImageProps } from '../Image/type'

export interface ProImageProps extends ImageProps {
    intro?: string
}

export interface ProImageItem {
    src: string
    intro?: string
    key: string
    dom: HTMLDivElement
}

export interface ProImageSliderProps {
    proImageItems: ProImageItem[]
    current: number
    onClose(): void
}

export interface ProImageContextProps {
    addImage(item: ProImageItem): void
    removeImage(key: string): void
    onShow(key: string): void
}

export interface ProImageGroupProps {}

export enum ProImageAnimation {
    IN,
    OUT,
    NONE,
}

export interface ProImageSliderItemProps {
    proImageItem: ProImageItem
    animation: ProImageAnimation
}

export interface OriginRect {
    clientX: number
    clientY: number
}
