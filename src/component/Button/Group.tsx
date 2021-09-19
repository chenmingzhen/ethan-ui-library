import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { buttonClass } from '@/styles'

export interface ButtonGroupProps {
    size?: 'large' | 'default' | 'small'

    outline?: boolean

    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'

    children: React.ReactNode

    className?: string
}

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
    const { children, outline = false, size, type = 'default' } = props

    const className = classnames(buttonClass('group', (outline || type === 'default') && 'outline'), props.className)

    return (
        <div className={className}>
            {Children.toArray(children).map((child: any) => {
                if (!child?.type?.IS_ETHAN_BUTTON) {
                    console.warn('please put the Button under ButtonGroup without others dom')
                    return null
                }

                // 返回一个克隆值 与Group保持一致
                return cloneElement(child, { size, outline, type })
            })}
        </div>
    )
}

ButtonGroup.displayName = 'EthanButtonGroup'

export default React.memo(ButtonGroup)
