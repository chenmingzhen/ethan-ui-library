import React, { useCallback, useState } from 'react'
import Context from './context'
import { openProImageSlider } from './event'
import { ProImageGroupProps } from './type'

const ProImageGroup: React.FC<ProImageGroupProps> = function (props) {
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

            updateProImages(nextImages)
        },
        [proImages]
    )

    const handleShow = useCallback(
        (key: string) => {
            const index = proImages.findIndex((item) => item.key === key)

            openProImageSlider(proImages, index)
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
