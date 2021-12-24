import React from 'react'
import { SpinProps } from '../Spin'

export interface LoadingInstance {
    updateVisible: React.Dispatch<React.SetStateAction<boolean>>

    updatePercent: React.Dispatch<React.SetStateAction<number>>

    updateFullScreenConfig(config: FullScreenProps): void

    updateLineConfig(config: LineLoadingProps): void
}

export interface LineLoadingProps {
    percent?: number

    height?: number

    color?: string
}

/**
 *
 */
export interface ImmatureFullScreenProps {
    loadingText?: React.ReactNode

    size?: number

    type: 'line' | SpinProps['name']
}

export type FullScreenProps = ImmatureFullScreenProps &
    Partial<Pick<LineLoadingProps, 'color'>> & { type?: SpinProps['name'] }

export interface LoadingFunc {
    fullScreen(
        props?: FullScreenProps
    ): {
        config: (configProps: FullScreenProps) => void
        destroy: () => void
    }
    start(props?: LineLoadingProps): void
    finish(): void
    upload(percent: number): void
    config(props: LineLoadingProps): void
    clear(): void
    destroy(): void
}
