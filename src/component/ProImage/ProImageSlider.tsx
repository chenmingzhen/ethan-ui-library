import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { proImageClass } from '@/styles'
import { ProImageAnimation, ProImageSliderProps } from './type'
import Icons from '../icons'
import ProImageSliderItem from './ProImageSliderItem'

interface ProImageSliderState {
    translateX: number
    animationVisible: boolean
    animation: ProImageAnimation
    currentIndex: number
    visible: boolean
}

class ProImageSlider extends PureComponent<ProImageSliderProps, ProImageSliderState> {
    originalBodyOverflow: React.CSSProperties['overflow']

    get displayedImages() {
        const { currentIndex } = this.state
        const { proImageItems } = this.props

        return proImageItems.slice(
            // 加载相邻三张
            Math.max(currentIndex - 1, 0),
            Math.min(currentIndex + 2, proImageItems.length + 1)
        )
    }

    constructor(props) {
        super(props)

        this.state = {
            translateX: 0,
            animationVisible: true,
            animation: ProImageAnimation.IN,
            currentIndex: 0,
            visible: true,
        }
    }

    componentDidMount() {
        const { style } = document.body

        this.originalBodyOverflow = style.overflow

        style.overflow = 'hidden'
    }

    componentWillUnmount() {
        const { style } = document.body

        style.overflow = this.originalBodyOverflow
    }

    handleClose = () => {
        this.setState({ animation: ProImageAnimation.OUT })
    }

    handleBgAnimationEnd = () => {
        const { onClose } = this.props

        this.setDraftState(
            (state) => {
                if (state.animation === ProImageAnimation.OUT) {
                    state.visible = false
                }

                state.animation = ProImageAnimation.NONE
            },
            () => {
                if (!this.state.visible) {
                    onClose()
                }
            }
        )
    }

    render() {
        const { proImageItems } = this.props

        const { animationVisible, translateX, animation, visible, currentIndex } = this.state

        if (!visible) return null

        const currentImage = proImageItems[currentIndex]
        const intro = currentImage && currentImage.intro

        return (
            <div className={classnames(proImageClass('_', animation === ProImageAnimation.OUT && 'close'))}>
                <div
                    className={proImageClass('bg', {
                        'fade-in': animation === ProImageAnimation.IN,
                        'fade-out': animation === ProImageAnimation.OUT,
                    })}
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

                {this.displayedImages.map((item) => (
                    <ProImageSliderItem proImageItem={item} animation={animation} key={item.key} />
                ))}

                {intro && <div className={proImageClass('footer')}>{intro}</div>}
            </div>
        )
    }
}

export default ProImageSlider
