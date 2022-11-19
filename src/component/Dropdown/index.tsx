import React, { createRef } from 'react'
import { isDescendent } from '@/utils/dom/element'
import { dropdownClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import Button from '../Button'
import AnimationList, { FAST_TRANSITION_DURATION } from '../List'
import AbsoluteList from '../List/AbsoluteList'
import Caret from '../icons/Caret'
import Position from './enum/Position'
import { DropDownData, IDropDownProps } from './type'

interface DropdownState {
    show: boolean
}

class Dropdown extends PureComponent<IDropDownProps, DropdownState> {
    dropdownParentElementRef = createRef<HTMLDivElement>()

    dropdownId = getUidStr()

    timer: NodeJS.Timeout

    isRendered = false

    static defaultProps = {
        disabled: false,
        data: [],
        trigger: 'click',
        animation: true,
        position: 'auto',
        showCaret: true,
    }

    get position() {
        let pos: string = this.props.position

        if (pos !== 'auto') return pos
        if (!this.dropdownParentElementRef.current) return 'bottom-left'

        /** 如果position是auto 计算位置给出最合适的position */
        const windowHeight = docSize.height
        const windowWidth = docSize.width
        const rect = this.dropdownParentElementRef.current.getBoundingClientRect()

        pos = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
        pos += rect.right > windowWidth / 2 ? 'right' : 'left'

        return pos as IDropDownProps['position']
    }

    constructor(props) {
        super(props)

        this.state = {
            show: false,
        }
    }

    clickAway = (e: MouseEvent) => {
        const desc = isDescendent(e.target as HTMLElement, this.dropdownId)

        if (desc) return

        this.handleQuickHide()
    }

    toggleDocumentEvent = (isBind: boolean) => {
        const method = isBind ? 'addEventListener' : 'removeEventListener'

        document[method]('click', this.clickAway)
    }

    handleShow = () => {
        const { trigger, disabled } = this.props
        const { show } = this.state

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }
        if (disabled || show) return

        this.setState({ show: true })

        trigger === 'click' && this.toggleDocumentEvent(true)
    }

    handleDelayToHide = () => {
        const { trigger } = this.props

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }

        if (!this.state.show) return

        this.timer = setTimeout(() => {
            this.setState({ show: false })

            trigger === 'click' && this.toggleDocumentEvent(false)
        }, FAST_TRANSITION_DURATION)
    }

    handleQuickHide = () => {
        const { trigger } = this.props

        this.setState({ show: false })

        trigger === 'click' && this.toggleDocumentEvent(false)
    }

    handleDropdownClick = (itemData: DropDownData) => {
        const { onClick, clickHoverItemDismiss } = this.props

        if (itemData.disabled || !onClick) return

        onClick(itemData)

        this.handleQuickHide()

        /** hover模式下 点击Item，顶层的Dropdown需要立即消失，而非clickaway事件驱动消失 */
        if (clickHoverItemDismiss) {
            clickHoverItemDismiss()
        }
    }

    renderButton = () => {
        const { isSub, disabled, showCaret, placeholder, buttonProps } = this.props
        const { show } = this.state
        const spanClassName = dropdownClass('button-content')

        if (isSub) {
            return (
                <span
                    className={dropdownClass('button', 'item', show && 'active', disabled && 'disabled')}
                    onClick={this.handleShow}
                    key="button"
                >
                    <span className={spanClassName}>{placeholder}</span>
                    {showCaret && (
                        <span className={dropdownClass('caret')}>
                            <Caret />
                        </span>
                    )}
                </span>
            )
        }

        // Dropdown children
        return (
            <Button
                disabled={disabled}
                onClick={this.handleShow}
                className={dropdownClass('button')}
                key="button"
                {...buttonProps}
            >
                <span className={spanClassName}>{placeholder}</span>
                {showCaret && (
                    <span className={dropdownClass('caret')}>
                        <Caret />
                    </span>
                )}
            </Button>
        )
    }

    renderList = () => {
        const { data, absolute, width, animation, columns, listClassName, showCaret, trigger, renderItem } = this.props
        const { show } = this.state

        if (!Array.isArray(data) || data.length === 0) return null
        if (!this.isRendered && !show) return this.renderButton()

        this.isRendered = true

        return (
            <>
                <AbsoluteList
                    focus={show}
                    absolute={absolute}
                    getParentElement={() => this.dropdownParentElementRef.current}
                    position={this.position}
                    style={{ width }}
                    fixed="min"
                >
                    {({ style: absoluteStyle }) => (
                        /** 嵌套的Dropdown的absolute均为false */
                        <AnimationList
                            lazyDom
                            tag="ul"
                            show={show}
                            style={absoluteStyle}
                            className={classnames(dropdownClass('menu', columns > 1 && 'box-list'), listClassName)}
                            animationTypes={['fade']}
                            data-id={this.dropdownId}
                            duration={animation ? 'fast' : 0}
                        >
                            {data.map((d) => {
                                const childPosition = Position[this.position]

                                if (d.children) {
                                    return (
                                        <Dropdown
                                            isSub
                                            showCaret={showCaret}
                                            style={{ width: '100%' }}
                                            data={d.children}
                                            disabled={d.disabled}
                                            placeholder={d.content}
                                            key={d.key}
                                            position={childPosition}
                                            onClick={this.handleDropdownClick.bind(this, d)}
                                            renderItem={renderItem}
                                            trigger={trigger}
                                            clickHoverItemDismiss={trigger === 'hover' && this.handleQuickHide}
                                        />
                                    )
                                }

                                const itemWidth = width && columns ? (width - 2) / columns : undefined
                                const itemStyle = itemWidth ? { display: 'inline-block', width: itemWidth } : undefined
                                const itemClassName = dropdownClass(
                                    'item',
                                    !width && 'no-width',
                                    d.disabled && 'disabled'
                                )

                                return (
                                    <li
                                        data-rote="dropdown-leaf"
                                        onClick={this.handleDropdownClick.bind(this, d)}
                                        className={itemClassName}
                                        style={itemStyle}
                                        key={d.key}
                                    >
                                        {d.content}
                                    </li>
                                )
                            })}
                        </AnimationList>
                    )}
                </AbsoluteList>

                {this.renderButton()}
            </>
        )
    }

    render() {
        const { className, style, trigger } = this.props

        return (
            <div
                ref={this.dropdownParentElementRef}
                className={classnames(dropdownClass('_', this.position), className)}
                style={style}
                onMouseEnter={trigger !== 'click' ? this.handleShow : undefined}
                onMouseLeave={trigger !== 'click' ? this.handleDelayToHide : undefined}
                data-id={this.dropdownId}
            >
                {this.renderList()}
            </div>
        )
    }
}

export default Dropdown
