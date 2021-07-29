export function getPosition(selection, picker, transfer, placement = 'bottom', callback) {
    let top = 0

    let left = 0

    const offset = 3

    const origins = {
        top: 'center bottom',
        'top-left': 'left bottom',
        'top-right': 'right bottom',
        left: 'right center',
        'left-top': 'right top',
        'left-bottom': 'right bottom',
        right: 'left center',
        'right-top': 'left top',
        'right-bottom': 'left bottom',
        bottom: 'center top',
        'bottom-left': 'left top',
        'bottom-right': 'right top',
    }

    if (picker && selection) {
        const selectionRect = selection.getBoundingClientRect()
        const pickerHeight = picker.offsetHeight
        const pickerWidth = picker.offsetWidth
        const { clientHeight } = document.documentElement
        const { clientWidth } = document.documentElement
        const { scrollTop } = document.documentElement
        const { scrollLeft } = document.documentElement
        // 是否有足够的空间
        // 底部
        const showInBottom = clientHeight - selectionRect.bottom > pickerHeight
        // 上面
        const showInTop = clientHeight - (clientHeight - selectionRect.top) > pickerHeight
        // 左边
        const showInLeft = clientWidth - (clientWidth - selectionRect.left) > pickerWidth
        // 右边
        const showInRight = clientWidth - selectionRect.right > pickerWidth

        // console.log(placement, 'showInTop:', showInTop, 'showInBottom:', showInBottom, clientHeight, scrollTop, selectionRect.top, pickerHeight)

        const hasBottom = placement.slice(0, 6) === 'bottom'
        const hasTop = placement.slice(0, 3) === 'top'
        const hasLeft = placement.slice(0, 4) === 'left'
        const hasRight = placement.slice(0, 5) === 'right'

        if (hasBottom || hasTop) {
            if ((hasBottom && showInBottom) || (hasTop && !showInTop)) {
                // 正常在底部显示
                if (transfer) {
                    top = selectionRect.bottom + offset + scrollTop
                    left = selectionRect.left + scrollLeft
                    if (placement === 'bottom' || placement === 'top') {
                        left = selectionRect.left - (pickerWidth - selectionRect.width) / 2 + scrollLeft
                    }
                    if (placement === 'bottom-right' || placement === 'top-right') {
                        left = selectionRect.left - (pickerWidth - selectionRect.width) + scrollLeft
                    }
                    if (hasTop) {
                        placement = placement.replace('top', 'bottom')
                    }
                } else {
                    top = selectionRect.height + offset
                    left = 0
                }
            } else if ((hasBottom && !showInBottom) || (hasTop && showInTop)) {
                if (transfer) {
                    left = selectionRect.left + scrollLeft
                    top = selectionRect.top - pickerHeight - offset + scrollTop
                    if (placement === 'top' || placement === 'bottom') {
                        left = selectionRect.left - (pickerWidth - selectionRect.width) / 2 + scrollLeft
                    }
                    if (placement === 'top-right' || placement === 'bottom-right') {
                        left = selectionRect.left - (pickerWidth - selectionRect.width) + scrollLeft
                    }
                    if (hasBottom) {
                        placement = placement.replace('bottom', 'top')
                    }
                } else {
                    top = -(pickerHeight + offset)
                    left = 0
                }
            }
        } else if (hasLeft || hasRight) {
            if ((hasLeft && showInLeft) || (hasRight && !showInRight)) {
                if (transfer) {
                    top = selectionRect.top + scrollTop
                    left = selectionRect.left - pickerWidth - offset + scrollLeft
                    if (placement === 'left' || placement === 'right') {
                        top = selectionRect.top - (pickerHeight - selectionRect.height) / 2 + scrollTop
                    }
                    if (placement === 'left-bottom' || placement === 'right-bottom') {
                        top = selectionRect.top - (pickerHeight - selectionRect.height) + scrollTop
                    }
                    if (hasRight) {
                        placement = placement.replace('right', 'left')
                    }
                } else {
                    top = 0
                    left = -(pickerWidth + offset)
                }
            } else if ((hasRight && showInRight) || (hasLeft && !showInLeft)) {
                if (transfer) {
                    top = selectionRect.top + scrollTop
                    left = selectionRect.left + selectionRect.width + offset + scrollLeft
                    if (placement === 'right' || placement === 'left') {
                        top = selectionRect.top + scrollTop - (pickerHeight - selectionRect.height) / 2
                    }
                    if (placement === 'right-bottom' || placement === 'left-bottom') {
                        top = selectionRect.top + scrollTop - (pickerHeight - selectionRect.height)
                    }
                    if (hasLeft) {
                        placement = placement.replace('left', 'right')
                    }
                }
            }
            if (transfer && !showInBottom && (hasRight || hasLeft)) {
                top = selectionRect.top - (pickerHeight - selectionRect.height) + scrollTop
                if (hasRight) {
                    placement = showInRight ? 'right-bottom' : 'left-bottom'
                }
                if (hasLeft) {
                    placement = showInLeft ? 'left-bottom' : 'right-bottom'
                }
            }
        }
    }

    console.log(placement)

    const origin = origins[placement]

    if (callback) {
        callback(top, left, origin, placement)
    }
}
