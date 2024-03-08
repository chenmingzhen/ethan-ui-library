import React, { useMemo, useRef } from 'react'
import classnames from 'classnames'
import { dropdownClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import useMergedValue from '@/hooks/useMergedValue'
import useSafeState from '@/hooks/useSafeState'
import { docSize } from '@/utils/dom/document'
import { getPortalDropdownStyle } from '@/utils/position'
import useRefMethod from '@/hooks/useRefMethod'
import { isDescendent } from '@/utils/dom/element'
import { isFunc } from '@/utils/is'
import { DropdownProps } from './type'
import Trigger from '../Trigger'
import Menu from '../Menu'

const Dropdown: React.FC<DropdownProps> = function (props) {
    const {
        menu,
        overlay,
        disabled,
        children,
        onVisibleChange,
        trigger = 'click',
        getPopupContainer = () => document.body,
    } = props

    const dropdownComponentKey = useRef(getUidStr()).current
    const [triggerElement, setTriggerElement] = useSafeState<HTMLDivElement>()
    const [portalElement, setPortalElement] = useSafeState<HTMLDivElement>()
    const [visible, updateVisible] = useMergedValue({
        defaultStateValue: false,
        options: {
            value: props.visible,
            onChange: onVisibleChange,
        },
    })

    const position = useMemo(() => {
        let pos: string = props.position || 'auto'

        if (pos !== 'auto') return pos

        if (!triggerElement) return 'bottom-left'

        /** 如果position是auto 计算位置给出最合适的position */
        const windowHeight = docSize.height
        const windowWidth = docSize.width
        const rect = triggerElement.getBoundingClientRect()

        pos = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-'
        pos += rect.right > windowWidth / 2 ? 'right' : 'left'

        return pos as DropdownProps['position']
    }, [props.position, triggerElement])

    const popupStyle = getPortalDropdownStyle(triggerElement, portalElement, position)

    const handleSelect = useRefMethod((dataItem, path) => {
        if (disabled) return
        menu?.onSelect?.(dataItem, path)

        updateVisible(false)
    })

    const handlePopupMouseEnter = useRefMethod(() => {
        if (disabled) return
        if (trigger !== 'hover') return

        updateVisible(true)
    })

    const handlePopupMouseLeave = useRefMethod((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disabled) return
        if (trigger !== 'hover') return

        /** 从Popup回到Trigger不需要隐藏 */
        if (isDescendent(e.relatedTarget as HTMLElement, dropdownComponentKey)) return

        updateVisible(false)
    })

    const handleTriggerVisibleChange = useRefMethod((nextVisible: boolean) => {
        if (disabled) return

        updateVisible(nextVisible)
    })

    const buildPopupInner = useRefMethod(() => {
        const menuNode = (
            <Menu
                {...menu}
                mode="vertical"
                activeKey={null}
                onSelect={handleSelect}
                subMenuTriggerActions={[trigger]}
                renderItem={({ content }) => content}
                className={classnames(dropdownClass('menu'), menu.className)}
            />
        )

        if (isFunc(overlay)) {
            return overlay({ menu: menuNode })
        }

        return menuNode
    })

    if (!children) return null

    const cloneChild = React.cloneElement(children, {
        className: classnames(dropdownClass('_', disabled && 'disabled'), children.props.className),
    })

    return (
        <Trigger
            visible={visible}
            triggerActions={[trigger]}
            componentKey={dropdownComponentKey}
            bindPortalElement={setPortalElement}
            getPopupContainer={getPopupContainer}
            bindTriggerElement={setTriggerElement}
            onVisibleChange={handleTriggerVisibleChange}
            transitionPopupProps={{
                duration: 'fast',
                transitionTypes: ['fade'],
                hideDisplayAfterLeave: true,
                popup: (
                    <div
                        style={popupStyle}
                        className={dropdownClass(position)}
                        onMouseEnter={handlePopupMouseEnter}
                        onMouseLeave={handlePopupMouseLeave}
                    >
                        {buildPopupInner()}
                    </div>
                ),
            }}
        >
            {cloneChild}
        </Trigger>
    )
}

export default React.memo(Dropdown)
