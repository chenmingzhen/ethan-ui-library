import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import classnames from 'classnames'
import { ProImageAnimation, ProImageSliderItemProps, TouchIntent, TriggerDirectionState } from './type'
import {
    getAnimateOrigin,
    getPhotoTouchEdgeState,
    getSuitableImageSize,
    getTriggerDirectionState,
    handleContinueClick,
} from './util'
import Photo from './Photo'
import { minStartTouchOffset } from './variables'

interface ProImageSliderItemState {
    naturalWidth: number
    naturalHeight: number
    width: number
    height: number
    rotate: number
    loaded: boolean
    error: boolean
    /** 如果image已经打开过一次 不需要显示Loading,避免出现loading闪烁 */
    pending: boolean
    clientX: number
    clientY: number
    triggerDirectionState: TriggerDirectionState
    touched: boolean
    startMoveClientX: number
    startMoveClientY: number
}

class ProImageSliderItem extends PureComponent<ProImageSliderItemProps, ProImageSliderItemState> {
    touchIntent = TouchIntent.NONE

    constructor(props: ProImageSliderItemProps) {
        super(props)

        this.state = {
            naturalWidth: 0,
            naturalHeight: 0,
            width: undefined,
            height: undefined,
            rotate: 0,
            loaded: false,
            error: false,
            pending: true,
            clientX: undefined,
            clientY: undefined,
            triggerDirectionState: TriggerDirectionState.NONE,
            startMoveClientX: undefined,
            startMoveClientY: undefined,
        }
    }

    componentDidMount() {
        super.componentDidMount()

        setTimeout(() => {
            if (this.state.loaded || this.state.error) {
                this.setState({ pending: false })
            }
        }, 0)

        window.addEventListener('mouseup', this.handleMouseUp)
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentDidUpdate(): void {
        if ((this.state.loaded || this.state.error) && this.state.pending) {
            this.setState({ pending: false })
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        window.removeEventListener('mouseup', this.handleMouseUp)
        window.removeEventListener('mousemove', this.handleMouseMove)
    }

    handleImageLoad = (evt) => {
        const { rotate } = this.state

        const { naturalWidth, naturalHeight } = evt.target

        this.setState({
            naturalHeight,
            naturalWidth,
            loaded: true,
            ...getSuitableImageSize(naturalWidth, naturalHeight, rotate),
        })
    }

    handleImageError = () => {
        this.setState({ error: true })
    }

    handlePhotoSingleClick = () => {
        const { onClick } = this.props

        onClick()
    }

    handlePhotoClick = handleContinueClick(this.handlePhotoSingleClick, () => {})

    handleMoveStart = (clientX: number, clientY: number) => {
        this.setState({ clientX, clientY, startMoveClientX: clientX, startMoveClientY: clientY, touched: true })
    }

    handleMoveEnd = (nextClientX: number, nextClientY: number) => {
        const { clientX, clientY, touched } = this.state
        const { active, onMoveEnd } = this.props

        if (!active || !touched) return

        const hasMove = clientX !== nextClientX || clientY !== nextClientY

        this.setState(
            {
                clientX: undefined,
                clientY: undefined,
                startMoveClientX: undefined,
                startMoveClientY: undefined,
                touched: false,
                triggerDirectionState: TriggerDirectionState.NONE,
            },
            () => {
                onMoveEnd(nextClientX, nextClientY)

                if (!hasMove) {
                    this.handlePhotoClick(nextClientX, nextClientY)
                }
            }
        )
    }

    handleMouseDown = (evt: React.MouseEvent) => {
        evt.preventDefault()

        const { clientX, clientY } = evt

        this.handleMoveStart(clientX, clientY)
    }

    handleMouseUp = (evt: MouseEvent) => {
        const { clientX, clientY } = evt

        this.handleMoveEnd(clientX, clientY)
    }

    handleMove = (nextClientX: number, nextClientY: number) => {
        const { active, onMove } = this.props

        const { clientX, clientY, width, height, triggerDirectionState, touched, startMoveClientX, startMoveClientY } =
            this.state

        if (!active || !touched) return

        if ((this.touchIntent = TouchIntent.NONE)) {
            /** 是否X无移动 */
            const isStayX = Math.abs(nextClientX - clientX) <= minStartTouchOffset
            /** 是否Y无移动 */
            const isStayY = Math.abs(nextClientY - clientY) <= minStartTouchOffset

            // 初始移动距离不足
            if (isStayX && isStayY) return

            /** X无移动，则看Y */
            this.touchIntent = isStayX
                ? nextClientY > clientY
                    ? TouchIntent.Y_PULL_DOWN
                    : TouchIntent.Y_PULL_UP
                : TouchIntent.X_SLIDE
        }

        /** 移动的距离 */
        const moveX = nextClientX - startMoveClientX
        const moveY = nextClientY - startMoveClientY
        const { innerWidth, innerHeight } = window
        const horizontalTouchEdgeState = getPhotoTouchEdgeState(moveX, width, innerWidth)
        const verticalTouchEdgeState = getPhotoTouchEdgeState(moveY, height, innerHeight)

        const currentTriggerDirectionState = getTriggerDirectionState(
            this.touchIntent,
            horizontalTouchEdgeState,
            verticalTouchEdgeState,
            triggerDirectionState
        )

        if (currentTriggerDirectionState !== TriggerDirectionState.NONE) {
            onMove(currentTriggerDirectionState, nextClientX, nextClientY)
        }
    }

    handleMouseMove = (evt: MouseEvent) => {
        const { clientX, clientY } = evt

        this.handleMove(clientX, clientY)
    }

    render() {
        const { width, height, loaded, error, pending } = this.state
        const { animation, proImageItem, active, style, className } = this.props

        return (
            <div className={classnames(proImageClass('item'), className)} style={style}>
                <div className={proImageClass('item-mask')} />

                <div
                    className={proImageClass('content', {
                        'zoom-in': loaded && active ? animation === ProImageAnimation.IN : false,
                        'zoom-out': loaded && active ? animation === ProImageAnimation.OUT : false,
                    })}
                    style={{ transformOrigin: loaded && active ? getAnimateOrigin(proImageItem.dom) : undefined }}
                >
                    <Photo
                        src={proImageItem.src}
                        loaded={loaded}
                        onLoad={this.handleImageLoad}
                        width={width}
                        height={height}
                        error={error}
                        pending={pending}
                        onError={this.handleImageError}
                        onMouseDown={this.handleMouseDown}
                    />
                </div>
            </div>
        )
    }
}

export default ProImageSliderItem
