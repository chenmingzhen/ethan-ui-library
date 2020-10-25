import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '@/utils/component'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { docSize } from '@/utils/dom/document'
import { imageClass } from '@/styles'
import icons from '../icons'
import Magnify from './Magnify'

class Gallery extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: props.current,
      direction: 'init',
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.lockScroll = this.lockScroll.bind(this)

    this.scrollX = 0
    this.rawScroll = false
  }

  componentDidMount() {
    super.componentDidMount()
    // 鼠标滚轮事件
    document.addEventListener('wheel', this.handleScroll, { passive: false })
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    document.removeEventListener('wheel', this.handleScroll, { passive: false })
  }

  lockScroll(status) {
    this.rawScroll = status
  }

  handleClick(direction) {
    const { length } = this.props.images
    this.setState(
      immer((draft) => {
        draft.current += direction
        if (draft.current < 0) draft.current = 0
        else if (draft.current >= length) draft.current = length - 1
        else draft.direction = direction === 1 ? 'forward' : 'backward'
      }),
      () => {
        setTimeout(() => {
          this.setState({ direction: 'init' })
        }, 400)
      }
    )
  }

  handleScroll(e) {
    // 放大镜组件返回true 滚动中
    if (this.rawScroll) return
    e.preventDefault()
    // ！==0 滚动中 返回
    if (this.scrollX !== 0) return
    const wheel = normalizeWheel(e)
    // FIXME 坐标错了 需要用Y代替X
    this.scrollX += wheel.spinY

    if (this.scrollX < 0) this.handleClick(-1)
    if (this.scrollX > 0) this.handleClick(1)

    this.scrollTimer = setTimeout(() => {
      this.scrollX = 0
    }, 1000)
  }

  renderImage(image, pos) {
    const windowHeight = docSize.height
    const windowWidth = docSize.width

    let onClick
    if (pos !== 'center') {
      onClick = this.handleClick.bind(this, pos === 'left' ? -1 : 1)
    }

    return (
      <div key={image.key} className={imageClass(pos, this.state.direction)} onClick={onClick}>
        <a onClick={this.props.onClose} className={imageClass('close')}>
          {icons.Close}
        </a>
        <Magnify
          maxWidth={windowWidth - 400}
          maxHeight={windowHeight - 160}
          position={pos}
          src={image.src}
          lockScroll={this.lockScroll}
        />
      </div>
    )
  }

  render() {
    const { current } = this.state
    const { images, onClose } = this.props
    const currentImage = images[current]

    const result = []
    // 注意 动画是怎么产生的 点击后 原本的center的image就会立即被调换 原来的center被换成left 这个时候才进行动画
    // 不要被假象蒙蔽
    result.push(<div key="overlay" className={imageClass('overlay')} onClick={onClose} />)
    result.push(this.renderImage(currentImage, 'center'))

    if (images[current - 1]) result.push(this.renderImage(images[current - 1], 'left'))
    if (images[current + 1]) result.push(this.renderImage(images[current + 1], 'right'))

    return result
  }
}

Gallery.propTypes = {
  current: PropTypes.number,
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

Gallery.defaultProps = {
  current: 0,
}

export default Gallery
