import React from 'react'
import ReactDOM from 'react-dom'
import ProImageSlider from './ProImageSlider'
import { ProImageItem } from './type'

let container: HTMLDivElement

function close() {
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container)

    container = null
}

function getContainer() {
    if (container) return container

    container = document.createElement('div')
    document.body.appendChild(container)

    return container
}

export function openPreviewImage(photoItems: ProImageItem[], current = 0) {
    const div = getContainer()

    ReactDOM.render(<ProImageSlider proImageItems={photoItems} current={current} onClose={close} />, div)
}
