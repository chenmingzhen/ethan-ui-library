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

const VerticalTrigger: React.FC<VerticalTriggerProps> = function (props) {
    const { visible, dataItem, path, popupContent, children } = props
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
        if (!hasHoverTriggerAction) return

        onMouseEnter(dataItem)
    })

    const handleMouseLeave = useRefMethod(() => {
        if (!hasHoverTriggerAction) return

        onMouseLeave(dataItem)
    })

    const popupStyle = styles(
        getPortalSubMenuStyle(triggerElement, portalElement),
        !visible && { pointerEvents: 'none' }
    )

    return (
        <Trigger
            visible={visible}
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
            <span
                className={classnames(menuClass('title'))}
                onClick={hasClickTriggerAction ? handleTriggerClick : undefined}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </span>
        </Trigger>
    )
}

export default React.memo(VerticalTrigger)
