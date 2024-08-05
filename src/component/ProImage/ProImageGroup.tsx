import React, { useState } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import Context from './context'
import { openProImageSlider } from './event'
import { ProImageGroupProps } from './type'

const ProImageGroup: React.FC<ProImageGroupProps> = function (props) {
    const { children, loadingElement, errorElement, backdropOpacity } = props

    const [proImages, updateProImages] = useState([])

    const handleAddImage = useRefMethod((proImageItem) => {
        updateProImages((list) => {
            list.push(proImageItem)

            return list
        })
    })

    const handleRemoveImage = useRefMethod((key) => {
        const nextImages = proImages.filter((item) => item.key !== key)

        updateProImages(nextImages)
    })

    const handleShow = useRefMethod((key: string) => {
        const defaultIndex = proImages.findIndex((item) => item.key === key)

        openProImageSlider(proImages, { defaultIndex, backdropOpacity })
    })

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
