import React from 'react'
import { docScroll } from './dom/document'

export const listPosition = ['drop-down', 'drop-up']

export const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']

export const horizontalDropdownPosition = ['right-top', 'left-top', 'right-bottom', 'left-bottom']

export const verticalDropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

export function getDropdownPortalStyle(rect: DOMRect, position: string): React.CSSProperties {
    if (!rect) return {}

    const style: React.CSSProperties = {
        position: 'absolute',
        minWidth: rect.width,
    }

    if (verticalDropdownPosition.includes(position)) {
        const [v, h] = position.split('-')

        if (h === 'left') {
            style.left = rect.left + docScroll.left
        } else {
            style.left = rect.right + docScroll.left

            style.transform = 'translateX(-100%)'
        }
        if (v === 'bottom') {
            style.top = rect.bottom + docScroll.top
        } else {
            style.top = rect.top + docScroll.top

            style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
        }
    } else if (horizontalDropdownPosition.includes(position)) {
        const [h, v] = position.split('-')

        if (h === 'left') {
            style.left = rect.left + docScroll.left

            style.transform = 'translateX(-100%)'
        } else {
            style.left = rect.right + docScroll.left
        }
        if (v === 'bottom') {
            style.top = rect.bottom + docScroll.top

            style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
        } else {
            style.top = rect.top + docScroll.top
        }
    }

    return style
}

export function getListPortalStyle(
    rect: DOMRect,
    position: string,
    fixed: boolean | 'min' = false
): React.CSSProperties {
    if (!rect) return {}

    const style: React.CSSProperties = {
        position: 'absolute',
    }

    if (fixed) {
        const widthKey = fixed === 'min' ? 'minWidth' : 'width'

        style[widthKey] = rect.width
    }

    if (listPosition.includes(position)) {
        style.left = rect.left + docScroll.left

        if (position === 'drop-down') {
            style.top = rect.top + rect.height + docScroll.top
        } else {
            style.bottom = -(rect.top + docScroll.top)
        }
    }

    return style
}

export function getPickerPortalStyle(rect: DOMRect, position: string) {
    if (!rect) return {}

    const style: React.CSSProperties = {
        position: 'absolute',
    }

    if (pickerPosition.includes(position)) {
        const [h, v] = position.split('-')

        const REDUNDANT = 4

        if (h === 'left') {
            style.left = rect.left + docScroll.left
        } else {
            style.left = rect.right + docScroll.left

            style.transform = 'translateX(-100%)'
        }

        if (v === 'bottom') {
            style.top = rect.bottom + docScroll.top + REDUNDANT
        } else {
            style.top = rect.top + docScroll.top - REDUNDANT

            style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
        }
    }

    return style
}
