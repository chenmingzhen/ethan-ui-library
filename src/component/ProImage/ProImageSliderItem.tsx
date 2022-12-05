import React from 'react'
import { PureComponent } from '@/utils/component'
import { proImageClass } from '@/styles'
import { ProImageAnimation, ProImageSliderItemProps } from './type'
import { getAnimateOrigin, getSuitableImageSize, handleContinueClick } from './util'
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
    pending: boolean
    clientX: number
    clientY: number
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
            pending: true,
            clientX: undefined,
            clientY: undefined,
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
    }

    componentDidUpdate(): void {
        if ((this.state.loaded || this.state.error) && this.state.pending) {
            this.setState({ pending: false })
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        window.removeEventListener('mouseup', this.handleMouseUp)
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
        this.setState({ clientX, clientY })
    }

    handleMoveEnd = (clientX: number, clientY: number) => {
        if (!this.props.active) return

        const hasMove = this.state.clientX !== clientX || this.state.clientY !== clientY

        this.setState({ clientX, clientY }, () => {
            if (!hasMove) {
                this.handlePhotoClick(clientX, clientY)
            }
        })
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

    render() {
        const { width, height, loaded, error, pending } = this.state
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
