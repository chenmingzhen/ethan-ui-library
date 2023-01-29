import { tagClass } from '@/styles'
import { isDark } from '@/utils/color'
import { wrapSpan } from '@/utils/dom/element'
import { isPromise, isString } from '@/utils/is'
import React, { useState } from 'react'
import { styles } from '@/utils/style/styles'
import useRefMethod from '@/hooks/useRefMethod'
import Input from './Input'
import icons from '../icons'
import Spin from '../Spin'
import useDismiss, { Dismiss } from './hooks/useDismiss'
import { TagProps } from './type'

const Tag: React.FC<TagProps> = (props) => {
    const { className, style, backgroundColor, onClose, disabled, onClick, children, type, onCompleted } = props
    const [inputVisible, updateInputVisible] = useState(false)
    const [value, setValue] = useState<string>(isString(children) ? children : '')
    const { dismiss, dispatchCallback, dispatchClosing } = useDismiss()

    const handleInputBlur = useRefMethod((nextValue: string) => {
        if (onCompleted) onCompleted(nextValue)

        updateInputVisible(false)
    })

    function handleClick(e: React.MouseEvent) {
        if (disabled) return
        if (onCompleted) updateInputVisible(!inputVisible)
        if (onClick) onClick(e)
    }

    function handleDismiss(e) {
        let callback

        if (onClose === true) {
            dispatchClosing()

            return
        }

        if (typeof onClose === 'function') {
            callback = onClose(e)
        }

        if (isPromise(callback)) {
            dispatchCallback()

            callback.finally(() => {
                dispatchClosing()
            })

            return
        }

        /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented */
        if (e.defaultPrevented) {
            return
        }

        dispatchClosing()
    }

    function handleClose(e) {
        if (dismiss !== Dismiss.OPEN || disabled) return

        handleDismiss(e)
    }

    function renderClose() {
        if (!onClose) return null

        if (dismiss === Dismiss.OPEN) {
            return (
                <div className={tagClass('close-icon', disabled && 'disabled')} onClick={handleClose}>
                    {icons.Close}
                </div>
            )
        }

        if (dismiss === Dismiss.CALLBACK) {
            return (
                <div className={tagClass('close-loading')}>
                    <Spin name="ring" size={10} />
                </div>
            )
        }

        return null
    }

    if (dismiss === Dismiss.CLOSED) return null

    if (inputVisible) {
        return <Input value={value} onBlur={handleInputBlur} onChange={setValue} />
    }

    const wrapChildren = wrapSpan(children)

    const tagClassName = tagClass(
        '_',
        disabled && 'disabled',
        type,
        className,
        dismiss === Dismiss.CLOSING && 'closing'
    )

    const tagStyle = styles(
        backgroundColor
            ? { color: isDark(backgroundColor) ? '#fff' : '#000', backgroundColor, borderColor: 'transparent' }
            : undefined,
        style
    )

    return (
        <div className={tagClassName} style={tagStyle} onClick={handleClick}>
            <div className={tagClass('inline')}>{wrapChildren}</div>

            {renderClose()}
        </div>
    )
}

Tag.displayName = 'EthanTag'

export default React.memo(Tag)
