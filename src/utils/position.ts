import React from 'react'
import { docScroll } from './dom/document'

export const listPosition = ['drop-down', 'drop-up']

export const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']

export const horizontalDropdownPosition = ['right-top', 'left-top', 'right-bottom', 'left-bottom']

export const verticalDropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

export function getPortalListStyle(
    triggerElement: HTMLElement,
    portalElement: HTMLElement,
    position: string,
    fixed: boolean | 'min' = false
) {
    if (!portalElement || !triggerElement) return {}

    const elementRect = triggerElement.getBoundingClientRect()
    const containerRect = portalElement.getBoundingClientRect()
    const style: React.CSSProperties = {
        position: 'absolute',
    }

    if (fixed) {
        const widthKey = fixed === 'min' ? 'minWidth' : 'width'

        style[widthKey] = elementRect.width
    }

    if (listPosition.includes(position)) {
        style.left = elementRect.left - containerRect.left

        if (position === 'drop-down') {
            style.top = elementRect.top + elementRect.height - containerRect.top
        } else {
            style.bottom = -(containerRect.top - elementRect.top)
        }
    }

    return style
}

export function getPortalPickerStyle(triggerElement: HTMLElement, portalElement: HTMLElement, position: string) {
    if (!triggerElement || !portalElement) return {}

    const elementRect = triggerElement.getBoundingClientRect()
    const containerRect = portalElement.getBoundingClientRect()

    const style: React.CSSProperties = {
        position: 'absolute',
    }

    /** 对用非Portal的marginTop或marginBottom */
    const REDUNDANT = 4

    if (pickerPosition.includes(position)) {
        const [h, v] = position.split('-')

        if (h === 'left') {
            style.left = elementRect.left - containerRect.left
        } else {
            style.right = containerRect.right - elementRect.right
        }

        if (v === 'bottom') {
            style.top = elementRect.bottom - containerRect.bottom + REDUNDANT
        } else {
            style.bottom = containerRect.top - elementRect.top + REDUNDANT
        }
    }

    return style
}

export function getPortalSubMenuStyle(
    triggerElement: HTMLElement,
    portalElement: HTMLElement,
    direction: 'vertical' | 'horizontal'
): React.CSSProperties {
    if (!triggerElement || !portalElement) return {}

    const triggerRect = triggerElement.getBoundingClientRect()
    const containerRect = portalElement.getBoundingClientRect()
    const style: React.CSSProperties = {
        position: 'absolute',
    }

    if (direction === 'vertical') {
        // right-top
        style.left = triggerRect.right - containerRect.left
        style.top = triggerRect.top - containerRect.top

        return style
    }

    style.width = triggerRect.width

    style.left = triggerRect.left - containerRect.left
    style.top = triggerRect.bottom - containerRect.bottom + 4

    return style
}

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

/** @deprecated 使用getPortalListStyle代替 */
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

/** @deprecated 使用getPortalPickerStyle代替 */
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
