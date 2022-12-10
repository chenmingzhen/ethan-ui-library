import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import classnames from 'classnames'
import { ProImageAnimation, ProImageSliderItemProps, TouchIntent, TriggerDirectionState } from './type'
import {
    computedYAxisMoveOrScaleMovePosition,
    getAnimateOrigin,
    getCorrectedPosition,
    getPhotoTouchEdgeState,
    getSuitableImageSize,
    getTriggerDirectionState,
    handleContinueClick,
    slide2Position,
} from './util'
import Photo from './Photo'
import { START_MOVE_OFFSET } from './variables'

interface ProImageSliderItemState {
    naturalWidth: number
    naturalHeight: number
    width: number
    height: number
    rotate: number
    loaded: boolean
    error: boolean
    pending: boolean // 由于是使用函数调用的方式打开组件，如果图片已经打开过一次（浏览器中已经缓存了图片） 不需要显示Loading,避免出现loading闪烁
    clientX: number
    clientY: number
    triggerDirectionState: TriggerDirectionState
    touched: boolean
    lastMoveClientX: number // 在TriggerDirectionState.X_AXIS上，表现为startMoveClientX(开始移动的clientX)
    lastMoveClientY: number // 在TriggerDirectionState.X_AXIS上，表现为startMoveClientY(开始移动的clientY)
    currentX: number // 图片 X 偏移量 (仅在放大模式下或TriggerDirectionState.Y_AXIS移动中产生)
    currentY: number // 图片 y 偏移量(仅在放大模式下或TriggerDirectionState.Y_AXIS移动中产生)
    scale: number
}

class ProImageSliderItem extends PureComponent<ProImageSliderItemProps, ProImageSliderItemState> {
    touchIntent = TouchIntent.NONE

    constructor(props: ProImageSliderItemProps) {
        super(props)

        this.state = {
            touched: false,
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
            lastMoveClientX: undefined,
            lastMoveClientY: undefined,
            currentX: 0,
            currentY: 0,
            scale: 1,
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

    handlePhotoDoubleClick = (nextClientX: number, nextClientY: number) => {
        const { width, naturalWidth, currentX, currentY, scale } = this.state

        const position = computedYAxisMoveOrScaleMovePosition({
            currentX,
            currentY,
            nextClientX,
            nextClientY,
            fromScale: scale,
            /** 复原或放大 */
            toScale: scale !== 1 ? 1 : Math.max(2, naturalWidth / width),
        })

        this.setState({
            clientX: nextClientX,
            clientY: nextClientY,
            ...position,
            ...getCorrectedPosition(position),
        })
    }

    handlePhotoClick = handleContinueClick(this.handlePhotoSingleClick, this.handlePhotoDoubleClick)

    handleStartMove = (clientX: number, clientY: number) => {
        this.setState({ clientX, clientY, lastMoveClientX: clientX, lastMoveClientY: clientY, touched: true })
    }

    handleUp = (nextClientX: number, nextClientY: number) => {
        const { clientX, clientY, touched, currentX, currentY } = this.state
        const { active, onMouseUp } = this.props

        this.touchIntent = TouchIntent.NONE

        if (!active || !touched) return

        onMouseUp(this.state.triggerDirectionState, nextClientX, nextClientY)

        const hasMove = clientX !== nextClientX || clientY !== nextClientY

        if (!hasMove) {
            this.handlePhotoClick(nextClientX, nextClientY)
        }

        const position =
            hasMove && this.state.triggerDirectionState === TriggerDirectionState.Y_AXIS
                ? slide2Position({ currentX, currentY })
                : {}

        this.setState({
            clientX: undefined,
            clientY: undefined,
            lastMoveClientX: undefined,
            lastMoveClientY: undefined,
            touched: false,
            triggerDirectionState: TriggerDirectionState.NONE,
            ...position,
        })
    }

    handleMouseDown = (evt: React.MouseEvent) => {
        evt.preventDefault()

        const { clientX, clientY } = evt

        this.handleStartMove(clientX, clientY)
    }

    handleMouseUp = (evt: MouseEvent) => {
        const { clientX, clientY } = evt

        this.handleUp(clientX, clientY)
    }

    handleMove = (nextClientX: number, nextClientY: number) => {
        const { active, onMove } = this.props

        const {
            currentX,
            currentY,
            clientX,
            clientY,
            width,
            height,
            triggerDirectionState,
            touched,
            lastMoveClientX,
            lastMoveClientY,
        } = this.state

        if (!active || !touched) return

        if (this.touchIntent === TouchIntent.NONE) {
            /** 是否X无移动 */
            const isStayX = Math.abs(nextClientX - clientX) <= START_MOVE_OFFSET
            /** 是否Y无移动 */
            const isStayY = Math.abs(nextClientY - clientY) <= START_MOVE_OFFSET

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
        const moveX = nextClientX - lastMoveClientX
        const moveY = nextClientY - lastMoveClientY
        const { innerWidth, innerHeight } = window
        const horizontalTouchEdgeState = getPhotoTouchEdgeState(moveX, width, innerWidth)
        const verticalTouchEdgeState = getPhotoTouchEdgeState(moveY, height, innerHeight)

        const currentTriggerDirectionState = getTriggerDirectionState(
            this.touchIntent,
            horizontalTouchEdgeState,
            verticalTouchEdgeState,
            triggerDirectionState
        )

        this.setState({ triggerDirectionState: currentTriggerDirectionState })

        if (currentTriggerDirectionState !== TriggerDirectionState.NONE) {
            onMove(currentTriggerDirectionState, nextClientX, nextClientY)
        }

        if (currentTriggerDirectionState !== TriggerDirectionState.X_AXIS) {
            this.setState({
                ...computedYAxisMoveOrScaleMovePosition({ currentX, currentY, moveX, moveY, nextClientX, nextClientY }),
            })
        }
    }

    handleMouseMove = (evt: MouseEvent) => {
        const { clientX, clientY } = evt

        this.handleMove(clientX, clientY)
    }

    render() {
        const { width, height, touched, loaded, error, pending, currentX, currentY, scale } = this.state
        const { animation, proImageItem, active, style, className } = this.props

        /** X轴移动由Slider驱动，y轴移动由Item驱动 */
        const transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`

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
                        className={!touched ? proImageClass('should-transition') : undefined}
                        style={{
                            WebkitTransform: transform,
                            transform,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default ProImageSliderItem
