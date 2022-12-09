import { proImageClass } from '@/styles'
import React from 'react'
import Spin from '../Spin'
import { PhotoProps } from './type'

/**
 * @note
 * 不使用Image组件的原因:
 * 因为涉及到动画缩放transform-origin计算的问题，使用一个div容器固定photo，使这个容器的中心点落在屏幕的中心。
 * 如果直接使用Image组件，因为Image组件也有一个div的容器，导致photo的容器div长宽都不是零，并且image的位置与屏幕重合 */
const Photo: React.FC<PhotoProps> = (props) => {
    const { src, loaded, width, error, pending, height, onLoad, onError, loadingElement, errorElement, ...rest } = props

    React.useEffect(() => {
        const currPhoto = new Image()
        currPhoto.onload = onLoad
        currPhoto.onerror = onError
        currPhoto.src = src
    }, [])

    if (pending) return null

    if (src && !error) {
        if (loaded) {
            return <img className={proImageClass('photo')} src={src} width={width} height={height} alt="" {...rest} />
        }
        return <Spin />
    }

    return errorElement || null
}

export default React.memo(Photo)
