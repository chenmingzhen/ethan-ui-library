import React from 'react'
import ReactDOM from 'react-dom'
import ProImageSlider from './ProImageSlider'
import { ProImageItem } from './type'

export function openProImageSlider(photoItems: ProImageItem[], defaultIndex = 0) {
    const container = document.createElement('div')

    document.body.appendChild(container)

    function close() {
        ReactDOM.unmountComponentAtNode(container)

        document.body.removeChild(container)
    }

    ReactDOM.render(
        <ProImageSlider proImageItems={photoItems} defaultIndex={defaultIndex} onClose={close} />,
        container
    )
}
