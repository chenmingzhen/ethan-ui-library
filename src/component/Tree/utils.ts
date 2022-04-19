import { treeClass } from '@/styles'

export const placeElement = document.createElement('div')
export const innerPlaceElement = document.createElement('div')

placeElement.className = treeClass('drag-place')
placeElement.appendChild(innerPlaceElement)

export function removePlaceElementDom() {
    if (!placeElement.parentElement) return

    placeElement.parentNode.removeChild(placeElement)
}
