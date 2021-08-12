import React, { MemoExoticComponent } from 'react'
import Button, { ButtonProps } from './Button'
import Group, { ButtonGroupProps } from './Group'

export interface ButtonComponent extends MemoExoticComponent<React.FC<ButtonProps>> {
    Group: typeof Group
}

export { ButtonProps, ButtonGroupProps }

const ComputedButton = Button as ButtonComponent

ComputedButton.Group = Group

export default ComputedButton
