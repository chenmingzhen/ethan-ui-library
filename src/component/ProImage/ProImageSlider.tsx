import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { proImageClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import { ProImageAnimation, ProImageSliderProps, TriggerDirectionState } from './type'
import Icons from '../icons'
import ProImageSliderItem from './ProImageSliderItem'
import { DEFAULT_OPACITY, DRAG_CLOSE_RATIO, HORIZONTAL_PHOTO_OFFSET, SLIDE_MOVE_OFFSET } from './variables'

interface ProImageSliderState {
    translateX: number
    animation: ProImageAnimation
    currentIndex: number
    visible: boolean
    backdropOpacity: number
    overlayVisible: boolean
    startMoveClientX: number
    startMoveClientY: number
    touched: boolean
}

class ProImageSlider extends PureComponent<ProImageSliderProps, ProImageSliderState> {
    originalBodyOverflow: React.CSSProperties['overflow']

    get displayedImages() {
        const { currentIndex } = this.state
        const { proImageItems } = this.props

        /** 加载相邻三张 */
        return proImageItems.slice(Math.max(currentIndex - 1, 0), Math.min(currentIndex + 1, proImageItems.length) + 1)
    }

    constructor(props: ProImageSliderProps) {
        super(props)

        const { currentIndex } = props

        this.state = {
            translateX: currentIndex * -(window.innerWidth + HORIZONTAL_PHOTO_OFFSET),
            animation: ProImageAnimation.IN,
            currentIndex,
            visible: true,
            backdropOpacity: DEFAULT_OPACITY,
            overlayVisible: false,
            startMoveClientX: undefined,
            startMoveClientY: undefined,
            touched: false,
        }
    }

    componentDidMount() {
        const { style } = document.body.parentNode as HTMLElement

        this.originalBodyOverflow = style.overflow

        style.overflow = 'hidden'
    }

    componentWillUnmount() {
        const { style } = document.body.parentNode as HTMLElement

        style.overflow = this.originalBodyOverflow
    }

    handleClose = () => {
        this.setState({ animation: ProImageAnimation.OUT })
    }

    handleBgAnimationEnd = () => {
        const { onClose } = this.props

        this.setDraftState((state) => {
            if (state.animation === ProImageAnimation.OUT) {
                state.visible = false

                onClose()
            }

            state.animation = ProImageAnimation.NONE
        })
    }

    handleIndexChange = (nextIndex: number) => {
        const { innerWidth } = window

        const translateX = nextIndex * -(innerWidth + HORIZONTAL_PHOTO_OFFSET)

        this.setState({ translateX, currentIndex: nextIndex })
    }

    handleNext = () => {
        const { proImageItems } = this.props
        const { currentIndex } = this.state

        if (currentIndex < proImageItems.length - 1) {
            this.handleIndexChange(currentIndex + 1)
        }
    }

    handlePrevious = () => {
        const { currentIndex } = this.state

        if (currentIndex > 0) {
            this.handleIndexChange(currentIndex - 1)
        }
    }

    handlePhotoClick = () => {
        const { overlayVisible } = this.state

        this.setState({ overlayVisible: !overlayVisible })
    }

    handleHorizontalMove = (clientX: number) => {
        const { innerWidth } = window
        const { proImageItems } = this.props

        this.setDraftState((state) => {
            state.touched = true

            if (state.startMoveClientX === undefined) {
                state.startMoveClientX = clientX
            }

            const originOffsetClientX = clientX - state.startMoveClientX

            let offsetClientX = originOffsetClientX

            if (
                (state.currentIndex === 0 && originOffsetClientX > 0) ||
                (state.currentIndex === proImageItems.length - 1 && originOffsetClientX < 0)
            ) {
                offsetClientX = originOffsetClientX / 2
            }

            state.translateX = -(innerWidth + HORIZONTAL_PHOTO_OFFSET) * state.currentIndex + offsetClientX
        })
    }

    handleVerticalMove = (clientY: number) => {
        this.setDraftState((state) => {
            state.touched = true

            if (state.startMoveClientY === undefined) {
                state.startMoveClientY = clientY
            }

            const offsetClientY = Math.abs(clientY - state.startMoveClientY)

            const backdropOpacity = getRangeValue({
                max: DEFAULT_OPACITY,
                current: DEFAULT_OPACITY - offsetClientY / 100 / 6,
            })

            state.backdropOpacity = backdropOpacity
        })
    }

    handleSliderItemMove = (triggerDirectionState: TriggerDirectionState, clientX: number, clientY: number) => {
        if (triggerDirectionState === TriggerDirectionState.X_AXIS) {
            this.handleHorizontalMove(clientX)
        } else if (triggerDirectionState === TriggerDirectionState.Y_AXIS) {
            this.handleVerticalMove(clientY)
        }
    }

    handleSliderItemUp = (triggerDirectionState: TriggerDirectionState, clientX: number, clientY: number) => {
        const { proImageItems } = this.props
        const { startMoveClientX, currentIndex, startMoveClientY } = this.state

        const offsetClientX = clientX - startMoveClientX
        const offsetClientY = clientY - startMoveClientY

        this.setState({ startMoveClientX: undefined, startMoveClientY: undefined, touched: false })

        if (triggerDirectionState === TriggerDirectionState.X_AXIS) {
            if (offsetClientX < -SLIDE_MOVE_OFFSET && currentIndex < proImageItems.length - 1) {
                this.handleIndexChange(currentIndex + 1)

                return
            }

            if (offsetClientX > SLIDE_MOVE_OFFSET && currentIndex > 0) {
                this.handleIndexChange(currentIndex - 1)

                return
            }

            /** 两端处理 */
            const singlePageWidth = window.innerWidth + HORIZONTAL_PHOTO_OFFSET
            const nextTranslateX = -singlePageWidth * currentIndex
            const nextIndex = currentIndex

            this.setState({
                translateX: nextTranslateX,
                currentIndex: nextIndex,
            })

            return
        }

        if (
            triggerDirectionState === TriggerDirectionState.Y_AXIS &&
            Math.abs(offsetClientY) > window.innerHeight * DRAG_CLOSE_RATIO
        ) {
            this.handleClose()
        }
    }

    render() {
        const { proImageItems, loadingElement, errorElement } = this.props

        const { translateX, animation, visible, currentIndex, backdropOpacity, overlayVisible, touched } = this.state

        if (!visible) return null

        const currentImage = proImageItems[currentIndex]
        const intro = currentImage && currentImage.intro
        const { innerWidth } = window
        const transform = `translate3d(${translateX}px, 0px, 0)`
        const { length } = proImageItems
        const isOverlayVisible = overlayVisible && animation === ProImageAnimation.NONE

        return (
            <div
                className={classnames(
                    proImageClass(
                        '_',
                        animation === ProImageAnimation.OUT && 'close',
                        !isOverlayVisible && 'hide-overlay'
                    )
                )}
            >
                <div
                    className={proImageClass('bg', {
                        'fade-in': animation === ProImageAnimation.IN,
                        'fade-out': animation === ProImageAnimation.OUT,
                    })}
                    style={{
                        background: `rgba(0, 0, 0, ${backdropOpacity})`,
                    }}
                    onAnimationEnd={this.handleBgAnimationEnd}
                />

                <div className={proImageClass('toolbar')}>
                    <div className={proImageClass('counter')}>
                        {currentIndex + 1} / {proImageItems.length}
                    </div>

                    <div className={proImageClass('buttons')}>
                        <span className={proImageClass('icon magnify')}>{Icons.Magnify}</span>

                        <span className={proImageClass('icon shrink')}>{Icons.Shrink}</span>

                        <span className={proImageClass('icon rotate')}>{Icons.Rotate}</span>

                        <span onClick={this.handleClose} className={proImageClass('icon')}>
                            {Icons.Close}
                        </span>
                    </div>
                </div>

                {this.displayedImages.map((item, index) => {
                    const realIndex = currentIndex === 0 ? currentIndex + index : currentIndex - 1 + index

                    return (
                        <ProImageSliderItem
                            style={{
                                /** 每个PhotoView设置对应的Left，通过Transform的改变去驱动位置的更新 */
                                left: `${(innerWidth + HORIZONTAL_PHOTO_OFFSET) * realIndex}px`,
                                WebkitTransform: transform,
                                transform,
                            }}
                            className={!touched ? proImageClass('should-transition') : undefined}
                            proImageItem={item}
                            animation={animation}
                            key={item.key}
                            active={realIndex === currentIndex}
                            loadingElement={loadingElement || item.loadingElement}
                            errorElement={errorElement || item.errorElement}
                            onClick={this.handlePhotoClick}
                            onMove={this.handleSliderItemMove}
                            onMouseUp={this.handleSliderItemUp}
                        />
                    )
                })}

                <>
                    {currentIndex !== 0 && (
                        <div className={proImageClass('angle-left')} onClick={this.handlePrevious}>
                            {Icons.AngleLeft}
                        </div>
                    )}
                    {currentIndex + 1 < length && (
                        <div className={proImageClass('angle-right')} onClick={this.handleNext}>
                            {Icons.AngleRight}
                        </div>
                    )}
                </>

                {intro && <div className={proImageClass('footer')}>{intro}</div>}
            </div>
        )
    }
}

export default ProImageSlider
