import React, { useContext } from 'react'
import { menuClass } from '@/styles'
import classnames from 'classnames'
import { InlineTriggerProps } from './type'
import Trigger from '../Trigger'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import MenuContext from './context/MenuContext'

const InlineTrigger: React.FC<InlineTriggerProps> = function (props) {
    const { visible, path, popupContent, dataItem, children } = props
    const inlineIndentStyle = useInlineIndentStyle(path)
    const { onInlineSubMenuClick } = useContext(MenuContext)

    return (
        <Trigger
            visible={visible}
            transitionPopupProps={{
                transitionTypes: ['collapse', 'fade'],
                duration: 'fast',
                hideDisplayAfterLeave: true,
                popup: <ul className={menuClass('list', 'inline')}>{popupContent}</ul>,
            }}
        >
            <span
                style={inlineIndentStyle}
                className={classnames(menuClass('title'))}
                onClick={() => {
                    onInlineSubMenuClick(dataItem, !visible)
                }}
            >
                {children}
            </span>
        </Trigger>
    )
}

export default React.memo(InlineTrigger)
