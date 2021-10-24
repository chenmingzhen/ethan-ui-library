import React, { cloneElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { menuClass } from '@/styles'
import { isLink } from '@/utils/is'
import List from './List'
import { consumer } from './context'
import { BaseData, MenuItemProps } from './type'

interface MenuItemState {
    open: boolean

    isActive: boolean

    isHighLight: boolean

    inPath: boolean
}

class Item extends PureComponent<MenuItemProps, MenuItemState> {
    element: HTMLLIElement

    handleMouseEnter

    handleMouseLeave

    constructor(props: MenuItemProps) {
        super(props)

        const { key } = props.data

        const [activeUpdate, openUpdate, inPathUpdate] = props.bindItem(
            key,
            this.update.bind(this),
            this.updateOpen.bind(this),
            this.updateInPath.bind(this)
        )

        this.state = {
            open: openUpdate(key),
            isActive: activeUpdate(key),
            inPath: inPathUpdate(key),
            isHighLight: false,
        }

        this.handleMouseEnter = this.handleToggle.bind(this, true)
        this.handleMouseLeave = this.handleToggle.bind(this, false)
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.props.unbindItem?.(this.props.data.key)

        this.unbindDocumentEvent()
    }

    getKey = () => {
        return this.props.data.key ?? this.props.index
    }

    bindElement = el => {
        this.element = el
    }

    unbindDocumentEvent = () => {
        document.removeEventListener('click', this.handleMouseLeave)
    }

    // Root中updateActive时触发 check为Root的checkActive
    update(check, activePath: Map<string | number, boolean>) {
        const isActive = check(this.props.data.key)

        const isHighLight = activePath && isActive ? activePath.has(this.props.data.key) : false

        this.setState({ isActive, isHighLight })
    }

    // Root中updateOpen时触发 check为Root的checkOpen
    updateOpen(check) {
        const isOpen = check(this.getKey())

        this.setState({ open: isOpen })
    }

    updateInPath(check) {
        const inPath = check(this.props.data.key)

        this.setState({ inPath })
    }

    handleToggle = open => {
        const { toggleOpenKeys } = this.props

        const key = this.getKey()

        if (open) {
            toggleOpenKeys(key, true)

            document.addEventListener('click', this.handleMouseLeave)
        } else {
            toggleOpenKeys(key, false)

            this.unbindDocumentEvent()
        }
    }

    handleClick = (e: React.MouseEvent) => {
        const { data, onClick, mode, toggleOpenKeys } = this.props

        if (data.disabled) return

        if (mode === 'inline' && data?.children?.length) {
            toggleOpenKeys(this.getKey(), !this.state.open)
        }

        if (typeof data.onClick === 'function') {
            data.onClick(data)
        } else if (
            (!data.children || data?.children?.length === 0 || !!data.onClick) &&
            typeof onClick === 'function'
        ) {
            onClick(data.key, data)
        }

        const isLeaf = data?.children?.length === 0

        // 阻止事件冒泡并且阻止该元素上同事件类型的监听器被触发
        if (!isLeaf) e.nativeEvent.stopImmediatePropagation()
    }

    /**
     * 自定义render的Click事件触发
     */
    handleItemClick = (clickMethod, e) => {
        clickMethod?.()

        this.handleClick(e)
    }

    handleSwitch = e => {
        const { renderItem, data } = this.props

        const item = renderItem?.(data) as React.ReactElement

        if (item?.props?.onClick) {
            this.handleItemClick(item.props.onClick, e)
        } else {
            this.handleClick(e)
        }
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

            item = cloneElement(item, { className: mergeClass, style: mergeStyle, onClick: this.handleSwitch })
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
                        path={this.getKey()}
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
