export interface LoadingInstance {
    updateState(state: Partial<LoadingState> | ((prevState: LoadingState) => Partial<LoadingState>)): void
}

export interface LoadingProps {
    percent?: number
    height?: number
    color?: string
}

export interface LoadingState {
    visible: boolean
    percent: number
    height: number
    color: string
}
