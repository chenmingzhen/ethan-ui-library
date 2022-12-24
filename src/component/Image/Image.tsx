import React, {
    useRef,
    ForwardRefRenderFunction,
    isValidElement,
    useCallback,
    useImperativeHandle,
    useEffect,
} from 'react'
import classnames from 'classnames'
import { imageClass } from '@/styles'
import Spin from '@/component/Spin'
import { styles } from '@/utils/style/styles'
import { mockAnchorClick } from '@/utils/dom/element'
import { lazyLoad } from '@/utils/lazyload'
import useSafeState from '@/hooks/useSafeState'
import { isPercent } from '@/utils/is'
import { IImageProps } from './type'
import { PLACEHOLDER, SRC, ALT, ERROR, StatusType } from './variable'
import { showGallery } from './events'

const Image: ForwardRefRenderFunction<HTMLDivElement, IImageProps> = (props, ref) => {
    const {
        src,
        alt,
        lazy = true,
        getContainer = () => undefined,
        shape,
        thumbnail,
        target,
        width = '100%',
        height,
        style,
        onClick,
        error,
        title,
        placeholder,
        spinProps = {},
        onTouchEnd,
        onTouchStart,
        fit,
        onLoad,
        imageMaskClassName,
    } = props

    const [status, setStatus] = useSafeState<StatusType>(PLACEHOLDER)

    const elementRef = useRef<HTMLDivElement>()

    /** 如果是加载中状态，没有高度或者高度为百分比，使用paddingBottom进行占位 */
    const isPaddingHold = status === PLACEHOLDER && (!height || isPercent(height))

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
    }, [src, alt])

    useImperativeHandle(ref, () => elementRef.current)

    const renderFallback = useCallback(() => {
        if (!alt) {
            setStatus(ERROR)

            return
        }

        /** 浏览器会对这个地址的图片进行缓存 */
        /** src不能找到时 渲染alt地址的图片 */
        const image = new window.Image()
        image.onload = (e) => {
            if (onLoad) {
                onLoad(e)
            }

            setStatus(ALT)
        }
        image.onerror = () => setStatus(ERROR)
        image.src = alt
    }, [alt, onLoad])

    const render = useCallback(() => {
        if (!src) {
            renderFallback()

            return
        }

        const image = new window.Image()

        image.onload = (e) => {
            if (onLoad) {
                onLoad(e)
            }

            setStatus(SRC)
        }
        image.onerror = renderFallback
        image.src = src
    }, [renderFallback, src, onLoad])

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    }

    const renderImage = () => {
        switch (status) {
            case PLACEHOLDER:
                return (
                    <div
                        className={classnames(imageClass('mask'), imageMaskClassName)}
                        style={isPaddingHold ? { position: 'absolute', top: 0 } : undefined}
                    >
                        {isValidElement(placeholder) ? placeholder : <Spin {...spinProps} />}
                    </div>
                )

            case SRC:
                return <img alt="" src={thumbnail || src} title={title} style={{ objectFit: fit }} />
            case ALT:
                return <img alt="" src={alt} title={title} style={{ objectFit: fit }} />
            case ERROR:
                return (
                    <div className={classnames(imageClass('mask'), imageMaskClassName)}>
                        <div>{error || title || 'no found'}</div>
                    </div>
                )
            default:
                return null
        }
    }

    const ms: React.CSSProperties = styles(style, { width }, isPaddingHold ? { paddingBottom: width } : { height })

    return (
        <div
            className={classnames(imageClass('_', shape, target && 'target'), props.className)}
            onClick={handleClick}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            style={ms}
            ref={elementRef}
        >
            {renderImage()}
        </div>
    )
}

Image.displayName = 'EthanImage'

export default React.memo(React.forwardRef(Image))
