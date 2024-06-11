import React, { useRef, ForwardRefRenderFunction, isValidElement, useImperativeHandle, useEffect } from 'react'
import classnames from 'classnames'
import { imageClass } from '@/styles'
import Spin from '@/component/Spin'
import { styles } from '@/utils/style/styles'
import { mockAnchorClick } from '@/utils/dom/element'
import { lazyLoad } from '@/utils/lazyload'
import useSafeState from '@/hooks/useSafeState'
import { isPercent } from '@/utils/is'
import useRefMethod from '@/hooks/useRefMethod'
import { IImageProps } from './type'
import { showGallery } from './events'

enum RenderEnum {
    PLACEHOLDER,
    SRC,
    FALLBACK,
    ERROR,
}

const Image: ForwardRefRenderFunction<HTMLDivElement, IImageProps> = (props, ref) => {
    const {
        src,
        alt,
        fit,
        error,
        title,
        style,
        shape,
        target,
        height,
        onLoad,
        onClick,
        fallback,
        thumbnail,
        placeholder,
        lazy = true,
        getContainer = () => undefined,
        width = '100%',
        onTouchStart,
        onTouchEnd,
        imageMaskClassName,
    } = props

    const [status, setStatus] = useSafeState<RenderEnum>(RenderEnum.PLACEHOLDER)

    const elementRef = useRef<HTMLDivElement>()

    /** 如果是加载中状态，没有高度或者高度为百分比，使用paddingBottom进行占位 */
    const isPaddingHold = status === RenderEnum.PLACEHOLDER && (!height || isPercent(height))

    useEffect(() => {
        if (!lazy) {
            render()

            return
        }

        const dispose = lazyLoad({
            offset: typeof lazy === 'number' ? lazy : 0,
            target: elementRef.current,
            render,
            container: getContainer(),
        })

        return dispose
    }, [src])

    useImperativeHandle(ref, () => elementRef.current)

    function renderFallback() {
        const image = new window.Image()
        image.onload = () => setStatus(RenderEnum.FALLBACK)
        image.onerror = () => setStatus(RenderEnum.ERROR)
        image.src = alt
    }

    function render() {
        if (!src) {
            renderFallback()

            return
        }

        const image = new window.Image()

        image.onload = (e) => {
            if (onLoad) {
                onLoad(e)
            }

            setStatus(RenderEnum.SRC)
        }
        image.onerror = renderFallback
        image.src = src
    }

    const handleClick = useRefMethod((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClick) {
            onClick(e)
        }

        if (!target) return

        if (target === '_modal') {
            e.preventDefault()

            showGallery([{ src: src || thumbnail, key: 'key' }])
        } else {
            mockAnchorClick(src, target)
        }
    })

    const renderImage = () => {
        switch (status) {
            case RenderEnum.PLACEHOLDER:
                return (
                    <div
                        className={classnames(imageClass('mask'), imageMaskClassName)}
                        style={isPaddingHold ? { position: 'absolute', top: 0 } : undefined}
                    >
                        {isValidElement(placeholder) ? placeholder : <Spin />}
                    </div>
                )

            case RenderEnum.SRC:
                return <img alt={alt} src={thumbnail || src} title={title} style={{ objectFit: fit }} />
            case RenderEnum.FALLBACK:
                return <img alt={alt} src={fallback} title={title} style={{ objectFit: fit }} />
            case RenderEnum.ERROR:
                return (
                    <div className={classnames(imageClass('mask'), imageMaskClassName)}>
                        <div>{error || alt || 'no found'}</div>
                    </div>
                )
            default:
                return null
        }
    }

    const ms: React.CSSProperties = styles(style, { width }, isPaddingHold ? { paddingBottom: width } : { height })

    return (
        <div
            style={ms}
            ref={elementRef}
            onClick={handleClick}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            className={classnames(imageClass('_', shape, target && 'target'), props.className)}
        >
            {renderImage()}
        </div>
    )
}

Image.displayName = 'EthanImage'

export default React.memo(React.forwardRef(Image))
