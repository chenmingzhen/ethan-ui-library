import { treeClass } from '@/styles'
import { Key } from 'react'

export const placeElement = document.createElement('div')
export const innerPlaceElement = document.createElement('div')

placeElement.className = treeClass('drag-place')
placeElement.appendChild(innerPlaceElement)

export function removePlaceElementDom() {
    if (!placeElement.parentElement) return

    placeElement.parentNode.removeChild(placeElement)
}

export function isSameParentPath(arr1: Key[], arr2: Key[]) {
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length - 1; i++) {
        if (arr1[i] !== arr2[i]) return false
    }

    return true
}
