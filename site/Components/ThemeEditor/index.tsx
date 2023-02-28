import { headerClass } from 'doc/styles'
import React, { useState } from 'react'
import cssAccessors from '@/utils/style/css-accessors'
import AnimationList from '@/component/List'
import Portal from '@/component/Portal'
import Editor from './Editor'

const { color } = cssAccessors

const container = document.createElement('div')

document.body.appendChild(container)

const ThemeEditor: React.FC = function () {
    const [visible, updateVisible] = useState(false)

    function handleToggle() {
        updateVisible(!visible)
    }

    return (
        <>
            <span key="color" className={headerClass('color')} onClick={handleToggle}>
                <div className={headerClass('color-current')} style={{ backgroundColor: color.primary }} />
            </span>

            <Portal portal show={visible}>
                <AnimationList show={visible} animationTypes={['fade']} duration="fast">
                    <Editor onClose={handleToggle} />
                </AnimationList>
            </Portal>
        </>
    )
}

export default React.memo(ThemeEditor)
