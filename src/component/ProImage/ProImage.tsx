import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { getUidStr } from '@/utils/uid'
import Image from '../Image'
import { ProImageItem, ProImageProps } from './type'
import { openPreviewImage } from './event'
import ProImageContext from './context'

const ProImage: React.FC<ProImageProps> = function (props) {
    const { intro, onClick, ...other } = props

    const key = useRef(getUidStr()).current

    const context = useContext(ProImageContext)

    const imageRef = useRef<HTMLDivElement>()

    const handleClick = useCallback((evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClick) {
            onClick(evt)
        }

        if (context) {
            context.onShow(key)
        } else {
            const proImageItem: ProImageItem = { src: other.src, key, intro, dom: imageRef.current }

            openPreviewImage([proImageItem])
        }
    }, [])

    useEffect(() => {
        if (!context) return

        const { addImage, removeImage } = context

        const proImageItem: ProImageItem = { src: other.src, key, intro, dom: imageRef.current }

        addImage(proImageItem)

        return () => {
            removeImage(key)
        }
    }, [])

    return <Image {...other} onClick={handleClick} ref={imageRef} />
}

export default React.memo(ProImage)
