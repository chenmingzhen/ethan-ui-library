import React, { createElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { treeClass } from '@/styles'
import { runInNextFrame } from '@/utils/nextFrame'
import Content from './Content'
import { TreeNodeProps, TreeNodeState } from './type'

const placeElement = document.createElement('div')
placeElement.className = treeClass('drag-place')

const innerPlaceElement = document.createElement('div')
placeElement.appendChild(innerPlaceElement)

let isDragging = false

class Node extends PureComponent<TreeNodeProps, TreeNodeState> {
    element: HTMLDivElement

    dragImage: HTMLImageElement

    get isLeaf() {
        const { childrenKey, data, loader } = this.props
        const { fetching } = this.state
        const children = data[childrenKey]

        if (children && children.length > 0) return false
        if (Array.isArray(children) || children === null) return true
        if (fetching && !children) return false
        if (loader && !fetching) return false

        return true
    }

    constructor(props: TreeNodeProps) {
        super(props)

        const { expanded, active } = props.bindNode(props.id, this.update)

        this.state = { expanded, fetching: false, active }
    }

    componentDidMount() {
        /** For drag */
        const { expanded, active } = this.props.bindNode(this.props.id, this.update)

        this.setState({ expanded, active })
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.unbindNode(this.props.id)
    }

    setFetching = fetching => {
        this.setState({ fetching })
    }

    update = (key: keyof TreeNodeState & string, value: boolean) => {
        if (this.state[key] !== value) this.setState(({ [key]: value } as unknown) as TreeNodeState)
    }

    bindElement = el => {
        this.element = el
    }

    handleToggle = () => {
        const { id, onToggle } = this.props
        // eslint-disable-next-line
        const expanded = !this.state.expanded

        this.setState({ expanded })

        if (onToggle) onToggle(id, expanded)
    }

    handleDragStart: React.DragEventHandler<HTMLDivElement> = evt => {
        if (isDragging) return

        isDragging = true

        const { dragImageStyle } = this.props

        /** DataTransfer 对象用于保存拖动并放下（drag and drop）过程中的数据 */
        /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer */
        evt.dataTransfer.effectAllowed = 'copyMove'
        // evt.dataTransfer.setData('text/plain', String(id))

        const dragImage = this.element.querySelector(`.${treeClass('content')}`)

        const rect = dragImage.getBoundingClientRect()

        this.dragImage = dragImage.cloneNode(true) as HTMLImageElement

        document.body.appendChild(this.dragImage)

        if (dragImageStyle) {
            Object.keys(dragImageStyle).forEach(k => {
                this.dragImage.style[k] = dragImageStyle[k]
            })
        }

        evt.dataTransfer.setDragImage(this.dragImage, evt.clientX - rect.left, evt.clientY - rect.top)

        runInNextFrame(() => {
            this.element.style.display = 'none'
        })
    }

    handleDragOver: React.DragEventHandler<HTMLDivElement> = evt => {
        if (!isDragging) return

        const { dragHoverExpand, id } = this.props

        if (dragHoverExpand && !this.state.expanded) this.handleToggle()

        const hoverElement = this.element
        const hoverElementRect = hoverElement.getBoundingClientRect()
        /** event target 可能为Node中的DOM的子节点 */
        const dragElementClientHeight = evt.currentTarget.getBoundingClientRect().height
        const hoverElementMiddleY = (hoverElementRect.bottom - hoverElementRect.top) / 2
        const hoverElementClientY = evt.clientY - hoverElementRect.top

        let position = this.props.index

        /** 操作placeholderInner的高度，placeholder的高度在样式中始终为0，如果放置hover元素内，inner高度撑开，实现放入效果 */
        innerPlaceElement.style.height = '0px'

        if (hoverElementClientY < hoverElementMiddleY + dragElementClientHeight * 0.2) {
            /** 放置hover元素的上方 */
            hoverElement.parentNode.insertBefore(placeElement, hoverElement)

            /** 放置hover元素内 */
            if (hoverElementClientY > dragElementClientHeight * 0.3) {
                position = -1
                innerPlaceElement.style.height = `${hoverElementRect.height}px`
            }
        } else {
            /** 放置hover元素的下方 */
            position += 1
            /** hoverElement.nextElementSibling为空时放置到hoverElement的后面 */
            hoverElement.parentNode.insertBefore(placeElement, hoverElement.nextElementSibling)
        }

        placeElement.setAttribute('data-target', String(id))

        placeElement.setAttribute('data-position', String(position))
    }

    handleDragEnd = () => {
        this.element.style.display = ''

        if (!isDragging || !placeElement.parentNode) return

        isDragging = false

        document.body.removeChild(this.dragImage)

        const { id, onDrop } = this.props

        const position = parseInt(placeElement.getAttribute('data-position'), 10)

        const target = placeElement.getAttribute('data-target')

        placeElement.parentNode.removeChild(placeElement)

        if (target !== id) {
            onDrop(id, target, position)
        }
    }

    render() {
        const { data, listComponent, onDrop, childrenClass, leafClass, ...other } = this.props
        const children = data[other.childrenKey]
        const hasChildren = children && children.length > 0
        const { expanded, fetching } = this.state
        const wrapProps: React.HTMLAttributes<HTMLDivElement> = {}
        const listProps = {
            ...other,
            data: children,
            expanded,
            onDrop,
            leafClass,
            childrenClass,
            childrenClassName: childrenClass(data),
        }

        if (onDrop) {
            Object.assign(wrapProps, {
                draggable: true,
                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd,
            })
        }

        return (
            <div
                {...wrapProps}
                ref={this.bindElement}
                className={classnames(treeClass('node'), this.isLeaf && leafClass(data))}
                onClick={() => {
                    this.forceUpdate()
                }}
            >
                <Content
                    {...other}
                    active={this.state.active}
                    data={data}
                    expanded={expanded}
                    onToggle={this.handleToggle}
                    onDragOver={this.handleDragOver}
                    setFetching={this.setFetching}
                    fetching={fetching}
                />
                {hasChildren && createElement(listComponent, listProps)}
            </div>
        )
    }
}

export default Node
