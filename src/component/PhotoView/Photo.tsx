import React from 'react'
import Spin from '@/component/Spin'
import { photoViewClass } from '@/styles'
import { getSuitableImageSize } from './utils'

export interface PhotoProps extends React.HTMLAttributes<null> {
    src: string

    loaded: boolean

    broken: boolean

    width: number

    height: number

    rotate: number

    className?: string

    onImageLoad(PhotoParams): void

    loadingElement?: JSX.Element

    brokenElement?: JSX.Element
}

const Photo: React.FC<PhotoProps> = ({
    src,
    loaded,
    broken,
    width,
    height,
    rotate,
    className,
    onImageLoad,
    loadingElement,
    brokenElement,
    ...restProps
}) => {
    function handleImageLoaded(e) {
        const { naturalWidth, naturalHeight } = e.target
        onImageLoad({
            loaded: true,
            naturalWidth,
            naturalHeight,
            ...getSuitableImageSize(naturalWidth, naturalHeight, rotate),
        })
    }

    function handleImageBroken() {
        onImageLoad({
            broken: true,
        })
    }

    React.useEffect(() => {
        const currPhoto = new Image()
        currPhoto.onload = handleImageLoaded
        currPhoto.onerror = handleImageBroken
        currPhoto.src = src
    }, [])

    if (src && !broken) {
        if (loaded) {
            return (
                <img
                    className={photoViewClass('photo', className)}
                    src={src}
                    width={width}
                    height={height}
                    alt=""
                    {...restProps}
                />
            )
        }
        return loadingElement || <Spin />
    }
    return brokenElement || null
}

Photo.displayName = 'Photo'

export default React.memo(Photo)
