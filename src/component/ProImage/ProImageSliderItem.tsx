import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import { ProImageAnimation, ProImageSliderItemProps } from './type'
import { getAnimateOrigin, getSuitableImageSize } from './util'
import Photo from './Photo'

interface ProImageSliderItemState {
    naturalWidth: number
    naturalHeight: number
    width: number
    height: number
    rotate: number
    loaded: boolean
    error: boolean
    /** 如果image已经打开过一次 不需要显示Loading,避免出现loading闪烁 */
    pendding: boolean
}

class ProImageSliderItem extends PureComponent<ProImageSliderItemProps, ProImageSliderItemState> {
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
            pendding: true,
        }
    }

    componentDidMount() {
        super.componentDidMount()

        setTimeout(() => {
            if (this.state.loaded || this.state.error) {
                this.setState({ pendding: false })
            }
        }, 0)
    }

    componentDidUpdate(): void {
        if ((this.state.loaded || this.state.error) && this.state.pendding) {
            this.setState({ pendding: false })
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

    handleImageError = () => {
        this.setState({ error: true })
    }

    render() {
        const { width, height, loaded, error, pendding } = this.state
        const { animation, proImageItem, active, style } = this.props

        return (
            <div className={proImageClass('item')} style={style}>
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
                        pendding={pendding}
                        onError={this.handleImageError}
                    />
                </div>
            </div>
        )
    }
}

export default ProImageSliderItem
