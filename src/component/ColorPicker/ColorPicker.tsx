import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { colorPickerClass } from '@/styles'
import { isDescendent } from '@/utils/dom/element'
import { getUidStr } from '@/utils/uid'
import withControl from '@/hoc/withControl'
import { ColorPickerProps } from './type'
import Caret from '../icons/Caret'
import AbsoluteList from '../List/AbsoluteList'
import AnimationList from '../List'
import ColorBoard from './ColorBoard'
import { getDefaultColor } from './util'

const ColorPicker: React.FC<ColorPickerProps> = function(props) {
    const {
        size,
        disabled,
        className,
        style,
        value,
        position = 'left-bottom',
        onChange,
        format = 'rgba',
        ...other
    } = props

    const [show, updateShow] = useState(false)

    const colorPickerId = useRef(getUidStr()).current

    const isRenderRef = useRef(false)

    const containerRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (!value) {
            onChange(getDefaultColor(format))
        }
    }, [])

    const cls = classnames(className, colorPickerClass('_', 'preview-btn', size && 'size', disabled && 'disabled'))

    const handleClickAway = useCallback((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, colorPickerId)

        if (desc) return

        updateShow(false)

        clearClickAway()
    }, [])

    const bindClickAway = () => {
        document.addEventListener('click', handleClickAway)
    }

    const clearClickAway = () => {
        document.removeEventListener('click', handleClickAway)
    }

    function togglePanel() {
        if (disabled) return

        if (!show) {
            bindClickAway()
        } else {
            clearClickAway()
        }

        updateShow(!show)
    }

    function renderColorBoard() {
        if (!show && !isRenderRef.current) return

        isRenderRef.current = true

        return (
            <AbsoluteList absolute focus={show} position={position} getParentElement={() => containerRef.current}>
                <AnimationList lazyDom show={show} animationTypes={['fade']} duration="fast" data-id={colorPickerId}>
                    <ColorBoard {...other} format={format} value={value} onChange={onChange} />
                </AnimationList>
            </AbsoluteList>
        )
    }

    return (
        <div className={cls} style={style} ref={containerRef} data-id={colorPickerId}>
            <div className={colorPickerClass('result')} onClick={togglePanel}>
                <div className={colorPickerClass('color')} style={{ backgroundColor: value }} />
            </div>
            <span className={colorPickerClass('caret')} onClick={togglePanel}>
                <Caret />
            </span>

            {renderColorBoard()}
        </div>
    )
}

export default withControl(React.memo(ColorPicker))
