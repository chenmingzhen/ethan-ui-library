// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { addStack, removeStack } from '@/utils/lazyload'
import { imageClass } from '@/styles'
import Spin from '@/component/Spin'
import showGallery from './events'

const PLACEHOLDER = 0
const SRC = 1
const ALT = 2
const ERROR = 3

class Image extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            status: PLACEHOLDER,
        }

        this.bindElement = this.bindElement.bind(this)
        this.markToRender = this.markToRender.bind(this)
        this.handleAlt = this.handleAlt.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        super.componentDidMount()
        this.fetchImage()
    }

    componentDidUpdate(prevProps) {
        const { src, alt } = this.props
        if (prevProps.src !== src || prevProps.alt !== alt) {
            this.fetchImage()
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        removeStack(this.lazyId)
        delete this.image
    }

    bindElement(el) {
        this.element = el
    }

    fetchImage() {
        if (this.lazyId) removeStack(this.lazyId)
        if (!this.props.lazy) {
            this.markToRender()
        } else {
            const { container } = this.props
            this.lazyId = addStack({
                offset: typeof this.props.lazy === 'number' ? this.props.lazy : 0,
                element: this.element,
                render: this.markToRender,
                container: typeof container === 'string' ? document.querySelector(container) : container,
            })
        }
    }

    markToRender() {
        const { src } = this.props
        if (!src) {
            this.handleAlt()
            return
        }

        delete this.image
        const image = new window.Image()
        // onload加载完成后执行
        image.onload = () => this.setState({ status: SRC })
        image.onerror = this.handleAlt
        // 设置src开始加载
        image.src = this.props.src
        this.image = image
    }

    handleAlt() {
        const { alt } = this.props
        if (!alt) {
            this.setState({ status: ERROR })
            return
        }

        // 浏览器会对这个地址的图片进行缓存
        // src不能找到时 渲染alt地址的图片
        const image = new window.Image()
        image.onload = () => this.setState({ status: ALT })
        image.onerror = () => this.setState({ status: ERROR })
        // 加载
        image.src = alt
    }

    handleClick(e) {
        const { onClick, target, src, href } = this.props
        if (onClick) {
            onClick(e)
            return
        }

        if (href && target === '_modal') {
            e.preventDefault()
            showGallery({ thumb: src, src: href || src, key: 'key' })
        }
    }

    renderType(src) {
        const { title, fit } = this.props

        return fit === 'fill' || fit === 'fit' ? (
            <div className={imageClass('inner')} title={title} style={{ backgroundImage: `url("${src}")` }} />
        ) : (
            <div className={imageClass('inner')} title={title}>
                <img alt="" src={src} />
            </div>
        )
    }

    renderPlaceholder() {
        const { placeholder, title, loadingColor: color, loadingName: name } = this.props
        if (React.isValidElement(placeholder)) {
            return <div className={imageClass('inner')}>{placeholder}</div>
        }

        const loadingStyle = { color, name }
        return (
            <div className={imageClass('inner', 'mask')}>
                <div>
                    {title}
                    {/* <span className={imageClass('placeholder')}>{placeholder || getLocale('loading')}</span> */}
                    <Spin {...loadingStyle} />
                </div>
            </div>
        )
    }

    renderImage() {
        const { status } = this.state
        const { alt, src, title, error } = this.props

        switch (status) {
            case PLACEHOLDER:
                return this.renderPlaceholder()
            case SRC:
                return this.renderType(src)
            case ALT:
                return this.renderType(alt)
            case ERROR:
                return (
                    <div className={imageClass('inner', 'mask')}>
                        <div>{error || title || 'no found'}</div>
                    </div>
                )
            default:
                return null
        }
    }

    render() {
        const { href, height, style, shape, fit, width, target } = this.props

        const className = classnames(imageClass('_', shape, fit), this.props.className)

        const Tag = href ? 'a' : 'div'
        const props = {
            ref: this.bindElement,
            onClick: this.handleClick,
            target: target === '_download' ? '_self' : target,
            download: target === '_download',
            className,
            style: Object.assign({}, style, { width, paddingBottom: height }),
        }
        if (!href || target !== '_modal') props.href = href
        return <Tag {...props}>{this.renderImage()}</Tag>
    }
}

Image.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    href: PropTypes.string,
    lazy: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    onClick: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    shape: PropTypes.oneOf(['rounded', 'circle', 'thumbnail']),
    src: PropTypes.string,
    style: PropTypes.object,
    target: PropTypes.oneOf(['_blank', '_self', '_modal', '_download']),
    title: PropTypes.string,
    fit: PropTypes.oneOf(['fill', 'fit', 'stretch', 'center']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    container: PropTypes.string,
    error: PropTypes.node,
    loadingName: PropTypes.oneOf([
        'default',
        'chasing-ring',
        'chasing-dots',
        'cube-grid',
        'double-bounce',
        'fading-circle',
        'four-dots',
        'plane',
        'pulse',
        'ring',
        'scale-circle',
        'three-bounce',
        'wave',
    ]),
    loadingColor: PropTypes.string,
}

Image.defaultProps = {
    lazy: false,
    target: '_modal',
    width: '100%',
    height: '100%',
}

export const IMAGE = {}

Image.symbolType = IMAGE

export default Image
