import { headerClass } from 'doc/styles'
import React, { useRef, useState } from 'react'
import cssAccessors from '@/utils/style/css-accessors'
import AbsoluteList from '@/component/List/AbsoluteList'
import AnimationList from '@/component/List'
import Editor from './Editor'

const { color } = cssAccessors

const container = document.createElement('div')

document.body.appendChild(container)

const ThemeEditor: React.FC = function () {
    const [visible, updateVisible] = useState(false)

    const isRender = useRef(false)

    function renderPanel() {
        if (!visible && !isRender.current) return null

        isRender.current = true

        return (
            <AbsoluteList focus={visible} absolute>
                <AnimationList lazyDom show={visible} animationTypes={['fade']} duration="fast">
                    <Editor visible={visible} onClose={handleToggle} moveable />
                </AnimationList>
            </AbsoluteList>
        )
    }

    function handleToggle() {
        updateVisible(!visible)
    }

    return (
        <>
            <span key="color" className={headerClass('color')} onClick={handleToggle}>
                <div className={headerClass('color-current')} style={{ backgroundColor: color.primary }} />
            </span>

            {renderPanel()}
        </>
    )
}

export default React.memo(ThemeEditor)
