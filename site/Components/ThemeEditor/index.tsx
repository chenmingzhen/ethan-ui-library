import { headerClass } from 'doc/styles'
import React, { useState } from 'react'
import cssAccessors from '@/utils/style/css-accessors'
import { Trigger } from '@/index'
import Editor from './Editor'

const { color } = cssAccessors

const ThemeEditor: React.FC = function () {
    const [visible, updateVisible] = useState(false)

    function handleToggle() {
        updateVisible(!visible)
    }

    return (
        <Trigger
            visible={visible}
            transitionComponentProps={{ duration: 'fast', transitionTypes: ['fade'], hideDisplayAfterLeave: true }}
            popup={<Editor onClose={handleToggle} />}
            getPopupContainer={() => document.body}
        >
            <span key="color" className={headerClass('color')} onClick={handleToggle}>
                <div className={headerClass('color-current')} style={{ backgroundColor: color.primary }} />
            </span>
        </Trigger>
    )
}

export default React.memo(ThemeEditor)
