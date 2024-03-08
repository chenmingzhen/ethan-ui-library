import React from 'react'

export const listPosition = ['drop-down', 'drop-up']
export const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']
export const horizontalDropdownPositions = ['right-top', 'left-top', 'right-bottom', 'left-bottom']
export const verticalDropdownPositions = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

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

    style.minWidth = triggerRect.width

    style.left = triggerRect.left - containerRect.left
    style.top = triggerRect.bottom - containerRect.bottom + 4

    return style
}

export function getPortalDropdownStyle(
    triggerElement: HTMLElement,
    portalElement: HTMLElement,
    position: string
): React.CSSProperties {
    if (!triggerElement || !portalElement) return {}

    const triggerRect = triggerElement.getBoundingClientRect()
    const containerRect = portalElement.getBoundingClientRect()

    const style: React.CSSProperties = {
        position: 'absolute',
        minWidth: triggerRect.width,
    }

    if (horizontalDropdownPositions.includes(position)) {
        const [h, v] = position.split('-')

        if (h === 'left') {
            style.left = triggerRect.left - containerRect.left
        } else {
            style.right = containerRect.right - triggerRect.right
        }

        if (v === 'bottom') {
            style.bottom = containerRect.bottom - triggerRect.bottom
        } else {
            style.top = triggerRect.top - containerRect.top
        }
    } else if (verticalDropdownPositions.includes(position)) {
        const [v, h] = position.split('-')

        if (h === 'left') {
            style.left = triggerRect.left - containerRect.left
        } else {
            style.right = containerRect.right - triggerRect.right
        }

        if (v === 'bottom') {
            style.top = triggerRect.bottom - containerRect.bottom
        } else {
            style.bottom = containerRect.top - triggerRect.top
        }
    }

    return style
}
