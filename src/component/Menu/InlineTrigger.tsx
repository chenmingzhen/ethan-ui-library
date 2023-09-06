import React, { useContext } from 'react'
import { menuClass } from '@/styles'
import classnames from 'classnames'
import { InlineTriggerProps } from './type'
import Trigger from '../Trigger'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import MenuContext from './context/MenuContext'

const InlineTrigger: React.FC<InlineTriggerProps> = function (props) {
    const { visible, path, popupContent, dataItem, children, className } = props
    const inlineIndentStyle = useInlineIndentStyle(path)
    const { onInlineSubMenuTitleClick } = useContext(MenuContext)

    return (
        <Trigger
            visible={visible}
            transitionPopupProps={{
                duration: 'fast',
                hideDisplayAfterLeave: true,
                transitionTypes: ['collapse', 'fade'],
                popup: <ul className={menuClass('inline')}>{popupContent}</ul>,
            }}
        >
            <li className={className} tabIndex={-1}>
                <span
                    style={inlineIndentStyle}
                    className={classnames(menuClass('title'))}
                    onClick={() => onInlineSubMenuTitleClick(dataItem, !visible)}
                >
                    {children}
                    <span className={menuClass('expand')} />
                </span>
            </li>
        </Trigger>
    )
}

export default React.memo(InlineTrigger)
