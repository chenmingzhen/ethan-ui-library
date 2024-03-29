import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { buttonClass } from '@/styles'
import { ButtonGroupProps } from './type'

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const { children, outline = false, size, type = 'default' } = props

    const className = classnames(buttonClass('group', (outline || type === 'default') && 'outline'), props.className)

    return (
        <div className={className}>
            {Children.toArray(children).map((child: any) =>
                // 返回一个克隆值 与Group保持一致
                cloneElement(child, { size, outline, type })
            )}
        </div>
    )
}

ButtonGroup.displayName = 'EthanButtonGroup'

export default React.memo(ButtonGroup)
