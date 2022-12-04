import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { getUidStr } from '@/utils/uid'
import { styles } from '@/utils/style/styles'
import Image from '../Image'
import { ProImageItem, ProImageProps } from './type'
import { openPreviewImage } from './event'
import ProImageContext from './context'

const ProImage: React.FC<ProImageProps> = function (props) {
    const { intro, onClick, loadingElement, errorElement, style, ...other } = props

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
            const proImageItem: ProImageItem = {
                src: other.src,
                key,
                intro,
                dom: imageRef.current,
                loadingElement,
                errorElement,
            }

            openPreviewImage([proImageItem])
        }
    }, [])

    useEffect(() => {
        if (!context) return

        const { addImage, removeImage } = context

        const proImageItem: ProImageItem = {
            src: other.src,
            key,
            intro,
            dom: imageRef.current,
            loadingElement,
            errorElement,
        }

        addImage(proImageItem)

        return () => {
            removeImage(key)
        }
    }, [])

    return <Image {...other} onClick={handleClick} ref={imageRef} style={styles(style, { cursor: 'pointer' })} />
}

export default React.memo(ProImage)
