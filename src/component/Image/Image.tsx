import React, {
    useRef,
    ForwardRefRenderFunction,
    useEffect,
    useImperativeHandle,
    isValidElement,
    useCallback,
} from 'react'
import classnames from 'classnames'
import { imageClass } from '@/styles'
import Spin from '@/component/Spin'
import useSafeState from '@/hooks/useSafeState'
import { lazyLoad } from '@/utils/lazyload'
import { styles } from '@/utils/style/styles'
import { mockAnchorClick } from '@/utils/dom/element'
import showGallery from './events'
import { PLACEHOLDER, SRC, ALT, ERROR, StatusType } from './variable'
import { IImageProps } from './type'

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
    } = props

    const [status, setStatus] = useSafeState<StatusType>(PLACEHOLDER)

    const elementRef = useRef<HTMLDivElement>()

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
        image.onload = () => setStatus(ALT)
        image.onerror = () => setStatus(ERROR)
        image.src = alt
    }, [alt])

    const render = useCallback(() => {
        if (!src) {
            renderFallback()

            return
        }

        const image = new window.Image()

        image.onload = () => setStatus(SRC)
        image.onerror = renderFallback
        image.src = src
    }, [renderFallback, src])

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClick) {
            onClick(e)
        }

        if (!target) return

        if (target === '_modal') {
            e.preventDefault()

            showGallery({ thumb: src, src: src || thumbnail, key: 'key' })
        } else {
            mockAnchorClick(src, target)
        }
    }

    const renderImage = () => {
        switch (status) {
            case PLACEHOLDER:
                return (
                    <div className={imageClass('mask')}>
                        {isValidElement(placeholder) ? placeholder : <Spin {...spinProps} />}
                    </div>
                )

            case SRC:
                return <img alt="" src={src} title={title} style={height ? { height } : undefined} />
            case ALT:
                return <img alt="" src={alt} title={title} style={height ? { height } : undefined} />
            case ERROR:
                return (
                    <div className={imageClass('mask')}>
                        <div>{error || title || 'no found'}</div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div
            className={classnames(imageClass('_', shape), props.className)}
            onClick={handleClick}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
            style={styles(style, { width, paddingBottom: height })}
            ref={elementRef}
        >
            {renderImage()}
        </div>
    )
}

Image.displayName = 'EthanImage'

export default React.memo(React.forwardRef(Image))
