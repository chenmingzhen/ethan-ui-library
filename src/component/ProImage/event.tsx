import React from 'react'
import ReactDOM from 'react-dom'
import ProImageSlider from './ProImageSlider'
import { ProImageCommonProps, ProImageItem } from './type'

export function openProImageSlider(photoItems: ProImageItem[], props: ProImageCommonProps) {
    const { defaultIndex = 0, backdropOpacity } = props

    const container = document.createElement('div')

    document.body.appendChild(container)

    function close() {
        ReactDOM.unmountComponentAtNode(container)

        document.body.removeChild(container)
    }

    ReactDOM.render(
        <ProImageSlider
            proImageItems={photoItems}
            defaultIndex={defaultIndex}
            onClose={close}
            backdropOpacity={backdropOpacity}
        />,
        container
    )
}
