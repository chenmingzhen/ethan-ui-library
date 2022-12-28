import { buttonClass, inputClass, popoverClass } from '@/styles'
import classnames from 'classnames'
import React, { Children, cloneElement, useState } from 'react'
import { InputGroupProps } from './type'
import WrapperPopover from './WrapperPopover'

const Group: React.FC<InputGroupProps> = React.memo((props) => {
    const { children, style = {}, className, tip, disabled, border = true, size, popoverProps, width, ...other } = props

    const ms = Object.assign({ width }, style)

    const [focus, updateFocus] = useState(false)

    return (
        <WrapperPopover focus={focus} tip={tip} className={popoverClass('input-tip')} popoverProps={popoverProps}>
            <div
                className={classnames(
                    inputClass(
                        '_',
                        'group',
                        focus && disabled !== true && 'focus',
                        disabled === true && 'disabled',
                        ms.width && 'inline',
                        !border && 'no-border'
                    ),
                    buttonClass('group', 'from-input-group'),
                    className
                )}
                style={ms}
            >
                {Children.toArray(children).map((child: any, i) => {
                    if (typeof child === 'string') {
                        return <span key={i}>{child}</span>
                    }

                    return cloneElement(child, {
                        ...other,
                        disabled,
                        size,
                        onFocus(e) {
                            if (child.props.onFocus) {
                                child.props.onFocus(e)
                            }

                            updateFocus(true)
                        },
                        onBlur(e) {
                            if (child.props.onBlur) {
                                child.props.onBlur(e)
                            }

                            updateFocus(false)
                        },
                    })
                })}
            </div>
        </WrapperPopover>
    )
})

export default Group
