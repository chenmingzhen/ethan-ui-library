import React, { useRef } from 'react'
import useSafeState from '@/hooks/useSafeState'
import { getParent } from '@/utils/dom/element'
import { dropdownClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import Button from '../Button'
import List from '../List'
import Item from './Item'
import generateAbsoluteList from '../List/AbsoluteList'
import absoluteConsumer from '../Table/context'
import Caret from '../icons/Caret'
import Position from './enum/Position'
import { ComplicatedDropDownData, IDropDownProps } from './type'

/** @TODO 矫正position的方向，顺带修改absoluteList的getPosition的判断 */
const Dropdown: React.FC<IDropDownProps> = props => {
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
        renderPlaceholder,
        disabled,
        buttonProps,
    } = props

    const dropdownParentElement = useRef<HTMLDivElement>()

    const dropdownId = useRef(getUidStr()).current

    const DropdownList = useRef(
        generateAbsoluteList(({ focus, ...other }) => (
            <List {...other} show={focus} animationTypes={['fade']} duration={animation ? 'fast' : 0} />
        ))
    ).current

    const closeTimer = useRef<NodeJS.Timeout>()

    function getPosition() {
        let pos: string = props.position

        if (pos !== 'auto') return pos

        if (!dropdownParentElement.current) return 'bottom-left'

        // 如果position是auto 计算位置给出最合适的position
        const windowHeight = docSize.height

        const windowWidth = docSize.width

        const rect = dropdownParentElement.current.getBoundingClientRect()

        pos = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
        pos += rect.right > windowWidth / 2 ? 'right' : 'left'

        return pos as IDropDownProps['position']
    }

    const position = getPosition()

    const [show, setShow] = useSafeState(false)

    function clickAway(e: MouseEvent) {
        const el = getParent(e.target, 'a')

        const onSelf = absolute
            ? getParent(e.target, `[data-id=${dropdownId}]`)
            : el === dropdownParentElement.current || dropdownParentElement.current?.contains(el)

        if (el?.getAttribute('data-role') === 'item' && onSelf) return

        handleHide(0)
    }

    function toggleDocumentEvent(isBind: boolean) {
        const method = isBind ? 'addEventListener' : 'removeEventListener'

        document[method]('click', clickAway)
    }

    function handleFocus() {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current)
        }

        if (show) return

        setShow(true)

        toggleDocumentEvent(true)
    }

    function handleHide(delay = 200) {
        closeTimer.current = setTimeout(() => {
            setShow(false)

            toggleDocumentEvent(false)
        }, delay)
    }

    function handleToggle(isShow: boolean) {
        if (trigger === 'click') return

        if (isShow) handleFocus()
        else {
            handleHide()
        }
    }

    const cls = `${dropdownClass('_', position)} ${className ?? ''}`

    function renderButton() {
        const buttonClassName = dropdownClass('button')

        const spanClassName = dropdownClass('button-content')

        const caret = (
            <span className={dropdownClass('caret')}>
                <Caret />
            </span>
        )

        if (isSub) {
            return (
                <a
                    key="button"
                    className={dropdownClass('button', 'item', show && 'active')}
                    data-role="item"
                    onClick={handleFocus}
                >
                    <span className={spanClassName}>{placeholder}</span>
                    {caret}
                </a>
            )
        }

        if (renderPlaceholder) {
            return renderPlaceholder(disabled, handleFocus)
        }

        return (
            <Button disabled={disabled} onClick={handleFocus} className={buttonClassName} key="button" {...buttonProps}>
                <span className={spanClassName}>{placeholder}</span>
                {caret}
            </Button>
        )
    }

    function renderList() {
        if (!Array.isArray(data) || data.length === 0) return null

        return (
            <>
                <DropdownList
                    absolute={absolute}
                    parentElement={dropdownParentElement.current}
                    position={position}
                    className={classnames(dropdownClass('menu', columns > 1 && 'box-list'), listClassName)}
                    style={{ width }}
                    key="list"
                    focus={show}
                    data-id={dropdownId}
                    fixed="min"
                >
                    {data.map((d: ComplicatedDropDownData, index) => {
                        const childPosition = Position[position]

                        const itemClassName = dropdownClass('item', !width && 'no-width')

                        return d.children ? (
                            <Dropdown
                                style={{ width: '100%' }}
                                data={d.children}
                                disabled={d.disabled}
                                placeholder={d.content}
                                key={index}
                                position={childPosition}
                                onClick={onClick}
                                renderItem={renderItem}
                                trigger={trigger}
                                isSub
                            />
                        ) : (
                            <Item
                                data={d}
                                key={index}
                                onClick={d.onClick || onClick}
                                itemClassName={itemClassName}
                                renderItem={renderItem}
                                columns={columns}
                                width={width}
                            />
                        )
                    })}
                </DropdownList>

                {renderButton()}
            </>
        )
    }

    return (
        <div
            ref={dropdownParentElement}
            className={cls}
            style={style}
            onMouseEnter={handleToggle.bind(this, true)}
            onMouseLeave={handleToggle.bind(this, false)}
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

export default absoluteConsumer(React.memo(Dropdown)) as typeof Dropdown
