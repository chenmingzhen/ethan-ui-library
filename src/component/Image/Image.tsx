import React, { ReactNode, useRef } from 'react'
import classnames from 'classnames'
import { imageClass } from '@/styles'
import Spin from '@/component/Spin'
import showGallery from './events'
import { PLACEHOLDER, SRC, ALT, ERROR } from './variable'
import useImage from './hooks/useImage'

export interface ImageProps {
    alt?: string

    className?: string

    /**
     * 图片高度
     */
    height?: number | string

    /**
     * 图片宽度
     */
    width?: number | string

    href?: string

    /**
     * 懒加载
     */
    lazy?: boolean | number

    onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void

    placeholder?: ReactNode | string

    /**
     * 形状
     */
    shape?: 'rounded' | 'circle' | 'thumbnail'

    /**
     * 适应
     */
    fit: 'fill' | 'center' | 'fit' | 'stretch'

    src?: string

    style?: React.CSSProperties

    target?: '_blank' | '_sele' | '_modal' | '_download'

    title?: string

    /**
     * 目标容器
     */
    container?: string

    /**
     * 图片出错的展示
     */
    error?: ReactNode

    /**
     * 加载中形状
     */
    loadingName?:
        | 'default'
        | 'chasing-ring'
        | 'chasing-dots'
        | 'cube-grid'
        | 'double-bounce'
        | 'fading-circle'
        | 'four-dots'
        | 'plane'
        | 'pulse'
        | 'ring'
        | 'scale-circle'
        | 'three-bounce'
        | 'wave'

    /**
     * 加载中颜色
     */
    loadingColor?: string
}

const Image: React.FC<ImageProps> = props => {
    const {
        src,
        alt,
        lazy = false,
        container,
        shape,
        fit,
        href,
        target = '_modal',
        width = '100%',
        height = '100%',
        style,
        onClick,
        error,
        title,
        placeholder,
        loadingColor: color,
        loadingName: name,
    } = props

    const el = useRef<any>()
    const { status } = useImage(lazy, src, alt, container, el)

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClick) {
            onClick(e)
            return
        }

        if (href && target === '_modal') {
            e.preventDefault()
            showGallery({ thumb: src, src: href || src, key: 'key' })
        }
    }

    const renderPlaceholder = () => {
        if (React.isValidElement(placeholder)) {
            return <div className={imageClass('inner')}>{placeholder}</div>
        }

        const loadingStyle = { color, name }
        return (
            <div className={imageClass('inner', 'mask')}>
                <div>
                    {title}

                    <Spin {...loadingStyle} />
                </div>
            </div>
        )
    }

    const renderType = source => {
        return fit === 'fill' || fit === 'fit' ? (
            <div className={imageClass('inner')} title={title} style={{ backgroundImage: `url("${source}")` }} />
        ) : (
            <div className={imageClass('inner')} title={title}>
                <img alt="" src={source} />
            </div>
        )
    }

    const renderImage = () => {
        switch (status) {
            case PLACEHOLDER:
                return renderPlaceholder()
            case SRC:
                return renderType(src)
            case ALT:
                return renderType(alt)
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

    const className = classnames(imageClass('_', shape, fit), props.className)
    const Tag = href ? 'a' : 'div'
    const newProps = {
        ref: el,
        onClick: handleClick,
        target: target === '_download' ? '_self' : target,
        download: target === '_download',
        className,
        style: Object.assign({}, style, { width, paddingBottom: height }),
    }

    return <Tag {...newProps}>{renderImage()}</Tag>
}

Image.displayName = 'EthanImage'

export default Image
