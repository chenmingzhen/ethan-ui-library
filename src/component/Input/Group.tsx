import inputBorder from '@/hoc/inputBorder'
import React, { Children, cloneElement } from 'react'
import { InputComponent, InputGroupProps } from './type'

const Group: React.FC<InputGroupProps> = React.memo(props => {
    const { children, style, className, tip, ...other } = props

    return (
        <>
            {Children.toArray(children).map((child: any, i) => {
                if (typeof child === 'string') {
                    return <span key={i}>{child}</span>
                }

                if (child.type && child.type.displayName === 'EthanInput') {
                    return cloneElement(child, { ...other })
                }

                return child
            })}
        </>
    )
})

export default inputBorder({ tag: 'div', isGroup: true, from: 'input', popover: true, enterPress: true })(
    Group
) as InputComponent['Group']
