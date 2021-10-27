import React, { cloneElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { menuClass } from '@/styles'
import { isLink } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import List from './List'
import { consumer } from './context'
import { MenuItemProps, UpdateActive, UpdateInPath, UpdateOpen } from './type'

interface MenuItemState {
    open: boolean

    isActive: boolean

    isHighLight: boolean

    inPath: boolean
}

class Item extends PureComponent<MenuItemProps, MenuItemState> {
    element: HTMLLIElement

    id: string

    handleMouseEnter

    handleMouseLeave

    constructor(props: MenuItemProps) {
        super(props)

        this.id = `${props.path},${getUidStr()}`

        props.bindItem(this.id, props.data.key, this.updateActive, this.updateOpen, this.updateInPath)

        const { checkOpen, checkActive, checkInPath } = props

        this.state = {
            open: checkOpen(this.id),
            isActive: checkActive(this.id),
            inPath: checkInPath(this.id),
            isHighLight: false,
        }

        this.handleMouseEnter = this.handleToggle.bind(this, true)
        this.handleMouseLeave = this.handleToggle.bind(this, false)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.unbindItem?.(this.id)

        this.unbindDocumentEvent()
    }

    bindElement = el => {
        this.element = el
    }

    unbindDocumentEvent = () => {
        document.removeEventListener('click', this.handleMouseLeave)
    }

    updateActive: UpdateActive = (activePath: string) => {
        const { checkActive } = this.props

        const isActive = checkActive(this.id)

        const isHighLight = activePath && isActive ? activePath.indexOf(this.id) > -1 : false

        this.setState({ isActive, isHighLight })
    }

    updateOpen: UpdateOpen = () => {
        const { checkOpen } = this.props

        const isOpen = checkOpen(this.id)

        this.setState({ open: isOpen })
    }

    updateInPath: UpdateInPath = () => {
        const { checkInPath } = this.props

        const inPath = checkInPath(this.id)

        this.setState({ inPath })
    }

    handleToggle = open => {
        const { toggleOpenKeys } = this.props

        const { id } = this

        if (open) {
            toggleOpenKeys(id, true)

            document.addEventListener('click', this.handleMouseLeave)
        } else {
            toggleOpenKeys(id, false)

            this.unbindDocumentEvent()
        }
    }

    handleClick = (e: React.MouseEvent) => {
        const { data, onClick, mode, toggleOpenKeys } = this.props

        if (data.disabled) return

        if (mode === 'inline' && data?.children?.length) {
            toggleOpenKeys(this.id, !this.state.open)
        }

        if (!data.children?.length) {
            onClick?.(this.id, data)
        }

        const isLeaf = data?.children?.length === 0

        // 阻止事件冒泡并且阻止该元素上同事件类型的监听器被触发
        if (!isLeaf) e.nativeEvent.stopImmediatePropagation()
    }

    handleIsLinkClick = e => {
        const { renderItem, data } = this.props

        const item = renderItem?.(data) as React.ReactElement

        item?.props?.onClick?.()

        this.handleClick(e)
    }

    render() {
        const { data, renderItem, mode, level, onClick, inlineIndent, toggleOpenKeys, bottomLine, topLine } = this.props

        const { open, isActive, isHighLight, inPath } = this.state

        const { children: dChildren } = data

        const children = dChildren || []

        const isDisabled = data.disabled

        let isUp = false

        if (mode === 'vertical-auto' && this.element) {
            isUp = this.element.getBoundingClientRect().bottom - topLine > (bottomLine - topLine) / 2
        }

        const className = menuClass(
            'item',
            isDisabled === true && 'disabled',
            children.length > 0 ? 'has-children' : 'no-children',
            isActive && 'active',
            open && 'open',
            isUp && 'open-up',
            isHighLight && 'highlight',
            inPath && 'in-path'
        )

        const style: React.CSSProperties = {}
        const events: {
            onMouseEnter?: React.MouseEventHandler<HTMLLIElement>
            onMouseLeave?: React.MouseEventHandler<HTMLLIElement>
        } = {}

        if (mode === 'inline') {
            style.paddingLeft = 20 + level * inlineIndent
        } else {
            // 处理非inline的特殊情况 鼠标靠近离开就触发
            events.onMouseEnter = this.handleMouseEnter
            events.onMouseLeave = this.handleMouseLeave
        }

        let item = renderItem?.(data) as React.ReactElement

        if (isLink(item)) {
            const mergeClass = classnames(menuClass('title'), item.props && item.props.className)

            const mergeStyle = Object.assign({}, style, item.props && item.props.style)

            item = cloneElement(item, { className: mergeClass, style: mergeStyle, onClick: this.handleIsLinkClick })
        } else {
            const props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> = {
                className: menuClass('title'),
                style,
                onClick: this.handleClick,
                target: data.target,
            }

            if (data.linkKey) props.href = data.linkKey

            item = <a {...props}>{item}</a>
        }

        return (
            <li className={className} ref={this.bindElement} {...events}>
                {item}
                {children.length > 0 && (
                    <List
                        data={children}
                        renderItem={renderItem}
                        inlineIndent={mode === 'horizontal' ? 0 : inlineIndent}
                        mode={mode === 'horizontal' ? 'inline' : mode}
                        onClick={onClick}
                        path={this.id}
                        level={level + 1}
                        open={open}
                        toggleOpenKeys={toggleOpenKeys}
                    />
                )}
            </li>
        )
    }
}

export default consumer(Item)
