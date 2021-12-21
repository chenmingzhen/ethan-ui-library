import { SpinProps } from '../Spin'

export interface LoadingInstance {
    updateVisible: React.Dispatch<React.SetStateAction<boolean>>

    updatePercent: React.Dispatch<React.SetStateAction<number>>

    updateFullScreenConfig
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
    loadingText?: string

    size?: number

    type: 'line' | SpinProps['name']
}

export type FullScreenProps = ImmatureFullScreenProps & Pick<LineLoadingProps, 'color'> & { type: SpinProps['name'] }

export interface LoadingFunc {
    fullScreen(
        props: FullScreenProps
    ): {
        config: (configProps: FullScreenProps) => void
        destroy: () => void
    }
    start(props: LineLoadingProps): void
    finish(): void
    upload(percent: number): void
    config(props: LineLoadingProps): void
    destroy(): void
}
