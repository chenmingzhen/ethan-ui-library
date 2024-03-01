import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import { getPortalSubMenuStyle } from '@/utils/position'
import { styles } from '@/utils/style/styles'
import { DirectionalTriggerProps } from './type'
import Trigger from '../Trigger'
import MenuContext from './context/MenuContext'
import { MoreItemContext } from '../More/context'

/**
 * 不同模式下触发打开Menu机制
 * 1.hover模式下，SubMenu和MenuItem触发MouseEnter和MouseLeave，打开对应路径
 * 2.click模式下，SubMenu和MenuItem触发Click，当点击document时，传入isChainComponentKey和onClickAway到trigger中，由Trigger关闭Menu
 */

const DirectionalTrigger: React.FC<DirectionalTriggerProps> = function (props) {
    const { visible, dataItem, path, popupContent, children, className, direction } = props
    const { disabled } = dataItem
    const moreItemContext = useContext(MoreItemContext) || {}
    const [triggerElement, setTriggerElement] = useState<HTMLElement>()
    const [portalElement, setPortalElement] = useState<HTMLElement>()
    const { onMouseEnterOpen, onMouseLeaveClose, onMouseClickToggle, subMenuTriggerActions, componentKey } =
        useContext(MenuContext)
    const realDirection = path.length > 1 ? 'vertical' : direction

    const popupStyle = styles(
        getPortalSubMenuStyle(triggerElement, portalElement, realDirection),
        /** 避免在进行关闭动画中，鼠标动作再次触发打开SubMenu的行为，导致异常 */
        !visible && { pointerEvents: 'none' }
    )

    return (
        <Trigger
            visible={visible}
            componentKey={componentKey}
            bindPortalElement={setPortalElement}
            bindTriggerElement={setTriggerElement}
            getPopupContainer={() => document.body}
            portalClassName={menuClass('absolute')}
            triggerActions={disabled ? [] : subMenuTriggerActions}
            onClickAway={() => onMouseClickToggle(dataItem, false)}
            motionPopupProps={{
                enter: true,
                leave: true,
                name: menuClass('_'),
                leaveClassName: menuClass('hidden'),
                popup: (
                    <ul style={popupStyle} className={menuClass('list', realDirection)}>
                        {popupContent}
                    </ul>
                ),
            }}
        >
            <li
                {...moreItemContext}
                tabIndex={-1}
                className={className}
                onMouseEnter={() => onMouseEnterOpen(dataItem)}
                onMouseLeave={() => onMouseLeaveClose(dataItem)}
                onClick={() => onMouseClickToggle(dataItem, !visible)}
            >
                <span className={classnames(menuClass('title'))}>
                    {children}
                    <span className={menuClass('expand')} />
                </span>
            </li>
        </Trigger>
    )
}

export default React.memo(DirectionalTrigger)
