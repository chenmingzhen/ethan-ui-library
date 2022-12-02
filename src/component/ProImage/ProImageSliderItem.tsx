import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import Image from '../Image'
import { OriginRect, ProImageAnimation, ProImageSliderItemProps } from './type'
import { getAnimateOrigin, getSuitableImageSize } from './util'

interface ProImageSliderItemState {
    naturalWidth: number
    naturalHeight: number
    width: number
    height: number
    x: number
    y: number
    scale: number
    rotate: number
    loaded: boolean
}

class ProImageSliderItem extends PureComponent<ProImageSliderItemProps, ProImageSliderItemState> {
    originRect: OriginRect

    constructor(props: ProImageSliderItemProps) {
        super(props)

        this.state = {
            naturalWidth: 0,
            naturalHeight: 0,
            width: undefined,
            height: undefined,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            loaded: false,
        }

        const { top, left, width, height } = props.proImageItem.dom.getBoundingClientRect()

        this.originRect = {
            clientX: left + width / 2,
            clientY: top + height / 2,
        }
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

    render() {
        const { width, height, loaded } = this.state
        const { animation, proImageItem } = this.props

        return (
            <div className={proImageClass('item')}>
                <div className={proImageClass('item-mask')} />

                <Image
                    className={proImageClass('content', {
                        'zoom-in': loaded && animation === ProImageAnimation.IN,
                        'zoom-out': loaded && animation === ProImageAnimation.OUT,
                    })}
                    src={proImageItem.src}
                    onLoad={this.handleImageLoad}
                    width={width}
                    height={height}
                    style={{ transformOrigin: loaded ? getAnimateOrigin(this.originRect) : undefined }}
                    imageMaskClassName={proImageClass('img-mask')}
                />
            </div>
        )
    }
}

export default ProImageSliderItem
