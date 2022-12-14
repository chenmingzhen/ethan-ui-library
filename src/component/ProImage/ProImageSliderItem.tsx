import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import classnames from 'classnames'
import { getRangeValue } from '@/utils/numbers'
import { ProImageAnimation, ProImageSliderItemProps, TouchIntent } from './type'
import {
    computedYAxisMoveOrScaleMovePosition,
    getAnimateOrigin,
    getCorrectedPosition,
    getSuitableImageSize,
    handleContinueClick,
    scaleMoveBack2NormalArea,
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
    /** 如果图片已经打开过一次（浏览器中已经缓存了图片||函数调用的方式打开组件） 不需要显示Loading,避免出现loading闪烁 */
    pending: boolean
    /** 开始触碰的clientX */
    startClientX: number
    /** 开始触碰的clientY */
    startClientY: number
    touched: boolean
    /** 在TriggerDirectionState.X_AXIS上，表现为startClientX */
    lastClientX: number
    /** 在TriggerDirectionState.X_AXIS上，表现为startClientY */
    lastClientY: number
    /** 图片 X 偏移量 (仅在放大模式下或TriggerDirectionState.Y_AXIS移动中产生) */
    currentX: number
    /** 图片 y 偏移量(仅在放大模式下或TriggerDirectionState.Y_AXIS移动中产生) */
    currentY: number
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
            startClientX: undefined,
            startClientY: undefined,
            lastClientX: undefined,
            lastClientY: undefined,
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
        window.addEventListener('resize', this.handleResize)
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
        window.removeEventListener('resize', this.handleResize)
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
            touched: false,
            startClientX: nextClientX,
            startClientY: nextClientY,
            ...position,
            ...getCorrectedPosition(position),
        })
    }

    handlePhotoClick = handleContinueClick(this.handlePhotoSingleClick, this.handlePhotoDoubleClick)

    handleStartMove = (clientX: number, clientY: number) => {
        this.setState({
            startClientX: clientX,
            startClientY: clientY,
            lastClientX: clientX,
            lastClientY: clientY,
            touched: true,
        })
    }

    handleUp = (nextClientX: number, nextClientY: number) => {
        const { startClientX, startClientY, touched, currentX, currentY, width, height, scale } = this.state
        const { active, onMouseUp } = this.props

        const { touchIntent } = this

        this.touchIntent = TouchIntent.NONE

        if (!active || !touched) return

        onMouseUp(touchIntent, nextClientX, nextClientY)

        const hasMove = startClientX !== nextClientX || startClientY !== nextClientY

        if (!hasMove) {
            this.handlePhotoClick(nextClientX, nextClientY)
        }

        let position = {}

        if (hasMove) {
            if (touchIntent === TouchIntent.Y_MOVE) {
                position = { currentX: 0, currentY: 0 }
            }

            if (touchIntent === TouchIntent.SCALE_MOVE) {
                position = scaleMoveBack2NormalArea({ currentX, currentY, width, height, scale })
            }
        }

        this.setState({
            startClientX: undefined,
            startClientY: undefined,
            lastClientX: undefined,
            lastClientY: undefined,
            touched: false,
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

        const { currentX, currentY, startClientX, startClientY, width, touched, lastClientX, lastClientY, scale } =
            this.state

        if (!active || !touched) return

        const { innerWidth } = window

        if (this.touchIntent === TouchIntent.NONE) {
            if (scale > 1 && innerWidth * scale > width) {
                this.touchIntent = TouchIntent.SCALE_MOVE
            } else {
                /** 是否X无移动 */
                const isStayX = Math.abs(nextClientX - startClientX) <= START_MOVE_OFFSET
                /** 是否Y无移动 */
                const isStayY = Math.abs(nextClientY - startClientY) <= START_MOVE_OFFSET

                // 初始移动距离不足
                if (isStayX && isStayY) return

                /** X无移动，则看Y */
                this.touchIntent = isStayX ? TouchIntent.Y_MOVE : TouchIntent.X_SLIDE
            }
        }

        if (this.touchIntent === TouchIntent.X_SLIDE) {
            onMove(TouchIntent.X_SLIDE, nextClientX, nextClientY)
        }

        if ([TouchIntent.Y_MOVE, TouchIntent.SCALE_MOVE].includes(this.touchIntent)) {
            /** 移动的距离 */
            const moveX = nextClientX - lastClientX
            const moveY = nextClientY - lastClientY

            if (this.touchIntent === TouchIntent.Y_MOVE) {
                onMove(TouchIntent.Y_MOVE, nextClientX, nextClientY)
            }

            this.setState({
                ...computedYAxisMoveOrScaleMovePosition({
                    currentX,
                    currentY,
                    moveX,
                    moveY,
                    nextClientX,
                    nextClientY,
                    fromScale: scale,
                    toScale: scale,
                }),
            })
        }
    }

    handleMouseMove = (evt: MouseEvent) => {
        const { clientX, clientY } = evt

        this.handleMove(clientX, clientY)
    }

    handleWheel = (evt: React.WheelEvent<HTMLImageElement>) => {
        const { clientX, clientY, deltaY } = evt
        const { width, naturalWidth, currentX, currentY, scale } = this.state

        if (this.touchIntent !== TouchIntent.NONE) {
            return
        }

        const position = computedYAxisMoveOrScaleMovePosition({
            currentX,
            currentY,
            nextClientX: clientX,
            nextClientY: clientY,
            fromScale: scale,
            toScale: getRangeValue({ current: scale - deltaY / 100 / 2, max: naturalWidth / width, min: 1 }),
        })

        this.setState({ startClientX: clientX, startClientY: clientY, ...position, ...getCorrectedPosition(position) })
    }

    handleResize = () => {
        const { onResize } = this.props
        const { loaded, naturalWidth, naturalHeight, rotate } = this.state

        if (loaded) {
            this.setState(getSuitableImageSize(naturalWidth, naturalHeight, rotate))

            onResize()
        }
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
                        'zoom-in': loaded && active ? animation === ProImageAnimation.OPEN : false,
                        'zoom-out': loaded && active ? animation === ProImageAnimation.CLOSE : false,
                    })}
                    style={{
                        transformOrigin: loaded && active ? getAnimateOrigin(proImageItem.getElement?.()) : undefined,
                    }}
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
                        onWheel={this.handleWheel}
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
