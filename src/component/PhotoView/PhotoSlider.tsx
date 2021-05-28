import React from 'react'
import { PureComponent } from '@/utils/component'
import { photoViewClass } from '@/styles'
import PhotoView from './PhotoView'
import SlideWrap from './SlideWrap'
import VisibleAnimationHandle from './VisibleAnimationHandle'
import Icons from '../icons'
import { isTouchDevice } from './utils'
import { DataType, PhotoProviderBase, OverlayRenderProps, ReachTypeEnum, ShowAnimateEnum } from './types'
import { defaultOpacity, horizontalOffset, maxMoveOffset } from './variables'

const { Close, AngleLeft, AngleRight } = Icons

export interface PhotoSliderProps extends PhotoProviderBase {
    // 图片列表
    images: DataType[]
    // 图片当前索引
    index?: number
    // 可见
    visible: boolean
    // 关闭事件
    onClose: (evt?: React.MouseEvent | React.TouchEvent) => void
    // 索引改变回调
    onIndexChange?: any
}

type PhotoSliderState = {
    // 偏移量
    translateX: number
    // 图片当前的 index
    photoIndex: number
    // 图片处于触摸的状态
    touched: boolean
    // 该状态是否需要 transition
    shouldTransition: boolean
    // Reach 开始时 x 坐标
    lastClientX: number | undefined
    // Reach 开始时 y 坐标
    lastClientY: number | undefined
    // 背景透明度
    backdropOpacity: number
    // 上次关闭的背景透明度
    lastBackdropOpacity: number
    // 覆盖物可见度
    overlayVisible: boolean
    // 可下拉关闭
    canPullClose: boolean
    // 旋转集合
    rotatingMap: Map<number, number>
}
export default class PhotoSlider extends PureComponent<PhotoSliderProps, PhotoSliderState> {
    static displayName = 'PhotoSlider'

    static defaultProps = {
        maskClosable: true,
        photoClosable: false,
        bannerVisible: true,
        introVisible: true,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.index !== undefined && nextProps.index !== prevState.photoIndex) {
            return {
                photoIndex: nextProps.index,
                translateX: -(window.innerWidth + horizontalOffset) * nextProps.index,
            }
        }
        return null
    }

    constructor(props) {
        super(props)

        this.state = {
            translateX: 0,
            photoIndex: 0,
            touched: false,
            shouldTransition: true,

            lastClientX: undefined,
            lastClientY: undefined,
            backdropOpacity: defaultOpacity,
            lastBackdropOpacity: defaultOpacity,
            overlayVisible: true,
            canPullClose: true,

            rotatingMap: new Map<number, number>(),
        }
    }

    componentDidMount() {
        const { index = 0 } = this.props
        this.setState({
            translateX: index * -(window.innerWidth + horizontalOffset),
            photoIndex: index,
        })
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleClose = (evt?: React.MouseEvent | React.TouchEvent) => {
        const { onClose } = this.props
        const { backdropOpacity } = this.state

        onClose(evt)

        this.setState({
            overlayVisible: true,
            // 记录当前关闭时的透明度
            lastBackdropOpacity: backdropOpacity,
        })
    }

    handlePhotoTap = () => {
        const { photoClosable } = this.props
        if (photoClosable) {
            this.handleClose()
        } else {
            this.setState(prevState => ({
                overlayVisible: !prevState.overlayVisible,
            }))
        }
    }

    handlePhotoMaskTap = () => {
        const { maskClosable } = this.props
        if (maskClosable) {
            this.handleClose()
        }
    }

    handleResize = () => {
        const { innerWidth } = window
        this.setState(({ photoIndex }) => {
            return {
                translateX: -(innerWidth + horizontalOffset) * photoIndex,
                lastClientX: undefined,
                lastClientY: undefined,
                shouldTransition: false,
            }
        })
    }

    handleRotate = (rotating: number) => {
        const { photoIndex, rotatingMap } = this.state

        rotatingMap.set(photoIndex, rotating)

        this.setState({
            rotatingMap,
        })
    }

    handleKeyDown = (evt: KeyboardEvent) => {
        const { visible } = this.props

        if (visible) {
            switch (evt.key) {
                case 'ArrowLeft':
                    this.handlePrevious(false)
                    break
                case 'ArrowRight':
                    this.handleNext(false)
                    break
                case 'Escape':
                    this.handleClose()
                    break
                default:
            }
        }
    }

    handleReachVerticalMove = (clientY, scale) => {
        this.setState(({ lastClientY, backdropOpacity }) => {
            if (lastClientY === undefined) {
                return {
                    touched: true,
                    lastClientY: clientY,
                    backdropOpacity,
                    canPullClose: true,
                }
            }
            const offsetClientY = Math.abs(clientY - lastClientY)
            const opacity = Math.max(Math.min(defaultOpacity, defaultOpacity - offsetClientY / 100 / 4), 0)
            return {
                touched: true,
                lastClientY,
                backdropOpacity: scale === 1 ? opacity : defaultOpacity,
                canPullClose: scale === 1,
            }
        })
    }

    handleReachHorizontalMove = clientX => {
        const { innerWidth } = window
        const { images } = this.props
        this.setState(({ lastClientX, translateX, photoIndex }) => {
            if (lastClientX === undefined) {
                return {
                    touched: true,
                    lastClientX: clientX,
                    translateX,
                    shouldTransition: true,
                }
            }
            const originOffsetClientX = clientX - lastClientX
            let offsetClientX = originOffsetClientX

            // 第一张和最后一张超出距离减半
            if (
                (photoIndex === 0 && originOffsetClientX > 0) ||
                (photoIndex === images.length - 1 && originOffsetClientX < 0)
            ) {
                offsetClientX = originOffsetClientX / 2
            }
            return {
                touched: true,
                lastClientX,
                translateX: -(innerWidth + horizontalOffset) * photoIndex + offsetClientX,
                shouldTransition: true,
            }
        })
    }

    handleIndexChange = (photoIndex: number, shouldTransition = true) => {
        const singlePageWidth = window.innerWidth + horizontalOffset
        const translateX = -singlePageWidth * photoIndex
        const { onIndexChange } = this.props

        this.setState({
            touched: false,
            lastClientX: undefined,
            lastClientY: undefined,
            translateX,
            photoIndex,
            shouldTransition,
        })

        if (onIndexChange) {
            onIndexChange(photoIndex)
        }
    }

    handlePrevious = (shouldTransition?: boolean) => {
        const { photoIndex } = this.state
        if (photoIndex > 0) {
            this.handleIndexChange(photoIndex - 1, shouldTransition)
        }
    }

    handleNext = (shouldTransition?: boolean) => {
        const { images } = this.props
        const { photoIndex } = this.state
        if (photoIndex < images.length - 1) {
            this.handleIndexChange(photoIndex + 1, shouldTransition)
        }
    }

    handleReachMove = (reachState: ReachTypeEnum, clientX: number, clientY: number, scale?: number) => {
        if (reachState === ReachTypeEnum.XReach) {
            this.handleReachHorizontalMove(clientX)
        } else if (reachState === ReachTypeEnum.YReach) {
            this.handleReachVerticalMove(clientY, scale)
        }
    }

    handleReachUp = (clientX: number, clientY: number) => {
        const { images } = this.props
        const { lastClientX = clientX, lastClientY = clientY, photoIndex, overlayVisible, canPullClose } = this.state

        const offsetClientX = clientX - lastClientX
        const offsetClientY = clientY - lastClientY
        let willClose = false
        // 下一张
        if (offsetClientX < -maxMoveOffset && photoIndex < images.length - 1) {
            this.handleIndexChange(photoIndex + 1)
            return
        }
        // 上一张
        if (offsetClientX > maxMoveOffset && photoIndex > 0) {
            this.handleIndexChange(photoIndex - 1)
            return
        }
        const singlePageWidth = window.innerWidth + horizontalOffset

        // 当前偏移
        const currentTranslateX = -singlePageWidth * photoIndex
        const currentPhotoIndex = photoIndex

        if (Math.abs(offsetClientY) > window.innerHeight * 0.14 && canPullClose) {
            willClose = true
            this.handleClose()
        }
        this.setState({
            touched: false,
            translateX: currentTranslateX,
            photoIndex: currentPhotoIndex,
            lastClientX: undefined,
            lastClientY: undefined,
            backdropOpacity: defaultOpacity,
            overlayVisible: willClose ? true : overlayVisible,
        })
    }

    render() {
        const {
            images,
            visible,
            className = '',
            maskClassName,
            viewClassName,
            imageClassName,
            bannerVisible,
            introVisible,
            overlayRender,
            toolbarRender,
            loadingElement,
            brokenElement,
        } = this.props
        const {
            translateX,
            touched,
            photoIndex,
            backdropOpacity,
            lastBackdropOpacity,
            overlayVisible,
            rotatingMap,
            shouldTransition,
        } = this.state
        const imageLength = images.length
        const currentImage = images.length ? images[photoIndex] : undefined
        const transform = `translate3d(${translateX}px, 0px, 0)`
        // Overlay
        const overlayIntro = currentImage && currentImage.intro

        return (
            <VisibleAnimationHandle visible={visible} currentImage={currentImage}>
                {({ photoVisible, showAnimateType, originRect, onShowAnimateEnd }) => {
                    if (photoVisible) {
                        const { innerWidth } = window
                        const currentOverlayVisible = overlayVisible && showAnimateType === ShowAnimateEnum.None
                        // 关闭过程中使用下拉保存的透明度
                        const currentOpacity = visible ? backdropOpacity : lastBackdropOpacity
                        // 覆盖物参数
                        const overlayParams: OverlayRenderProps = {
                            images,
                            index: photoIndex,
                            visible,
                            onClose: this.handleClose,
                            onIndexChange: this.handleIndexChange,
                            overlayVisible: currentOverlayVisible,
                            onRotate: this.handleRotate,
                            rotate: rotatingMap.get(photoIndex) || 0,
                        }

                        const sliderWrapClassName = `${photoViewClass({
                            'photoSlider-clean': !currentOverlayVisible,
                            'photoSlider-will-close': !visible,
                        })} ${className}`

                        return (
                            <SlideWrap
                                className={sliderWrapClassName}
                                role="dialog"
                                id="PhotoView_Slider"
                                onClick={e => e.stopPropagation()}
                            >
                                <div
                                    className={photoViewClass('photoSlider photoSlider-backdrop', {
                                        maskClassName,
                                        'photoSlider-fadeIn': showAnimateType === ShowAnimateEnum.In,
                                        'photoSlider-fadeOut': showAnimateType === ShowAnimateEnum.Out,
                                    })}
                                    style={{
                                        background: `rgba(0, 0, 0, ${currentOpacity})`,
                                    }}
                                    onAnimationEnd={onShowAnimateEnd}
                                />
                                {bannerVisible && (
                                    <div className={photoViewClass('photoSlider-banner-wrap')}>
                                        <div className={photoViewClass('photoSlider-counter')}>
                                            {photoIndex + 1} / {imageLength}
                                        </div>
                                        <div className={photoViewClass('photoSlider-banner-right')}>
                                            {toolbarRender && toolbarRender(overlayParams)}
                                            <div
                                                onClick={this.handleClose}
                                                className={photoViewClass('photoSlider-toolbar-icon')}
                                            >
                                                {Close}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {images
                                    .slice(
                                        // 加载相邻三张
                                        Math.max(photoIndex - 1, 0),
                                        Math.min(photoIndex + 2, imageLength + 1)
                                    )
                                    .map((item: DataType, index) => {
                                        // 截取之前的索引位置
                                        const realIndex = photoIndex === 0 ? photoIndex + index : photoIndex - 1 + index
                                        return (
                                            <PhotoView
                                                key={item.key || realIndex}
                                                src={item.src}
                                                onReachMove={this.handleReachMove}
                                                onReachUp={this.handleReachUp}
                                                onPhotoTap={this.handlePhotoTap}
                                                onMaskTap={this.handlePhotoMaskTap}
                                                viewClassName={viewClassName}
                                                className={imageClassName}
                                                style={{
                                                    left: `${(innerWidth + horizontalOffset) * realIndex}px`,
                                                    WebkitTransform: transform,
                                                    transform,
                                                    transition:
                                                        touched || !shouldTransition
                                                            ? undefined
                                                            : 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                }}
                                                loadingElement={loadingElement}
                                                brokenElement={brokenElement}
                                                onPhotoResize={this.handleResize}
                                                isActive={photoIndex === realIndex}
                                                showAnimateType={showAnimateType}
                                                originRect={originRect}
                                                rotate={rotatingMap.get(realIndex) || 0}
                                            />
                                        )
                                    })}
                                {!isTouchDevice && bannerVisible && (
                                    <>
                                        {photoIndex !== 0 && (
                                            <div
                                                className={photoViewClass('photoSlider-angle-left')}
                                                onClick={() => this.handlePrevious(false)}
                                            >
                                                {AngleLeft}
                                            </div>
                                        )}
                                        {photoIndex + 1 < imageLength && (
                                            <div
                                                className={photoViewClass('photoSlider-angle-right')}
                                                onClick={() => this.handleNext(false)}
                                            >
                                                {AngleRight}
                                            </div>
                                        )}
                                    </>
                                )}
                                {Boolean(introVisible && overlayIntro) && (
                                    <div className={photoViewClass('photoSlider-footer-wrap')}>{overlayIntro}</div>
                                )}
                                {overlayRender && overlayRender(overlayParams)}
                            </SlideWrap>
                        )
                    }
                    return null
                }}
            </VisibleAnimationHandle>
        )
    }
}
