import { tagClass } from '@/styles'
import { isDark } from '@/utils/color'
import { wrapSpan } from '@/utils/dom/element'
import { isPromise } from '@/utils/is'
import React, { useState } from 'react'
import Input from './Input'
import icons from '../icons'
import Spin from '../Spin'
import useDismiss, { Dismiss } from './hooks/useDismiss'

export interface TagProps {
    type?:
        | 'primary'
        | 'default'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'error'
        | 'danger'
        | 'link'
        | 'loading'

    children?: React.ReactNode

    onClick?(e: React.MouseEvent): void

    /** 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 */
    onClose?: boolean | ((e: React.MouseEvent) => void)

    backgroundColor?: string
    /** Tag编辑完成时触发该事件（children 必须为 string） */
    onCompleted?(value: string): void

    disabled?: boolean

    className?: string

    style?: React.CSSProperties
}

const Tag: React.FC<TagProps> = props => {
    const { className, style, backgroundColor, onClose, disabled, onClick, children, type, onCompleted } = props

    const [inputVisible, setInputVisible] = useState(false)

    const [value, setValue] = useState<string>('')

    const { dismiss, dispatchCallback, dispatchClosing } = useDismiss()

    function handleClick(e: React.MouseEvent) {
        if (disabled) return

        if (onCompleted) setInputVisible(!inputVisible)

        onClick?.(e)
    }

    function handleDismiss(e) {
        let callback
        // 如果传入值是布尔 非函数

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

        // https://developer.mozilla.org/zh-CN/docs/Web/API/Event/defaultPrevented
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

    function onInputBlur(newValue) {
        onCompleted?.(newValue)

        setInputVisible(false)
    }

    if (inputVisible) {
        return <Input value={value} onBlur={onInputBlur} onChange={setValue} />
    }

    const wrapChildren = wrapSpan(children)

    const tagClassName = tagClass(
        '_',
        disabled && 'disabled',
        type,
        className,
        dismiss === Dismiss.CLOSING && 'closing'
    )

    const tagStyle = backgroundColor
        ? {
              color: isDark(backgroundColor) ? '#fff' : '#000',
              backgroundColor,
              borderColor: 'transparent',
              ...style,
          }
        : undefined

    return (
        <div className={tagClassName} style={tagStyle}>
            {onClose ? (
                <div onClick={handleClick} className={tagClass('inline')}>
                    {wrapChildren}
                </div>
            ) : (
                wrapChildren
            )}

            {renderClose()}
        </div>
    )
}

Tag.defaultProps = {
    style: {},
}

Tag.displayName = 'EthanTag'

export default React.memo(Tag)
