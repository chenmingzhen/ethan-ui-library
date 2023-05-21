import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import { getPortalSubMenuStyle } from '@/utils/position'
import useRefMethod from '@/hooks/useRefMethod'
import { styles } from '@/utils/style/styles'
import { VerticalTriggerProps } from './type'
import Trigger from '../Trigger'
import MenuContext from './context/MenuContext'
import { getPathStr } from './util'

/**
 * 不同模式下触发打开Menu机制
 * 1.hover模式下，SubMenu和MenuItem触发MouseEnter和MouseLeave，打开对应路径
 * 2.click模式下，SubMenu和MenuItem触发Click，当点击document时，传入isChainComponentKey和onClickAway到trigger中，由Trigger关闭Menu
 */

const VerticalTrigger: React.FC<VerticalTriggerProps> = function (props) {
    const { visible, dataItem, path, popupContent, children, className } = props
    const { disabled } = dataItem

    const [triggerElement, setTriggerElement] = useState<HTMLElement>()
    const [portalElement, setPortalElement] = useState<HTMLElement>()
    const { subMenuTriggerActions, onMouseEnter, onMouseLeave, onDirectionalSubMenuClick } = useContext(MenuContext)
    const pathStr = getPathStr(path)

    const hasClickTriggerAction = subMenuTriggerActions.includes('click')
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    const handleClickAway = useRefMethod(() => {
        onDirectionalSubMenuClick(dataItem, false)
    })

    const handleTriggerClick = useRefMethod(() => {
        onDirectionalSubMenuClick(dataItem, !visible)
    })

    const handleMouseEnter = useRefMethod(() => {
        onMouseEnter(dataItem)
    })

    const handleMouseLeave = useRefMethod(() => {
        onMouseLeave(dataItem)
    })

    const popupStyle = styles(
        getPortalSubMenuStyle(triggerElement, portalElement),
        /** 避免在进行关闭动画中，鼠标动作再次触发打开SubMenu的行为，导致异常 */
        !visible && { pointerEvents: 'none' }
    )

    return (
        <Trigger
            visible={visible}
            isChainComponentKey
            componentKey={pathStr}
            bindPortalElement={setPortalElement}
            bindTriggerElement={setTriggerElement}
            getPopupContainer={() => document.body}
            portalClassName={menuClass('absolute')}
            triggerActions={disabled ? [] : subMenuTriggerActions}
            onClickAway={hasClickTriggerAction ? handleClickAway : undefined}
            motionPopupProps={{
                enter: true,
                leave: true,
                name: menuClass('_'),
                leaveClassName: menuClass('hidden'),
                popup: (
                    <ul style={popupStyle} className={menuClass('list', 'vertical')}>
                        {popupContent}
                    </ul>
                ),
            }}
        >
            <li
                tabIndex={-1}
                className={className}
                onClick={hasClickTriggerAction ? handleTriggerClick : undefined}
                onMouseEnter={hasHoverTriggerAction ? handleMouseEnter : undefined}
                onMouseLeave={hasHoverTriggerAction ? handleMouseLeave : undefined}
            >
                <span className={classnames(menuClass('title'))}>{children}</span>
            </li>
        </Trigger>
    )
}

export default React.memo(VerticalTrigger)
