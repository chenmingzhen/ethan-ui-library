import React, { createRef } from 'react'
import { isDescendent } from '@/utils/dom/element'
import { dropdownClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { styles } from '@/utils/style/styles'
import { getDropdownPortalStyle } from '@/utils/position'
import Button from '../Button'
import AnimationList, { FAST_TRANSITION_DURATION } from '../List'
import Caret from '../icons/Caret'
import Position from './enum/Position'
import { DropDownData, DropDownProps, IDropDownProps } from './type'
import Portal from '../Portal'

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

    static getDerivedStateFromProps(nextProps: IDropDownProps, prevState: DropdownState) {
        return {
            show: nextProps.visible ?? prevState.show,
        }
    }

    get hasVisible() {
        return 'visible' in this.props
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

    constructor(props: IDropDownProps) {
        super(props)

        this.state = {
            show: props.visible || false,
        }
    }

    componentDidMount() {
        super.componentDidMount()

        if (this.props.visible) {
            this.toggleDocumentEvent(true)
        }

        if (this.state.show) {
            this.setShow(true)
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()

        this.toggleDocumentEvent(false)
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

    setShow = (show: boolean) => {
        this.setState({ show })
    }

    handleShow = () => {
        const { trigger, disabled, onVisibleChange } = this.props
        const { show } = this.state

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }

        if (onVisibleChange) {
            onVisibleChange(true)
        }

        if (disabled || show) return

        this.setShow(true)

        trigger === 'click' && this.toggleDocumentEvent(true)
    }

    handleDelayToHide = () => {
        const { trigger, onVisibleChange, animation } = this.props

        if (!animation) {
            this.handleQuickHide()

            return
        }

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }

        if (onVisibleChange) {
            onVisibleChange(false)
        }

        if (!this.state.show || this.hasVisible) return

        this.timer = setTimeout(() => {
            this.setShow(false)

            trigger === 'click' && this.toggleDocumentEvent(false)
        }, FAST_TRANSITION_DURATION)
    }

    handleQuickHide = () => {
        const { trigger, onVisibleChange } = this.props

        if (onVisibleChange) {
            onVisibleChange(false)
        }

        if (this.hasVisible) return

        this.setShow(false)

        trigger === 'click' && this.toggleDocumentEvent(false)
    }

    handleDropdownClick = (itemData: DropDownData) => {
        const { onClick, clickHoverItemDismiss } = this.props

        if (itemData.disabled) return

        if (onClick) onClick(itemData)

        if (!this.hasVisible) {
            this.handleQuickHide()

            /** hover模式下 点击Item，顶层的Dropdown需要立即消失，而非clickaway事件驱动消失 */
            if (clickHoverItemDismiss) {
                clickHoverItemDismiss()
            }
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
        const { data, portal, width, animation, columns, listClassName, showCaret, trigger, renderItem } = this.props
        const { show } = this.state

        if (!Array.isArray(data) || data.length === 0) return null
        if (!this.isRendered && !show) return this.renderButton()

        this.isRendered = true

        const rect = this.dropdownParentElementRef.current?.getBoundingClientRect()

        const ms = styles({ width }, portal && getDropdownPortalStyle(rect, this.position))

        /** 嵌套的Dropdown的portal均为false,基于上一个Dropdown定位 */
        return (
            <>
                <Portal portal={portal}>
                    <AnimationList
                        lazyDom
                        tag="ul"
                        show={show}
                        style={ms}
                        className={classnames(dropdownClass('menu', columns > 1 && 'box-list'), listClassName)}
                        animationTypes={['fade']}
                        data-id={this.dropdownId}
                        duration={animation ? 'fast' : 0}
                    >
                        {data.map((d) => {
                            const childPosition = Position[this.position]

                            if (d.children) {
                                // 旧写法 => style={{ width: '100%' }}
                                // 新写法 => style={{width:'100%',display:'block'}} === dropdownClass('sub')
                                // 使用旧写法的时候，在Portal的情况下，Dropdown的宽度出现异常，在子Item没有溢出Parent的宽度的时候，Dropdown超过了Parent的宽度
                                return (
                                    <Dropdown
                                        isSub
                                        className={dropdownClass('sub')}
                                        showCaret={showCaret}
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
                            const itemClassName = dropdownClass('item', !width && 'no-width', d.disabled && 'disabled')

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
                </Portal>

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

export default Dropdown as unknown as React.ClassicComponentClass<DropDownProps>
