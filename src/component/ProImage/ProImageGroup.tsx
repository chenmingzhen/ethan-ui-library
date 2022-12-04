import React, { useCallback, useState } from 'react'
import Context from './context'
import { openPreviewImage } from './event'
import { ProImageGroupProps } from './type'

const ProImageGroup: React.FC<ProImageGroupProps> = function (props) {
    const [current, updateCurrent] = useState(0)
    const [proImages, updateProImages] = useState([])

    const handleAddImage = useCallback((proImageItem) => {
        updateProImages((list) => {
            list.push(proImageItem)

            return list
        })
    }, [])

    const handleRemoveImage = useCallback(
        (key) => {
            const nextImages = proImages.filter((item) => item.key !== key)
            const nextEndIndex = nextImages.length - 1

            updateProImages(nextImages)
            updateCurrent(Math.min(nextEndIndex, current))
        },
        [proImages, current]
    )

    const handleShow = useCallback(
        (key: string) => {
            const nextCurrent = proImages.findIndex((item) => item.key === key)

            updateCurrent(nextCurrent)

            openPreviewImage(proImages, nextCurrent)
        },
        [proImages]
    )

    const { children, loadingElement, errorElement } = props

    return (
        <Context.Provider
            value={{
                addImage: handleAddImage,
                removeImage: handleRemoveImage,
                onShow: handleShow,
                loadingElement,
                errorElement,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default React.memo(ProImageGroup)
