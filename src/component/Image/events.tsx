import React from 'react'
import ReactDOM from 'react-dom'
import { imageClass } from '@/styles'
import Gallery from './Gallery'
import { ImageItem } from './type'

let container: HTMLDivElement

function keyClose(e) {
    if (e.keyCode === 27) close()
}

function close() {
    document.removeEventListener('keydown', keyClose)
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container)
    container = null
}

function getContainer() {
    if (container) return container

    container = document.createElement('div')
    document.body.appendChild(container)
    container.className = imageClass('gallery')

    return container
}

export function showGallery(images: ImageItem[], current = 0) {
    const div = getContainer()

    document.addEventListener('keydown', keyClose)

    ReactDOM.render(<Gallery onClose={close} current={current} images={images} />, div)
}
