import React, { useCallback, useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { isDescendent } from '@/utils/dom/element'
import { dropdownClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import Button from '../Button'
import AnimationList from '../List'
import AbsoluteList from '../List/AbsoluteList'
import Caret from '../icons/Caret'
import Position from './enum/Position'
import { IDropDownProps } from './type'

const Dropdown: React.FC<IDropDownProps> = (props) => {
    const {
        animation,
        placeholder,
        className,
        style,
        trigger,
        data,
        width,
        onClick,
        columns,
        renderItem,
        absolute,
        listClassName,
        isSub,
        disabled,
        buttonProps,
        showCaret = true,
    } = props
    const [show, updateShow] = useSafeState(false)
    const dropdownParentElementRef = useRef<HTMLDivElement>()
    const animationListRef = useRef<HTMLDivElement>()
    const dropdownId = useRef(getUidStr()).current
    const isRendered = useRef(false)
    const timer = useRef<NodeJS.Timeout>()
    const position = (() => {
        let pos: string = props.position

        if (pos !== 'auto') return pos
        if (!dropdownParentElementRef.current) return 'bottom-left'

        /** 如果position是auto 计算位置给出最合适的position */
        const windowHeight = docSize.height
        const windowWidth = docSize.width
        const rect = dropdownParentElementRef.current.getBoundingClientRect()

        pos = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
        pos += rect.right > windowWidth / 2 ? 'right' : 'left'

        return pos as IDropDownProps['position']
    })()

    const handleHide = useCallback(
        (delay = 240) => {
            const dismiss = () => {
                updateShow(false)

                if (trigger === 'click') {
                    toggleDocumentEvent(false)
                }
            }

            timer.current = setTimeout(dismiss, delay)
        },
        [trigger, show]
    )

    const clickAway = useCallback(
        (e: MouseEvent) => {
            const desc = isDescendent(e.target as HTMLElement, dropdownId)

            if (desc) return

            handleHide(0)
        },
        [handleHide]
    )

    const toggleDocumentEvent = useCallback(
        (isBind: boolean) => {
            const method = isBind ? 'addEventListener' : 'removeEventListener'

            setTimeout(() => {
                document[method]('click', clickAway)
            })
        },
        [clickAway]
    )

    const handleShow = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        if (disabled) return

        if (show) return

        updateShow(true)

        if (trigger === 'click') {
            toggleDocumentEvent(true)
        }
    }, [show, disabled, toggleDocumentEvent])

    const handleDropdownClick = useCallback(
        (itemData) => {
            if (itemData.disabled || !onClick) return

            onClick(itemData)

            handleHide(0)
        },
        [onClick]
    )

    function renderButton() {
        const spanClassName = dropdownClass('button-content')

        if (isSub) {
            return (
                <span
                    className={dropdownClass('button', 'item', show && 'active', disabled && 'disabled')}
                    onClick={handleShow}
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
                onClick={handleShow}
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

    function renderList() {
        if (!Array.isArray(data) || data.length === 0) return null
        if (!isRendered.current && !show) return renderButton()

        isRendered.current = true

        return (
            <>
                <AbsoluteList
                    focus={show}
                    absolute={absolute}
                    getParentElement={() => dropdownParentElementRef.current}
                    getListElement={() => animationListRef.current}
                    position={position}
                    style={{ width }}
                    fixed="min"
                >
                    {({ style: absoluteStyle, resetPosition }) => (
                        /** 嵌套的Dropdown的absolute均为false */
                        <AnimationList
                            lazyDom
                            tag="ul"
                            show={show}
                            style={absoluteStyle}
                            className={classnames(dropdownClass('menu', columns > 1 && 'box-list'), listClassName)}
                            animationTypes={['fade']}
                            data-id={dropdownId}
                            duration={animation ? 'fast' : 0}
                            getRef={(list) => (animationListRef.current = list)}
                            onTransitionEnd={resetPosition}
                        >
                            {data.map((d) => {
                                const childPosition = Position[position]

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
                                            onClick={handleDropdownClick.bind(this, d)}
                                            renderItem={renderItem}
                                            trigger={trigger}
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
                                        onClick={handleDropdownClick.bind(this, d)}
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

                {renderButton()}
            </>
        )
    }

    return (
        <div
            ref={dropdownParentElementRef}
            className={classnames(dropdownClass('_', position), className)}
            style={style}
            onMouseEnter={trigger !== 'click' ? handleShow : undefined}
            onMouseLeave={trigger !== 'click' ? handleHide : undefined}
            data-id={dropdownId}
        >
            {renderList()}
        </div>
    )
}

Dropdown.defaultProps = {
    disabled: false,
    data: [],
    trigger: 'click',
    animation: true,
    position: 'auto',
}

Dropdown.displayName = 'EthanDropdown'

export default Dropdown
