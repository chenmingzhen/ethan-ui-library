import React, { Children, cloneElement } from 'react'
import { IInputGroupProps } from './type'

const Group: React.FC<IInputGroupProps> = props => {
    const { children, style, ...other } = props

    return (
        <>
            {Children.toArray(children).map((child: React.ReactElement, i) => {
                if (typeof child === 'string') {
                    return <span key={i}>{child}</span>
                }

                return cloneElement(child, other)
            })}
        </>
    )
}

export default React.memo(Group)
